/**
 * GET /api/audit/quota
 * Retourne le nombre d'audits encore disponibles ce mois.
 * Utilisé par la page /audit-gratuit pour afficher la vraie scarcité
 * (remplace le compteur localStorage trompeur).
 */
import { NextResponse } from "next/server";
import { getMonthlyRemaining } from "@/lib/audit/guards";

export const runtime = "nodejs";
// Pas de cache : la valeur évolue en quasi-temps-réel
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMonthlyRemaining();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("[Quota API] Error:", err);
    return NextResponse.json(
      {
        remaining: 100,
        monthLabel: new Date().toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        }),
        hardCap: 100,
      },
      { status: 200 },
    );
  }
}
