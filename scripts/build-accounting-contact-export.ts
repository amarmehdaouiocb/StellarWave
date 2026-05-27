/**
 * Assemble les exports de prospection cabinets comptables en une liste courte.
 *
 * Priorite:
 * 1. OEC + telephone + site + email verifie sur le domaine du site.
 * 2. Site officiel + telephone + email coherent issus de l'enrichissement web.
 * 3. OEC + telephone + site officiels, sans email.
 */
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

type CsvRow = Record<string, string>;

type Args = {
  output: string;
  limit: number;
  inputs: string[];
  inputDirs: string[];
  help: boolean;
};

type ExportRow = {
  companyName: string;
  address: string;
  postalCode: string;
  city: string;
  phoneStandard: string;
  emailGeneric: string;
  emailOther: string;
  website: string;
  linkedinUrl: string;
  oecProfileUrl: string;
  oecId: string;
  siren: string;
  siret: string;
  contactSourceUrl: string;
  websiteSourceUrl: string;
  contactConfidence: string;
  verificationStatus: string;
  verificationNotes: string;
  priority: string;
  sourceFile: string;
  enrichedAt: string;
};

const DEFAULT_INPUTS = [
  "Acquisition/outbound/cabinets-comptables-oec-ultra-fiables-excel.csv",
  "Acquisition/outbound/cabinets-comptables-oec-test-excel.csv",
  "Acquisition/outbound/cabinets-comptables-france-enriched-excel.csv",
  "Acquisition/outbound/cabinets-comptables-france-large-enriched-excel.csv",
  "Acquisition/outbound/cabinets-comptables-query-cabinet-comptable-enriched-excel.csv",
  "Acquisition/outbound/cabinets-comptables-oec-100-telephone-site-excel.csv",
  "Acquisition/outbound/cabinets-comptables-oec-telephone-site-pass2-excel.csv",
];

const DEFAULT_OUTPUT = "Acquisition/outbound/cabinets-comptables-100-ultra-fiables-excel.csv";

const HEADERS: (keyof ExportRow)[] = [
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
  "siren",
  "siret",
  "contactSourceUrl",
  "websiteSourceUrl",
  "contactConfidence",
  "verificationStatus",
  "verificationNotes",
  "priority",
  "sourceFile",
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

function parseArgs(argv: string[]): Args {
  const args: Args = {
    output: DEFAULT_OUTPUT,
    limit: 100,
    inputs: [],
    inputDirs: [],
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg.startsWith("--output=")) args.output = valueOf(arg);
    else if (arg.startsWith("--limit=")) args.limit = parsePositiveInteger(arg, "limit");
    else if (arg.startsWith("--input=")) args.inputs.push(valueOf(arg));
    else if (arg.startsWith("--input-dir=")) args.inputDirs.push(valueOf(arg));
    else throw new Error(`Argument inconnu: ${arg}. Utilise --help pour voir les options.`);
  }

  if (args.inputs.length === 0 && args.inputDirs.length === 0) args.inputs = DEFAULT_INPUTS;
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
  npm run contacts:export -- --limit=100

Options:
  --output=PATH   CSV de sortie compatible Excel.
  --limit=N       Nombre de lignes a exporter. Defaut: 100.
  --input=PATH    Source CSV a inclure. Repetable.
  --input-dir=DIR Dossier contenant des CSV source. Repetable.
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const candidates: ExportRow[] = [];
  const inputs = [...args.inputs, ...(await expandInputDirs(args.inputDirs))];
  for (const input of inputs) {
    const inputPath = resolve(process.cwd(), input);
    const rows = await readCsvIfExists(inputPath);
    for (const row of rows) {
      const normalized = normalizeRow(row, input);
      if (normalized) candidates.push(normalized);
    }
  }

  const sorted = candidates.sort((a, b) => priorityRank(a) - priorityRank(b));
  const selected = selectUnique(sorted, args.limit);

  await writeCsv(resolve(process.cwd(), args.output), selected);

  const emailCount = selected.filter((row) => row.emailGeneric).length;
  const phoneOnlyCount = selected.length - emailCount;
  console.log(`Export termine: ${args.output}`);
  console.log(`Lignes exportees: ${selected.length}`);
  console.log(`Avec email verifie: ${emailCount}`);
  console.log(`Telephone + site OEC sans email: ${phoneOnlyCount}`);
}

async function expandInputDirs(inputDirs: string[]) {
  const files: string[] = [];
  for (const inputDir of inputDirs) {
    const dir = resolve(process.cwd(), inputDir);
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".csv")) {
        files.push(`${inputDir.replace(/[\\/]$/, "")}/${entry.name}`);
      }
    }
  }
  return files.sort();
}

async function readCsvIfExists(path: string) {
  try {
    const content = await readFile(path, "utf8");
    return parseCsv(content.replace(/^\uFEFF/, ""));
  } catch {
    return [];
  }
}

function parseCsv(content: string): CsvRow[] {
  const clean = content.startsWith("sep=") ? content.slice(content.indexOf("\n") + 1) : content;
  const table = parseDelimited(clean, ";");
  if (table.length < 2) return [];

  const headers = table[0].map((header) => header.trim());
  return table.slice(1).filter((row) => row.some(Boolean)).map((row) => {
    const record: CsvRow = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });
}

