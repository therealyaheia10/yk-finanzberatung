import { advisor, fullName } from "@/config/advisor";
import type { Locale } from "@/lib/i18n";
import de from "./de";
import en from "./en";
import ar from "./ar";
export type { Dict } from "./de";

export function advisorName(locale: Locale) {
  return locale === "ar" ? advisor.nameAr : fullName;
}

export function getDict(locale: Locale) {
  const p = {
    name: advisorName(locale),
    first: locale === "ar" ? advisor.nameAr.split(" ")[0] : advisor.firstName,
    city: locale === "ar" ? advisor.office.cityAr : advisor.office.city,
  };
  return { de, en, ar }[locale](p);
}
