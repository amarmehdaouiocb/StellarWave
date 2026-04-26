import { NextRequest, NextResponse } from "next/server";
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

// Limites pièce jointe — alignées avec l'UI ("PDF, doc, images... 10 Mo max")
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_ATTACHMENT_PREFIXES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/",
];

type AttachmentResult =
  | { kind: "ok"; attachment: { filename: string; content: Buffer } | null }
  | { kind: "error"; status: number; message: string };

const buildAttachment = async (
  file: File | null,
): Promise<AttachmentResult> => {
  if (!file || file.size === 0) return { kind: "ok", attachment: null };

  if (file.size > MAX_ATTACHMENT_BYTES) {
    return {
      kind: "error",
      status: 413,
      message: "La pièce jointe dépasse 10 Mo.",
    };
  }

  const isAllowed = ALLOWED_ATTACHMENT_PREFIXES.some((prefix) =>
    file.type.startsWith(prefix),
  );
  if (!isAllowed) {
    return {
      kind: "error",
      status: 415,
      message: "Format de pièce jointe non supporté (PDF, DOC, images).",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    kind: "ok",
    attachment: { filename: file.name, content: buffer },
  };
};

// Parse soit FormData (multipart, avec ou sans fichier) soit JSON.
// Renvoie un objet plat compatible avec estimateFormSchema + le file éventuel.
type ParsedPayload = {
  raw: Record<string, unknown>;
  file: File | null;
};

const parseRequest = async (request: NextRequest): Promise<ParsedPayload> => {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const raw: Record<string, unknown> = {};
    let file: File | null = null;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (key === "file") file = value;
        continue;
      }
      // Type-coerce les champs qui ne sont pas des strings côté schema Zod.
      if (key === "consent") {
        raw[key] = value === "true";
      } else if (key === "_timestamp") {
        const n = Number(value);
        raw[key] = Number.isFinite(n) ? n : undefined;
      } else if (typeof value === "string" && value.length === 0) {
        // Champs optionnels vides → undefined pour ne pas casser les .optional()
        raw[key] = undefined;
      } else {
        raw[key] = value;
      }
    }
    return { raw, file };
  }

  // Fallback JSON (pas de fichier possible)
  const body = await request.json();
  return { raw: body, file: null };
};

export async function POST(request: NextRequest) {
  try {
    const { raw, file } = await parseRequest(request);

    // Validation Zod
    const result = estimateFormSchema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 },
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

    // Pièce jointe (validée + bufferisée). Reject si trop grosse / mauvais type.
    const attachmentResult = await buildAttachment(file);
    if (attachmentResult.kind === "error") {
      return NextResponse.json(
        { error: attachmentResult.message },
        { status: attachmentResult.status },
      );
    }
    const attachments = attachmentResult.attachment
      ? [attachmentResult.attachment]
      : undefined;

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
      // Email de notification interne (avec pièce jointe si fournie)
      resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.notificationEmail,
        replyTo: data.email,
        subject: `🚀 Nouvelle demande : ${data.firstName} ${data.lastName} - ${projectTypeLabels[data.projectType]}`,
        react: ContactNotificationEmail(emailData),
        attachments,
      }),
      // Email de confirmation au prospect
      resend.emails.send({
        from: emailConfig.from,
        to: data.email,
        subject: `Merci ${data.firstName} ! Votre demande a bien été reçue`,
        react: ContactConfirmationEmail({ firstName: data.firstName }),
      }),
    ]);

    // L'email de NOTIFICATION est CRITIQUE : c'est ce qui nous fait
    // remonter le lead. Si ça échoue → on renvoie une erreur au client
    // pour que l'UI affiche "Veuillez réessayer / contactez-nous directement".
    if (notificationResult.status === "rejected") {
      console.error(
        "[Contact API] Notification email failed:",
        notificationResult.reason,
      );
      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer votre demande pour le moment. Réessayez ou écrivez-nous directement à contact@stellarwave.fr.",
        },
        { status: 502 },
      );
    }

    // Resend renvoie aussi une erreur "applicative" dans { data, error }
    // sans rejeter la promise → on traite ce cas comme un échec également.
    const notificationValue = notificationResult.value as {
      data: unknown;
      error: unknown;
    } | null;
    if (notificationValue?.error) {
      console.error(
        "[Contact API] Notification email returned error:",
        notificationValue.error,
      );
      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer votre demande pour le moment. Réessayez ou écrivez-nous directement à contact@stellarwave.fr.",
        },
        { status: 502 },
      );
    }

    // L'email de CONFIRMATION au prospect est secondaire : si elle échoue,
    // on log seulement (le lead est déjà chez nous via la notif).
    if (confirmationResult.status === "rejected") {
      console.error(
        "[Contact API] Confirmation email failed:",
        confirmationResult.reason,
      );
    } else {
      const confirmationValue = confirmationResult.value as {
        data: unknown;
        error: unknown;
      } | null;
      if (confirmationValue?.error) {
        console.error(
          "[Contact API] Confirmation email returned error:",
          confirmationValue.error,
        );
      }
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
      hasAttachment: !!attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 },
    );
  }
}
