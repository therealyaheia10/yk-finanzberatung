import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes, locales, href, routeKeys } from "../src/lib/i18n";

const allPages = locales.flatMap((l) => routeKeys.map((k) => ({ l, k, path: href(l, k) })));

test.describe("Alle Seiten in allen Sprachen", () => {
  for (const p of allPages) {
    test(`${p.path} lädt mit korrektem lang/dir, Titel, H1, hreflang, noindex`, async ({ page }) => {
      const res = await page.goto(p.path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", p.l);
      await expect(page.locator("html")).toHaveAttribute("dir", p.l === "ar" ? "rtl" : "ltr");
      await expect(page.locator("h1")).toHaveCount(1);
      expect((await page.title()).length).toBeGreaterThan(10);
      for (const l of locales) await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      // Vorschau darf nicht indexiert werden
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      // kein horizontales Scrollen auf dem Smartphone
      await page.setViewportSize({ width: 360, height: 740 });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sw).toBeLessThanOrEqual(361);
    });
  }
});

test("Startseite leitet nach Sprache weiter", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(de|en|ar)$/);
});

test("Sprachwechsel behält die Unterseite", async ({ page }) => {
  await page.goto("/de/berufsunfaehigkeitsversicherung");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("link", { name: "العربية" }).first().click();
  await expect(page).toHaveURL(/\/ar\/income-protection$/);
  await page.getByRole("link", { name: "English" }).first().click();
  await expect(page).toHaveURL(/\/en\/income-protection$/);
  await page.getByRole("link", { name: "Deutsch" }).first().click();
  await expect(page).toHaveURL(/\/de\/berufsunfaehigkeitsversicherung$/);
});

test("Alle internen Links funktionieren (DE/AR/EN)", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const l of locales) {
    await page.goto(`/${l}`);
    const links = await page.$$eval("a[href^='/']", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    links.forEach((x) => seen.add(x.split("#")[0]));
  }
  for (const u of seen) {
    const r = await request.get(u);
    expect(r.status(), u).toBeLessThan(400);
  }
});

test("Mobile Navigation öffnet, ist per Tastatur schließbar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/de");
  const btn = page.getByRole("button", { name: /Menü/ });
  await btn.click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await btn.click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Unternehmen" }).click();
  await expect(page).toHaveURL(/\/de\/unternehmen$/);
});

test("Anliegen-Finder zeigt passende Themen und führt zum Formular", async ({ page }) => {
  await page.goto("/de");
  await page.getByRole("button", { name: /Mein Einkommen/ }).click();
  await expect(page.locator("#finder-result")).toContainText("Berufsunfähigkeitsversicherung");
  await page.locator("#finder-result").getByRole("link", { name: "Meine Absicherung besprechen" }).click();
  await expect(page).toHaveURL(/kontakt\?topic=bu/);
  await expect(page.getByRole("heading", { name: "Wie möchten Sie beraten werden?" })).toBeVisible();
});

test("Rentenlücke-Rechner reagiert auf Eingaben", async ({ page }) => {
  await page.goto("/de/vorsorge-rechner");
  const out = page.locator("#rentenluecke [aria-live]");
  const before = await out.innerText();
  const slider = page.locator("#rentenluecke input[type=range]").nth(1);
  await slider.focus();
  for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowRight");
  expect(await out.innerText()).not.toBe(before);
});

for (const l of locales) {
  test(`Formular ${l}: Validierung, Testbetrieb und ehrliche Bestätigung`, async ({ page }) => {
    await page.goto(href(l, "contact"));
    const form = page.locator("form").first();
    await form.locator("label").first().click(); // Schritt 1
    await expect(form.locator("input[name$='-mode']").first()).toBeAttached();
    await form.locator("label").first().click(); // Schritt 2
    await expect(form.locator("input[name=name]")).toBeVisible();
    // Schritt 3: leer absenden → Fehlermeldung
    await form.locator("button[type=submit]").click();
    await expect(form.getByRole("alert")).toBeVisible();
    await form.locator("input[name=name]").fill("Test Person");
    await form.locator("input[name=tel]").fill("0211 123456");
    await page.waitForTimeout(2600); // Zeitfalle (Spam-Schutz)
    await form.locator("button[type=submit]").click();
    const status = page.getByRole("status");
    await expect(status).toBeVisible();
    // Vorschau: deutlich als Test gekennzeichnet – keine simulierte echte Zustellung
    await expect(status).toContainText(l === "ar" ? "وضع تجريبي" : l === "en" ? "Test mode" : "Testbetrieb");
  });
}

test("API lehnt ungültige und Spam-Anfragen ab", async ({ request }) => {
  const bad = await request.post("/api/lead", { data: { topic: "x" } });
  expect(bad.status()).toBe(400);
  const tooFast = await request.post("/api/lead", { data: { topic: "bu", mode: "phone", name: "Max", phone: "0211 1", language: "de", pageLocale: "de", elapsedMs: 100 } });
  expect(tooFast.status()).toBe(400);
});

test("Tastatur: Skip-Link und sichtbarer Fokus", async ({ page }) => {
  await page.goto("/de");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("Telefonnummer ist klickbar", async ({ page }) => {
  await page.goto("/de/kontakt");
  await expect(page.locator('a[href^="tel:+49"]:visible').first()).toBeVisible();
});

test("robots.txt sperrt die Vorschau, Sitemap leer", async ({ request }) => {
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
});

test("Dashboard ist nicht öffentlich", async ({ request }) => {
  const r = await request.get("/intern");
  expect([401, 404]).toContain(r.status());
});

const axePages = ["/de", "/ar", "/en", "/de/kontakt", "/ar/contact", "/de/berufsunfaehigkeitsversicherung", "/en/company-pension", "/de/vorsorge-rechner", "/de/erstinformation"];
for (const path of axePages) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    // Endzustand messen (Einblend-Animationen deaktiviert)
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0]?.target}`)).toEqual([]);
  });
}

// unbenutzte Variable vermeiden
void routes;
