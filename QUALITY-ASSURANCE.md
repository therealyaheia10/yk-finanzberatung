# Qualitätssicherung – tatsächlich gemessene Ergebnisse

Stand: interne Vorschau (PREVIEW), lokaler Produktionsbuild (`next build && next start`), Chromium.

## Automatisierte Tests – 65 / 65 bestanden
`npm run test:e2e` (Playwright 1.65 + @axe-core/playwright)
- Alle **42 Seiten** (14 × DE/AR/EN): HTTP 200, `lang`/`dir` korrekt (AR = rtl), genau eine H1,
  Titel, Canonical, hreflang für alle 3 Sprachen, `noindex` in der Vorschau,
  **kein horizontales Scrollen bei 360 px**
- Sprachweiterleitung `/` → Browsersprache
- Sprachwechsel behält die Unterseite (DE ↔ AR ↔ EN)
- Alle internen Links der Startseiten (3 Sprachen) liefern < 400
- Mobile Navigation: öffnen, Escape schließt, Navigation funktioniert
- Anliegen-Finder → Ergebnis → Formular mit vorausgewähltem Anliegen
- Rentenlücke-Rechner reagiert auf Tastatureingabe
- Formular DE/AR/EN: Pflichtfeld-Validierung mit Fehlermeldung, Testbetrieb deutlich gekennzeichnet
- API: ungültige Daten → 400, zu schnelle (Bot-)Anfrage → 400
- Tastatur: Skip-Link fokussierbar, springt zum Inhalt
- Telefonnummer klickbar (`tel:`)
- `robots.txt` sperrt die Vorschau; `/intern` ohne Zugangsdaten nicht erreichbar
- **axe WCAG 2.0/2.1/2.2 A+AA**: keine schwerwiegenden/kritischen Verstöße auf 9 Schlüsselseiten
  (DE/AR/EN-Start, Kontakt DE/AR, BU, bAV EN, Rechner, Erstinformation)

## Lighthouse 13.6 (lokal gemessen)
| Seite | Gerät | Performance | Accessibility | Best Practices | SEO* | LCP | CLS |
|---|---|---|---|---|---|---|---|
| /de | mobil | 100 | 100 | 100 | 69 | 0,9 s | 0 |
| /de | desktop | 100 | 100 | 100 | 69 | 0,7 s | 0,019 |
| /ar | mobil | 97 | 100 | 100 | 69 | 0,9 s | 0,001 |
| /ar | desktop | 99 | 100 | 100 | 69 | 0,8 s | 0,006 |
| /en | mobil | 99 | 100 | 100 | 69 | 0,9 s | 0,023 |
| /en | desktop | 100 | 100 | 100 | 69 | 0,7 s | 0 |
| /de/kontakt | mobil | 97 | 100 | 100 | 66 | 0,8 s | 0 |
| /de/berufsunfaehigkeitsversicherung | mobil | 99 | 100 | 100 | 66 | 0,9 s | 0 |

\* Einziger SEO-Abzug: „Page is blocked from indexing“ – **gewollt** in der Vorschau.
Im Produktionsmodus entfällt `noindex`. Lokale Messung; auf echtem Hosting erneut messen.

## Visuelle Prüfung
Screenshots in `docs/screenshots/`: 1440 / 1280 / 768 / 390 / 360 px × DE/AR/EN,
ganze Startseiten (Desktop + Smartphone) und Unterseiten. Manuell geprüft und behoben:
- Desktop-Navigation brach um → Hauptnavigation auf 5 Kernpunkte, `nowrap`
- Überlauf bei 390 px durch „Berufsunfähigkeitsversicherung“ → Silbentrennung + `min-width: 0`
- Header zu breit bei 360 px → Telefon-Icon erst ab 640 px (mobile Leiste hat Anrufen)
- Mediävalziffern in Beträgen → Lining-Ziffern
- Arabischer Ortsname in lateinischer Schrift → lokalisiert
- Mobile Kontaktleiste transparent → deckend
- Kontaktseite mobil: Formular jetzt vor den Kontaktkarten

## Nicht getestet / offen
- Tatsächliche E-Mail-Zustellung (kein SMTP-Zugang vorhanden; Produktionsmodus gesperrt)
- Safari/iOS und Firefox (nur Chromium verfügbar) – vor Go-live auf echten Geräten prüfen
- Screenreader-Praxistest (NVDA/VoiceOver) – empfohlen
- 200 %-Zoom: Layout ist fluid/rem-basiert; manueller Test empfohlen
