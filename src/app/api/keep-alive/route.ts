/**
 * GET /api/keep-alive
 *
 * Cron quotidien (voir vercel.json) qui effectue une requête légère sur
 * Supabase pour maintenir le projet actif et éviter la mise en pause
 * automatique des projets gratuits (qui survient après ~7 jours d'inactivité
 * et casse les formulaires audit / cabinet-ready).
 *
 * Sécurité : si CRON_SECRET est défini, on exige le header Authorization
 * envoyé par Vercel Cron. La requête reste de toute façon inoffensive (SELECT).
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, reason: "supabase non configuré" },
      { status: 200 },
    );
  }

  try {
    // Requête minimale (HEAD + count) : maintient l'activité du projet.
    const { error } = await supabase
      .from("audit_requests")
      .select("id", { head: true, count: "exact" })
      .limit(1);

    if (error) throw error;

    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[keep-alive] ping Supabase échoué:", err);
    // 200 volontaire : on n'alarme pas le cron, on log seulement.
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 200 },
    );
  }
}
