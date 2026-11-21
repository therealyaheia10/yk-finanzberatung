// Prüft Seiten auf horizontalen Überlauf: node scripts/check-overflow.mjs <breite> <url>...
import { chromium } from "@playwright/test";
import { existsSync } from "fs";
// Ohne URLs: sammelt alle internen Links der vier Startseiten (Navigation + Footer decken jede Seite ab)
const [, , w, ...given] = process.argv;
const BASE = process.env.BASE_URL || "http://localhost:3000";
const b = await chromium.launch({ executablePath: existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined });
let urls = given;
if (!urls.length) {
  const set = new Set();
  for (const l of ["de", "ar", "en", "fr"]) {
    const p = await b.newPage();
    await p.goto(`${BASE}/${l}`);
    (await p.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))).forEach((h) => set.add(BASE + h.split("#")[0].split("?")[0]));
    await p.close();
  }
  urls = [...set];
}
let bad = 0;
for (const url of urls) {
  const p = await b.newPage({ viewport: { width: +w, height: 800 } });
  await p.goto(url, { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const W = document.documentElement.clientWidth; const out = [];
    for (const el of document.querySelectorAll("body *")) { const bb = el.getBoundingClientRect(); if ((bb.right > W + 1 || bb.left < -1) && bb.width > 0 && getComputedStyle(el).position !== "fixed") out.push(`${el.tagName}.${String(el.className).slice(0, 50)} L${Math.round(bb.left)} R${Math.round(bb.right)}`); }
    return { sw: document.documentElement.scrollWidth, W, out: out.slice(0, 4) };
  });
  if (r.sw > r.W) { bad++; console.log("OVERFLOW", url, r.sw, r.W); r.out.forEach((x) => console.log("   ", x)); }
  await p.close();
}
console.log(bad ? `${bad} Seite(n) mit Überlauf` : `OK – kein Überlauf bei ${w}px (${urls.length} Seiten)`);
await b.close();
