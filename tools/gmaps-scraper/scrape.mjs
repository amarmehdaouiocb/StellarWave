#!/usr/bin/env node

/**
 * Facilsite — Scraper Google Maps → Supabase
 *
 * Trouve les commerces locaux sans site web et stocke les prospects dans Supabase.
 *
 * Variables d'environnement :
 *   GOOGLE_MAPS_API_KEY  (requis) — clé API Google Places
 *   SUPABASE_URL         (optionnel) — URL du projet Supabase
 *   SUPABASE_KEY         (optionnel) — service_role key Supabase
 *
 * Utilisation :
 *   node scrape.mjs "boulangerie Lyon"
 *   node scrape.mjs --batch --ville Lyon
 *   node scrape.mjs --batch --ville Lyon,Marseille --max 10
 *   node scrape.mjs --niches                          # Affiche les niches disponibles
 *   node scrape.mjs --batch --ville Lyon --niche artisans,beaute
 */

import { writeFileSync, appendFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// ── Config ──────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK = [
  "places.displayName",
  "places.formattedAddress",
  "places.nationalPhoneNumber",
  "places.internationalPhoneNumber",
  "places.websiteUri",
  "places.rating",
  "places.userRatingCount",
  "places.businessStatus",
  "places.googleMapsUri",
  "places.primaryType",
  "places.photos",
  "places.regularOpeningHours",
  "places.editorialSummary",
  "places.priceLevel",
  "places.types",
  "places.servesBeer",
  "places.servesWine",
  "places.servesVegetarianFood",
  "places.takeout",
  "places.delivery",
  "places.dineIn",
  "places.reservable",
  "places.accessibilityOptions",
  "places.paymentOptions",
  "nextPageToken",
].join(",");

const MAX_PHOTOS = 4;

const DELAY_MS = 300;

// ── Niches à fort potentiel ─────────────────────────────────
// Catégories de commerces/artisans qui ont le plus de chances
// de ne PAS avoir de site web et d'avoir besoin de nos services.

const NICHES = {
  artisans: {
    label: "Artisans & BTP",
    queries: [
      "plombier",
      "électricien",
      "serrurier",
      "peintre en bâtiment",
      "carreleur",
      "maçon",
      "couvreur",
      "menuisier",
      "chauffagiste",
      "vitrier",
    ],
  },
  beaute: {
    label: "Beauté & Bien-être",
    queries: [
      "salon de coiffure",
      "barbier",
      "institut de beauté",
      "onglerie",
      "esthéticienne",
      "spa",
      "salon de massage",
    ],
  },
  alimentation: {
    label: "Alimentation & Restauration rapide",
    queries: [
      "boulangerie",
      "pâtisserie",
      "pizzeria",
      "kebab",
      "snack",
      "traiteur",
      "épicerie fine",
      "sandwicherie",
      "crêperie",
      "glacier",
    ],
  },
  sante: {
    label: "Santé & Paramédical",
    queries: [
      "ostéopathe",
      "kinésithérapeute",
      "podologue",
      "orthophoniste",
      "diététicien",
      "psychologue",
      "sophrologue",
      "naturopathe",
      "chiropracteur",
    ],
  },
  services: {
    label: "Services de proximité",
    queries: [
      "pressing",
      "retouche vêtement",
      "cordonnier",
      "fleuriste",
      "toiletteur animaux",
      "réparateur téléphone",
      "auto-école",
      "photographe",
      "déménageur",
      "imprimerie",
    ],
  },
  auto: {
    label: "Automobile",
    queries: [
      "garage automobile",
      "carrosserie",
      "contrôle technique",
      "lavage auto",
      "réparateur moto",
    ],
  },
  sport: {
    label: "Sport & Loisirs",
    queries: [
      "coach sportif",
      "salle de sport",
      "club de yoga",
      "école de danse",
      "salle d'escalade",
    ],
  },
  commerce: {
    label: "Commerces spécialisés",
    queries: [
      "bijouterie",
      "mercerie",
      "librairie indépendante",
      "magasin de vélo",
      "animalerie",
      "quincaillerie",
      "magasin de jouets",
    ],
  },
};

