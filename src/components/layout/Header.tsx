"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { href, languageNames, locales, routeKeyFromSlug, type Locale, type RouteKey } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";

type NavLabels = {
  private: string; business: string; tools: string; about: string; contact: string;
  cta: string; menu: string; close: string; language: string; mainNav: string; home: string;
};

export function useRouteKey(locale: Locale): RouteKey {
  const pathname = usePathname() || "/";
  const slug = pathname.split("/").filter(Boolean)[1] ?? "";
  return routeKeyFromSlug(locale, slug) ?? "home";
}

export function LanguageSwitcher({ locale, label, light = false }: { locale: Locale; label: string; light?: boolean }) {
  const key = useRouteKey(locale);
  return (
    <nav aria-label={label}>
      <ul className="flex items-center gap-1" dir="ltr">
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={href(l, key)}
                hrefLang={l}
                lang={l}
                aria-current={active ? "true" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-[0.95rem] font-semibold transition-colors ${
                  active
                    ? light ? "bg-white/15 text-white" : "bg-navy text-white"
                    : light ? "text-mist hover:text-white" : "text-muted hover:text-navy"
                }`}
                style={l === "ar" ? { fontFamily: "var(--font-arabic)" } : undefined}
                data-track={`lang_${l}`}
              >
                <span className="sr-only">{languageNames[l].native}</span>
                <span aria-hidden="true">{l === "ar" ? "عربي" : languageNames[l].short}</span>
              </Link>
            </li>
          );
        })}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [key, locale]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const items: { k: RouteKey; label: string }[] = [
    { k: "private", label: nav.private },
    { k: "business", label: nav.business },
    { k: "tools", label: nav.tools },
    { k: "about", label: nav.about },
    { k: "contact", label: nav.contact },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-ivory/95 transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
      <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-24 lg:px-12">
        <Link href={href(locale, "home")} className="shrink-0 rounded">
          <Logo locale={locale} />
        </Link>

        <nav aria-label={nav.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {items.filter((i) => i.k !== "tools").map((i) => (
              <li key={i.k}>
                <Link
                  href={href(locale, i.k)}
                  aria-current={key === i.k ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[1.0rem] font-medium transition-colors hover:text-navy ${
                    key === i.k ? "text-navy after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-px after:bg-champagne" : "text-muted"
                  }`}
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher locale={locale} label={nav.language} />
          <Link href={href(locale, "contact")} className="btn btn-primary !min-h-12 whitespace-nowrap !px-5 !text-base" data-track="cta_header">
            <CalendarCheck size={18} aria-hidden="true" />
            {nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          {phone && (
            <a href={`tel:${phone}`} className="hidden h-12 w-12 items-center justify-center rounded-full text-navy hover:bg-sand sm:inline-flex" aria-label={`${phoneDisplay}`} data-track="call_header">
              <Phone size={22} aria-hidden="true" />
            </a>
          )}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full px-3 font-semibold text-navy hover:bg-sand sm:px-4"
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            <span className="sr-only text-base sm:not-sr-only">{open ? nav.close : nav.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ivory xl:hidden"
        >
          <div className="mx-auto flex max-w-xl flex-col gap-8 px-6 pb-12 pt-6">
            <nav aria-label={nav.mainNav}>
              <ul className="divide-y divide-line border-y border-line">
                {[{ k: "home" as RouteKey, label: nav.home }, ...items].map((i) => (
                  <li key={i.k}>
                    <Link
                      href={href(locale, i.k)}
                      aria-current={key === i.k ? "page" : undefined}
                      className="display flex min-h-16 items-center justify-between py-3 text-[1.9rem] text-navy"
                    >
                      {i.label}
                      {key === i.k && <span className="h-2 w-2 rounded-full bg-champagne" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <LanguageSwitcher locale={locale} label={nav.language} />
            <div className="flex flex-col gap-3">
              <Link href={href(locale, "contact")} className="btn btn-primary w-full" data-track="cta_menu">
                <CalendarCheck size={20} aria-hidden="true" /> {nav.cta}
              </Link>
              {phone && (
                <a href={`tel:${phone}`} className="btn btn-ghost w-full" data-track="call_menu">
                  <Phone size={20} aria-hidden="true" /> <span className="ltr-nums">{phoneDisplay}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
