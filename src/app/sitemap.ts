import type { MetadataRoute } from "next";
import { activeAdvisors } from "@/config/advisors";
import { href, locales, routeKeys, teamHref } from "@/lib/i18n";
import { isPreview, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  const pages = routeKeys.filter((k) => k !== "imprint" && k !== "privacy").map((k) => ({ path: (l: (typeof locales)[number]) => href(l, k), prio: k === "home" ? 1 : k === "contact" ? 0.9 : 0.7 }));
  const team = activeAdvisors().map((a) => ({ path: (l: (typeof locales)[number]) => teamHref(l, a.slug), prio: 0.8 }));
  return [...pages, ...team].flatMap((p) =>
    locales.map((l) => ({
      url: `${siteUrl}${p.path(l)}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: p.prio,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}${p.path(x)}`])) },
    })),
  );
}
