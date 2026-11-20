import type { MetadataRoute } from "next";
import { href, locales, routeKeys } from "@/lib/i18n";
import { isPreview, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];
  const keys = routeKeys.filter((k) => k !== "imprint" && k !== "privacy");
  return keys.flatMap((k) =>
    locales.map((l) => ({
      url: `${siteUrl}${href(l, k)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: k === "home" ? 1 : k === "contact" ? 0.9 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}${href(x, k)}`])) },
    })),
  );
}