// Villes françaises courantes
const VILLES = [
  "Paris","Lyon","Marseille","Toulouse","Nice","Nantes","Montpellier",
  "Strasbourg","Bordeaux","Lille","Rennes","Reims","Toulon","Le Havre",
  "Saint-Étienne","Grenoble","Dijon","Angers","Nîmes","Villeurbanne",
  "Clermont-Ferrand","Le Mans","Aix-en-Provence","Brest","Tours",
  "Amiens","Limoges","Perpignan","Metz","Besançon","Orléans","Rouen",
  "Mulhouse","Caen","Nancy","Avignon","Poitiers","Cannes","Antibes",
];

// ── Helpers ─────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractVille(query) {
  const lower = query.toLowerCase();
  for (const v of VILLES) {
    if (lower.includes(v.toLowerCase())) return v;
  }
  const words = query.trim().split(/\s+/);
  return words[words.length - 1];
}

function parseArgs() {
  const args = process.argv.slice(2);

  // --niches : afficher les niches disponibles
  if (args.includes("--niches")) {
    console.log("\n📋 Niches disponibles :\n");
    for (const [key, niche] of Object.entries(NICHES)) {
      console.log(`  ${key.padEnd(14)} ${niche.label}`);
      for (const q of niche.queries) {
        console.log(`                 └─ "${q}"`);
      }
      console.log();
    }
    console.log(`Total : ${Object.values(NICHES).reduce((s, n) => s + n.queries.length, 0)} requêtes\n`);
    process.exit(0);
  }

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Facilsite — Scraper Google Maps → Supabase

Usage :
  node scrape.mjs "boulangerie Lyon"
  node scrape.mjs --batch --ville Lyon
  node scrape.mjs --batch --ville Lyon,Marseille --max 10
  node scrape.mjs --batch --ville Lyon --niche artisans,beaute
  node scrape.mjs --niches

Mode simple :
  node scrape.mjs "salon coiffure Bordeaux" --max 40

Options :
  --batch           Mode batch : scrape toutes les niches pour une ville
  --ville <v,...>   Ville(s) pour le mode batch (séparées par des virgules)
  --niche <n,...>   Niches spécifiques (défaut: toutes). Voir --niches
  --max <n>         Résultats par requête (défaut: 20, batch: 10)
  --output <file>   Fichier CSV de sortie
  --no-csv          Ne pas générer de CSV (Supabase uniquement)
  --json            Aussi générer un fichier JSON
  --hot-only        Ne garder que les prospects CHAUDS (priorité 1)
  --niches          Afficher les niches disponibles
  --help            Afficher cette aide

Variables d'environnement :
  GOOGLE_MAPS_API_KEY  (requis)    Clé API Google Places
  SUPABASE_URL         (optionnel) https://xxx.supabase.co
  SUPABASE_KEY         (optionnel) service_role key
`);
    process.exit(0);
  }

  const isBatch = args.includes("--batch");
  const hotOnly = args.includes("--hot-only");

  // Parse --ville
  const villeIndex = args.indexOf("--ville");
  const villeArg = villeIndex !== -1 ? args[villeIndex + 1] : null;
  const villes = villeArg ? villeArg.split(",").map((v) => v.trim()) : [];

  // Parse --niche
  const nicheIndex = args.indexOf("--niche");
  const nicheArg = nicheIndex !== -1 ? args[nicheIndex + 1] : null;
  const nicheKeys = nicheArg
    ? nicheArg.split(",").map((n) => n.trim())
    : Object.keys(NICHES);

  // Parse --max
  const maxIndex = args.indexOf("--max");
  const max = maxIndex !== -1 ? parseInt(args[maxIndex + 1], 10) : (isBatch ? 10 : 20);

  // Parse query (mode simple)
  const flagsWithValue = new Set(["--max", "--output", "--ville", "--niche"]);
  let query = null;
  if (!isBatch) {
    for (let i = 0; i < args.length; i++) {
      if (args[i].startsWith("--")) {
        if (flagsWithValue.has(args[i])) i++;
        continue;
      }
      query = args[i];
      break;
    }
  }

  const outputIndex = args.indexOf("--output");
  const noCsv = args.includes("--no-csv");
  const json = args.includes("--json");

  let output;
  if (outputIndex !== -1) {
    output = args[outputIndex + 1];
  } else if (isBatch) {
    output = `prospects-batch-${villes.join("-").toLowerCase() || "all"}.csv`;
  } else {
    const slugQuery = (query || "prospects")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    output = `prospects-${slugQuery}.csv`;
  }

  return { query, max, output, noCsv, json, isBatch, villes, nicheKeys, hotOnly };
}

// ── Google Places API ───────────────────────────────────────

async function textSearch(query, pageToken = null, pageSize = 20) {
  const body = {
    textQuery: query,
    languageCode: "fr",
    regionCode: "FR",
    pageSize: Math.min(pageSize, 20),
  };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch(SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err.error?.message || err.error?.status || `HTTP ${res.status}`;
    throw new Error(`Places API error: ${msg}`);
  }

  const data = await res.json();
  return {
    places: data.places || [],
    nextPageToken: data.nextPageToken || null,
  };
}

// ── Place Details (reviews) ─────────────────────────────────

const DETAILS_FIELD_MASK = "reviews";

async function fetchPlaceReviews(placeName) {
  // placeName = "places/ChIJ..." (resource name from search)
  if (!placeName) return [];

  const url = `https://places.googleapis.com/v1/${placeName}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": DETAILS_FIELD_MASK,
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.reviews || [])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((r) => ({
      author: r.authorAttribution?.displayName || "Client",
      text: r.text?.text || "",
      rating: r.rating,
      relativeTime: r.relativePublishTimeDescription || "",
    }))
    .filter((r) => r.text.length > 0);
}

