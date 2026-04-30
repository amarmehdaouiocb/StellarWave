/**
 * Génère public/stellarwave-plaquette.pdf à partir de http://localhost:3000/plaquette
 *
 * Usage :
 *   1) npm run dev (laisser tourner sur :3000)
 *   2) npm run plaquette:build
 *
 * Le script attend que les fonts soient chargées + force `body.animations-ready`
 * pour neutraliser les animations Framer Motion / GSAP avant de capturer le PDF.
 */
import { chromium } from "playwright";
import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const URL = process.env.PLAQUETTE_URL ?? "http://localhost:3000/plaquette";
const OUTPUT = resolve(process.cwd(), "public/stellarwave-plaquette.pdf");

async function main() {
  console.log("→ Lancement de Chromium headless...");
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 }, // ≈ A4 px @ 96dpi
      // 1.5 = bon compromis qualité / taille de fichier (≈ 7-9 MB final)
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

    // Petit délai supplémentaire pour laisser les images se rendre
    await page.waitForTimeout(800);

    console.log("→ Préparation du dossier de sortie...");
    await mkdir(dirname(OUTPUT), { recursive: true });

    console.log(`→ Génération du PDF vers ${OUTPUT}`);
    await page.pdf({
      path: OUTPUT,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
      scale: 1,
    });

    const info = await stat(OUTPUT);
    const sizeKb = (info.size / 1024).toFixed(1);
    console.log(`✔  PDF généré : ${OUTPUT} (${sizeKb} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("✖ Erreur lors de la génération du PDF :", err);
  process.exit(1);
});
