/**
 * ============================================================================
 *  BERATER-VERWALTUNG
 * ============================================================================
 *  Ein neuer Berater = ein neuer Eintrag in `advisors`. Daraus entstehen
 *  automatisch: Karte im Team-Bereich, eigene Seite /<sprache>/team/<slug>,
 *  Eintrag in der Erstinformation, Zuordnung von Anfragen (Sprache/Thema),
 *  Filter im Lead-Dashboard.
 *
 *  Regeln:
 *  - Nur echte, bestätigte Angaben. `null` = noch nicht bestätigt.
 *  - `active: false` blendet einen Berater überall aus.
 *  - Texte in allen vier Sprachen pflegen (de, en, fr, ar).
 *  Anleitung: docs/BERATER-HINZUFUEGEN.md
 * ============================================================================
 */
import type { Locale } from "@/lib/i18n";
import type { Localized } from "./company";

/** Fachgebiete – identisch mit den Anliegen im Anfrageformular */
export const topicKeys = ["retirement", "kids", "bu", "pkv", "bav", "bkv", "extras", "general"] as const;
export type TopicKey = (typeof topicKeys)[number];

export type Advisor = {
  id: string;
  slug: string;
  active: boolean;
  order: number;
  firstName: string;
  lastName: string;
  /** Schreibweise auf der arabischen Seite */
  nameAr: string;
  /** Portrait (Hochformat empfohlen). null = eleganter Platzhalter */
  portrait: string | null;
  /** Bestätigte Position / Berufsbezeichnung. null = neutrale Bezeichnung */
  position: Localized | null;
  /** Kurzvorstellung (1–2 Sätze) für die Teamkarte */
  short: Localized;
  /** Ausführliche Vorstellung (Absätze) für die Beraterseite */
  bio: Localized<string[]>;
  /** Persönlicher Leitsatz (optional) */
  quote: Localized | null;
  /** Belegbarer Werdegang / Hintergrund */
  background: Localized<string[]>;
  /** Tatsächlich gesprochene Beratungssprachen */
  languages: Locale[];
  /** Fachliche Schwerpunkte (steuert auch die automatische Zuordnung) */
  focus: TopicKey[];
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  /** Externer Terminbuchungslink (Calendly o. ä.) – nur nach Datenschutzprüfung */
  bookingUrl: string | null;
  location: string;
  social: { linkedin: string | null; instagram: string | null };
  // ---- Vermittlerrechtliche Angaben (§ 34d GewO, § 15 VersVermV)
  intermediaryStatus: null | "vertreter" | "gebundener_vertreter" | "makler";
  registerNumber: string | null;
  supervisoryAuthority: string | null;
  insurers: string[];
  shareholdings: Localized | null;
  remuneration: Localized | null;
};

