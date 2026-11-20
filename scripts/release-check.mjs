#!/usr/bin/env node
/**
 * RELEASE-CHECK – läuft automatisch vor jedem `npm run build`.
 * Im Vorschaumodus (Standard) nur Hinweise. Mit SITE_MODE=production bricht
 * der Build ab, solange Pflichtangaben, Freigaben oder Vorschaudaten offen sind.
 */
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(path.join(root, "src/config/advisor.ts"), "utf8");
const mode = process.env.SITE_MODE === "production" ? "production" : "preview";

const get = (re) => { const m = src.match(re); return m ? m[1] : undefined; };
const isNullField = (name) => new RegExp(`\\b${name}:\\s*null\\b`).test(src);
const isFalse = (name) => new RegExp(`\\b${name}:\\s*false\\b`).test(src);

const problems = [];
const need = (cond, msg) => { if (!cond) problems.push(msg); };

need(!/previewIdentity:\s*true/.test(src), "previewIdentity ist true – Vorschaudaten (z. B. Yaheia Kaswan) dürfen nicht veröffentlicht werden.");
need(!isNullField("intermediaryStatus"), "Vermittlerstatus (intermediaryStatus) fehlt.");
need(!isNullField("registerNumber"), "Vermittlerregisternummer fehlt.");
need(!isNullField("supervisoryAuthority"), "Zuständige IHK/Erlaubnisbehörde fehlt.");
need(!isNullField("email"), "E-Mail-Adresse fehlt (Impressumspflicht § 5 DDG).");
need(!isNullField("postalCode"), "Postleitzahl des Büros fehlt.");
need(!isNullField("legalName"), "Rechtlicher Name/Firma fehlt.");
need(!isNullField("address"), "Ladungsfähige Anschrift fehlt.");
need(!isNullField("responsiblePerson"), "Inhaltlich Verantwortliche Person fehlt.");
need(!isNullField("privacyContact"), "Datenschutz-Kontakt fehlt.");
need(!isNullField("hostingProvider"), "Hosting-Anbieter (Datenschutzerklärung) fehlt.");
need(!isNullField("remuneration"), "Angabe zur Vergütung (Erstinformation) fehlt.");
need(!isNullField("shareholdings"), "Angabe zu Beteiligungen (Erstinformation) fehlt – ggf. „Keine“ eintragen.");
need(!isNullField("leadRecipientEmail") || !!process.env.LEAD_TO, "Empfänger für Kundenanfragen fehlt (leadRecipientEmail oder LEAD_TO).");
need(!/insurers:\s*\[\s*(\/\/[^\n]*\n\s*)*\]/.test(src), "Liste der vermittelten Versicherer (insurers) ist leer.");
need(!isFalse("firstInfoProcessConfirmed"), "Prozess zur Übergabe der Erstinformation in Textform nicht bestätigt.");
need(!isFalse("insurerWebsitePermissionVerified"), "Schriftliche Erlaubnis des Versicherers für den Internetauftritt nicht geprüft.");
need(!/siteUrl:\s*"https:\/\/example\.invalid"/.test(src) || !!process.env.SITE_URL, "Öffentliche Domain (siteUrl / SITE_URL) fehlt.");

// Freigabe-Checkliste
const checklistPath = path.join(root, "release-approval.json");
if (existsSync(checklistPath)) {
  const c = JSON.parse(readFileSync(checklistPath, "utf8"));
  for (const [k, v] of Object.entries(c)) if (v !== true) problems.push(`Freigabe ausstehend: ${k}`);
} else problems.push("release-approval.json fehlt.");

if (mode === "production") {
  need(process.env.LEADS_ENABLED === "true", "LEADS_ENABLED=true nicht gesetzt (Formularzustellung).");
  need(!!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS, "SMTP-Zugangsdaten fehlen (SMTP_HOST/USER/PASS).");
}

const head = `\n[release-check] Modus: ${mode.toUpperCase()}`;
if (problems.length === 0) {
  console.log(`${head} – alle Prüfpunkte erfüllt.\n`);
  process.exit(0);
}
if (mode === "production") {
  console.error(`${head} – VERÖFFENTLICHUNG BLOCKIERT (${problems.length} offene Punkte):`);
  for (const p of problems) console.error("  ✗ " + p);
  console.error("\nSiehe LEGAL-RELEASE-CHECKLIST.md und docs/KUNDENDATEN-WECHSEL.md\n");
  process.exit(1);
}
console.log(`${head} – interne Vorschau. ${problems.length} Punkte sind vor der Veröffentlichung offen (siehe LEGAL-RELEASE-CHECKLIST.md).\n`);
