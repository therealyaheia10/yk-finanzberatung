# 14-Tage-Plan: Besucher → Anfragen (Ziel: 3 qualifizierte Anfragen)

Eine neue Website bringt nicht von allein Besucher. Dieser Plan nutzt nur kostenlose,
zulässige Wege – **keine Kaltakquise gegenüber Verbrauchern, keine ungefragten Massennachrichten**
(§ 7 UWG). Nachrichten nur an Menschen, die dem Kontakt zugestimmt haben bzw. bestehende Kontakte
mit passender Einwilligung.

Alle Materialien: `marketing/` (Grafiken in `png/`, Texte in `TEXTE.md`, QR, vCard, Signatur).

## Vor Tag 1 (Setup, 1–2 Stunden)
- QR-Code erzeugen: `MARKETING_URL=https://… npm run marketing`
- E-Mail-Signatur einrichten (`marketing/email-signatur.html`)
- Website-Link in alle Profile: WhatsApp Business, Instagram, LinkedIn, Facebook, Google-Unternehmensprofil (falls vorhanden/freigegeben)
- QR-Code auf Visitenkarte/Aufsteller im Büro und am Schreibtisch
- Lead-Tabelle `marketing/lead-tracking.xlsx` öffnen, Startdatum eintragen

## Plan
| Tag | Kanal | Maßnahme | Material |
|---|---|---|---|
| 1 | WhatsApp-Status | „Neue Website“ (DE) | whatsapp-status-1-de |
| 1 | Persönlich | Website in **jedem** Beratungsgespräch zeigen, Rechner gemeinsam ausprobieren | Tablet/Smartphone |
| 2 | Instagram/Facebook | Vorstellungs-Post DE | post-1-de-vorstellung + Text DE-1 |
| 2 | LinkedIn | Persönliche Vorstellung, Link zur Website | Text DE-1/EN-1 |
| 3 | WhatsApp-Status | Arabische Version | whatsapp-status-2-ar |
| 4 | Instagram-Story | Rentenlücke-Rechner (Link-Sticker) | instagram-story-1-de |
| 5 | Bestandskunden (mit Einwilligung) | Persönliche Nachricht: „Ich habe jetzt eine Website, auf der Sie … Wenn Sie jemanden kennen …“ – **Empfehlung** statt Werbung | Text „Empfehlung“ |
| 6 | Post | Arabisch: Beratung in der eigenen Sprache | post-2-ar-sprachen + Text AR-2 |
| 7 | **Zwischenauswertung** | Besuche, Klicks, Anfragen; welche Sprache/Seite läuft? | Dashboard / Excel |
| 8 | WhatsApp-Status | Englisch für Internationale | whatsapp-status-3-en |
| 9 | Instagram-Story | Kinder-Vorsorge (AR) | instagram-story-2-ar |
| 10 | LinkedIn/Unternehmer-Netzwerk | bKV/bAV für Arbeitgeber | instagram-story-3-en / Text DE-3 |
| 11 | Post | PKV ehrlich erklärt (EN) | post-3-en-pkv + Text EN-3 |
| 12 | Communities | Beitrag in Vereinen/Gemeinde-/Elterngruppen **nur wo Werbung erlaubt** und mit Einverständnis der Admins | Text AR-1 / DE-2 |
| 13 | Persönlich | Nachfassen bei allen Anfragen, Termine bestätigen | Dashboard |
| 14 | **Abschluss** | Auswertung mit Auftraggeber: Besuche → Klicks → Anfragen → qualifiziert → Termine | Excel „Übersicht“ |

## Messkonzept (datenschutzfreundlich)
| Stufe | Quelle | Personenbezug |
|---|---|---|
| Website-Besuche | cookielose Zählung (`ANALYTICS=first-party`) oder Hosting-Statistik | nein |
| Besuchte Leistungsbereiche, Sprache | Seitenaufrufe je Pfad (`/de/…`, `/ar/…`) | nein |
| Klicks auf Termin/Anruf | `data-track`-Zähler (cta_*, call_*) | nein |
| Begonnene Anfragen | Zähler `form_start` | nein |
| Übermittelte Anfragen | Zähler `form_success` + E-Mail-Eingang | nur im Postfach/Dashboard |
| Qualifiziert / Termin / Neukunde | **manuell** durch den Berater im Dashboard oder in der Excel-Tabelle | ja – geschützt |

Wichtig in der Kommunikation: Besuch ≠ Klick ≠ Anfrage ≠ qualifizierter Lead ≠ Vertrag.
Ein Vertragsabschluss ist **keine** Voraussetzung für eine qualifizierte Anfrage.

## Hebel, falls nach Tag 7 < 1 Anfrage
1. Mehr persönliche Empfehlungen (Bestandskunden, Familie, Freunde) – stärkster Kanal.
2. Arabischsprachige Community gezielter (Status, Gruppen mit Erlaubnis).
3. Rechner als Gesprächsanlass nutzen („Haben Sie Ihre Rentenlücke schon mal gerechnet?“).
4. Unternehmer im eigenen Netzwerk direkt ansprechen (B2B, bestehende Kontakte).
