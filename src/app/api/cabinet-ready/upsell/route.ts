import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

// CORS headers pour permettre les requêtes cross-origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

// Preflight request handler
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Schéma de validation pour l'upsell
const upsellSchema = z.object({
  email: z.string().email(),
  services: z.string().optional(), // comma-separated
  projetAutre: z.string().optional(),
  budget: z.string().optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const result = upsellSchema.safeParse(body);
    if (!result.success) {
      console.error("[Cabinet Ready Upsell] Validation error:", result.error.flatten());
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400, headers: corsHeaders }
      );
    }

    const data = result.data;

    // Convertir les strings comma-separated en arrays
    const servicesArray = data.services?.split(", ").filter(Boolean) || null;

    // Mettre à jour dans Supabase
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.error("[Cabinet Ready Upsell] Supabase non configuré");
      return NextResponse.json(
        { error: "Base de données non configurée" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Trouver le dernier record pour cet email et le mettre à jour
    const { data: existingRecord, error: findError } = await supabase
      .from("cabinet_ready_responses")
      .select("id")
      .eq("email", data.email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (findError || !existingRecord) {
      console.error("[Cabinet Ready Upsell] Record not found:", findError);
      return NextResponse.json(
        { error: "Réponse non trouvée" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Construire l'objet de mise à jour
    const updateData: Record<string, unknown> = {};

    if (servicesArray && servicesArray.length > 0) {
      updateData.services = servicesArray;
    }

    if (data.projetAutre && data.projetAutre.trim()) {
      updateData.projet_autre = data.projetAutre.trim();
    }

    if (data.budget) {
      updateData.budget = data.budget;
    }

    // Ne pas faire de mise à jour si aucune donnée
    if (Object.keys(updateData).length === 0) {
      console.log("[Cabinet Ready Upsell] No data to update");
      return NextResponse.json({ success: true, message: "Aucune donnée à mettre à jour" }, { headers: corsHeaders });
    }

    const { error: updateError } = await supabase
      .from("cabinet_ready_responses")
      .update(updateData)
      .eq("id", existingRecord.id);

    if (updateError) {
      console.error("[Cabinet Ready Upsell] Update error:", updateError);
      return NextResponse.json(
        { error: "Erreur de mise à jour" },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log("[Cabinet Ready Upsell] Updated record:", {
      id: existingRecord.id,
      email: data.email,
      services: servicesArray,
      hasProjetAutre: !!data.projetAutre,
      budget: data.budget,
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("[Cabinet Ready Upsell] Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500, headers: corsHeaders }
    );
  }
}
