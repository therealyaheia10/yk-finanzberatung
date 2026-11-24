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
  /** Optional: natürliches Porträt im Büro für die Profilseite (sonst wird `portrait` genutzt) */
  officePhoto?: string | null;
  /** Optional: eingescannte Unterschrift (Bild). Ohne Bild wird der Name in Schreibschrift gezeigt. */
  signature?: string | null;
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
      de: "Als Unternehmer weiß ich, wie wichtig finanzielle Sicherheit, Verantwortung und bewusste Entscheidungen sind. Mein Ziel ist es, komplexe Finanz- und Versicherungsthemen verständlich zu machen und Menschen langfristig als persönlicher Ansprechpartner zu begleiten. Für mich steht dabei immer der Mensch im Mittelpunkt – nicht das Produkt.",
      en: "As an entrepreneur, I know how important financial security, responsibility and well-informed decisions are. My goal is to make complex finance and insurance topics easy to understand and to support people as their personal contact in the long run. For me, it's always about the person – not the product.",
      fr: "En tant qu’entrepreneur, je sais à quel point la sécurité financière, la responsabilité et les décisions réfléchies sont importantes. Mon objectif est de rendre compréhensibles les sujets complexes de finance et d’assurance et d’accompagner les gens durablement en tant qu’interlocuteur personnel. Pour moi, c’est toujours la personne qui compte – pas le produit.",
      ar: "بصفتي صاحب عمل، أعرف مدى أهمية الأمان المالي والمسؤولية والقرارات الواعية. هدفي أن أجعل المواضيع المالية والتأمينية المعقّدة مفهومة، وأن أرافق الناس على المدى الطويل كشخص يتواصلون معه مباشرة. وبالنسبة لي، يبقى الإنسان دائماً في المركز – لا المنتج.",
    },
    bio: {
      de: [
        "Ich bin Yaheia Kaswan – und für mich beginnt eine gute Beratung nicht mit einem Produkt, sondern mit einem Menschen.",
        "Als Unternehmer weiß ich selbst, was es bedeutet, Verantwortung zu übernehmen, schwierige Entscheidungen zu treffen und sich Gedanken über die eigene Zukunft und die seiner Familie zu machen.",
        "Ich weiß auch, wie herausfordernd es sein kann, sich in Deutschland mit all den finanziellen Möglichkeiten, Versicherungen und komplizierten Fachbegriffen zurechtzufinden. Gerade wenn Deutsch nicht die eigene Muttersprache ist.",
        "Genau deshalb ist es mir wichtig, einen Unterschied zu machen. Ich möchte, dass Sie verstehen, welche Entscheidungen Sie treffen, warum Sie diese treffen und was sie langfristig für Ihr Leben bedeuten.",
        "Bei mir müssen Sie nicht mit Vorwissen ins Gespräch kommen. Sie können jede Frage stellen, Ihre Sorgen offen ansprechen und sich die Zeit nehmen, die Sie für eine Entscheidung benötigen.",
        "Ob Sie für Ihre Kinder vorsorgen, Ihre Familie absichern, Ihre finanzielle Zukunft gestalten oder als Unternehmer Verantwortung für Ihre Mitarbeiter übernehmen möchten – ich möchte zunächst Ihre Situation verstehen, bevor wir gemeinsam über mögliche Lösungen sprechen.",
        "Für mich endet eine gute Beratung nicht mit einer Unterschrift. Mein Anspruch ist es, auch danach ein persönlicher Ansprechpartner für Sie zu sein.",
        "Ich freue mich darauf, Sie persönlich kennenzulernen.",
      ],
      en: [
        "I'm Yaheia Kaswan – and for me, good advice doesn't start with a product. It starts with a person.",
        "As an entrepreneur, I know first-hand what it means to take on responsibility, make difficult decisions and think about your own future and that of your family.",
        "I also know how challenging it can be to find your way through all the financial options, insurance policies and complicated jargon in Germany – especially when German isn't your first language.",
        "That's exactly why I want to make a difference. I want you to understand which decisions you're making, why you're making them and what they mean for your life in the long run.",
        "You don't need any prior knowledge to talk to me. You can ask any question, share your concerns openly and take all the time you need to make a decision.",
        "Whether you want to provide for your children, protect your family, shape your financial future or, as a business owner, take responsibility for your employees – I first want to understand your situation before we talk about possible solutions together.",
        "For me, good advice doesn't end with a signature. I want to remain your personal point of contact long after that.",
        "I look forward to getting to know you personally.",
      ],
      fr: [
        "Je suis Yaheia Kaswan – et pour moi, un bon conseil ne commence pas par un produit, mais par une personne.",
        "En tant qu’entrepreneur, je sais moi-même ce que signifie prendre des responsabilités, faire des choix difficiles et se soucier de son avenir et de celui de sa famille.",
        "Je sais aussi à quel point il peut être difficile de s’y retrouver en Allemagne entre toutes les possibilités financières, les assurances et les termes techniques compliqués – surtout quand l’allemand n’est pas sa langue maternelle.",
        "C’est justement pour cela que je veux faire la différence. Je veux que vous compreniez quelles décisions vous prenez, pourquoi vous les prenez et ce qu’elles signifient pour votre vie sur le long terme.",
        "Avec moi, aucune connaissance préalable n’est nécessaire. Vous pouvez poser toutes vos questions, parler ouvertement de vos inquiétudes et prendre le temps dont vous avez besoin pour décider.",
        "Que vous souhaitiez préparer l’avenir de vos enfants, protéger votre famille, construire votre avenir financier ou, en tant qu’entrepreneur, assumer vos responsabilités envers vos salariés – je veux d’abord comprendre votre situation avant que nous parlions ensemble des solutions possibles.",
        "Pour moi, un bon conseil ne s’arrête pas à une signature. Mon ambition est de rester votre interlocuteur personnel par la suite.",
        "Je me réjouis de faire votre connaissance.",
      ],
      ar: [
        "أنا يحيى كسوان – وبالنسبة لي، لا تبدأ الاستشارة الجيدة بمنتج، بل بإنسان.",
        "بصفتي صاحب عمل، أعرف بنفسي معنى أن تتحمّل المسؤولية، وأن تتخذ قرارات صعبة، وأن تفكّر في مستقبلك ومستقبل عائلتك.",
        "وأعرف أيضاً كم قد يكون صعباً أن تجد طريقك في ألمانيا بين كل الخيارات المالية والتأمينات والمصطلحات المعقّدة – خاصة عندما لا تكون الألمانية لغتك الأم.",
        "ولهذا بالتحديد يهمّني أن أُحدث فرقاً. أريد أن تفهم ما هي القرارات التي تتخذها، ولماذا تتخذها، وماذا تعني لحياتك على المدى البعيد.",
        "معي لا تحتاج إلى أي معرفة مسبقة. يمكنك أن تسأل أي سؤال، وأن تتحدث بصراحة عن مخاوفك، وأن تأخذ الوقت الذي تحتاجه لاتخاذ قرارك.",
        "سواء أردت أن تؤمّن مستقبل أطفالك، أو تحمي عائلتك، أو تبني مستقبلك المالي، أو أن تتحمّل مسؤوليتك تجاه موظفيك كصاحب عمل – أريد أولاً أن أفهم وضعك، قبل أن نتحدث معاً عن الحلول الممكنة.",
        "بالنسبة لي، لا تنتهي الاستشارة الجيدة بالتوقيع. وهدفي أن أبقى الشخص الذي تتواصل معه مباشرة بعد ذلك أيضاً.",
        "يسعدني أن أتعرّف عليك شخصياً.",
      ],
    },
    /* Persönlicher Text von Yaheia (DE), übersetzt EN/FR/AR */
    quote: {
      de: "Ich möchte nicht, dass Menschen eine Entscheidung treffen, nur weil sie mir vertrauen. Ich möchte, dass sie mir vertrauen, weil sie ihre Entscheidung verstehen.",
      en: "I don't want people to make a decision just because they trust me. I want them to trust me because they understand their decision.",
      fr: "Je ne veux pas que les gens prennent une décision simplement parce qu’ils me font confiance. Je veux qu’ils me fassent confiance parce qu’ils comprennent leur décision.",
      ar: "لا أريد أن يتخذ الناس قراراً لمجرد أنهم يثقون بي. بل أريد أن يثقوا بي لأنهم يفهمون قرارهم.",
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
      ar: "بالنسبة له، الأهم ليس المنتج، بل الإنسان الذي يقف خلفه – بصدق ووضوح وعلى قدم المساواة.",
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
        "أهم ما يعنيني هو أن أقدّم للناس فائدة حقيقية. أريد أن أفهم ما يشغلهم، وما هي أهدافهم، وما الذي يتمنّونه لمستقبلهم.",
        "وعلى هذا الأساس أرافقهم بصدق وشفافية وعلى قدم المساواة، لنجد معاً الحلول المالية المناسبة لهم. فبالنسبة لي، الأهم ليس المنتج، بل دائماً الإنسان الذي يقف خلفه.",
        "في كل لقاء آخذ وقتي، أستمع أولاً، ثم أشرح كل شيء بطريقة واضحة – بالألمانية أو الإنجليزية أو الفرنسية.",
      ],
    },
    quote: {
      de: "Für mich steht nicht das Produkt im Vordergrund, sondern immer der Mensch dahinter.",
      en: "For me, it's never about the product – it's always about the person behind it.",
      fr: "Pour moi, ce n’est jamais le produit qui compte, mais toujours la personne derrière.",
      ar: "بالنسبة لي، الأهم ليس المنتج، بل دائماً الإنسان الذي يقف خلفه.",
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