export const advisors: Advisor[] = [
  {
    id: "yk",
    slug: "yaheia-kaswan",
    active: true,
    order: 1,
    firstName: "Yaheia",
    lastName: "Kaswan",
    nameAr: "يحيى كسوان",
    portrait: "/images/team/yaheia-kaswan.webp",
    position: null,
    short: {
      de: "Kommt aus dem Finanz- und Versicherungsvertrieb und erklärt Vorsorge so, dass man sie wirklich versteht.",
      en: "Comes from financial and insurance sales and explains long-term planning in a way that actually makes sense.",
      fr: "Issu de la vente de produits financiers et d’assurance, il explique la prévoyance de façon vraiment compréhensible.",
      ar: "يأتي من مجال المبيعات المالية والتأمين، ويشرح التخطيط للمستقبل بطريقة واضحة ومفهومة.",
    },
    bio: {
      de: [
        "Ich bin Unternehmer und komme aus dem Finanz- und Versicherungsvertrieb. In vielen Gesprächen habe ich erlebt, dass Menschen nicht am fehlenden Willen scheitern, sondern an Fachbegriffen, Kleingedrucktem und fehlender Zeit.",
        "Genau dort setze ich an: Ich erkläre Versicherungen und Vorsorge so, dass Sie die Zusammenhänge verstehen und in Ruhe selbst entscheiden können – auf Deutsch, Arabisch oder Englisch.",
        "Mein Anspruch ist kein schneller Abschluss, sondern eine Begleitung, auf die Sie sich auch in fünf oder zehn Jahren noch verlassen können.",
      ],
      en: [
        "I'm an entrepreneur with a background in financial and insurance sales. In many conversations I've seen that people rarely hold back because they don't care – it's the jargon, the small print and the lack of time.",
        "That's where I come in: I explain insurance and long-term planning so you understand how things fit together and can decide for yourself, without pressure – in German, Arabic or English.",
        "I'm not after a quick signature. I want to be someone you can still rely on in five or ten years.",
      ],
      fr: [
        "Je suis entrepreneur et je viens de la vente de produits financiers et d’assurance. Au fil de nombreux échanges, j’ai constaté que les gens ne manquent pas de volonté : ce qui les freine, ce sont le jargon, les petites lignes et le manque de temps.",
        "C’est là que j’interviens : je vous explique l’assurance et la prévoyance pour que vous compreniez l’ensemble et puissiez décider sereinement, en allemand, en arabe ou en anglais.",
        "Mon objectif n’est pas une signature rapide, mais un accompagnement sur lequel vous pourrez encore compter dans cinq ou dix ans.",
      ],
      ar: [
        "أنا صاحب عمل خاص، وخبرتي في مجال المبيعات المالية والتأمين. ومن خلال لقاءات كثيرة لاحظت أن الناس لا يتأخرون في تأمين أنفسهم لأنهم لا يهتمون، بل لأن المصطلحات معقدة، والتفاصيل كثيرة، والوقت قليل.",
        "وهنا يأتي دوري: أشرح لك التأمين والتخطيط للمستقبل بكلام واضح، حتى تفهم الصورة كاملة وتتخذ قرارك بنفسك وبدون ضغط، بالعربية أو الألمانية أو الإنجليزية.",
        "هدفي ليس توقيع عقد بسرعة، بل علاقة ثقة تستطيع أن تعتمد عليها بعد خمس أو عشر سنوات أيضاً.",
      ],
    },
    quote: {
      de: "Ich möchte, dass Sie jede Entscheidung verstehen – nicht nur unterschreiben.",
      en: "I want you to understand every decision – not just sign it.",
      fr: "Je veux que vous compreniez chaque décision, pas seulement que vous la signiez.",
      ar: "أريدك أن تفهم كل قرار، لا أن توقّع عليه فقط.",
    },
    background: {
      de: ["Unternehmer", "Finanz- und Versicherungsvertrieb im Umfeld von ERGO Pro / ONE Financial Services AG"],
      en: ["Entrepreneur", "Financial and insurance sales in the ERGO Pro / ONE Financial Services AG network"],
      fr: ["Entrepreneur", "Vente de produits financiers et d’assurance dans le réseau ERGO Pro / ONE Financial Services AG"],
      ar: ["صاحب عمل خاص", "المبيعات المالية والتأمين ضمن شبكة ERGO Pro / ONE Financial Services AG"],
    },
    languages: ["de", "ar", "en"],
    focus: ["retirement", "kids", "bu", "pkv", "bav", "bkv", "extras", "general"],
    phone: "+491797216990",
    phoneDisplay: "+49 179 7216990",
    email: null,
    bookingUrl: null,
    location: "Düsseldorf",
    social: { linkedin: null, instagram: null },
    intermediaryStatus: null,
    registerNumber: null,
    supervisoryAuthority: null,
    insurers: [],
    shareholdings: null,
    remuneration: null,
  },
  {
    id: "ai",
    slug: "ali-ibrahim",
    active: true,
    order: 2,
    firstName: "Ali",
    lastName: "Ibrahim",
    nameAr: "علي إبراهيم",
    portrait: "/images/team/ali-ibrahim.webp",
    position: null,
    short: {
      de: "Lebt seit über 13 Jahren in Deutschland, ist international aufgewachsen und hilft vor allem Familien mit internationalem Hintergrund.",
      en: "Has lived in Germany for over 13 years, grew up in an international environment and especially helps families with international backgrounds.",
      fr: "Vit en Allemagne depuis plus de 13 ans, a grandi dans un environnement international et accompagne surtout les familles d’origine internationale.",
      ar: "يعيش في ألمانيا منذ أكثر من 13 عاماً، نشأ في بيئة دولية، ويساعد بشكل خاص العائلات ذات الخلفية الدولية.",
    },
    bio: {
      de: [
        "Ich heiße Ali Ibrahim und lebe seit über 13 Jahren in Deutschland. Ich bin in einem internationalen Umfeld aufgewachsen und habe das Lycée Français International Simone Veil in Düsseldorf besucht – ich weiß also, wie es sich anfühlt, zwischen verschiedenen Kulturen zu leben.",
        "Ich spreche Deutsch, Englisch, Französisch und Arabisch. Dadurch finde ich schnell einen Draht zu Menschen ganz unterschiedlicher Herkunft.",
        "Mein Ziel: Menschen und Familien – besonders mit internationalem Hintergrund – helfen, ihre finanziellen Möglichkeiten in Deutschland besser zu verstehen. Ob Vorsorge, Zukunftsplanung oder die Absicherung der Familie: Jeder verdient klare, verständliche Beratung in einer Sprache, in der er sich wohlfühlt.",
      ],
      en: [
        "My name is Ali Ibrahim, and I've been living in Germany for over 13 years. I grew up in an international environment and attended the Lycée Français International Simone Veil in Düsseldorf, so I know what it's like to navigate life between different cultures.",
        "I speak English, French, German and Arabic, which lets me connect with people from a wide range of backgrounds.",
        "My goal is to help individuals and families – especially those with international backgrounds – better understand their financial opportunities in Germany. Whether it's planning for the future or securing your family's well-being, everyone deserves clear, accessible guidance in a language they feel comfortable speaking.",
      ],
      fr: [
        "Je m’appelle Ali Ibrahim et je vis en Allemagne depuis plus de 13 ans. J’ai grandi dans un environnement international et j’ai été scolarisé au Lycée Français International Simone Veil de Düsseldorf : je sais donc ce que signifie vivre entre plusieurs cultures.",
        "Je parle français, anglais, allemand et arabe, ce qui me permet de créer facilement le lien avec des personnes d’horizons très différents.",
        "Mon objectif : aider les particuliers et les familles, en particulier ceux qui ont un parcours international, à mieux comprendre leurs possibilités financières en Allemagne. Préparer l’avenir ou protéger sa famille : chacun mérite un conseil clair et accessible, dans une langue où il se sent à l’aise.",
      ],
      ar: [
        "اسمي علي إبراهيم، وأعيش في ألمانيا منذ أكثر من 13 عاماً. نشأت في بيئة دولية ودرست في الثانوية الفرنسية الدولية Simone Veil في دوسلدورف، لذلك أعرف جيداً معنى أن تعيش بين أكثر من ثقافة.",
        "أتحدث العربية والألمانية والإنجليزية والفرنسية، وهذا يساعدني على التواصل بسهولة مع أشخاص من خلفيات مختلفة.",
        "هدفي أن أساعد الأفراد والعائلات، وخاصة من لديهم خلفية دولية، على فهم إمكانياتهم المالية في ألمانيا بشكل أفضل. سواء كان الأمر تخطيطاً للمستقبل أو حماية للعائلة، فكل شخص يستحق استشارة واضحة وسهلة، باللغة التي يرتاح لها.",
      ],
    },
    quote: {
      de: "Jeder verdient klare Beratung in einer Sprache, in der er sich wohlfühlt.",
      en: "Everyone deserves clear guidance in a language they feel comfortable speaking.",
      fr: "Chacun mérite un conseil clair, dans une langue où il se sent à l’aise.",
      ar: "كل شخص يستحق استشارة واضحة باللغة التي يرتاح لها.",
    },
    background: {
      de: ["Seit über 13 Jahren in Deutschland", "Lycée Français International Simone Veil, Düsseldorf", "Aufgewachsen in einem internationalen Umfeld"],
      en: ["Living in Germany for over 13 years", "Lycée Français International Simone Veil, Düsseldorf", "Grew up in an international environment"],
      fr: ["En Allemagne depuis plus de 13 ans", "Lycée Français International Simone Veil, Düsseldorf", "A grandi dans un environnement international"],
      ar: ["يعيش في ألمانيا منذ أكثر من 13 عاماً", "الثانوية الفرنسية الدولية Simone Veil، دوسلدورف", "نشأ في بيئة دولية"],
    },
    languages: ["de", "en", "fr", "ar"],
    focus: ["retirement", "kids", "general"],
    phone: null,
    phoneDisplay: null,
    email: null,
    bookingUrl: null,
    location: "Düsseldorf",
    social: { linkedin: null, instagram: null },
    intermediaryStatus: null,
    registerNumber: null,
    supervisoryAuthority: null,
    insurers: [],
    shareholdings: null,
    remuneration: null,
  },
  {
    id: "ip",
    slug: "ismael-palanga",
    active: true,
    order: 3,
    firstName: "Ismael",
    lastName: "Palanga",
    nameAr: "إسماعيل بالانغا",
    portrait: "/images/team/ismael-palanga.webp",
    position: null,
    /* Text von Ismael (DE), leicht ergänzt und übersetzt – wird später noch verfeinert */
    short: {
      de: "Für ihn steht nicht das Produkt im Vordergrund, sondern der Mensch dahinter – ehrlich, transparent und auf Augenhöhe.",
      en: "For him, it's never about the product – it's about the person behind it. Honest, transparent and on equal footing.",
      fr: "Pour lui, ce n’est pas le produit qui compte, mais la personne derrière – avec honnêteté, transparence et d’égal à égal.",
      ar: "بالنسبة له، الأهم مش المنتج، بل الإنسان اللي وراه – بصدق ووضوح ومن ندّ لندّ.",
    },
    bio: {
      de: [
        "Mir ist es besonders wichtig, Menschen einen echten Mehrwert zu bieten. Ich möchte verstehen, was sie bewegt, welche Ziele sie haben und was sie sich für ihre Zukunft wünschen.",
        "Darauf aufbauend möchte ich sie ehrlich, transparent und auf Augenhöhe begleiten und gemeinsam passende finanzielle Lösungen finden. Denn für mich steht nicht das Produkt im Vordergrund, sondern immer der Mensch dahinter.",
        "Im Gespräch nehme ich mir Zeit, höre zuerst zu und erkläre alles so, dass Sie es wirklich verstehen – auf Deutsch, Englisch oder Französisch.",
      ],
      en: [
        "What matters most to me is offering people real value. I want to understand what moves them, what goals they have and what they wish for their future.",
        "Building on that, I want to support them honestly, transparently and on equal footing, and find the right financial solutions together. Because for me, it's never about the product – it's always about the person behind it.",
        "In our conversations I take my time, listen first and explain everything so that you truly understand it – in German, English or French.",
      ],
      fr: [
        "Ce qui compte le plus pour moi, c’est d’apporter une vraie valeur aux personnes que j’accompagne. Je veux comprendre ce qui les anime, quels sont leurs objectifs et ce qu’elles souhaitent pour leur avenir.",
        "Sur cette base, je veux les accompagner avec honnêteté, transparence et d’égal à égal, et trouver ensemble les solutions financières qui leur conviennent. Car pour moi, ce n’est jamais le produit qui compte, mais toujours la personne derrière.",
        "En rendez-vous, je prends le temps, j’écoute d’abord et j’explique tout pour que vous compreniez vraiment – en allemand, en anglais ou en français.",
      ],
      ar: [
        "أهم شي عندي إني أقدّم للناس فائدة حقيقية. بدي أفهم شو اللي بيشغل بالهم، شو أهدافهم، وشو بيتمنوا لمستقبلهم.",
        "وعلى هذا الأساس بدي أرافقهم بصدق ووضوح ومن ندّ لندّ، ونلاقي سوا الحلول المالية المناسبة إلهم. لأنه بالنسبة إلي، الأهم مش المنتج، بل دايماً الإنسان اللي وراه.",
        "بالجلسة باخد وقتي، بسمع أول شي، وبشرح كل شي بطريقة واضحة – بالألمانية أو الإنجليزية أو الفرنسية.",
      ],
    },
    quote: {
      de: "Für mich steht nicht das Produkt im Vordergrund, sondern immer der Mensch dahinter.",
      en: "For me, it's never about the product – it's always about the person behind it.",
      fr: "Pour moi, ce n’est jamais le produit qui compte, mais toujours la personne derrière.",
      ar: "بالنسبة إلي، الأهم مش المنتج، بل دايماً الإنسان اللي وراه.",
    },
    background: { de: ["Team International Finance Consulting, Düsseldorf"], en: ["International Finance Consulting team, Düsseldorf"], fr: ["Équipe International Finance Consulting, Düsseldorf"], ar: ["فريق International Finance Consulting، دوسلدورف"] },
    /* Sprachen bestätigt (DE, EN, FR); Schwerpunkte bitte noch bestätigen */
    languages: ["de", "en", "fr"],
    focus: ["general"],
    phone: null,
    phoneDisplay: null,
    email: null,
    bookingUrl: null,
    location: "Düsseldorf",
    social: { linkedin: null, instagram: null },
    intermediaryStatus: null,
    registerNumber: null,
    supervisoryAuthority: null,
    insurers: [],
    shareholdings: null,
    remuneration: null,
  },
];

