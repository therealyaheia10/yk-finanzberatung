export const locales = ["de", "ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

export const dir = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** Für Zahlen & Währungen – Arabisch mit westlichen Ziffern (in DE üblich) */
export const numberLocale: Record<Locale, string> = {
  de: "de-DE",
  en: "en-GB",
  ar: "ar-u-nu-latn",
};

export const languageNames: Record<Locale, { native: string; short: string }> = {
  de: { native: "Deutsch", short: "DE" },
  ar: { native: "العربية", short: "AR" },
  en: { native: "English", short: "EN" },
};

export const ogLocale: Record<Locale, string> = { de: "de_DE", en: "en_GB", ar: "ar_AR" };

/** Seiten-Schlüssel → lokalisierte URL-Segmente */
export const routes = {
  home: { de: "", en: "", ar: "" },
  private: { de: "privatkunden", en: "private-clients", ar: "private-clients" },
  business: { de: "unternehmen", en: "business", ar: "business" },
  about: { de: "ueber-mich", en: "about", ar: "about" },
  contact: { de: "kontakt", en: "contact", ar: "contact" },
  tools: { de: "vorsorge-rechner", en: "calculators", ar: "calculators" },
  kids: { de: "vorsorge-kinder-altersvorsorge", en: "children-and-retirement", ar: "children-and-retirement" },
  bu: { de: "berufsunfaehigkeitsversicherung", en: "income-protection", ar: "income-protection" },
  pkv: { de: "private-krankenversicherung", en: "private-health-insurance", ar: "private-health-insurance" },
  bav: { de: "betriebliche-altersversorgung", en: "company-pension", ar: "company-pension" },
  bkv: { de: "betriebliche-krankenversicherung", en: "employee-health-benefits", ar: "employee-health-benefits" },
  imprint: { de: "impressum", en: "legal-notice", ar: "legal-notice" },
  privacy: { de: "datenschutz", en: "privacy", ar: "privacy" },
  firstInfo: { de: "erstinformation", en: "initial-information", ar: "initial-information" },
} as const;

export type RouteKey = keyof typeof routes;
export const routeKeys = Object.keys(routes) as RouteKey[];

export function href(locale: Locale, key: RouteKey, query?: Record<string, string>) {
  const slug = routes[key][locale];
  const base = slug ? `/${locale}/${slug}` : `/${locale}`;
  if (!query) return base;
  return `${base}?${new URLSearchParams(query).toString()}`;
}

export function routeKeyFromSlug(locale: Locale, slug: string): RouteKey | null {
  for (const k of routeKeys) if (routes[k][locale] === slug) return k;
  return null;
}

export const serviceKeys = ["kids", "bu", "pkv", "bav", "bkv"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

/** Anliegen im Formular */
export const topicKeys = ["kids", "bu", "pkv", "retirement", "benefits", "general"] as const;
export type TopicKey = (typeof topicKeys)[number];
