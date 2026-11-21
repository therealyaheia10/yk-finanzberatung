export const locales = ["de", "ar", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** Zahlen & Währungen – Arabisch mit westlichen Ziffern (in DE üblich) */
export const numberLocale: Record<Locale, string> = { de: "de-DE", en: "en-GB", fr: "fr-FR", ar: "ar-u-nu-latn" };

export const languageNames: Record<Locale, { native: string; short: string }> = {
  de: { native: "Deutsch", short: "DE" },
  ar: { native: "العربية", short: "AR" },
  en: { native: "English", short: "EN" },
  fr: { native: "Français", short: "FR" },
};

export const ogLocale: Record<Locale, string> = { de: "de_DE", en: "en_GB", fr: "fr_FR", ar: "ar_AR" };

/** Seiten-Schlüssel → lokalisierte URL-Segmente */
export const routes = {
  home: { de: "", en: "", ar: "", fr: "" },
  about: { de: "ueber-uns", en: "about-us", ar: "about-us", fr: "a-propos" },
  private: { de: "privatkunden", en: "private-clients", ar: "private-clients", fr: "particuliers" },
  business: { de: "unternehmen", en: "business", ar: "business", fr: "entreprises" },
  solutions: { de: "loesungen", en: "solutions", ar: "solutions", fr: "solutions" },
  tools: { de: "orientierung", en: "tools", ar: "tools", fr: "outils" },
  contact: { de: "kontakt", en: "contact", ar: "contact", fr: "contact" },
  retirement: { de: "altersvorsorge", en: "retirement-planning", ar: "retirement-planning", fr: "retraite" },
  kids: { de: "kinder-vorsorge", en: "saving-for-children", ar: "saving-for-children", fr: "epargne-enfants" },
  bu: { de: "berufsunfaehigkeitsversicherung", en: "income-protection", ar: "income-protection", fr: "incapacite-de-travail" },
  pkv: { de: "private-krankenversicherung", en: "private-health-insurance", ar: "private-health-insurance", fr: "assurance-sante-privee" },
  bav: { de: "betriebliche-altersversorgung", en: "company-pension", ar: "company-pension", fr: "retraite-entreprise" },
  bkv: { de: "betriebliche-krankenversicherung", en: "employee-health-benefits", ar: "employee-health-benefits", fr: "sante-entreprise" },
  extras: { de: "weitere-absicherungen", en: "more-cover", ar: "more-cover", fr: "autres-protections" },
  imprint: { de: "impressum", en: "legal-notice", ar: "legal-notice", fr: "mentions-legales" },
  privacy: { de: "datenschutz", en: "privacy", ar: "privacy", fr: "confidentialite" },
  firstInfo: { de: "erstinformation", en: "initial-information", ar: "initial-information", fr: "information-prealable" },
} as const;

export type RouteKey = keyof typeof routes;
export const routeKeys = Object.keys(routes) as RouteKey[];

/** Beraterseiten: /<locale>/team/<slug> */
export const TEAM_SEGMENT = "team";

export function href(locale: Locale, key: RouteKey, query?: Record<string, string>, hash?: string) {
  const slug = routes[key][locale];
  let base = slug ? `/${locale}/${slug}` : `/${locale}`;
  if (query) base += `?${new URLSearchParams(query).toString()}`;
  if (hash) base += `#${hash}`;
  return base;
}
export const teamHref = (locale: Locale, slug: string) => `/${locale}/${TEAM_SEGMENT}/${slug}`;

export function routeKeyFromSlug(locale: Locale, slug: string): RouteKey | null {
  for (const k of routeKeys) if (routes[k][locale] === slug) return k;
  return null;
}

export const coreServiceKeys = ["retirement", "kids", "bu", "pkv", "bav", "bkv"] as const;
export type ServiceKey = (typeof coreServiceKeys)[number];
export const serviceKeys = coreServiceKeys;
export const privateServices: ServiceKey[] = ["retirement", "kids", "bu", "pkv"];
export const businessServices: ServiceKey[] = ["bav", "bkv"];
export const extraKeys = ["legal", "assistance", "care", "basic"] as const;
export type ExtraKey = (typeof extraKeys)[number];

export { topicKeys, type TopicKey } from "@/config/advisors";
