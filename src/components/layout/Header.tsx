"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, CalendarCheck, Globe, ChevronDown, Check } from "lucide-react";
import { href, languageNames, locales, routeKeyFromSlug, TEAM_SEGMENT, teamHref, type Locale, type RouteKey } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";

type NavLabels = {
  home: string; about: string; private: string; business: string; solutions: string; tools: string; contact: string;
  cta: string; menu: string; close: string; language: string; mainNav: string;
};

/** Aktuelle Seite → gleiche Seite in anderer Sprache */
function useAltHref() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const locale = (parts[0] ?? "de") as Locale;
  return (target: Locale) => {
    if (parts[1] === TEAM_SEGMENT && parts[2]) return teamHref(target, parts[2]);
    const key = routeKeyFromSlug(locale, parts[1] ?? "") ?? "home";
    return href(target, key);
  };
}

export function useRouteKey(locale: Locale): RouteKey | "team" {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  if (parts[1] === TEAM_SEGMENT) return "team";
  return routeKeyFromSlug(locale, parts[1] ?? "") ?? "home";
}

function LangLabel({ l }: { l: Locale }) {
  return <span lang={l} style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}>{languageNames[l].native}</span>;
}

/** Kompaktes Sprachmenü (Desktop) */
function LanguageMenu({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const alt = useAltHref();
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" aria-label={`${languageNames[locale].short} – ${label}`}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/20 px-3 text-[0.95rem] font-semibold text-white hover:border-white/50">
        <Globe size={17} aria-hidden="true" /> {languageNames[locale].short} <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <ul className="absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-[var(--radius-soft)] border border-line bg-paper py-1 shadow-[0_20px_40px_-20px_rgba(16,42,67,.4)]">
          {locales.map((l) => (
            <li key={l}>
              <Link href={alt(l)} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={() => setOpen(false)} data-track={`lang_${l}`}
                className="flex min-h-11 items-center justify-between px-4 text-navy hover:bg-sand">
                <LangLabel l={l} /> {l === locale && <Check size={16} className="text-brass" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Sprachleiste (Mobilmenü) */
export function LanguageList({ locale, label }: { locale: Locale; label: string }) {
  const alt = useAltHref();
  return (
    <nav aria-label={label}>
      <ul className="grid grid-cols-2 gap-2">
        {locales.map((l) => (
          <li key={l}>
            <Link href={alt(l)} hrefLang={l} aria-current={l === locale ? "true" : undefined} data-track={`lang_${l}`}
              className={`flex min-h-12 items-center justify-center rounded-full border font-semibold ${l === locale ? "border-navy bg-navy text-white" : "border-line text-navy"}`}>
              <LangLabel l={l} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header({ locale, nav, phone, phoneDisplay }: { locale: Locale; nav: NavLabels; phone: string | null; phoneDisplay: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const key = useRouteKey(locale);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const items: { k: RouteKey; label: string }[] = [
    { k: "private", label: nav.private },
    { k: "business", label: nav.business },
    { k: "solutions", label: nav.solutions },
    { k: "tools", label: nav.tools },
    { k: "about", label: nav.about },
    { k: "contact", label: nav.contact },
  ];
  const isActive = (k: RouteKey) => key === k || (k === "about" && key === "team");

  return (
    <header className={`sticky top-0 z-50 bg-navy-deep text-white transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_var(--color-line-dark)]" : ""}`}>
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:px-10">
        <Link href={href(locale, "home")} className="shrink-0 rounded"><Logo light /><span className="sr-only">{nav.home}</span></Link>

        <nav aria-label={nav.mainNav} className="hidden xl:block">
          <ul className="flex items-center">
            {items.map((i) => (
              <li key={i.k}>
                <Link href={href(locale, i.k)} aria-current={isActive(i.k) ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.95rem] font-medium transition-colors hover:text-white ${
                    isActive(i.k) ? "text-white after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-0.5 after:rounded after:bg-champagne-light" : "text-mist"}`}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageMenu locale={locale} label={nav.language} />
          <Link href={href(locale, "contact")} className="btn btn-gold !min-h-11 whitespace-nowrap !px-5 !text-[0.95rem]" data-track="cta_header">
            {nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 xl:hidden">
          <LanguageMenu locale={locale} label={nav.language} />
          <button ref={toggleRef} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu"
            className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2.5 font-semibold text-white hover:bg-white/10 sm:px-3">
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            <span className="sr-only text-base sm:not-sr-only">{open ? nav.close : nav.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" ref={panelRef} className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ivory text-ink sm:top-20 xl:hidden">
          <div className="mx-auto flex max-w-xl flex-col gap-8 px-6 pb-12 pt-6">
            <nav aria-label={nav.mainNav}>
              <ul className="divide-y divide-line border-y border-line">
                {[{ k: "home" as RouteKey, label: nav.home }, ...items].map((i) => (
                  <li key={i.k}>
                    <Link href={href(locale, i.k)} aria-current={isActive(i.k) ? "page" : undefined} className="display flex min-h-14 items-center justify-between py-2 text-[1.35rem] text-navy">
                      {i.label}
                      {isActive(i.k) && <span className="h-2 w-2 rounded-full bg-champagne" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3">
              <Link href={href(locale, "contact")} className="btn btn-primary w-full" data-track="cta_menu"><CalendarCheck size={20} aria-hidden="true" /> {nav.cta}</Link>
              {phone && <a href={`tel:${phone}`} className="btn btn-ghost w-full" data-track="call_menu"><Phone size={20} aria-hidden="true" /> <span className="ltr-nums">{phoneDisplay}</span></a>}
              <LanguageList locale={locale} label={nav.language} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
