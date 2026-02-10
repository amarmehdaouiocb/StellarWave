import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "strategies-interactive.html");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

page.on('console', msg => console.log('BROWSER:', msg.text()));
page.on('pageerror', err => console.log('PAGE_ERROR:', err.message));

await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
  timeout: 30000,
});

await new Promise(r => setTimeout(r, 3000));

const info = await page.evaluate(() => {
  return {
    strategies: !!document.getElementById('carousel-strategies'),
    niches: !!document.getElementById('carousel-niches'),
    weeks: !!document.getElementById('carousel-weeks'),
    contentExists: !!document.querySelector('.content'),
    h2Count: document.querySelectorAll('.content h2').length,
    allH2s: Array.from(document.querySelectorAll('.content h2')).map((h, i) => i + ': ' + h.textContent.substring(0, 70)),
    anchorIds: Array.from(document.querySelectorAll('a[id^="prd-niche"]')).map(a => a.id),
    h1Count: document.querySelectorAll('.content h1').length,
    firstH1s: Array.from(document.querySelectorAll('.content h1')).slice(0, 5).map(h => h.textContent.substring(0, 70)),
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
