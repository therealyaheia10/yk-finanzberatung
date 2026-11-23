// Klickweg-Prüfung (Handy + Laptop): node scripts/qa-flows.mjs  (Server auf :3000)
import { chromium, devices } from "@playwright/test";
const B = "http://localhost:3000";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const out = [];
const ok = (c, msg) => out.push((c ? "OK   " : "FEHLER ") + msg);
for (const [dev, opt] of [["Handy", devices["iPhone 13"]], ["Laptop", { viewport: { width: 1366, height: 768 } }]]) {
  const ctx = await b.newContext(opt); const p = await ctx.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && !/status of 404/.test(m.text()) && errs.push(m.text()));
  const visibleTop = async (sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return Math.round(r.top); }, sel);
  // 1 Sorgen-Frage mit Anker → richtiger Rechner aktiv
  await p.goto(B + "/de", { waitUntil: "networkidle" });
  await p.locator("#sorgen a[href*='#versicherungs-check']").first().click(); await p.waitForURL(/orientierung#versicherungs-check/); await p.waitForTimeout(900);
  ok(await p.locator("#tool-panel").getByText(/Versicherungs-Checkliste/).first().isVisible(), `${dev}: Sorgen-Frage → Versicherungs-Checkliste ausgewählt`);
  // 2 Menü-Link Tools#vermoegensaufbau von anderer Seite
  await p.goto(B + "/de/impressum", { waitUntil: "networkidle" });
  if (dev === "Handy") { await p.locator("header button[aria-controls=mobile-menu]").click(); await p.getByRole("button", { name: "Tools" }).click(); await p.locator("#mobile-menu a[href*='vermoegensaufbau']").click(); }
  else { await p.getByRole("button", { name: "Tools" }).hover(); await p.locator("[id^=nav-] a[href*='vermoegensaufbau']").click(); }
  await p.waitForURL(/#vermoegensaufbau/); await p.waitForTimeout(900);
  ok(await p.locator("#tool-panel").getByText(/Vermögen aufbauen/).first().isVisible(), `${dev}: Menü → Vermögensrechner ausgewählt`);
  ok(await p.locator("#mobile-menu").count() === 0, `${dev}: Mobilmenü nach Klick geschlossen`);
  ok(await p.evaluate(() => document.body.style.overflow !== "hidden"), `${dev}: Seite nach Menü wieder scrollbar`);
  // 3 Gleiche Seite, anderes Tool über Menü
  if (dev === "Laptop") { await p.getByRole("button", { name: "Tools" }).hover(); await p.locator("[id^=nav-] a[href*='renten-check']").click(); await p.waitForTimeout(700);
    ok(await p.locator("#tool-panel").getByText(/Renten-Realitätscheck/).first().isVisible(), `${dev}: Tool-Wechsel auf gleicher Seite`); }
  // 4 Weitere Absicherungen #care → Abschnitt sichtbar unter Kopfzeile
  await p.goto(B + "/de/weitere-absicherungen#care", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
  const t4 = await visibleTop("#care"); ok(t4 !== null && t4 >= 50 && t4 < 400, `${dev}: Anker #care sichtbar (top=${t4})`);
  // 5 Beraterseite → Termin vereinbaren (#termin)
  await p.goto(B + "/de", { waitUntil: "networkidle" });
  await p.locator("#team a[href$='#termin']").first().click(); await p.waitForURL(/#termin/); await p.waitForTimeout(900);
  const t5 = await visibleTop("#termin"); ok(t5 !== null && t5 >= 40 && t5 < 500, `${dev}: Beraterseite #termin sichtbar (top=${t5})`);
  // 6 Beratung buchen mit Berater → Formular-Vorauswahl
  await p.goto(B + "/de", { waitUntil: "networkidle" });
  await p.locator("#team a[href*='advisor=ismael-palanga']").click(); await p.waitForURL(/advisor=ismael/); await p.waitForTimeout(700);
  ok(await p.getByText("Ismael Palanga").first().isVisible(), `${dev}: Formular zeigt gewählten Berater`);
  ok(Math.round(await p.evaluate(() => scrollY)) < 5, `${dev}: Kontaktseite beginnt oben`);
  // 7 Sprachwechsel auf Unterseite
  await p.goto(B + "/de/berufsunfaehigkeitsversicherung", { waitUntil: "networkidle" }); await p.mouse.wheel(0, 1500); await p.waitForTimeout(300);
  await p.locator("header button[aria-haspopup]:visible").first().click(); await p.locator("header a[hreflang=fr]:visible").first().click(); await p.waitForURL(/\/fr\//); await p.waitForTimeout(800);
  ok(/\/fr\/income-protection|\/fr\//.test(p.url()), `${dev}: Sprachwechsel → ${p.url().replace(B, "")}`);
  ok(Math.round(await p.evaluate(() => scrollY)) < 5, `${dev}: nach Sprachwechsel oben`);
  // 8 Zurück-Taste stellt Position wieder her
  await p.goto(B + "/de", { waitUntil: "networkidle" }); await p.locator("#team").scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await p.locator("#team article h3 a").first().hover(); const y8 = await p.evaluate(() => scrollY); await p.locator("#team article h3 a").first().click(); await p.waitForURL(/team\//); await p.waitForTimeout(700);
  await p.goBack(); await p.waitForTimeout(1200); const y8b = await p.evaluate(() => scrollY);
  ok(Math.abs(y8b - y8) < 400, `${dev}: Zurück-Taste → vorherige Position (${Math.round(y8)} → ${Math.round(y8b)})`);
  // 9 Rechner auf Startseite (Handy: Antippen öffnet)
  await p.goto(B + "/de", { waitUntil: "networkidle" });
  await p.locator("#rechner button[aria-controls]").nth(1).click(); await p.waitForTimeout(700);
  ok(await p.locator("#home-tool-panel").getByText(/Versicherungs-Checkliste/).first().isVisible(), `${dev}: Startseiten-Rechner öffnet`);
  // 10 404
  const r = await p.goto(B + "/de/gibt-es-nicht"); ok(r.status() === 404, `${dev}: unbekannte Seite → 404`);
  ok(errs.length === 0, `${dev}: keine JS-Fehler ${errs.slice(0, 2).join(" | ")}`);
  await ctx.close();
}
console.log(out.join("\n"));
await b.close();
