"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { href, type Locale } from "@/lib/i18n";
import { fill } from "@/lib/format";
import { CalcShell, Slider, eur, num } from "./shared";
import type { Dict } from "@/content";

type CalcT = Dict["calc"];

const RETIRE = 67;

function Footer({ t, text }: { t: CalcT; text: string }) {
  return (
    <>
      <strong className="text-navy">{t.assumptions}:</strong> {text} <span className="block pt-1">{t.disclaimer}</span>
    </>
  );
}

function DiscussLink({ locale, label, topic }: { locale: Locale; label: string; topic: string }) {
  return (
    <Link href={href(locale, "contact", { topic })} className="btn btn-gold mt-8 self-start" data-track={`cta_calc_${topic}`}>
      {label} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
    </Link>
  );
}

export function PensionGap({ locale, t, compact = false }: { locale: Locale; t: CalcT; compact?: boolean }) {
  const [age, setAge] = useState(45);
  const [net, setNet] = useState(3000);
  const [pension, setPension] = useState<number | null>(null);
  const [need, setNeed] = useState(80);
  const p = t.pension;
  const pensionVal = pension ?? Math.round((net * 0.45) / 50) * 50;
  const years = Math.max(RETIRE - age, 0);
  const target = (net * need) / 100;
  const gap = Math.max(target - pensionVal, 0);
  const future = gap * Math.pow(1.02, years);
  const share = target > 0 ? Math.min(pensionVal / target, 1) : 1;

  return (
    <CalcShell
      id="rentenluecke"
      title={p.title}
      intro={p.intro}
      footer={<Footer t={t} text={p.assumptionsText} />}
      result={
        <>
          <p className="text-mist">{p.result}</p>
          {gap > 0 ? (
            <>
              <p className="display mt-2 text-[3.4rem] leading-none text-white sm:text-[4.2rem]">
                <span className="ltr-nums">{eur(locale, gap)}</span>
              </p>
              <p className="mt-1 text-champagne-light">{t.perMonth}</p>
              <div className="mt-8" aria-hidden="true">
                <div className="flex h-4 overflow-hidden rounded-full bg-white/10">
                  <div className="bg-champagne-light" style={{ width: `${share * 100}%` }} />
                  <div className="bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.35)_0_6px,transparent_6px_12px)]" style={{ width: `${(1 - share) * 100}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-[0.85rem] text-mist">
                  <span>{p.pension.split("(")[0]}</span>
                  <span className="ltr-nums">{eur(locale, target)}</span>
                </div>
              </div>
              {years > 0 && (
                <p className="mt-6 text-mist">
                  {fill(p.resultFuture, { years })} <strong className="ltr-nums text-white">{eur(locale, future)}</strong> {t.perMonth}.
                </p>
              )}
            </>
          ) : (
            <p className="mt-3 text-lg">{p.none}</p>
          )}
          {!compact && <DiscussLink locale={locale} label={t.discuss} topic="retirement" />}
          {compact && <DiscussLink locale={locale} label={t.discuss} topic="retirement" />}
        </>
      }
    >
      <Slider label={p.age} value={age} min={20} max={66} step={1} onChange={setAge} display={num(locale, age)} />
      <Slider label={p.net} value={net} min={1000} max={8000} step={100} onChange={setNet} display={eur(locale, net)} />
      <Slider label={p.pension} value={pensionVal} min={0} max={4000} step={50} onChange={setPension} display={eur(locale, pensionVal)} hint={p.pensionHint} />
      <Slider label={p.need} value={need} min={60} max={100} step={5} onChange={setNeed} display={`${need} %`} hint={p.needHint} />
    </CalcShell>
  );
}

function fv(monthly: number, months: number, rate: number) {
  if (rate === 0) return monthly * months;
  const r = rate / 12;
  return monthly * ((Math.pow(1 + r, months) - 1) / r);
}

export function KidsSavings({ locale, t }: { locale: Locale; t: CalcT }) {
  const [age, setAge] = useState(2);
  const [monthly, setMonthly] = useState(50);
  const [until, setUntil] = useState(18);
  const k = t.kids;
  const months = Math.max(until - age, 0) * 12;
  const rows = [
    { label: k.s0, v: fv(monthly, months, 0) },
    { label: k.s2, v: fv(monthly, months, 0.02) },
    { label: k.s5, v: fv(monthly, months, 0.05) },
  ];
  const max = Math.max(...rows.map((r) => r.v), 1);
  return (
    <CalcShell
      id="kinder-sparziel"
      title={k.title}
      intro={k.intro}
      footer={<Footer t={t} text={k.assumptionsText} />}
      result={
        <>
          <p className="text-mist">{k.scenarios}</p>
          <ul className="mt-5 space-y-5">
            {rows.map((r) => (
              <li key={r.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-mist">{r.label}</span>
                  <strong className="ltr-nums display text-[2rem] text-white">{eur(locale, r.v)}</strong>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/10" aria-hidden="true">
                  <div className="h-2 rounded-full bg-champagne-light" style={{ width: `${(r.v / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-mist">{k.paid}: <span className="ltr-nums text-white">{eur(locale, monthly * months)}</span></p>
          <DiscussLink locale={locale} label={t.discuss} topic="kids" />
        </>
      }
    >
      <Slider label={k.age} value={age} min={0} max={17} step={1} onChange={(v) => { setAge(v); if (until <= v) setUntil(Math.min(v + 1, 30)); }} display={num(locale, age)} />
      <Slider label={k.monthly} value={monthly} min={10} max={300} step={5} onChange={setMonthly} display={eur(locale, monthly)} />
      <Slider label={k.until} value={until} min={Math.max(age + 1, 18)} max={30} step={1} onChange={setUntil} display={num(locale, until)} />
    </CalcShell>
  );
}

export function IncomeValue({ locale, t }: { locale: Locale; t: CalcT }) {
  const [age, setAge] = useState(35);
  const [net, setNet] = useState(2800);
  const i = t.income;
  const total = net * 12 * Math.max(RETIRE - age, 0);
  return (
    <CalcShell
      id="arbeitskraft"
      title={i.title}
      intro={i.intro}
      footer={<Footer t={t} text={i.assumptionsText} />}
      result={
        <>
          <p className="text-mist">{i.result}</p>
          <p className="display mt-2 text-[3.2rem] leading-none text-white sm:text-[4rem]"><span className="ltr-nums">{eur(locale, total)}</span></p>
          <p className="mt-6 text-mist">{i.compare}</p>
          <DiscussLink locale={locale} label={t.discuss} topic="bu" />
        </>
      }
    >
      <Slider label={i.age} value={age} min={18} max={66} step={1} onChange={setAge} display={num(locale, age)} />
      <Slider label={i.net} value={net} min={1000} max={10000} step={100} onChange={setNet} display={eur(locale, net)} />
    </CalcShell>
  );
}
