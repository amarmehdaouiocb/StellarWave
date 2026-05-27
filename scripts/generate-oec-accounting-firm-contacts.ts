/**
 * Collecte des cabinets depuis l'annuaire officiel de l'Ordre des experts-comptables.
 *
 * Niveau de fiabilite vise:
 * - fiche cabinet officielle OEC comme source primaire d'existence;
 * - telephone et site extraits de la fiche OEC;
 * - email public extrait du site officiel du cabinet;
 * - email retenu uniquement si son domaine correspond au site officiel.
 *
 * Usage:
 *   npm run contacts:oec -- --target=100 --max-pages=400 --delay-ms=600
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type Args = {
  output: string;
  target: number;
  maxPages: number;
  startPage: number;
  seed: string;
  delayMs: number;
  timeoutMs: number;
  maxSitePages: number;
  skipEmailCrawl: boolean;
  allowOecPhoneOnly: boolean;
  strictEmail: boolean;
  help: boolean;
};

type OecFirm = {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  phoneStandard: string;
  website: string;
  linkedinUrl: string;
  oecProfileUrl: string;
  oecId: string;
};

type VerifiedContact = OecFirm & {
  emailGeneric: string;
  emailOther: string;
  contactSourceUrl: string;
  websiteSourceUrl: string;
  contactConfidence: string;
  verificationStatus: string;
  verificationNotes: string;
  enrichedAt: string;
};

type CrawledPage = {
  url: string;
  finalUrl: string;
  html: string;
};

const BASE_URL = "https://annuaire.experts-comptables.org";
const DEFAULT_OUTPUT = "Acquisition/outbound/cabinets-comptables-oec-ultra-fiables-excel.csv";
const USER_AGENT =
  process.env.OEC_CONTACTS_USER_AGENT ??
  "Mozilla/5.0 (compatible; StellarWaveOecContactCollector/0.1; +https://stellarwave.fr)";

const HEADERS = [
  "companyName",
  "address",
  "postalCode",
  "city",
  "phoneStandard",
  "emailGeneric",
  "emailOther",
  "website",
  "linkedinUrl",
  "oecProfileUrl",
  "oecId",
  "contactSourceUrl",
  "websiteSourceUrl",
  "contactConfidence",
  "verificationStatus",
  "verificationNotes",
  "enrichedAt",
] as const;

const GENERIC_EMAIL_PREFIXES = [
  "contact",
  "accueil",
  "cabinet",
  "info",
  "secretariat",
  "secrétariat",
  "administratif",
  "admin",
  "office",
  "expertise",
  "compta",
  "clients",
  "serviceclient",
  "service-client",
];

const BAD_EMAIL_PARTS = [
  "@example.",
  "@domain.",
  "@email.",
  "@adresse.",
  "@site.",
  "@sentry.",
  "@wixpress.",
  "user@example",
  "email@example",
  "nom@",
  "prenom@",
  "votre@",
];

const BAD_EMAIL_PREFIXES = [
  "abuse",
  "bounce",
  "dpo",
  "hello@sentry",
  "noreply",
  "no-reply",
  "privacy",
  "rgpd",
  "support.wix",
  "webmaster",
];

const LIKELY_CONTACT_PATHS = [
  "/contact",
  "/contacts",
  "/nous-contacter",
  "/contactez-nous",
  "/cabinet",
  "/le-cabinet",
  "/agence",
  "/nos-agences",
  "/mentions-legales",
];

function parseArgs(argv: string[]): Args {
  const args: Args = {
    output: DEFAULT_OUTPUT,
    target: 100,
    maxPages: 400,
    startPage: 1,
    seed: "",
    delayMs: 600,
    timeoutMs: 12_000,
    maxSitePages: 5,
    skipEmailCrawl: false,
    allowOecPhoneOnly: false,
    strictEmail: true,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--allow-phone-only") args.strictEmail = false;
    else if (arg === "--skip-email-crawl") args.skipEmailCrawl = true;
    else if (arg === "--allow-oec-phone-only") args.allowOecPhoneOnly = true;
    else if (arg.startsWith("--output=")) args.output = valueOf(arg);
    else if (arg.startsWith("--target=")) args.target = parsePositiveInteger(arg, "target");
    else if (arg.startsWith("--max-pages=")) args.maxPages = parsePositiveInteger(arg, "max-pages");
    else if (arg.startsWith("--start-page=")) args.startPage = parsePositiveInteger(arg, "start-page");
    else if (arg.startsWith("--seed=")) args.seed = valueOf(arg);
    else if (arg.startsWith("--delay-ms=")) args.delayMs = parsePositiveInteger(arg, "delay-ms");
    else if (arg.startsWith("--timeout-ms=")) args.timeoutMs = parsePositiveInteger(arg, "timeout-ms");
    else if (arg.startsWith("--max-site-pages=")) args.maxSitePages = parsePositiveInteger(arg, "max-site-pages");
    else throw new Error(`Argument inconnu: ${arg}. Utilise --help pour voir les options.`);
  }

  return args;
}

function valueOf(arg: string) {
  return arg.slice(arg.indexOf("=") + 1).trim();
}

function parsePositiveInteger(arg: string, name: string) {
  const value = Number.parseInt(valueOf(arg), 10);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`--${name} doit etre un entier positif.`);
  }
  return value;
}

function printHelp() {
  console.log(`
Usage:
  npm run contacts:oec -- --target=100 --max-pages=400

Options:
  --output=PATH          CSV de sortie compatible Excel.
  --target=N            Nombre de contacts ultra fiables souhaites. Defaut: 100.
  --max-pages=N         Nombre maximal de pages OEC a scanner. Defaut: 400.
  --start-page=N        Page OEC de depart. Defaut: 1.
  --seed=N              Seed OEC a reutiliser pour des batches deterministes.
  --delay-ms=N          Pause entre requetes. Defaut: 600.
  --timeout-ms=N        Timeout HTTP. Defaut: 12000.
  --max-site-pages=N    Pages du site officiel a crawler. Defaut: 5.
  --allow-phone-only    Accepte les lignes sans email verifie.
  --skip-email-crawl    Avec --allow-phone-only, exporte directement telephone + site OEC.
  --allow-oec-phone-only Avec --allow-phone-only, accepte les fiches avec telephone OEC sans site.
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const outputPath = resolve(process.cwd(), args.output);
  const contacts: VerifiedContact[] = [];
  const seenProfiles = new Set<string>();
  const seenKeys = new Set<string>();

  const firstPage = args.seed ? "" : await fetchText(`${BASE_URL}/recherche`, args.timeoutMs);
  const seed = args.seed || extractSeed(firstPage) || `${Math.floor(Math.random() * 90_000) + 10_000}`;
  console.log(`Seed OEC: ${seed}`);

  for (let page = args.startPage; page < args.startPage + args.maxPages; page += 1) {
    if (contacts.length >= args.target) break;

    const searchUrl = page === 1 ? `${BASE_URL}/recherche?seed=${seed}` : `${BASE_URL}/recherche/${page}?seed=${seed}`;
    let searchHtml = "";
    try {
      searchHtml = await fetchText(searchUrl, args.timeoutMs);
    } catch (error) {
      console.warn(`[page ${page}] recherche impossible: ${messageOf(error)}`);
      await sleep(args.delayMs);
      continue;
    }

    const profileUrls = extractProfileUrls(searchHtml);
    console.log(`[page ${page}] ${profileUrls.length} fiches trouvees, ${contacts.length}/${args.target} contacts stricts`);

    for (const profileUrl of profileUrls) {
      if (contacts.length >= args.target) break;
      if (seenProfiles.has(profileUrl)) continue;
      seenProfiles.add(profileUrl);

      try {
        const firm = await fetchOecFirm(profileUrl, args.timeoutMs);
        if (!firm.phoneStandard || (!firm.website && !args.allowOecPhoneOnly)) {
          await sleep(args.delayMs);
          continue;
        }

        const contact = await verifyFirmContact(firm, args);
        if (!contact) {
          await sleep(args.delayMs);
          continue;
        }

        const dedupeKey = buildDedupeKey(contact);
        if (seenKeys.has(dedupeKey)) {
          await sleep(args.delayMs);
          continue;
        }

        seenKeys.add(dedupeKey);
        contacts.push(contact);
        console.log(`  + ${contacts.length}/${args.target} ${contact.companyName} | ${contact.emailGeneric || "tel seul"} | ${contact.phoneStandard}`);
      } catch (error) {
        console.warn(`  - fiche ignoree ${profileUrl}: ${messageOf(error)}`);
      }

      await sleep(args.delayMs);
    }

    await writeCsv(outputPath, contacts);
    await sleep(args.delayMs);
  }

  await writeCsv(outputPath, contacts);
  console.log(`Export termine: ${args.output}`);
  console.log(`Contacts exportes: ${contacts.length}`);
}

async function fetchOecFirm(profileUrl: string, timeoutMs: number): Promise<OecFirm> {
  const html = await fetchText(profileUrl, timeoutMs);
  const jsonLd = extractCabinetJsonLd(html);
  const links = extractFirmLinks(html);

  const address = readJsonString(jsonLd, "streetAddress") || textBetweenMetaDescription(html);
  const postalCode = readJsonString(jsonLd, "postalCode");
  const city = readJsonString(jsonLd, "addressLocality");

  return {
    companyName: decodeHtml(readJsonString(jsonLd, "name") || extractTitleName(html)),
    address: decodeHtml(address),
    postalCode,
    city: decodeHtml(city),
    phoneStandard: normalizeFrenchPhone(readJsonString(jsonLd, "telephone")),
    website: links.website,
    linkedinUrl: links.linkedin,
    oecProfileUrl: profileUrl,
    oecId: extractOecId(html),
  };
}

async function verifyFirmContact(firm: OecFirm, args: Args): Promise<VerifiedContact | null> {
  const websiteUrl = normalizeUrl(firm.website);
  if (!websiteUrl) {
    if (!args.strictEmail && args.skipEmailCrawl && args.allowOecPhoneOnly) {
      return {
        ...firm,
        website: "",
        emailGeneric: "",
        emailOther: "",
        contactSourceUrl: firm.oecProfileUrl,
        websiteSourceUrl: firm.oecProfileUrl,
        contactConfidence: "85",
        verificationStatus: "telephone_officiel_oec",
        verificationNotes: "Fiche OEC officielle + telephone OEC; aucun site publie sur la fiche OEC.",
        enrichedAt: new Date().toISOString(),
      };
    }
    return null;
  }

  if (!args.strictEmail && args.skipEmailCrawl) {
    return {
      ...firm,
      website: websiteUrl,
      emailGeneric: "",
      emailOther: "",
      contactSourceUrl: firm.oecProfileUrl,
      websiteSourceUrl: firm.oecProfileUrl,
      contactConfidence: "90",
      verificationStatus: "phone_site_officiels_oec",
      verificationNotes: "Fiche OEC officielle + telephone OEC + site publie sur la fiche OEC; email non recherche.",
      enrichedAt: new Date().toISOString(),
    };
  }

  const pages = await crawlOfficialWebsite(websiteUrl, args);
  const websiteRoot = rootDomain(websiteUrl);
  const emails: { email: string; sourceUrl: string; generic: boolean }[] = [];
  let websiteSourceUrl = "";

  for (const page of pages) {
    websiteSourceUrl ||= page.finalUrl || page.url;
    for (const email of extractEmails(page.html)) {
      if (!isValidEmail(email)) continue;
      if (rootDomain(email) !== websiteRoot) continue;
      emails.push({ email, sourceUrl: page.finalUrl || page.url, generic: isGenericEmail(email) });
    }
  }

  const uniqueEmails = dedupe(emails, (entry) => entry.email.toLowerCase());
  const genericEmail = uniqueEmails.find((entry) => entry.generic) ?? uniqueEmails[0];

  if (args.strictEmail && !genericEmail) return null;

  const confidence = genericEmail ? 95 : 82;
  return {
    ...firm,
    website: websiteUrl,
    emailGeneric: genericEmail?.email ?? "",
    emailOther: uniqueEmails
      .filter((entry) => entry.email !== genericEmail?.email)
      .map((entry) => entry.email)
      .slice(0, 5)
      .join(" | "),
    contactSourceUrl: genericEmail?.sourceUrl ?? firm.oecProfileUrl,
    websiteSourceUrl: websiteSourceUrl || firm.oecProfileUrl,
    contactConfidence: String(confidence),
    verificationStatus: genericEmail ? "ultra_fiable" : "phone_officiel_oec",
    verificationNotes: genericEmail
      ? "Fiche OEC officielle + telephone OEC + site OEC + email public sur le domaine du site officiel."
      : "Fiche OEC officielle + telephone OEC + site OEC; aucun email coherent trouve.",
    enrichedAt: new Date().toISOString(),
  };
}

async function crawlOfficialWebsite(startUrl: string, args: Args): Promise<CrawledPage[]> {
  const queue = [startUrl, ...LIKELY_CONTACT_PATHS.map((path) => new URL(path, startUrl).toString())];
  const seen = new Set<string>();
  const pages: CrawledPage[] = [];
  const root = rootDomain(startUrl);

  for (const url of queue) {
    if (pages.length >= args.maxSitePages) break;
    const normalized = normalizeUrl(url);
    if (!normalized || seen.has(normalized) || rootDomain(normalized) !== root) continue;
    seen.add(normalized);

    try {
      const page = await fetchPage(normalized, args.timeoutMs);
      pages.push(page);

      for (const link of extractInternalContactLinks(page.html, page.finalUrl || normalized)) {
        if (pages.length + queue.length > args.maxSitePages + 15) break;
        if (!seen.has(link) && rootDomain(link) === root) queue.push(link);
      }
    } catch {
      continue;
    }
  }

  return pages;
}

async function fetchText(url: string, timeoutMs: number) {
  const response = await fetchWithTimeout(url, timeoutMs);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

async function fetchPage(url: string, timeoutMs: number): Promise<CrawledPage> {
  const response = await fetchWithTimeout(url, timeoutMs);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
    throw new Error(`contenu ignore: ${contentType || "inconnu"}`);
  }
  return {
    url,
    finalUrl: response.url,
    html: await response.text(),
  };
}

function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "fr-FR,fr;q=0.9,en;q=0.6",
      "user-agent": USER_AGENT,
    },
    redirect: "follow",
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));
}

function extractSeed(html: string) {
  return firstMatch(html, /\/recherche\/2\?seed=(\d+)/i);
}

function extractProfileUrls(html: string) {
  const urls = [...html.matchAll(/href="(\/expert-comptable\/[^"]+)"/g)].map((match) => `${BASE_URL}${match[1]}`);
  return dedupe(urls, (url) => url);
}

function extractCabinetJsonLd(html: string) {
  const scripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.map((match) => match[1]).find((body) => body.includes("Cabinet d")) ?? "";
}

function readJsonString(jsonLike: string, key: string) {
  return decodeHtml(firstMatch(jsonLike, new RegExp(`"${escapeRegExp(key)}"\\s*:\\s*"([^"]*)"`, "i")) ?? "");
}

function extractFirmLinks(html: string) {
  const firmLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*data-firm-link="([^"]+)"[^>]*>/gi)].map((match) => ({
    href: decodeHtml(match[1]),
    label: decodeHtml(match[2]).toLowerCase(),
  }));

  return {
    website: firmLinks.find((link) => link.label.includes("site web"))?.href ?? "",
    linkedin: firmLinks.find((link) => link.label.includes("linkedin"))?.href ?? "",
  };
}

function extractOecId(html: string) {
  return firstMatch(html, /page-cabinet"[^>]+data-id="([^"]+)"/i) ?? "";
}

function extractTitleName(html: string) {
  return decodeHtml(firstMatch(html, /<h1[^>]*class="[^"]*firm-name[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function textBetweenMetaDescription(html: string) {
  return decodeHtml(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ?? "");
}

function extractInternalContactLinks(html: string, baseUrl: string) {
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ href: decodeHtml(match[1]), text: decodeHtml(match[2]).replace(/<[^>]*>/g, " ") }))
    .filter((link) => {
      const haystack = `${link.href} ${link.text}`.toLowerCase();
      return /contact|cabinet|agence|equipe|mentions|coordonnees|coordonnées/.test(haystack);
    })
    .map((link) => {
      try {
        return new URL(link.href, baseUrl).toString();
      } catch {
        return "";
      }
    })
    .filter(Boolean);

  return dedupe(links, (link) => normalizeUrl(link) ?? link);
}

function extractEmails(html: string) {
  const decoded = decodeHtml(html)
    .replace(/\\u0040/gi, "@")
    .replace(/\s*\[at]\s*/gi, "@")
    .replace(/\s*\(at\)\s*/gi, "@")
    .replace(/\s+@\s+/g, "@")
    .replace(/\s+\.\s+/g, ".");

  const emails = [...decoded.matchAll(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)].map((match) =>
    match[0].toLowerCase().replace(/^mailto:/i, "").replace(/[).,;:]+$/g, ""),
  );

  return dedupe(emails, (email) => email);
}

