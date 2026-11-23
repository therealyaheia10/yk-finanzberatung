"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Sicherheitsnetz für Seitenwechsel: neue Seiten beginnen immer oben – sofort, ohne
 * Animation (wichtig für Safari/iOS, wo eine weiche Scroll-Animation beim Laden
 * unterbrochen werden kann). Ausnahmen: Anker-Links (#…) und die Zurück-/Vor-Taste,
 * bei der der Browser die vorherige Position wiederherstellt.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);
  useEffect(() => {
    const onPop = () => { popped.current = true; };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (popped.current) { popped.current = false; return; }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
