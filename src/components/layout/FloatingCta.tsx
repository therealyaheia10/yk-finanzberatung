"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";

/**
 * Schwebender Button „Kostenlose Beratung“ unten rechts (ab Tablet-Breite).
 * Erscheint nur, wenn gerade kein Beratungs-Button im Inhalt sichtbar ist,
 * damit der Kunde den Termin-Button immer im Blick hat, ohne doppelt.
 * Auf Smartphones übernimmt die feste Kontaktleiste unten diese Aufgabe.
 */
export function FloatingCta({ label, contactHref }: { label: string; contactHref: string }) {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const onContact = pathname === contactHref;

  useEffect(() => {
    if (onContact) { setShow(false); return; }
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const visible = [...document.querySelectorAll<HTMLElement>("main a.btn-cta, footer a.btn-cta")].some((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.bottom > 0 && r.top < vh;
        });
        setShow(!visible && window.scrollY > 200);
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const t = setInterval(check, 1500); // Inhalte, die sich ändern (z. B. Tools)
    return () => { cancelAnimationFrame(raf); clearInterval(t); window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, [pathname, onContact]);

  return (
    <div aria-hidden={!show} className={`no-print fixed bottom-6 end-6 z-40 hidden transition-all duration-300 md:block ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <Link href={contactHref} tabIndex={show ? 0 : -1} data-track="cta_floating"
        className="btn btn-cta !min-h-14 gap-2 !px-6 shadow-[0_18px_40px_-14px_rgba(17,21,25,.55)] ring-1 ring-black/5">
        <CalendarCheck size={20} aria-hidden="true" /> {label}
      </Link>
    </div>
  );
}
