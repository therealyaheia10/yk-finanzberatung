# Design-System v2 – „Ink & Sand“ (Redesign 21.11.2026)

Maßstab: iberian-finance-consulting.de (dunkler Rahmen, helle Inhaltsflächen, ein warmer Akzent, eine Grotesk-Schrift,
kompakte Listen, Tool-Hub). Eigenständig umgesetzt – keine Texte, Bilder oder Logos übernommen.

## Farben (WCAG 2.2 AA geprüft)
| Token | Hex | Einsatz |
|---|---|---|
| navy-deep | `#0E1822` | Header, Hero, Abschluss, Footer |
| navy / ink | `#132130` | Text, Icon-Kacheln, aktive Zustände (14,7:1 auf Ivory) |
| ivory | `#F4F3EF` | Seitenhintergrund |
| sand | `#EBE8E1` | Alternativflächen, Hinweise |
| paper | `#FFFFFF` | Karten |
| champagne-light | `#D6BE93` | Hauptbutton & Akzentwörter auf dunkel (9,9:1) |
| brass | `#7A5F2E` | Akzenttext auf hell (5,4:1) |
| mist | `#AEB7C1` | Sekundärtext auf dunkel (8,8:1) |

## Typografie
Figtree (variabel) für alles, Überschriften 600 mit enger Laufweite; IBM Plex Sans Arabic für Arabisch.
Fließtext 17 px mobil / 18 px Desktop. Keine Serifen mehr – ruhiger, moderner, besser lesbar auf dem Smartphone.

## Komponenten
- Buttons: Pille, 50 px hoch. **Ein** Hauptbutton-Text überall: „Beratung vereinbaren“ (EN „Book a consultation“, FR „Prendre rendez-vous“, AR „احجز استشارة“). Sekundär: „Anrufen“ / „Rückruf anfordern“.
- Karten: weiß, 16 px Radius, feine Linie, dezenter Hover-Schatten.
- Icon-Kacheln: dunkle Quadrate mit Sand-Icon (Lösungen), helle Quadrate mit Messing-Icon (Sekundäres).
- Tool-Hub: Auswahlliste + ein aktives Tool (statt sechs Rechner untereinander).

## Logo
Globus (Kreis, Meridian, Äquator) mit Sand-Orbit; Wortmarke „INTERNATIONAL“ / „FINANCE CONSULTING“ in Figtree.
Mobil 32 px Bildmarke. Dateien: `src/components/ui/Logo.tsx`, Favicon `src/app/icon.tsx`.

## Startseite (6 Abschnitte)
Hero → Wobei können wir helfen (Privat/Unternehmen) → 6 Lösungen → Team → So einfach geht es → Abschluss/Kontakt → Footer.
Mobil 6,0 Bildschirmhöhen (vorher 21,4), Desktop 4,0 (vorher 12,9).

## v3 – Startseite nach Kundenpräsentation
- **Hero:** Mission als H1 (ohne automatische Silbentrennung), Team-Foto mit Namen, Büro-Adresse, CTA „Kostenlose Beratung vereinbaren“ + WhatsApp (#25d366, Text #0b2e17 für Kontrast).
- **Navigation:** Aufklappmenüs (Hover + Klick + Tastatur/Escape) für Vorsorge & Vermögen, Versicherungen, Unternehmen, Tools; mobil als Akkordeon. Sprachwahl mit Flaggen (Arabisch: „ع“-Badge statt Landesflagge, da die Sprache viele Länder umfasst).
- **Bewegung:** `data-reveal` (sanftes Einblenden beim Scrollen, gestaffelt über `--d`), `.lift` (Karten heben sich), `.zoom-img` (Fotos zoomen langsam), Bewertungs-Laufband (pausiert bei Hover/Fokus). Alles abgeschaltet bei `prefers-reduced-motion`.
- **Header ohne `backdrop-filter`:** ein Blur-Filter würde das fixierte Mobilmenü an den Header binden und unsichtbar machen.
- **Footer:** Telefonnummer entfernt, Karte als 2-Klick-Lösung (Google lädt erst nach Klick).

## v4 – Strategisches Redesign (Vertrauen · Klarheit · Anfrage)
- **Marke:** Logo nach Kundenvorlage (Globus mit goldenem Wachstumspfeil + „IFC“, Inter). Auf dunklem Grund Globus in „Globe blue“.
- **Farben = Logo-Palette:** Navy #14213D (Rahmen, Überschriften), Gold #E3B341 (nur für die Hauptaktion), Globe blue #22396B, Mist #EEF1F5 / #F5F7FA (helle Flächen). Alle Text-Kontraste ≥ 5,8 : 1.
- **Typografie:** Überschriften Source Serif 4 (ruhig, hochwertig), Text Figtree 18 px mobil / 19 px Desktop (altersfreundlich), Logo Inter, Arabisch IBM Plex Sans Arabic.
- **Hauptbutton:** „Beratungsgespräch buchen“ – Gold, 60 px hoch, mit Kalender-Symbol, an jeder wichtigen Stelle; mobil feste Leiste unten, ab Tablet schwebender Button.
- **Startseite (7 Abschnitte):** Hero mit Team-Foto → „Welche Frage beschäftigt Sie?“ (6 Lebensthemen mit Fotos) → 6 Schwerpunkte + Ergänzungen → „Warum Kunden sich wohlfühlen“ → Ansprechpartner → 3 Tools → Abschluss mit 3 Schritten.
- **Texte:** kurz, aus Sicht der Berater („wir“), keine Versprechen, keine erfundenen Kundenzitate. Arabisch in einfachem Hocharabisch.
- **Bewertungen:** Bereich entfernt, bis echte, freigegebene Bewertungen vorliegen.
- **Bilder:** thematisch passende Unsplash-Fotos (siehe docs/BILDQUELLEN.md).

## v5 – Kundenpräsentation 2 + strategische Erweiterung
- **Farben:** auf Kundenwunsch wieder „Graphit & Gold“ (v2/v3-Palette). Hauptaktion „Kostenlose Beratung buchen“ in **Dunkelgrün #1a7d50** (weißer Text 5,1 : 1, auf Graphit 3,6 : 1). WhatsApp-Buttons im Stil der Nebenbuttons, nur das Logo grün.
- **Logo:** IFC-Logo nach Kundenvorlage (Globus + goldener Pfeil). Unterzeile zwischen 1280 und 1440 px ausgeblendet (Platz im Menü).
- **Startseite:** Marke + „Unsere Mission“ als Titel → „Finanzielle Sorgen …“ (rote Überschrift, klickbare Fragen) → 3 Rechner eingebettet → Werte → Team (Schritte mit Verbindungslinie, grüner Haken, „Beratung buchen mit … / egal wer“) → nächster Schritt mit großer Karte.
- **Menü:** „Über uns“ als Aufklappmenü mit allen aktiven Beratern (wächst automatisch mit advisors.ts).
- **Dashboard:** Berater-Zugänge (ADVISOR_ACCESS) sehen nur eigene Anfragen; Admin sieht Auswertung pro Berater.
