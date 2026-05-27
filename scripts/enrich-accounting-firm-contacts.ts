/**
 * Enrichit une base de cabinets comptables avec des coordonnees publiques.
 *
 * Strategie:
 * 1. Lire le CSV genere par leads:cabinets.
 * 2. Chercher une source publique via DuckDuckGo HTML.
 * 3. Privilegier le site officiel du cabinet, puis crawler quelques pages utiles.
 * 4. Extraire uniquement les emails/telephones publies, sans deviner d'adresses.
 * 5. Garder les URLs sources et scores de confiance.
 *
 * Usage:
 *   npm run contacts:cabinets -- --limit=50
 *   npm run contacts:cabinets -- --priority=A --limit=150
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const DEFAULT_INPUT = "Acquisition/outbound/cabinets-comptables-france-excel.csv";
const DEFAULT_OUTPUT = "Acquisition/outbound/cabinets-comptables-france-enriched-excel.csv";
const USER_AGENT =
  process.env.CONTACT_ENRICHMENT_USER_AGENT ??
  "Mozilla/5.0 (compatible; StellarWaveContactEnrichment/0.1; +https://stellarwave.fr)";

type CsvRow = Record<string, string>;

type Args = {
  input: string;
  output: string;
  priority: string;
  limit: number;
  start: number;
  maxSitePages: number;
  delayMs: number;
  timeoutMs: number;
  respectRobots: boolean;
  help: boolean;
};

type SearchResult = {
  title: string;
  url: string;
  host: string;
  isDirectory: boolean;
};

type FetchedPage = {
  url: string;
  finalUrl: string;
  html: string;
  text: string;
};

type ContactExtraction = {
  emails: string[];
  genericEmails: string[];
  phones: string[];
};

type Enrichment = {
  website: string;
  emailGeneric: string;
  phoneStandard: string;
  emailOther: string;
  contactSourceUrl: string;
  websiteSourceUrl: string;
  websiteConfidence: string;
  contactConfidence: string;
  enrichmentStatus: string;
  enrichmentNotes: string;
  enrichedAt: string;
};

type OfficialCandidate = {
  url: string;
  host: string;
  score: number;
  title: string;
};

const EXTRA_HEADERS: (keyof Enrichment)[] = [
  "emailOther",
  "contactSourceUrl",
  "websiteSourceUrl",
  "websiteConfidence",
  "contactConfidence",
  "enrichmentStatus",
  "enrichmentNotes",
  "enrichedAt",
];

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
];

const DIRECTORY_HOSTS = new Set([
  "36comptables.com",
  "allbiz.fr",
  "annuaire-entreprises.data.gouv.fr",
  "annuaire.experts-comptables.org",
  "airlocal.com",
  "autour-de-moi.com",
  "cabinet-comptable-devis.fr",
  "cabinets-experts-comptables.fr",
  "comptable-micro-entreprise.fr",
  "comptable-pour-entreprise.fr",
  "consultant-expert.fr",
  "cylex-locale.fr",
  "datalegal.fr",
  "dataprospects.fr",
  "compteo.fr",
  "comptable-profession-liberale.fr",
  "commerce-brioudesudauvergne.fr",
  "e-pro.fr",
  "expert-comptable.net",
  "expert-comptable-cabinet.com",
  "expert-comptable-devis.fr",
  "findeo.fr",
  "francebilan.fr",
  "gowork.fr",
  "horairesdouverture24.fr",
  "hoodspot.fr",
  "ilicompta.fr",
  "infobel.com",
  "infonet.fr",
  "kelest.fr",
  "kompass.com",
  "lagazettefrance.fr",
  "manageo.fr",
  "oecnouvelle-aquitaine.fr",
  "obteniruncontact.com",
  "pagesjaunes.fr",
  "pappers.fr",
  "rubypayeur.com",
  "societe.com",
  "services.e-pro.fr",
  "site-solocal.com",
  "solocal.com",
  "starofservice.com",
  "tel.fr",
  "telephone.city",
  "toutendroit.com",
  "verif.com",
  "118000.fr",
  "118712.fr",
  "dnb.com",
  "viaexperts.fr",
]);

const TRUSTED_PHONE_DIRECTORY_HOSTS = new Set([
  "allbiz.fr",
  "annuaire.experts-comptables.org",
  "compteo.fr",
  "cylex-locale.fr",
  "oecnouvelle-aquitaine.fr",
  "pagesjaunes.fr",
  "118000.fr",
]);

const OFFICIAL_BLOCKED_HOST_PARTS = [
  "annuaire-entreprises.data.gouv.fr",
  "bing.com",
  "bilan-entreprises.com",
  "bodacc.fr",
  "36comptables.com",
  "airlocal.com",
  "autour-de-moi.com",
  "cabinet-comptable-devis.fr",
  "cabinets-experts-comptables.fr",
  "comptable-micro-entreprise.fr",
  "comptable-pour-entreprise.fr",
  "consultant-expert.fr",
  "cylex-locale.fr",
  "datalegal.fr",
  "dataprospects.fr",
  "duckduckgo.com",
  "commerce-brioudesudauvergne.fr",
  "e-pro.fr",
  "expert-comptable-devis.fr",
  "ellisphere.fr",
  "entreprises.lefigaro.fr",
  "facebook.com",
  "find-and-update.company-information.service.gov.uk",
  "francebilan.fr",
  "google.",
  "hoodspot.fr",
  "horairesdouverture24.fr",
  "infonet.fr",
  "instagram.com",
  "infobel.com",
  "journaldunet.com",
  "lagazettefrance.fr",
  "linkedin.com",
  "manageo.fr",
  "maps.google",
  "mercantile.fr",
  "obteniruncontact.com",
  "pappers.fr",
  "pagesjaunes.fr",
  "societe.com",
  "site-solocal.com",
  "solocal.com",
  "starofservice.com",
  "tel.fr",
  "toutendroit.com",
  "dnb.com",
  "viaexperts.fr",
  "twitter.com",
  "x.com",
  "youtube.com",
];

const BLOCKED_PHONE_DIGITS = new Set([
  "0123456789",
  "0102900001",
  "0184801212",
  "0236400024",
  "0260520171",
  "0448326497",
]);

const GENERIC_COMPANY_TOKENS = new Set([
  "AUDIT",
  "AUDITEURS",
  "CABINET",
  "COMPTABLE",
  "COMPTABLES",
  "CONSEIL",
  "CONSEILS",
  "EXPERT",
  "EXPERTISE",
  "EXPERTS",
  "FIDUCIAIRE",
  "GESTION",
  "SOCIETE",
  "SOC",
  "SARL",
  "SAS",
  "SASU",
  "SELARL",
  "EURL",
  "ASSOCIE",
  "ASSOCIES",
  "ET",
  "DE",
  "DU",
  "DES",
  "LA",
  "LE",
  "LES",
  "L",
  "D",
  "A",
  "EN",
  "FRANCE",
]);

const robotsCache = new Map<string, Promise<string[]>>();

function parseArgs(argv: string[]): Args {
  const args: Args = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    priority: "A",
    limit: 150,
    start: 0,
    maxSitePages: 5,
    delayMs: 900,
    timeoutMs: 12_000,
    respectRobots: true,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--no-robots") args.respectRobots = false;
    else if (arg.startsWith("--input=")) args.input = valueOf(arg);
    else if (arg.startsWith("--output=")) args.output = valueOf(arg);
    else if (arg.startsWith("--priority=")) args.priority = valueOf(arg);
    else if (arg.startsWith("--limit=")) args.limit = parseNonNegativeInteger(arg, "limit");
    else if (arg.startsWith("--start=")) args.start = parseNonNegativeInteger(arg, "start");
    else if (arg.startsWith("--max-site-pages=")) {
      args.maxSitePages = parseNonNegativeInteger(arg, "max-site-pages");
    } else if (arg.startsWith("--delay-ms=")) {
      args.delayMs = parseNonNegativeInteger(arg, "delay-ms");
    } else if (arg.startsWith("--timeout-ms=")) {
      args.timeoutMs = parseNonNegativeInteger(arg, "timeout-ms");
    } else {
      throw new Error(`Argument inconnu: ${arg}. Utilise --help pour voir les options.`);
    }
  }

  return args;
}

function valueOf(arg: string) {
  return arg.slice(arg.indexOf("=") + 1).trim();
}

function parseNonNegativeInteger(arg: string, name: string) {
  const value = Number.parseInt(valueOf(arg), 10);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`--${name} doit etre un entier positif ou nul.`);
  }
  return value;
}

function printHelp() {
  console.log(`
Usage:
  npm run contacts:cabinets -- [options]

Options:
  --input=path.csv             CSV source genere par leads:cabinets.
  --output=path.csv            CSV enrichi de sortie.
  --priority=A                 Priorite a traiter. Mets "all" pour tout traiter.
  --limit=150                  Nombre de lignes a enrichir.
  --start=0                    Decalage dans les lignes ciblees.
  --max-site-pages=5           Nombre maximum de pages a crawler sur le site officiel.
  --delay-ms=900               Pause entre deux cabinets.
  --timeout-ms=12000           Timeout par requete HTTP.
  --no-robots                  Desactive le controle robots.txt.

Exemples:
  npm run contacts:cabinets -- --limit=20
  npm run contacts:cabinets -- --priority=A --limit=150
  npm run contacts:cabinets -- --priority=all --limit=300 --delay-ms=1200
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const inputPath = resolve(process.cwd(), args.input);
  const csv = await readFile(inputPath, "utf8");
  const { headers, rows, delimiter } = parseCsv(csv);
  const outputHeaders = mergeHeaders(headers, ["website", "emailGeneric", "phoneStandard", ...EXTRA_HEADERS]);

  const targets = rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => args.priority === "all" || row.priority === args.priority)
    .slice(args.start, args.start + args.limit);

  console.log(`-> ${rows.length} lignes chargees depuis ${inputPath}`);
  console.log(`-> ${targets.length} cabinets a enrichir (priority=${args.priority})`);

  for (const [position, target] of targets.entries()) {
    const label = `${target.row.companyName} (${target.row.postalCode} ${target.row.city})`;
    console.log(`\n[${position + 1}/${targets.length}] ${label}`);
    const enrichment = await enrichRow(target.row, args);
    Object.assign(target.row, enrichment);
    console.log(
      `   ${enrichment.enrichmentStatus} | site=${enrichment.website || "-"} | email=${
        enrichment.emailGeneric || "-"
      } | tel=${enrichment.phoneStandard || "-"}`,
    );

    if (position < targets.length - 1 && args.delayMs > 0) {
      await wait(args.delayMs);
    }
  }

  const outputPath = resolve(process.cwd(), args.output);
  await writeFile(outputPath, toCsv(rows, outputHeaders, delimiter), "utf8");
  console.log(`\nOK: CSV enrichi -> ${outputPath}`);
}

async function enrichRow(row: CsvRow, args: Args): Promise<Enrichment> {
  const notes: string[] = [];
  const enrichedAt = new Date().toISOString();

  try {
    const results = await searchCabinet(row, args);
    const official = chooseOfficialCandidate(results, row);
    const directoryResults = results.filter((result) => result.isDirectory).slice(0, 4);

    let pages: FetchedPage[] = [];
    let website = cleanUrl(row.website) || "";
    let websiteConfidence = 0;
    let websiteSourceUrl = "";

    if (website) {
      websiteConfidence = 70;
      websiteSourceUrl = website;
      pages = await crawlOfficialSite(website, args);
    } else if (official && official.score >= 45) {
      website = originOf(official.url);
      websiteConfidence = Math.min(100, official.score);
      websiteSourceUrl = official.url;
      pages = await crawlOfficialSite(official.url, args);
      notes.push(`site candidat: ${official.title}`);
    } else {
      notes.push("site officiel non trouve avec confiance suffisante");
    }

    const officialContacts = extractFromPages(pages);
    let genericEmail = chooseBestEmail(officialContacts.genericEmails, website);
    let emailOther = officialContacts.emails.find((email) => email !== genericEmail) ?? "";
    let phone = officialContacts.phones[0] ?? "";
    let contactSourceUrl = sourceForContact(pages, genericEmail || phone);
    let contactConfidence = scoreContactConfidence({
      websiteConfidence,
      hasGenericEmail: Boolean(genericEmail),
      hasPhone: Boolean(phone),
      sourceIsOfficial: Boolean(pages.length),
    });

    if (!phone && directoryResults.length > 0) {
      const directoryContact = await enrichFromDirectories(directoryResults, row, args);
      if (directoryContact.phones.length > 0) {
        phone = directoryContact.phones[0];
        contactSourceUrl = contactSourceUrl || directoryContact.sourceUrl;
        contactConfidence = Math.max(contactConfidence, directoryContact.confidence);
        notes.push(`telephone issu annuaire: ${hostOf(directoryContact.sourceUrl)}`);
      }
    }

    const status = statusFor({ website, genericEmail, emailOther, phone });

    return {
      website,
      emailGeneric: genericEmail,
      phoneStandard: phone,
      emailOther,
      contactSourceUrl,
      websiteSourceUrl,
      websiteConfidence: String(websiteConfidence),
      contactConfidence: String(contactConfidence),
      enrichmentStatus: status,
      enrichmentNotes: notes.join(" | "),
      enrichedAt,
    };
  } catch (error) {
    return {
      website: row.website ?? "",
      emailGeneric: row.emailGeneric ?? "",
      phoneStandard: row.phoneStandard ?? "",
      emailOther: row.emailOther ?? "",
      contactSourceUrl: row.contactSourceUrl ?? "",
      websiteSourceUrl: row.websiteSourceUrl ?? "",
      websiteConfidence: row.websiteConfidence ?? "0",
      contactConfidence: row.contactConfidence ?? "0",
      enrichmentStatus: "error",
      enrichmentNotes: `${notes.join(" | ")}${notes.length ? " | " : ""}${errorMessage(error)}`,
      enrichedAt,
    };
  }
}

async function searchCabinet(row: CsvRow, args: Args): Promise<SearchResult[]> {
  const query = [
    row.companyName,
    row.postalCode,
    row.city,
    "expert comptable contact",
  ]
    .filter(Boolean)
    .join(" ");
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const html = await fetchText(url, args.timeoutMs);
  return parseDuckDuckGoResults(html);
}

function parseDuckDuckGoResults(html: string): SearchResult[] {
  const decoded = decodeHtml(html);
  const results: SearchResult[] = [];
  const linkRegex = /class="result__a"\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(decoded)) !== null) {
    const url = decodeDuckUrl(match[1]);
    if (!url) continue;

    const host = hostOf(url);
    if (!host) continue;

    results.push({
      title: stripTags(match[2]),
      url,
      host,
      isDirectory: isDirectoryHost(host),
    });
  }

  return uniqueBy(results, (result) => result.url).slice(0, 12);
}

function decodeDuckUrl(rawHref: string) {
  const href = rawHref.startsWith("//") ? `https:${rawHref}` : rawHref;
  try {
    const parsed = new URL(href);
    const uddg = parsed.searchParams.get("uddg");
    return uddg ? decodeURIComponent(uddg) : parsed.href;
  } catch {
    return "";
  }
}

function chooseOfficialCandidate(results: SearchResult[], row: CsvRow): OfficialCandidate | undefined {
  const candidates = results
    .filter((result) => !result.isDirectory && !isOfficialBlocked(result.host))
    .map((result) => {
      const brandTokens = significantBrandTokens(row.companyName);
      const normalizedTitle = normalize(result.title);
      const normalizedHost = normalize(result.host);
      const normalizedCity = normalize(row.city);
      const normalizedCompany = normalizeCompany(row.companyName);
      let score = 20;
      let hostTokenMatches = 0;

      if (result.host.endsWith(".fr")) score += 8;
      if (normalizedTitle.includes(normalizedCompany) && normalizedCompany.length > 8) score += 25;
      if (normalizedTitle.includes(normalizedCity) && normalizedCity) score += 8;
      if (result.title.includes(row.postalCode)) score += 8;
      if (/(expert|comptable|audit|cabinet|conseil)/i.test(result.title)) score += 8;

      let tokenMatches = 0;
      for (const token of brandTokens) {
        if (normalizedHost.includes(token)) {
          score += 18;
          tokenMatches += 1;
          hostTokenMatches += 1;
        }
        if (normalizedTitle.includes(token)) {
          score += 10;
          tokenMatches += 1;
        }
      }

      if (brandTokens.length === 0 && normalizedTitle.includes(normalizedCompany)) score += 12;
      if (result.url.includes("/contact")) score += 4;
      if (brandTokens.length > 0 && tokenMatches === 0) score -= 20;
      if (hostTokenMatches === 0 && !/(EXPERT|COMPT|AUDIT|CABINET|FIDUC|EC)/.test(normalizedHost)) {
        score -= 40;
      }
      if (brandTokens.length === 0 && !normalizedHost.includes(compact(normalizedCompany))) {
        score -= 25;
      }

      return { url: result.url, host: result.host, score, title: result.title };
    })
    .sort((a, b) => b.score - a.score);

  return candidates[0];
}

async function crawlOfficialSite(startUrl: string, args: Args): Promise<FetchedPage[]> {
  const start = cleanUrl(startUrl);
  if (!start) return [];

  const origin = originOf(start);
  const queue = [start];
  const visited = new Set<string>();
  const pages: FetchedPage[] = [];

  while (queue.length > 0 && pages.length < args.maxSitePages) {
    const url = queue.shift();
    if (!url || visited.has(url)) continue;
    visited.add(url);

    if (args.respectRobots && !(await isAllowedByRobots(url, args))) continue;

    const page = await fetchPage(url, args.timeoutMs);
    if (!page) continue;

    pages.push(page);

    const links = extractLinks(page.html, page.finalUrl)
      .filter((link) => link.startsWith(origin))
      .filter((link) => isUsefulContactPath(link))
      .filter((link) => !visited.has(link));

    queue.push(...links);
  }

  return pages;
}

async function enrichFromDirectories(
  results: SearchResult[],
  row: CsvRow,
  _args: Args,
): Promise<{ phones: string[]; sourceUrl: string; confidence: number }> {
  for (const result of results) {
    if (!isTrustedPhoneDirectory(result.host)) continue;

    const titlePhones = extractContacts(`${result.title} ${result.url}`).phones;
    if (titlePhones.length > 0 && resultMatchesCabinet(result.title, row)) {
      return {
        phones: titlePhones,
        sourceUrl: result.url,
        confidence: 62,
      };
    }
  }

  return { phones: [], sourceUrl: "", confidence: 0 };
}

function isTrustedPhoneDirectory(host: string) {
  return [...TRUSTED_PHONE_DIRECTORY_HOSTS].some(
    (trustedHost) => host === trustedHost || host.endsWith(`.${trustedHost}`),
  );
}

function resultMatchesCabinet(text: string, row: CsvRow) {
  const normalizedText = normalize(text);
  const city = normalize(row.city);
  const companyTokens = significantBrandTokens(row.companyName);
  const cityMatches = city ? normalizedText.includes(city) : true;
  const postalMatches = row.postalCode ? normalizedText.includes(row.postalCode) : true;
  const brandMatches =
    companyTokens.length === 0 ||
    companyTokens.some((token) => normalizedText.includes(token));

  return brandMatches && (cityMatches || postalMatches);
}

async function fetchPage(url: string, timeoutMs: number): Promise<FetchedPage | undefined> {
  try {
    const html = await fetchText(url, timeoutMs);
    const text = htmlToText(html);
    return { url, finalUrl: url, html, text };
  } catch {
    return undefined;
  }
}

async function fetchText(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "fr-FR,fr;q=0.9,en;q=0.5",
        "user-agent": USER_AGENT,
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType && !/text|html|xml/i.test(contentType)) {
      throw new Error(`content-type non HTML: ${contentType}`);
    }

    const text = await response.text();
    return text.slice(0, 1_500_000);
  } finally {
    clearTimeout(timeout);
  }
}

async function isAllowedByRobots(url: string, args: Args) {
  const parsed = safeUrl(url);
  if (!parsed) return false;

  const origin = parsed.origin;
  const rulesPromise =
    robotsCache.get(origin) ??
    fetchRobots(origin, args.timeoutMs).catch(() => [] as string[]);

  robotsCache.set(origin, rulesPromise);

  const disallowRules = await rulesPromise;
  const path = `${parsed.pathname}${parsed.search}`;
  return !disallowRules.some((rule) => rule && path.startsWith(rule));
}

async function fetchRobots(origin: string, timeoutMs: number): Promise<string[]> {
  const text = await fetchText(`${origin}/robots.txt`, Math.min(timeoutMs, 5000));
  const rules: string[] = [];
  let applies = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, "").trim();
    if (!line) continue;

    const [rawKey, ...rawValue] = line.split(":");
    const key = rawKey.trim().toLowerCase();
    const value = rawValue.join(":").trim();

    if (key === "user-agent") {
      applies = value === "*" || /stellarwave|mozilla/i.test(value);
    } else if (applies && key === "disallow" && value) {
      rules.push(value);
    }
  }

  return rules;
}

function extractFromPages(pages: FetchedPage[]): ContactExtraction {
  const contacts = pages.map((page) => extractContacts(page.html));
  return {
    emails: unique(contacts.flatMap((contact) => contact.emails)),
    genericEmails: unique(contacts.flatMap((contact) => contact.genericEmails)),
    phones: unique(contacts.flatMap((contact) => contact.phones)),
  };
}

function extractContacts(html: string): ContactExtraction {
  const decoded = normalizeObfuscatedEmails(decodeHtml(html));
  const emails = extractEmails(decoded);
  const phones = extractPhones(decoded);
  const genericEmails = emails.filter(isGenericEmail);

  return {
    emails,
    genericEmails,
    phones,
  };
}

function extractEmails(text: string) {
  const matches = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  return unique(
    matches
      .map((email) => email.toLowerCase().replace(/^mailto:/, "").replace(/[.,;:)]$/, ""))
      .filter((email) => !isBadEmail(email)),
  );
}

function isBadEmail(email: string) {
  const domain = email.split("@")[1] ?? "";
  return (
    !domain ||
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    domain.includes("..") ||
    email.includes("@example.") ||
    email.includes("@domain.") ||
    email.includes("@email.fr") ||
    email.includes("@airlocal.com") ||
    email.includes("@dataprospects.fr") ||
    email.includes("@sentry.") ||
    email.includes("@wixpress.") ||
    /\.(png|jpg|jpeg|gif|webp|svg|pdf)$/i.test(email) ||
    /^(noreply|no-reply|nepasrepondre|privacy|rgpd|dpo)@/i.test(email)
  );
}

function isGenericEmail(email: string) {
  const prefix = email.split("@")[0].replace(/[._-].*/, "");
  return GENERIC_EMAIL_PREFIXES.includes(prefix);
}

