# Infrastructure d'Acquisition - Documentation

## Vue d'ensemble

Cette documentation décrit l'infrastructure d'acquisition mise en place pour Stellar Wave. Elle comprend :
- APIs pour les formulaires (contact + audit)
- Templates email transactionnels
- Landing page dédiée au lead magnet
- Blog pour le content marketing
- Google Analytics 4 pour le tracking

---

## 1. APIs Email

### `/api/contact` - Formulaire de devis

**Fichier :** `src/app/api/contact/route.ts`

**Fonction :** Traite les soumissions du formulaire de demande de devis (EstimateForm).

**Flux :**
1. Reçoit les données du formulaire (POST)
2. Valide avec Zod (`estimateFormSchema`)
3. Vérifie l'anti-spam (honeypot + timing)
4. Envoie 2 emails via Resend :
   - **Notification interne** → `contact@stellarwave.fr` (tu reçois les détails du lead)
   - **Confirmation prospect** → Email du prospect (confirmation de réception)
5. (Optionnel) Envoie une notification Slack si `SLACK_WEBHOOK_URL` est configuré

**Données reçues :**
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: "landing-page" | "website" | "web-app" | "mobile-app" | "cloud" | "other";
  budget: "5k-10k" | "10k-25k" | "25k-50k" | "50k-100k" | "100k+" | "unknown";
  timeline: "asap" | "1-2months" | "3-6months" | "6months+" | "flexible";
  description: string;
  existingUrl?: string;
  referralSource?: string;
  consent: true;
}
```

**Réponses :**
- `200 { success: true }` → Succès (ou bot détecté silencieusement)
- `400 { error, details }` → Données invalides
- `500 { error }` → Erreur serveur

---

### `/api/audit` - Lead Magnet (Mini-audit)

**Fichier :** `src/app/api/audit/route.ts`

**Fonction :** Traite les demandes de mini-audit gratuit (LeadMagnet + page /audit-gratuit).

**Flux :**
1. Reçoit les données du formulaire (POST)
2. Valide avec Zod (`leadMagnetSchema`)
3. Vérifie l'anti-spam (honeypot + timing)
4. Envoie 2 emails via Resend :
   - **Notification interne** → `contact@stellarwave.fr` (avec checklist des actions)
   - **Confirmation prospect** → Email du prospect (confirmation + ce qu'il va recevoir)
5. (Optionnel) Envoie une notification Slack

**Données reçues :**
```typescript
{
  email: string;
  url: string; // URL du site à auditer
}
```

**Réponses :** Identiques à `/api/contact`

---

## 2. Templates Email

**Dossier :** `src/emails/`

Tous les templates utilisent [React Email](https://react.email/) pour un rendu HTML compatible avec tous les clients email.

### Templates disponibles

| Fichier | Usage | Destinataire |
|---------|-------|--------------|
| `contact-notification.tsx` | Notification nouveau lead (devis) | Toi (interne) |
| `contact-confirmation.tsx` | Confirmation demande reçue | Prospect |
| `audit-notification.tsx` | Notification demande audit | Toi (interne) |
| `audit-confirmation.tsx` | Confirmation audit en préparation | Prospect |

### Style des emails

- **Emails internes** : Fond clair, lisibilité, toutes les infos
- **Emails prospects** : Design dark premium, cohérent avec la marque, CTA vers le site

### Personnalisation

Pour modifier un template :
1. Édite le fichier `.tsx` correspondant
2. Les styles sont en bas du fichier (objets JavaScript)
3. Teste avec `npm run dev` et envoie un test via le formulaire

---

## 3. Landing Page `/audit-gratuit`

**Fichier :** `src/app/audit-gratuit/page.tsx`

**Fonction :** Page dédiée pour le lead magnet, optimisée pour la conversion depuis LinkedIn et autres sources externes.

### Éléments de conversion

| Élément | Description |
|---------|-------------|
| **Compteur de scarcité** | "Plus que X audits gratuits ce mois-ci" - Se réinitialise chaque mois |
| **Trust badges** | "Livré sous 24h", "100% gratuit", "Sans engagement" |
| **Témoignage** | Social proof avec note 5 étoiles |
| **Liste des livrables** | Ce que le prospect va recevoir |
| **Comment ça marche** | 3 étapes simples |
| **Formulaire** | Email + URL uniquement (friction minimale) |
| **Urgence** | Rappel visuel quand il reste peu de places |

### Compteur de scarcité

Le compteur utilise `localStorage` pour persister :
- Clé `audit_counter` : nombre restant
- Clé `audit_counter_month` : mois actuel

Se réinitialise à 5 au début de chaque mois. Décrémente à chaque soumission réussie.

**Pour ajuster le nombre initial :** Modifier la valeur dans `useScarcityCounter()`.

### URL à utiliser

- LinkedIn : `https://stellarwave.fr/audit-gratuit?utm_source=linkedin&utm_medium=social`
- Email : `https://stellarwave.fr/audit-gratuit?utm_source=email&utm_medium=newsletter`

---

## 4. Blog `/blog`

**Fichiers :**
- `src/app/blog/page.tsx` → Liste des articles
- `src/app/blog/[slug]/page.tsx` → Page article
- `src/content/blog.ts` → Données des articles

### Structure d'un article

