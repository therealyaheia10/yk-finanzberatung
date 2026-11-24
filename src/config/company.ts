/**
 * ============================================================================
 *  UNTERNEHMENS-KONFIGURATION – International Finance Consulting
 * ============================================================================
 *  Marke, Standort, zentrale Kontaktwege und rechtliche Angaben des
 *  Unternehmens. Berater werden in src/config/advisors.ts gepflegt.
 *
 *  `null` = noch nicht bestätigt → in der Vorschau sichtbar markiert, im
 *  Produktionsbuild durch scripts/release-check.mjs blockiert.
 * ============================================================================
 */
import type { Locale } from "@/lib/i18n";

export type Localized<T = string> = Record<Locale, T>;

/** Nur echte Bewertungen mit dokumentierter Einwilligung (z. B. aus dem Google-Profil). */
export type Review = { author: string; text: Localized; source: string; date: string; consentDocumented: boolean };

export const company = {
  name: "International Finance Consulting",
  /** Zweizeilige Wortmarke im Logo */
  wordmarkTop: "INTERNATIONAL",
  wordmarkBottom: "Finance Consulting",
  shortName: "IFC",
  tagline: {
    de: "Persönliche Beratung. In Ihrer Sprache.",
    en: "Personal advice. In your language.",
    fr: "Un conseil personnel. Dans votre langue.",
    ar: "استشارة شخصية بلغتك",
  } satisfies Localized,

  // --------------------------------------------------------------- Kontakt
  /** Zentrale Rufnummer (aktuell die Nummer von Yaheia Kaswan) */
  phone: "+491797216990" as string | null,
  phoneDisplay: "+49 179 7216990" as string | null,
  /** WhatsApp-Nummer (international, nur Ziffern) – öffnet wa.me-Chat */
  whatsapp: "491797216990" as string | null,
  /** Teamfoto für den Hero (Querformat) */
  teamPhoto: "/images/team/team.webp" as string | null,
  /** Optionale Fotos für „Fragen, die Sie sich stellen“ (Querformat). null = gestaltete Grafik */
  issueImages: { private: null as string | null, business: null as string | null },
  /** Reihenfolge der Personen auf dem Teamfoto (für Bildbeschreibung), von links */
  teamPhotoOrder: ["yaheia-kaswan", "ali-ibrahim", "ismael-palanga"],
  /** Bild im Abschnitt „Was uns verbindet“ – eigenes Foto hier eintragen (public/images/…) */
  whyImage: "/images/topics/advice.webp",
  email: null as string | null,
  /** Zentraler Terminbuchungslink (z. B. Kalender-Tool) – optional */
  bookingUrl: null as string | null,
  /** Nur true, wenn das Erstgespräch nachweislich kostenfrei ist */
  freeInitialConsultation: true as boolean | null,
  openingHours: null as Localized | null,

  office: {
    street: "Sybelstraße 21",
    postalCode: "40239",
    city: "Düsseldorf",
    cityLocalized: { de: "Düsseldorf", en: "Düsseldorf", fr: "Düsseldorf", ar: "دوسلدورف" } satisfies Localized,
    country: "DE",
    mapsUrl: "https://www.openstreetmap.org/search?query=Sybelstra%C3%9Fe%2021%2C%2040239%20D%C3%BCsseldorf",
  },

  /** In welchen Sprachen das Team berät (Summe der Beratersprachen) */
  consultationModes: { office: true, phone: true, video: false },

  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
  },

  // ------------------------------------------------- Versicherer & Freigaben
  partnerShortName: "ERGO",
  /** Schriftliche Freigabe für die Nennung des Partners auf der Website */
  partnerMentionApproved: false,
  partnerLogoApproved: false,
  insurerWebsitePermissionVerified: false,

  // ---------------------------------------------------------- Rechtliches
  legal: {
    /** Rechtsträger (z. B. GbR, UG, Einzelunternehmen) */
    legalName: null as string | null,
    legalForm: null as string | null,
    representedBy: "Yaheia Kaswan, Ali Ibrahim" as string | null,
    address: "Sybelstraße 21, 40239 Düsseldorf" as string | null,
    vatId: null as string | null,
    tradeRegister: null as string | null,
    responsiblePerson: null as string | null,
    privacyContact: null as string | null,
    hostingProvider: null as string | null,
  },

  /** Kundenstimmen fürs Laufband. Leer = Bereich öffentlich unsichtbar (Vorschau zeigt Platzhalter). */
  reviews: [] as Review[],

  /** Zentrale Empfängeradresse, falls kein Berater zugeordnet werden kann */
  leadRecipientEmail: null as string | null,
  siteUrl: "https://example.invalid" as string,

  trial: {
    startDate: null as string | null,
    durationDays: 14,
    goalQualifiedLeads: 3,
  },
};

export type Company = typeof company;
