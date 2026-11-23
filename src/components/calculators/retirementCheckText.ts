/** Texte zum „Retirement Reality Check“ (DE/EN/FR/AR). Rechenlogik: RetirementCheck.tsx */
import type { Locale } from "@/lib/i18n";

export type Txt = {
  eyebrow: string; title: string; intro: string;
  inputsLabel: string; inputsTitle: string; age: string; retire: string; salary: string; worked: string;
  goal: string; goalHint: string; inflationNote: [string, string, string]; error: string; calculate: string;
  progress: string;
  s1Label: string; s1Title: string; paper: string; perMonthRetire: string; want: string; perMonthToday: string;
  firstGap: string; firstGapNote: string; surplus: string; s1Text: string; catch: string; change: string;
  s2Label: string; but: string; s2Title: string; defTitle: string; defText: string;
  s2Text: [string, string, string, string]; paper2: string; futureEuros: string; real: string; realNote: string;
  lossLabel: string; lossNote: string; perMonth: string; showGap: string; back: string;
  s3Label: string; s3Title: string; real3: string; perMonthTodayEuros: string; want3: string;
  gapLabel: string; noGap: string; coverage: string; s3Text: string; again: string;
  fine: string;
};

export const T: Record<Locale, Txt> = {
  en: {
    eyebrow: "Your future in Germany · Our mission", title: "Retirement Reality Check", intro: "Discover what you might receive, what you want, and how inflation changes the picture.",
    inputsLabel: "Your information", inputsTitle: "Let's start with you.", age: "Your current age", retire: "Age you plan to retire", salary: "Monthly gross salary (€)", worked: "Years worked in Germany",
    goal: "How much would you like to have each month in retirement?", goalHint: "Choose an amount in today's money — what would support your desired lifestyle now?",
    inflationNote: ["Fixed inflation assumption: ", "2.8% per year", ". No adjustment needed."],
    error: "Please enter valid details. Retirement age must exceed your age; years worked cannot exceed your age minus 16.",
    calculate: "See my retirement results →", progress: "Results progress",
    s1Label: "Step 1 of 3 · The first picture", s1Title: "Here's what retirement looks like on paper.", paper: "Your estimated pension on paper", perMonthRetire: "Per month when you retire",
    want: "How much you want", perMonthToday: "Per month, in today's money", firstGap: "At first glance, the difference is",
    firstGapNote: "A simple comparison — but these amounts are in different years, so this is NOT your real retirement gap.", surplus: " (apparent surplus)",
    s1Text: "Seems straightforward, right? There's one important thing we haven't accounted for yet.", catch: "There's a catch →", change: "Change my details",
    s2Label: "Step 2 of 3 · The reality check", but: "BUT.", s2Title: "What about inflation?", defTitle: "What is inflation?",
    defText: "Over time, prices generally rise. That means the same €1,000 will buy less in the future than it buys today.",
    s2Text: ["With an assumed ", "2.8% annual inflation rate", " over ", " years, here's what changes:"],
    paper2: "Pension on paper", futureEuros: "Future euros per month", real: "Its purchasing power in today's money", realNote: "What that pension could buy, measured in today's euros",
    lossLabel: "Purchasing power difference", lossNote: "The difference between the nominal pension and its value in today's euros — not money deducted from your pension.",
    perMonth: "/month", showGap: "Show my real retirement gap →", back: "← Back",
    s3Label: "Step 3 of 3 · Your retirement gap", s3Title: "Now let's compare what really matters.", real3: "Your pension's purchasing power", perMonthTodayEuros: "Per month in today's euros",
    want3: "Your desired retirement income", gapLabel: "YOUR ESTIMATED MONTHLY RETIREMENT GAP", noGap: "No estimated shortfall",
    coverage: "{p}% of your target covered by the estimated pension (before deductions).", s3Text: "Planning ahead can help you understand your options for closing this gap.", again: "Try another scenario ↻",
    fine: "Illustrative educational tool, not an official pension forecast or personal financial advice. Pension estimated using a simplified German pension-points model: annual earnings divided by an assumed reference average annual salary of €51,944 (capped at €101,400), multiplied by years worked plus projected years until retirement, and €42.52 per point monthly. Assumes salary stays constant relative to average earnings and nominal pension values increase by 2% annually. Actual pension points, future pension increases, retirement deductions, foreign pension entitlements and changes to German law may differ. Results exclude taxes and health/long-term-care contributions. The fixed 2.8% inflation figure is a scenario assumption, not a verified long-run German average. The on-paper gap compares future euros with today's euros and is intentionally marked as not comparable; the final gap uses today's purchasing power for both amounts.",
  },
  de: {
    eyebrow: "Ihre Zukunft in Deutschland · Unsere Mission", title: "Renten-Realitätscheck", intro: "Sehen Sie, was Sie bekommen könnten, was Sie sich wünschen – und wie die Inflation das Bild verändert.",
    inputsLabel: "Ihre Angaben", inputsTitle: "Fangen wir bei Ihnen an.", age: "Ihr aktuelles Alter", retire: "Geplantes Rentenalter", salary: "Monatliches Bruttogehalt (€)", worked: "Bisherige Arbeitsjahre in Deutschland",
    goal: "Wie viel möchten Sie im Ruhestand pro Monat zur Verfügung haben?", goalHint: "Wählen Sie einen Betrag in heutigem Geld – was würde Ihren Wunsch-Lebensstil heute finanzieren?",
    inflationNote: ["Feste Inflationsannahme: ", "2,8 % pro Jahr", ". Keine Anpassung nötig."],
    error: "Bitte gültige Angaben machen. Das Rentenalter muss über Ihrem Alter liegen; Arbeitsjahre dürfen höchstens Ihr Alter minus 16 sein.",
    calculate: "Mein Ergebnis anzeigen →", progress: "Fortschritt",
    s1Label: "Schritt 1 von 3 · Der erste Eindruck", s1Title: "So sieht Ihre Rente auf dem Papier aus.", paper: "Ihre geschätzte Rente auf dem Papier", perMonthRetire: "Pro Monat bei Rentenbeginn",
    want: "Ihr Wunschbetrag", perMonthToday: "Pro Monat, in heutigem Geld", firstGap: "Auf den ersten Blick beträgt die Differenz",
    firstGapNote: "Ein einfacher Vergleich – aber die Beträge stammen aus verschiedenen Jahren. Das ist also NICHT Ihre echte Rentenlücke.", surplus: " (scheinbarer Überschuss)",
    s1Text: "Klingt einfach, oder? Einen wichtigen Punkt haben wir aber noch nicht berücksichtigt.", catch: "Es gibt einen Haken →", change: "Angaben ändern",
    s2Label: "Schritt 2 von 3 · Der Realitätscheck", but: "ABER.", s2Title: "Was ist mit der Inflation?", defTitle: "Was ist Inflation?",
    defText: "Mit der Zeit steigen die Preise in der Regel. Für dieselben 1.000 € bekommen Sie in Zukunft also weniger als heute.",
    s2Text: ["Bei einer angenommenen ", "Inflation von 2,8 % pro Jahr", " über ", " Jahre ändert sich Folgendes:"],
    paper2: "Rente auf dem Papier", futureEuros: "Zukünftige Euro pro Monat", real: "Ihre Kaufkraft in heutigem Geld", realNote: "Was Sie sich mit dieser Rente leisten könnten – gemessen in heutigen Euro",
    lossLabel: "Kaufkraft-Unterschied", lossNote: "Die Differenz zwischen der Rente auf dem Papier und ihrem Wert in heutigen Euro – kein Geld, das von Ihrer Rente abgezogen wird.",
    perMonth: "/Monat", showGap: "Meine echte Rentenlücke zeigen →", back: "← Zurück",
    s3Label: "Schritt 3 von 3 · Ihre Rentenlücke", s3Title: "Jetzt vergleichen wir, was wirklich zählt.", real3: "Kaufkraft Ihrer Rente", perMonthTodayEuros: "Pro Monat in heutigen Euro",
    want3: "Ihr gewünschtes Einkommen im Ruhestand", gapLabel: "IHRE GESCHÄTZTE MONATLICHE RENTENLÜCKE", noGap: "Keine geschätzte Lücke",
    coverage: "{p} % Ihres Ziels sind durch die geschätzte Rente gedeckt (vor Abzügen).", s3Text: "Wer früh plant, kennt seine Möglichkeiten, diese Lücke zu schließen.", again: "Anderes Szenario testen ↻",
    fine: "Vereinfachtes Info-Tool – keine offizielle Rentenprognose und keine persönliche Finanzberatung. Die Rente wird mit einem vereinfachten Entgeltpunkte-Modell geschätzt: Jahresgehalt geteilt durch ein angenommenes Durchschnittsentgelt von 51.944 € (begrenzt auf 101.400 €), multipliziert mit bisherigen plus noch erwarteten Arbeitsjahren, und 42,52 € pro Punkt im Monat. Annahmen: Ihr Gehalt bleibt im Verhältnis zum Durchschnitt gleich, die Rentenwerte steigen nominal um 2 % pro Jahr. Tatsächliche Entgeltpunkte, künftige Rentenerhöhungen, Abschläge, ausländische Rentenansprüche und Gesetzesänderungen können abweichen. Steuern sowie Kranken- und Pflegeversicherungsbeiträge sind nicht abgezogen. Die feste Inflation von 2,8 % ist eine Szenario-Annahme, kein geprüfter langjähriger Durchschnitt für Deutschland. Die Differenz „auf dem Papier“ vergleicht künftige mit heutigen Euro und ist bewusst als nicht vergleichbar gekennzeichnet; die endgültige Lücke vergleicht beide Beträge in heutiger Kaufkraft.",
  },
  fr: {
    eyebrow: "Votre avenir en Allemagne · Notre mission", title: "Le vrai bilan de votre retraite", intro: "Découvrez ce que vous pourriez toucher, ce que vous souhaitez – et comment l'inflation change la donne.",
    inputsLabel: "Vos informations", inputsTitle: "Commençons par vous.", age: "Votre âge actuel", retire: "Âge prévu de départ à la retraite", salary: "Salaire brut mensuel (€)", worked: "Années travaillées en Allemagne",
    goal: "De combien aimeriez-vous disposer chaque mois à la retraite ?", goalHint: "Choisissez un montant en euros d'aujourd'hui – de quoi financer le niveau de vie souhaité ?",
    inflationNote: ["Hypothèse d'inflation fixe : ", "2,8 % par an", ". Aucun réglage nécessaire."],
    error: "Veuillez saisir des données valides. L'âge de la retraite doit dépasser votre âge ; les années travaillées ne peuvent pas dépasser votre âge moins 16.",
    calculate: "Voir mon résultat →", progress: "Progression",
    s1Label: "Étape 1 sur 3 · La première image", s1Title: "Voici votre retraite sur le papier.", paper: "Votre pension estimée sur le papier", perMonthRetire: "Par mois au départ à la retraite",
    want: "Ce que vous souhaitez", perMonthToday: "Par mois, en euros d'aujourd'hui", firstGap: "À première vue, la différence est de",
    firstGapNote: "Une comparaison simple – mais ces montants correspondent à des années différentes : ce n'est PAS votre véritable écart de retraite.", surplus: " (excédent apparent)",
    s1Text: "Cela semble simple, non ? Il reste pourtant un point important à prendre en compte.", catch: "Il y a un piège →", change: "Modifier mes données",
    s2Label: "Étape 2 sur 3 · Le retour à la réalité", but: "MAIS.", s2Title: "Et l'inflation ?", defTitle: "Qu'est-ce que l'inflation ?",
    defText: "Avec le temps, les prix augmentent en général. Avec les mêmes 1 000 €, vous pourrez donc acheter moins demain qu'aujourd'hui.",
    s2Text: ["Avec une ", "inflation supposée de 2,8 % par an", " sur ", " ans, voici ce qui change :"],
    paper2: "Pension sur le papier", futureEuros: "Euros futurs par mois", real: "Son pouvoir d'achat en euros d'aujourd'hui", realNote: "Ce que cette pension permettrait d'acheter, en euros d'aujourd'hui",
    lossLabel: "Écart de pouvoir d'achat", lossNote: "La différence entre la pension nominale et sa valeur en euros d'aujourd'hui – ce n'est pas un montant retenu sur votre pension.",
    perMonth: "/mois", showGap: "Voir mon véritable écart →", back: "← Retour",
    s3Label: "Étape 3 sur 3 · Votre écart de retraite", s3Title: "Comparons maintenant ce qui compte vraiment.", real3: "Pouvoir d'achat de votre pension", perMonthTodayEuros: "Par mois en euros d'aujourd'hui",
    want3: "Revenu souhaité à la retraite", gapLabel: "VOTRE ÉCART MENSUEL ESTIMÉ", noGap: "Aucun manque estimé",
    coverage: "{p} % de votre objectif couverts par la pension estimée (avant prélèvements).", s3Text: "Anticiper vous aide à connaître vos options pour combler cet écart.", again: "Tester un autre scénario ↻",
    fine: "Outil pédagogique simplifié – ni prévision officielle de retraite, ni conseil financier personnalisé. La pension est estimée avec un modèle simplifié de points de retraite allemands : revenu annuel divisé par un salaire moyen de référence supposé de 51 944 € (plafonné à 101 400 €), multiplié par les années travaillées plus les années restantes jusqu'à la retraite, et 42,52 € par point et par mois. Hypothèses : votre salaire reste constant par rapport à la moyenne et les valeurs de pension augmentent de 2 % par an en nominal. Les points réels, les revalorisations futures, les décotes, les droits à pension étrangers et les évolutions législatives peuvent différer. Impôts et cotisations santé/dépendance non déduits. L'inflation fixe de 2,8 % est une hypothèse de scénario, pas une moyenne allemande vérifiée sur le long terme. L'écart « sur le papier » compare des euros futurs à des euros d'aujourd'hui et est volontairement signalé comme non comparable ; l'écart final compare les deux montants en pouvoir d'achat actuel.",
  },
  ar: {
    eyebrow: "مستقبلك في ألمانيا · مهمتنا", title: "حقيقة تقاعدك بالأرقام", intro: "اعرف كم ممكن يكون معاشك، وكم تحتاج فعلاً، وكيف يغيّر التضخم الصورة.",
    inputsLabel: "معلوماتك", inputsTitle: "خلّينا نبدأ فيك.", age: "عمرك الحالي", retire: "العمر اللي ناوي تتقاعد فيه", salary: "الراتب الشهري الإجمالي (€)", worked: "سنوات العمل في ألمانيا حتى الآن",
    goal: "كم تحب يكون معك كل شهر بعد التقاعد؟", goalHint: "اختر مبلغاً بقيمة اليوم – كم تحتاج اليوم لتعيش بالمستوى اللي تتمناه؟",
    inflationNote: ["افتراض ثابت للتضخم: ", "2.8% سنوياً", ". ما في داعي تغيّر شي."],
    error: "الرجاء إدخال بيانات صحيحة. لازم يكون عمر التقاعد أكبر من عمرك، وسنوات العمل ما تزيد عن عمرك ناقص 16.",
    calculate: "اعرض نتيجتي ←", progress: "التقدّم",
    s1Label: "الخطوة 1 من 3 · الصورة الأولى", s1Title: "هكذا يبدو تقاعدك على الورق.", paper: "معاشك المتوقع على الورق", perMonthRetire: "شهرياً عند التقاعد",
    want: "المبلغ اللي تريده", perMonthToday: "شهرياً، بقيمة اليوم", firstGap: "من أول نظرة، الفرق هو",
    firstGapNote: "مقارنة بسيطة – لكن المبالغ من سنوات مختلفة، فهذا ليس الفجوة الحقيقية في تقاعدك.", surplus: " (فائض ظاهري)",
    s1Text: "يبدو الموضوع سهلاً، صح؟ بس في نقطة مهمة لسا ما حسبناها.", catch: "في شي لازم تعرفه ←", change: "تعديل بياناتي",
    s2Label: "الخطوة 2 من 3 · مواجهة الواقع", but: "لكن.", s2Title: "وماذا عن التضخم؟", defTitle: "ما هو التضخم؟",
    defText: "مع الوقت ترتفع الأسعار عادةً. يعني نفس الـ 1,000 € بتشتري فيها بالمستقبل أقل من اليوم.",
    s2Text: ["مع ", "تضخم مفترض بنسبة 2.8% سنوياً", " على مدى ", " سنة، هذا اللي بيتغيّر:"],
    paper2: "المعاش على الورق", futureEuros: "يورو مستقبلي شهرياً", real: "قوته الشرائية بقيمة اليوم", realNote: "ماذا يمكنك أن تشتري بهذا المعاش، محسوباً بيورو اليوم",
    lossLabel: "فرق القوة الشرائية", lossNote: "الفرق بين المعاش الاسمي وقيمته بيورو اليوم – وليس مبلغاً يُخصم من معاشك.",
    perMonth: " شهرياً", showGap: "اعرض فجوتي الحقيقية ←", back: "→ رجوع",
    s3Label: "الخطوة 3 من 3 · فجوة التقاعد", s3Title: "الآن نقارن الشي اللي فعلاً مهم.", real3: "القوة الشرائية لمعاشك", perMonthTodayEuros: "شهرياً بيورو اليوم",
    want3: "الدخل اللي تتمناه بالتقاعد", gapLabel: "فجوة التقاعد الشهرية المتوقعة", noGap: "لا توجد فجوة متوقعة",
    coverage: "{p}% من هدفك يغطيه المعاش المتوقع (قبل الاستقطاعات).", s3Text: "التخطيط المبكر يساعدك تعرف خياراتك لسدّ هذه الفجوة.", again: "جرّب سيناريو آخر ↻",
    fine: "أداة توضيحية مبسّطة – ليست توقعاً رسمياً للمعاش ولا استشارة مالية شخصية. يُقدَّر المعاش بنموذج مبسّط لنقاط المعاش الألمانية: الدخل السنوي مقسوماً على متوسط دخل مرجعي مفترض قدره 51,944 € (بحد أقصى 101,400 €)، مضروباً في سنوات العمل السابقة والمتوقعة حتى التقاعد، و42.52 € لكل نقطة شهرياً. الافتراضات: يبقى راتبك ثابتاً نسبةً إلى المتوسط، وترتفع قيم المعاش اسمياً بنسبة 2% سنوياً. قد تختلف النقاط الفعلية والزيادات المستقبلية والخصومات وحقوق المعاش من الخارج وتغييرات القانون. لم تُخصم الضرائب ولا اشتراكات التأمين الصحي والرعاية. التضخم الثابت 2.8% افتراض للسيناريو وليس متوسطاً ألمانياً طويل الأمد مؤكداً. الفرق «على الورق» يقارن يورو المستقبل بيورو اليوم ولذلك مُعلَّم بأنه غير قابل للمقارنة؛ أما الفجوة النهائية فتقارن المبلغين بالقوة الشرائية الحالية.",
  },
};


export const retirementCheckTitle = (l: Locale) => T[l].title;
export const retirementCheckIntro = (l: Locale) => T[l].intro;
