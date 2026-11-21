"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Baby, Briefcase, HeartPulse, Sunset, Users, Compass, Check, ArrowRight } from "lucide-react";
import { href, type Locale, type RouteKey } from "@/lib/i18n";

const OPTIONS = [
  { key: "kids", icon: Baby, route: "kids", topic: "kids" },
  { key: "income", icon: Briefcase, route: "bu", topic: "bu" },
  { key: "health", icon: HeartPulse, route: "pkv", topic: "pkv" },
  { key: "retirement", icon: Sunset, route: "retirement", topic: "retirement" },
  { key: "team", icon: Users, route: "business", topic: "bav" },
  { key: "orient", icon: Compass, route: "solutions", topic: "general" },
] as const;

type FinderT = {
  options: Record<string, { label: string; hint: string }>;
  results: Record<string, { title: string; text: string; topics: string[]; cta: string }>;
  note: string;
};

export function Finder({ locale, t, learnMore }: { locale: Locale; t: FinderT; learnMore: string }) {
  const [sel, setSel] = useState<(typeof OPTIONS)[number]["key"] | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.key === sel);
  const r = sel ? t.results[sel] : null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          const active = sel === o.key;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              aria-controls="finder-result"
              onClick={() => {
                setSel(o.key);
                if (window.matchMedia("(max-width: 1023px)").matches) {
                  setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                }
              }}
              data-track={`finder_${o.key}`}
              className={`group flex min-h-[5.5rem] items-center gap-4 rounded-[var(--radius-soft)] border p-5 text-start transition-all duration-300 ${
                active
                  ? "border-navy bg-navy text-white shadow-[0_12px_30px_-12px_rgba(16,42,67,.45)]"
                  : "border-line bg-paper text-navy hover:border-navy/50 hover:shadow-[0_10px_24px_-16px_rgba(16,42,67,.35)]"
              }`}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${active ? "bg-white/10 text-champagne-light" : "bg-sand text-brass"}`}>
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-[1.1rem] font-semibold leading-snug">{t.options[o.key].label}</span>
                <span className={`text-[0.9rem] ${active ? "text-mist" : "text-muted"}`}>{t.options[o.key].hint}</span>
              </span>
              {active && <Check size={22} className="ms-auto shrink-0 text-champagne-light" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <div id="finder-result" ref={resultRef} aria-live="polite" className="scroll-mt-28">
        {r && current && (
          <div key={sel} className="reveal mt-6 grid gap-8 rounded-[var(--radius-soft)] border border-line bg-paper p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="display text-[2rem] text-navy sm:text-[2.5rem]">{r.title}</h3>
              <p className="mt-4 text-muted">{r.text}</p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <ul className="space-y-3">
                {r.topics.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <Check size={20} className="mt-1 shrink-0 text-brass" aria-hidden="true" />
                    <span className="font-medium text-navy">{x}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href={href(locale, "contact", { topic: current.topic })} className="btn btn-primary" data-track={`cta_finder_${current.key}`}>
                  {r.cta} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link href={href(locale, current.route as RouteKey)} className="btn btn-ghost">{learnMore}</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="mt-5 text-[0.92rem] text-muted">{t.note}</p>
    </div>
  );
}
