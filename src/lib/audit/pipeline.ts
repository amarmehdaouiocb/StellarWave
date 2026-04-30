/**
 * Orchestrateur du pipeline d'audit.
 * Étapes (toutes dans `after()` après réponse HTTP) :
 *   1. update status = 'processing'
 *   2. runPSIBoth + runSeoChecks en parallèle
 *   3. buildRecommendations
 *   4. update psi_data + seo_data + status = 'completed'
 *   5. renderAuditPdf → buffer
 *   6. resend.emails.send avec attachment
 *   7. update sent_at
 *
 * Tolérance d'erreur : chaque étape try/catch, status `failed` + Slack alert.
 */
import { resend, emailConfig } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AuditConfirmationEmail } from "@/emails/audit-confirmation";
import { AuditNotificationEmail } from "@/emails/audit-notification";
import { runPSIBoth } from "./psi";
import { runSeoChecks } from "./seo";
import { buildRecommendations } from "./recommendations";
import { renderAuditPdf } from "./render-pdf";
import { notifySlack } from "./alerts";
import { MONTHLY_ALERT_THRESHOLD, MONTHLY_HARD_CAP } from "./guards";

export type PipelineInput = {
  id: string;
  email: string;
  url: string;
};

/**
 * Exécute le pipeline complet pour une demande audit.
 * À appeler dans `after()` de la route POST /api/audit.
 */
export async function runAuditPipeline(input: PipelineInput): Promise<void> {
  const { id, email, url } = input;
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error(
      "[Pipeline] Supabase non configuré — pipeline impossible",
      { id },
    );
    await notifySlack({
      severity: "critical",
      title: "Pipeline audit impossible (Supabase KO)",
      context: { id, email, url },
    });
    return;
  }

  const startTime = Date.now();

  try {
    // 1) processing
    await supabase
      .from("audit_requests")
      .update({ status: "processing" })
      .eq("id", id);

    // 2) PSI + SEO en parallèle
    const [psiData, seoData] = await Promise.all([
      runPSIBoth(url),
      runSeoChecks(url),
    ]);

    // 3) recommandations
    const recommendations = buildRecommendations(psiData, seoData);

    // 4) update completed
    await supabase
      .from("audit_requests")
      .update({
        psi_data: psiData,
        seo_data: seoData,
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", id);

    // 5) PDF
    const pdfBuffer = await renderAuditPdf({
      url,
      generatedAt: new Date(),
      psi: psiData,
      seo: seoData,
      recommendations,
    });

    const pdfSizeKb = Math.round(pdfBuffer.byteLength / 1024);
    const pdfFilename = sanitizeFilename(url);

    // 6) email avec attachment
    const [confirmRes, notifRes] = await Promise.allSettled([
      resend.emails.send({
        from: emailConfig.from,
        to: email,
        subject: "Votre mini-audit Performance & SEO est prêt",
        react: AuditConfirmationEmail({ url, ready: true }),
        attachments: [
          {
            filename: pdfFilename,
            content: pdfBuffer,
          },
        ],
      }),
      resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.notificationEmail,
        replyTo: email,
        subject: `✅ Audit livré : ${url}`,
        react: AuditNotificationEmail({
          email,
          url,
          completed: true,
          mobileScores: psiData.mobile?.scores ?? null,
          desktopScores: psiData.desktop?.scores ?? null,
        }),
      }),
    ]);

    if (confirmRes.status === "rejected") {
      throw new Error(
        `Resend confirmation failed: ${
          confirmRes.reason instanceof Error
            ? confirmRes.reason.message
            : String(confirmRes.reason)
        }`,
      );
    }

    if (notifRes.status === "rejected") {
      // Non bloquant : on a livré le client, on log juste
      console.error(
        "[Pipeline] Notification interne échouée:",
        notifRes.reason,
      );
    }

    // 7) sent_at
    await supabase
      .from("audit_requests")
      .update({
        sent_at: new Date().toISOString(),
        pdf_size_kb: pdfSizeKb,
      })
      .eq("id", id);

    const durationS = Math.round((Date.now() - startTime) / 1000);
    console.log(
      `[Pipeline] ✓ Audit ${id} livré en ${durationS}s (${pdfSizeKb} KB)`,
    );

    // Alerte si on approche du quota mensuel
    await checkMonthlyAlert();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const durationS = Math.round((Date.now() - startTime) / 1000);
    console.error(`[Pipeline] ✗ Audit ${id} failed after ${durationS}s:`, err);

    await supabase
      .from("audit_requests")
      .update({
        status: "failed",
        error_message: message.slice(0, 500),
      })
      .eq("id", id);

    await notifySlack({
      severity: "high",
      title: "Audit pipeline échoué",
      context: {
        id,
        email,
        url,
        error: message.slice(0, 200),
        duration_s: durationS,
      },
    });

    // Best-effort : email prospect "audit retardé"
    try {
      await resend.emails.send({
        from: emailConfig.from,
        to: email,
        subject: "Votre mini-audit est en cours de préparation",
        react: AuditConfirmationEmail({ url, ready: false, delayed: true }),
      });
    } catch (emailErr) {
      console.error(
        "[Pipeline] Email retard également échoué:",
        emailErr,
      );
    }
  }
}

function sanitizeFilename(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const safe = host.replace(/[^a-z0-9.-]/gi, "_");
    return `audit-${safe}.pdf`;
  } catch {
    return "audit-stellarwave.pdf";
  }
}

async function checkMonthlyAlert(): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("audit_requests")
    .select("*", { count: "exact", head: true })
    .gte("created_at", monthStart.toISOString());

  const used = count ?? 0;

  if (used === MONTHLY_ALERT_THRESHOLD) {
    await notifySlack({
      severity: "warning",
      title: `Quota audit ${MONTHLY_ALERT_THRESHOLD}/${MONTHLY_HARD_CAP} ce mois`,
      context: {
        used,
        remaining: MONTHLY_HARD_CAP - used,
        month: monthStart.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        }),
      },
    });
  }
}