function chooseBestEmail(emails: string[], website: string) {
  if (emails.length === 0) return "";
  const websiteHost = hostOf(website);
  if (!websiteHost) return emails[0];

  const compactWebsite = compact(normalize(websiteHost.replace(/^www\./, "")));
  const matchingDomain = emails.find((email) => {
    const domain = email.split("@")[1] ?? "";
    const compactDomain = compact(normalize(domain.replace(/^www\./, "")));
    return (
      compactDomain === compactWebsite ||
      compactDomain.includes(compactWebsite) ||
      compactWebsite.includes(compactDomain)
    );
  });

  return matchingDomain ?? emails[0];
}

function normalizeObfuscatedEmails(text: string) {
  return text
    .replace(/\s*(\[at\]|\(at\)|\{at\}| arobase | at )\s*/gi, "@")
    .replace(/\s*(\[dot\]|\(dot\)|\{dot\}| point | dot )\s*/gi, ".");
}

function extractPhones(text: string) {
  const candidates = [
    ...Array.from(text.matchAll(/href=["']tel:([^"']+)["']/gi), (match) => match[1]),
    ...(text.match(/(?:(?:\+|00)33[\s().-]?[1-9](?:[\s().-]?\d{2}){4}|0[1-9](?:[\s().-]?\d{2}){4})/g) ?? []),
  ];

  return unique(
    candidates
      .map(normalizeFrenchPhone)
      .filter((phone): phone is string => Boolean(phone))
      .filter((phone) => !isBlockedPhone(phone))
      .filter(isStandardFrenchPhone),
  );
}

