# Berater ergänzen oder ändern (z. B. Alis Daten)

Alle Beraterdaten stehen in **`src/config/advisors.ts`** – ein Eintrag pro Person.
Daraus entstehen automatisch: Teamkarte auf Start- und Über-uns-Seite, eigene Seite
`/<sprache>/team/<slug>` in allen vier Sprachen, Eintrag in der Erstinformation,
Zuordnung von Anfragen, Filter im Lead-Dashboard, Footer-Link, strukturierte Daten.

## Alis Informationen ergänzen (5 Minuten)
1. Neues Foto nach `public/images/team/ali-ibrahim.webp` (Hochformat, min. 1000 px) – oder Pfad bei `portrait` anpassen.
2. In `advisors.ts` beim Eintrag `slug: "ali-ibrahim"` ergänzen:
   - `position` – bestätigte Berufsbezeichnung (4 Sprachen), sonst bleibt „Berater bei International Finance Consulting“
   - `phone`, `phoneDisplay`, `email`, optional `bookingUrl` (Kalender-Link)
   - `focus` – Fachgebiete; steuert auch, welche Anfragen Ali automatisch bekommt
   - `background` – bestätigte berufliche Stationen
   - Vermittlerangaben: `intermediaryStatus`, `registerNumber`, `supervisoryAuthority`, `insurers`, `shareholdings`, `remuneration`
3. Prüfen und bauen:
```bash
npm run release-check
```
```bash
npm run build && npm start
```

## Neuen Berater hinzufügen
Einen bestehenden Eintrag kopieren, `id`, `slug`, `order` und alle Texte anpassen, `active: true`.
Sprachen (`languages`) nur eintragen, wenn die Beratung darin tatsächlich angeboten wird.
Berater vorübergehend ausblenden: `active: false`.

## So funktioniert die Zuordnung von Anfragen
- **Weg B:** Anfrage über eine Beraterseite → geht direkt an diesen Berater.
- **Weg A:** allgemeine Anfrage → Berater, der die gewählte **Sprache** spricht **und** das **Thema** in `focus` hat;
  sonst nur nach Sprache; bei mehreren Kandidaten abwechselnd. Beispiel: Französisch → Ali (einziger französischsprachiger Berater).
- E-Mail geht an die `email` des Beraters (falls hinterlegt), die zentrale Adresse (`LEAD_TO`) erhält eine Kopie.

## Unternehmensdaten
Marke, Adresse, zentrale Telefonnummer, Rechtsangaben: **`src/config/company.ts`**.
Verifizierte Produktangaben: **`src/config/products.ts`** (Quelle + Abrufdatum).
