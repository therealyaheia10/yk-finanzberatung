import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { advisor } from "@/config/advisor";
import { href, isLocale, locales, ogLocale, routeKeyFromSlug, routeKeys, routes, serviceKeys, type Locale, type RouteKey, type ServiceKey } from "@/lib/i18n";
import { getDict, advisorName } from "@/content";
import { isPreview, siteUrl } from "@/lib/site";
import { HomePage } from "@/components/home/Home";
import { AboutPage, BusinessPage, ContactPage, PrivatePage, ServicePage, ToolsPage } from "@/components/service/Pages";
import { FirstInfoPage, ImprintPage, PrivacyPage } from "@/components/service/Legal";

type Params = Promise<{ locale: string; slug?: string[] }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    routeKeys.map((k) => ({ locale, slug: routes[k][locale] ? [routes[k][locale]] : [] })),
  );
}

function resolve(locale: string, slug?: string[]): { l: Locale; key: RouteKey } | null {
  if (!isLocale(locale)) return null;
  if (!slug || slug.length === 0) return { l: locale, key: "home" };
  if (slug.length > 1) return null;
  const key = routeKeyFromSlug(locale, slug[0]);
  return key ? { l: locale, key } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = resolve(locale, slug);
  if (!r) return {};
  const t = getDict(r.l);
  const isService = (serviceKeys as readonly string[]).includes(r.key);
  const m = isService
    ? { title: t.servicePages[r.key as ServiceKey].metaTitle, description: t.servicePages[r.key as ServiceKey].metaDescription }
    : t.meta[r.key as Exclude<RouteKey, ServiceKey>];
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${href(l, r.key)}`]));
  const noindexPage = r.key === "imprint" || r.key === "privacy";
  return {
    metadataBase: new URL(siteUrl),
    title: m.title,
    description: m.description,
    alternates: { canonical: `${siteUrl}${href(r.l, r.key)}`, languages: { ...languages, "x-default": `${siteUrl}${href("de", r.key)}` } },
    robots: isPreview ? { index: false, follow: false, nocache: true } : { index: !noindexPage, follow: true },
    openGraph: {
      type: "website",
      title: m.title,
      description: m.description,
      url: `${siteUrl}${href(r.l, r.key)}`,
      siteName: t.meta.siteName,
      locale: ogLocale[r.l],
      images: advisor.images.ogImage ? [{ url: advisor.images.ogImage, width: 1200, height: 630 }] : undefined,
    },
    other: { "format-detection": "telephone=yes" },
  };
}

/** Strukturierte Daten – ausschließlich bestätigte Angaben */
function JsonLd({ locale }: { locale: Locale }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: advisorName(locale),
    url: `${siteUrl}/${locale}`,
    areaServed: advisor.office.city,
    availableLanguage: ["German", "Arabic", "English"],
    address: {
      "@type": "PostalAddress",
      streetAddress: advisor.office.street,
      addressLocality: advisor.office.city,
      addressCountry: advisor.office.country,
      ...(advisor.office.postalCode ? { postalCode: advisor.office.postalCode } : {}),
    },
  };
  if (advisor.phone) data.telephone = advisor.phone;
  if (advisor.email) data.email = advisor.email;
  if (advisor.images.portraitMain) data.image = `${siteUrl}${advisor.images.portraitMain}`;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const r = resolve(locale, slug);
  if (!r) notFound();
  const t = getDict(r.l);
  const { l, key } = r;

  let content: React.ReactNode;
  switch (key) {
    case "home": content = <HomePage locale={l} t={t} />; break;
    case "private": content = <PrivatePage locale={l} t={t} />; break;
    case "business": content = <BusinessPage locale={l} t={t} />; break;
    case "about": content = <AboutPage locale={l} t={t} />; break;
    case "contact": content = <ContactPage locale={l} t={t} />; break;
    case "tools": content = <ToolsPage locale={l} t={t} />; break;
    case "imprint": content = <ImprintPage locale={l} t={t} />; break;
    case "privacy": content = <PrivacyPage locale={l} t={t} />; break;
    case "firstInfo": content = <FirstInfoPage locale={l} t={t} />; break;
    default: content = <ServicePage locale={l} t={t} k={key as ServiceKey} />;
  }
  return (
    <>
      {key === "home" && <JsonLd locale={l} />}
      {content}
    </>
  );
}