```typescript
{
  slug: string;           // URL : /blog/{slug}
  title: string;          // Titre H1
  excerpt: string;        // Résumé (meta description + aperçu)
  content: string;        // Contenu HTML
  category: "performance" | "seo" | "cloud" | "dev" | "case-study";
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;    // Format ISO : "2024-01-15"
  readingTime: number;    // Minutes
  tags: string[];         // Pour les articles similaires
  featured?: boolean;     // Mis en avant sur la page liste
}
```

### Ajouter un article

1. Ouvrir `src/content/blog.ts`
2. Ajouter un objet dans le tableau `blogPosts`
3. Le contenu est en HTML (dans la propriété `content`)
4. L'article apparaît automatiquement sur `/blog` et `/blog/{slug}`

### Catégories disponibles

| Catégorie | Couleur | Usage |
|-----------|---------|-------|
| `performance` | Amber | Lighthouse, Core Web Vitals, optimisation |
| `seo` | Coral | Référencement, SEO technique |
| `cloud` | Teal | AWS, GCP, FinOps, infrastructure |
| `dev` | Rose | Code, frameworks, bonnes pratiques |
| `case-study` | Violet | Études de cas clients |

### SEO

Chaque article génère automatiquement :
- Meta title et description
- Open Graph tags
- JSON-LD (schema Article)
- Sitemap (via generateStaticParams)

---

## 5. Google Analytics 4

**Fichiers :**
- `src/components/analytics/GoogleAnalytics.tsx` → Composant + helpers
- `src/app/layout.tsx` → Intégration

### Configuration

1. Suivre le guide `docs/setup-google-analytics.md`
2. Ajouter l'ID dans `.env.local` :
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Tracking automatique

- **Pageviews** : Trackées automatiquement à chaque changement de route
- **UTM** : Récupérés automatiquement par GA4

### Tracking manuel (événements personnalisés)

```typescript
import { analytics, trackEvent } from "@/components/analytics";

// Événements prédéfinis
analytics.formSubmit("contact", true);
analytics.ctaClick("audit-gratuit", "hero");
analytics.leadGenerated("linkedin", "audit");

// Événement custom
trackEvent("video_played", { video_name: "demo", duration: 120 });
```

### Événements disponibles

| Fonction | Paramètres | Usage |
|----------|------------|-------|
| `formStart(formName)` | Nom du formulaire | Début de remplissage |
| `formSubmit(formName, success)` | Nom + succès | Soumission |
| `ctaClick(ctaName, location)` | Nom CTA + emplacement | Clic sur CTA |
| `externalLinkClick(url)` | URL | Lien externe |
| `scrollDepth(percentage)` | % scrollé | Engagement |
| `leadGenerated(source, type)` | Source + type | Conversion |

---

## 6. Configuration Resend

**Fichier :** `src/lib/resend.ts`

### Variables d'environnement requises

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### Configuration email

```typescript
emailConfig = {
  from: "Stellar Wave <contact@stellarwave.fr>",
  replyTo: "contact@stellarwave.fr",
  notificationEmail: "contact@stellarwave.fr", // Où tu reçois les notifs
}
```

**Pour changer l'email de notification :** Modifier `notificationEmail` dans `src/lib/resend.ts`.

### Vérification domaine

Le domaine `stellarwave.fr` doit être vérifié dans Resend :
1. Resend Dashboard → Domains → Add Domain
2. Ajouter les enregistrements DNS (SPF, DKIM) chez OVH
3. Vérifier dans Resend

---

## 7. Variables d'environnement

**Fichier exemple :** `.env.example`

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `RESEND_API_KEY` | ✅ | Clé API Resend pour l'envoi d'emails |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ❌ | ID Google Analytics 4 |
| `SLACK_WEBHOOK_URL` | ❌ | Webhook Slack pour notifications temps réel |

---

## 8. Slack (Optionnel)

Si tu veux recevoir des notifications Slack en temps réel :

1. Créer une app Slack : https://api.slack.com/apps
2. Activer "Incoming Webhooks"
3. Créer un webhook pour un channel (ex: #leads)
4. Copier l'URL dans `.env.local` :
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx
```

**Format des notifications :**
- Nouveau lead → Nom, email, entreprise, type de projet, budget
- Demande audit → Email, URL du site à auditer

---

## Arborescence des fichiers

```
src/
├── app/
│   ├── api/
│   │   ├── audit/route.ts        # API lead magnet
│   │   └── contact/route.ts      # API formulaire contact
│   ├── audit-gratuit/page.tsx    # Landing page lead magnet
│   └── blog/
│       ├── page.tsx              # Liste articles
│       └── [slug]/page.tsx       # Page article
├── components/
│   ├── analytics/
│   │   ├── GoogleAnalytics.tsx   # Composant GA4
│   │   └── index.ts
│   └── sections/
│       ├── EstimateForm.tsx      # Formulaire contact (modifié)
│       └── LeadMagnet.tsx        # Formulaire audit (modifié)
├── content/
│   └── blog.ts                   # Données articles
├── emails/
│   ├── audit-confirmation.tsx
│   ├── audit-notification.tsx
│   ├── contact-confirmation.tsx
│   ├── contact-notification.tsx
│   └── index.ts
└── lib/
    └── resend.ts                 # Config Resend

docs/
├── acquisition-infrastructure.md # Cette documentation
└── setup-google-analytics.md     # Guide GA4
```
