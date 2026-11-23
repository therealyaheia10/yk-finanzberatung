/**
 * Startseite v4 – kurze, persönliche Texte aus Sicht der Berater.
 * Regeln: keine Versprechen, keine erfundenen Zahlen oder Bewertungen,
 * „Sie“-Ansprache (DE/FR), einfaches Hocharabisch (AR).
 */
import type { Locale, RouteKey } from "@/lib/i18n";

export type HelpItem = { img: string; title: string; q: string; route: RouteKey; hash?: string };
type Home4 = {
  hero: { eyebrow: string; title: string; titleAccent: string; lead: string; secondary: string; note: string; trust: string[]; langLabel: string; photoAlt: string; whatsapp: string };
  help: { eyebrow: string; title: string; lead: string; items: HelpItem[]; more: string };
  solutions: { eyebrow: string; title: string; lead: string; extrasLabel: string; extrasMore: string; all: string };
  why: { eyebrow: string; title: string; lead: string; points: [string, string][]; imgAlt: string };
  team: { eyebrow: string; title: string; lead: string; meet: string; speaks: string };
  tools: { eyebrow: string; title: string; lead: string; items: { id: string; title: string; text: string }[]; cta: string; time: string };
  closing: { title: string; lead: string; steps: [string, string][]; note: string; office: string; directions: string };
};

