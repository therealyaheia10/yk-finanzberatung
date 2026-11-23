/** Texte zum „Wealth Builder“ (vom Kunden geliefert, IFC_wealth_builder_calculator.html). Logik: WealthBuilder.tsx */
import type { Locale } from "@/lib/i18n";

type Txt = {
  eyebrow: string; title: string; intro: string; tablist: string; tabSelf: string; tabChild: string;
  tagSelf: string; tagChild: string; titleSelf: string; titleChild: string; introSelf: string; introChild: string;
  goal: string; ageSelf: string; ageChild: string; targetAge: string; childGoalAge: string; yearsToInvest: string;
  monthly: string; helpTitle: string; helpText: string; helpLink: string;
  rateNote: [string, string, string]; errChild: string; errSelf: string;
  projection: string; resultSelf: string; resultChild: string; resultPlain: string; projNote: [string, string, string];
  scenario: string; target: string; projected: string; needed: string; perMonth: string; remaining: string; yourGoal: string; reached: string; ofGoal: string;
  book: string; fine: string;
};

export const T: Record<Locale, Txt> = {
  en: {
    eyebrow: "International Finance Consulting · Interactive tool", title: "Build Wealth. Build a Future.",
    intro: "Explore what regular investing could grow into — for yourself or for your children. Choose your goal and see how much you may need to invest each month.",
    tablist: "Choose calculator", tabSelf: "For Myself", tabChild: "For My Kids",
    tagSelf: "Your future", tagChild: "Their future", titleSelf: "Your Wealth-Building Plan", titleChild: "Your Child’s Wealth-Building Plan",
    introSelf: "What are you saving for — and when do you want to get there?", introChild: "Choose the age you want your child to reach their investment goal.",
    goal: "How much wealth would you like to build?", ageSelf: "Your current age", ageChild: "Your child’s current age",
    targetAge: "At what age would you like to reach your goal?", childGoalAge: "Investment goal age", yearsToInvest: "{n} years to invest",
    monthly: "How much can you invest each month?",
    helpTitle: "Not quite reaching your goal?", helpText: "If changing your monthly investment doesn’t get you to your goal, you don’t have to figure it out alone. Let’s figure it out together.", helpLink: "Book your free consultation here →",
    rateNote: ["Estimated return on investment: ", "10% per year", " (hypothetical, not guaranteed). Contributions are made at the end of each month."],
    errChild: "Enter a valid child age and an investment goal age greater than their current age (up to 70).",
    errSelf: "Enter a goal age greater than your current age (up to age 100), and valid investment amounts.",
    projection: "Your projection", resultSelf: "Your future at age {age}", resultChild: "Your child’s future at age {age}", resultPlain: "Your projection",
    projNote: ["Projection based on an estimated ", "10% annual return", ". This is an illustration, not a guaranteed result."],
    scenario: "Estimated return on investment: 10% per year", target: "Your target amount", projected: "Projected wealth at age {age}",
    needed: "Monthly investment needed to reach your goal", perMonth: "/month", remaining: "Amount remaining to reach your goal", yourGoal: "Your goal", reached: "Goal reached", ofGoal: "{p}% of your goal",
    book: "Book Your Free Consultation Now →",
    fine: "Illustrative calculator only, not financial advice or a guarantee. Figures exclude fees, taxes and investment losses.",
  },
  de: {
    eyebrow: "International Finance Consulting · Interaktives Tool", title: "Vermögen aufbauen. Zukunft gestalten.",
    intro: "Sehen Sie, was aus regelmäßigem Investieren werden könnte – für Sie selbst oder für Ihre Kinder. Wählen Sie Ihr Ziel und sehen Sie, wie viel Sie dafür monatlich anlegen müssten.",
    tablist: "Rechner wählen", tabSelf: "Für mich", tabChild: "Für meine Kinder",
    tagSelf: "Ihre Zukunft", tagChild: "Die Zukunft Ihres Kindes", titleSelf: "Ihr Plan für den Vermögensaufbau", titleChild: "Der Vermögensplan für Ihr Kind",
    introSelf: "Wofür sparen Sie – und wann möchten Sie es erreicht haben?", introChild: "Wählen Sie das Alter, in dem Ihr Kind sein Sparziel erreichen soll.",
    goal: "Wie viel Vermögen möchten Sie aufbauen?", ageSelf: "Ihr aktuelles Alter", ageChild: "Aktuelles Alter Ihres Kindes",
    targetAge: "In welchem Alter möchten Sie Ihr Ziel erreichen?", childGoalAge: "Alter beim Sparziel", yearsToInvest: "{n} Jahre Anlagezeit",
    monthly: "Wie viel können Sie monatlich anlegen?",
    helpTitle: "Ihr Ziel ist noch nicht ganz erreicht?", helpText: "Wenn Sie Ihr Ziel auch mit einer anderen Monatsrate nicht erreichen, müssen Sie das nicht allein lösen. Wir finden gemeinsam einen Weg.", helpLink: "Hier kostenlose Beratung buchen →",
    rateNote: ["Angenommene Rendite: ", "10 % pro Jahr", " (hypothetisch, nicht garantiert). Einzahlungen jeweils am Monatsende."],
    errChild: "Bitte ein gültiges Alter Ihres Kindes eingeben und ein Zielalter, das darüber liegt (höchstens 70).",
    errSelf: "Bitte ein Zielalter über Ihrem aktuellen Alter (höchstens 100) und gültige Beträge eingeben.",
    projection: "Ihre Hochrechnung", resultSelf: "Ihre Zukunft mit {age} Jahren", resultChild: "Die Zukunft Ihres Kindes mit {age} Jahren", resultPlain: "Ihre Hochrechnung",
    projNote: ["Hochrechnung mit einer angenommenen ", "Rendite von 10 % pro Jahr", ". Eine Veranschaulichung, kein garantiertes Ergebnis."],
    scenario: "Angenommene Rendite: 10 % pro Jahr", target: "Ihr Zielbetrag", projected: "Voraussichtliches Vermögen mit {age} Jahren",
    needed: "Nötige Monatsrate für Ihr Ziel", perMonth: "/Monat", remaining: "Bis zu Ihrem Ziel fehlen noch", yourGoal: "Ihr Ziel", reached: "Ziel erreicht", ofGoal: "{p} % Ihres Ziels",
    book: "Jetzt kostenlose Beratung buchen →",
    fine: "Nur ein veranschaulichender Rechner – keine Anlageberatung und keine Garantie. Kosten, Steuern und mögliche Verluste sind nicht berücksichtigt.",
  },
  fr: {
    eyebrow: "International Finance Consulting · Outil interactif", title: "Bâtir un patrimoine. Bâtir l’avenir.",
    intro: "Découvrez ce que pourrait devenir un investissement régulier – pour vous ou pour vos enfants. Choisissez votre objectif et voyez combien investir chaque mois.",
    tablist: "Choisir le calculateur", tabSelf: "Pour moi", tabChild: "Pour mes enfants",
    tagSelf: "Votre avenir", tagChild: "Leur avenir", titleSelf: "Votre plan de patrimoine", titleChild: "Le plan de patrimoine de votre enfant",
    introSelf: "Pour quoi épargnez-vous – et quand voulez-vous y arriver ?", introChild: "Choisissez l’âge auquel votre enfant doit atteindre son objectif.",
    goal: "Quel patrimoine souhaitez-vous constituer ?", ageSelf: "Votre âge actuel", ageChild: "Âge actuel de votre enfant",
    targetAge: "À quel âge voulez-vous atteindre votre objectif ?", childGoalAge: "Âge à l’objectif", yearsToInvest: "{n} ans d’investissement",
    monthly: "Combien pouvez-vous investir chaque mois ?",
    helpTitle: "Vous n’atteignez pas tout à fait votre objectif ?", helpText: "Si modifier votre versement mensuel ne suffit pas, vous n’avez pas à chercher seul. Trouvons une solution ensemble.", helpLink: "Réservez votre conseil gratuit ici →",
    rateNote: ["Rendement estimé : ", "10 % par an", " (hypothétique, non garanti). Versements à la fin de chaque mois."],
    errChild: "Saisissez un âge valide pour votre enfant et un âge objectif supérieur (jusqu’à 70 ans).",
    errSelf: "Saisissez un âge objectif supérieur à votre âge actuel (jusqu’à 100 ans) et des montants valides.",
    projection: "Votre projection", resultSelf: "Votre avenir à {age} ans", resultChild: "L’avenir de votre enfant à {age} ans", resultPlain: "Votre projection",
    projNote: ["Projection basée sur un ", "rendement estimé de 10 % par an", ". Une illustration, pas un résultat garanti."],
    scenario: "Rendement estimé : 10 % par an", target: "Votre objectif", projected: "Patrimoine projeté à {age} ans",
    needed: "Versement mensuel nécessaire pour l’objectif", perMonth: "/mois", remaining: "Montant restant pour atteindre l’objectif", yourGoal: "Votre objectif", reached: "Objectif atteint", ofGoal: "{p} % de votre objectif",
    book: "Réserver mon conseil gratuit →",
    fine: "Calculateur illustratif uniquement – ni conseil en investissement, ni garantie. Frais, impôts et pertes éventuelles non pris en compte.",
  },
  ar: {
    eyebrow: "International Finance Consulting · أداة تفاعلية", title: "ابنِ ثروتك. ابنِ مستقبلك.",
    intro: "اكتشف ما يمكن أن ينمو إليه الاستثمار المنتظم – لك أو لأطفالك. اختر هدفك واعرف كم تحتاج أن تستثمر شهرياً.",
    tablist: "اختر الحاسبة", tabSelf: "لنفسي", tabChild: "لأطفالي",
    tagSelf: "مستقبلك", tagChild: "مستقبلهم", titleSelf: "خطتك لبناء الثروة", titleChild: "خطة الثروة لطفلك",
    introSelf: "لماذا تدّخر – ومتى تريد أن تصل إلى هدفك؟", introChild: "اختر العمر الذي تريد أن يبلغ فيه طفلك هدفه.",
    goal: "ما حجم الثروة التي تريد بناءها؟", ageSelf: "عمرك الحالي", ageChild: "عمر طفلك الحالي",
    targetAge: "في أي عمر تريد أن تصل إلى هدفك؟", childGoalAge: "العمر عند الهدف", yearsToInvest: "{n} سنة استثمار",
    monthly: "كم يمكنك أن تستثمر شهرياً؟",
    helpTitle: "لم تصل إلى هدفك بعد؟", helpText: "إذا لم يوصلك تغيير المبلغ الشهري إلى هدفك، فلست مضطراً لحل الأمر وحدك. لنجد الحل معاً.", helpLink: "احجز استشارتك المجانية هنا ←",
    rateNote: ["العائد المفترض: ", "10% سنوياً", " (افتراضي وغير مضمون). الدفعات بنهاية كل شهر."],
    errChild: "أدخل عمراً صحيحاً لطفلك وعمر هدف أكبر منه (حتى 70).",
    errSelf: "أدخل عمر هدف أكبر من عمرك الحالي (حتى 100) ومبالغ صحيحة.",
    projection: "توقعاتك", resultSelf: "مستقبلك بعمر {age}", resultChild: "مستقبل طفلك بعمر {age}", resultPlain: "توقعاتك",
    projNote: ["توقع مبني على ", "عائد مفترض 10% سنوياً", ". هذا توضيح وليس نتيجة مضمونة."],
    scenario: "العائد المفترض: 10% سنوياً", target: "المبلغ المستهدف", projected: "الثروة المتوقعة بعمر {age}",
    needed: "المبلغ الشهري اللازم لهدفك", perMonth: " شهرياً", remaining: "المبلغ الباقي للوصول لهدفك", yourGoal: "هدفك", reached: "وصلت لهدفك", ofGoal: "{p}% من هدفك",
    book: "احجز استشارتك المجانية الآن ←",
    fine: "حاسبة توضيحية فقط – ليست استشارة استثمارية ولا ضماناً. الرسوم والضرائب والخسائر المحتملة غير محسوبة.",
  },
};

export const wealthBuilderTitle = (l: Locale) => T[l].title;
export const wealthBuilderIntro = (l: Locale) => T[l].intro;
