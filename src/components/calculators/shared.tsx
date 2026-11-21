"use client";

import { useId } from "react";
import { numberLocale, type Locale } from "@/lib/i18n";

export function eur(locale: Locale, v: number) {
  return new Intl.NumberFormat(numberLocale[locale], { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(v));
}
export function num(locale: Locale, v: number) {
  return new Intl.NumberFormat(numberLocale[locale], { maximumFractionDigits: 0 }).format(v);
}

export function Slider({
  label, value, min, max, step, onChange, display, hint,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; display: string; hint?: string;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold text-navy">{label}</label>
        <output htmlFor={id} className="ltr-nums shrink-0 text-lg font-bold text-navy">{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-valuetext={display}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && <p id={`${id}-hint`} className="-mt-1 text-[0.92rem] leading-snug text-muted">{hint}</p>}
    </div>
  );
}

export function CalcShell({
  id, title, intro, children, result, footer,
}: {
  id: string; title: string; intro: string; children: React.ReactNode; result: React.ReactNode; footer: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-6 sm:p-10">
          <h3 className="display text-[1.4rem] text-navy sm:text-[1.75rem]">{title}</h3>
          <p className="mt-2 text-muted">{intro}</p>
          <div className="mt-6 space-y-2">{children}</div>
        </div>
        <div className="navy-surface on-dark flex flex-col justify-center p-6 text-white sm:p-10" aria-live="polite">
          {result}
        </div>
      </div>
      <div className="border-t border-line bg-ivory px-6 py-5 text-[0.92rem] leading-relaxed text-muted sm:px-10">{footer}</div>
    </div>
  );
}
