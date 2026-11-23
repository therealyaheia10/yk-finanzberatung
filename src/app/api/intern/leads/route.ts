import { NextResponse } from "next/server";
import { deleteLead, leadStatuses, listLeads, setManualVisits, updateLead, type LeadStatus } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Zugriff wird durch proxy.ts geschützt (Admin oder Berater). Berater dürfen nur eigene Anfragen ändern.
export async function POST(req: Request) {
  const scope = req.headers.get("x-intern-advisor");
  const b = (await req.json().catch(() => ({}))) as { action?: string; id?: string; status?: string; note?: string; visits?: number | null };
  if (scope && b.action !== "update") return NextResponse.json({ ok: false }, { status: 403 });
  if (scope && b.id && !(await listLeads()).some((l) => l.id === b.id && l.advisor === scope)) return NextResponse.json({ ok: false }, { status: 403 });
  if (b.action === "update" && b.id) {
    const patch: { status?: LeadStatus; note?: string } = {};
    if (b.status && (leadStatuses as readonly string[]).includes(b.status)) patch.status = b.status as LeadStatus;
    if (typeof b.note === "string") patch.note = b.note.slice(0, 500);
    const l = await updateLead(b.id, patch);
    return NextResponse.json({ ok: !!l });
  }
  if (b.action === "delete" && b.id) { await deleteLead(b.id); return NextResponse.json({ ok: true }); }
  if (b.action === "visits") { await setManualVisits(typeof b.visits === "number" ? Math.max(0, Math.floor(b.visits)) : null); return NextResponse.json({ ok: true }); }
  return NextResponse.json({ ok: false }, { status: 400 });
}
