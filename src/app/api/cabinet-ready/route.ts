import { NextRequest, NextResponse } from "next/server";
import { resend, emailConfig } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";
import { CabinetReadyNotificationEmail } from "@/emails/cabinet-ready-notification";

// CORS headers pour permettre les requêtes cross-origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

// Preflight request handler
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Schéma de validation
const cabinetReadySchema = z.object({
  // Step 1: Infos cabinet
  poste: z.string().min(1),
  collaborateurs: z.string().min(1),
  clients: z.string().min(1),
  // Step 2: Préparation
  preparation: z.string().min(1),
  // Step 3: Outils
  outils: z.string().min(1),
  logiciel: z.string().optional(),
  // Step 4: Frustrations
  frustrations: z.string().optional(),
  "temps-passe": z.string().optional(),
  // Step 5: Contact
  prenom: z.string().min(1),
  email: z.string().email(),
  rdv: z.string().min(1),
  // Step 6: Upsell
  services: z.string().optional(),
  "projet-autre": z.string().optional(),
});

// Mappings pour affichage lisible
const posteLabels: Record<string, string> = {
  associe: "Associé(e) / Dirigeant(e)",
  directeur: "Directeur(trice) de cabinet",
  "responsable-production": "Responsable production",
  "responsable-mission": "Responsable de mission",
  collaborateur: "Collaborateur(trice)",
  autre: "Autre",
};

const preparationLabels: Record<string, string> = {
  "pas-commence": "🔴 Pas encore commencé",
  reflexion: "🟡 En réflexion / phase de cadrage",
  "en-cours": "🟢 En cours de déploiement",
  avance: "✅ Bien avancé (>50% des clients prêts)",
};

const outilsLabels: Record<string, string> = {
  excel: "Fichier Excel / Google Sheets",
  "logiciel-comptable": "Module du logiciel comptable",
  crm: "CRM / outil de gestion interne",
  rien: "Pas d'outil dédié",
};

const rdvLabels: Record<string, string> = {
  oui: "✅ Oui, avec plaisir",
  "peut-etre": "🤔 Peut-être, recontactez-moi",
  non: "❌ Non, mais tenez-moi informé(e)",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const result = cabinetReadySchema.safeParse(body);
    if (!result.success) {
      console.error("[Cabinet Ready API] Validation error:", result.error.flatten());
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400, headers: corsHeaders }
      );
    }

    const data = result.data;

    // Convertir les strings comma-separated en arrays pour Supabase
    const frustrationsArray = data.frustrations?.split(", ").filter(Boolean) || null;
    const servicesArray = data.services?.split(", ").filter(Boolean) || null;

    // Sauvegarder dans Supabase
    const { error: dbError } = await supabaseAdmin
      .from("cabinet_ready_responses")
      .insert({
        prenom: data.prenom,
        email: data.email,
        rdv: data.rdv,
        poste: data.poste,
        collaborateurs: data.collaborateurs,
        clients: data.clients,
        preparation: data.preparation,
        outils: data.outils,
        logiciel: data.logiciel || null,
        frustrations: frustrationsArray,
        temps_passe: data["temps-passe"] || null,
        services: servicesArray,
        projet_autre: data["projet-autre"] || null,
      });

    if (dbError) {
      console.error("[Cabinet Ready API] Supabase error:", dbError);
      // On continue quand même pour envoyer l'email
    } else {
      console.log("[Cabinet Ready API] Saved to Supabase");
    }

    // Préparer les données pour le template email
    const emailData = {
      prenom: data.prenom,
      email: data.email,
      rdv: data.rdv,
      poste: data.poste,
      collaborateurs: data.collaborateurs,
      clients: data.clients,
      preparation: data.preparation,
      outils: data.outils,
      logiciel: data.logiciel,
      frustrations: data.frustrations,
      tempsPasse: data["temps-passe"],
      services: data.services,
      projetAutre: data["projet-autre"],
    };

    // Envoyer l'email avec le template React
    const emailResult = await resend.emails.send({
      from: emailConfig.from,
      to: "amar@stellarwave.fr",
      replyTo: data.email,
      subject: `[Cabinet Ready] ${data.prenom} — ${posteLabels[data.poste] || data.poste} (${data.collaborateurs} collab.)`,
      react: CabinetReadyNotificationEmail(emailData),
    });

    if (emailResult.error) {
      console.error("[Cabinet Ready API] Email error:", emailResult.error);
      throw new Error("Erreur envoi email");
    }

    // Optionnel : Webhook Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `📋 *Nouvelle réponse Cabinet Ready*`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*${data.prenom}* - ${posteLabels[data.poste] || data.poste}\n📧 ${data.email}\n🏢 ${data.collaborateurs} collaborateurs, ${data.clients} clients`,
                },
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `Préparation: ${preparationLabels[data.preparation] || data.preparation} | RDV: ${rdvLabels[data.rdv] || data.rdv}`,
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackError) {
        console.error("[Cabinet Ready API] Slack webhook failed:", slackError);
      }
    }

    console.log("[Cabinet Ready API] Response submitted:", {
      prenom: data.prenom,
      email: data.email,
      poste: data.poste,
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("[Cabinet Ready API] Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500, headers: corsHeaders }
    );
  }
}
