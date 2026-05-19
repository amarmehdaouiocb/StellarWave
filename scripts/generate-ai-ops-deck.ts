/**
 * Génère public/decks/stellarwave-ai-operations-fr.pdf
 * depuis http://localhost:3000/plaquette/ai-operations (A4 landscape).
 *
 * Usage :
 *   1) npm run dev (laisser tourner sur :3000)
 *   2) npm run ai-ops:build
 */
import { chromium } from "playwright";
import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const URL =
  process.env.AI_OPS_URL ?? "http://localhost:3000/plaquette/ai-operations";
const OUTPUT = resolve(
  process.cwd(),
  "public/decks/stellarwave-ai-operations-fr.pdf",
);

async function main() {
  console.log("→ Lancement de Chromium headless...");
  const browser = await chromium.launch({ headless: true });

  try {
    // Viewport A4 landscape : 297×210mm @96dpi ≈ 1123×794px
    const context = await browser.newContext({
      viewport: { width: 1123, height: 794 },
      deviceScaleFactor: 1.5,
    });
    const page = await context.newPage();

    console.log(`→ Navigation vers ${URL}`);
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

    console.log("→ Attente du chargement des polices...");
    await page.evaluate(() => (document as Document).fonts.ready);

    console.log("→ Activation du flag animations-ready...");
    await page.evaluate(() => {
      document.body.classList.add("animations-ready");
    });

    await page.waitForTimeout(800);

    await mkdir(dirname(OUTPUT), { recursive: true });

    console.log(`→ Génération du PDF vers ${OUTPUT}`);
    await page.pdf({
      path: OUTPUT,
      format: "A4",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
      scale: 1,
    });

    const info = await stat(OUTPUT);
    const sizeKb = (info.size / 1024).toFixed(1);
    console.log(`✔  PDF AI Operations généré : ${OUTPUT} (${sizeKb} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("✖ Erreur lors de la génération du PDF :", err);
  process.exit(1);
});
