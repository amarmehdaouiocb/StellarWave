#!/usr/bin/env node

/**
 * Simplisite — Générateur de liens de preview
 *
 * Récupère les prospects depuis Supabase et génère les URLs de preview
 * prêtes à envoyer par SMS/WhatsApp.
 *
 * Utilisation :
 *   node generate-links.mjs
 *   node generate-links.mjs --ville Lyon
 *   node generate-links.mjs --priorite 1
 *   node generate-links.mjs --non-contactes
 *   node generate-links.mjs --ville Lyon --priorite 1 --csv
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const BASE_URL = process.env.PREVIEW_BASE_URL || "https://stellarwave.fr/simplisite";

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Simplisite — Générateur de liens de preview

Usage :
  node generate-links.mjs
  node generate-links.mjs --ville Lyon
  node generate-links.mjs --priorite 1
  node generate-links.mjs --non-contactes
  node generate-links.mjs --csv

Options :
  --ville <v>        Filtrer par ville
  --priorite <n>     Filtrer par priorité (1=chaud, 2=tiède)
  --non-contactes    Uniquement les prospects non contactés
  --csv              Générer un fichier CSV avec les liens
  --sms              Afficher les messages SMS prêts à envoyer
  --help             Afficher cette aide

Variables d'environnement :
  SUPABASE_URL       (requis) https://xxx.supabase.co
  SUPABASE_KEY       (requis) service_role key
  PREVIEW_BASE_URL   (optionnel) Base URL (défaut: https://stellarwave.fr/simplisite)
`);
    process.exit(0);
  }

  const villeIdx = args.indexOf("--ville");
  const ville = villeIdx !== -1 ? args[villeIdx + 1] : null;

  const prioIdx = args.indexOf("--priorite");
  const priorite = prioIdx !== -1 ? parseInt(args[prioIdx + 1], 10) : null;

  const nonContactes = args.includes("--non-contactes");
  const csv = args.includes("--csv");
  const sms = args.includes("--sms");

  return { ville, priorite, nonContactes, csv, sms };
}

async function fetchProspects({ ville, priorite, nonContactes }) {
  let url = `${SUPABASE_URL}/rest/v1/prospects?select=id,nom,adresse,telephone,ville,priorite,priorite_label,type_commerce,recherche,contacte,preview_envoyee&order=priorite.asc,ville.asc`;

  const filters = [];
  if (ville) filters.push(`ville=ilike.*${ville}*`);
  if (priorite) filters.push(`priorite=eq.${priorite}`);
  if (nonContactes) filters.push(`contacte=eq.false`);

  if (filters.length > 0) url += "&" + filters.join("&");

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }

  return res.json();
}

function generateSmsMessage(prospect, previewUrl) {
  return `Bonjour ! Voici un aperçu du site web que nous avons imaginé pour ${prospect.nom} : ${previewUrl} — Qu'en pensez-vous ? Simplisite.fr`;
}

async function main() {
  const opts = parseArgs();

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("❌ Variables SUPABASE_URL et SUPABASE_KEY requises.");
    process.exit(1);
  }

  console.log(`\n📋 Récupération des prospects...\n`);

  const prospects = await fetchProspects(opts);

  if (prospects.length === 0) {
    console.log("❌ Aucun prospect trouvé avec ces filtres.");
    process.exit(0);
  }

  // Générer les liens
  const rows = prospects.map((p) => ({
    nom: p.nom,
    telephone: p.telephone || "—",
    ville: p.ville,
    priorite: p.priorite_label,
    preview_url: `${BASE_URL}/preview/${p.id}`,
    sms: generateSmsMessage(p, `${BASE_URL}/preview/${p.id}`),
  }));

  // Affichage console
  console.log(`📊 ${rows.length} prospects trouvés\n`);
  console.log("─".repeat(90));

  for (const r of rows) {
    const icon = r.priorite.includes("CHAUD") ? "🔥" : "🟡";
    console.log(`${icon} ${r.nom}`);
    console.log(`   📞 ${r.telephone} | 📍 ${r.ville}`);
    console.log(`   🔗 ${r.preview_url}`);
    if (opts.sms) {
      console.log(`   💬 ${r.sms}`);
    }
    console.log();
  }

  console.log("─".repeat(90));

  // Export CSV
  if (opts.csv) {
    const csvHeader = "nom,telephone,ville,priorite,preview_url,sms";
    const csvRows = rows.map(
      (r) =>
        [r.nom, r.telephone, r.ville, r.priorite, r.preview_url, `"${r.sms}"`]
          .map((v) => {
            const s = String(v);
            if (s.includes(",") || s.includes('"') || s.includes("\n")) {
              return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
          })
          .join(",")
    );

    const csvContent = [csvHeader, ...csvRows].join("\n");
    const filtre = opts.ville || "all";
    const csvPath = resolve(process.cwd(), `preview-links-${filtre.toLowerCase()}.csv`);
    writeFileSync(csvPath, "\uFEFF" + csvContent, "utf-8");
    console.log(`\n📄 CSV exporté : ${csvPath}`);
  }

  // Résumé
  const hot = rows.filter((r) => r.priorite.includes("CHAUD")).length;
  const warm = rows.filter((r) => r.priorite.includes("TIEDE")).length;

  console.log(`
╔══════════════════════════════════════════╗
║       LIENS DE PREVIEW GÉNÉRÉS          ║
╠══════════════════════════════════════════╣
║  📊 Total     : ${String(rows.length).padEnd(23)}║
║  🔥 Chauds    : ${String(hot).padEnd(23)}║
║  🟡 Tièdes    : ${String(warm).padEnd(23)}║
║                                          ║
║  🔗 Base URL  : ${BASE_URL.slice(0, 22).padEnd(23)}║
╚══════════════════════════════════════════╝
`);
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
