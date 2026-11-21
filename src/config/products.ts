/**
 * Verifizierte Produktinformationen – ausschließlich aus offiziellen Quellen
 * (www.ergo.de), abgerufen am 21.11.2026. Vor jeder Veröffentlichung erneut
 * prüfen; Tarife und Konditionen können sich ändern. Siehe PRODUCT-SOURCES.md.
 */
import type { Localized } from "./company";
import type { ServiceKey } from "@/lib/i18n";

export const productsCheckedAt = "2026-11-21";

type ProductInfo = { title: string; names: string[]; carrier: string; source: string; facts: Localized<string[]> };

export const products: Record<ServiceKey, ProductInfo> = {
  retirement: {
    title: "ERGO Rentenversicherung",
    names: ["Private Rentenversicherung (Index, Dynamik/Balance, fondsgebunden)", "Basis-Rente (Rürup)", "Altersvorsorgedepot (ab 2027)"],
    carrier: "ERGO Vorsorge Lebensversicherung AG",
    source: "https://www.ergo.de/de/Produkte/Rentenversicherung",
    facts: {
      de: ["Private Rentenversicherungen ab 25 € im Monat", "Index-Variante: Sparbeiträge ab 12 Jahren Laufzeit zu 100 % gesichert, mit Höchststandgarantie", "Basis-Rente (Rürup) ab 25 € im Monat mit lebenslanger Rente; Beiträge steuerlich absetzbar", "Ab 2027: staatlich gefördertes Altersvorsorgedepot"],
      en: ["Private pension insurance from €25 a month", "Index option: contributions 100% secured after a term of 12 years, with a high-water-mark guarantee", "Basis-Rente (Rürup) from €25 a month with a lifelong pension; contributions tax-deductible", "From 2027: state-subsidised retirement savings account (Altersvorsorgedepot)"],
      fr: ["Assurances retraite privées dès 25 € par mois", "Variante indicielle : cotisations garanties à 100 % après 12 ans, avec garantie du plus haut niveau atteint", "Basis-Rente (Rürup) dès 25 € par mois avec rente viagère ; cotisations déductibles des impôts", "À partir de 2027 : compte d’épargne retraite subventionné par l’État (Altersvorsorgedepot)"],
      ar: ["تأمينات تقاعد خاصة ابتداءً من 25 يورو شهرياً", "خيار المؤشر: الأقساط مضمونة 100٪ بعد مدة 12 سنة، مع ضمان أعلى قيمة تم الوصول إليها", "راتب التقاعد الأساسي (Rürup) من 25 يورو شهرياً مع راتب مدى الحياة، والأقساط قابلة للخصم من الضريبة", "ابتداءً من 2027: حساب ادخار للتقاعد مدعوم من الدولة (Altersvorsorgedepot)"],
    },
  },
  kids: {
    title: "ERGO Kidspolicen",
    names: ["ERGO Kidspolice Index", "ERGO Kidspolice Balance", "ERGO Kidspolice Dynamik", "ERGO Kidspolice Chance", "ERGO Zukunfts-Kidspolice Chance"],
    carrier: "ERGO Vorsorge Lebensversicherung AG",
    source: "https://www.ergo.de/de/Produkte/Bausparen-Finanzierung/Kidspolicen",
    facts: {
      de: ["Ab 25 € im Monat oder 2.500 € Einmalbeitrag", "Zuzahlungen ab 100 €, Kapitalentnahmen ab 500 € möglich", "Vertragspartner können Eltern, Großeltern oder andere Personen sein", "Varianten von sicherheitsorientiert (Index) bis renditeorientiert (Chance)"],
      en: ["From €25 a month or a €2,500 lump sum", "Extra payments from €100, withdrawals from €500", "The policyholder can be a parent, grandparent or another person", "Options from security-focused (Index) to growth-focused (Chance)"],
      fr: ["Dès 25 € par mois ou 2 500 € en versement unique", "Versements complémentaires dès 100 €, retraits dès 500 €", "Le souscripteur peut être un parent, un grand-parent ou une autre personne", "Variantes allant de la sécurité (Index) au rendement (Chance)"],
      ar: ["ابتداءً من 25 يورو شهرياً أو 2.500 يورو دفعة واحدة", "دفعات إضافية من 100 يورو، وسحب جزء من المال من 500 يورو", "صاحب العقد يمكن أن يكون أحد الوالدين أو الأجداد أو شخصاً آخر", "خيارات من الأكثر أماناً (Index) إلى الأكثر عائداً (Chance)"],
    },
  },
  bu: {
    title: "ERGO Berufsunfähigkeitsversicherung",
    names: ["ERGO Berufsunfähigkeitsversicherung (Tarife Best / Best Plus)"],
    carrier: "ERGO Vorsorge Lebensversicherung AG",
    source: "https://www.ergo.de/de/Produkte/Berufsunfaehigkeitsversicherung",
    facts: {
      de: ["Volle BU-Rente bereits ab 50 % Berufsunfähigkeit", "Tarif Best Plus: Zugang zu Online-Programmen zur Stärkung der mentalen Gesundheit", "Laufzeit bis zu einem vereinbarten Endalter, z. B. 67"],
      en: ["Full benefit from 50% occupational disability", "Best Plus tariff: access to online programmes supporting mental health", "Term up to an agreed end age, e.g. 67"],
      fr: ["Rente complète dès 50 % d’incapacité professionnelle", "Tarif Best Plus : accès à des programmes en ligne pour la santé mentale", "Durée jusqu’à un âge convenu, par exemple 67 ans"],
      ar: ["الراتب الكامل ابتداءً من عجز مهني بنسبة 50٪", "تعرفة Best Plus: برامج إلكترونية لدعم الصحة النفسية", "المدة حتى عمر يتم الاتفاق عليه، مثلاً 67 سنة"],
    },
  },
  pkv: {
    title: "DKV Krankenvollversicherung",
    names: ["DKV BestMed Basis (BME)", "DKV BestMed Komfort (BMK / BMKD)", "DKV PremiumMed (PMN)"],
    carrier: "DKV Deutsche Krankenversicherung AG",
    source: "https://www.ergo.de/de/Produkte/Krankenversicherung/Krankenvollversicherung",
    facts: {
      de: ["Krankenvollversicherung der DKV, Teil der ERGO Group", "Drei Leistungsstufen: BestMed Basis, BestMed Komfort, PremiumMed", "Vertraglich garantierte Leistungen; Beitragsrückerstattung möglich, wenn keine Leistungen in Anspruch genommen werden"],
      en: ["Comprehensive health insurance from DKV, part of the ERGO Group", "Three levels: BestMed Basis, BestMed Komfort, PremiumMed", "Contractually guaranteed benefits; premium refunds possible if no claims are made"],
      fr: ["Assurance maladie complète de la DKV, membre du groupe ERGO", "Trois niveaux : BestMed Basis, BestMed Komfort, PremiumMed", "Prestations garanties par contrat ; remboursement de cotisations possible en l’absence de sinistre"],
      ar: ["تأمين صحي كامل من DKV، وهي جزء من مجموعة ERGO", "ثلاث مستويات: BestMed Basis وBestMed Komfort وPremiumMed", "خدمات مضمونة في العقد، وإمكانية استرداد جزء من الأقساط إذا لم تستخدم الخدمات"],
    },
  },
  bav: {
    title: "ERGO Betriebs-Rente",
    names: ["ERGO Betriebs-Rente Index", "ERGO Betriebs-Rente Dynamik", "ERGO Betriebs-Rente Dynamik Comfort"],
    carrier: "ERGO Vorsorge Lebensversicherung AG bzw. ERGO Pensionsfonds AG",
    source: "https://www.ergo.de/de/Geschaeftskunden-Produkte/Betriebliche-Altersversorgung",
    facts: {
      de: ["Durchführungswege: Direktversicherung, Unterstützungskasse, Direktzusage, Pensionsfonds", "Betriebs-Rente Index: 100 % Beitragsgarantie ab 12 Jahren Laufzeit", "Betriebs-Rente Dynamik: Beitragsgarantie von 60 bis 100 % wählbar, Fonds- oder ETF-Anlage", "Förderfähig nach § 3 Nr. 63 und § 100 EStG"],
      en: ["Implementation routes: direct insurance, support fund, direct pension promise, pension fund", "Betriebs-Rente Index: 100% contribution guarantee after 12 years", "Betriebs-Rente Dynamik: contribution guarantee selectable from 60 to 100%, fund or ETF investment", "Eligible for tax support under § 3 No. 63 and § 100 EStG"],
      fr: ["Modes de mise en œuvre : assurance directe, caisse de soutien, engagement direct, fonds de pension", "Betriebs-Rente Index : garantie de 100 % des cotisations après 12 ans", "Betriebs-Rente Dynamik : garantie des cotisations au choix de 60 à 100 %, placement en fonds ou ETF", "Éligible aux aides fiscales (§ 3 n° 63 et § 100 EStG)"],
      ar: ["طرق التطبيق: التأمين المباشر، صندوق الدعم، الالتزام المباشر، صندوق التقاعد", "Betriebs-Rente Index: ضمان 100٪ من الأقساط بعد 12 سنة", "Betriebs-Rente Dynamik: ضمان الأقساط من 60 إلى 100٪ حسب الاختيار، مع استثمار في صناديق أو ETF", "مؤهل للدعم الضريبي وفق المادة 3 رقم 63 والمادة 100 من قانون ضريبة الدخل"],
    },
  },
  bkv: {
    title: "DKV Betriebliche Krankenversicherung",
    names: ["Betriebliche Krankenversicherung der DKV (u. a. Budgetbausteine)"],
    carrier: "DKV Deutsche Krankenversicherung AG",
    source: "https://www.ergo.de/de/Geschaeftskunden-Produkte/Gewerbliche-Krankenversicherung/Betriebliche-Krankenversicherung",
    facts: {
      de: ["Arbeitgeberfinanziert oder arbeitnehmerfinanziert (über Rahmenvertrag) möglich", "Budgetbausteine: jährliches Gesundheitsbudget von 300, 600, 900 oder 1.200 € pro Mitarbeitendem", "Arbeitgeberfinanzierte bKV: keine Gesundheitsprüfung und keine Wartezeiten", "Fortführung bei Arbeitgeberwechsel oder Rentenbeginn ohne Gesundheitsprüfung möglich"],
      en: ["Employer-funded or employee-funded (via a framework agreement)", "Budget modules: an annual health budget of €300, €600, €900 or €1,200 per employee", "Employer-funded bKV: no health check and no waiting periods", "Can be continued after a job change or retirement without a health check"],
      fr: ["Financée par l’employeur ou par le salarié (via un contrat-cadre)", "Modules budget : budget santé annuel de 300, 600, 900 ou 1 200 € par salarié", "bKV financée par l’employeur : pas d’examen de santé ni de délai de carence", "Maintien possible après un changement d’employeur ou à la retraite sans examen de santé"],
      ar: ["يمكن أن يموّلها صاحب العمل أو الموظف (عبر عقد إطاري)", "ميزانية صحية سنوية بقيمة 300 أو 600 أو 900 أو 1.200 يورو لكل موظف", "عند تمويل صاحب العمل: بدون فحص صحي وبدون فترة انتظار", "إمكانية الاستمرار عند تغيير العمل أو بداية التقاعد بدون فحص صحي"],
    },
  },
};
