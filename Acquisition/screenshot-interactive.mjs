import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "strategies-interactive.html");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
  timeout: 30000,
});

await page.evaluateHandle("document.fonts.ready");
await new Promise((r) => setTimeout(r, 3000)); // Wait for JS DOM manipulation

// 1. Screenshot: Strategies carousel (should be visible after TOC)
const stratCarousel = await page.evaluate(() => {
  const el = document.getElementById('carousel-strategies');
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.x, y: rect.y + window.scrollY, w: rect.width, h: Math.min(rect.height, 800) };
});

if (stratCarousel) {
  await page.screenshot({
    path: path.join(__dirname, "preview-carousel-strategies.png"),
    clip: { x: 0, y: stratCarousel.y, width: 1200, height: 800 },
  });
  console.log("Strategies carousel captured.");
} else {
  console.log("WARNING: Strategies carousel NOT found.");
}

// 2. Screenshot: Niches carousel
const nichesCarousel = await page.evaluate(() => {
  const el = document.getElementById('carousel-niches');
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.x, y: rect.y + window.scrollY, w: rect.width, h: Math.min(rect.height, 800) };
});

if (nichesCarousel) {
  await page.screenshot({
    path: path.join(__dirname, "preview-carousel-niches.png"),
    clip: { x: 0, y: nichesCarousel.y, width: 1200, height: 800 },
  });
  console.log("Niches carousel captured.");
} else {
  console.log("WARNING: Niches carousel NOT found.");
}

// 3. Screenshot: Weeks carousel
const weeksCarousel = await page.evaluate(() => {
  const el = document.getElementById('carousel-weeks');
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.x, y: rect.y + window.scrollY, w: rect.width, h: Math.min(rect.height, 800) };
});

if (weeksCarousel) {
  await page.screenshot({
    path: path.join(__dirname, "preview-carousel-weeks.png"),
    clip: { x: 0, y: weeksCarousel.y, width: 1200, height: 800 },
  });
  console.log("Weeks carousel captured.");
} else {
  console.log("WARNING: Weeks carousel NOT found.");
}

// 4. Click tab 2 of strategies to show it switching
if (stratCarousel) {
  await page.evaluate(() => {
    const tab2 = document.querySelector('.carousel-tab[data-carousel="strategies"][data-index="1"]');
    if (tab2) tab2.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(__dirname, "preview-carousel-strategies-tab2.png"),
    clip: { x: 0, y: stratCarousel.y, width: 1200, height: 800 },
  });
  console.log("Strategies tab 2 captured.");
}

await browser.close();
console.log("Interactive screenshots done.");
