# Freigabe-Checkliste vor Veröffentlichung

Die Website kann technisch erst im Produktionsmodus gebaut werden, wenn
`npm run release-check` mit `SITE_MODE=production` keine offenen Punkte meldet
**und** alle Einträge in `release-approval.json` auf `true` stehen.

> Diese Checkliste ersetzt keine Rechtsberatung. Rechtstexte (Impressum, Datenschutz,
> Erstinformation) sind Vorlagen und müssen durch eine fachkundige Person geprüft werden.

## A. Vermittlerrecht
- [ ] Status nach § 34d GewO geklärt und korrekt bezeichnet (kein „unabhängiger Makler“, wenn nicht zutreffend)
- [ ] Je Berater: Status, Registernummer, IHK, vertretene Versicherer, Vergütung, Beteiligungen in `src/config/advisors.ts`
- [ ] Erstinformation (§ 15 VersVermV): Name, Anschrift, Status, Register, Beteiligungen, Vergütung, Schlichtungsstellen
- [ ] **Übergabe der Erstinformation in Textform beim ersten Geschäftskontakt** organisatorisch geregelt
      (z. B. PDF per E-Mail nach Anfrage, Ausdruck im Termin). Ein Footer-Link allein genügt nicht.
- [ ] § 16 VersVermV geprüft
- [ ] Beratungs- und Dokumentationspflichten (§§ 61, 62 VVG) im Ablauf berücksichtigt
- [ ] Schriftliche ERGO-Erlaubnis für eigenen Internetauftritt geprüft (`insurerWebsitePermissionVerified`)
- [ ] Marken: ERGO/DKV-Nennung freigegeben (`partnerMentionApproved`), Logos nur mit Freigabe (`partnerLogoApproved`)
- [ ] Produkt- und Risikoträgerangaben gegen aktuelle Unterlagen geprüft (`PRODUCT-SOURCES.md`)

## B. Impressum & Datenschutz
- [ ] Impressum nach § 5 DDG vollständig (Name, Anschrift, Kontakt inkl. E-Mail, Register, Behörde, Berufsrecht)
- [ ] Datenschutzerklärung an tatsächliche Dienste angepasst (Hosting, E-Mail-Provider, ggf. Analyse)
- [ ] AV-Verträge mit Hosting und E-Mail-Anbieter
- [ ] Keine Cookies/Tracker ohne Einwilligung (aktuell: keine Cookies, cookielose Zählung optional)
- [ ] Löschkonzept für Anfragen (z. B. 6 Monate ohne Vertragsanbahnung)
- [ ] Barrierefreiheit: Prüfung, ob das BFSG auf das Angebot anwendbar ist (Kleinstunternehmen-Ausnahme beachten)

## C. Inhalte
- [ ] Alle Personendaten echt und belegt, `previewIdentity: false`
- [ ] Echte Portraits mit Nutzungsrecht
- [ ] Übersetzungen AR/EN/FR von geeigneter Person fachlich geprüft
- [ ] Keine Garantie-, Rendite-, Steuer- oder Ersparnisversprechen
- [ ] „Kostenloses Erstgespräch“ nur, wenn bestätigt (`freeInitialConsultation`)
- [ ] Bewertungen nur echt und mit dokumentierter Einwilligung

## D. Technik
- [ ] `SITE_URL` gesetzt, HTTPS aktiv
- [ ] SMTP konfiguriert, `LEADS_ENABLED=true`, Testanfrage kommt im Postfach an
- [ ] `ADMIN_PASSWORD` stark, Dashboard nur für den Auftraggeber
- [ ] `npm run test:e2e` grün, Lighthouse dokumentiert (`QUALITY-ASSURANCE.md`)
- [ ] Google Search Console (optional) nach Go-live
- [ ] Hosting erlaubt kommerzielle Nutzung

## E. Testphase
- [ ] Definition „qualifizierte Anfrage“ schriftlich bestätigt
- [ ] `TRIAL_START` am Tag der Veröffentlichung gesetzt
- [ ] Lead-Tabelle / Dashboard eingerichtet

## Stand 24.11.2026 – Website veröffentlicht (ifc-consulting.de)
Auf ausdrücklichen Wunsch des Inhabers **ohne** die noch fehlenden Pflichtangaben veröffentlicht
(Freigabe dokumentiert in `src/config/launch.ts`). Offene Punkte: `npm run release-check:prod`.
Bis zur Ergänzung zeigen Impressum/Erstinformation an fehlenden Stellen „–“.
Kontaktformular: ohne SMTP-Zugang (LEADS_ENABLED, SMTP_*) bietet es automatisch den Versand per WhatsApp an.
Zurück in die passwortgeschützte Vorschau: in Vercel `SITE_MODE=preview` setzen und neu veröffentlichen.
