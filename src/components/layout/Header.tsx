"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, CalendarCheck, Globe, ChevronDown, Check, ArrowRight } from "lucide-react";
import { href, languageNames, locales, routeKeyFromSlug, TEAM_SEGMENT, teamHref, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";
import { LangFlag } from "@/components/ui/Icons";

export type NavGroup = { id: string; label: string; items: { label: string; href: string }[]; all?: { label: string; href: string } };
export type NavLabels = { home: string; cta: string; menu: string; close: string; language: string; mainNav: string; contact: string };

function useAltHref() {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const locale = (parts[0] ?? "de") as Locale;
  return (target: Locale) => {
    if (parts[1] === TEAM_SEGMENT && parts[2]) return teamHref(target, parts[2]);
    return href(target, routeKeyFromSlug(locale, parts[1] ?? "") ?? "home");
  };
}

/** Next.js meldet Anker-Wechsel auf derselben Seite nicht – Tool-Hub & Co. informieren */
const pingHash = () => setTimeout(() => window.dispatchEvent(new HashChangeEvent("hashchange")), 60);

function LangLabel({ l }: { l: Locale }) {
  return <span lang={l} className="inline-flex items-center gap-2" style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}><LangFlag l={l} />{languageNames[l].native}</span>;
}

function useOutside(open: boolean, close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent | KeyboardEvent) => { if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) close(); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", h);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", h); };
  }, [open, close, ref]);
}

function LanguageMenu({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const alt = useAltHref();
  useOutside(open, () => setOpen(false), ref);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="true" aria-label={`${languageNames[locale].short} – ${label}`}
        className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/20 px-2.5 text-[0.95rem] sm:gap-1.5 sm:px-3 font-semibold text-white hover:border-white/50">
        <LangFlag l={locale} size={17} /> {languageNames[locale].short} <ChevronDown size={15} aria-hidden="true" />
      </button>
      {open && (
        <ul className="dropdown-panel absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-line bg-paper py-1 text-ink shadow-[0_20px_40px_-20px_rgba(17,21,25,.45)]">
          {locales.map((l) => (
            <li key={l}>
              <Link href={alt(l)} hrefLang={l} aria-current={l === locale ? "true" : undefined} onClick={() => setOpen(false)} data-track={`lang_${l}`} className="flex min-h-11 items-center justify-between px-4 hover:bg-ivory">
                <LangLabel l={l} /> {l === locale && <Check size={16} className="text-brass" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Aufklappmenü: öffnet bei Hover (Desktop) und bei Klick/Tastatur */
function NavDropdown({ g }: { g: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useOutside(open, () => setOpen(false), ref);
  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 140); };
  return (
    <li ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" aria-expanded={open} aria-controls={`nav-${g.id}`} onClick={() => setOpen((o) => !o)}
        className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap px-2.5 text-[0.95rem] font-medium transition-colors hover:text-white ${open ? "text-white" : "text-mist"}`}>
        {g.label} <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div id={`nav-${g.id}`} className="dropdown-panel absolute start-0 top-full z-50 pt-2">
          <ul className="min-w-64 overflow-hidden rounded-xl border border-line bg-paper p-1.5 text-ink shadow-[0_24px_48px_-24px_rgba(17,21,25,.5)]">
            {g.items.map((i) => (
              <li key={i.href + i.label}>
                <Link href={i.href} onClick={() => { setOpen(false); pingHash(); }} className="flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] font-medium hover:bg-ivory">{i.label}</Link>
              </li>
            ))}
            {g.all && (
              <li className="mt-1 border-t border-line pt-1">
                <Link href={g.all.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-[0.9rem] font-semibold text-brass hover:bg-ivory">{g.all.label} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" /></Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </li>
  );
}

export function Header({ locale, nav, groups, links }: { locale: Locale; nav: NavLabels; groups: NavGroup[]; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setSection(null); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-navy-deep text-white transition-[box-shadow] duration-300 ${scrolled ? "shadow-[0_8px_24px_-16px_rgba(0,0,0,.6)]" : ""}`}>
      <div className={`mx-auto flex w-full max-w-[1240px] items-center justify-between gap-2 px-4 transition-[height] duration-300 sm:px-8 lg:px-10 ${scrolled ? "h-16" : "h-16 sm:h-20"}`}>
        <Link href={href(locale, "home")} className="shrink-0 rounded"><Logo light /><span className="sr-only">{nav.home}</span></Link>

        <nav aria-label={nav.mainNav} className="hidden xl:block">
          <ul className="flex items-center">
            {groups.map((g) => <NavDropdown key={g.id} g={g} />)}
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[0.95rem] font-medium text-mist hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageMenu locale={locale} label={nav.language} />
          <Link href={href(locale, "contact")} className="btn btn-gold !min-h-11 whitespace-nowrap !px-5 !text-[0.95rem]" data-track="cta_header">{nav.cta}</Link>
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
          <nav aria-label={nav.mainNav} className="mx-auto max-w-xl px-5 pb-12 pt-4">
            <ul className="divide-y divide-line border-b border-line">
              {groups.map((g) => (
                <li key={g.id}>
                  <button type="button" aria-expanded={section === g.id} onClick={() => setSection((s) => (s === g.id ? null : g.id))}
                    className="flex min-h-14 w-full items-center justify-between py-2 text-start text-[1.2rem] font-semibold text-navy">
                    {g.label} <ChevronDown size={20} className={`transition-transform ${section === g.id ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {section === g.id && (
                    <ul className="dropdown-panel pb-3">
                      {g.items.map((i) => <li key={i.href + i.label}><Link href={i.href} onClick={pingHash} className="flex min-h-11 items-center ps-3 text-[1.02rem] text-muted hover:text-navy">{i.label}</Link></li>)}
                      {g.all && <li><Link href={g.all.href} className="flex min-h-11 items-center gap-1.5 ps-3 font-semibold text-brass">{g.all.label} <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" /></Link></li>}
                    </ul>
                  )}
                </li>
              ))}
              {[...links, { label: nav.contact, href: href(locale, "contact") }].map((l) => (
                <li key={l.href}><Link href={l.href} className="flex min-h-14 items-center text-[1.2rem] font-semibold text-navy">{l.label}</Link></li>
              ))}
            </ul>
            <Link href={href(locale, "contact")} className="btn btn-gold mt-6 w-full" data-track="cta_menu"><CalendarCheck size={20} aria-hidden="true" /> {nav.cta}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