// ── Supabase ────────────────────────────────────────────────

async function pushToSupabase(prospects) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return { inserted: 0, updated: 0 };

  // Récupérer les prospects existants avec leurs photos et données enrichies
  const existingRes = await fetch(
    `${SUPABASE_URL}/rest/v1/prospects?select=nom,adresse,photos,avis`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    }
  );

  const existing = existingRes.ok ? await existingRes.json() : [];
  const existingMap = new Map(existing.map((e) => [`${e.nom}|||${e.adresse}`, e]));

  const newProspects = [];
  const toUpdate = [];

  for (const p of prospects) {
    const key = `${p.nom}|||${p.adresse}`;
    const ex = existingMap.get(key);
    if (!ex) {
      newProspects.push(p);
    } else {
      // Prospect existe → mettre à jour si nouvelles données enrichies ou photos manquantes
      const needsPhotos = p.photos && p.photos.length > 0 && (!ex.photos || ex.photos.length === 0);
      const hasNewData = p.avis || p.horaires || p.description_google || p.niveau_prix || p.services_disponibles || p.types_google || p.moyens_paiement;
      const needsEnrichment = !ex.avis && hasNewData;
      if (needsPhotos || needsEnrichment) {
        toUpdate.push(p);
      }
    }
  }

  let inserted = 0;
  let updated = 0;

  // Insérer les nouveaux par lots de 50
  for (let i = 0; i < newProspects.length; i += 50) {
    const batch = newProspects.slice(i, i + 50);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/prospects`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(batch),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Supabase insert error: ${err}`);
    }
    inserted += batch.length;
  }

  // Mettre à jour les prospects existants (photos + données enrichies)
  for (const p of toUpdate) {
    const updateData = {};
    if (p.photos && p.photos.length > 0) updateData.photos = p.photos;
    if (p.horaires) updateData.horaires = p.horaires;
    if (p.avis) updateData.avis = p.avis;
    if (p.description_google) updateData.description_google = p.description_google;
    if (p.niveau_prix) updateData.niveau_prix = p.niveau_prix;
    if (p.types_google) updateData.types_google = p.types_google;
    if (p.services_disponibles) updateData.services_disponibles = p.services_disponibles;
    if (p.accessibilite) updateData.accessibilite = p.accessibilite;
    if (p.moyens_paiement) updateData.moyens_paiement = p.moyens_paiement;
    if (p.reservable) updateData.reservable = p.reservable;

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/prospects?nom=eq.${encodeURIComponent(p.nom)}&adresse=eq.${encodeURIComponent(p.adresse)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (res.ok) updated++;
  }

  return { inserted, updated };
}

// ── Évaluation du site web ──────────────────────────────────

async function checkWebsite(url) {
  if (!url) return { reachable: false, redirectsToSocial: false };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    clearTimeout(timeout);

    const finalUrl = res.url || url;
    const isSocial =
      /facebook\.com|instagram\.com|linkedin\.com|twitter\.com|x\.com/i.test(
        finalUrl
      );

    return { reachable: res.ok, redirectsToSocial: isSocial };
  } catch {
    return { reachable: false, redirectsToSocial: false };
  }
}

// ── Résolution des photos ───────────────────────────────────

