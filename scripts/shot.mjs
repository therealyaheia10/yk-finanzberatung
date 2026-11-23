// Einzel-Screenshot: node scripts/shot.mjs <url> <out.png> [breite] [fullpage 1/0]
import { chromium } from "@playwright/test";
import { existsSync } from "fs";
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const [,, url, out, w = "1440", full = "1"] = process.argv;
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: +w, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(1200); await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('is-in'))); await p.waitForTimeout(800);
await p.screenshot({ path: out, fullPage: full === "1" });
await b.close();