function parseDelimited(content: string, delimiter: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function normalizeRow(row: CsvRow, sourceFile: string): ExportRow | null {
  if (row.verificationStatus) return normalizeOecRow(row, sourceFile);
  return normalizeEnrichedRow(row, sourceFile);
}

function normalizeOecRow(row: CsvRow, sourceFile: string): ExportRow | null {
  if (!row.companyName || !row.phoneStandard) return null;
  if (!row.website && row.verificationStatus !== "telephone_officiel_oec") return null;

  return {
    companyName: row.companyName,
    address: row.address,
    postalCode: row.postalCode,
    city: row.city,
    phoneStandard: row.phoneStandard,
    emailGeneric: row.emailGeneric,
    emailOther: row.emailOther,
    website: row.website,
    linkedinUrl: row.linkedinUrl,
    oecProfileUrl: row.oecProfileUrl,
    oecId: row.oecId,
    siren: row.siren ?? "",
    siret: row.siret ?? "",
    contactSourceUrl: row.contactSourceUrl,
    websiteSourceUrl: row.websiteSourceUrl,
    contactConfidence: row.contactConfidence || "90",
    verificationStatus: normalizeOecStatus(row),
    verificationNotes: row.verificationNotes,
    priority: row.emailGeneric ? "A-email" : row.verificationStatus === "telephone_officiel_oec" ? "C-cold-call-oec" : "B-cold-call",
    sourceFile,
    enrichedAt: row.enrichedAt,
  };
}

function normalizeOecStatus(row: CsvRow) {
  if (row.emailGeneric) return "email_verifie_oec_site";
  if (row.verificationStatus === "telephone_officiel_oec") return "telephone_officiel_oec";
  return "telephone_site_officiels_oec";
}

function normalizeEnrichedRow(row: CsvRow, sourceFile: string): ExportRow | null {
  if (!isStrictEnrichedContact(row)) return null;

  return {
    companyName: row.companyName,
    address: row.address,
    postalCode: row.postalCode,
    city: row.city,
    phoneStandard: row.phoneStandard,
    emailGeneric: row.emailGeneric,
    emailOther: row.emailOther,
    website: row.website,
    linkedinUrl: row.linkedinUrl,
    oecProfileUrl: "",
    oecId: "",
    siren: row.siren,
    siret: row.siret,
    contactSourceUrl: row.contactSourceUrl,
    websiteSourceUrl: row.websiteSourceUrl,
    contactConfidence: row.contactConfidence,
    verificationStatus: "email_verifie_site_officiel",
    verificationNotes: "Telephone + email publics sur un site officiel coherent; domaine email aligne avec le site.",
    priority: "A-email",
    sourceFile,
    enrichedAt: row.enrichedAt,
  };
}

function isStrictEnrichedContact(row: CsvRow) {
  if (row.enrichmentStatus !== "contact_complete") return false;
  if (!row.website || !row.emailGeneric || !row.phoneStandard) return false;
  if (Number.parseInt(row.contactConfidence, 10) < 80) return false;
  if (rootDomain(row.emailGeneric) !== rootDomain(row.website)) return false;
  if (rootDomain(row.contactSourceUrl) !== rootDomain(row.website)) return false;
  return isGenericEmail(row.emailGeneric);
}

function isGenericEmail(email: string) {
  const local = email.split("@")[0]?.toLowerCase() ?? "";
  return GENERIC_EMAIL_PREFIXES.some((prefix) => local === prefix || local.startsWith(`${prefix}.`) || local.startsWith(`${prefix}-`));
}

function rootDomain(urlOrEmail: string) {
  let value = (urlOrEmail ?? "").trim().toLowerCase();
  if (!value) return "";
  if (value.includes("@")) value = value.slice(value.lastIndexOf("@") + 1);
  try {
    if (/^https?:\/\//i.test(value)) value = new URL(value).hostname;
  } catch {
    return "";
  }
  value = value.replace(/^www\./, "");
  const parts = value.split(".").filter(Boolean);
  return parts.length <= 2 ? parts.join(".") : parts.slice(-2).join(".");
}

function priorityRank(row: ExportRow) {
  if (row.verificationStatus === "email_verifie_oec_site") return 1;
  if (row.verificationStatus === "email_verifie_site_officiel") return 2;
  if (row.verificationStatus === "telephone_site_officiels_oec") return 3;
  return 4;
}

function selectUnique(rows: ExportRow[], limit: number) {
  const seen = new Set<string>();
  const result: ExportRow[] = [];

  for (const row of rows) {
    const keys = identityKeys(row);
    if (keys.some((key) => seen.has(key))) continue;
    keys.forEach((key) => seen.add(key));
    result.push(row);
    if (result.length >= limit) break;
  }

  return result;
}

function identityKeys(row: ExportRow) {
  const keys: string[] = [];
  const phone = row.phoneStandard.replace(/\D/g, "");
  const address = `${row.address}|${row.postalCode}|${row.city}`.toLowerCase();

  if (row.emailGeneric) keys.push(`email:${row.emailGeneric.toLowerCase()}`);
  if (row.oecId) keys.push(`oec:${row.oecId}`);
  if (row.siren) keys.push(`siren:${row.siren}`);
  if (phone) keys.push(`phone:${phone}:${address}`);
  return keys.length > 0 ? keys : [`fallback:${row.companyName}:${address}`.toLowerCase()];
}

async function writeCsv(outputPath: string, rows: ExportRow[]) {
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
