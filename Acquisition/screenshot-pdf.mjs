import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "strategies-pdf.html");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
  timeout: 30000,
});

await page.evaluateHandle("document.fonts.ready");
await new Promise((r) => setTimeout(r, 2000));

const totalHeight = await page.evaluate(() => document.body.scrollHeight);
const pageH = 1123;
console.log(`Total height: ${totalHeight}px, ~${Math.ceil(totalHeight / pageH)} pages`);

// TOC with niche grid
await page.screenshot({
  path: path.join(__dirname, "preview-toc-niches.png"),
  clip: { x: 0, y: pageH, width: 794, height: pageH },
});

// Find PRD Niche 1 anchor position
const prdN1Y = await page.evaluate(() => {
  const el = document.getElementById('prd-niche-1');
  return el ? el.getBoundingClientRect().top + window.scrollY - 40 : 0;
});
console.log(`PRD Niche 1 at Y=${prdN1Y}`);

await page.screenshot({
  path: path.join(__dirname, "preview-prd-niche1.png"),
  clip: { x: 0, y: prdN1Y, width: 794, height: pageH },
});

// PRD Niche 1 features continued
await page.screenshot({
  path: path.join(__dirname, "preview-prd-niche1-features.png"),
  clip: { x: 0, y: prdN1Y + pageH, width: 794, height: pageH },
});

// PRD Niche 1 conversion funnel
await page.screenshot({
  path: path.join(__dirname, "preview-prd-niche1-conversion.png"),
  clip: { x: 0, y: prdN1Y + pageH * 2, width: 794, height: pageH },
});

// Find Playbook section
const playbookY = await page.evaluate(() => {
  const headings = document.querySelectorAll('h2');
  for (const h of headings) {
    if (h.textContent.includes('PLAYBOOK CONVERSION')) {
      return h.getBoundingClientRect().top + window.scrollY - 40;
    }
  }
  return 0;
});
console.log(`Playbook at Y=${playbookY}`);

if (playbookY > 0) {
  await page.screenshot({
    path: path.join(__dirname, "preview-playbook.png"),
    clip: { x: 0, y: playbookY, width: 794, height: pageH },
  });

  await page.screenshot({
    path: path.join(__dirname, "preview-playbook-landing.png"),
    clip: { x: 0, y: playbookY + pageH, width: 794, height: pageH },
  });
}

// Find Architecture RAG section
const ragY = await page.evaluate(() => {
  const headings = document.querySelectorAll('h1');
  for (const h of headings) {
    if (h.textContent.includes('ARCHITECTURE TECHNIQUE')) {
      return h.getBoundingClientRect().top + window.scrollY - 40;
    }
  }
  return 0;
});
console.log(`Architecture RAG at Y=${ragY}`);

if (ragY > 0) {
  await page.screenshot({
    path: path.join(__dirname, "preview-rag-architecture.png"),
    clip: { x: 0, y: ragY, width: 794, height: pageH },
  });
  await page.screenshot({
    path: path.join(__dirname, "preview-rag-architecture-2.png"),
    clip: { x: 0, y: ragY + pageH, width: 794, height: pageH },
  });
}

// Find Guide Opus 4.6 section
const guideY = await page.evaluate(() => {
  const headings = document.querySelectorAll('h1');
  for (const h of headings) {
    if (h.textContent.includes('GUIDE DE D') || h.textContent.includes('Coder JurisAI')) {
      return h.getBoundingClientRect().top + window.scrollY - 40;
    }
  }
  return 0;
});
console.log(`Guide Opus at Y=${guideY}`);

if (guideY > 0) {
  await page.screenshot({
    path: path.join(__dirname, "preview-guide-opus.png"),
    clip: { x: 0, y: guideY, width: 794, height: pageH },
  });
  await page.screenshot({
    path: path.join(__dirname, "preview-guide-opus-2.png"),
    clip: { x: 0, y: guideY + pageH, width: 794, height: pageH },
  });
}

await browser.close();
console.log("Screenshots saved.");
