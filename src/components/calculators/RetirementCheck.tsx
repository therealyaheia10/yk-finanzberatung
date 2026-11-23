"use client";

/**
 * „Retirement Reality Check“ – vom Kunden geliefertes Tool (IFC_retirement_calculator.html).
 * Rechenlogik, Schritte und Buttons sind 1:1 übernommen; nur Design (Farben, Schrift)
 * und Übersetzungen wurden an die Website angepasst. Bitte die Formel nicht ändern.
 */
import { useId, useRef, useState } from "react";
import { numberLocale, type Locale } from "@/lib/i18n";
import { T } from "./retirementCheckText";

type Result = { paper: number; real: number; goal: number; years: number; shortfall: number };

const card = "rounded-2xl border border-line bg-ivory p-5";
const redCard = "rounded-2xl border-2 border-error/70 bg-[#fbeceb] p-5";
const bigNum = "ltr-nums my-2 text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-[-0.03em] [overflow-wrap:anywhere]";
const label = "text-[0.9rem] text-muted";
const small = "text-[0.85rem] leading-snug text-muted";
const stepNum = "text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brass";
const h2 = "display mb-5 mt-2 text-[1.5rem] text-navy sm:text-[2rem]";
const btn = "btn btn-primary";
const btn2 = "btn btn-ghost";

