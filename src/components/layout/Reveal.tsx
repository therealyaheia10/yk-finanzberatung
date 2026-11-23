"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Blendet Elemente mit data-reveal sanft ein, sobald sie sichtbar werden.
 * Sicherheitsnetz: Alles, was schon im oder über dem sichtbaren Bereich liegt
 * (z. B. nach schnellem Scrollen oder Sprung über einen Anker), wird sofort gezeigt –
 * Inhalte dürfen nie unsichtbar bleiben.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const show = (e: Element) => e.classList.add("is-in");
    if (!("IntersectionObserver" in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting || en.boundingClientRect.top < 0) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px 25% 0px", threshold: 0 }); // startet kurz bevor der Inhalt ins Bild kommt → keine leeren Stellen
    const sweep = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((e) => { if (e.getBoundingClientRect().top < vh * 1.25) { show(e); io.unobserve(e); } });
    };
    els.forEach((e) => (e.getBoundingClientRect().top < window.innerHeight * 1.25 ? show(e) : io.observe(e)));
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("hashchange", sweep);
    return () => { io.disconnect(); window.removeEventListener("scroll", sweep); window.removeEventListener("hashchange", sweep); };
  }, [pathname]);
  return null;
}
