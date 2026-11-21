import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/config/company";
import { activeAdvisors, advisorBySlug, advisorName, teamLanguages, type Advisor } from "@/config/advisors";
import { href, isLocale, languageNames, locales, ogLocale, routeKeyFromSlug, routeKeys, routes, serviceKeys, TEAM_SEGMENT, teamHref, type Locale, type RouteKey, type ServiceKey } from "@/lib/i18n";
import { getDict } from "@/content";
import { fill } from "@/lib/format";
import { isPreview, siteUrl } from "@/lib/site";
import { HomePage } from "@/components/home/Home";
import { AboutPage, BusinessPage, ContactPage, ExtrasPage, PrivatePage, ServicePage, SolutionsPage, TeamMemberPage, ToolsPage } from "@/components/service/Pages";
import { FirstInfoPage, ImprintPage, PrivacyPage } from "@/components/service/Legal";

type Params = Promise<{ locale: string; slug?: string[] }>;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...routeKeys.map((k) => ({ locale, slug: routes[k][locale] ? [routes[k][locale]] : [] })),
    ...activeAdvisors().map((a) => ({ locale, slug: [TEAM_SEGMENT, a.slug] })),
  ]);
}

type Resolved = { l: Locale; key: RouteKey; advisor?: undefined } | { l: Locale; key: "team"; advisor: Advisor };
function resolve(locale: string, slug?: string[]): Resolved | null {
  if (!isLocale(locale)) return null;
  if (!slug || slug.length === 0) return { l: locale, key: "home" };
  if (slug.length === 2 && slug[0] === TEAM_SEGMENT) {
    const a = advisorBySlug(slug[1]);
    return a ? { l: locale, key: "team", advisor: a } : null;
  }
  if (slug.length > 1) return null;
  const key = routeKeyFromSlug(locale, slug[0]);
  return key ? { l: locale, key } : null;
}

const pathFor = (r: Resolved, l: Locale) => (r.key === "team" ? teamHref(l, r.advisor.slug) : href(l, r.key));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = resolve(locale, slug);
  if (!r) return {};
  const t = getDict(r.l);
  let m: { title: string; description: string };
  if (r.key === "team") {
    const vars = { name: advisorName(r.advisor, r.l), city: company.office.cityLocalized[r.l], languages: r.advisor.languages.map((x) => languageNames[x].native).join(", ") };
    m = { title: fill(t.meta.team.title, vars), description: fill(t.meta.team.description, vars) };
  } else if ((serviceKeys as readonly string[]).includes(r.key)) {
    const s = t.servicePages[r.key as ServiceKey];
    m = { title: s.metaTitle, description: s.metaDescription };
  } else {
    m = t.meta[r.key as Exclude<RouteKey, ServiceKey>];
  }
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${pathFor(r, l)}`]));
  const noindexPage = r.key === "imprint" || r.key === "privacy";
  const og = r.key === "team" && r.advisor.portrait ? r.advisor.portrait : undefined;
  return {
    metadataBase: new URL(siteUrl),
    title: m.title,
    description: m.description,
    alternates: { canonical: `${siteUrl}${pathFor(r, r.l)}`, languages: { ...languages, "x-default": `${siteUrl}${pathFor(r, "de")}` } },
    robots: isPreview ? { index: false, follow: false, nocache: true } : { index: !noindexPage, follow: true },
    openGraph: { type: "website", title: m.title, description: m.description, url: `${siteUrl}${pathFor(r, r.l)}`, siteName: t.meta.siteName, locale: ogLocale[r.l], images: og ? [{ url: og }] : undefined },
  };
}

/** Strukturierte Daten – ausschließlich bestätigte Angaben */
function JsonLd({ locale }: { locale: Locale }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: company.name,
    url: `${siteUrl}/${locale}`,
    areaServed: company.office.city,
    availableLanguage: teamLanguages().map((l) => ({ de: "German", en: "English", fr: "French", ar: "Arabic" })[l]),
    address: { "@type": "PostalAddress", streetAddress: company.office.street, postalCode: company.office.postalCode, addressLocality: company.office.city, addressCountry: company.office.country },
    employee: activeAdvisors().map((a) => ({ "@type": "Person", name: `${a.firstName} ${a.lastName}`, url: `${siteUrl}${teamHref(locale, a.slug)}`, knowsLanguage: a.languages })),
  };
  if (company.phone) data.telephone = company.phone;
  if (company.email) data.email = company.email;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const r = resolve(locale, slug);
  if (!r) notFound();
  const t = getDict(r.l);
  const l = r.l;
  if (r.key === "team") return <TeamMemberPage locale={l} t={t} a={r.advisor} />;

  let content: React.ReactNode;
  switch (r.key) {
    case "home": content = <><JsonLd locale={l} /><HomePage locale={l} t={t} /></>; break;
    case "about": content = <AboutPage locale={l} t={t} />; break;
    case "private": content = <PrivatePage locale={l} t={t} />; break;
    case "business": content = <BusinessPage locale={l} t={t} />; break;
    case "solutions": content = <SolutionsPage locale={l} t={t} />; break;
    case "extras": content = <ExtrasPage locale={l} t={t} />; break;
    case "contact": content = <ContactPage locale={l} t={t} />; break;
    case "tools": content = <ToolsPage locale={l} t={t} />; break;
    case "imprint": content = <ImprintPage locale={l} t={t} />; break;
    case "privacy": content = <PrivacyPage locale={l} t={t} />; break;
    case "firstInfo": content = <FirstInfoPage locale={l} t={t} />; break;
    default: content = <ServicePage locale={l} t={t} k={r.key as ServiceKey} />;
  }
  return content;
}
