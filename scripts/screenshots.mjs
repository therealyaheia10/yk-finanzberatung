#!/usr/bin/env node
// Präsentations-Screenshots: 5 Breiten × 3 Sprachen + ganze Startseiten + ausgewählte Unterseiten
// Voraussetzung: laufender Server (npm run build && npm start). BASE_URL optional.
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync } from "fs";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = "docs/screenshots";
mkdirSync(OUT, { recursive: true });
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const widths = { desktop: 1440, laptop: 1280, tablet: 768, smartphone: 390, "small-smartphone": 360 };
const heights = { desktop: 900, laptop: 800, tablet: 1024, smartphone: 844, "small-smartphone": 740 };
const b = await chromium.launch({ executablePath: exe });
async function shot(path, file, w, h, full = false, scale = 2) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200); await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(600);
  if (full) await p.addStyleTag({ content: ".fixed{position:static!important}" });
  await p.screenshot({ path: `${OUT}/${file}`, fullPage: full, type: file.endsWith(".jpg") ? "jpeg" : "png", quality: file.endsWith(".jpg") ? 82 : undefined });
  await ctx.close();
}
for (const l of ["de", "ar", "en", "fr"]) {
  for (const [name, w] of Object.entries(widths)) await shot(`/${l}`, `${l}-home-${name}-${w}.png`, w, heights[name]);
  await shot(`/${l}`, `${l}-home-full-desktop.jpg`, 1440, 900, true, 1);
  await shot(`/${l}`, `${l}-home-full-smartphone.jpg`, 390, 844, true, 2);
}
const sub = [["/de/team/yaheia-kaswan", "de-team-yaheia"], ["/fr/team/ali-ibrahim", "fr-team-ali"], ["/de/ueber-uns", "de-ueber-uns"], ["/de/berufsunfaehigkeitsversicherung", "de-bu"], ["/de/orientierung", "de-orientierung"], ["/de/kontakt?topic=kids", "de-kontakt-formular"], ["/ar/private-health-insurance", "ar-pkv"], ["/en/company-pension", "en-bav"], ["/fr/autres-protections", "fr-protections"], ["/de/erstinformation", "de-erstinformation"]];
for (const [p, n] of sub) { await shot(p, `${n}-desktop.png`, 1440, 900); await shot(p, `${n}-smartphone.png`, 390, 844); }
await b.close();
console.log("Screenshots in", OUT);
