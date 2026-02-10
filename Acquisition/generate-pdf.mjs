import puppeteer from "puppeteer";
import { marked } from "marked";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const md = fs.readFileSync(
  path.join(__dirname, "rtx5090-claude-max-strategies.md"),
  "utf-8"
);

const htmlBody = marked.parse(md);

const styledHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Stratégies de monétisation — RTX 5090 + Claude Code Max 20x</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Bricolage+Grotesque:wght@400;600;700;800&display=swap');

  :root {
    --bg-deep: #07060a;
    --bg-surface: #0f0e14;
    --bg-card: #16151e;
    --bg-elevated: #1e1d28;
    --border: #2a2935;
    --border-subtle: #1e1d28;
    --text-primary: #eae8e4;
    --text-secondary: #9d99a8;
    --text-muted: #6b6778;
    --amber: #f59e0b;
    --amber-dim: #b27308;
    --amber-glow: rgba(245, 158, 11, 0.12);
    --coral: #ef6c4a;
    --coral-dim: rgba(239, 108, 74, 0.15);
    --teal: #2dd4bf;
    --teal-dim: rgba(45, 212, 191, 0.12);
    --violet: #a78bfa;
    --violet-dim: rgba(167, 139, 250, 0.10);
    --rose: #f472b6;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 11px;
  }

  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background: var(--bg-deep);
    color: var(--text-primary);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    padding: 0;
  }

  /* ─── COVER PAGE ─── */
  .cover-page {
    page-break-after: always;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--bg-deep);
    position: relative;
    overflow: hidden;
    padding: 60px;
  }

  .cover-page::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -20%;
    width: 140%;
    height: 140%;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 80%, rgba(239, 108, 74, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .cover-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border: 1px solid var(--border);
    border-radius: 100px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--amber);
    background: var(--amber-glow);
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  }

  .cover-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 52px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
  }

  .cover-title .highlight {
    background: linear-gradient(135deg, var(--amber) 0%, var(--coral) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cover-subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    max-width: 500px;
    margin-bottom: 50px;
    position: relative;
    z-index: 1;
    line-height: 1.7;
  }

  .cover-meta {
    display: flex;
    gap: 30px;
    position: relative;
    z-index: 1;
  }

  .cover-meta-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .cover-meta-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    font-weight: 600;
  }

  .cover-meta-value {
    font-size: 13px;
    font-weight: 700;
    color: var(--amber);
  }

  .cover-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--amber), var(--coral));
    border-radius: 2px;
    margin: 30px 0;
    position: relative;
    z-index: 1;
  }

  /* ─── TOC PAGE ─── */
  .toc-page {
    page-break-after: always;
    padding: 60px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .toc-title {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 40px;
    letter-spacing: -0.02em;
  }

  .toc-title::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--amber), var(--coral));
    border-radius: 3px;
    margin-top: 12px;
  }

  .toc-list {
    list-style: none;
    counter-reset: toc-counter;
  }

  .toc-item {
    counter-increment: toc-counter;
    display: flex;
    align-items: baseline;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border-subtle);
    transition: all 0.2s;
  }

  .toc-number {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: var(--amber);
    min-width: 36px;
    opacity: 0.7;
  }

  .toc-label {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .toc-desc {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 3px;
  }

  .toc-item-main .toc-number {
    color: var(--coral);
    opacity: 1;
  }

  .toc-item-main .toc-label {
    font-size: 17px;
  }

  /* ─── MAIN CONTENT ─── */
  .content {
    padding: 50px 55px;
    max-width: 100%;
  }

  /* ─── HEADINGS ─── */
  h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 60px 0 20px 0;
    page-break-before: always;
    padding-top: 20px;
    line-height: 1.2;
  }

  h1:first-child {
    page-break-before: avoid;
    margin-top: 0;
  }

  h1::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--amber), var(--coral));
    border-radius: 3px;
    margin-top: 14px;
  }

  h2 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 40px 0 14px 0;
    letter-spacing: -0.02em;
    page-break-after: avoid;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-subtle);
    line-height: 1.3;
  }

  h2::before {
    content: '//';
    color: var(--amber);
    margin-right: 10px;
    font-weight: 800;
    opacity: 0.6;
  }

  h3 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--amber);
    margin: 28px 0 10px 0;
    letter-spacing: 0.01em;
    page-break-after: avoid;
  }

  h4 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--violet);
    margin: 20px 0 8px 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ─── TEXT ─── */
  p {
    margin: 0 0 12px 0;
    color: var(--text-secondary);
    font-size: 11.5px;
    line-height: 1.75;
  }

  strong {
    color: var(--text-primary);
    font-weight: 700;
  }

  em {
    font-style: italic;
    color: var(--text-secondary);
  }

  a {
    color: var(--amber);
    text-decoration: none;
    border-bottom: 1px solid var(--amber-dim);
  }

  blockquote {
    border-left: 3px solid var(--amber);
    background: var(--amber-glow);
    padding: 14px 20px;
    margin: 16px 0;
    border-radius: 0 8px 8px 0;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.7;
  }

  blockquote p {
    margin: 0;
    color: var(--text-secondary);
  }

  hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 35px 0;
  }

  /* ─── LISTS ─── */
  ul, ol {
    margin: 8px 0 14px 0;
    padding-left: 22px;
  }

  li {
    margin: 4px 0;
    color: var(--text-secondary);
    font-size: 11.5px;
    line-height: 1.7;
  }

  li::marker {
    color: var(--amber);
  }

  /* ─── TABLES ─── */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 16px 0 22px 0;
    font-size: 10.5px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    page-break-inside: avoid;
  }

  thead {
    background: linear-gradient(135deg, var(--bg-elevated) 0%, rgba(245, 158, 11, 0.06) 100%);
  }

  th {
    padding: 11px 14px;
    text-align: left;
    font-weight: 700;
    color: var(--amber);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 9px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    vertical-align: top;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.015);
  }

  tbody tr:hover {
    background: var(--amber-glow);
  }

  /* ─── CODE BLOCKS ─── */
  pre {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px 22px;
    overflow-x: auto;
    margin: 14px 0 18px 0;
    font-size: 10px;
    line-height: 1.7;
    page-break-inside: avoid;
  }

  pre code {
    font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', monospace;
    color: var(--text-secondary);
    background: none;
    padding: 0;
    border: none;
    font-size: 10px;
    border-radius: 0;
  }

  code {
    font-family: 'JetBrains Mono', 'Cascadia Code', monospace;
    background: var(--bg-elevated);
    color: var(--amber);
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 10px;
    border: 1px solid var(--border-subtle);
  }

  /* ─── SPECIAL MARKERS IN CODE ─── */
  pre code .comment { color: var(--text-muted); }

  /* ─── PRINT / PDF ─── */
  @media print {
    body {
      background: var(--bg-deep) !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .cover-page {
      height: 100vh;
    }

    h1, h2, h3 {
      page-break-after: avoid;
    }

    pre, table, blockquote {
      page-break-inside: avoid;
    }

    .no-break {
      page-break-inside: avoid;
    }
  }

  /* ─── FOOTER ─── */
  .page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 55px;
    font-size: 8px;
    color: var(--text-muted);
    border-top: 1px solid var(--border-subtle);
    background: var(--bg-deep);
  }

  /* ─── SECTION MARKERS ─── */
  .section-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .chip-amber {
    background: var(--amber-glow);
    color: var(--amber);
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .chip-coral {
    background: var(--coral-dim);
    color: var(--coral);
    border: 1px solid rgba(239, 108, 74, 0.2);
  }

  .chip-teal {
    background: var(--teal-dim);
    color: var(--teal);
    border: 1px solid rgba(45, 212, 191, 0.2);
  }

  .chip-violet {
    background: var(--violet-dim);
    color: var(--violet);
    border: 1px solid rgba(167, 139, 250, 0.2);
  }

  /* ─── NICHE NAV GRID ─── */
  .niche-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 20px 0 30px 0;
    page-break-inside: avoid;
  }

  .niche-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .niche-nav-item:hover {
    background: var(--amber-glow);
    border-color: var(--amber);
  }

  .niche-nav-num {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: var(--amber);
    min-width: 24px;
  }

  .niche-nav-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
  }

  .niche-nav-sub {
    font-size: 8.5px;
    color: var(--text-muted);
    font-weight: 400;
  }

  /* ─── ANCHOR TARGETS ─── */
  a[id] {
    scroll-margin-top: 20px;
  }
