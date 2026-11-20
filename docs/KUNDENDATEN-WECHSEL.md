# Kundendaten-Wechsel in ca. 10 Minuten

Alle sichtbaren personenbezogenen Inhalte (Logo, Monogramm, Favicon, Navigation, Hero, Über mich,
Kontakt, Footer, SEO-Titel, strukturierte Daten, Formular, Bestätigung, alle 3 Sprachen,
Marketing-Grafiken, vCard, Signatur) stammen aus **`src/config/advisor.ts`**.

## 1. Fotos ablegen (2 Min.)
Bilder nach `public/images/advisor/` kopieren, z. B. `portrait-main.jpg`, `portrait-office.jpg`.
In `advisor.ts` → `images` die Pfade eintragen (`/images/advisor/portrait-main.jpg`).
`null` = eleganter Monogramm-Platzhalter.

## 2. Identität (3 Min.)
```ts
previewIdentity: false,          // erst wenn ALLES echt ist
firstName: "Vorname",
lastName: "Nachname",
nameAr: "الاسم بالعربية",          // vom Kunden bestätigen lassen
initials: "XY",
brandName: "VORNAME NACHNAME",
jobTitle: { de: "…", en: "…", ar: "…" }, // exakt laut Registrierung
bioShort / bioLong / background: …   // je 3 Sprachen, nur belegbare Angaben
```

## 3. Kontakt (2 Min.)
`phone` (Format `+49211…` ohne Leerzeichen), `phoneDisplay`, `email`, `office.postalCode`,
`openingHours`, `consultationModes.video`, `freeInitialConsultation`.

## 4. Regulatorik & Recht (3 Min.)
`intermediaryStatus`, `registerNumber`, `supervisoryAuthority`, `insurers`, `shareholdings`,
`remuneration`, `firstInfoProcessConfirmed`, `partnerMentionApproved`, `legal.*`, `leadRecipientEmail`, `siteUrl`.

## 5. Prüfen & neu bauen
```bash
npm run release-check
```
```bash
npm run build && npm start
```
```bash
MARKETING_URL=https://ihre-domain.de npm run marketing
```

## Schnelltest
Startseite DE/AR/EN, Footer, Impressum, Erstinformation und Formular-Bestätigung ansehen –
es darf nirgends mehr „Yaheia“/„يحيى“ oder ein „⚠ Fehlt“-Hinweis erscheinen:
```bash
grep -rn "Yaheia\|يحيى\|Kaswan" src/ --include=*.ts --include=*.tsx
```
(Erwartet: nur Treffer in `advisor.ts`, solange dort noch alte Werte stehen. Die Fußzeile
„Website: KASWAN Webdesign“ bleibt bewusst als Agenturnennung im Impressum.)

## Hinweis Texte
Seitentexte, die den Namen enthalten, nutzen automatisch die Konfiguration. Die übrigen Texte
(`src/content/de.ts`, `en.ts`, `ar.ts`) sind in der Ich-Form neutral formuliert und funktionieren
für jeden Berater. Wenn der Auftraggeber z. B. kein Englisch spricht: Sprache in `src/lib/i18n.ts`
(`locales`) entfernen und Texte zu Sprachen anpassen.
