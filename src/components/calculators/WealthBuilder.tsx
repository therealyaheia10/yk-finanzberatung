"use client";

/**
 * „Wealth Builder“ – vom Kunden geliefertes Tool (IFC_wealth_builder_calculator.html).
 * Formel (10 % p. a., monatliche Einzahlung am Monatsende), Gültigkeitsregeln, Startwerte
 * und die Hilfe-Box nach 3 erfolglosen Anpassungen sind 1:1 übernommen. Die im Original
 * noch offenen Buchungs-Links führen jetzt zur Kontaktseite.
 */
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { href, numberLocale, type Locale } from "@/lib/i18n";
import { T } from "./wealthBuilderText";

type Mode = "self" | "child";

export function WealthBuilder({ locale, initialMode = "self" }: { locale: Locale; initialMode?: Mode }) {
  const t = T[locale];
  const uid = useId();
  const eur = (n: number) => new Intl.NumberFormat(numberLocale[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n).replace(/[‎‏]/g, "");
  const defaults = (m: Mode) => ({ age: m === "self" ? "30" : "5", years: "50", childGoalAge: "18", monthly: m === "self" ? 200 : 100, goal: m === "self" ? 100000 : 50000 });
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [v, setV] = useState(defaults(initialMode));
  const [helpShown, setHelpShown] = useState({ self: false, child: false });
  const unsuccessful = useRef(0);

  const age = Number(v.age), goalAge = Number(v.childGoalAge), monthly = v.monthly, goal = v.goal;
  const years = (mode === "child" ? goalAge : Number(v.years)) - age;
  const initial = 0;
  const valid = [age, years, monthly, goal, initial].every(Number.isFinite) && age >= 0 && (mode === "child" ? age <= 69 && goalAge <= 70 && goalAge > age : age <= 90) && years >= 1 && years <= 70 && age + years <= 100 && monthly >= 0 && goal > 0 && initial >= 0 && initial <= 10000000;
  const n = Math.round(years * 12), r = Math.pow(1 + 10 / 100, 1 / 12) - 1, growth = Math.pow(1 + r, n), factor = (growth - 1) / r;
  const future = initial * growth + monthly * factor;
  const shortfall = Math.max(0, goal - future);
  const required = Math.max(0, (goal - initial * growth) / factor);
  const pct = Math.min(100, (100 * future) / goal);
  const helpVisible = valid && shortfall > 0 && helpShown[mode];
  useEffect(() => { if (valid && shortfall <= 0) unsuccessful.current = 0; }, [valid, shortfall]);

  function setMode(next: Mode) {
    setModeState(next); unsuccessful.current = 0; setV(defaults(next));
  }
  // Ein „Versuch“ ist eine abgeschlossene Regler-Änderung (wie im Original das change-Event)
  function onMonthlyCommit(m: number) {
    const targetAge = Number(mode === "child" ? v.childGoalAge : v.years);
    const yrs = targetAge - Number(v.age);
    if (yrs < 1 || yrs > 70 || !Number.isFinite(m) || !Number.isFinite(goal)) return;
    const rr = Math.pow(1.10, 1 / 12) - 1;
    const f = (Math.pow(1 + rr, Math.round(yrs * 12)) - 1) / rr;
    if (m * f < goal) { unsuccessful.current++; if (unsuccessful.current >= 3) setHelpShown((h) => ({ ...h, [mode]: true })); }
    else { unsuccessful.current = 0; setHelpShown((h) => ({ ...h, [mode]: false })); }
  }

  const fillGoal = ((goal - 5000) / (1000000 - 5000)) * 100;
  const fillMonthly = (monthly / 3000) * 100;
  const input = "ltr-nums mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3 text-[1.05rem] font-medium text-ink focus:border-navy";
  const lbl = "text-[0.9rem] text-muted";

  return (
    <div className="card overflow-hidden">
      <header className="navy-surface on-dark px-5 py-6 text-white sm:px-8 sm:py-8">
        <p className="tracking-label text-[0.72rem] font-bold text-champagne-light">{t.eyebrow}</p>
        <h2 className="display mt-2 text-[1.8rem] hyphens-manual! sm:text-[2.4rem]">{t.title}</h2>
        <p className="mt-2 max-w-2xl text-mist">{t.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label={t.tablist}>
          {(["self", "child"] as const).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => setMode(m)} data-track={`tool_wealth_${m}`}
              className={`min-h-11 rounded-full px-5 font-semibold transition-colors ${mode === m ? "bg-champagne-light text-navy-deep" : "border border-white/25 text-white hover:border-white/60"}`}>
              {m === "self" ? t.tabSelf : t.tabChild}
            </button>
          ))}
        </div>
      </header>

      <div className="p-5 sm:p-8">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brass">{mode === "self" ? t.tagSelf : t.tagChild}</p>
        <h3 className="display mt-2 text-[1.5rem] text-navy sm:text-[1.9rem]">{mode === "self" ? t.titleSelf : t.titleChild}</h3>
        <p className="mt-1 text-muted">{mode === "self" ? t.introSelf : t.introChild}</p>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor={`${uid}-goal`} className="font-semibold text-navy">{t.goal}</label>
            <output htmlFor={`${uid}-goal`} className="ltr-nums text-[1.5rem] font-bold text-brass">{eur(goal)}</output>
          </div>
          <input id={`${uid}-goal`} type="range" min={5000} max={1000000} step={5000} value={goal} style={{ ["--fill" as string]: `${fillGoal}%` }} aria-valuetext={eur(goal)}
            onChange={(e) => setV((o) => ({ ...o, goal: Number(e.target.value) }))} />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block font-semibold text-navy">{mode === "self" ? t.ageSelf : t.ageChild}
            <input type="number" inputMode="numeric" min={0} max={mode === "child" ? 69 : 90} value={v.age} onChange={(e) => setV((o) => ({ ...o, age: e.target.value }))} className={input} />
          </label>
          {mode === "self" ? (
            <label className="block font-semibold text-navy">{t.targetAge}
              <input type="number" inputMode="numeric" min={1} max={100} value={v.years} onChange={(e) => setV((o) => ({ ...o, years: e.target.value }))} className={input} />
            </label>
          ) : (
            <label className="block font-semibold text-navy">{t.childGoalAge}
              <input type="number" inputMode="numeric" min={1} max={70} step={1} value={v.childGoalAge} onChange={(e) => setV((o) => ({ ...o, childGoalAge: e.target.value }))} className={input} />
              <span className="mt-1 block text-[0.85rem] font-normal text-muted">{age >= 0 && goalAge > age ? t.yearsToInvest.replace("{n}", String(years)) : ""}</span>
            </label>
          )}
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label htmlFor={`${uid}-monthly`} className="font-semibold text-navy">{t.monthly}</label>
            <output htmlFor={`${uid}-monthly`} className="ltr-nums text-[1.5rem] font-bold text-brass">{eur(monthly)}</output>
          </div>
          <input id={`${uid}-monthly`} type="range" min={0} max={3000} step={25} value={monthly} style={{ ["--fill" as string]: `${fillMonthly}%` }} aria-valuetext={eur(monthly)}
            onChange={(e) => setV((o) => ({ ...o, monthly: Number(e.target.value) }))}
            onPointerUp={(e) => onMonthlyCommit(Number((e.target as HTMLInputElement).value))}
            onKeyUp={(e) => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key)) onMonthlyCommit(Number((e.target as HTMLInputElement).value)); }} />
        </div>

        {helpVisible && (
          <aside className="dropdown-panel mt-4 rounded-2xl border border-success/30 bg-[#eef6f1] p-5" aria-live="polite">
            <h4 className="text-[1.15rem] font-semibold text-navy">{t.helpTitle}</h4>
            <p className="mt-1 text-muted">{t.helpText}</p>
            <Link href={href(locale, "contact")} className="link mt-2 inline-flex min-h-11 items-center" data-track="tool_wealth_help">{t.helpLink}</Link>
          </aside>
        )}
        <p className="mt-4 text-[0.88rem] text-muted">{t.rateNote[0]}<strong className="text-navy">{t.rateNote[1]}</strong>{t.rateNote[2]}</p>
        <p role="alert" className="mt-1 min-h-5 text-[0.9rem] font-medium text-error">{valid ? "" : mode === "child" ? t.errChild : t.errSelf}</p>

        <section className="mt-6 border-t border-line pt-6" aria-live="polite">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brass">{t.projection}</p>
          <h3 className="display mt-2 text-[1.5rem] text-navy sm:text-[1.9rem]">
            {!valid ? t.resultPlain : mode === "self" ? t.resultSelf.replace("{age}", String(age + years)) : t.resultChild.replace("{age}", String(goalAge))}
          </h3>
          <p className="mt-1 text-[0.88rem] text-muted">{t.projNote[0]}<strong className="text-navy">{t.projNote[1]}</strong>{t.projNote[2]}</p>
          {valid && (
            <div className="mt-4 rounded-2xl border border-line bg-ivory p-5">
              <p className="font-semibold text-brass">{t.scenario}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><div className={lbl}>{t.target}</div><div className="ltr-nums mt-1 text-[clamp(1.6rem,4vw,2.3rem)] font-bold text-brass">{eur(goal)}</div></div>
                <div><div className={lbl}>{t.projected.replace("{age}", String(age + years))}</div><div className="ltr-nums mt-1 text-[clamp(1.8rem,5vw,2.7rem)] font-bold text-success">{eur(future)}</div></div>
                <div><div className={lbl}>{t.needed}</div><div className="mt-1 text-[clamp(1.8rem,5vw,2.7rem)] font-bold text-brass"><span className="ltr-nums">{eur(required)}</span>{t.perMonth}</div></div>
                <div className="sm:col-span-2"><div className={lbl}>{shortfall > 0 ? t.remaining : t.yourGoal}</div><div className={`ltr-nums mt-1 text-[clamp(1.6rem,4vw,2.3rem)] font-bold ${shortfall > 0 ? "text-error" : "text-success"}`}>{shortfall > 0 ? eur(shortfall) : t.reached}</div></div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-success transition-[width] duration-200" style={{ width: `${pct.toFixed(1)}%` }} /></div>
              <p className="mt-2 text-[0.88rem] text-muted">{t.ofGoal.replace("{p}", pct.toFixed(0))}</p>
            </div>
          )}
          <Link href={href(locale, "contact")} className="btn btn-gold mt-6 w-full" data-track="tool_wealth_book">{t.book}</Link>
          <p className="mt-6 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-muted">{t.fine}</p>
        </section>
      </div>
    </div>
  );
}