</style>
</head>
<body>

<!-- ═══════ COVER PAGE ═══════ -->
<div class="cover-page">
  <div class="cover-badge">&#9670; Document stratégique privé</div>
  <h1 class="cover-title" style="page-break-before: avoid;">
    Stratégies de<br>
    <span class="highlight">Monétisation</span>
  </h1>
  <div class="cover-line"></div>
  <p class="cover-subtitle">
    6 stratégies de monétisation + deep dive AI fine-tunée pour professionnels (avocats, médecins, experts-comptables). Workflows détaillés, business models et projections financières.
  </p>
  <div class="cover-meta">
    <div class="cover-meta-item">
      <span class="cover-meta-label">Hardware</span>
      <span class="cover-meta-value">RTX 5090</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Software</span>
      <span class="cover-meta-value">Claude Code Max 20x</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Horizon</span>
      <span class="cover-meta-value">12 mois</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Potentiel</span>
      <span class="cover-meta-value">40k+/mois</span>
    </div>
  </div>
</div>

<!-- ═══════ TOC PAGE ═══════ -->
<div class="toc-page">
  <div class="toc-title">Sommaire</div>
  <div class="toc-list">
    <div class="toc-item">
      <span class="toc-number">01</span>
      <div>
        <div class="toc-label">Agence dev AI-augmentée</div>
        <div class="toc-desc">Cash flow immédiat, marge 90%+, scalable</div>
      </div>
    </div>
    <div class="toc-item">
      <span class="toc-number">02</span>
      <div>
        <div class="toc-label">Templates & micro-produits</div>
        <div class="toc-desc">Revenus semi-passifs, marketplaces</div>
      </div>
    </div>
    <div class="toc-item">
      <span class="toc-number">03</span>
      <div>
        <div class="toc-label">SaaS bootstrappé à la chaîne</div>
        <div class="toc-desc">Stratégie shotgun, MRR croissant</div>
      </div>
    </div>
    <div class="toc-item">
      <span class="toc-number">04</span>
      <div>
        <div class="toc-label">Services AI sur mesure</div>
        <div class="toc-desc">Inference locale, coût marginal nul</div>
      </div>
    </div>
    <div class="toc-item">
      <span class="toc-number">05</span>
      <div>
        <div class="toc-label">Formation & contenu</div>
        <div class="toc-desc">Audience, cours, coaching, communauté</div>
      </div>
    </div>
    <div class="toc-item">
      <span class="toc-number">06</span>
      <div>
        <div class="toc-label">Produit AI vertical avec moat</div>
        <div class="toc-desc">Fine-tuning, données propriétaires, moonshot</div>
      </div>
    </div>
    <div class="toc-item toc-item-main">
      <span class="toc-number">&#9733;</span>
      <div>
        <div class="toc-label">Workflow complet — Agence dev AI-augmentée</div>
        <div class="toc-desc">Phase 0 à 4, de la préparation au scale — le plan d'action détaillé</div>
      </div>
    </div>
    <div class="toc-item toc-item-main" style="margin-top:8px;">
      <span class="toc-number" style="color:var(--teal);">&#9670;</span>
      <div>
        <div class="toc-label">Deep Dive — AI fine-tunée pour professionnels</div>
        <div class="toc-desc">8 niches avec PRD, features P0/P1/P2, conversion, projections 24 mois</div>
      </div>
    </div>
    <div class="toc-item toc-item-main" style="margin-top:4px;">
      <span class="toc-number" style="color:var(--violet);">&#9881;</span>
      <div>
        <div class="toc-label">Architecture technique — RAG-first, fine-tuning later</div>
        <div class="toc-desc">Pipeline RAG, pgvector, Légifrance API, vLLM sur RTX 5090</div>
      </div>
    </div>
    <div class="toc-item toc-item-main" style="margin-top:4px;">
      <span class="toc-number" style="color:var(--rose);">&#9654;</span>
      <div>
        <div class="toc-label">Guide de démarrage — Coder JurisAI avec Opus 4.6</div>
        <div class="toc-desc">Plan d'exécution 4 semaines, prompts Claude Code jour par jour</div>
      </div>
    </div>

    <!-- Niche navigation grid -->
    <div class="niche-nav" style="margin-top:16px;">
      <a href="#prd-niche-1" class="niche-nav-item">
        <span class="niche-nav-num">N1</span>
        <div><div class="niche-nav-label">Assistant juridique</div><div class="niche-nav-sub">Avocats — TOP PICK</div></div>
      </a>
      <a href="#prd-niche-2" class="niche-nav-item">
        <span class="niche-nav-num">N2</span>
        <div><div class="niche-nav-label">Codage médical</div><div class="niche-nav-sub">CCAM / Facturation</div></div>
      </a>
      <a href="#prd-niche-3" class="niche-nav-item">
        <span class="niche-nav-num">N3</span>
        <div><div class="niche-nav-label">Rédaction médicale</div><div class="niche-nav-sub">Dictée → Compte-rendu</div></div>
      </a>
      <a href="#prd-niche-4" class="niche-nav-item">
        <span class="niche-nav-num">N4</span>
        <div><div class="niche-nav-label">Saisie comptable</div><div class="niche-nav-sub">OCR + Catégorisation</div></div>
      </a>
      <a href="#prd-niche-5" class="niche-nav-item">
        <span class="niche-nav-num">N5</span>
        <div><div class="niche-nav-label">Assistant notarial</div><div class="niche-nav-sub">Actes + Conformité</div></div>
      </a>
      <a href="#prd-niche-6" class="niche-nav-item">
        <span class="niche-nav-num">N6</span>
        <div><div class="niche-nav-label">Veille réglementaire</div><div class="niche-nav-sub">Cross-niche</div></div>
      </a>
      <a href="#prd-niche-7" class="niche-nav-item">
        <span class="niche-nav-num">N7</span>
        <div><div class="niche-nav-label">Due diligence</div><div class="niche-nav-sub">M&A / Data rooms</div></div>
      </a>
      <a href="#prd-niche-8" class="niche-nav-item">
        <span class="niche-nav-num">N8</span>
        <div><div class="niche-nav-label">Gestion RH / Paie</div><div class="niche-nav-sub">Cabinets comptables</div></div>
      </a>
    </div>
  </div>
