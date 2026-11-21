"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleAlert, ShieldCheck, Sparkles, Info } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { fill } from "@/lib/format";
import type { Dict } from "@/content";
import { CalcShell, Slider, eur, num } from "./shared";

type T2 = Dict["tools2"];

function Choice<V extends string>({ legend, value, options, onChange, name }: { legend: string; value: V; options: { v: V; label: string }[]; onChange: (v: V) => void; name: string }) {
  return (
    <fieldset className="py-2">
      <legend className="mb-2 font-semibold text-navy">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.v} className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[0.98rem] font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${value === o.v ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-navy/50"}`}>
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(o.v)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function HowWeCalc({ t, text }: { t: T2; text: string }) {
  return (
    <details className="group">
      <summary className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy"><Info size={16} className="text-brass" aria-hidden="true" /> {t.howWeCalc}</summary>
      <p className="pb-2 pt-1">{text} <span className="block pt-1 text-[0.85rem]">{t.asOf}</span></p>
    </details>
  );
}

/* ====================================================== Versicherungs-Check */
type Item = keyof T2["check"]["items"];
type Level = "mandatory" | "important" | "useful";

export function InsuranceCheck({ locale, t, discuss }: { locale: Locale; t: T2; discuss: string }) {
  const c = t.check;
  const [family, setFamily] = useState<"single" | "couple" | "kids">("kids");
  const [home, setHome] = useState<"rent" | "own">("rent");
  const [work, setWork] = useState<"employed" | "self" | "student">("employed");
  const [car, setCar] = useState<"yes" | "no">("yes");
  const [travel, setTravel] = useState<"yes" | "no">("yes");
  const [have, setHave] = useState<Set<Item>>(new Set());

  const list = useMemo(() => {
    const r: { k: Item; level: Level }[] = [{ k: "health", level: "mandatory" }];
    if (car === "yes") r.push({ k: "car", level: "mandatory" });
    r.push({ k: "liability", level: "important" });
    if (work !== "student") r.push({ k: "bu", level: "important" });
    r.push({ k: "retirement", level: "important" });
    if (family !== "single" || home === "own") r.push({ k: "life", level: "important" });
    if (home === "own") r.push({ k: "building", level: "important" });
    if (work === "self") r.push({ k: "business", level: "important" }, { k: "pkv", level: "useful" });
    if (family === "kids") r.push({ k: "kids", level: "useful" });
    if (home === "rent") r.push({ k: "contents", level: "useful" });
    r.push({ k: "legal", level: "useful" });
    if (travel === "yes") r.push({ k: "travel", level: "useful" });
    if (car === "yes" && travel === "yes") r.push({ k: "assistance", level: "useful" });
    r.push({ k: "care", level: "useful" });
    return r;
  }, [family, home, work, car, travel]);

  const missing = list.filter((x) => x.level !== "useful" && !have.has(x.k)).length;
  const toggle = (k: Item) => setHave((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const groups: Level[] = ["mandatory", "important", "useful"];

  return (
    <div id="versicherungs-check" className="scroll-mt-28 overflow-hidden rounded-[var(--radius-soft)] border border-line bg-paper">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-line p-6 sm:p-10 lg:border-b-0 lg:border-e">
          <h3 className="display text-[2rem] text-navy sm:text-[2.4rem]">{c.title}</h3>
          <p className="mt-2 text-muted">{c.intro}</p>
          <div className="mt-6 space-y-3">
            <Choice name="ic-family" legend={c.q.family} value={family} onChange={setFamily} options={[{ v: "single", label: c.a.single }, { v: "couple", label: c.a.couple }, { v: "kids", label: c.a.kids }]} />
            <Choice name="ic-home" legend={c.q.home} value={home} onChange={setHome} options={[{ v: "rent", label: c.a.rent }, { v: "own", label: c.a.own }]} />
            <Choice name="ic-work" legend={c.q.work} value={work} onChange={setWork} options={[{ v: "employed", label: c.a.employed }, { v: "self", label: c.a.self }, { v: "student", label: c.a.student }]} />
            <Choice name="ic-car" legend={c.q.car} value={car} onChange={setCar} options={[{ v: "yes", label: c.a.yes }, { v: "no", label: c.a.no }]} />
            <Choice name="ic-travel" legend={c.q.travel} value={travel} onChange={setTravel} options={[{ v: "yes", label: c.a.yes }, { v: "no", label: c.a.no }]} />
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <p aria-live="polite" className={`flex items-start gap-3 rounded-md p-4 font-semibold ${missing ? "bg-sand text-navy" : "bg-success/10 text-success"}`}>
            {missing ? <CircleAlert size={22} className="mt-0.5 shrink-0 text-brass" aria-hidden="true" /> : <ShieldCheck size={22} className="mt-0.5 shrink-0" aria-hidden="true" />}
            {missing ? fill(c.missingCount, { n: missing }) : c.allGood}
          </p>
          {groups.map((g) => {
            const rows = list.filter((x) => x.level === g);
            if (!rows.length) return null;
            return (
              <div key={g} className="mt-6">
                <h4 className="tracking-label text-[0.78rem] font-bold text-brass">{c.groups[g]}</h4>
                <ul className="mt-2 divide-y divide-line border-y border-line">
                  {rows.map(({ k }) => (
                    <li key={k} className="flex items-start justify-between gap-4 py-3">
                      <div>
                        <p className={`font-semibold ${have.has(k) ? "text-muted line-through" : "text-navy"}`}>{c.items[k].label}</p>
                        <p className="text-[0.92rem] text-muted">{c.items[k].why}</p>
                      </div>
                      <label className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 text-[0.92rem] font-medium text-navy">
                        <input type="checkbox" checked={have.has(k)} onChange={() => toggle(k)} className="h-5 w-5 accent-[#102A43]" />
                        {c.have}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <Link href={href(locale, "contact", { topic: "general" })} className="btn btn-primary mt-8" data-track="cta_tool_check">
            {discuss} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="border-t border-line bg-ivory px-6 py-4 text-[0.92rem] text-muted sm:px-10">
        <p>{c.note}</p>
        <HowWeCalc t={t} text={c.calc} />
      </div>
    </div>
  );
}

/* ====================================================== Ankommens-Checkliste */
export function ArrivalChecklist({ locale, t, discuss }: { locale: Locale; t: T2; discuss: string }) {
  const a = t.arrival;
  const all = a.phases.flatMap((p, i) => p.items.map((_, j) => `${i}-${j}`));
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (k: string) => setDone((s) => { const n = new Set(s); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  const pct = (done.size / all.length) * 100;
  return (
    <div id="ankommen" className="scroll-mt-28 overflow-hidden rounded-[var(--radius-soft)] border border-line bg-paper">
      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="display text-[2rem] text-navy sm:text-[2.4rem]">{a.title}</h3>
            <p className="mt-2 text-muted">{a.intro}</p>
          </div>
          <p className="font-semibold text-navy" aria-live="polite">{fill(a.progress, { done: done.size, total: all.length })}</p>
        </div>
        <div className="mt-4 h-2 rounded-full bg-line" aria-hidden="true"><div className="h-2 rounded-full bg-navy transition-all" style={{ width: `${pct}%` }} /></div>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {a.phases.map((p, i) => (
            <div key={p.title}>
              <h4 className="flex items-center gap-3 font-bold text-navy">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne text-[0.9rem] text-brass">{i + 1}</span>{p.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {p.items.map((it, j) => {
                  const k = `${i}-${j}`;
                  const help = "help" in it && it.help;
                  return (
                    <li key={k}>
                      <label className={`flex cursor-pointer gap-3 rounded-md border p-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-champagne ${done.has(k) ? "border-success/40 bg-success/5" : "border-line hover:border-navy/40"}`}>
                        <input type="checkbox" checked={done.has(k)} onChange={() => toggle(k)} className="mt-1 h-5 w-5 shrink-0 accent-[#102A43]" />
                        <span>
                          <span className={`block font-semibold ${done.has(k) ? "text-muted line-through" : "text-navy"}`}>{it.t}</span>
                          <span className="block text-[0.92rem] text-muted">{it.d}</span>
                          {help && <span className="mt-1 inline-flex items-center gap-1 rounded bg-sand px-2 py-0.5 text-[0.8rem] font-semibold text-brass"><Sparkles size={13} aria-hidden="true" /> {a.helpLabel}</span>}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <Link href={href(locale, "contact", { topic: "general" })} className="btn btn-primary mt-8" data-track="cta_tool_arrival">
          {discuss} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
      <div className="border-t border-line bg-ivory px-6 py-4 text-[0.92rem] text-muted sm:px-10">{a.note}</div>
    </div>
  );
}

/* ====================================================== Inflationsrechner */
export function InflationCalc({ locale, t, discuss, disclaimer }: { locale: Locale; t: T2; discuss: string; disclaimer: string }) {
  const f = t.inflation;
  const [amount, setAmount] = useState(1000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(2);
  const factor = Math.pow(1 + rate / 100, years);
  return (
    <CalcShell id="inflation" title={f.title} intro={f.intro}
      footer={<><p>{disclaimer}</p><HowWeCalc t={t} text={f.calc} /></>}
      result={
        <>
          <p className="text-mist">{fill(f.worth, { years })}</p>
          <p className="display mt-2 text-[3.2rem] leading-none text-white sm:text-[4rem]"><span className="ltr-nums">{eur(locale, amount / factor)}</span></p>
          <p className="mt-6 text-mist">{f.need}: <strong className="ltr-nums text-white">{eur(locale, amount * factor)}</strong></p>
          <Link href={href(locale, "contact", { topic: "retirement" })} className="btn btn-gold mt-8 self-start" data-track="cta_tool_inflation">
            {discuss} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </>
      }>
      <Slider label={f.amount} value={amount} min={100} max={10000} step={100} onChange={setAmount} display={eur(locale, amount)} />
      <Slider label={f.years} value={years} min={1} max={40} step={1} onChange={setYears} display={num(locale, years)} />
      <Slider label={f.rate} value={rate} min={0} max={6} step={0.5} onChange={setRate} display={`${rate.toLocaleString(locale === "ar" ? "ar-u-nu-latn" : locale)} %`} />
    </CalcShell>
  );
}

export { Check };
