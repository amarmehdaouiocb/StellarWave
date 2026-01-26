import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { resend, emailConfig, type ContactEmailData } from "@/lib/resend";
import { estimateFormSchema, validateAntiSpam } from "@/lib/validators";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";

// Types pour le mapping des labels
const projectTypeLabels: Record<string, string> = {
  "landing-page": "Landing page premium",
  website: "Site web / vitrine",
  "web-app": "Application web (SaaS, dashboard...)",
  "mobile-app": "Application mobile (iOS/Android)",
  cloud: "Architecture cloud / DevOps",
  other: "Autre",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation Zod
    const result = estimateFormSchema.safeParse(body);
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
      console.log("[Contact API] Bot detected:", reason);
      return NextResponse.json({ success: true });
    }

    // Préparer les données email
    const emailData: ContactEmailData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
      existingUrl: data.existingUrl,
      referralSource: data.referralSource,
    };

    // Envoyer les emails en parallèle
    const [notificationResult, confirmationResult] = await Promise.allSettled([
      // Email de notification interne
      resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.notificationEmail,
        replyTo: data.email,
        subject: `🚀 Nouvelle demande : ${data.firstName} ${data.lastName} - ${projectTypeLabels[data.projectType]}`,
        react: ContactNotificationEmail(emailData),
      }),
      // Email de confirmation au prospect
      resend.emails.send({
        from: emailConfig.from,
        to: data.email,
        subject: `Merci ${data.firstName} ! Votre demande a bien été reçue`,
        react: ContactConfirmationEmail({ firstName: data.firstName }),
      }),
    ]);

    // Log les résultats
    if (notificationResult.status === "rejected") {
      console.error(
        "[Contact API] Notification email failed:",
        notificationResult.reason
      );
    }
    if (confirmationResult.status === "rejected") {
      console.error(
        "[Contact API] Confirmation email failed:",
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
            text: `🚀 *Nouvelle demande de devis*`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*${data.firstName} ${data.lastName}*\n${data.company ? `🏢 ${data.company}\n` : ""}📧 ${data.email}${data.phone ? `\n📞 ${data.phone}` : ""}`,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Type:* ${projectTypeLabels[data.projectType]}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Budget:* ${data.budget}`,
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackError) {
        console.error("[Contact API] Slack webhook failed:", slackError);
      }
    }

    console.log("[Contact API] Contact form submitted successfully:", {
      email: data.email,
      projectType: data.projectType,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
