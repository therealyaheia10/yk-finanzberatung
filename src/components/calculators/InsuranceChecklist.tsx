"use client";

/**
 * „Insurance Checklist“ – vom Kunden geliefertes Tool (IFC_insurance_checklist.html).
 * Fragen, Regeln (when), Prioritäten und Zählung sind 1:1 übernommen; nur Design und
 * Übersetzungen wurden angepasst. Der Buchungs-Button führt zur Kontaktseite.
 */
import Link from "next/link";
import { useRef, useState } from "react";
import { href, numberLocale, type Locale } from "@/lib/i18n";
import { T, type ProductId } from "./insuranceChecklistText";

type State = { work: string; family: string; home: string; car: string; travel: string; salary: number };
type Level = "top" | "should";
const products: { id: ProductId; level: Level; when: (s: State) => boolean }[] = [
  { id: "disability", level: "top", when: () => true },
  { id: "life", level: "top", when: (s) => s.family === "partner" || s.family === "children" },
  { id: "privatehealth", level: "top", when: (s) => s.work === "self" || (s.work === "employed" && s.salary > 77400) },
  { id: "liability", level: "should", when: () => true },
  { id: "car", level: "should", when: (s) => s.car === "yes" },
  { id: "retirement", level: "top", when: () => true },
  { id: "building", level: "should", when: (s) => s.home === "own" },
  { id: "contents", level: "should", when: (s) => s.home === "rent" },
  { id: "travel", level: "should", when: (s) => s.travel === "yes" },
  { id: "legal", level: "should", when: () => true },
  { id: "kids", level: "top", when: (s) => s.family === "children" },
];

