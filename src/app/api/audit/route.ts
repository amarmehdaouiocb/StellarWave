import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { resend, emailConfig, type AuditEmailData } from "@/lib/resend";
import { leadMagnetSchema, validateAntiSpam } from "@/lib/validators";
import { AuditNotificationEmail } from "@/emails/audit-notification";
import { AuditConfirmationEmail } from "@/emails/audit-confirmation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation Zod
    const result = leadMagnetSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Anti-spam validation
    const { isBot, reason } = validateAntiSpam({
      website: data.website,
      _timestamp: data._timestamp,
    });

    if (isBot) {
      // Return success to not reveal bot detection
      console.log("[Audit API] Bot detected:", reason);
      return NextResponse.json({ success: true });
    }

    // Préparer les données email
    const emailData: AuditEmailData = {
      email: data.email,
      url: data.url,
    };

    // Envoyer les emails en parallèle
    const [notificationResult, confirmationResult] = await Promise.allSettled([
      // Email de notification interne
      resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.notificationEmail,
        replyTo: data.email,
        subject: `🔍 Mini-audit demandé : ${data.url}`,
        react: AuditNotificationEmail(emailData),
      }),
      // Email de confirmation au prospect
      resend.emails.send({
        from: emailConfig.from,
        to: data.email,
        subject: `Votre mini-audit est en préparation !`,
        react: AuditConfirmationEmail({ url: data.url }),
      }),
    ]);

    // Log les résultats
    if (notificationResult.status === "rejected") {
      console.error(
        "[Audit API] Notification email failed:",
        notificationResult.reason
      );
    }
    if (confirmationResult.status === "rejected") {
      console.error(
        "[Audit API] Confirmation email failed:",
        confirmationResult.reason
      );
    }

    // Optionnel : Webhook Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🔍 *Nouvelle demande de mini-audit*`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `📧 ${data.email}\n🔗 <${data.url}|${data.url}>`,
                },
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: "⏰ Rapport à envoyer sous 24h",
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackError) {
        console.error("[Audit API] Slack webhook failed:", slackError);
      }
    }

    console.log("[Audit API] Audit request submitted successfully:", {
      email: data.email,
      url: data.url,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Audit API] Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
