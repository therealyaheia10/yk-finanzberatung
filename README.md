# International Finance Consulting – Website · KASWAN Webdesign

Mehrsprachige Beratungsmarke (Deutsch · العربية · English · Français) – Team Yaheia Kaswan & Ali Ibrahim, Sybelstraße 21, 40239 Düsseldorf.
Next.js 16 · TypeScript · Tailwind CSS 4 · Zod · Lucide · Playwright + axe-core.

> **Status:** Vorschau (PREVIEW). Die Produktionsversion lässt sich erst bauen, wenn die
> gesetzlichen Pflichtangaben vorliegen (`npm run release-check:prod`, `CLIENT-DATA-REQUIRED.md`).

---

## Schnellstart (lokal, für die Präsentation)

Voraussetzung: Node.js ≥ 20.9 (getestet mit 22).

```bash
npm install
```

```bash
npm run build
```

```bash
npm start
```

Dann im Browser öffnen: <http://localhost:3000> (leitet je nach Browsersprache auf `/de`, `/ar` oder `/en`).

Entwicklung mit Live-Reload:

```bash
npm run dev
```

Auf `localhost` ist kein Passwort nötig. Auf einem Server verlangt die Vorschau
`PREVIEW_PASSWORD` (Basic Auth) – ohne gesetztes Passwort bleibt sie gesperrt.

## Daten pflegen
- **Unternehmen** (Marke, Adresse, Telefon, Recht): `src/config/company.ts`
- **Berater** (beliebig viele, je eigene Seite): `src/config/advisors.ts` → Anleitung `docs/BERATER-HINZUFUEGEN.md`
- **Verifizierte Produktfakten**: `src/config/products.ts`
- **Texte** (4 Sprachen, gleiche Struktur, typgeprüft): `src/content/{de,ar,en,fr}.ts`

Marketing-Materialien neu erzeugen:

```bash
MARKETING_URL=https://ihre-domain.de npm run marketing
```

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Release-Check + Produktionsbuild |
| `npm start` | Gebaute Website starten (Port 3000) |
| `npm run lint` | TypeScript-Prüfung |
| `npm run release-check:prod` | Offene Pflichtpunkte vor Veröffentlichung anzeigen |
| `npm run test:e2e` | 105 Playwright-Tests inkl. axe WCAG 2.2 AA (startet Server automatisch, vorher `npm run build`) |
| `npm run screenshots` | Präsentations-Screenshots → `docs/screenshots/` (Server muss laufen) |
| `npm run marketing` | Social-Grafiken, QR-Code, vCard, Visitenkarte, Signatur → `marketing/` |

Hinweis für Playwright auf eigenen Rechnern: einmalig `npx playwright install chromium`.

## Betriebsmodi

| | PREVIEW (Standard) | PRODUCTION (`SITE_MODE=production`) |
|---|---|---|
| Daten | fehlende Angaben erlaubt | alle Pflichtangaben vorhanden |
| Platzhalter | sichtbar markiert („⚠ Fehlt: …“) | Build bricht ab, wenn Pflichtangaben fehlen |
| Formular | Testbetrieb, **kein Versand**, deutlich gekennzeichnet | echte Zustellung per SMTP, sonst ehrliche Fehlermeldung + Telefon |
| Indexierung | `noindex`, `robots.txt: Disallow: /`, leere Sitemap | Sitemap, hreflang, Canonicals |
| Zugriff | Basic Auth (außer localhost) | öffentlich |

Absicherung: Der Produktionsbuild bricht ab, solange Pflichtangaben fehlen oder `release-approval.json`
nicht vollständig `true` ist. Ohne `PREVIEW_PASSWORD` zeigt ein Server im Vorschaumodus nur „gesperrt“.

## Projektstruktur

```
src/
  config/company.ts          ← Unternehmensdaten
  config/advisors.ts         ← Berater (+ automatische Zuordnung)
  config/products.ts         ← verifizierte Produktfakten
  content/{de,ar,en,fr}.ts   ← Seitentexte
  lib/                       ← i18n/Routing, Modus, Zod-Schema, Speicher, Mailer, Rate-Limit
  components/                ← Layout, Startseite, Leistungsseiten, Rechner, Formular
  app/[locale]/[[...slug]]   ← alle Seiten inkl. /team/<slug> (76 statisch vorgerendert)
  app/api/lead               ← Anfrage-Backend (Zod, Honeypot, Zeitfalle, Rate-Limit)
  app/intern                 ← geschütztes Lead-Dashboard
  proxy.ts                   ← Zugriffsschutz + Sprachweiterleitung
scripts/                     ← release-check, screenshots, marketing-assets
tests/                       ← Playwright + axe
marketing/                   ← Social-Grafiken, QR, vCard, Signatur, Lead-Tabelle, Texte
docs/                        ← Kundendaten-Wechsel, Fotoanleitung, Screenshots
```

## Deployment

1. Alle Punkte in `LEGAL-RELEASE-CHECKLIST.md` erledigen, `release-approval.json` auf `true`.
2. `.env` aus `.env.example` anlegen (SMTP, `LEADS_ENABLED=true`, `SITE_URL`, `ADMIN_PASSWORD`).
3. `SITE_MODE=production npm run build` – bricht ab, solange etwas fehlt.
4. Hosting (Entscheidung durch den Auftraggeber, Nutzungsbedingungen vorher prüfen):
   - **Empfohlen: kleiner EU-Server (VPS)** mit Node.js: `npm ci && npm run build && npm start`
     hinter einem Reverse Proxy mit HTTPS. Vorteil: Datenstandort EU, Dashboard-Speicher bleibt erhalten.
     Laufende Kosten → nur nach ausdrücklicher Freigabe.
   - **Vercel:** Der kostenlose Hobby-Tarif ist laut Vercel nur für nicht-kommerzielle Nutzung
     gedacht. Für diese Kundenseite wäre ein kostenpflichtiger Tarif nötig (Freigabe erforderlich).
     Auf Serverless-Hosting `LEAD_STORE=none` setzen und die Excel-Vorlage nutzen.
5. Nach dem Go-live: Testanfrage senden, Eingang prüfen, `TRIAL_START` setzen.

## Dokumentation

`PROJECT-BRIEF.md` · `DESIGN-SYSTEM.md` · `COMPETITOR-RESEARCH.md` · `PRODUCT-SOURCES.md` ·
`CLIENT-DATA-REQUIRED.md` · `LEGAL-RELEASE-CHECKLIST.md` · `14-DAY-ACQUISITION-PLAN.md` ·
`QUALITY-ASSURANCE.md` · `docs/BERATER-HINZUFUEGEN.md` · `docs/FOTOANLEITUNG.md` · `marketing/TEXTE.md`