function normalizeFrenchPhone(value: string) {
  let digits = value.replace(/[^\d+]/g, "");
  if (digits.startsWith("+33")) digits = `0${digits.slice(3)}`;
  if (digits.startsWith("0033")) digits = `0${digits.slice(4)}`;
  digits = digits.replace(/\D/g, "");

  if (!/^0\d{9}$/.test(digits)) return "";
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

function isStandardFrenchPhone(phone: string) {
  return /^0[1-5]|^09/.test(phone.replace(/\s/g, ""));
}

function isBlockedPhone(phone: string) {
  return BLOCKED_PHONE_DIGITS.has(phone.replace(/\D/g, ""));
}

function sourceForContact(pages: FetchedPage[], value: string) {
  if (!value) return "";
  const normalizedValue = value.replace(/\s/g, "");

  const match = pages.find((page) => {
    const content = page.html.replace(/\s/g, "");
    return content.includes(normalizedValue) || page.html.toLowerCase().includes(value.toLowerCase());
  });

  return match?.finalUrl ?? pages[0]?.finalUrl ?? "";
}

function scoreContactConfidence(input: {
  websiteConfidence: number;
  hasGenericEmail: boolean;
  hasPhone: boolean;
  sourceIsOfficial: boolean;
}) {
  if (!input.sourceIsOfficial) return 0;
  let score = Math.min(input.websiteConfidence, 80);
  if (input.hasGenericEmail) score += 12;
  if (input.hasPhone) score += 8;
  return Math.min(100, score);
}

function statusFor(input: {
  website: string;
  genericEmail: string;
  emailOther: string;
  phone: string;
}) {
  if (input.genericEmail && input.phone) return "contact_complete";
  if (input.genericEmail) return "email_only";
  if (input.phone) return "phone_only";
  if (input.website && input.emailOther) return "manual_review_email";
  if (input.website) return "website_only";
  return "not_found";
}

function extractLinks(html: string, baseUrl: string) {
  const links: string[] = [];
  const linkRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = decodeHtml(match[1]);
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) continue;

    try {
      const url = new URL(href, baseUrl);
      url.hash = "";
      links.push(url.href.replace(/\/$/, ""));
    } catch {
      // Ignore invalid links.
    }
  }

  return unique(links);
}

