import { company } from "@/config/company";

/** Betriebsmodus: Standard ist "preview". Produktion nur mit SITE_MODE=production + bestandenem Release-Check. */
export type SiteMode = "preview" | "production";
export const siteMode: SiteMode = process.env.SITE_MODE === "production" ? "production" : "preview";
export const isPreview = siteMode === "preview";
export const siteUrl = (process.env.SITE_URL || company.siteUrl).replace(/\/$/, "");
export const analyticsEnabled = process.env.ANALYTICS === "first-party";
