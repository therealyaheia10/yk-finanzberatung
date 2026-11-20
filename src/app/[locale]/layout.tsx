import "../globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { notFound } from "next/navigation";
import { advisor } from "@/config/advisor";
import { dir, isLocale, locales } from "@/lib/i18n";
import { getDict } from "@/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { Track } from "@/components/layout/Track";
import { analyticsEnabled } from "@/lib/site";

export const viewport: Viewport = { themeColor: "#102A43", width: "device-width", initialScale: 1 };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <a href="#main" className="skip-link">{t.nav.skip}</a>
        <PreviewBanner text={t.common.previewBanner} />
        <Header
          locale={locale}
          nav={{ ...t.nav }}
          phone={advisor.phone}
          phoneDisplay={advisor.phoneDisplay}
        />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer locale={locale} t={t} />
        <MobileContactBar locale={locale} callLabel={t.common.call} bookLabel={t.nav.cta} />
        <Track enabled={analyticsEnabled} />
      </body>
    </html>
  );
}
