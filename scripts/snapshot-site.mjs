// Durchklickbare Komplett-Vorschau in EINER HTML-Datei (ohne Server, ohne JavaScript):
// alle deutschen Seiten + Startseiten AR/EN/FR. Seitenwechsel über #Anker (CSS :target),
// Aufklappmenüs über :hover/:focus-within, Mobilmenü über <details>.
// Aufruf: node scripts/snapshot-site.mjs vorschau/website-komplett.html  (Server auf :3000)
import { chromium } from "@playwright/test";
import { existsSync, writeFileSync } from "fs";

const BASE = "http://localhost:3000";
const out = process.argv[2] ?? "vorschau/website-komplett.html";
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const b = await chromium.launch({ executablePath: exe });
const pid = (path) => "p" + path.replace(/[^a-z0-9]+/gi, "-").replace(/-$/, "");

// 1) Seitenliste: alle /de-Links der Startseite + Fußzeile, plus Startseiten der anderen Sprachen
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(BASE + "/de", { waitUntil: "networkidle" });
const dePaths = await p.evaluate(() => [...new Set([...document.querySelectorAll("a[href^='/de']")].map((a) => new URL(a.href).pathname))]);
const langHomes = ["/ar", "/en", "/fr"];
const paths = ["/de", ...dePaths.filter((x) => x !== "/de" && !x.startsWith("/de/intern")), ...langHomes];
console.log(paths.length, "Seiten");

// 2) Bilder einmalig als data-URI
const imgCache = new Map();
async function dataUri(url) {
  if (imgCache.has(url)) return imgCache.get(url);
  const r = await fetch(url); const buf = Buffer.from(await r.arrayBuffer());
  const d = `data:${r.headers.get("content-type") ?? "image/webp"};base64,${buf.toString("base64")}`;
  imgCache.set(url, d); return d;
}

// 3) Jede Seite erfassen
const cssHrefs = new Set();
const pages = [];
let head = "";
for (const path of paths) {
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(4000);
  await page.goto(BASE + path, { waitUntil: "load" }); await page.waitForTimeout(400);
  // Aufklappmenüs öffnen und deren Inhalt einsammeln (Desktop)
  const dropdowns = [];
  const btns = page.locator("header nav[class*='xl:block'] li > button");
  for (let i = 0; i < await btns.count(); i++) {
    await btns.nth(i).hover(); await page.waitForTimeout(120);
    dropdowns.push(await page.locator("header nav [id^='nav-']").first().evaluate((e) => e.outerHTML).catch(() => ""));
    await page.mouse.move(5, 600); await page.waitForTimeout(250);
  }
  const langBtn = page.locator("header div.hidden.xl\\:flex button").first();
  await langBtn.click(); await page.waitForTimeout(80);
  const langPanel = await page.locator("header ul.dropdown-panel").first().evaluate((e) => e.outerHTML).catch(() => "");
  await page.keyboard.press("Escape");
  // Mobilmenü mit allen Gruppen
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  await page.locator("header button[aria-controls='mobile-menu']").click(); await page.waitForTimeout(150);
  const groups = [];
  const acc = page.locator("#mobile-menu nav > ul > li > button");
  for (let i = 0; i < await acc.count(); i++) {
    await acc.nth(i).click(); await page.waitForTimeout(80);
    groups.push(await acc.nth(i).evaluate((btn) => ({ label: btn.textContent.trim(), list: btn.nextElementSibling?.outerHTML ?? "" })));
    await acc.nth(i).click(); await page.waitForTimeout(40);
  }
  const mobileMenu = await page.locator("#mobile-menu").evaluate((e) => e.outerHTML);
  await page.locator("header button[aria-controls='mobile-menu']").click();
  await page.setViewportSize({ width: 1440, height: 900 });

  const data = await page.evaluate(({ dropdowns, langPanel, groups, mobileMenu }) => {
    const body = document.body.cloneNode(true);
    body.querySelectorAll("script, noscript, next-route-announcer, nextjs-portal").forEach((e) => e.remove());
    // Aufklappmenüs statisch einsetzen
    body.querySelectorAll("header nav[class*='xl:block'] li > button").forEach((btn, i) => {
      if (!dropdowns[i]) return;
      btn.parentElement.classList.add("snap-dd");
      btn.insertAdjacentHTML("afterend", dropdowns[i]);
    });
    body.querySelectorAll("header div.relative > button[aria-haspopup]").forEach((btn) => {
      btn.parentElement.classList.add("snap-dd");
      btn.insertAdjacentHTML("afterend", langPanel);
    });
    // Mobilmenü: <details> statt Button
    const tgl = body.querySelector("header button[aria-controls='mobile-menu']");
    if (tgl) {
      const tmp = document.createElement("div"); tmp.innerHTML = mobileMenu;
      const mm = tmp.firstElementChild;
      mm.querySelectorAll("nav > ul > li > button").forEach((btn, i) => {
        const d = document.createElement("details"); const s = document.createElement("summary");
        s.className = btn.className; s.innerHTML = btn.innerHTML; d.append(s);
        const g = groups[i]; if (g && g.list) d.insertAdjacentHTML("beforeend", g.list);
        btn.replaceWith(d);
      });
      const det = document.createElement("details"); det.className = "snap-mm xl:hidden";
      const sum = document.createElement("summary"); sum.className = tgl.className; sum.innerHTML = tgl.innerHTML; det.append(sum, mm);
      tgl.replaceWith(det);
    }
    return {
      html: body.innerHTML,
      lang: document.documentElement.lang, dir: document.documentElement.dir,
      css: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
      imgs: [...document.images].map((i) => [i.getAttribute("src"), i.currentSrc || i.src]),
      head: document.head.innerHTML,
    };
  }, { dropdowns, langPanel, groups, mobileMenu });
  data.css.forEach((c) => cssHrefs.add(c));
  if (!head) head = data.head;
  pages.push({ path, ...data });
  await page.close();
  process.stdout.write(".");
}
console.log();