function Choices({ name, legend, options, value, onChange }: { name: string; legend: string; options: [string, string][]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="border-b border-line pb-5 last:border-0">
      <legend className="mb-3 font-semibold text-navy">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <label key={v} className="relative cursor-pointer">
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="peer absolute h-px w-px opacity-0" />
            <span className="inline-flex min-h-11 items-center rounded-xl border border-line bg-paper px-4 py-2 text-[0.95rem] font-semibold text-navy transition-colors hover:border-navy/50 peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne">{l}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function InsuranceChecklist({ locale }: { locale: Locale }) {
  const t = T[locale];
  const nf = (n: number) => new Intl.NumberFormat(numberLocale[locale]).format(n);
  const [s, setS] = useState<State>({ work: "employed", family: "single", home: "rent", car: "no", travel: "no", salary: 60000 });
  const [salaryText, setSalaryText] = useState("60000");
  const [page, setPage] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Set<ProductId>>(new Set());
  const top = useRef<HTMLDivElement>(null);
  const set = (k: keyof State) => (v: string) => setS((o) => ({ ...o, [k]: v }));

  // Gleiche Auswahl-Logik wie im Original: alle Top-Prioritäten + höchstens 5 „Should-Haves“
  const visible = [...products.filter((p) => p.level === "top" && p.when(s)), ...products.filter((p) => p.level === "should" && p.when(s)).slice(0, 5)];
  const notCovered = visible.filter((p) => !selected.has(p.id));
  const done = visible.length - notCovered.length;
  const pct = visible.length ? Math.round((done / visible.length) * 100) : 0;
  const shortName = (id: ProductId) => t.products[id][0].replace(/ \(.*?\)/g, "").replace(/ [—–] .*$/, "");
  const go = (n: 1 | 2) => { setPage(n); requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const toggle = (id: ProductId, on: boolean) => setSelected((o) => { const n = new Set(o); if (on) n.add(id); else n.delete(id); return n; });
  const sliderFill = (Math.min(200000, s.salary) / 200000) * 100;

  const item = (id: ProductId) => {
    const on = selected.has(id);
    const [name, desc] = t.products[id];
    return (
      <article key={id} className={`flex flex-col gap-3 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-5 ${on ? "border-success/40 bg-[#eef6f1]" : "border-line bg-paper"}`}>
        <div className="min-w-0">
          <h4 className={`font-semibold leading-snug ${on ? "text-success" : "text-navy"}`}>{name}</h4>
          <p className="mt-1 text-[0.9rem] leading-snug text-muted">{desc}</p>
        </div>
        <label className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap font-semibold text-navy">
          <input type="checkbox" checked={on} onChange={(e) => toggle(id, e.target.checked)} aria-label={t.haveAria.replace("{name}", name)} className="h-5 w-5 accent-[#1f6b4a]" />
          {t.have}
        </label>
      </article>
    );
  };

  return (
    <div ref={top} className="card scroll-mt-24 overflow-hidden">
      <header className="navy-surface on-dark px-5 py-6 text-white sm:px-8 sm:py-8">
        <p className="tracking-label text-[0.72rem] font-bold text-champagne-light">{t.eyebrow}</p>
        <h2 className="display mt-2 text-[1.8rem] hyphens-manual! sm:text-[2.4rem]">{t.title}</h2>
        <p className="mt-2 max-w-2xl text-mist">{t.intro}</p>
      </header>

      <div className="p-5 sm:p-8">
        {page === 1 && (
          <div className="dropdown-panel">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-brass">{t.p1Step}</p>
            <h3 className="display mt-2 text-[1.5rem] text-navy sm:text-[1.9rem]">{t.p1Title}</h3>
            <p className="mt-1 text-muted">{t.p1Text}</p>
            <div className="mt-6 grid gap-5">
              <Choices name="work" legend={t.work[0]} value={s.work} onChange={set("work")} options={[["employed", t.work[1]], ["self", t.work[2]], ["student", t.work[3]]]} />
              {s.work === "employed" && (
                <div className="rounded-2xl border border-line bg-ivory p-4 sm:p-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <label htmlFor="ic-salary" className="font-semibold text-navy">{t.salaryQ}</label>
                    <div>
                      <label htmlFor="ic-salary-input" className="mb-1 block text-[0.8rem] text-muted">{t.salaryOr}</label>
                      <input id="ic-salary-input" type="number" inputMode="numeric" min={0} max={1000000} step={100} value={salaryText}
                        onChange={(e) => { setSalaryText(e.target.value); const v = Number(e.target.value); if (Number.isFinite(v) && v >= 0) setS((o) => ({ ...o, salary: v })); }}
                        onBlur={() => { let v = Number(salaryText); if (!Number.isFinite(v) || v < 0) v = 0; v = Math.min(1000000, v); setSalaryText(String(v)); setS((o) => ({ ...o, salary: v })); }}
                        className="ltr-nums w-40 max-w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-[1.05rem] font-bold text-navy" />
                    </div>
                  </div>
                  <input id="ic-salary" type="range" min={0} max={200000} step={1000} value={Math.min(200000, s.salary)} style={{ ["--fill" as string]: `${sliderFill}%` }} aria-valuetext={`${nf(s.salary)} €`}
                    onChange={(e) => { const v = Number(e.target.value); setS((o) => ({ ...o, salary: v })); setSalaryText(String(v)); }} />
                  <p className="text-[0.82rem] text-muted">{t.salaryHint}</p>
                  <p className="mt-2 text-[0.85rem] text-muted">{t.salaryNote}</p>
                </div>
              )}
              <Choices name="family" legend={t.family[0]} value={s.family} onChange={set("family")} options={[["single", t.family[1]], ["partner", t.family[2]], ["children", t.family[3]]]} />
              <Choices name="home" legend={t.home[0]} value={s.home} onChange={set("home")} options={[["rent", t.home[1]], ["own", t.home[2]]]} />
              <Choices name="car" legend={t.car[0]} value={s.car} onChange={set("car")} options={[["yes", t.car[1]], ["no", t.car[2]]]} />
              <Choices name="travel" legend={t.travel[0]} value={s.travel} onChange={set("travel")} options={[["yes", t.travel[1]], ["no", t.travel[2]]]} />
            </div>
            <button type="button" className="btn btn-gold mt-6 w-full sm:w-auto" onClick={() => go(2)} data-track="tool_checklist_show">{t.show}</button>
          </div>
        )}

        {page === 2 && (
          <div className="dropdown-panel">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-brass">{t.p2Step}</p>
            <h3 className="display mt-2 text-[1.5rem] text-navy sm:text-[1.9rem]">{t.p2Title}</h3>
            <p className="mt-3 rounded-xl bg-ivory px-4 py-3 text-muted">{t.leadA}<strong className="text-navy">{t.leadB}</strong>{t.leadC}<strong className="text-navy">{t.leadD}</strong>{t.leadE}</p>

            {(["top", "should"] as const).map((level) => {
              const group = visible.filter((p) => p.level === level);
              if (!group.length) return null;
              const head = (
                <div className="mb-3">
                  <p className={`font-semibold text-navy ${level === "top" ? "text-[1.35rem]" : "text-[1.15rem]"}`}>{t.titles[level]}</p>
                  <p className="text-[0.88rem] text-muted">{t.descriptions[level]}</p>
                </div>
              );
              const items = <div className="grid gap-2.5">{group.map((p) => item(p.id))}</div>;
              return level === "top" ? (
                <section key={level} className="mt-6 rounded-2xl border-2 border-champagne bg-[#faf5ea] p-4 sm:p-5">
                  <span className="mb-2 inline-block rounded-full bg-champagne-light px-3 py-1 text-[0.7rem] font-bold tracking-[0.08em] text-navy-deep">{t.focus}</span>
                  {head}{items}
                </section>
              ) : <section key={level} className="mt-7">{head}{items}</section>;
            })}

            <p className="mt-8 text-[1.15rem] font-semibold text-navy">{t.overview}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line bg-ivory p-4"><b className="block text-[2rem] text-success"><span className="ltr-nums">{done}</span></b><span className="text-[0.85rem] text-muted">{t.covered}</span></div>
              <div className="rounded-2xl border border-line bg-ivory p-4"><b className="block text-[2rem] text-error"><span className="ltr-nums">{notCovered.length}</span></b><span className="text-[0.85rem] text-muted">{t.missing}</span></div>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={t.progress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
              <div className="h-full rounded-full bg-success transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-[0.92rem] text-muted" aria-live="polite">{t.summary.replace("{done}", String(done)).replace("{missing}", String(notCovered.length))}</p>

            <div className="mt-5 rounded-2xl border border-success/30 bg-[#eef6f1] p-5" aria-live="polite">
              <h4 className="text-[1.2rem] font-semibold text-navy">{notCovered.length ? t.consultTitle : t.fullTitle}</h4>
              <p className="mt-2 text-muted">
                {notCovered.length ? <>{t.missingIntro}<span className="font-semibold text-error">{notCovered.map((p) => shortName(p.id)).join(", ")}</span>{t.missingEnd}</> : t.fullText}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={href(locale, "contact")} className="btn btn-gold" data-track="tool_checklist_book">{t.book}</Link>
              <button type="button" className="btn btn-ghost" onClick={() => go(1)}>{t.back}</button>
            </div>
          </div>
        )}
        <p className="mt-8 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-muted">{t.disclaimer}</p>
      </div>
    </div>
  );
}
