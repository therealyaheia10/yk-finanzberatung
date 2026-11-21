# Design-System

## Markenidee
Ruhige, redaktionelle Eleganz: Privatbank-Anmutung ohne Luxus-Klischees. Viel Weißraum,
feine Messinglinien, große serifenbetonte Überschriften, gut lesbarer Fließtext.

## Farben (WCAG-geprüft)
| Token | Hex | Einsatz | Kontrast |
|---|---|---|---|
| navy | `#102A43` | Text, Buttons, dunkle Flächen | 13,4:1 auf Ivory |
| navy-deep | `#0B1E31` | Vorschau-Leiste, Akzente | – |
| ivory | `#F7F5EF` | Seitenhintergrund | – |
| sand | `#EFEADF` | Wechselflächen | – |
| champagne | `#B49A68` | **nur Dekor** auf hell (Linien, Rahmen); Text nur auf Navy | 5,4:1 auf Navy |
| champagne-light | `#C9B286` | Akzent-Text & Gold-Button auf Navy | 7,1:1 auf Navy |
| brass | `#7A5F2E` | Akzent-Text auf hell (Labels, kursive Headline) | 5,5:1 auf Ivory |
| muted | `#4A5563` | Sekundärtext | 6,95:1 auf Ivory |
| mist | `#AAB6C3` | Sekundärtext auf Navy | 7,1:1 |

Anpassung gegenüber Briefing: Champagne `#B49A68` erreicht auf Ivory nur 2,5:1 und wird deshalb
nie für Text auf hellem Grund genutzt – dafür das dunklere **Brass**.

## Typografie (lokal gehostet, SIL Open Font License)
- **Cormorant Garamond** 500/600 + Kursiv – lateinische Überschriften (Lining-Ziffern erzwungen)
- **Manrope** (variabel) – Fließtext, UI
- **IBM Plex Sans Arabic** 400–700 – gesamte arabische Version (Überschriften 600, größere Zeilenhöhe 1,9)
- Fließtext 18 px (mobil) / 19 px (Desktop), Zeilenhöhe 1,7; Arabisch 19 px
- Deutsche Silbentrennung für lange Komposita (`hyphens: auto`)

## Komponenten
Buttons (52 px hoch, Pille): Primary Navy · Gold (auf Navy) · Ghost · Ghost-Light.
Alle Bedienelemente ≥ 44 × 44 px. Fokus: 3 px Champagne-Rahmen, immer sichtbar.
Karten mit 8 px Radius, Haarlinien `#DDD5C4`, keine Glaseffekte.
Nummerierte Editorial-Listen (01–05) statt Kartenraster.

## Bewegung
Nur ein dezentes Einblenden im Hero (0,9 s). Bei `prefers-reduced-motion` komplett aus.
Keine Autoplay-Animationen, keine Parallax-Hintergründe.

## RTL
Logische CSS-Eigenschaften (`ps-`, `ms-`, `start-`), Pfeile werden gespiegelt (`rtl:rotate-180`),
Telefonnummern und Beträge als isolierte LTR-Inseln (`.ltr-nums`), westliche Ziffern auch im Arabischen.

## Logo
Bildmarke: minimalistischer Globus aus feinen Navy-Linien mit einem Messing-Bogen (Begleitung/Verbindung) –
international, ruhig, ohne Flaggen und unabhängig von einzelnen Beratern. Wortmarke zweizeilig:
„INTERNATIONAL“ (Manrope, gesperrt, Messing) über „Finance Consulting“ (Cormorant Garamond). Komponente: `src/components/ui/Logo.tsx`; Favicon: `src/app/icon.tsx`.
