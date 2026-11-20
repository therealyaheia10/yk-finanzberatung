"use client";

import { useMemo, useState } from "react";
import type { Metrics, StoredLead } from "@/lib/store";

const STATUS: { k: StoredLead["status"]; label: string; cls: string }[] = [
  { k: "neu", label: "Neu", cls: "bg-sky-100 text-sky-900" },
  { k: "kontaktiert", label: "Kontakt aufgenommen", cls: "bg-indigo-100 text-indigo-900" },
  { k: "qualifiziert", label: "Qualifiziert", cls: "bg-emerald-100 text-emerald-900" },
  { k: "nicht_qualifiziert", label: "Nicht qualifiziert", cls: "bg-stone-200 text-stone-800" },
  { k: "termin", label: "Termin vereinbart", cls: "bg-amber-100 text-amber-900" },
  { k: "abgeschlossen", label: "Abgeschlossen", cls: "bg-navy text-white" },
];
const QUALIFIED = new Set(["qualifiziert", "termin", "abgeschlossen"]);
const TOPIC: Record<string, string> = { kids: "Kinder", bu: "BU", pkv: "PKV", retirement: "Altersvorsorge", benefits: "bAV/bKV", general: "Allgemein" };

export function Dashboard({ leads: initial, metrics, trial, advisorName, preview, store }: {
  leads: StoredLead[]; metrics: Metrics; trial: { start: string | null; days: number; goal: number; price: number };
  advisorName: string; preview: boolean; store: boolean;
}) {
  const [leads, setLeads] = useState(initial);
  const [showTest, setShowTest] = useState(preview);
  const [visits, setVisits] = useState<string>(metrics.manualVisits?.toString() ?? "");

  const real = leads.filter((l) => showTest || !l.test);
  const qualified = real.filter((l) => QUALIFIED.has(l.status)).length;
  const meetings = real.filter((l) => l.status === "termin" || l.status === "abgeschlossen").length;
  const pv = Object.values(metrics.pageviews).reduce((a, b) => a + b, 0);
  const ctaClicks = Object.entries(metrics.clicks).filter(([k]) => k.startsWith("cta_") || k.startsWith("call_")).reduce((a, [, b]) => a + b, 0);

  const dates = useMemo(() => {
    if (!trial.start) return null;
    const s = new Date(trial.start + "T00:00:00");
    const e = new Date(s); e.setDate(e.getDate() + trial.days - 1);
    const left = Math.max(0, Math.ceil((e.getTime() - Date.now()) / 86400000) + 1);
    return { s, e, left };
  }, [trial]);

  async function update(id: string, patch: { status?: string; note?: string }) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } as StoredLead : l)));
    await fetch("/api/intern/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "update", id, ...patch }) });
  }
  async function remove(id: string) {
    if (!confirm("Anfrage endgültig löschen?")) return;
    setLeads((ls) => ls.filter((l) => l.id !== id));
    await fetch("/api/intern/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "delete", id }) });
  }
  async function saveVisits() {
    await fetch("/api/intern/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "visits", visits: visits === "" ? null : Number(visits) }) });
  }
  function exportCsv() {
    const head = ["Datum", "Test", "Status", "Anliegen", "Beratungsweg", "Name", "Telefon", "E-Mail", "Sprache", "Zeitfenster", "Seite", "Notiz"];
    const rows = real.map((l) => [l.createdAt, l.test ? "ja" : "nein", l.status, TOPIC[l.topic] ?? l.topic, l.mode, l.name, l.phone, l.email, l.language, l.time, l.source, l.note]);
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  const pct = Math.min(qualified / trial.goal, 1) * 100;
  const fmt = (d: Date) => d.toLocaleDateString("de-DE");

  return (
    <div className="mx-auto max-w-[1200px] p-5 sm:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="tracking-label text-[0.75rem] font-semibold text-brass">Intern · nicht öffentlich</p>
          <h1 className="display text-4xl text-navy">Testphase – {advisorName}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-[0.95rem]">
            <input type="checkbox" checked={showTest} onChange={(e) => setShowTest(e.target.checked)} /> Testanfragen anzeigen
          </label>
          <button className="btn btn-ghost !min-h-11 !text-base" onClick={exportCsv}>CSV exportieren</button>
        </div>
      </header>
      {preview && <p className="mt-4 rounded-md border-2 border-dashed border-amber-600 bg-amber-50 p-3 text-[0.95rem] font-semibold text-amber-950">Vorschau-Modus: Alle Anfragen hier sind Testanfragen und zählen nicht zur Zielerreichung.</p>}
      {!store && <p className="mt-4 rounded-md bg-sand p-3 text-[0.95rem]">Dateispeicher deaktiviert (LEAD_STORE=none). Bitte Anfragen aus dem E-Mail-Postfach in marketing/lead-tracking.xlsx erfassen.</p>}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Zielerreichung" value={`${qualified} von ${trial.goal}`} sub={`qualifizierte Anfragen · Preis ${trial.price.toLocaleString("de-DE")} €`} highlight>
          <div className="mt-3 h-2 rounded-full bg-white/20"><div className="h-2 rounded-full bg-champagne-light" style={{ width: `${pct}%` }} /></div>
        </Kpi>
        <Kpi label="Zeitraum" value={dates ? `${dates.left} Tage übrig` : "nicht gestartet"} sub={dates ? `${fmt(dates.s)} – ${fmt(dates.e)}` : "Start erst nach freigegebener Veröffentlichung (TRIAL_START)"} />
        <Kpi label="Eingegangene Anfragen" value={String(real.length)} sub={`davon Termine: ${meetings}`} />
        <Kpi label="Website-Besuche" value={visits || String(pv)} sub={`Seitenaufrufe (anonym): ${pv} · CTA/Anruf-Klicks: ${ctaClicks}`}>
          <div className="mt-2 flex gap-2">
            <input aria-label="Besuche manuell (z. B. aus Hosting-Statistik)" inputMode="numeric" value={visits} onChange={(e) => setVisits(e.target.value.replace(/\D/g, ""))} placeholder="manuell" className="w-24 rounded border border-line bg-paper px-2 py-1 text-[0.9rem]" />
            <button onClick={saveVisits} className="rounded border border-line px-2 text-[0.85rem]">speichern</button>
          </div>
        </Kpi>
      </section>

      <section className="mt-10 overflow-x-auto rounded-[var(--radius-soft)] border border-line bg-paper">
        <table className="w-full min-w-[900px] text-start text-[0.95rem]">
          <thead className="bg-sand text-start text-navy">
            <tr>{["Eingang", "Anliegen", "Kontakt", "Sprache / Weg", "Status", "Notiz", ""].map((h) => <th key={h} className="p-3 text-start font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {real.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted">Noch keine Anfragen.</td></tr>}
            {real.map((l) => (
              <tr key={l.id} className="border-t border-line align-top">
                <td className="p-3">{new Date(l.createdAt).toLocaleString("de-DE")}{l.test && <span className="ms-2 rounded bg-amber-200 px-1.5 text-[0.75rem] font-bold">TEST</span>}</td>
                <td className="p-3 font-semibold">{TOPIC[l.topic] ?? l.topic}</td>
                <td className="p-3"><strong>{l.name}</strong><br />{l.phone && <a className="link" href={`tel:${l.phone}`}>{l.phone}</a>}{l.phone && l.email && <br />}{l.email && <a className="link" href={`mailto:${l.email}`}>{l.email}</a>}{l.message && <p className="mt-1 text-muted">„{l.message}“</p>}</td>
                <td className="p-3">{l.language.toUpperCase()} · {l.mode}<br /><span className="text-muted">{l.time}</span></td>
                <td className="p-3">
                  <select value={l.status} onChange={(e) => update(l.id, { status: e.target.value })} className={`rounded px-2 py-1.5 font-semibold ${STATUS.find((s) => s.k === l.status)?.cls}`}>
                    {STATUS.map((s) => <option key={s.k} value={s.k}>{s.label}</option>)}
                  </select>
                </td>
                <td className="p-3"><textarea defaultValue={l.note} onBlur={(e) => update(l.id, { note: e.target.value })} rows={2} className="w-48 rounded border border-line p-1.5 text-[0.9rem]" placeholder="z. B. Termin 12.12." /></td>
                <td className="p-3"><button onClick={() => remove(l.id)} className="text-[0.85rem] text-error underline">löschen</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-soft)] border border-line bg-paper p-6">
          <h2 className="font-bold text-navy">Definition „qualifizierte Anfrage“</h2>
          <ul className="mt-3 list-disc space-y-1 ps-5 text-[0.95rem] text-muted">
            <li>echte, identifizierbare Person oder Unternehmen</li>
            <li>konkretes Anliegen in einem angebotenen Beratungsbereich</li>
            <li>gültige Kontaktmöglichkeit</li>
            <li>ausdrücklicher Wunsch nach Beratung/Kontakt</li>
            <li>nachvollziehbar über die Website entstanden</li>
            <li>kein Spam, keine Test- oder Doppelanfrage</li>
          </ul>
          <p className="mt-3 text-[0.9rem] text-muted">Status „Qualifiziert“, „Termin vereinbart“ und „Abgeschlossen“ zählen zur Zielerreichung.</p>
        </div>
        <div className="rounded-[var(--radius-soft)] border border-line bg-paper p-6">
          <h2 className="font-bold text-navy">Klicks (anonym)</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[0.92rem]">
            {Object.entries(metrics.clicks).sort((a, b) => b[1] - a[1]).slice(0, 16).map(([k, v]) => <li key={k} className="flex justify-between gap-3"><span className="text-muted">{k}</span><strong>{v}</strong></li>)}
            {Object.keys(metrics.clicks).length === 0 && <li className="text-muted">Noch keine Daten (ANALYTICS=first-party setzen).</li>}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value, sub, highlight, children }: { label: string; value: string; sub: string; highlight?: boolean; children?: React.ReactNode }) {
  return (
    <div className={`rounded-[var(--radius-soft)] p-6 ${highlight ? "navy-surface text-white" : "border border-line bg-paper"}`}>
      <p className={`text-[0.85rem] font-semibold ${highlight ? "text-champagne-light" : "text-brass"}`}>{label}</p>
      <p className="display mt-1 text-[2.2rem] leading-tight">{value}</p>
      <p className={`mt-1 text-[0.88rem] ${highlight ? "text-mist" : "text-muted"}`}>{sub}</p>
      {children}
    </div>
  );
}