function isUsefulContactPath(url: string) {
  const parsed = safeUrl(url);
  if (!parsed) return false;
  const path = normalize(`${parsed.pathname} ${parsed.search}`);
  return (
    path === "" ||
    path === "/" ||
    /(CONTACT|MENTION|LEGAL|CABINET|AGENCE|IMPLANTATION|EQUIPE|QUI-SOMMES|NOUS-CONTACTER|COORDONNEES)/.test(
      path,
    )
  );
}

function parseCsv(csv: string): { headers: string[]; rows: CsvRow[]; delimiter: "," | ";" } {
  const normalized = csv.replace(/^\uFEFF/, "");
  const lines = normalized.split(/\r?\n/).filter((line) => line.length > 0);
  let delimiter: "," | ";" = ",";

  if (lines[0]?.startsWith("sep=")) {
    delimiter = lines.shift()?.slice(4, 5) === ";" ? ";" : ",";
  } else {
    delimiter = (lines[0]?.split(";").length ?? 0) > (lines[0]?.split(",").length ?? 0) ? ";" : ",";
  }

  const headers = parseCsvLine(lines.shift() ?? "", delimiter);
  const rows = lines.map((line) => {
    const cells = parseCsvLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });

  return { headers, rows, delimiter };
}

function parseCsvLine(line: string, delimiter: "," | ";") {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells;
}

