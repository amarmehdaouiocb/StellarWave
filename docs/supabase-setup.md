# Supabase Setup — StellarWave / Cabinet Ready

## Informations du projet

| Clé | Valeur |
|-----|--------|
| **Project Name** | stellarwave |
| **Project Ref** | `amytexztniqffpgitcqs` |
| **Region** | Central EU (Frankfurt) |
| **Dashboard** | https://supabase.com/dashboard/project/amytexztniqffpgitcqs |
| **API URL** | `https://amytexztniqffpgitcqs.supabase.co` |

## Credentials

### PAT (Personal Access Token)

Utilisé pour les commandes CLI Supabase (déploiement, migrations, etc.)

```
sbp_d03723e0119596ce734e57b6ed9f3c47451fd16b
```

**Usage CLI :**
```bash
SUPABASE_ACCESS_TOKEN=sbp_d03723e0119596ce734e57b6ed9f3c47451fd16b npx supabase <commande> --project-ref amytexztniqffpgitcqs
```

### API Keys

| Type | Usage | Valeur |
|------|-------|--------|
| **anon** | Client-side (public) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXRleHp0bmlxZmZwZ2l0Y3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTg1ODEsImV4cCI6MjA4NjMzNDU4MX0.2P-nA4d-TC-TQOIDHsUbJQ0wffjBEpz2PyqZ_XUqOWM` |
| **service_role** | Server-side (secret) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXRleHp0bmlxZmZwZ2l0Y3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc1ODU4MSwiZXhwIjoyMDg2MzM0NTgxfQ.mri7w0qf2nNZW-vlICm43TG55aLUtq03bUc5gcv7jho` |

⚠️ **Ne jamais exposer `service_role` côté client !**

---

## Variables d'environnement

### Local (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://amytexztniqffpgitcqs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXRleHp0bmlxZmZwZ2l0Y3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTg1ODEsImV4cCI6MjA4NjMzNDU4MX0.2P-nA4d-TC-TQOIDHsUbJQ0wffjBEpz2PyqZ_XUqOWM
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteXRleHp0bmlxZmZwZ2l0Y3FzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc1ODU4MSwiZXhwIjoyMDg2MzM0NTgxfQ.mri7w0qf2nNZW-vlICm43TG55aLUtq03bUc5gcv7jho
```

### Vercel (Production)

Ajouter ces variables dans **Settings → Environment Variables** :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Commandes utiles

### Lister les projets
```bash
SUPABASE_ACCESS_TOKEN=sbp_d03723e0119596ce734e57b6ed9f3c47451fd16b npx supabase projects list
```

### Exécuter du SQL
```bash
SUPABASE_ACCESS_TOKEN=sbp_d03723e0119596ce734e57b6ed9f3c47451fd16b npx supabase db execute --project-ref amytexztniqffpgitcqs -f migration.sql
```

### Appliquer une migration
```bash
SUPABASE_ACCESS_TOKEN=sbp_d03723e0119596ce734e57b6ed9f3c47451fd16b npx supabase db push --project-ref amytexztniqffpgitcqs
```

---

## Tables

### `cabinet_ready_responses`

Stocke les réponses du questionnaire Cabinet Ready.

```sql
CREATE TABLE cabinet_ready_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contact
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  rdv TEXT NOT NULL,

  -- Cabinet
  poste TEXT NOT NULL,
  collaborateurs TEXT NOT NULL,
  clients TEXT NOT NULL,

  -- Préparation
  preparation TEXT NOT NULL,
  outils TEXT NOT NULL,
  logiciel TEXT,

  -- Frustrations
  frustrations TEXT[],
  temps_passe TEXT,

  -- Upsell
  services TEXT[],
  projet_autre TEXT
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_responses_created_at ON cabinet_ready_responses(created_at DESC);
CREATE INDEX idx_responses_preparation ON cabinet_ready_responses(preparation);
CREATE INDEX idx_responses_poste ON cabinet_ready_responses(poste);
```

---

## Requêtes d'analyse

### Répartition par état de préparation
```sql
SELECT preparation, COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
FROM cabinet_ready_responses
GROUP BY preparation
ORDER BY count DESC;
```

### Top frustrations
```sql
SELECT unnest(frustrations) as frustration, COUNT(*) as count
FROM cabinet_ready_responses
WHERE frustrations IS NOT NULL
GROUP BY frustration
ORDER BY count DESC;
```

### Logiciels comptables utilisés
```sql
SELECT logiciel, COUNT(*) as count
FROM cabinet_ready_responses
WHERE logiciel IS NOT NULL
GROUP BY logiciel
ORDER BY count DESC;
```

### Intérêt services agence
```sql
SELECT unnest(services) as service, COUNT(*) as count
FROM cabinet_ready_responses
WHERE services IS NOT NULL AND 'aucun' != ALL(services)
GROUP BY service
ORDER BY count DESC;
```

### Leads chauds (dispo RDV + frustrations + upsell)
```sql
SELECT prenom, email, poste, collaborateurs, clients, preparation
FROM cabinet_ready_responses
WHERE rdv = 'oui'
  AND array_length(frustrations, 1) >= 2
ORDER BY created_at DESC;
```

---

*Dernière mise à jour : 10 février 2026*
