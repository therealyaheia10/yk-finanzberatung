import type { MetadataRoute } from "next";
import { isPreview, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/intern"] }], sitemap: `${siteUrl}/sitemap.xml` };
}
