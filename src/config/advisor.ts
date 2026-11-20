/**
 * ============================================================================
 *  ZENTRALE BERATER-KONFIGURATION
 * ============================================================================
 *  Alle personenbezogenen, rechtlichen und geschäftlichen Angaben der Website
 *  stammen ausschließlich aus dieser Datei. Name, Initialen, Logo, Telefon,
 *  Texte, SEO-Metadaten, strukturierte Daten, Formulare und Footer werden in
 *  allen drei Sprachen automatisch aus diesen Werten erzeugt.
 *
 *  KUNDENDATEN-WECHSEL (ca. 10 Minuten): siehe docs/KUNDENDATEN-WECHSEL.md
 *
 *  Regeln:
 *  - `null` bedeutet „noch nicht bestätigt“. In der Vorschau erscheint dann ein
 *    deutlich markierter Platzhalter, in der Produktion verhindert der
 *    Release-Check (scripts/release-check.mjs) den Build.
 *  - Nichts erfinden: keine Berufsjahre, Kundenzahlen, Bewertungen oder
 *    Qualifikationen eintragen, die nicht schriftlich belegt sind.
 *  - `previewIdentity: true` markiert vorläufige Präsentationsdaten. Solange
 *    dieser Wert true ist, kann die Website NICHT im Produktionsmodus gebaut
 *    werden.
 * ============================================================================
 */

export type Localized<T = string> = { de: T; en: T; ar: T };

export type Review = {
  author: string; // nur mit schriftlicher Freigabe, z. B. „Familie K., Düsseldorf“
  text: Localized;
  date: string; // ISO
  source: string; // z. B. „Google-Bewertung“
  consentDocumented: boolean; // muss true sein, sonst wird sie nie angezeigt
};