async function resolvePhotoUrls(photos) {
  if (!photos || photos.length === 0) return [];

  const urls = [];
  const toResolve = photos.slice(0, MAX_PHOTOS);

  for (const photo of toResolve) {
    try {
      const mediaUrl = `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=800&maxWidthPx=1200&key=${API_KEY}`;

      // Suivre la redirection pour obtenir l'URL CDN finale
      const res = await fetch(mediaUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (res.ok && res.url) {
        urls.push(res.url);
      }
    } catch {
      // Ignorer les photos qui échouent
    }
    await sleep(50);
  }

  return urls;
}

function computePriority(place, webCheck) {
  if (!place.websiteUri) return 1;
  if (!webCheck.reachable) return 1;
  if (webCheck.redirectsToSocial) return 2;
  return 3;
}

function priorityLabel(p) {
  if (p === 1) return "CHAUD — Pas de site web";
  if (p === 2) return "TIEDE — Redirige vers réseau social";
  return "FROID — A déjà un site";
}

// ── CSV ─────────────────────────────────────────────────────

function escapeCsv(val) {
  if (val == null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const CSV_COLS = [
  "nom","adresse","telephone","site_web","google_maps",
  "note","nb_avis","statut","type_commerce","ville",
  "recherche","priorite","priorite_label",
];

function toCsvRow(obj) {
  return CSV_COLS.map((k) => escapeCsv(obj[k])).join(",");
}

// ── Scrape une requête ──────────────────────────────────────

async function scrapeQuery(query, max) {
  let allPlaces = [];
  let pageToken = null;
  let page = 1;

  while (allPlaces.length < max) {
    const remaining = max - allPlaces.length;
    const { places, nextPageToken } = await textSearch(query, pageToken, remaining);

    for (const p of places) {
      if (allPlaces.length >= max) break;
      allPlaces.push(p);
    }

    if (!nextPageToken || allPlaces.length >= max || places.length === 0) break;
    pageToken = nextPageToken;
    page++;
    await sleep(DELAY_MS);
  }

  const PRICE_MAP = {
    PRICE_LEVEL_FREE: "Gratuit",
    PRICE_LEVEL_INEXPENSIVE: "€",
    PRICE_LEVEL_MODERATE: "€€",
    PRICE_LEVEL_EXPENSIVE: "€€€",
    PRICE_LEVEL_VERY_EXPENSIVE: "€€€€",
  };

  const prospects = [];
  for (const place of allPlaces) {
    const name = place.displayName?.text || "Inconnu";
    const webCheck = await checkWebsite(place.websiteUri);
    const priority = computePriority(place, webCheck);
    const ville = extractVille(query);
    const photos = await resolvePhotoUrls(place.photos);

    // Horaires structurés
    const horaires = place.regularOpeningHours?.weekdayDescriptions || null;

    // Avis clients (top 3 triés par note, via Place Details API)
    const avis = await fetchPlaceReviews(place.name);
    await sleep(50);

    // Description Google
    const description_google = place.editorialSummary?.text || null;

    // Niveau prix
    const niveau_prix = PRICE_MAP[place.priceLevel] || null;

    // Services disponibles
    const services_disponibles = [];
    if (place.dineIn) services_disponibles.push("Sur place");
    if (place.takeout) services_disponibles.push("À emporter");
    if (place.delivery) services_disponibles.push("Livraison");
    if (place.servesVegetarianFood) services_disponibles.push("Options végétariennes");
    if (place.servesBeer || place.servesWine) services_disponibles.push("Bar");
    if (place.reservable) services_disponibles.push("Réservation");

    // Types Google
    const types_google = place.types || [];

    // Accessibilité & paiement
    const accessibilite = place.accessibilityOptions?.wheelchairAccessibleEntrance || false;
    const moyens_paiement = [];
    if (place.paymentOptions?.acceptsCreditCards) moyens_paiement.push("CB");
    if (place.paymentOptions?.acceptsCashOnly) moyens_paiement.push("Espèces uniquement");
    if (place.paymentOptions?.acceptsNfc) moyens_paiement.push("Sans contact");

    prospects.push({
      nom: name,
      adresse: place.formattedAddress || "",
      telephone: place.nationalPhoneNumber || place.internationalPhoneNumber || "",
      site_web: place.websiteUri || null,
      google_maps: place.googleMapsUri || "",
      note: place.rating || null,
      nb_avis: place.userRatingCount || 0,
      statut: place.businessStatus || "",
      type_commerce: place.primaryType || "",
      priorite: priority,
      priorite_label: priorityLabel(priority),
      recherche: query,
      ville,
      photos,
      horaires: horaires && horaires.length > 0 ? horaires : null,
      avis: avis.length > 0 ? avis : null,
      description_google,
      niveau_prix,
      types_google: types_google.length > 0 ? types_google : null,
      services_disponibles: services_disponibles.length > 0 ? services_disponibles : null,
      accessibilite,
      moyens_paiement: moyens_paiement.length > 0 ? moyens_paiement : null,
      reservable: place.reservable || false,
    });

    await sleep(100);
  }

  return prospects;
}

// ── Main : mode simple ──────────────────────────────────────

async function mainSimple({ query, max, output, noCsv, json, hotOnly }) {
  const ville = extractVille(query);
  const hasSupabase = !!(SUPABASE_URL && SUPABASE_KEY);

  console.log(`\n🔍 Recherche : "${query}"`);
  console.log(`📊 Maximum : ${max} résultats`);
  console.log(`🏙️  Ville : ${ville}`);
  console.log(`💾 Supabase : ${hasSupabase ? "✅ connecté" : "⬜ CSV uniquement"}`);
  if (!noCsv) console.log(`📁 CSV : ${output}`);
  console.log();

  console.log("Étape 1/3 — Recherche sur Google Maps...\n");
  let prospects = await scrapeQuery(query, max);

  if (hotOnly) {
    prospects = prospects.filter((p) => p.priorite <= 2);
  }

  if (prospects.length === 0) {
    console.log("\n❌ Aucun prospect trouvé.");
    return;
  }

  prospects.sort((a, b) => a.priorite - b.priorite);

  for (const p of prospects) {
    const icon = p.priorite === 1 ? "🔥" : p.priorite === 2 ? "🟡" : "⚪";
    console.log(`  ${icon} ${p.nom}`);
  }

  exportResults(prospects, { output, noCsv, json, hasSupabase, query, ville });
}

// ── Main : mode batch ───────────────────────────────────────

async function mainBatch({ villes, nicheKeys, max, output, noCsv, json, hotOnly }) {
  if (villes.length === 0) {
    console.error("❌ Mode batch : spécifie au moins une ville avec --ville\n");
    console.error("Exemple : node scrape.mjs --batch --ville Lyon");
    process.exit(1);
  }

  // Valider les niches
  const invalidNiches = nicheKeys.filter((k) => !NICHES[k]);
  if (invalidNiches.length > 0) {
    console.error(`❌ Niches invalides : ${invalidNiches.join(", ")}`);
    console.error(`   Disponibles : ${Object.keys(NICHES).join(", ")}`);
    console.error("   Utilise --niches pour voir le détail.");
    process.exit(1);
  }

  // Construire la liste de requêtes
  const queries = [];
  for (const key of nicheKeys) {
    for (const q of NICHES[key].queries) {
      for (const ville of villes) {
        queries.push({ query: `${q} ${ville}`, niche: key, ville });
      }
    }
  }

  const hasSupabase = !!(SUPABASE_URL && SUPABASE_KEY);
  const selectedNicheLabels = nicheKeys.map((k) => NICHES[k].label).join(", ");

  console.log(`\n🚀 MODE BATCH — Facilsite Scraper`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🏙️  Villes    : ${villes.join(", ")}`);
  console.log(`📂 Niches    : ${selectedNicheLabels}`);
  console.log(`🔢 Requêtes  : ${queries.length}`);
  console.log(`📊 Max/req   : ${max}`);
  console.log(`💾 Supabase  : ${hasSupabase ? "✅ connecté" : "⬜ CSV uniquement"}`);
  if (!noCsv) console.log(`📁 CSV       : ${output}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  let allProspects = [];
  const seen = new Set(); // Dédupliquer par nom+adresse
  let queryNum = 0;

  for (const { query, niche, ville } of queries) {
    queryNum++;
    const nicheLabel = NICHES[niche].label;
    console.log(`[${queryNum}/${queries.length}] 🔍 "${query}" (${nicheLabel})`);

    try {
      const prospects = await scrapeQuery(query, max);

      let added = 0;
      for (const p of prospects) {
        const key = `${p.nom}|||${p.adresse}`;
        if (seen.has(key)) continue;
        if (hotOnly && p.priorite > 2) continue;
        seen.add(key);
        allProspects.push(p);
        added++;
      }

      const hot = prospects.filter((p) => p.priorite === 1).length;
      const warm = prospects.filter((p) => p.priorite === 2).length;
      console.log(`  → ${prospects.length} trouvés, ${hot} 🔥 ${warm} 🟡 | +${added} nouveaux\n`);
    } catch (err) {
      console.error(`  ❌ Erreur : ${err.message}\n`);
    }

    // Petite pause entre les requêtes pour éviter le rate limiting
    await sleep(500);
  }

  if (allProspects.length === 0) {
    console.log("\n❌ Aucun prospect trouvé.");
    return;
  }

  allProspects.sort((a, b) => a.priorite - b.priorite);

  const label = villes.join(", ");
  exportResults(allProspects, { output, noCsv, json, hasSupabase, query: `batch: ${label}`, ville: label });
}

// ── Export ───────────────────────────────────────────────────

async function exportResults(prospects, { output, noCsv, json, hasSupabase, query, ville }) {
  console.log("\n📦 Export...\n");

  // CSV
  if (!noCsv) {
    const csvContent = [CSV_COLS.join(","), ...prospects.map(toCsvRow)].join("\n");
    const csvPath = resolve(process.cwd(), output);
    writeFileSync(csvPath, "\uFEFF" + csvContent, "utf-8");
    console.log(`  📄 CSV : ${csvPath}`);
  }

  // JSON
  if (json) {
    const jsonPath = resolve(process.cwd(), output.replace(/\.csv$/, ".json"));
    writeFileSync(jsonPath, JSON.stringify(prospects, null, 2), "utf-8");
    console.log(`  📄 JSON : ${jsonPath}`);
  }

  // Supabase
  if (hasSupabase) {
    try {
      const { inserted, updated } = await pushToSupabase(prospects);
      console.log(`  ☁️  Supabase : ${inserted} nouveaux, ${updated} enrichis, ${prospects.length - inserted - updated} inchangés`);
    } catch (err) {
      console.error(`  ❌ Supabase : ${err.message}`);
    }
  }

  // Résumé
  const hot = prospects.filter((p) => p.priorite === 1).length;
  const warm = prospects.filter((p) => p.priorite === 2).length;
  const cold = prospects.filter((p) => p.priorite === 3).length;

  const qLabel = (query || "").slice(0, 40);
  const vLabel = (ville || "").slice(0, 40);

  console.log(`
╔══════════════════════════════════════════════════╗
║              RÉSUMÉ PROSPECTION                  ║
╠══════════════════════════════════════════════════╣
║  🔍 Recherche : ${qLabel.padEnd(32)}║
║  🏙️  Ville    : ${vLabel.padEnd(32)}║
║  📊 Total     : ${String(prospects.length).padEnd(32)}║
║                                                  ║
║  🔥 CHAUDS (pas de site)       : ${String(hot).padEnd(15)}║
║  🟡 TIÈDES (site cassé/social) : ${String(warm).padEnd(15)}║
║  ⚪ FROIDS (site existant)     : ${String(cold).padEnd(15)}║
║                                                  ║
║  📈 Taux de conversion estimé  : ${String(Math.round((hot + warm) / prospects.length * 100) + "%").padEnd(15)}║
╚══════════════════════════════════════════════════╝
`);
}

// ── Entry point ─────────────────────────────────────────────

async function main() {
  const opts = parseArgs();

  if (!API_KEY) {
    console.error(
      "❌ Variable GOOGLE_MAPS_API_KEY manquante.\n\n" +
        "Pour l'obtenir :\n" +
        "  1. Va sur https://console.cloud.google.com/\n" +
        "  2. Crée un projet (ou utilise un existant)\n" +
        "  3. Active 'Places API (New)'\n" +
        "  4. Crée une clé API dans 'Credentials'\n" +
        "  5. Exécute : GOOGLE_MAPS_API_KEY=ta_clé node scrape.mjs --batch --ville Lyon\n"
    );
    process.exit(1);
  }

  if (opts.isBatch) {
    await mainBatch(opts);
  } else {
    if (!opts.query) {
      console.error("❌ Spécifie une requête ou utilise --batch.\n");
      console.error("Exemples :");
      console.error('  node scrape.mjs "boulangerie Lyon"');
      console.error("  node scrape.mjs --batch --ville Lyon");
      process.exit(1);
    }
    await mainSimple(opts);
  }
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