function toCsv(rows: CsvRow[], headers: string[], delimiter: "," | ";") {
  return [
    `\uFEFFsep=${delimiter}`,
    headers.join(delimiter),
    ...rows.map((row) => headers.map((header) => csvCell(row[header] ?? "")).join(delimiter)),
  ].join("\n");
}

function csvCell(value: string) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function mergeHeaders(headers: string[], additions: string[]) {
  const merged = [...headers];
  for (const header of additions) {
    if (!merged.includes(header)) merged.push(header);
  }
  return merged;
}

function cleanUrl(value: string) {
  if (!value) return "";
  const trimmed = value.trim();
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    url.hash = "";
    return url.href.replace(/\/$/, "");
  } catch {
    return "";
  }
}

function originOf(url: string) {
  const parsed = safeUrl(url);
  return parsed?.origin ?? "";
}

function hostOf(url: string) {
  const parsed = safeUrl(url);
  if (!parsed) return "";
  return parsed.hostname.replace(/^www\./, "").toLowerCase();
}

function safeUrl(url: string) {
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

function isDirectoryHost(host: string) {
  return [...DIRECTORY_HOSTS].some((directoryHost) => host === directoryHost || host.endsWith(`.${directoryHost}`));
}

function isOfficialBlocked(host: string) {
  return OFFICIAL_BLOCKED_HOST_PARTS.some((blocked) => host.includes(blocked));
}

function significantBrandTokens(name: string) {
  const tokens = normalize(name)
    .split(/[^A-Z0-9]+/)
    .filter((token) => token.length >= 3)
    .filter((token) => !GENERIC_COMPANY_TOKENS.has(token));

  return unique(tokens).slice(0, 5);
}

function normalizeCompany(name: string) {
  return normalize(name)
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(SARL|SAS|SASU|SELARL|EURL|SA|SCI)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value: string) {
  return decodeHtml(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function compact(value: string) {
  return value.replace(/[^A-Z0-9]/g, "");
}

function htmlToText(html: string) {
  return stripTags(
    decodeHtml(
      html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<br\s*\/?>/gi, "\n"),
    ),
  );
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function uniqueBy<T>(values: T[], key: (value: T) => string) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const itemKey = key(value);
    if (seen.has(itemKey)) return false;
    seen.add(itemKey);
    return true;
  });
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

main().catch((error) => {
  console.error("Erreur enrichissement:", error);
  process.exit(1);
});
