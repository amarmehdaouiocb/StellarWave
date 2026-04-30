import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Client lazy pour le serveur (avec service_role key)
let supabaseAdminInstance: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("⚠️ Supabase non configuré - les données ne seront pas sauvegardées");
    return null;
  }

  if (!supabaseAdminInstance) {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseAdminInstance;
};

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
  budget?: string | null;
};

// Types pour la table audit_requests (pipeline mini-audit Performance & SEO)
export type AuditRequestStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export type AuditRequest = {
  id: string;
  email: string;
  url: string;
  status: AuditRequestStatus;
  psi_data: PsiData | null;
  seo_data: SeoData | null;
  pdf_size_kb: number | null;
  error_message: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
  completed_at: string | null;
  sent_at: string | null;
};

export type PsiStrategy = "mobile" | "desktop";

export type PsiCategoryScores = {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
};

export type PsiCoreWebVitals = {
  lcp: number; // ms
  fcp: number; // ms
  cls: number; // unitless
  tbt: number; // ms
  si: number; // ms
};

export type PsiOpportunity = {
  id: string;
  title: string;
  description: string;
  savingsMs: number;
};

export type PsiResult = {
  strategy: PsiStrategy;
  scores: PsiCategoryScores;
  metrics: PsiCoreWebVitals;
  opportunities: PsiOpportunity[];
  failedAudits: { id: string; title: string }[];
};

export type PsiData = {
  mobile: PsiResult | null;
  desktop: PsiResult | null;
  _partial?: boolean;
};

export type SeoData = {
  https: boolean;
  redirected: boolean;
  finalUrl: string;
  httpStatus: number;
  title: { value: string | null; length: number; optimal: boolean };
  description: { value: string | null; length: number; optimal: boolean };
  canonical: { value: string | null; present: boolean };
  openGraph: {
    title: string | null;
    description: string | null;
    image: string | null;
    type: string | null;
    complete: boolean;
  };
  structuredData: { count: number; types: string[] };
  robotsTxt: { present: boolean };
  sitemap: { present: boolean };
  securityHeaders: { hsts: boolean; xContentType: boolean };
};
