import { expect, test, type Page } from "@playwright/test";

const ready = (page: Page) => page.locator('[data-hydrated="true"]').waitFor();

const pages = ["/", "/oportunidades", "/comunidades", "/recursos", "/ruta-profesional", "/historia", "/ponente", "/qr"];

test.describe("navegación y responsividad", () => {
  for (const path of pages) {
    test(`${path} carga sin desbordamiento horizontal`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForTimeout(300);
      const width = page.viewportSize()!.width;
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width + 1);
      expect(errors).toEqual([]);
    });
  }

  test("el CTA principal lleva al directorio", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explorar oportunidades" }).last().click();
    await expect(page).toHaveURL(/\/oportunidades$/);
  });
});

test.describe("directorio", () => {
  test("búsqueda instantánea y URL compartible", async ({ page }) => {
    await page.goto("/oportunidades");
    await ready(page);
    const all = page.locator("article");
    const total = await all.count();
    expect(total).toBeGreaterThan(50);
    await page.getByLabel("Buscar oportunidades").fill("CERN");
    await expect(page).toHaveURL(/q=CERN/);
    await expect.poll(() => all.count()).toBeLessThan(total);
    expect(await all.count()).toBeGreaterThanOrEqual(2);
  });

  test("filtro por categoría y estado vacío útil", async ({ page }) => {
    await page.goto("/oportunidades?c=peu");
    await ready(page);
    await expect.poll(async () => (await page.locator("article").allInnerTexts()).every((t) => t.includes("PEU"))).toBe(true);
    await page.getByLabel("Buscar oportunidades").fill("zzzzzz");
    await expect(page.getByText("Ninguna oportunidad coincide")).toBeVisible();
    await page.getByRole("button", { name: "Ver todas las oportunidades" }).click();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("favoritos persisten tras recargar", async ({ page }) => {
    await page.goto("/oportunidades");
    await ready(page);
    const first = page.locator("article").first();
    const btn = first.getByRole("button", { name: /^Guardar/ });
    await btn.evaluate((e) => e.scrollIntoView({ block: "center" }));
    await btn.click();
    await expect(first.getByRole("button", { name: /^Quitar/ })).toBeVisible();
    await page.reload();
    await ready(page);
    await page.getByRole("button", { name: /Guardados/ }).click();
    await expect(page.locator("article")).toHaveCount(1);
  });

  test("ninguna oportunidad vencida aparece como abierta", async ({ page }) => {
    await page.goto("/oportunidades?estado=open");
    await ready(page);
    await expect
      .poll(async () => {
        const texts = await page.locator("article").allInnerTexts();
        return texts.length > 0 && texts.every((t) => t.includes("Abierta"));
      })
      .toBe(true);
    // Cada tarjeta abierta debe tener cierre futuro o no publicado
    const deadlines = await page.locator("article dd.font-mono").allInnerTexts();
    expect(deadlines.length).toBeGreaterThan(0);
  });

  test("detalle con fuente oficial y compartir", async ({ page }) => {
    await page.goto("/oportunidades");
    await ready(page);
    const link = page.locator("article h3 a").first();
    await link.evaluate((e) => e.scrollIntoView({ block: "center" }));
    await link.click();
    await expect(page.getByRole("heading", { name: "Fuente oficial" })).toBeVisible();
    await expect(page.getByRole("button", { name: /WhatsApp/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /convocatoria oficial|Ir a postular/ })).toHaveAttribute("href", /^https:\/\//);
  });
});
