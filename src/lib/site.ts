import { company } from "@/config/company";
import { LAUNCHED } from "@/config/launch";

/** Betriebsmodus: öffentlich, sobald freigegeben (src/config/launch.ts) oder SITE_MODE=production; SITE_MODE=preview schaltet die Vorschau wieder ein. */
export type SiteMode = "preview" | "production";
export const siteMode: SiteMode = process.env.SITE_MODE === "production" || (LAUNCHED && process.env.SITE_MODE !== "preview") ? "production" : "preview";
export const isPreview = siteMode === "preview";
export const siteUrl = (process.env.SITE_URL || company.siteUrl).replace(/\/$/, "");
export const analyticsEnabled = process.env.ANALYTICS === "first-party";