export function RetirementCheck({ locale }: { locale: Locale }) {
  const t = T[locale];
  const fmt = (x: number) => new Intl.NumberFormat(numberLocale[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(x).replace(/[\u200e\u200f]/g, "");
  const uid = useId();
  const [v, setV] = useState({ age: "35", retire: "67", salary: "3500", worked: "10" });
  const [goal, setGoal] = useState(2500);
  const [error, setError] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [step, setStep] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (el: HTMLElement | null) => requestAnimationFrame(() => el?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const show = (n: number) => { setStep(n); scrollTo(resultsRef.current); };

  // Rechenlogik unverändert aus der gelieferten Datei
  function calculate() {
    const age = +v.age, ret = +v.retire, salary = +v.salary, worked = +v.worked;
    const valid = [age, ret, salary, worked, goal].every(Number.isFinite) && age >= 18 && age <= 80 && ret > age && ret <= 85 && salary >= 0 && salary <= 100000 && worked >= 0 && worked <= 60 && worked <= age - 16;
    if (!valid) { setError(t.error); return; }
    setError("");
    const years = ret - age;
    const pts = Math.min(salary * 12, 101400) / 51944 * (worked + years);
    const paper = pts * 42.52 * Math.pow(1.02, years);
    const real = paper / Math.pow(1.028, years);
    const shortfall = Math.max(0, goal - real);
    setRes({ paper, real, goal, years, shortfall });
    show(1);
  }
  const reset = () => { setRes(null); scrollTo(inputsRef.current); };

  const fields = [["age", t.age, 18, 80, 1], ["retire", t.retire, 40, 85, 1], ["salary", t.salary, 0, 100000, 100], ["worked", t.worked, 0, 60, 1]] as const;
  const fill = ((goal - 500) / (10000 - 500)) * 100;
  const first = res ? res.goal - res.paper : 0;
  const percent = res ? Math.min(100, res.goal > 0 ? (res.real / res.goal) * 100 : 100) : 0;

  return (
    <div className="card overflow-hidden">
      <header className="navy-surface on-dark px-5 py-6 text-white sm:px-8 sm:py-8">
        <p className="tracking-label text-[0.72rem] font-bold text-champagne-light">{t.eyebrow}</p>
        <h2 className="display mt-2 text-[1.8rem] sm:text-[2.4rem]">{t.title}<span className="text-champagne-light">.</span></h2>
        <p className="mt-2 max-w-2xl text-mist">{t.intro}</p>
      </header>

      <div className="p-5 sm:p-8">
        <div ref={inputsRef} className="scroll-mt-24">
          <p className={stepNum}>{t.inputsLabel}</p>
          <h3 className={h2}>{t.inputsTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([k, l, min, max, step]) => (
              <label key={k} className="block font-semibold text-navy">
                {l}
                <input type="number" inputMode="numeric" min={min} max={max} step={step} value={v[k]} onChange={(e) => setV((s) => ({ ...s, [k]: e.target.value }))}
                  className="ltr-nums mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1.05rem] font-medium text-ink focus:border-navy" />
              </label>
            ))}
          </div>
          <div className="mt-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor={`${uid}-goal`} className="font-semibold text-navy">{t.goal}</label>
              <output htmlFor={`${uid}-goal`} className="ltr-nums text-[1.5rem] font-bold text-brass">{fmt(goal)}</output>
            </div>
            <input id={`${uid}-goal`} type="range" min={500} max={10000} step={100} value={goal} onChange={(e) => setGoal(+e.target.value)} style={{ ["--fill" as string]: `${fill}%` }} aria-describedby={`${uid}-goalhint`} aria-valuetext={fmt(goal)} />
            <p id={`${uid}-goalhint`} className={small}>{t.goalHint}</p>
          </div>
          <p className={`${small} mt-4`}>{t.inflationNote[0]}<strong className="text-brass">{t.inflationNote[1]}</strong>{t.inflationNote[2]}</p>
          <p role="alert" className="mt-2 min-h-5 text-[0.9rem] font-medium text-error">{error}</p>
          <button type="button" className="btn btn-gold mt-2" onClick={calculate} data-track="tool_retirement_calc">{t.calculate}</button>
        </div>

        {res && (
          <div ref={resultsRef} className="mt-10 scroll-mt-24 border-t border-line pt-6" aria-live="polite">
            <div className="mb-5 flex gap-2" role="progressbar" aria-label={t.progress} aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
              {[1, 2, 3].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-champagne" : "bg-line"}`} />)}
            </div>

            {step === 1 && (
              <article className="dropdown-panel">
                <p className={stepNum}>{t.s1Label}</p>
                <h3 className={h2}>{t.s1Title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className={card}><div className={label}>{t.paper}</div><div className={`${bigNum} text-navy`}>{fmt(res.paper)}</div><div className={small}>{t.perMonthRetire}</div></div>
                  <div className={card}><div className={label}>{t.want}</div><div className={`${bigNum} text-brass`}>{fmt(res.goal)}</div><div className={small}>{t.perMonthToday}</div></div>
                </div>
                <div className={`${card} mt-3`}>
                  <div className={label}>{t.firstGap}</div>
                  <div className={`${bigNum.replace("ltr-nums ", "")} text-navy`}><span className="ltr-nums">{(first > 0 ? "− " : "") + fmt(Math.abs(first))}</span>{first <= 0 ? t.surplus : ""}</div>
                  <div className={small}>{t.firstGapNote}</div>
                </div>
                <p className="mt-5 text-muted">{t.s1Text}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" className={btn} onClick={() => show(2)}>{t.catch}</button>
                  <button type="button" className={btn2} onClick={reset}>{t.change}</button>
                </div>
              </article>
            )}

            {step === 2 && (
              <article className="dropdown-panel">
                <p className={stepNum}>{t.s2Label}</p>
                <div className="my-3 text-[clamp(3.5rem,12vw,6.5rem)] font-black leading-none tracking-[-0.06em] text-error">{t.but}</div>
                <h3 className={h2}>{t.s2Title}</h3>
                <div className="my-4 rounded-e-xl border-s-[3px] border-champagne bg-sand px-4 py-3">
                  <strong className="text-navy">{t.defTitle}</strong>
                  <p className="mt-1 text-muted">{t.defText}</p>
                </div>
                <p className="text-muted">{t.s2Text[0]}<strong className="text-brass">{t.s2Text[1]}</strong>{t.s2Text[2]}<strong className="text-navy">{res.years}</strong>{t.s2Text[3]}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className={card}><div className={label}>{t.paper2}</div><div className={`${bigNum} text-navy`}>{fmt(res.paper)}</div><div className={small}>{t.futureEuros}</div></div>
                  <div className={redCard}><div className={label}>{t.real}</div><div className={`${bigNum} text-error`}>{fmt(res.real)}</div><div className={small}>{t.realNote}</div></div>
                </div>
                <div className={`${redCard} mt-3`}>
                  <div className={label}>{t.lossLabel}</div>
                  <div className="my-2 text-[clamp(1.75rem,5vw,2.9rem)] font-black tracking-[-0.03em] text-error"><span className="ltr-nums">{"− " + fmt(Math.max(0, res.paper - res.real))}</span>{t.perMonth}</div>
                  <div className={small}>{t.lossNote}</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" className={btn} onClick={() => show(3)}>{t.showGap}</button>
                  <button type="button" className={btn2} onClick={() => show(1)}>{t.back}</button>
                </div>
              </article>
            )}

            {step === 3 && (
              <article className="dropdown-panel">
                <p className={stepNum}>{t.s3Label}</p>
                <h3 className={h2}>{t.s3Title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className={card}><div className={label}>{t.real3}</div><div className={`${bigNum} text-error`}>{fmt(res.real)}</div><div className={small}>{t.perMonthTodayEuros}</div></div>
                  <div className={card}><div className={label}>{t.want3}</div><div className={`${bigNum} text-brass`}>{fmt(res.goal)}</div><div className={small}>{t.perMonthTodayEuros}</div></div>
                </div>
                <div className={`${redCard} mt-3`}>
                  <div className="text-[0.85rem] font-bold tracking-[0.04em] text-error">{t.gapLabel}</div>
                  <div className="my-2 text-[clamp(1.75rem,5vw,2.9rem)] font-black tracking-[-0.03em] text-error">{res.shortfall > 0 ? <><span className="ltr-nums">{"− " + fmt(res.shortfall)}</span>{t.perMonth}</> : t.noGap}</div>
                  <div className="my-3 h-3 overflow-hidden rounded-full bg-error/25"><div className="h-full rounded-full bg-navy transition-[width] duration-500" style={{ width: `${percent}%` }} /></div>
                  <div className={small}>{t.coverage.replace("{p}", String(Math.round(percent)))}</div>
                </div>
                <p className="mt-5 text-muted">{t.s3Text}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" className={btn2} onClick={() => show(2)}>{t.back}</button>
                  <button type="button" className={btn} onClick={reset}>{t.again}</button>
                </div>
              </article>
            )}
          </div>
        )}

        <p className="mt-8 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-muted">{t.fine}</p>
      </div>
    </div>
  );
}

