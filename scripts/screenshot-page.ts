/**
 * Screenshot full-page d'une route StellarWave (debug visuel).
 * Usage: PAGE_URL=http://localhost:3000/audit-gratuit tsx scripts/screenshot-page.ts
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const TARGET = process.env.PAGE_URL ?? "http://localhost:3000/";
const OUT = resolve(process.cwd(), ".plaquette-debug");

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
  });
  const page = await ctx.newPage();

  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(() => (document as Document).fonts.ready);
  await page.evaluate(() =>
    document.body.classList.add("animations-ready"),
  );
  await page.waitForTimeout(1500);

  const slug = new URL(TARGET).pathname.replace(/\//g, "_") || "_root";
  const path = resolve(OUT, `${slug}.png`);
  await page.screenshot({ path, fullPage: true });
  console.log(`✔ ${path}`);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
