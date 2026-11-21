"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cookielose, anonyme Zählung + Kampagnen-Zuordnung.
 * Kampagnenparameter (utm_*) der Einstiegsseite werden NUR im Arbeitsspeicher
 * gehalten (kein Cookie, kein localStorage) und beim Absenden einer Anfrage
 * mitgeschickt. Bei Next.js-Seitenwechseln bleibt der Speicher erhalten.
 */
let firstTouch: Record<string, string> | null = null;
export function getCampaign() {
  return firstTouch ?? {};
}
function captureCampaign() {
  if (firstTouch) return;
  const q = new URLSearchParams(window.location.search);
  const c: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) {
    const v = q.get(k);
    if (v) c[k] = v.slice(0, 80);
  }
  if (!c.utm_source && document.referrer && !document.referrer.startsWith(window.location.origin)) {
    try { c.referrer = new URL(document.referrer).hostname; } catch { /* ignore */ }
  }
  firstTouch = c;
}

export function Track({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  useEffect(() => { captureCampaign(); }, []);
  useEffect(() => { if (enabled) send({ type: "pageview", path: pathname }); }, [pathname, enabled]);
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (el) send({ type: "click", name: el.dataset.track, path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);
  return null;
}

export function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) navigator.sendBeacon("/api/event", new Blob([body], { type: "application/json" }));
    else fetch("/api/event", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
  } catch { /* Messung darf die Seite nie stören */ }
}
