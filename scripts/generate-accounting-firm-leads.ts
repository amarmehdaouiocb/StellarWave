/**
 * Genere une base de cabinets comptables depuis l'API publique Recherche
 * d'Entreprises, puis produit un CSV pret pour CRM/cold call.
 *
 * Usage:
 *   npm run leads:cabinets -- --limit=300 --departments=75,92,93
 *   npm run leads:cabinets -- --regions=11 --output=Acquisition/outbound/idf.csv
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const API_BASE_URL = "https://recherche-entreprises.api.gouv.fr/search";
const DEFAULT_OUTPUT = `Acquisition/outbound/cabinets-comptables-${new Date()
  .toISOString()
  .slice(0, 10)}.csv`;
const DEFAULT_USER_AGENT =
  process.env.LEADGEN_USER_AGENT ??
  "StellarWaveLeadPipeline/0.1 (contact@stellarwave.fr)";

type Args = {
  limit: number;
  scan: number;
  output: string;
  delimiter: "," | ";";
  excel: boolean;
  query?: string;
  departments?: string;
  regions?: string;
  postalCodes?: string;
  excludeEi: boolean;
  includeDirigeants: boolean;
  help: boolean;
};

type ApiPayload = {
  results?: ApiCompany[];
  resultats?: ApiCompany[];
  total_results?: number;
  total_pages?: number;
  page?: number;
  per_page?: number;
};

type ApiCompany = {
  siren?: string;
  nom_complet?: string;
  nom_raison_sociale?: string;
  sigle?: string;
  activite_principale?: string;
  activite_principale_naf25?: string;
  categorie_entreprise?: string;
  tranche_effectif_salarie?: string;
  etat_administratif?: string;
  nature_juridique?: string;
  section_activite_principale?: string;
  date_creation?: string;
  nombre_etablissements?: number;
  nombre_etablissements_ouverts?: number;
  siege?: ApiEstablishment;
  matching_etablissements?: ApiEstablishment[];
  dirigeants?: ApiDirector[];
  complements?: {
    est_entrepreneur_individuel?: boolean;
  };
};

type ApiEstablishment = {
  siret?: string;
  activite_principale?: string;
  adresse?: string;
  code_postal?: string;
  libelle_commune?: string;
  commune?: string;
  departement?: string;
  region?: string;
  tranche_effectif_salarie?: string;
  etat_administratif?: string;
};

type ApiDirector = {
  nom?: string;
  prenoms?: string;
  qualite?: string;
  denomination?: string;
  type_dirigeant?: string;
};

type Lead = {
  score: number;
  priority: "A" | "B" | "C";
  companyName: string;
  siren: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  department: string;
  region: string;
  ape: string;
  employeeBand: string;
  companyCategory: string;
  legalForm: string;
  isIndividualEntrepreneur: string;
  openEstablishments: string;
  totalEstablishments: string;
  createdAt: string;
  decisionSignals: string;
  exclusionSignals: string;
  suggestedAngle: string;
  annuaireEntreprisesUrl: string;
  sourceUrl: string;
  website: string;
  emailGeneric: string;
  phoneStandard: string;
  linkedinUrl: string;
  contactPerson: string;
  crmStatus: string;
  optOutStatus: string;
  doNotContact: string;
  notes: string;
};

const EMPLOYEE_BANDS: Record<string, string> = {
  NN: "Effectif inconnu",
  "00": "0 salarie",
  "01": "1-2 salaries",
  "02": "3-5 salaries",
  "03": "6-9 salaries",
  "11": "10-19 salaries",
  "12": "20-49 salaries",
  "21": "50-99 salaries",
  "22": "100-199 salaries",
  "31": "200-249 salaries",
  "32": "250-499 salaries",
  "41": "500-999 salaries",
  "42": "1000-1999 salaries",
  "51": "2000-4999 salaries",
  "52": "5000-9999 salaries",
  "53": "10000+ salaries",
};

const IDEAL_EMPLOYEE_BANDS = new Set(["03", "11", "12"]);
const ACCEPTABLE_EMPLOYEE_BANDS = new Set(["02", "21"]);
const LARGE_EMPLOYEE_BANDS = new Set(["22", "31", "32", "41", "42", "51", "52", "53"]);

const NETWORK_NAMES = [
  "KPMG",
  "DELOITTE",
  "ERNST YOUNG",
  "EY",
  "PWC",
  "PRICEWATERHOUSE",
  "MAZARS",
  "BDO",
  "GRANT THORNTON",
  "FIDUCIAL",
  "IN EXTENSO",
];

const POSITIVE_NAME_TERMS = [
  "EXPERT",
  "EXPERTISE",
  "COMPT",
  "AUDIT",
  "CONSEIL",
  "FIDUCIAIRE",
  "CABINET",
  "GESTION",
];

function parseArgs(argv: string[]): Args {
  const args: Args = {
    limit: 300,
    scan: 0,
    output: DEFAULT_OUTPUT,
    delimiter: ",",
    excel: false,
    excludeEi: false,
    includeDirigeants: false,
    help: false,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--excel") {
      args.excel = true;
      args.delimiter = ";";
    }
    else if (arg === "--exclude-ei") args.excludeEi = true;
    else if (arg === "--include-dirigeants") args.includeDirigeants = true;
    else if (arg.startsWith("--limit=")) args.limit = parsePositiveInteger(arg, "limit");
    else if (arg.startsWith("--scan=")) args.scan = parsePositiveInteger(arg, "scan");
    else if (arg.startsWith("--output=")) args.output = valueOf(arg);
    else if (arg.startsWith("--delimiter=")) args.delimiter = parseDelimiter(valueOf(arg));
    else if (arg.startsWith("--query=")) args.query = valueOf(arg);
    else if (arg.startsWith("--departments=")) args.departments = valueOf(arg);
    else if (arg.startsWith("--department=")) args.departments = valueOf(arg);
    else if (arg.startsWith("--regions=")) args.regions = valueOf(arg);
    else if (arg.startsWith("--region=")) args.regions = valueOf(arg);
    else if (arg.startsWith("--postal-codes=")) args.postalCodes = valueOf(arg);
    else if (arg.startsWith("--postal-code=")) args.postalCodes = valueOf(arg);
    else {
      throw new Error(`Argument inconnu: ${arg}. Utilise --help pour voir les options.`);
    }
  }

  if (args.scan === 0) {
    args.scan = Math.max(args.limit, Math.min(args.limit * 5, 2_000));
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

function parseDelimiter(value: string): "," | ";" {
  if (value === "," || value === "comma") return ",";
  if (value === ";" || value === "semicolon" || value === "excel") return ";";
  throw new Error('--delimiter doit valoir "," | "comma" | ";" | "semicolon".');
}

function printHelp() {
  console.log(`
Usage:
  npm run leads:cabinets -- [options]

Options:
  --limit=300                 Nombre maximum de cabinets a exporter.
  --scan=1500                 Nombre de resultats API a scorer avant tri final.
  --output=path.csv           Chemin du CSV de sortie.
  --delimiter=semicolon       Separateur CSV: comma ou semicolon.
  --excel                     Format ouverture directe Excel FR: sep=; + UTF-8 BOM.
  --query="expert comptable"  Recherche textuelle additionnelle. Par defaut, filtre APE seul.
  --departments=75,92         Filtre departement.
  --regions=11               Filtre region INSEE.
  --postal-codes=75008,69002  Filtre code postal.
  --exclude-ei                Exclut les entrepreneurs individuels.
  --include-dirigeants        Ajoute les dirigeants publics INPI dans contact_person.

Exemples:
  npm run leads:cabinets -- --limit=300
  npm run leads:cabinets -- --regions=11 --limit=150
  npm run leads:cabinets -- --departments=75,92,93 --query="expertise comptable"
`);
}

async function fetchPage(args: Args, page: number): Promise<ApiPayload> {
  const params = new URLSearchParams({
    activite_principale: "69.20Z",
    etat_administratif: "A",
    minimal: "true",
    include: args.includeDirigeants
      ? "siege,matching_etablissements,dirigeants,score"
      : "siege,matching_etablissements,score",
    page: String(page),
    per_page: "25",
  });

  if (args.query) params.set("q", args.query);
  if (args.departments) params.set("departement", args.departments);
  if (args.regions) params.set("region", args.regions);
  if (args.postalCodes) params.set("code_postal", args.postalCodes);
  if (args.excludeEi) params.set("est_entrepreneur_individuel", "false");

  const url = `${API_BASE_URL}?${params.toString()}`;
  const response = await fetchWithRetry(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status} sur ${url}\n${body}`);
  }

  return response.json() as Promise<ApiPayload>;
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": DEFAULT_USER_AGENT,
      },
    });

    if (response.status !== 429 || attempt === retries) return response;

    const retryAfter = Number.parseInt(response.headers.get("retry-after") ?? "2", 10);
    await wait(Math.max(retryAfter, 1) * 1000);
  }

  throw new Error("Retry impossible a atteindre.");
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toLead(company: ApiCompany, args: Args): Lead | undefined {
  const siren = clean(company.siren);
  if (!siren) return undefined;

  const establishment = selectEstablishment(company, args);
  const companyName =
    clean(company.nom_complet) || clean(company.nom_raison_sociale) || clean(company.sigle);
  if (!companyName) return undefined;

  const employeeCode =
    clean(company.tranche_effectif_salarie) || clean(establishment.tranche_effectif_salarie);
  const ape = clean(company.activite_principale) || clean(establishment.activite_principale);
  const isEi = company.complements?.est_entrepreneur_individuel === true;

  const scoreDetails = scoreCompany({
    companyName,
    employeeCode,
    ape,
    isEi,
    openEstablishments: company.nombre_etablissements_ouverts,
  });

  const city = clean(establishment.libelle_commune) || clean(establishment.commune);
  const postalCode = clean(establishment.code_postal);
  const searchQuery = encodeURIComponent(`${companyName} ${postalCode} expert comptable contact`);

  return {
    score: scoreDetails.score,
    priority: toPriority(scoreDetails.score),
    companyName,
    siren,
    siret: clean(establishment.siret),
    address: clean(establishment.adresse),
    postalCode,
    city,
    department: clean(establishment.departement) || postalCode.slice(0, 2),
    region: clean(establishment.region),
    ape,
    employeeBand: employeeCode
      ? `${employeeCode} - ${EMPLOYEE_BANDS[employeeCode] ?? "Tranche inconnue"}`
      : "",
    companyCategory: clean(company.categorie_entreprise),
    legalForm: clean(company.nature_juridique),
    isIndividualEntrepreneur: isEi ? "yes" : "no",
    openEstablishments: toStringValue(company.nombre_etablissements_ouverts),
    totalEstablishments: toStringValue(company.nombre_etablissements),
    createdAt: clean(company.date_creation),
    decisionSignals: scoreDetails.positiveSignals.join(" | "),
    exclusionSignals: scoreDetails.negativeSignals.join(" | "),
    suggestedAngle: suggestedAngle(scoreDetails.positiveSignals, employeeCode),
    annuaireEntreprisesUrl: `https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`,
    sourceUrl: `https://recherche-entreprises.api.gouv.fr/search?activite_principale=69.20Z&q=${searchQuery}`,
    website: "",
    emailGeneric: "",
    phoneStandard: "",
    linkedinUrl: "",
    contactPerson: args.includeDirigeants ? formatDirectors(company.dirigeants) : "",
    crmStatus: "a_qualifier",
    optOutStatus: "not_contacted",
    doNotContact: "no",
    notes: "",
  };
}

function scoreCompany(input: {
  companyName: string;
  employeeCode: string;
  ape: string;
  isEi: boolean;
  openEstablishments?: number;
}) {
  const positiveSignals: string[] = [];
  const negativeSignals: string[] = [];
  let score = 50;
  const normalizedName = normalize(input.companyName);

  if (input.ape === "69.20Z") {
    score += 15;
    positiveSignals.push("APE 69.20Z activites comptables");
  }

  if (IDEAL_EMPLOYEE_BANDS.has(input.employeeCode)) {
    score += 20;
    positiveSignals.push(`taille ICP ${EMPLOYEE_BANDS[input.employeeCode]}`);
  } else if (ACCEPTABLE_EMPLOYEE_BANDS.has(input.employeeCode)) {
    score += 10;
    positiveSignals.push(`taille acceptable ${EMPLOYEE_BANDS[input.employeeCode]}`);
  } else if (LARGE_EMPLOYEE_BANDS.has(input.employeeCode)) {
    score -= 20;
    negativeSignals.push(`structure probablement trop grande ${EMPLOYEE_BANDS[input.employeeCode]}`);
  } else if (input.employeeCode === "00" || input.employeeCode === "01") {
    score -= 10;
    negativeSignals.push(`cabinet probablement tres petit ${EMPLOYEE_BANDS[input.employeeCode]}`);
  } else {
    score -= 3;
    negativeSignals.push("effectif inconnu");
  }

  const matchedNameTerms = POSITIVE_NAME_TERMS.filter((term) => normalizedName.includes(term));
  if (matchedNameTerms.length > 0) {
    score += Math.min(matchedNameTerms.length * 4, 12);
    positiveSignals.push(`nom qualifiant: ${matchedNameTerms.join(", ")}`);
  }

  const matchedNetworks = NETWORK_NAMES.filter((term) => normalizedName.includes(term));
  if (matchedNetworks.length > 0) {
    score -= 25;
    negativeSignals.push(`reseau/grand groupe: ${matchedNetworks.join(", ")}`);
  }

  if (input.isEi) {
    score -= 12;
    negativeSignals.push("entrepreneur individuel");
  }

  if (typeof input.openEstablishments === "number" && input.openEstablishments > 10) {
    score -= 10;
    negativeSignals.push(`${input.openEstablishments} etablissements ouverts`);
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    positiveSignals,
    negativeSignals,
  };
}

function suggestedAngle(signals: string[], employeeCode: string) {
  if (employeeCode && IDEAL_EMPLOYEE_BANDS.has(employeeCode)) {
    return "Partenariat technique pour clients TPE/PME + facturation electronique";
  }
  if (signals.some((signal) => signal.includes("taille acceptable"))) {
    return "Proposer un partenariat simple, sans charge commerciale lourde";
  }
  return "Qualification manuelle avant approche";
}

function selectEstablishment(company: ApiCompany, args: Args): ApiEstablishment {
  const candidates = [
    ...(company.matching_etablissements ?? []),
    ...(company.siege ? [company.siege] : []),
  ];

  const matchingFilter = candidates.find((establishment) =>
    matchesGeoFilters(establishment, args),
  );

  return matchingFilter ?? company.siege ?? candidates[0] ?? {};
}

function matchesGeoFilters(establishment: ApiEstablishment, args: Args) {
  const postalCode = clean(establishment.code_postal);
  const department =
    clean(establishment.departement) || (postalCode.length >= 2 ? postalCode.slice(0, 2) : "");
  const region = clean(establishment.region);

  if (args.departments && !splitList(args.departments).includes(department)) {
    return false;
  }
  if (args.regions && !splitList(args.regions).includes(region)) {
    return false;
  }
  if (args.postalCodes && !splitList(args.postalCodes).includes(postalCode)) {
    return false;
  }

  return true;
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toPriority(score: number): "A" | "B" | "C" {
  if (score >= 75) return "A";
  if (score >= 55) return "B";
  return "C";
}

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function toStringValue(value: unknown) {
  if (value === undefined || value === null) return "";
  return String(value);
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function formatDirectors(directors?: ApiDirector[]) {
  if (!directors?.length) return "";

  return directors
    .slice(0, 3)
    .map((director) => {
      if (director.denomination) {
        return `${clean(director.denomination)} (${clean(director.qualite)})`;
      }
      return `${clean(director.prenoms)} ${clean(director.nom)} (${clean(director.qualite)})`.trim();
    })
    .filter(Boolean)
    .join(" | ");
}

function toCsv(leads: Lead[], options: { delimiter: "," | ";"; excel: boolean }) {
  const headers: (keyof Lead)[] = [
    "score",
    "priority",
    "companyName",
    "siren",
    "siret",
    "address",
    "postalCode",
    "city",
    "department",
    "region",
    "ape",
    "employeeBand",
    "companyCategory",
    "legalForm",
    "isIndividualEntrepreneur",
    "openEstablishments",
    "totalEstablishments",
    "createdAt",
    "decisionSignals",
    "exclusionSignals",
    "suggestedAngle",
    "annuaireEntreprisesUrl",
    "sourceUrl",
    "website",
    "emailGeneric",
    "phoneStandard",
    "linkedinUrl",
    "contactPerson",
    "crmStatus",
    "optOutStatus",
    "doNotContact",
    "notes",
  ];

  const csv = [
    headers.join(options.delimiter),
    ...leads.map((lead) =>
      headers.map((header) => csvCell(lead[header])).join(options.delimiter),
    ),
  ].join("\n");

  if (!options.excel) return csv;
  return `\uFEFFsep=${options.delimiter}\n${csv}`;
}

function csvCell(value: unknown) {
  const raw = value === undefined || value === null ? "" : String(value);
  return `"${raw.replace(/"/g, '""')}"`;
}

async function collectLeads(args: Args) {
  const leadsBySiren = new Map<string, Lead>();
  let page = 1;
  let totalPages: number | undefined;
  let scanned = 0;

  while (scanned < args.scan) {
    console.log(`-> Lecture page ${page}`);
    const payload = await fetchPage(args, page);
    const companies = payload.results ?? payload.resultats ?? [];

    if (totalPages === undefined && payload.total_pages) {
      totalPages = payload.total_pages;
      console.log(`-> ${payload.total_results ?? "?"} resultats API, ${totalPages} pages`);
    }

    if (companies.length === 0) break;

    for (const company of companies) {
      scanned += 1;
      const lead = toLead(company, args);
      if (!lead || leadsBySiren.has(lead.siren)) continue;
      leadsBySiren.set(lead.siren, lead);
      if (scanned >= args.scan) break;
    }

    if (totalPages !== undefined && page >= totalPages) break;
    page += 1;
    await wait(160);
  }

  console.log(`-> ${scanned} resultats API scores, ${leadsBySiren.size} cabinets uniques`);
  return [...leadsBySiren.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, args.limit);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const leads = await collectLeads(args);
  const outPath = resolve(process.cwd(), args.output);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(
    outPath,
    `${toCsv(leads, { delimiter: args.delimiter, excel: args.excel })}\n`,
    "utf8",
  );

  const byPriority = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.priority] = (acc[lead.priority] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\nOK: ${leads.length} cabinets exportes -> ${outPath}`);
  console.log(`Priorites: A=${byPriority.A ?? 0}, B=${byPriority.B ?? 0}, C=${byPriority.C ?? 0}`);
  console.log("Prochaine etape: enrichir website/emailGeneric/phoneStandard avant campagne.");
}

main().catch((error) => {
  console.error("Erreur leadgen:", error);
  process.exit(1);
});