export const home4: Record<Locale, Home4> = {
  de: {
    hero: {
      eyebrow: "Persönliche Finanzberatung in Düsseldorf",
      title: "Finanzen verständlich erklärt –",
      titleAccent: "in Ihrer Sprache.",
      lead: "Wir sind Yaheia, Ali und Ismael. Wir begleiten Sie bei Vorsorge, Absicherung und Vermögensaufbau – ehrlich, in Ruhe und ohne Fachchinesisch.",
      secondary: "Wobei wir helfen",
      note: "Das Erstgespräch ist kostenlos und unverbindlich.",
      trust: ["Kostenloses Erstgespräch", "Im Büro, per Telefon oder Video", "Feste persönliche Ansprechpartner"],
      langLabel: "Wir beraten Sie auf",
      photoAlt: "Ismael Palanga, Yaheia Kaswan und Ali Ibrahim im Büro von International Finance Consulting",
      whatsapp: "Lieber schreiben? WhatsApp",
    },
    help: {
      eyebrow: "Wobei wir Ihnen helfen",
      title: "Welche Frage beschäftigt Sie gerade?",
      lead: "Wählen Sie Ihr Thema – wir erklären Ihnen kurz und verständlich, worauf es ankommt.",
      items: [
        { img: "family", title: "Familie & Kinder", q: "Wie sichere ich meine Familie ab – und spare für meine Kinder?", route: "kids" },
        { img: "income", title: "Einkommen absichern", q: "Was passiert mit meinem Einkommen, wenn ich nicht mehr arbeiten kann?", route: "bu" },
        { img: "health", title: "Gesundheit", q: "Gesetzlich oder privat – was passt zu meiner Lebenssituation?", route: "pkv" },
        { img: "retirement", title: "Altersvorsorge", q: "Wie möchte ich später leben – und reicht meine Rente dafür?", route: "retirement" },
        { img: "business", title: "Unternehmen & Mitarbeitende", q: "Wie kann ich mein Team gut absichern und halten?", route: "business" },
        { img: "advice", title: "Persönliche Beratung", q: "Sie wissen noch nicht genau, was Sie brauchen? Dann reden wir einfach.", route: "contact" },
      ],
      more: "Mehr erfahren",
    },
    solutions: {
      eyebrow: "Unsere Schwerpunkte",
      title: "Sechs Themen, bei denen wir Sie besonders gut begleiten.",
      lead: "Dazu kommen ergänzende Absicherungen – und auf Wunsch auch speziellere Versicherungen.",
      extrasLabel: "Außerdem für Sie da:",
      extrasMore: "weitere Versicherungen auf Anfrage",
      all: "Alle Lösungen ansehen",
    },
    why: {
      eyebrow: "Warum Kunden sich bei uns wohlfühlen",
      title: "Wir nehmen uns Zeit – und erklären, bevor wir empfehlen.",
      lead: "Versicherungen und Vorsorge in Deutschland können am Anfang verwirrend sein – besonders, wenn Deutsch nicht Ihre erste Sprache ist. Deshalb erklären wir alles so, wie wir es uns selbst wünschen würden.",
      points: [
        ["In Ihrer Sprache", "Wir beraten auf Deutsch, Arabisch, Englisch und Französisch – damit nichts missverstanden wird."],
        ["Verständlich statt kompliziert", "Wir erklären jeden Schritt in einfachen Worten. Sie entscheiden erst, wenn alles klar ist."],
        ["Kein Druck", "Ein Gespräch verpflichtet Sie zu nichts. Sie dürfen in Ruhe nachdenken und nachfragen."],
        ["Persönlich erreichbar", "Sie haben feste Ansprechpartner – auch nach dem Abschluss, wenn sich Ihr Leben verändert."],
      ],
      imgAlt: "Zwei Frauen sitzen an einem Tisch und sprechen in Ruhe über Unterlagen",
    },
    team: {
      eyebrow: "Ihre Ansprechpartner",
      title: "Mit diesen Menschen sprechen Sie.",
      lead: "Wir sind ein junges, internationales Team aus Düsseldorf. Uns ist wichtig, dass Sie verstehen, was Sie unterschreiben – und dass Sie wissen, wen Sie anrufen können.",
      meet: "Kennenlernen",
      speaks: "Spricht",
    },
    tools: {
      eyebrow: "Selbst ausprobieren",
      title: "Verschaffen Sie sich in zwei Minuten einen Überblick.",
      lead: "Ohne Anmeldung. Ihre Eingaben bleiben auf Ihrem Gerät.",
      items: [
        { id: "renten-check", title: "Renten-Check", text: "Wie viel Rente bleibt nach der Inflation wirklich?" },
        { id: "versicherungs-check", title: "Versicherungs-Checkliste", text: "Welche Absicherungen passen zu Ihrer Lebenssituation?" },
        { id: "vermoegensaufbau", title: "Vermögensrechner", text: "Was kann aus einer monatlichen Sparrate werden – für Sie oder Ihre Kinder?" },
      ],
      cta: "Jetzt ausprobieren",
      time: "ca. 2 Minuten",
    },
    closing: {
      title: "Lassen Sie uns über Ihre Situation sprechen.",
      lead: "Erzählen Sie uns kurz, worum es geht. Wir melden uns persönlich – meist innerhalb eines Werktags.",
      steps: [["Anfrage senden", "Dauert weniger als eine Minute."], ["Wir melden uns", "Per Telefon oder WhatsApp, wie Sie möchten."], ["Gespräch in Ruhe", "Im Büro, am Telefon oder per Video."]],
      note: "Kostenlos und unverbindlich – Sie entscheiden in Ruhe.",
      office: "Unser Büro",
      directions: "Route planen",
    },
  },

  en: {
    hero: {
      eyebrow: "Personal financial advice in Düsseldorf",
      title: "Money matters, clearly explained –",
      titleAccent: "in your language.",
      lead: "We're Yaheia, Ali and Ismael. We help you with retirement, protection and building wealth – honestly, calmly and without jargon.",
      secondary: "How we can help",
      note: "Your first consultation is free and without obligation.",
      trust: ["Free first consultation", "In our office, by phone or video", "Your own personal advisor"],
      langLabel: "We advise you in",
      photoAlt: "Ismael Palanga, Yaheia Kaswan and Ali Ibrahim in the International Finance Consulting office",
      whatsapp: "Prefer to text? WhatsApp",
    },
    help: {
      eyebrow: "How we can help",
      title: "What's on your mind right now?",
      lead: "Pick a topic – we'll explain briefly and clearly what really matters.",
      items: [
        { img: "family", title: "Family & children", q: "How do I protect my family and save for my children?", route: "kids" },
        { img: "income", title: "Protecting your income", q: "What happens to my income if I can no longer work?", route: "bu" },
        { img: "health", title: "Health", q: "Public or private health insurance – what fits my situation?", route: "pkv" },
        { img: "retirement", title: "Retirement", q: "How do I want to live later – and will my pension be enough?", route: "retirement" },
        { img: "business", title: "Businesses & employees", q: "How can I look after my team and keep good people?", route: "business" },
        { img: "advice", title: "Personal advice", q: "Not sure yet what you need? Then let's simply talk.", route: "contact" },
      ],
      more: "Learn more",
    },
    solutions: {
      eyebrow: "What we focus on",
      title: "Six areas where we can support you best.",
      lead: "Plus additional cover – and more specialised insurance on request.",
      extrasLabel: "We can also help with:",
      extrasMore: "other insurance on request",
      all: "See all solutions",
    },
    why: {
      eyebrow: "Why clients feel at home with us",
      title: "We take our time – and explain before we recommend.",
      lead: "Insurance and pensions in Germany can be confusing at first – especially if German isn't your first language. That's why we explain everything the way we'd want it explained to us.",
      points: [
        ["In your language", "We advise in German, Arabic, English and French – so nothing gets lost in translation."],
        ["Clear, not complicated", "We explain every step in plain words. You only decide once everything makes sense."],
        ["No pressure", "A conversation doesn't commit you to anything. Take your time and ask as much as you like."],
        ["Always reachable", "You have personal contacts – also after you sign, whenever your life changes."],
      ],
      imgAlt: "Two women sitting at a table, calmly talking through documents",
    },
    team: {
      eyebrow: "Your advisors",
      title: "These are the people you'll talk to.",
      lead: "We're a young, international team from Düsseldorf. We want you to understand what you sign – and to know exactly who to call.",
      meet: "Meet",
      speaks: "Speaks",
    },
    tools: {
      eyebrow: "Try it yourself",
      title: "Get a clear overview in two minutes.",
      lead: "No sign-up. Your answers stay on your device.",
      items: [
        { id: "renten-check", title: "Retirement check", text: "How much of your pension is left after inflation?" },
        { id: "versicherungs-check", title: "Insurance checklist", text: "Which cover fits your life right now?" },
        { id: "vermoegensaufbau", title: "Wealth builder", text: "What could a monthly savings plan grow into – for you or your children?" },
      ],
      cta: "Try it now",
      time: "approx. 2 minutes",
    },
    closing: {
      title: "Let's talk about your situation.",
      lead: "Tell us briefly what it's about. We'll get back to you personally – usually within one working day.",
      steps: [["Send a request", "Takes less than a minute."], ["We get in touch", "By phone or WhatsApp – whatever suits you."], ["A calm conversation", "In our office, by phone or by video."]],
      note: "Free and without obligation – you decide in your own time.",
      office: "Our office",
      directions: "Get directions",
    },
  },

  fr: {
    hero: {
      eyebrow: "Conseil financier personnalisé à Düsseldorf",
      title: "Vos finances expliquées simplement –",
      titleAccent: "dans votre langue.",
      lead: "Nous sommes Yaheia, Ali et Ismael. Nous vous accompagnons pour votre retraite, votre protection et votre épargne – avec honnêteté, calme et sans jargon.",
      secondary: "Nos domaines",
      note: "Le premier entretien est gratuit et sans engagement.",
      trust: ["Premier entretien gratuit", "Au bureau, par téléphone ou en visio", "Des interlocuteurs attitrés"],
      langLabel: "Nous vous conseillons en",
      photoAlt: "Ismael Palanga, Yaheia Kaswan et Ali Ibrahim dans les bureaux d’International Finance Consulting",
      whatsapp: "Vous préférez écrire ? WhatsApp",
    },
    help: {
      eyebrow: "Comment nous vous aidons",
      title: "Quelle question vous préoccupe en ce moment ?",
      lead: "Choisissez votre sujet – nous vous expliquons simplement ce qui compte vraiment.",
      items: [
        { img: "family", title: "Famille & enfants", q: "Comment protéger ma famille et épargner pour mes enfants ?", route: "kids" },
        { img: "income", title: "Protéger vos revenus", q: "Que deviennent mes revenus si je ne peux plus travailler ?", route: "bu" },
        { img: "health", title: "Santé", q: "Assurance publique ou privée – qu’est-ce qui correspond à ma situation ?", route: "pkv" },
        { img: "retirement", title: "Retraite", q: "Comment ai-je envie de vivre plus tard – et ma retraite suffira-t-elle ?", route: "retirement" },
        { img: "business", title: "Entreprises & salariés", q: "Comment bien protéger mon équipe et fidéliser mes salariés ?", route: "business" },
        { img: "advice", title: "Conseil personnalisé", q: "Vous ne savez pas encore ce qu’il vous faut ? Parlons-en simplement.", route: "contact" },
      ],
      more: "En savoir plus",
    },
    solutions: {
      eyebrow: "Nos priorités",
      title: "Six domaines où nous vous accompagnons particulièrement bien.",
      lead: "S’y ajoutent des protections complémentaires – et, sur demande, des assurances plus spécifiques.",
      extrasLabel: "Nous vous aidons aussi pour :",
      extrasMore: "d’autres assurances sur demande",
      all: "Voir toutes les solutions",
    },
    why: {
      eyebrow: "Pourquoi nos clients se sentent bien chez nous",
      title: "Nous prenons le temps – et nous expliquons avant de recommander.",
      lead: "Les assurances et la retraite en Allemagne peuvent sembler compliquées au début – surtout si l’allemand n’est pas votre langue maternelle. C’est pourquoi nous expliquons tout comme nous aimerions qu’on nous l’explique.",
      points: [
        ["Dans votre langue", "Nous conseillons en allemand, arabe, anglais et français – pour éviter tout malentendu."],
        ["Clair plutôt que compliqué", "Nous expliquons chaque étape avec des mots simples. Vous décidez seulement quand tout est clair."],
        ["Aucune pression", "Un entretien ne vous engage à rien. Prenez le temps de réfléchir et de poser vos questions."],
        ["Toujours joignables", "Vous avez des interlocuteurs attitrés – aussi après la signature, quand votre vie évolue."],
      ],
      imgAlt: "Deux femmes assises à une table discutent calmement de documents",
    },
    team: {
      eyebrow: "Vos interlocuteurs",
      title: "Voici les personnes avec qui vous parlerez.",
      lead: "Nous sommes une jeune équipe internationale basée à Düsseldorf. Pour nous, l’essentiel est que vous compreniez ce que vous signez – et que vous sachiez qui appeler.",
      meet: "Faire connaissance",
      speaks: "Parle",
    },
    tools: {
      eyebrow: "À essayer vous-même",
      title: "Faites le point en deux minutes.",
      lead: "Sans inscription. Vos réponses restent sur votre appareil.",
      items: [
        { id: "renten-check", title: "Bilan retraite", text: "Que vaut vraiment votre retraite après l’inflation ?" },
        { id: "versicherungs-check", title: "Checklist assurances", text: "Quelles protections correspondent à votre situation ?" },
        { id: "vermoegensaufbau", title: "Calculateur de patrimoine", text: "Que peut devenir une épargne mensuelle – pour vous ou vos enfants ?" },
      ],
      cta: "Essayer maintenant",
      time: "env. 2 minutes",
    },
    closing: {
      title: "Parlons de votre situation.",
      lead: "Dites-nous en quelques mots de quoi il s’agit. Nous vous recontactons personnellement – en général sous un jour ouvré.",
      steps: [["Envoyer une demande", "Moins d’une minute."], ["Nous vous recontactons", "Par téléphone ou WhatsApp, comme vous préférez."], ["Un échange en toute sérénité", "Au bureau, par téléphone ou en visio."]],
      note: "Gratuit et sans engagement – vous décidez à votre rythme.",
      office: "Notre bureau",
      directions: "Itinéraire",
    },
  },

  ar: {
    hero: {
      eyebrow: "استشارات مالية شخصية في دوسلدورف",
      title: "نشرح لك أمورك المالية بوضوح –",
      titleAccent: "وبلغتك.",
      lead: "نحن يحيى وعلي وإسماعيل. نرافقك في التخطيط للتقاعد والتأمين وبناء المدخرات – بصدق وهدوء ودون مصطلحات معقدة.",
      secondary: "كيف نساعدك",
      note: "الاستشارة الأولى مجانية ودون أي التزام.",
      trust: ["استشارة أولى مجانية", "في المكتب أو بالهاتف أو بالفيديو", "مستشار شخصي ثابت لك"],
      langLabel: "نقدّم الاستشارة باللغات",
      photoAlt: "إسماعيل بالانغا ويحيى كسوان وعلي إبراهيم في مكتب International Finance Consulting",
      whatsapp: "تفضّل الكتابة؟ واتساب",
    },
    help: {
      eyebrow: "كيف نساعدك",
      title: "ما السؤال الذي يشغلك الآن؟",
      lead: "اختر موضوعك، وسنشرح لك باختصار ووضوح ما هو المهم فعلاً.",
      items: [
        { img: "family", title: "العائلة والأطفال", q: "كيف أحمي عائلتي وأدّخر لمستقبل أطفالي؟", route: "kids" },
        { img: "income", title: "حماية دخلك", q: "ماذا يحدث لدخلي إذا لم أعد قادراً على العمل؟", route: "bu" },
        { img: "health", title: "الصحة", q: "تأمين صحي حكومي أم خاص – ما الأنسب لوضعي؟", route: "pkv" },
        { img: "retirement", title: "التقاعد", q: "كيف أريد أن أعيش لاحقاً – وهل سيكفيني معاشي؟", route: "retirement" },
        { img: "business", title: "الشركات والموظفون", q: "كيف أوفّر حماية جيدة لفريقي وأحافظ على موظفيّ؟", route: "business" },
        { img: "advice", title: "استشارة شخصية", q: "لست متأكداً بعد مما تحتاجه؟ لنتحدث ببساطة.", route: "contact" },
      ],
      more: "المزيد",
    },
    solutions: {
      eyebrow: "مجالات تركيزنا",
      title: "ستة مجالات نرافقك فيها بشكل خاص.",
      lead: "بالإضافة إلى تأمينات مكمّلة – وتأمينات متخصصة عند الطلب.",
      extrasLabel: "نساعدك أيضاً في:",
      extrasMore: "تأمينات أخرى عند الطلب",
      all: "جميع الحلول",
    },
    why: {
      eyebrow: "لماذا يرتاح عملاؤنا معنا",
      title: "نأخذ وقتنا – ونشرح قبل أن نوصي.",
      lead: "قد تبدو التأمينات والتقاعد في ألمانيا معقّدة في البداية – خاصة إذا لم تكن الألمانية لغتك الأم. لذلك نشرح كل شيء بالطريقة التي نتمنى أن يُشرح لنا بها.",
      points: [
        ["بلغتك", "نقدّم الاستشارة بالألمانية والعربية والإنجليزية والفرنسية – حتى لا يضيع أي تفصيل."],
        ["واضح لا معقّد", "نشرح كل خطوة بكلمات بسيطة، ولا تقرّر إلا عندما يصبح كل شيء واضحاً."],
        ["دون ضغط", "المحادثة لا تُلزمك بشيء. خذ وقتك في التفكير واسأل كما تشاء."],
        ["قريبون منك دائماً", "لديك أشخاص تتواصل معهم مباشرة – حتى بعد التوقيع، كلما تغيّرت ظروف حياتك."],
      ],
      imgAlt: "امرأتان تجلسان إلى طاولة وتتحدثان بهدوء حول بعض الأوراق",
    },
    team: {
      eyebrow: "فريقك الاستشاري",
      title: "هؤلاء هم الأشخاص الذين ستتحدث معهم.",
      lead: "نحن فريق شاب ودولي من دوسلدورف. يهمّنا أن تفهم ما توقّع عليه – وأن تعرف دائماً بمن تتصل.",
      meet: "تعرّف عليه",
      speaks: "يتحدث",
    },
    tools: {
      eyebrow: "جرّب بنفسك",
      title: "احصل على صورة واضحة خلال دقيقتين.",
      lead: "دون تسجيل، وتبقى بياناتك على جهازك.",
      items: [
        { id: "renten-check", title: "فحص التقاعد", text: "كم تبقى من قيمة معاشك فعلاً بعد التضخم؟" },
        { id: "versicherungs-check", title: "قائمة التأمينات", text: "ما التأمينات التي تناسب وضعك الحالي؟" },
        { id: "vermoegensaufbau", title: "حاسبة بناء الثروة", text: "إلى كم يمكن أن يصل ادخار شهري منتظم – لك أو لأطفالك؟" },
      ],
      cta: "جرّب الآن",
      time: "حوالي دقيقتين",
    },
    closing: {
      title: "لنتحدث عن وضعك.",
      lead: "أخبرنا باختصار عن موضوعك، وسنتواصل معك شخصياً – عادةً خلال يوم عمل واحد.",
      steps: [["أرسل طلبك", "يستغرق أقل من دقيقة."], ["نتواصل معك", "بالهاتف أو عبر واتساب، كما تفضّل."], ["محادثة بهدوء", "في المكتب أو بالهاتف أو بالفيديو."]],
      note: "مجاناً ودون التزام – والقرار لك في الوقت الذي يناسبك.",
      office: "مكتبنا",
      directions: "الاتجاهات",
    },
  },
};
