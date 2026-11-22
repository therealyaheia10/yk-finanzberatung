# Qualitätssicherung – gemessene Ergebnisse (Redesign 21.11.2026)

**Redesign:** 108/108 Tests bestanden (inkl. neuer Tests: Startseite mobil ≤ 7 Bildschirmhöhen, erster Bildschirm zeigt Headline/Termin-Button/Sprachwahl, Rückruf-Direkteinstieg, Tool-Hub). Kein Überlauf bei 360 und 1440 px (76/76 Seiten). Lighthouse Startseite: Desktop 100/100/100 (Perf./A11y/Best Practices), mobil Performance 86–99 (schwankend), A11y 100.

---


Lokaler Produktionsbuild im Vorschaumodus, Chromium.

## Automatisierte Tests: 105 / 105 bestanden
`npm run test:e2e` (Playwright + axe-core)
- Alle **76 Seiten** (17 Seitentypen + 2 Beraterseiten × DE/AR/EN/FR): Status 200, `lang`/`dir`, eine H1, Titel, Canonical, hreflang (4 Sprachen), `noindex` in der Vorschau, **kein horizontales Scrollen bei 360 px**
- Sprachwechsel behält die Unterseite – auch auf Beraterseiten
- Alle internen Links aus den vier Startseiten erreichbar
- Mobile Navigation (öffnen, Escape, Navigation)
- Anliegen-Finder → Formular mit vorausgewähltem Thema
- Rechner reagiert auf Tastatur
- Formular in allen 4 Sprachen: Validierung, ehrlich gekennzeichneter Testbetrieb
- **Weg B:** Anfrage auf Alis Seite → Bestätigung nennt „Ali Ibrahim“
- **Weg A:** Anfrage auf Französisch → automatisch Ali Ibrahim zugeordnet
- Spam-Schutz (ungültige Daten, zu schnelle Bots), Rate-Limit (greift nachweislich)
- Skip-Link, klickbare Telefonnummer, `robots.txt` gesperrt, `/intern` geschützt
- **axe WCAG 2.2 AA:** keine schwerwiegenden Verstöße auf 12 Schlüsselseiten

Zusätzlich `node scripts/check-overflow.mjs 1440` und `… 360`: 76/76 Seiten ohne Überlauf.

## Lighthouse 13.6
| Seite | Gerät | Perf. | A11y | Best Pr. | SEO* |
|---|---|---|---|---|---|
| /de | Desktop | 100 | 100 | 100 | 69 |
| /de | Mobil | 86–95 (Schwankung zwischen identischen Läufen) | 100 | 100 | 69 |
| /ar | Desktop / Mobil | 99 / 85 | 100 | 100 | 69 |
| /fr | Desktop / Mobil | 100 / 95 | 100 | 100 | 69 |
| /en | Mobil | 96 | 100 | 100 | 69 |
| /de/team/ali-ibrahim | Desktop / Mobil | 100 / 95 | 100 | 100 | 69 |
| /de/orientierung | Mobil | 97 | 100 | 100 | 66 |
| /de/altersvorsorge | Mobil | 90 | 100 | 100 | 66 |

\* Einziger SEO-Abzug: gewollte Indexsperre der Vorschau. Mobile LCP schwankt in der gedrosselten Messumgebung zwischen 0,9 s und 3,4 s; Blocking Time ca. 200–280 ms durch die interaktiven Elemente.

## Visuelle Prüfung & behobene Fehler
Screenshots: `docs/screenshots/` (5 Breiten × 4 Sprachen + Unterseiten).
Behoben: Überlauf der Zusatz-Kacheln, Adresskarte über Portrait, Umbruch der mobilen Leiste (FR), schmale Einzelkarte,
Beschriftung des Sprachmenüs (WCAG 2.5.3), Überschriftenhierarchie der Tool-Seite, Lazy-Loading in Screenshots.

## Nicht getestet
Echte E-Mail-Zustellung (kein SMTP), Safari/iOS, Firefox, Screenreader-Praxistest.

## Prüflauf Startseiten-Update v3 (22.11.2026)
- Playwright: 108/108 Tests grün (inkl. axe auf 12 Seiten, Mobilmenü, Weg A/B der Anfrage-Zuordnung).
- Kein horizontaler Überlauf bei 360 px und 1440 px (80 Seiten).
- Mobile Startseite: DE 6,6 · AR 6,4 · EN 6,5 · FR 6,6 Bildschirmhöhen (Ziel ≤ 7). Desktop ≈ 4,5.
- Gefundener und behobener Fehler: Mobilmenü war durch `backdrop-blur` im Header unsichtbar.
- Lighthouse in diesem Lauf nicht ausgeführt.