export const advisor = {
  /** Vorläufige Präsentationsdaten? Für die Kundenversion auf false setzen. */
  previewIdentity: true,

  // ---------------------------------------------------------------- Identität
  firstName: "Yaheia",
  lastName: "Kaswan",
  /** Arabische Schreibweise des vollständigen Namens */
  nameAr: "يحيى خصوان",
  /** Initialen für Monogramm und Favicon */
  initials: "YK",
  /** Wortmarke im Logo (Großbuchstaben empfohlen) */
  brandName: "YAHEIA KASWAN",
  brandTagline: {
    de: "Versicherung. Vorsorge. Zukunft.",
    en: "Insurance. Provision. Future.",
    ar: "تأمين · تخطيط · مستقبل",
  } satisfies Localized,

  /**
   * Berufsbezeichnung – erst eintragen, wenn Status und Erlaubnis belegt sind
   * (z. B. „Versicherungsvertreter mit Erlaubnis nach § 34d Abs. 1 GewO“
   * oder „gebundener Versicherungsvertreter nach § 34d Abs. 7 GewO“).
   * Bis dahin wird eine neutrale Formulierung verwendet.
   */
  jobTitle: null as Localized | null,
  neutralJobTitle: {
    de: "Ihr Ansprechpartner für Versicherung & Vorsorge",
    en: "Your contact for insurance & financial provision",
    ar: "مستشارك في التأمين والتخطيط للمستقبل",
  } satisfies Localized,

  /**
   * Kurze persönliche Vorstellung (1–3 Sätze). Nur belegbare Angaben!
   */
  bioShort: {
    de: "Ich komme aus dem Finanz- und Versicherungsvertrieb und habe dort vor allem eines gelernt: Gute Beratung beginnt mit Zuhören. Mir ist wichtig, dass Sie am Ende jede Entscheidung selbst verstehen – nicht nur unterschreiben.",
    en: "My background is in financial and insurance sales, and one lesson has stayed with me: good advice starts with listening. What matters to me is that you understand every decision yourself – not just sign it.",
    ar: "أعمل في مجال المبيعات المالية والتأمين، وتعلّمت من هذا العمل أن الاستشارة الجيدة تبدأ بالاستماع. ما يهمني هو أن تفهم كل قرار بنفسك، لا أن توقّع عليه فقط.",
  } satisfies Localized,
  /** Längere Vorstellung für „Über mich“ – Absätze. */
  bioLong: {
    de: [
      "Ich bin Unternehmer und komme aus dem Finanz- und Versicherungsvertrieb. In vielen Gesprächen habe ich erlebt, dass Menschen nicht an fehlendem Willen scheitern, sondern an Fachbegriffen, Kleingedrucktem und fehlender Zeit.",
      "Genau dort setze ich an: Ich erkläre Versicherungen und Vorsorge so, dass Sie die Zusammenhänge verstehen und in Ruhe selbst entscheiden können. Auf Deutsch, auf Arabisch oder auf Englisch – so, wie es Ihnen am leichtesten fällt.",
      "Mein Anspruch ist nicht ein schneller Abschluss, sondern eine Begleitung, auf die Sie sich auch in fünf oder zehn Jahren noch verlassen können.",
    ],
    en: [
      "I am an entrepreneur with a background in financial and insurance sales. In many conversations I have seen that people rarely struggle because they don't care – they struggle with jargon, small print and a lack of time.",
      "That is where I come in: I explain insurance and long-term provision so that you understand how things fit together and can make your own decision without pressure. In German, Arabic or English – whichever feels easiest for you.",
      "My goal is not a quick signature but a working relationship you can still rely on in five or ten years.",
    ],
    ar: [
      "أنا صاحب عمل خاص، وخبرتي في مجال المبيعات المالية والتأمين. ومن خلال لقاءات كثيرة لاحظت أن الناس لا يتأخرون في تأمين أنفسهم لأنهم لا يهتمون، بل لأن المصطلحات معقدة، والتفاصيل كثيرة، والوقت قليل.",
      "وهنا يأتي دوري: أشرح لك التأمين والتخطيط للمستقبل بكلام واضح، حتى تفهم الصورة كاملة وتتخذ قرارك بنفسك وبدون ضغط. بالعربية أو الألمانية أو الإنجليزية، باللغة التي تريحك.",
      "هدفي ليس توقيع عقد بسرعة، بل علاقة ثقة تستطيع أن تعتمد عليها بعد خمس أو عشر سنوات أيضاً.",
    ],
  } satisfies Localized<string[]>,
  /** Belegbarer beruflicher Hintergrund (wird auf „Über mich“ gelistet). */
  background: {
    de: ["Unternehmer", "Erfahrung im Finanz- und Versicherungsvertrieb"],
    en: ["Entrepreneur", "Experience in financial and insurance sales"],
    ar: ["صاحب عمل خاص", "خبرة في المبيعات المالية والتأمين"],
  } satisfies Localized<string[]>,

  // ------------------------------------------------------------------ Kontakt
  /** Internationales Format, ohne Leerzeichen – wird für tel:-Links genutzt */
  phone: "+491797216990" as string | null,
  /** Anzeigeformat */
  phoneDisplay: "+49 179 7216990" as string | null,
  /** WhatsApp nur nach Freigabe & Datenschutzprüfung eintragen */
  whatsapp: null as string | null,
  email: null as string | null,
  /** Externer Terminbuchungslink (nur nach Freigabe & DSGVO-Prüfung) */
  bookingUrl: null as string | null,
  /** Angebotene Beratungswege */
  consultationModes: {
    office: true,
    phone: true,
    video: false, // erst aktivieren, wenn tatsächlich angeboten
  },
  /** Nur auf true setzen, wenn das Erstgespräch nachweislich kostenfrei ist */
  freeInitialConsultation: null as boolean | null,
  /** Öffnungszeiten – erst nach Bestätigung, sonst „nach Vereinbarung“ */
  openingHours: null as Localized | null,

  office: {
    street: "Sybelstraße 21",
    postalCode: null as string | null, // NICHT raten – vom Auftraggeber bestätigen lassen
    city: "Düsseldorf",
    cityAr: "دوسلدورف",
    country: "DE",
    /** Datenschutzfreundlicher Kartenlink (wird erst beim Klick geöffnet) */
    mapsUrl: "https://www.openstreetmap.org/search?query=Sybelstra%C3%9Fe%2021%2C%20D%C3%BCsseldorf",
    /** Persönliche Beratung vor Ort bestätigt? */
    inPersonConfirmed: true,
  },

  languages: ["de", "ar", "en"] as const,

  // ------------------------------------------------------------------- Bilder
  images: {
    /** Hauptportrait (Hero). Hochformat oder quadratisch, min. 1000 px */
    portraitMain: "/images/advisor/portrait-main.webp" as string | null,
    /** Portrait im Büro (Über-mich) – null = eleganter Platzhalter */
    portraitOffice: null as string | null,
    /** Natürliches Beratungsgespräch – null = Platzhalter */
    consultation: null as string | null,
    /** Persönliche Vorstellung / zweites Portrait */
    portraitIntro: "/images/advisor/portrait-main.webp" as string | null,
    team: null as string | null,
    /** Bild für Social-Media-Vorschau (1200×630), optional */
    ogImage: null as string | null,
  },

  social: {
    linkedin: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
    xing: null as string | null,
  },

  // --------------------------------------------- Versicherer & Vermittlerstatus
  /**
   * Vermittlerstatus – NICHT raten. Mögliche Werte:
   *  "vertreter"            Versicherungsvertreter mit Erlaubnis (§ 34d Abs. 1 GewO)
   *  "gebundener_vertreter" Gebundener Versicherungsvertreter (§ 34d Abs. 7 GewO)
   *  "makler"               Versicherungsmakler (nur wenn tatsächlich zutreffend!)
   */
  intermediaryStatus: null as null | "vertreter" | "gebundener_vertreter" | "makler",
  /** Für Vertreter: für welche Unternehmen wird vermittelt? (exakte Firmennamen) */
  insurers: [
    // Beispiele – erst nach schriftlicher Bestätigung der Vertragsbeziehung aktivieren:
    // "ERGO Vorsorge Lebensversicherung AG",
    // "DKV Deutsche Krankenversicherung AG",
  ] as string[],
  /** Kurzbezeichnung des Partners für Fließtexte (z. B. „ERGO“) */
  partnerShortName: "ERGO",
  /** Darf der Partner auf der Website genannt werden? (schriftliche Freigabe) */
  partnerMentionApproved: false,
  /** Darf ein Partnerlogo gezeigt werden? (Marken-/Logo-Freigabe) */
  partnerLogoApproved: false,
  registerNumber: null as string | null, // z. B. "D-XXXX-XXXXX-XX"
  /** Erlaubnis-/Registrierungsbehörde (IHK) inkl. Anschrift */
  supervisoryAuthority: null as string | null,
  /** Direkte oder indirekte Beteiligungen ≥ 10 % (§ 15 VersVermV) */
  shareholdings: null as Localized | null,
  /** Art der Vergütung (z. B. Provision im Versicherungsbeitrag enthalten) */
  remuneration: null as Localized | null,
  /** Wird die Erstinformation beim ersten Kontakt in Textform übergeben? */
  firstInfoProcessConfirmed: false,

  // ------------------------------------------------------------ Rechtliches
  legal: {
    /** Vollständiger Name bzw. Firma wie im Gewerbe-/Handelsregister */
    legalName: null as string | null,
    legalForm: null as string | null, // z. B. "Einzelunternehmen"
    /** Ladungsfähige Anschrift (vollständig inkl. PLZ) */
    address: null as string | null,
    vatId: null as string | null, // USt-IdNr., falls vorhanden
    tradeRegister: null as string | null,
    /** Inhaltlich Verantwortlicher */
    responsiblePerson: null as string | null,
    /** Datenschutz: Verantwortlicher & Kontakt */
    privacyContact: null as string | null,
    /** Hosting-Anbieter für die Datenschutzerklärung */
    hostingProvider: null as string | null,
    /** Schriftliche Erlaubnis des Versicherers für den Internetauftritt geprüft? */
    insurerWebsitePermissionVerified: false,
  },

  // --------------------------------------------------------- Anfragen & Leads
  /**
   * Empfänger der Kundenanfragen. Hier nur die Adresse, die SMTP-Zugangsdaten
   * liegen ausschließlich in Umgebungsvariablen (.env, nie im Repository).
   */
  leadRecipientEmail: null as string | null,

  // ------------------------------------------------------------- Bewertungen
  /** Nur echte, schriftlich freigegebene Bewertungen. Leer = Bereich unsichtbar. */
  reviews: [] as Review[],

  // ------------------------------------------------------------ Website/SEO
  /** Öffentliche Domain der Kundenversion (ohne Slash am Ende) */
  siteUrl: "https://example.invalid" as string,

  // ------------------------------------------------------------- Testphase
  trial: {
    /** Startet erst nach vollständiger, freigegebener Veröffentlichung */
    startDate: null as string | null, // "2026-12-01"
    durationDays: 14,
    goalQualifiedLeads: 3,
    priceEur: 1490,
  },
};

export type Advisor = typeof advisor;

export const fullName = `${advisor.firstName} ${advisor.lastName}`;
