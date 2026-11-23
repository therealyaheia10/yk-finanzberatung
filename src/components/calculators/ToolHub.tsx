"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PiggyBank, ShieldCheck, TrendingUp } from "lucide-react";

const icons = { "renten-check": PiggyBank, "versicherungs-check": ShieldCheck, vermoegensaufbau: TrendingUp } as const;
export type ToolId = keyof typeof icons;

/** Tool-Auswahl wie eine Liste – es wird immer nur ein Tool gezeigt (kurze Seite, klare Orientierung) */
export function ToolHub({ tools, chooseLabel, embedded = false, panelId = "tool-panel" }: { tools: { id: ToolId; title: string; desc: string; node: ReactNode }[]; chooseLabel: string; embedded?: boolean; panelId?: string }) {
  // Eingebettet (Startseite): ab Desktop ist der erste Rechner sofort da (schon im HTML → kein
  // Springen der Seite), auf dem Handy erscheint er erst nach dem Antippen (kürzere Seite).
  const [active, setActive] = useState<ToolId>(tools[0].id);
  const [chosen, setChosen] = useState(!embedded);
  useEffect(() => {
    if (embedded) return;
    const sync = () => {
      const h = window.location.hash.slice(1) as ToolId;
      if (tools.some((t) => t.id === h)) setActive(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tools, embedded]);
  const pick = (id: ToolId) => {
    setActive(id);
    setChosen(true);
    if (!embedded) history.replaceState(null, "", `#${id}`);
    if (window.matchMedia("(max-width: 1023px)").matches) requestAnimationFrame(() => document.getElementById(panelId)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const current = tools.find((t) => t.id === active) ?? tools[0];
  // Vor der ersten Auswahl: Hervorhebung und Rechner nur ab Desktop
  const pre = !chosen;
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <p className="mb-2 text-[0.88rem] font-semibold text-muted">{chooseLabel}</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" role="list">
          {tools.map((t) => {
            const Icon = icons[t.id];
            const on = t.id === active;
            const onCls = pre ? (on ? "border-line bg-paper text-navy lg:border-navy lg:bg-navy lg:text-white" : "border-line bg-paper text-navy hover:border-navy/40") : on ? "border-navy bg-navy text-white" : "border-line bg-paper text-navy hover:border-navy/40";
            return (
              <li key={t.id}>
                <button type="button" onClick={() => pick(t.id)} aria-pressed={on && chosen} aria-controls={panelId} data-track={`tool_${t.id}`}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-start transition-colors ${onCls}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${on && chosen ? "bg-white/10 text-champagne-light" : on && pre ? "bg-ivory text-brass lg:bg-white/10 lg:text-champagne-light" : "bg-ivory text-brass"}`}><Icon size={20} aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block font-semibold leading-tight">{t.title}</span>
                    <span className={`block text-[0.85rem] leading-snug ${on && chosen ? "text-mist" : on && pre ? "text-muted lg:text-mist" : "text-muted"}`}>{t.desc}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div id={panelId} className={`scroll-mt-20 ${pre ? "hidden lg:block" : ""}`} aria-live="polite">{current.node}</div>
    </div>
  );
}
