# Produkt- und Rechtsquellen

**Status: verifiziert am 21.11.2026** an den offiziellen Seiten (Abruf aus der Entwicklungsumgebung).
Die verwendeten Fakten stehen zentral in `src/config/products.ts` und erscheinen auf jeder Produktseite
im Block „Anbieter- und Produktinformationen“ mit Quelle und Datum. **Vor dem Launch erneut prüfen.**

| Thema | Quelle | Verwendete Fakten | Risikoträger |
|---|---|---|---|
| Altersvorsorge | https://www.ergo.de/de/Produkte/Rentenversicherung | Rentenversicherungen ab 25 €/Monat; Index-Variante 100 % Beitragssicherung ab 12 J. Laufzeit mit Höchststandgarantie; Basis-Rente (Rürup) ab 25 €, steuerlich absetzbar; Altersvorsorgedepot ab 2027 | ERGO Vorsorge Lebensversicherung AG |
| Kidspolicen | https://www.ergo.de/de/Produkte/Bausparen-Finanzierung/Kidspolicen | Varianten Index, Balance, Dynamik, Chance, Zukunfts-Chance; ab 25 €/Monat oder 2.500 € Einmalbeitrag; Zuzahlungen ab 100 €, Entnahmen ab 500 € | ERGO Vorsorge Lebensversicherung AG |
| BU | https://www.ergo.de/de/Produkte/Berufsunfaehigkeitsversicherung | Tarife Best / Best Plus; volle Rente ab 50 % BU; Best Plus mit Online-Programmen zur mentalen Gesundheit | ERGO Vorsorge Lebensversicherung AG |
| PKV | https://www.ergo.de/de/Produkte/Krankenversicherung/Krankenvollversicherung | DKV BestMed Basis (BME), BestMed Komfort (BMK/BMKD), PremiumMed (PMN); vertraglich garantierte Leistungen; Beitragsrückerstattung möglich | DKV Deutsche Krankenversicherung AG |
| bAV | https://www.ergo.de/de/Geschaeftskunden-Produkte/Betriebliche-Altersversorgung | Betriebs-Rente Index (100 % Beitragsgarantie ab 12 J.), Dynamik (Garantie 60–100 %), Dynamik Comfort (80/100 %); Direktversicherung, Unterstützungskasse, Direktzusage, Pensionsfonds; förderfähig nach § 3 Nr. 63 und § 100 EStG | ERGO Vorsorge Lebensversicherung AG / ERGO Pensionsfonds AG |
| bKV | https://www.ergo.de/de/Geschaeftskunden-Produkte/Gewerbliche-Krankenversicherung/Betriebliche-Krankenversicherung | arbeitgeber- oder arbeitnehmerfinanziert; Budgetbausteine 300/600/900/1.200 € p. a.; arbeitgeberfinanziert ohne Gesundheitsprüfung und Wartezeiten; Fortführung ohne Gesundheitsprüfung | DKV Deutsche Krankenversicherung AG |
| Erstinformation | https://www.gesetze-im-internet.de/versvermv_2018/__15.html | 12 Pflichtangaben je Vermittler (Name, Anschrift, Status, Beratung, Vergütung, Register, Beteiligungen, Schlichtung) – auf der Seite „Erstinformation“ je Berater umgesetzt | – |

## Nicht verwendet (bewusst)
- Beispielbeiträge von ergo.de (hängen von Alter, Beruf, Gesundheit ab).
- Grenzwerte (JAEG, Beitragsbemessungsgrenzen) – ändern sich jährlich; werden im Gespräch genannt.
- Rechtsschutz, Schutzbrief, Pflege, Grundfähigkeit: allgemeine Erklärung ohne Tarifnamen (keine Quellprüfung erfolgt).

## Rechner – Annahmen (auf der Website ausgewiesen)
Rentenlücke: Rente mit 67, Inflation 2 %, Ziel 80 % des Nettos, Voreinstellung gesetzl. Rente 45 % des Nettos (anpassbar).
Kinder-Sparziel: Szenarien 0/2/5 % vor Kosten. Arbeitskraft: Netto × 12 × Jahre bis 67. Inflation: konstanter Satz.
Versicherungs-Check: Faustregel nach Lebenssituation, keine Beratung.