function isValidEmail(email: string) {
  const value = email.toLowerCase();
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) return false;
  if (BAD_EMAIL_PARTS.some((part) => value.includes(part))) return false;
  if (BAD_EMAIL_PREFIXES.some((prefix) => value.startsWith(`${prefix}@`))) return false;
  if (/\.(png|jpg|jpeg|gif|webp|svg|pdf|css|js)$/i.test(value)) return false;

  const domain = value.split("@")[1] ?? "";
  if (!domain || domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return false;
  return true;
}

function isGenericEmail(email: string) {
  const local = email.split("@")[0]?.toLowerCase() ?? "";
  return GENERIC_EMAIL_PREFIXES.some((prefix) => local === prefix || local.startsWith(`${prefix}.`) || local.startsWith(`${prefix}-`));
}

function normalizeUrl(url: string) {
  const value = decodeHtml(url).trim();
  if (!value || value.startsWith("mailto:") || value.startsWith("tel:")) return "";
  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (!["http:", "https:"].includes(parsed.protocol)) return "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

function normalizeFrenchPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("33") && digits.length === 11 ? `0${digits.slice(2)}` : digits;
  if (normalized.length !== 10 || !normalized.startsWith("0")) return phone.trim();
  return normalized.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function rootDomain(urlOrEmail: string) {
  let value = urlOrEmail.trim().toLowerCase();
  if (!value) return "";
  if (value.includes("@")) value = value.slice(value.lastIndexOf("@") + 1);
  try {
    if (/^https?:\/\//i.test(value)) value = new URL(value).hostname;
  } catch {
    return "";
  }
  value = value.replace(/^www\./, "");
  const parts = value.split(".").filter(Boolean);
  if (parts.length <= 2) return parts.join(".");
  return parts.slice(-2).join(".");
}

function buildDedupeKey(contact: VerifiedContact) {
  if (contact.emailGeneric) return `email:${contact.emailGeneric.toLowerCase()}`;
  return `phone:${contact.phoneStandard.replace(/\D/g, "")}`;
}

async function writeCsv(outputPath: string, rows: VerifiedContact[]) {
  await mkdir(dirname(outputPath), { recursive: true });
  const csv = [
    "sep=;",
    HEADERS.join(";"),
    ...rows.map((row) => HEADERS.map((header) => csvEscape(row[header])).join(";")),
  ].join("\r\n");
  await writeFile(outputPath, `\uFEFF${csv}\r\n`, "utf8");
}

function csvEscape(value: string) {
  if (value.includes('"') || value.includes(";") || value.includes("\n") || value.includes("\r")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function firstMatch(text: string, pattern: RegExp) {
  return text.match(pattern)?.[1];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function dedupe<T>(items: T[], keyOf: (item: T) => string) {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyOf(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function sleep(ms: number) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function messageOf(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