</div>

<!-- ═══════ MAIN CONTENT ═══════ -->
<div class="content">
${htmlBody}
</div>

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "strategies-pdf.html"), styledHtml);
console.log("HTML (PDF version) generated.");

// ═══════ INTERACTIVE HTML VERSION ═══════
const interactiveCSS = fs.readFileSync(path.join(__dirname, "carousel.css"), "utf-8");
const interactiveJS = fs.readFileSync(path.join(__dirname, "carousel.js"), "utf-8");

const interactiveHtml = styledHtml
  .replace('</style>', interactiveCSS + '\n</style>')
  .replace('</body>', '<script>\n' + interactiveJS + '\n</script>\n</body>');

fs.writeFileSync(path.join(__dirname, "strategies-interactive.html"), interactiveHtml);
console.log("HTML (interactive version) generated.");

// Generate PDF
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

const htmlPath = path.join(__dirname, "strategies-pdf.html");
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
  waitUntil: "networkidle0",
  timeout: 30000,
});

// Wait for fonts
await page.evaluateHandle("document.fonts.ready");
await new Promise((r) => setTimeout(r, 1500));

const outputPath = path.join(__dirname, "RTX5090-Claude-Max-Strategies.pdf");

await page.pdf({
  path: outputPath,
  format: "A4",
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
  printBackground: true,
  preferCSSPageSize: false,
  displayHeaderFooter: false,
});

await browser.close();
console.log(`PDF generated: ${outputPath}`);
