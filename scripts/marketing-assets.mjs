#!/usr/bin/env node
/**
 * Erzeugt sämtliche Marketing-Materialien aus src/config/advisor.ts:
 *  - 3 WhatsApp-Status-Grafiken, 3 Instagram-Stories (1080×1920)
 *  - 3 Social-Media-Beiträge (1080×1350)
 *  - QR-Code (SVG + PNG) auf die Website-URL
 *  - Digitale Visitenkarte (HTML) + Kontaktdatei (.vcf)
 *  - E-Mail-Signatur (HTML)
 * Die HTML-Vorlagen landen in marketing/editable/ und können frei bearbeitet
 * und mit `npm run marketing -- --render-only` erneut gerendert werden.
 *
 * Aufruf:  MARKETING_URL=https://ihre-domain.de npm run marketing
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { spawnSync } from "child_process";
import QRCode from "qrcode";
import { chromium } from "@playwright/test";

// Konfiguration (TypeScript) über Node-Type-Stripping laden
if (!process.execArgv.includes("--experimental-strip-types")) {
  const r = spawnSync(process.execPath, ["--experimental-strip-types", "--no-warnings", fileURLToPath(import.meta.url), ...process.argv.slice(2)], { stdio: "inherit" });
  process.exit(r.status ?? 1);
}
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const { company } = await import(pathToFileURL(path.join(root, "src/config/company.ts")).href);
const { activeAdvisors } = await import(pathToFileURL(path.join(root, "src/config/advisors.ts")).href);
// Marketing-Materialien zeigen die Marke + den Hauptansprechpartner (erster aktiver Berater)
const lead = activeAdvisors()[0];
const fullName = company.name;
const advisor = {
  brandName: company.name.toUpperCase(), initials: company.shortName, nameAr: company.name,
  firstName: lead.firstName, lastName: lead.lastName, phone: company.phone, phoneDisplay: company.phoneDisplay, email: company.email,
  office: company.office, siteUrl: company.siteUrl, brandTagline: company.tagline,
  jobTitle: null, neutralJobTitle: { de: company.tagline.de },
  images: { portraitMain: lead.portrait },
};

const OUT = path.join(root, "marketing");
const ED = path.join(OUT, "editable");
for (const d of [OUT, ED, path.join(OUT, "png")]) mkdirSync(d, { recursive: true });

const url = (process.env.MARKETING_URL || process.env.SITE_URL || advisor.siteUrl).replace(/\/$/, "");
const urlValid = !/example\.invalid/.test(url);
const shortUrl = url.replace(/^https?:\/\//, "");

// ---------- Schriften als data-URL einbetten (keine externen Abrufe) ----------
const font = (p) => `data:font/woff2;base64,${readFileSync(path.join(root, "node_modules", p)).toString("base64")}`;
const fontCss = `
@font-face{font-family:Manrope;src:url(${font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2")}) format("woff2");font-weight:200 800}
@font-face{font-family:Cormorant;src:url(${font("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2")}) format("woff2");font-weight:500}
@font-face{font-family:Cormorant;font-style:italic;src:url(${font("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2")}) format("woff2");font-weight:500}
@font-face{font-family:Plex;src:url(${font("@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2")}) format("woff2");font-weight:500}
@font-face{font-family:Plex;src:url(${font("@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2")}) format("woff2");font-weight:700}
`;

// ---------- QR-Code ----------
const qrSvg = await QRCode.toString(url, { type: "svg", margin: 1, color: { dark: "#102A43", light: "#FFFFFF" }, errorCorrectionLevel: "M" });
if (urlValid) {
  writeFileSync(path.join(OUT, "qr-website.svg"), qrSvg);
  await QRCode.toFile(path.join(OUT, "qr-website.png"), url, { width: 1200, margin: 2, color: { dark: "#102A43", light: "#FFFFFF" } });
}
const qrBlock = (size) => urlValid
  ? `<div style="width:${size}px;height:${size}px;background:#fff;padding:12px;box-sizing:border-box">${qrSvg.replace("<svg", `<svg width="${size - 24}" height="${size - 24}"`)}</div>`
  : `<div style="width:${size}px;height:${size}px;border:3px dashed #C9B286;display:flex;align-items:center;justify-content:center;text-align:center;color:#C9B286;font:600 22px Manrope;padding:16px;box-sizing:border-box">QR-Code<br>nach Domain-<br>Freigabe</div>`;

const name = fullName;
const phone = advisor.phoneDisplay || "";
const mono = `<div style="width:120px;height:120px;border:2px solid #C9B286;display:flex;align-items:center;justify-content:center;position:relative"><div style="position:absolute;inset:8px;border:1px solid rgba(201,178,134,.5)"></div><span style="font:600 52px Cormorant;color:#fff">${advisor.initials}</span></div>`;
const base = (w, h, body, dir = "ltr") => `<!doctype html><html dir="${dir}"><head><meta charset="utf-8"><style>${fontCss}
*{margin:0;box-sizing:border-box} body{width:${w}px;height:${h}px;overflow:hidden;font-family:Manrope,${dir === "rtl" ? "Plex," : ""}sans-serif}
.navy{background:#102A43;background-image:radial-gradient(1200px 700px at 90% -10%,rgba(201,178,134,.22),transparent 60%);color:#fff}
.ivory{background:#F7F5EF;color:#102A43}
.serif{font-family:Cormorant,serif;font-weight:500;line-height:1.05;font-variant-numeric:lining-nums}
.ar{font-family:Plex,sans-serif;font-weight:700;line-height:1.45}
.label{letter-spacing:.2em;text-transform:uppercase;font-weight:700;font-size:26px;color:#C9B286}
.rule{display:inline-block;width:70px;height:2px;background:#C9B286;vertical-align:middle;margin-inline-end:22px}
.pill{display:inline-block;border-radius:999px;padding:26px 46px;font-weight:700;font-size:34px}
</style></head><body>${body}</body></html>`;

const portrait = advisor.images.portraitMain ? `data:image/webp;base64,${readFileSync(path.join(root, "public", advisor.images.portraitMain)).toString("base64")}` : null;
const photo = (w, h, extra = "") => portrait
  ? `<div style="width:${w}px;height:${h}px;background:url(${portrait}) center 25%/cover;${extra}"></div>`
  : `<div style="width:${w}px;height:${h}px;background:#1d3a57;display:flex;align-items:center;justify-content:center;${extra}"><span class="serif" style="font-size:160px;color:#C9B286">${advisor.initials}</span></div>`;

const footer = (dir = "ltr") => `
<div style="position:absolute;bottom:90px;left:80px;right:80px;display:flex;align-items:flex-end;justify-content:space-between;gap:40px;direction:${dir}">
  <div style="direction:${dir}">
    <div style="font-size:30px;font-weight:700;letter-spacing:.22em;direction:ltr;text-align:${dir === "rtl" ? "right" : "left"}">${advisor.brandName}</div>
    <div style="font-size:30px;margin-top:14px;color:#C9B286;direction:ltr;text-align:${dir === "rtl" ? "right" : "left"}">${[phone, urlValid ? shortUrl : ""].filter(Boolean).join(" · ")}</div>
  </div>
  ${qrBlock(210)}
</div>`;

const assets = {
  // ---------------- WhatsApp-Status ----------------
  "whatsapp-status-1-de": base(1080, 1920, `<div class="navy" style="position:relative;height:100%;padding:120px 80px">
    ${mono}
    <p class="label" style="margin-top:110px"><span class="rule"></span>Neu: unsere Website</p>
    <h1 class="serif" style="font-size:118px;margin-top:40px">Vorsorge,<br>die man<br><em style="color:#C9B286">versteht.</em></h1>
    <p style="font-size:40px;line-height:1.5;margin-top:60px;color:#D9CDB4;max-width:860px">Kinder, Einkommen, Gesundheit, Ruhestand – wir erklären es Ihnen persönlich. Auf Deutsch, Arabisch, Englisch und Französisch.</p>
    <p style="margin-top:60px"><span class="pill" style="background:#C9B286;color:#0B1E31">Termin anfragen</span></p>
    ${footer()}</div>`),
  "whatsapp-status-2-ar": base(1080, 1920, `<div class="navy" style="position:relative;height:100%;padding:120px 80px;text-align:right">
    <div style="display:flex;justify-content:flex-start">${mono}</div>
    <p class="label" style="margin-top:110px;font-family:Plex;letter-spacing:0;font-size:34px">موقعنا الجديد أصبح جاهزاً</p>
    <h1 class="ar" style="font-size:104px;margin-top:40px">مستقبلك يستحق<br><span style="color:#C9B286">اهتماماً شخصياً.</span></h1>
    <p class="ar" style="font-size:42px;font-weight:500;line-height:1.7;margin-top:50px;color:#D9CDB4">التأمين الصحي، حماية الدخل، الادخار للأطفال والتقاعد… نشرحها لك بالعربية وبكلام واضح.</p>
    <p style="margin-top:60px"><span class="pill ar" style="background:#C9B286;color:#0B1E31;font-size:38px">احجز موعداً للاستشارة</span></p>
    ${footer("rtl")}</div>`, "rtl"),
  "whatsapp-status-3-en": base(1080, 1920, `<div class="navy" style="position:relative;height:100%;padding:120px 80px">
    ${mono}
    <p class="label" style="margin-top:110px"><span class="rule"></span>New in Düsseldorf?</p>
    <h1 class="serif" style="font-size:112px;margin-top:40px">German insurance,<br><em style="color:#C9B286">explained in<br>plain English.</em></h1>
    <p style="font-size:40px;line-height:1.5;margin-top:60px;color:#D9CDB4;max-width:880px">Health insurance, income protection, pensions – personal advice in English, French, German and Arabic.</p>
    <p style="margin-top:60px"><span class="pill" style="background:#C9B286;color:#0B1E31">Book a consultation</span></p>
    ${footer()}</div>`),

  // ---------------- Instagram-Stories ----------------
  "instagram-story-1-de-rentenluecke": base(1080, 1920, `<div class="ivory" style="position:relative;height:100%;padding:130px 80px">
    <p class="label" style="color:#7A5F2E"><span class="rule"></span>Vorsorge-Rechner</p>
    <h1 class="serif" style="font-size:124px;margin-top:50px">Wie groß ist<br>Ihre <em style="color:#7A5F2E">Rentenlücke?</em></h1>
    <div class="navy" style="margin-top:80px;padding:60px;border-radius:12px">
      <p style="font-size:34px;color:#AAB6C3">Beispiel · 45 Jahre · 3.000 € netto</p>
      <p class="serif" style="font-size:150px;margin-top:20px">1.050 €</p>
      <p style="font-size:34px;color:#C9B286">fehlen pro Monat (heutige Kaufkraft)*</p>
    </div>
    <p style="font-size:38px;line-height:1.5;margin-top:60px;color:#4A5563">Rechnen Sie es in 30 Sekunden selbst aus – ohne Anmeldung.</p>
    <p style="font-size:22px;margin-top:30px;color:#4A5563">*Vereinfachte Modellrechnung, keine Beratung. Annahmen auf der Website.</p>
    <div style="position:absolute;bottom:90px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:flex-end">
      <div><div style="font-size:30px;font-weight:700;letter-spacing:.22em">${advisor.brandName}</div><div style="font-size:30px;margin-top:12px;color:#7A5F2E">${urlValid ? shortUrl : "Link in Bio"}</div></div>${qrBlock(210)}</div>
  </div>`),
  "instagram-story-2-ar-kinder": base(1080, 1920, `<div class="navy" style="position:relative;height:100%;text-align:right">
    ${photo(1080, 860, "opacity:.95")}
    <div style="padding:70px 80px">
      <p class="ar" style="font-size:34px;color:#C9B286;font-weight:500">الادخار والتخطيط لمستقبل الأطفال</p>
      <h1 class="ar" style="font-size:88px;margin-top:20px">مستقبل أولادك يبدأ<br>بقرارات اليوم.</h1>
      <p class="ar" style="font-size:40px;font-weight:500;margin-top:30px;color:#D9CDB4;line-height:1.7">مبلغ شهري صغير اليوم… قد يصبح أساساً حقيقياً غداً. لنتحدث بهدوء وبلغتك.</p>
    </div>${footer("rtl")}</div>`, "rtl"),
  "instagram-story-3-en-employers": base(1080, 1920, `<div class="ivory" style="position:relative;height:100%;padding:130px 80px">
    <p class="label" style="color:#7A5F2E"><span class="rule"></span>For employers</p>
    <h1 class="serif" style="font-size:118px;margin-top:50px">Show your team<br>that their <em style="color:#7A5F2E">health<br>matters.</em></h1>
    <ul style="margin-top:70px;font-size:40px;line-height:1.6;list-style:none;padding:0;color:#14212E">
      <li style="border-top:2px solid #DDD5C4;padding:26px 0">Employee health benefits (bKV)</li>
      <li style="border-top:2px solid #DDD5C4;padding:26px 0">Company pension schemes (bAV)</li>
      <li style="border-top:2px solid #DDD5C4;border-bottom:2px solid #DDD5C4;padding:26px 0">Explained to your team – in German, Arabic or English</li>
    </ul>
    <div style="position:absolute;bottom:90px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:flex-end">
      <div><div style="font-size:30px;font-weight:700;letter-spacing:.22em">${advisor.brandName}</div><div style="font-size:30px;margin-top:12px;color:#7A5F2E">${phone}</div></div>${qrBlock(210)}</div>
  </div>`),

  // ---------------- Social-Media-Beiträge 1080×1350 ----------------
  "post-1-de-vorstellung": base(1080, 1350, `<div class="ivory" style="position:relative;height:100%;display:grid;grid-template-columns:1fr 1fr">
    <div style="padding:90px 60px 90px 80px;display:flex;flex-direction:column;justify-content:space-between">
      <div><p class="label" style="color:#7A5F2E;font-size:22px"><span class="rule" style="width:46px"></span>Düsseldorf</p>
      <h1 class="serif" style="font-size:86px;margin-top:40px">Vorsorge, die man versteht.</h1>
      <p style="font-size:30px;line-height:1.55;margin-top:36px;color:#4A5563">Wir sind ${name}: persönliche Beratung zu Absicherung und Vorsorge – auf Deutsch, Arabisch, Englisch und Französisch.</p></div>
      <div style="font-size:24px;font-weight:700;letter-spacing:.22em">${advisor.brandName}</div>
    </div>
    ${photo(540, 1350)}
  </div>`),
  "post-2-ar-sprachen": base(1080, 1350, `<div class="navy" style="position:relative;height:100%;padding:100px 80px;text-align:right">
    <p class="ar" style="font-size:32px;color:#C9B286;font-weight:500">استشارات التأمين باللغة العربية في دوسلدورف</p>
    <h1 class="ar" style="font-size:96px;margin-top:30px">القرارات المهمة<br>نناقشها براحة أكبر<br><span style="color:#C9B286">بلغتنا.</span></h1>
    <div style="display:flex;gap:24px;margin-top:70px;justify-content:flex-start;direction:rtl">
      ${["العربية", "Deutsch", "English"].map((l, i) => `<div style="flex:1;border:2px solid rgba(201,178,134,.6);padding:34px 20px;text-align:center;font-size:44px;${i === 0 ? "font-family:Plex;font-weight:700" : "font-family:Cormorant"}">${l}</div>`).join("")}
    </div>
    <div style="position:absolute;bottom:80px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:flex-end;direction:ltr">
      ${qrBlock(170)}<div style="text-align:right"><div class="ar" style="font-size:40px">${advisor.nameAr}</div><div style="font-size:28px;color:#C9B286;margin-top:6px">${phone}</div></div></div>
  </div>`, "rtl"),
  "post-3-en-pkv": base(1080, 1350, `<div class="ivory" style="position:relative;height:100%;padding:100px 80px">
    <p class="label" style="color:#7A5F2E;font-size:22px"><span class="rule" style="width:46px"></span>Private health insurance in Germany</p>
    <h1 class="serif" style="font-size:96px;margin-top:40px">Better? Cheaper?<br><em style="color:#7A5F2E">It depends.</em></h1>
    <p style="font-size:34px;line-height:1.55;margin-top:44px;color:#4A5563;max-width:880px">Before you switch, understand the long-term picture: premiums in old age, family cover and the way back to public insurance. Honest advice in English.</p>
    <div style="position:absolute;bottom:80px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:flex-end">
      <div><div style="font-size:24px;font-weight:700;letter-spacing:.22em">${advisor.brandName}</div><div style="font-size:26px;margin-top:10px;color:#7A5F2E">${phone}</div></div>${qrBlock(170)}</div>
  </div>`),
};

if (!process.argv.includes("--render-only")) for (const [k, html] of Object.entries(assets)) writeFileSync(path.join(ED, `${k}.html`), html);

// ---------- Rendern ----------
const exe = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;
const browser = await chromium.launch({ executablePath: exe });
for (const f of readdirSync(ED).filter((x) => x.endsWith(".html"))) {
  const html = readFileSync(path.join(ED, f), "utf8");
  const w = Number(html.match(/body\{width:(\d+)px/)?.[1] || 1080);
  const h = Number(html.match(/height:(\d+)px;overflow/)?.[1] || 1920);
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, "png", f.replace(".html", ".png")) });
  await page.close();
}
await browser.close();

// ---------- Kontaktdatei (.vcf) ----------
const vcf = ["BEGIN:VCARD", "VERSION:3.0", `N:;;;;`, `FN:${name}`, `ORG:${company.name}`,
  
  advisor.phone ? `TEL;TYPE=WORK,VOICE:${advisor.phone}` : "", advisor.email ? `EMAIL;TYPE=WORK:${advisor.email}` : "",
  `ADR;TYPE=WORK:;;${advisor.office.street};${advisor.office.city};;${advisor.office.postalCode || ""};Deutschland`,
  urlValid ? `URL:${url}` : "", "END:VCARD"].filter(Boolean).join("\r\n");
writeFileSync(path.join(OUT, "international-finance-consulting.vcf"), vcf);

// ---------- Digitale Visitenkarte ----------
writeFileSync(path.join(OUT, "digitale-visitenkarte.html"), `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name} – Digitale Visitenkarte</title><style>${fontCss}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F7F5EF;font-family:Manrope,sans-serif;padding:16px}
.card{width:100%;max-width:420px;background:#102A43;color:#fff;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(16,42,67,.6)}
.ph{height:300px;background:${portrait ? `url(${portrait}) center 25%/cover` : "#1d3a57"}}
.in{padding:28px}.n{font:500 40px Cormorant,serif}.t{color:#C9B286;margin-top:4px;font-size:15px}
a.b{display:flex;align-items:center;justify-content:center;min-height:52px;border-radius:999px;margin-top:12px;font-weight:700;text-decoration:none}
.p{background:#C9B286;color:#0B1E31}.g{border:1.5px solid rgba(255,255,255,.5);color:#fff}
.s{color:#AAB6C3;font-size:15px;margin-top:18px;line-height:1.6}</style></head><body><div class="card"><div class="ph" role="img" aria-label="Portrait ${name}"></div><div class="in">
<div class="n">${name}</div><div class="t">${advisor.brandTagline.de} · Deutsch · العربية · English</div>
${advisor.phone ? `<a class="b p" href="tel:${advisor.phone}">Anrufen · ${phone}</a>` : ""}
${urlValid ? `<a class="b g" href="${url}/de/kontakt">Beratungstermin anfragen</a>` : `<a class="b g" href="#">Beratungstermin anfragen (Link nach Domain-Freigabe)</a>`}
<a class="b g" href="international-finance-consulting.vcf" download>Kontakt speichern</a>
<p class="s">${advisor.office.street}, ${advisor.office.postalCode ? advisor.office.postalCode + " " : ""}${advisor.office.city}</p></div></div></body></html>`);

// ---------- E-Mail-Signatur ----------
writeFileSync(path.join(OUT, "email-signatur.html"), `<!-- In Outlook/Gmail: Datei im Browser öffnen, alles markieren, kopieren und in die Signatur-Einstellungen einfügen. -->
<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;color:#14212E;font-size:14px;line-height:1.5">
<tr><td style="padding-right:16px;border-right:2px solid #B49A68;vertical-align:top">
<div style="width:52px;height:52px;border:1.5px solid #B49A68;text-align:center;line-height:52px;font-family:Georgia,serif;font-size:22px;color:#102A43">${advisor.initials}</div></td>
<td style="padding-left:16px">
<div style="font-size:16px;font-weight:bold;color:#102A43;letter-spacing:1px">${name}</div>
<div style="color:#7A5F2E">${advisor.brandTagline.de}</div>
<div style="margin-top:6px">${phone ? `Tel. <a href="tel:${advisor.phone}" style="color:#102A43;text-decoration:none">${phone}</a><br>` : ""}${advisor.office.street}, ${advisor.office.city}</div>
<div style="margin-top:6px">Beratung auf Deutsch · العربية · English</div>
${urlValid ? `<div style="margin-top:8px"><a href="${url}/de/kontakt" style="color:#fff;background:#102A43;padding:7px 14px;border-radius:20px;text-decoration:none;font-weight:bold">Beratungstermin anfragen</a> <a href="${url}" style="color:#102A43">${shortUrl}</a></div>` : `<div style="margin-top:8px;color:#a3271f">[Website-Link nach Domain-Freigabe ergänzen: MARKETING_URL=… npm run marketing]</div>`}
</td></tr></table>
`);

console.log(`Marketing-Materialien erzeugt in marketing/ (URL: ${urlValid ? url : "noch keine Domain – QR-Platzhalter"})`);
