import { chromium } from "@playwright/test";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 390, height: 800 } });
  await p.goto(url, { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const W = document.documentElement.clientWidth; const out = [];
    for (const el of document.querySelectorAll("body *")) {
      const b = el.getBoundingClientRect();
      if ((b.right > W + 1 || b.left < -1) && b.width > 0) out.push(`${el.tagName}.${(el.className||"").toString().slice(0,60)} L${Math.round(b.left)} R${Math.round(b.right)}`);
    }
    return { sw: document.documentElement.scrollWidth, W, out: out.slice(0, 12) };
  });
  console.log(url, r.sw, r.W); r.out.forEach((x) => console.log("  ", x));
  await p.close();
}
await b.close();
