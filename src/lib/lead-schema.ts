import { z } from "zod";
import { locales, topicKeys } from "./i18n";

export const modeKeys = ["office", "phone", "video", "callback"] as const;
export const timeKeys = ["any", "morning", "afternoon", "evening"] as const;
const phoneRe = /^[+()0-9\s/-]{6,24}$/;

/** Bewusst minimal: keine Gesundheits-, Einkommens- oder Vertragsdaten. */
export const leadSchema = z
  .object({
    topic: z.enum(topicKeys),
    mode: z.enum(modeKeys),
    name: z.string().trim().min(2).max(80),
    phone: z.string().trim().max(24).optional().default(""),
    email: z.string().trim().max(120).optional().default(""),
    language: z.enum(locales),
    time: z.enum(timeKeys).optional().default("any"),
    message: z.string().trim().max(600).optional().default(""),
    pageLocale: z.enum(locales),
    source: z.string().max(160).optional().default(""),
    /** Weg B: gewünschter Berater (Slug) */
    advisor: z.string().max(80).nullable().optional().default(null),
    /** Kampagnenherkunft (utm_*, ref, referrer) */
    campaign: z.record(z.string().max(20), z.string().max(80)).optional().default({}),
    website: z.string().max(0).optional().default(""),
    elapsedMs: z.number().int().min(0),
  })
  .superRefine((v, ctx) => {
    if (!v.phone && !v.email) ctx.addIssue({ code: "custom", path: ["contact"], message: "contact" });
    if (v.phone && !phoneRe.test(v.phone)) ctx.addIssue({ code: "custom", path: ["phone"], message: "phone" });
    if (v.email && !z.email().safeParse(v.email).success) ctx.addIssue({ code: "custom", path: ["email"], message: "email" });
  });

export type LeadInput = z.infer<typeof leadSchema>;
