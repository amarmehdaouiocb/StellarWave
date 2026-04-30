-- Migration: Création de la table audit_requests pour le pipeline
-- d'audit Performance & SEO automatisé.
-- Date: 2026-04-30

CREATE TABLE IF NOT EXISTS audit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  psi_data JSONB,
  seo_data JSONB,
  pdf_size_kb INTEGER,
  error_message TEXT,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ
);

-- Index pour les guards anti-abuse (rate limit IP, quota email)
CREATE INDEX IF NOT EXISTS idx_audit_requests_email_created
  ON audit_requests(email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_requests_ip_created
  ON audit_requests(ip, created_at DESC);

-- Index pour les jobs en cours (monitoring + alertes timeout)
CREATE INDEX IF NOT EXISTS idx_audit_requests_status
  ON audit_requests(status)
  WHERE status IN ('pending', 'processing');

-- RLS : seule la service_role accède (côté serveur uniquement)
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

-- Pas de policy publique : aucune lecture/écriture côté client.
-- Le formulaire passe par /api/audit qui utilise getSupabaseAdmin().

COMMENT ON TABLE audit_requests IS 'Pipeline d''audit Performance & SEO automatisé via PSI API + checks SEO + PDF Resend.';
COMMENT ON COLUMN audit_requests.status IS 'pending → processing (PSI/SEO en cours) → completed (PDF envoyé) | failed (erreur, voir error_message)';
COMMENT ON COLUMN audit_requests.psi_data IS 'Résultats PageSpeed Insights mobile + desktop (scores, Core Web Vitals, opportunities, audits)';
COMMENT ON COLUMN audit_requests.seo_data IS 'Checks SEO complémentaires : title, meta, OG, JSON-LD, robots.txt, sitemap, HTTPS, redirections';
