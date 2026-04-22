-- Migration: Add budget column to cabinet_ready_responses
-- Date: 2026-02-12

ALTER TABLE cabinet_ready_responses
ADD COLUMN IF NOT EXISTS budget TEXT;

-- Commentaire pour documentation
COMMENT ON COLUMN cabinet_ready_responses.budget IS 'Budget mensuel envisagé pour les services (ex: <50, 50-100, 100-200, 200-500, 500+, ne-sait-pas)';
