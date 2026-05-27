/**
 * Génère les PDFs partenariat depuis Next.js + Playwright.
 *
 * Sorties :
 *   public/decks/cabinetcomptable/stellarwave-partenariat-comptables-fr.pdf
 *   public/decks/commerciaux/stellarwave-affiliation-commerciaux-fr.pdf
 *
 * Usage :
 *   1) npm run dev (laisser tourner sur :3000)
 *   2) npm run partner-decks:build
 *      ou : tsx scripts/generate-partner-decks.ts --deck accountants
 *      ou : tsx scripts/generate-partner-decks.ts --deck affiliates
 */
import { chromium } from "playwright";
import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type DeckKey = "accountants" | "affiliates" | "guide" | "contrat" | "guide-comptable";

type DeckConfig = {
  path: string;
  output: string;
  label: string;
};

const BASE_URL = process.env.PARTNER_DECKS_BASE_URL ?? "http://localhost:3000";

const DECKS: Record<DeckKey, DeckConfig> = {
  accountants: {
    path: "/plaquette/partenariat-comptables",
    output: "public/decks/cabinetcomptable/stellarwave-partenariat-comptables-fr.pdf",
    label: "Programme partenariat — Cabinets comptables",
  },
  affiliates: {
    path: "/plaquette/affiliation-commerciaux",
    output: "public/decks/commerciaux/stellarwave-affiliation-commerciaux-fr.pdf",
    label: "Programme d'affiliation — Apporteurs d'affaires",
  },
  guide: {
    path: "/plaquette/guide-apporteur",
    output: "public/decks/commerciaux/stellarwave-guide-apporteur-fr.pdf",
    label: "Guide de l'apporteur",
  },
  contrat: {
    path: "/plaquette/contrat-apporteur",
    output: "public/decks/commerciaux/stellarwave-contrat-apporteur.pdf",
    label: "Contrat d'apporteur d'affaires",
  },
  "guide-comptable": {
    path: "/plaquette/guide-cabinet-comptable",
    output: "public/decks/cabinetcomptable/stellarwave-guide-cabinet-comptable-fr.pdf",
    label: "Guide du cabinet partenaire",
  },
};

function parseDeckArg(): DeckKey[] {
  const arg = process.argv.find((a) => a.startsWith("--deck="));
  const explicit = arg?.split("=")[1];
  const positional = process.argv.indexOf("--deck");
  const positionalValue =
    positional !== -1 ? process.argv[positional + 1] : undefined;
  const chosen = explicit ?? positionalValue;

  if (!chosen || chosen === "all") {
    return ["accountants", "affiliates"];
  }
  if (
    chosen === "accountants" ||
    chosen === "affiliates" ||
    chosen === "guide" ||
    chosen === "contrat" ||
    chosen === "guide-comptable"
  ) {
    return [chosen];
  }
  console.error(`✖ --deck invalide : "${chosen}". Valeurs : accountants | affiliates | guide | contrat | all`);
  process.exit(1);
}

async function renderDeck(
  browser: import("playwright").Browser,
  deck: DeckConfig,
) {
  const context = await browser.newContext({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: Number(process.env.DECK_SCALE ?? 2),
  });
  const page = await context.newPage();

  const url = `${BASE_URL}${deck.path}`;
  console.log(`→ Navigation vers ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

  console.log("→ Attente du chargement des polices...");
  await page.evaluate(() => (document as Document).fonts.ready);

  console.log("→ Activation du flag animations-ready...");
  await page.evaluate(() => {
    document.body.classList.add("animations-ready");
  });

  await page.waitForTimeout(800);

  const outPath = resolve(process.cwd(), deck.output);
  await mkdir(dirname(outPath), { recursive: true });

  console.log(`→ Génération du PDF vers ${outPath}`);
  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
    scale: 1,
  });

  const info = await stat(outPath);
  const sizeKb = (info.size / 1024).toFixed(1);
  console.log(`✔  ${deck.label} : ${sizeKb} KB → ${deck.output}`);

  await context.close();
}

async function main() {
  const targets = parseDeckArg();

  console.log("→ Lancement de Chromium headless...");
  const browser = await chromium.launch({ headless: true });

  try {
    for (const key of targets) {
      console.log(`\n=== Deck : ${key} ===`);
      await renderDeck(browser, DECKS[key]);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("✖ Erreur lors de la génération du PDF :", err);
  process.exit(1);
});
