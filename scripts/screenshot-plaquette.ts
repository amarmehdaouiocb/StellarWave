/**
 * Screenshot debug : capture chaque page de /plaquette individuellement.
 * Permet de visualiser le rendu sans ouvrir le navigateur.
 *
 * Usage: PLAQUETTE_URL=http://localhost:3000/plaquette tsx scripts/screenshot-plaquette.ts
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const URL = process.env.PLAQUETTE_URL ?? "http://localhost:3000/plaquette";
const OUT_DIR = resolve(process.cwd(), ".plaquette-debug");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`→ ${URL}`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(() => (document as Document).fonts.ready);
  await page.evaluate(() => document.body.classList.add("animations-ready"));
  await page.waitForTimeout(800);

  // Compte le nombre de .pdf-page rendus
  const count = await page.locator(".pdf-page").count();
  console.log(`→ ${count} .pdf-page trouvés dans le DOM`);

  // Mesure la hauteur réelle de chaque page (pour détecter débordement)
  const heights = await page.locator(".pdf-page").evaluateAll((els) =>
    els.map((el) => ({
      offsetHeight: (el as HTMLElement).offsetHeight,
      scrollHeight: el.scrollHeight,
      clientHeight: (el as HTMLElement).clientHeight,
    }))
  );
  heights.forEach((h, i) => {
    const overflow = h.scrollHeight > h.offsetHeight ? " ⚠ OVERFLOW" : "";
    console.log(
      `   page ${i + 1}: offset=${h.offsetHeight}px scroll=${h.scrollHeight}px${overflow}`,
    );
  });

  // Screenshot chaque page individuellement
  for (let i = 0; i < count; i++) {
    const path = resolve(OUT_DIR, `page-${i + 1}.png`);
    await page.locator(".pdf-page").nth(i).screenshot({ path });
    console.log(`✔ ${path}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error("✖", err);
  process.exit(1);
});
