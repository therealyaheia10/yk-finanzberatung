import "../globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { dir, isLocale, locales } from "@/lib/i18n";
import { getDict } from "@/content";
import { retirementCheckTitle } from "@/components/calculators/retirementCheckText";
import { insuranceChecklistTitle } from "@/components/calculators/insuranceChecklistText";
import { wealthBuilderTitle } from "@/components/calculators/wealthBuilderText";
import { Header, type NavGroup } from "@/components/layout/Header";
import { extraKeys, href, teamHref } from "@/lib/i18n";
import { activeAdvisors, advisorName } from "@/config/advisors";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Track } from "@/components/layout/Track";
import { RevealObserver } from "@/components/layout/Reveal";
import { ScrollReset } from "@/components/layout/ScrollReset";
import { analyticsEnabled } from "@/lib/site";

export const viewport: Viewport = { themeColor: "#111519", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function navGroups(locale: Parameters<typeof href>[0], t: ReturnType<typeof getDict>): NavGroup[] {
  const tools: [string, string][] = [["renten-check", retirementCheckTitle(locale)], ["versicherungs-check", insuranceChecklistTitle(locale)], ["vermoegensaufbau", wealthBuilderTitle(locale)]];
  return [
    { id: "invest", label: t.v3.navInvest, items: [
      { label: t.services.items.retirement.title, href: href(locale, "retirement") },
      { label: t.services.items.kids.title, href: href(locale, "kids") },
      { label: t.v3.wealth, href: href(locale, "tools", undefined, "vermoegensaufbau") },
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
    // Team: wächst automatisch mit jedem aktiven Berater aus src/config/advisors.ts
    { id: "team", label: t.nav.about, items: activeAdvisors().map((a) => ({ label: advisorName(a, locale), href: teamHref(locale, a.slug) })), all: { label: t.nav.about, href: href(locale, "about") } },
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
          links={[]}
        />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer locale={locale} t={t} />
        <FloatingCta label={t.v3.freeBook} contactHref={href(locale, "contact")} />
        <MobileContactBar locale={locale} callLabel={t.v3.whatsapp} bookLabel={t.v3.freeBook} waMessage={t.v3.waMessage} />
        <Track enabled={analyticsEnabled} />
        <RevealObserver />
        <ScrollReset />
      </body>
    </html>
  );
}
