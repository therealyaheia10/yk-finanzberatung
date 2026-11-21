import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isPreview } from "@/lib/site";
import { addLead, listLeads, storeEnabled } from "@/lib/store";
import { mailConfigured, sendLeadMail } from "@/lib/mailer";
import { advisorName, assignAdvisor } from "@/config/advisors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const topicLabel: Record<string, string> = {
  retirement: "Altersvorsorge", kids: "Vorsorge für Kinder", bu: "Berufsunfähigkeit", pkv: "Private Krankenversicherung",
  bav: "Betriebliche Altersversorgung", bkv: "Betriebliche Krankenversicherung", extras: "Ergänzende Absicherungen", general: "Allgemeine Beratung",
};
const modeLabel: Record<string, string> = { office: "Persönlich im Büro", phone: "Telefonisch", video: "Video", callback: "Rückruf gewünscht" };
const timeLabel: Record<string, string> = { any: "egal", morning: "vormittags", afternoon: "nachmittags", evening: "ab 17 Uhr" };
const langLabel: Record<string, string> = { de: "Deutsch", ar: "Arabisch", en: "Englisch", fr: "Französisch" };

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") || 0) > 10000) return NextResponse.json({ ok: false, error: "validation" }, { status: 413 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "validation" }, { status: 400 }); }

  // Honeypot: Bots füllen das versteckte Feld aus → stillschweigend verwerfen
  if (typeof body === "object" && body && (body as { website?: string }).website) return NextResponse.json({ ok: true, test: isPreview });
  if (!rateLimit(clientIp(req))) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "validation", fields: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 400 });
  const d = parsed.data;
  if (d.elapsedMs < 2500) return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });

  // Zuordnung: Weg B (gewünschter Berater) oder Weg A (Sprache + Thema, abwechselnd verteilt)
  const seed = storeEnabled() ? (await listLeads().catch(() => [])).length : Date.now();
  const { advisor, reason } = assignAdvisor({ advisor: d.advisor, language: d.language, topic: d.topic, seed });

  const base = {
    topic: d.topic, mode: d.mode, name: d.name, phone: d.phone, email: d.email, language: d.language,
    time: d.time, message: d.message, pageLocale: d.pageLocale, source: d.source,
    advisor: advisor.slug, assignReason: reason, campaign: d.campaign,
  };
  const displayName = advisorName(advisor, d.pageLocale);

  // PREVIEW: niemals versenden, nur lokal als TEST speichern
  if (isPreview) {
    if (storeEnabled()) { try { await addLead({ ...base, test: true, delivered: false }); } catch { /* optional */ } }
    return NextResponse.json({ ok: true, test: true, advisorName: displayName });
  }

  // PRODUCTION
  if (process.env.LEADS_ENABLED !== "true" || !mailConfigured()) return NextResponse.json({ ok: false, error: "disabled" }, { status: 503 });

  const campaign = Object.entries(d.campaign).map(([k, v]) => `${k}=${v}`).join(", ") || "–";
  const text = [
    "Neue Beratungsanfrage über die Website",
    "",
    `Zugeordnet an:   ${advisor.firstName} ${advisor.lastName} (${reason === "requested" ? "vom Kunden gewählt" : "automatisch: " + reason})`,
    `Anliegen:        ${topicLabel[d.topic]}`,
    `Beratungsweg:    ${modeLabel[d.mode]}`,
    `Name:            ${d.name}`,
    `Telefon:         ${d.phone || "–"}`,
    `E-Mail:          ${d.email || "–"}`,
    `Sprache:         ${langLabel[d.language]}`,
    `Zeitfenster:     ${timeLabel[d.time]}`,
    `Nachricht:       ${d.message || "–"}`,
    "",
    `Seite:           ${d.source} (${d.pageLocale})`,
    `Kampagne:        ${campaign}`,
    `Eingang:         ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}`,
    "",
    "Hinweis: Bitte Erstinformation (§ 15 VersVermV) beim ersten Kontakt in Textform übermitteln.",
  ].join("\n");

  try {
    await sendLeadMail(`Neue Anfrage: ${topicLabel[d.topic]} – ${d.name} (${langLabel[d.language]}) → ${advisor.firstName}`, text, advisor.email, d.email || undefined);
  } catch (e) {
    console.error("[lead] Versand fehlgeschlagen", (e as Error).message);
    return NextResponse.json({ ok: false, error: "server" }, { status: 502 });
  }
  if (storeEnabled()) { try { await addLead({ ...base, test: false, delivered: true }); } catch (e) { console.error("[lead] Speichern fehlgeschlagen", (e as Error).message); } }
  return NextResponse.json({ ok: true, test: false, advisorName: displayName });
}
