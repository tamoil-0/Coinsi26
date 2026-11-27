import { expect, test } from "@playwright/test";

test.describe("presentación", () => {
  test.skip(({ isMobile }) => isMobile, "La navegación por teclado se prueba en escritorio");

  test("teclado: flechas, Home, End y vista general", async ({ page }) => {
    await page.goto("/presentacion/1");
    await page.keyboard.press("ArrowRight");
    await expect(page).toHaveURL(/\/presentacion\/2$/);
    await page.keyboard.press(" ");
    await expect(page).toHaveURL(/\/presentacion\/3$/);
    await page.keyboard.press("ArrowLeft");
    await expect(page).toHaveURL(/\/presentacion\/2$/);
    await page.keyboard.press("End");
    await expect(page).toHaveURL(/\/presentacion\/25$/);
    await page.keyboard.press("Home");
    await expect(page).toHaveURL(/\/presentacion\/1$/);
    await page.keyboard.press("g");
    await expect(page.getByRole("dialog", { name: "Vista general de diapositivas" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  for (const vp of [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 1280, height: 1024 },
  ]) {
    test(`las 25 diapositivas caben sin scroll a ${vp.width}×${vp.height}`, async ({ page }) => {
      await page.setViewportSize(vp);
      for (let i = 1; i <= 25; i++) {
        await page.goto(`/presentacion/${i}`);
        await expect(page.locator(`section[aria-label^="${i} de 25"]`)).toBeVisible();
        const scroll = await page.evaluate(() => ({
          y: document.documentElement.scrollHeight - window.innerHeight,
          x: document.documentElement.scrollWidth - window.innerWidth,
        }));
        expect(scroll.y, `slide ${i}`).toBeLessThanOrEqual(0);
        expect(scroll.x, `slide ${i}`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test("modo lectura en móvil", async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto("/presentacion");
  await expect(page.getByRole("button", { name: "Modo proyección" })).toBeVisible();
  await expect(page.locator("li[id^=s]")).toHaveCount(25);
});
