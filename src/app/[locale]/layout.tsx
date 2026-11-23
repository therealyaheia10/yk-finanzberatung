import "../globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { dir, isLocale, locales } from "@/lib/i18n";
import { getDict } from "@/content";
import { retirementCheckTitle } from "@/components/calculators/retirementCheckText";
import { Header, type NavGroup } from "@/components/layout/Header";
import { extraKeys, href } from "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { Track } from "@/components/layout/Track";
import { RevealObserver } from "@/components/layout/Reveal";
import { analyticsEnabled } from "@/lib/site";

export const viewport: Viewport = { themeColor: "#102A43", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function navGroups(locale: Parameters<typeof href>[0], t: ReturnType<typeof getDict>): NavGroup[] {
  const tools: [string, string][] = [["renten-check", retirementCheckTitle(locale)], ["versicherungs-check", t.tools2.check.title], ["rentenluecke", t.calc.pension.title], ["kinder-sparziel", t.calc.kids.title], ["arbeitskraft", t.calc.income.title], ["inflation", t.tools2.inflation.title], ["ankommen", t.tools2.arrival.title]];
  return [
    { id: "invest", label: t.v3.navInvest, items: [
      { label: t.services.items.retirement.title, href: href(locale, "retirement") },
      { label: t.services.items.kids.title, href: href(locale, "kids") },
      { label: t.v3.wealth, href: href(locale, "retirement", undefined, "produkt") },
    ] },
    { id: "insure", label: t.v3.navInsure, items: [
      { label: t.services.items.bu.title, href: href(locale, "bu") },
      { label: t.services.items.pkv.title, href: href(locale, "pkv") },
      ...extraKeys.map((k) => ({ label: t.extras.items[k].title, href: href(locale, "extras", undefined, k) })),
    ], all: { label: t.v3.solutionsAll, href: href(locale, "solutions") } },
    { id: "business", label: t.v3.navBusiness, items: [
      { label: t.services.items.bav.title, href: href(locale, "bav") },
      { label: t.services.items.bkv.title, href: href(locale, "bkv") },
    ], all: { label: t.pages.business.topicsTitle, href: href(locale, "business") } },
    { id: "tools", label: t.v3.navTools, items: tools.map(([id, label]) => ({ label, href: href(locale, "tools", undefined, id) })) },
  ];
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">{t.nav.skip}</a>
        <Header
          locale={locale}
          nav={{ home: t.nav.home, cta: t.v3.freeShort, menu: t.nav.menu, close: t.nav.close, language: t.nav.language, mainNav: t.nav.mainNav, contact: t.nav.contact }}
          groups={navGroups(locale, t)}
          links={[{ label: t.nav.about, href: href(locale, "about") }]}
        />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer locale={locale} t={t} />
        <MobileContactBar locale={locale} callLabel={t.v3.whatsapp} bookLabel={t.v3.freeShort} waMessage={t.v3.waMessage} />
        <Track enabled={analyticsEnabled} />
        <RevealObserver />
      </body>
    </html>
  );
}
