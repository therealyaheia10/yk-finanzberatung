# Noch fehlende Angaben für die öffentliche Freigabe

`npm run release-check:prod` listet jederzeit den aktuellen Stand.

## Unternehmen (`src/config/company.ts`)
- [ ] Rechtsform und Rechtsträger (z. B. „Kaswan & Ibrahim GbR“) – für Impressum (§ 5 DDG)
- [ ] Zentrale E-Mail-Adresse (Impressumspflicht) und Empfänger für Anfragen
- [ ] Inhaltlich verantwortliche Person, Datenschutz-Kontakt
- [ ] Hosting-Entscheidung (kommerzielle Nutzung erlaubt) + AV-Vertrag
- [ ] Schriftliche Bestätigung: Nennung von ERGO erlaubt / Erlaubnis für eigenen Internetauftritt
- [ ] Domain
- [ ] Optional: Erreichbarkeit/Öffnungszeiten, WhatsApp-Business-Nummer, Social-Media-Profile, Kalender-Link
- [ ] Ist das Erstgespräch kostenfrei? (erst dann „kostenlos“ bewerben)

## Je Berater (`src/config/advisors.ts`) – Pflicht nach § 15 VersVermV
| | Yaheia Kaswan | Ali Ibrahim |
|---|---|---|
| Vermittlerstatus (§ 34d Abs. 1 / Abs. 7 GewO) | offen | offen |
| Registernummer (D-…) | offen | offen |
| Zuständige IHK | offen | offen |
| Vermittelte Versicherer (exakte Firmennamen) | offen | offen |
| Art der Vergütung | offen | offen |
| Beteiligungen ≥ 10 % (oder „keine“) | offen | offen |
| Bestätigte Position/Berufsbezeichnung | offen (neutral angezeigt) | offen (neutral angezeigt) |
| Eigene E-Mail / Telefon | Telefon vorhanden | offen (zentrale Nummer wird gezeigt) |
| Fachliche Schwerpunkte bestätigen | angenommen: alle Kernthemen | angenommen: Altersvorsorge, Kinder, allgemein |
| Gesprochene Beratungssprachen | DE, AR, EN | DE, EN, FR, AR (laut About Me) |

## Freigaben
- [ ] Übersetzungen AR und FR von Muttersprachlern gegengelesen (Ali kann FR/AR prüfen)
- [ ] Produktangaben kurz vor Launch erneut mit ergo.de abgeglichen
- [ ] Definition „qualifizierte Anfrage“ bestätigt

## Neu seit Startseiten-Update (Team-Foto, Ismael Palanga)
| Angabe | Status | Wo eintragen |
|---|---|---|
| Ismael Palanga: Beratungssprachen | **angenommen: nur Deutsch** – bitte bestätigen | `src/config/advisors.ts` → `languages` |
| Ismael Palanga: Schwerpunkte | **angenommen: allgemein** – bitte bestätigen | `src/config/advisors.ts` → `focus` |
| Ismael Palanga: Kurztext / About Me (DE/AR/EN/FR) | neutraler Platzhalter | `src/config/advisors.ts` → `short`, `bio` |
| Ismael Palanga: Registrierung § 34d, IHK | offen | `advisors.ts` / Impressum |
| Echte Kundenbewertungen (mit dokumentierter Einwilligung) | keine – Bereich ist öffentlich ausgeblendet, in der Vorschau Platzhalter | `src/config/company.ts` → `reviews` |
| Fotos für „Fragen, die Sie sich stellen“ (Familie / Unternehmer) | gestaltete Grafik als Ersatz | `public/images/…` + `company.issueImages` |
| WhatsApp-Nummer | +49 179 7216990 (wie Telefon) – bitte bestätigen | `company.whatsapp` |

## Tools (Umbau auf 3 Haupt-Tools)
- [x] Tool 1: „Retirement Reality Check“ (vom Kunden geliefert) – eingebaut als `renten-check`, Rechenlogik 1:1 übernommen, DE/AR/FR übersetzt
- [ ] Tool 2 – folgt
- [ ] Tool 3 – folgt
- [ ] Danach: bisherige 6 Tools entfernen oder ausblenden (bis dahin bleiben sie unter dem neuen Tool sichtbar)
- [ ] Übersetzung des Renten-Checks (AR/FR) von Muttersprachlern gegenlesen
