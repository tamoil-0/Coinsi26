/**
 * Exporta las 25 diapositivas a un PDF 16:9 como respaldo offline.
 *   npm run build && npx next start -p 3100   (en otra terminal)
 *   npm run pdf -- http://localhost:3100
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";

const base = process.argv[2] ?? "http://localhost:3100";
const out = process.argv[3] ?? "de-puno-al-mundo.pdf";

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const shots: Buffer[] = [];
  for (let i = 1; i <= 25; i++) {
    await page.goto(`${base}/presentacion/${i}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
    await page.mouse.move(960, 540);
    await page.waitForTimeout(3200);
    shots.push(await page.screenshot({ type: "jpeg", quality: 92 }));
    process.stdout.write(`${i} `);
  }
  const html = `<html><body style="margin:0">${shots
    .map((b) => `<img src="data:image/jpeg;base64,${b.toString("base64")}" style="width:1920px;height:1080px;display:block;page-break-after:always">`)
    .join("")}</body></html>`;
  const pdfPage = await browser.newPage();
  await pdfPage.setContent(html, { waitUntil: "load" });
  await pdfPage.pdf({ path: out, width: "1920px", height: "1080px", printBackground: true, pageRanges: "1-25" });
  await browser.close();
  console.log(`\nPDF: ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
})();
