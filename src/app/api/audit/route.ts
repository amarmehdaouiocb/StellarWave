/**
 * POST /api/audit
 *
 * 1. Valide les inputs (Zod + anti-spam honeypot/timing)
 * 2. Exécute les guards (rate limit IP, quota email, URL HEAD, blacklist, quota global)
 * 3. INSERT row 'pending' dans audit_requests
 * 4. Renvoie 200 { id } INSTANT au client
 * 5. Lance le pipeline (PSI + SEO + PDF + email) en BACKGROUND via after()
 *
 * Le client n'attend pas la fin du pipeline : il voit l'écran de succès
 * tout de suite, et reçoit son PDF par email en ~30-60 secondes.
 */
import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { leadMagnetSchema, validateAntiSpam } from "@/lib/validators";
import { getClientIp, runGuards } from "@/lib/audit/guards";
import { runAuditPipeline } from "@/lib/audit/pipeline";
import { notifySlack } from "@/lib/audit/alerts";

export const runtime = "nodejs";
// Le pipeline tourne dans after() — la route elle-même n'a besoin que
// de quelques secondes pour les guards + insert. On garde maxDuration
// élevé au cas où after() prolonge l'exécution serverless.
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1) Zod
    const result = leadMagnetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 },
      );
    }
    const data = result.data;

    // 2) Anti-spam (honeypot + timing)
    const { isBot, reason } = validateAntiSpam({
      website: data.website,
      _timestamp: data._timestamp,
    });
    if (isBot) {
      console.log("[Audit API] Bot detected:", reason);
      // Réponse success pour ne pas révéler la détection
      return NextResponse.json({ success: true });
    }

    // 3) Guards (rate limit, quota, URL HEAD, blacklist)
    const guard = await runGuards(
      { email: data.email.toLowerCase(), url: data.url },
      request,
    );
    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.reason },
        { status: guard.status },
      );
    }

    // 4) Insert pending
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      // En dev sans Supabase, on lance quand même le pipeline en best-effort
      // (sans tracking DB) pour permettre les tests locaux.
      console.warn("[Audit API] Supabase non configuré — fallback pipeline sans tracking");

      const fakeId = `local-${Date.now()}`;
      after(() =>
        runAuditPipeline({
          id: fakeId,
          email: data.email.toLowerCase(),
          url: data.url,
        }).catch((err) =>
          console.error("[Audit pipeline failed]", fakeId, err),
        ),
      );

      return NextResponse.json({ success: true, id: fakeId });
    }

    const { data: row, error: insertError } = await supabase
      .from("audit_requests")
      .insert({
        email: data.email.toLowerCase(),
        url: data.url,
        status: "pending",
        ip: getClientIp(request),
        user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      })
      .select("id")
      .single();

    if (insertError || !row) {
      console.error("[Audit API] Insert failed:", insertError);
      await notifySlack({
        severity: "high",
        title: "Insert audit_requests échoué",
        context: {
          email: data.email,
          url: data.url,
          error: insertError?.message ?? "unknown",
        },
      });
      return NextResponse.json(
        { error: "Erreur interne, équipe alertée." },
        { status: 500 },
      );
    }

    // 5) Pipeline async — réponse instant au client
    after(() =>
      runAuditPipeline({
        id: row.id,
        email: data.email.toLowerCase(),
        url: data.url,
      }).catch((err) =>
        console.error("[Audit pipeline failed]", row.id, err),
      ),
    );

    return NextResponse.json({ success: true, id: row.id });
  } catch (err) {
    console.error("[Audit API] Error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 },
    );
  }
}
