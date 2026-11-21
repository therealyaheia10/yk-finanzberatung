#!/usr/bin/env node
/**
 * RELEASE-CHECK – läuft vor jedem `npm run build`.
 * PREVIEW (Standard): nur Hinweise. SITE_MODE=production: Build bricht ab,
 * solange gesetzliche Pflichtangaben (§ 5 DDG, § 15 VersVermV) oder Freigaben fehlen.
 */
import { readFileSync, existsSync } from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath, pathToFileURL } from "url";

if (!process.execArgv.includes("--experimental-strip-types")) {
  const r = spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", fileURLToPath(import.meta.url), ...process.argv.slice(2)], { stdio: "inherit", env: process.env });
  process.exit(r.status ?? 1);
}
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const { company } = await import(pathToFileURL(path.join(root, "src/config/company.ts")).href);
const { activeAdvisors } = await import(pathToFileURL(path.join(root, "src/config/advisors.ts")).href);
const mode = process.env.SITE_MODE === "production" ? "production" : "preview";

const problems = [];
const need = (cond, msg) => { if (!cond) problems.push(msg); };

// Unternehmen
need(company.email, "Unternehmen: E-Mail-Adresse fehlt (Impressumspflicht § 5 DDG).");
need(company.legal.legalName, "Unternehmen: Rechtsträger / Firma fehlt.");
need(company.legal.legalForm, "Unternehmen: Rechtsform fehlt (z. B. GbR).");
need(company.legal.responsiblePerson, "Unternehmen: inhaltlich verantwortliche Person fehlt.");
need(company.legal.privacyContact, "Unternehmen: Datenschutz-Kontakt fehlt.");
need(company.legal.hostingProvider, "Unternehmen: Hosting-Anbieter fehlt (Datenschutzerklärung).");
need(company.leadRecipientEmail || process.env.LEAD_TO, "Unternehmen: zentraler Empfänger für Anfragen fehlt.");
need(company.partnerMentionApproved, "Unternehmen: schriftliche Freigabe für die Nennung von ERGO fehlt.");
need(company.insurerWebsitePermissionVerified, "Unternehmen: Erlaubnis des Versicherers für den Internetauftritt nicht bestätigt.");
need(!/example\.invalid/.test(company.siteUrl) || process.env.SITE_URL, "Unternehmen: öffentliche Domain (siteUrl / SITE_URL) fehlt.");

// Je Berater (§ 15 VersVermV)
for (const a of activeAdvisors()) {
  const n = `${a.firstName} ${a.lastName}`;
  need(a.intermediaryStatus, `${n}: Vermittlerstatus fehlt.`);
  need(a.registerNumber, `${n}: Vermittlerregisternummer fehlt.`);
  need(a.supervisoryAuthority, `${n}: zuständige IHK fehlt.`);
  need(a.insurers.length, `${n}: vermittelte Versicherer fehlen.`);
  need(a.remuneration, `${n}: Art der Vergütung fehlt.`);
  need(a.shareholdings, `${n}: Angabe zu Beteiligungen fehlt (ggf. „keine“).`);
}

// Freigaben
const approvalPath = path.join(root, "release-approval.json");
if (existsSync(approvalPath)) {
  for (const [k, v] of Object.entries(JSON.parse(readFileSync(approvalPath, "utf8")))) if (v !== true) problems.push(`Freigabe ausstehend: ${k}`);
} else problems.push("release-approval.json fehlt.");

if (mode === "production") {
  need(process.env.LEADS_ENABLED === "true", "LEADS_ENABLED=true nicht gesetzt.");
  need(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS, "SMTP-Zugangsdaten fehlen.");
}

const head = `\n[release-check] Modus: ${mode.toUpperCase()}`;
if (!problems.length) { console.log(`${head} – alle Prüfpunkte erfüllt.\n`); process.exit(0); }
if (mode === "production") {
  console.error(`${head} – VERÖFFENTLICHUNG BLOCKIERT (${problems.length} offene Punkte):`);
  for (const p of problems) console.error("  ✗ " + p);
  console.error("\nSiehe LEGAL-RELEASE-CHECKLIST.md\n");
  process.exit(1);
}
console.log(`${head} – interne Vorschau. ${problems.length} Punkte vor der Veröffentlichung offen (npm run release-check:prod zeigt sie).\n`);
