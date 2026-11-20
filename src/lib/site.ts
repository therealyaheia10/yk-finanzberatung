import { advisor } from "@/config/advisor";

/**
 * Betriebsmodus. Standard ist IMMER "preview" – Produktion muss bewusst
 * gesetzt werden (SITE_MODE=production) und besteht nur den Build, wenn
 * scripts/release-check.mjs keine offenen Punkte findet.
 */
export type SiteMode = "preview" | "production";

export const siteMode: SiteMode =
  process.env.SITE_MODE === "production" ? "production" : "preview";

export const isPreview = siteMode === "preview";

export const siteUrl = (process.env.SITE_URL || advisor.siteUrl).replace(/\/$/, "");

/** Analyse (eigene, cookielose Zählung) aktiv? */
export const analyticsEnabled = process.env.ANALYTICS === "first-party";
