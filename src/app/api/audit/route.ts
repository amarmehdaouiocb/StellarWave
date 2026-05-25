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
import { getClientIp, runGuards, type GuardResult } from "@/lib/audit/guards";
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

    const email = data.email.toLowerCase();

    // 3) Guards (rate limit, quota, URL HEAD, blacklist) — BEST-EFFORT.
    // Si la DB est indisponible (projet en pause), on ne bloque pas le lead.
    let guard: GuardResult;
    try {
      guard = await runGuards({ email, url: data.url }, request);
    } catch (guardErr) {
      console.error(
        "[Audit API] Guards indisponibles (Supabase ?), on continue best-effort:",
        guardErr,
      );
      guard = { ok: true };
    }
    if (!guard.ok) {
      return NextResponse.json(
        { error: guard.reason },
        { status: guard.status },
      );
    }

    // 4) Insert pending (tracking) — BEST-EFFORT.
    // Si l'insert échoue (Supabase en pause/indisponible), on ne renvoie PAS
    // d'erreur au prospect : on lance quand même le pipeline pour lui livrer
    // son PDF (le lead n'est jamais perdu). On alerte uniquement en interne.
    const supabase = getSupabaseAdmin();
    let trackingId = `nodb-${Date.now()}`;

    if (!supabase) {
      console.warn(
        "[Audit API] Supabase non configuré — pipeline sans tracking",
      );
    } else {
      try {
        const { data: row, error: insertError } = await supabase
          .from("audit_requests")
          .insert({
            email,
            url: data.url,
            status: "pending",
            ip: getClientIp(request),
            user_agent:
              request.headers.get("user-agent")?.slice(0, 500) ?? null,
          })
          .select("id")
          .single();

        if (insertError || !row) {
          console.error(
            "[Audit API] Insert échoué — pipeline best-effort:",
            insertError,
          );
          await notifySlack({
            severity: "high",
            title: "Insert audit_requests échoué — pipeline lancé sans tracking",
            context: {
              email,
              url: data.url,
              error: insertError?.message ?? "unknown",
            },
          });
        } else {
          trackingId = row.id;
        }
      } catch (insertErr) {
        console.error(
          "[Audit API] Insert exception — pipeline best-effort:",
          insertErr,
        );
        await notifySlack({
          severity: "high",
          title: "Insert audit_requests exception — pipeline lancé sans tracking",
          context: {
            email,
            url: data.url,
            error:
              insertErr instanceof Error
                ? insertErr.message
                : String(insertErr),
          },
        });
      }
    }

    // 5) Pipeline async — réponse instant au client. La demande valide réussit
    // toujours côté client, même si le tracking DB a échoué.
    after(() =>
      runAuditPipeline({ id: trackingId, email, url: data.url }).catch((err) =>
        console.error("[Audit pipeline failed]", trackingId, err),
      ),
    );

    return NextResponse.json({ success: true, id: trackingId });
  } catch (err) {
    console.error("[Audit API] Error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 },
    );
  }
}
