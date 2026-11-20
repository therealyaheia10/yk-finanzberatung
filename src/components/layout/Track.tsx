"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Cookielose, anonyme Zählung (keine IDs, keine Speicherung im Browser).
 * Zählt Seitenaufrufe und Klicks auf Elemente mit data-track="...".
 */
export function Track({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  useEffect(() => {
    if (!enabled) return;
    send({ type: "pageview", path: pathname });
  }, [pathname, enabled]);

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
  } catch {
    /* Messung darf die Seite nie stören */
  }
}
