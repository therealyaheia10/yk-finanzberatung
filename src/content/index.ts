import { company } from "@/config/company";
import type { Locale } from "@/lib/i18n";
import de from "./de";
import en from "./en";
import fr from "./fr";
import ar from "./ar";
export type { Dict } from "./de";

export function getDict(locale: Locale) {
  const p = { brand: company.name, city: company.office.cityLocalized[locale] };
  return { de, en, fr, ar }[locale](p);
}