// 4) CSS einbetten (Schriften als data-URI)
let css = "";
for (const href of cssHrefs) {
  let c = await (await fetch(href)).text();
  const urls = [...new Set([...c.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map((m) => m[2]).filter((u) => !u.startsWith("data:")))];
  for (const u of urls) c = c.split(u).join(await dataUri(new URL(u, href).href));
  css += c + "\n";
}

// 5) Links und Bilder umschreiben, Seiten zusammensetzen
const known = new Set(paths);
function rewrite(html, imgs) {
  html = html.replace(/href="(\/[^"]*)"/g, (_, h) => {
    const u = new URL(h, BASE);
    let target = u.pathname;
    if (!known.has(target)) target = "/" + target.split("/")[1];
    return known.has(target) ? `href="#${pid(target)}"` : 'href="#"';
  });
  return html;
}
let sections = "";
for (const pg of pages) {
  let html = rewrite(pg.html);
  for (const [attrSrc, cur] of pg.imgs) {
    if (!attrSrc) continue;
    const d = await dataUri(cur);
    html = html.split(`src="${attrSrc.replace(/&/g, "&amp;")}"`).join(`src="${d}"`).split(`src="${attrSrc}"`).join(`src="${d}"`);
  }
  html = html.replace(/\s(srcset|sizes)="[^"]*"/g, "").replace(/\sloading="lazy"/g, "");
  sections += `<div class="snap-page" id="${pid(pg.path)}" lang="${pg.lang}" dir="${pg.dir}"${pg.dir === "rtl" ? ' style="font-family:var(--font-arabic)"' : ""}>${html}</div>\n`;
}

const extra = `
.snap-page{display:none}
.snap-page:target{display:block}
body:not(:has(.snap-page:target)) #${pid("/de")}{display:block}
.snap-dd{position:relative}
.snap-dd > [id^='nav-'], .snap-dd > ul.dropdown-panel{display:none}
.snap-dd:hover > [id^='nav-'], .snap-dd:focus-within > [id^='nav-'], .snap-dd:hover > ul.dropdown-panel, .snap-dd:focus-within > ul.dropdown-panel{display:block}
.snap-mm > summary{list-style:none;cursor:pointer}
.snap-mm > summary::-webkit-details-marker{display:none}
#mobile-menu details > summary{list-style:none;cursor:pointer}
#mobile-menu details > summary::-webkit-details-marker{display:none}
html{scroll-padding-top:0}
.snap-note{position:fixed;inset-inline-end:12px;bottom:12px;z-index:90;background:#111519;color:#d6be93;font:600 12px/1.4 system-ui;padding:6px 10px;border-radius:999px;opacity:.85}
@media (max-width:767px){.snap-note{bottom:84px}}`;

const cleanHead = head.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<link[^>]+rel="(stylesheet|preload|modulepreload)"[^>]*>/g, "");
const doc = `<!doctype html><html lang="de"><head>${cleanHead}<style>${css}</style><style>${extra}</style></head><body>${sections}<div class="snap-note">Vorschau · Formulare &amp; Rechner nur auf der Live-Seite</div></body></html>`;
writeFileSync(out, doc);
console.log(out, (doc.length / 1048576).toFixed(1) + " MB");
await b.close();