export const activeAdvisors = () => advisors.filter((a) => a.active).sort((a, b) => a.order - b.order);
export const advisorBySlug = (slug: string) => activeAdvisors().find((a) => a.slug === slug) ?? null;
export const advisorName = (a: Advisor, locale: Locale) => (locale === "ar" ? a.nameAr : `${a.firstName} ${a.lastName}`);
/** Alle Sprachen, in denen das Team berät */
export const teamLanguages = (): Locale[] => {
  const s = new Set<Locale>();
  activeAdvisors().forEach((a) => a.languages.forEach((l) => s.add(l)));
  return (["de", "ar", "en", "fr"] as Locale[]).filter((l) => s.has(l));
};

/**
 * Automatische Zuordnung einer Anfrage (Weg A) oder direkter Berater (Weg B).
 * 1. Gewünschter Berater, falls aktiv
 * 2. Berater, der die Sprache spricht UND das Thema abdeckt
 * 3. Berater, der die Sprache spricht
 * 4. erster aktiver Berater
 * Bei mehreren Kandidaten wird abwechselnd verteilt (seed).
 */
export function assignAdvisor(opts: { advisor?: string | null; language: Locale; topic: TopicKey; seed?: number }) {
  const list = activeAdvisors();
  if (opts.advisor) {
    const a = list.find((x) => x.slug === opts.advisor);
    if (a) return { advisor: a, reason: "requested" as const };
  }
  const lang = list.filter((a) => a.languages.includes(opts.language));
  const both = lang.filter((a) => a.focus.includes(opts.topic));
  const pool = both.length ? both : lang.length ? lang : list;
  const pick = pool[(opts.seed ?? Date.now()) % pool.length];
  return { advisor: pick, reason: both.length ? ("language+topic" as const) : lang.length ? ("language" as const) : ("fallback" as const) };
}
