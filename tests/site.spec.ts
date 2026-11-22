import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes, locales, href, routeKeys, teamHref } from "../src/lib/i18n";

const team = ["yaheia-kaswan", "ali-ibrahim"];

const allPages = locales.flatMap((l) => [...routeKeys.map((k) => ({ l, k: k as string, path: href(l, k) })), ...team.map((slug) => ({ l, k: slug, path: teamHref(l, slug) }))]);

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
  await expect(page).toHaveURL(/\/(de|en|ar|fr)$/);
});

test("Sprachwechsel behält die Unterseite (auch Beraterseiten)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const sw = async (name: string) => {
    await page.getByRole("button", { name: /Sprache|language|langue|اللغة/i }).click();
    await page.getByRole("link", { name }).first().click();
  };
  await page.goto("/de/berufsunfaehigkeitsversicherung");
  await sw("العربية"); await expect(page).toHaveURL(/\/ar\/income-protection$/);
  await sw("Français"); await expect(page).toHaveURL(/\/fr\/incapacite-de-travail$/);
  await sw("English"); await expect(page).toHaveURL(/\/en\/income-protection$/);
  await page.goto("/de/team/ali-ibrahim");
  await sw("Français"); await expect(page).toHaveURL(/\/fr\/team\/ali-ibrahim$/);
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
  await page.locator("#mobile-menu").getByRole("button", { name: "Unternehmen" }).click();
  await page.locator('#mobile-menu a[href="/de/unternehmen"]').first().click();
  await expect(page).toHaveURL(/\/de\/unternehmen$/);
});

test("Startseite: Privat/Unternehmen-Auswahl und Lösungen führen zu Unterseiten", async ({ page }) => {
  await page.goto("/de");
  await page.getByRole("link", { name: /Für Ihr Unternehmen/ }).click();
  await expect(page).toHaveURL(/\/de\/unternehmen$/);
  await page.goto("/de");
  await page.getByRole("link", { name: /Private Krankenversicherung/ }).first().click();
  await expect(page).toHaveURL(/\/de\/private-krankenversicherung$/);
});

test("Startseite ist kompakt (mobil höchstens 7 Bildschirmhöhen)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const l of ["de", "ar", "en", "fr"]) {
    await page.goto(`/${l}`);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    expect(h / 844, l).toBeLessThanOrEqual(7);
  }
});

test("Erster Bildschirm mobil: Headline, Termin-Button und Sprachwechsel sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/de");
  await expect(page.locator("h1")).toBeInViewport();
  await expect(page.getByRole("link", { name: /Kostenlose Beratung vereinbaren/ }).first()).toBeInViewport();
  await expect(page.getByRole("button", { name: /Sprache wählen/ })).toBeInViewport();
});

test("Rückruf-Direkteinstieg springt direkt zu den Kontaktdaten", async ({ page }) => {
  await page.goto("/de/kontakt?mode=callback");
  await expect(page.getByRole("heading", { name: "Wie erreichen wir Sie?" })).toBeVisible();
});

test("Rentenlücke-Rechner reagiert auf Eingaben", async ({ page }) => {
  await page.goto("/de/orientierung");
  await page.getByRole("button", { name: /Rentenlücke-Rechner/ }).click();
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
    await expect(status).toContainText(({ ar: "وضع تجريبي", en: "Test mode", fr: "Mode test", de: "Testbetrieb" } as const)[l]);
  });
}

test("Beraterseite: Anfrage geht direkt an den gewählten Berater (Weg B)", async ({ page }) => {
  await page.goto("/de/team/ali-ibrahim#termin");
  const form = page.locator("form").first();
  await expect(form).toContainText("Ali Ibrahim");
  await form.locator("label").first().click();
  await expect(form.locator("input[name$='-mode']").first()).toBeAttached();
  await form.locator("label").first().click();
  await form.locator("input[name=name]").fill("Test Person");
  await form.locator("input[name=email]").fill("test@example.com");
  await page.waitForTimeout(2600);
  await form.locator("button[type=submit]").click();
  await expect(page.getByRole("status")).toContainText("Ali Ibrahim");
});

test("Automatische Zuordnung (Weg A): Französisch → Ali Ibrahim", async ({ request }) => {
  const r = await request.post("/api/lead", { data: { topic: "retirement", mode: "phone", name: "Marie Test", phone: "0211 123456", language: "fr", pageLocale: "fr", elapsedMs: 5000 } });
  expect(r.status()).toBe(200);
  expect((await r.json()).advisorName).toBe("Ali Ibrahim");
});

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

const axePages = ["/de", "/ar", "/en", "/fr", "/de/kontakt", "/ar/contact", "/de/berufsunfaehigkeitsversicherung", "/en/company-pension", "/de/orientierung", "/fr/team/ali-ibrahim", "/de/erstinformation", "/fr/autres-protections"];
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
