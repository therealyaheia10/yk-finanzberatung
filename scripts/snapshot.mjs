// Eigenständige HTML-Momentaufnahme einer Seite (CSS, Schriften, Bilder eingebettet, ohne JavaScript).
// Aufruf: node scripts/snapshot.mjs /de vorschau/startseite-de.html  (Server muss auf :3000 laufen)
import { chromium } from "@playwright/test";
import { existsSync, writeFileSync } from "fs";

const [, , path = "/de", out = "vorschau/startseite-de.html"] = process.argv;
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3000" + path, { waitUntil: "networkidle" });
const html = await p.evaluate(async () => {
  const toData = async (u) => {
    const bl = await (await fetch(u)).blob();
    return await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(bl); });
  };
  const doc = document.documentElement.cloneNode(true);
  doc.classList.remove("js");
  doc.querySelectorAll("script, link[rel=preload], link[rel=modulepreload], noscript, next-route-announcer, nextjs-portal").forEach((e) => e.remove());
  for (const l of doc.querySelectorAll('link[rel="stylesheet"]')) {
    let css = await (await fetch(l.href)).text();
    const urls = [...new Set([...css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map((m) => m[2]).filter((u) => !u.startsWith("data:")))];
    for (const u of urls) { try { css = css.split(u).join(await toData(new URL(u, l.href).href)); } catch {} }
    const s = document.createElement("style"); s.textContent = css; l.replaceWith(s);
  }
  for (const img of doc.querySelectorAll("img")) {
    const live = [...document.images].find((i) => i.getAttribute("src") === img.getAttribute("src"));
    try { img.src = await toData((live && live.currentSrc) || img.src); } catch {}
    img.removeAttribute("srcset"); img.removeAttribute("sizes"); img.removeAttribute("loading");
  }
  doc.querySelectorAll("a[href^='/']").forEach((a) => a.setAttribute("href", "#"));
  return "<!doctype html>" + doc.outerHTML;
});
writeFileSync(out, html);
console.log(out, (html.length / 1048576).toFixed(2) + " MB");
await b.close();
