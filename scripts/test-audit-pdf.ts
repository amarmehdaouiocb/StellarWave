/**
 * Test local du rendu PDF audit avec les data réelles de la dernière row Supabase.
 * Usage: SUPABASE_PAT=sbp_xxx tsx scripts/test-audit-pdf.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderAuditPdf } from "../src/lib/audit/render-pdf";
import { buildRecommendations } from "../src/lib/audit/recommendations";

const PROJECT_REF = "amytexztniqffpgitcqs";
const PAT = process.env.SUPABASE_PAT;
if (!PAT) {
  console.error("Set SUPABASE_PAT env var");
  process.exit(1);
}

async function fetchLastCompleted() {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `SELECT id, url, psi_data, seo_data, completed_at FROM audit_requests WHERE status='completed' ORDER BY completed_at DESC LIMIT 1;`,
      }),
    },
  );
  const rows = (await res.json()) as Array<{
    id: string;
    url: string;
    psi_data: any;
    seo_data: any;
    completed_at: string;
  }>;
  if (!rows.length) throw new Error("No completed audits found");
  return rows[0];
}

async function main() {
  console.log("→ Récupération du dernier audit completed...");
  const row = await fetchLastCompleted();
  console.log(`→ Audit ${row.id} : ${row.url}`);

  console.log("→ Build recommendations...");
  const recommendations = buildRecommendations(row.psi_data, row.seo_data);
  console.log(`→ ${recommendations.length} recos générées`);

  console.log("→ Render PDF...");
  const buffer = await renderAuditPdf({
    url: row.url,
    generatedAt: new Date(row.completed_at),
    psi: row.psi_data,
    seo: row.seo_data,
    recommendations,
  });

  const out = resolve(process.cwd(), ".plaquette-debug/audit-test.pdf");
  writeFileSync(out, buffer);
  console.log(`✔ PDF écrit : ${out} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
