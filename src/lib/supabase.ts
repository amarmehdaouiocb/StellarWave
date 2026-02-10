import { createClient } from "@supabase/supabase-js";

// Client pour le serveur (avec service_role key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Types pour la table cabinet_ready_responses
export type CabinetReadyResponse = {
  id?: string;
  created_at?: string;
  prenom: string;
  email: string;
  rdv: string;
  poste: string;
  collaborateurs: string;
  clients: string;
  preparation: string;
  outils: string;
  logiciel?: string | null;
  frustrations?: string[] | null;
  temps_passe?: string | null;
  services?: string[] | null;
  projet_autre?: string | null;
};
