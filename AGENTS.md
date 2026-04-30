# Instructions Codex - Stellar Wave

Ce fichier contient les instructions spécifiques au projet Stellar Wave pour Codex.

---

## 1) Stack technique

- **Framework** : Next.js 16 (App Router)
- **React** : 19
- **Styling** : Tailwind CSS 4 + CSS Variables
- **Animations** : Framer Motion
- **Icônes** : Phosphor Icons
- **Validation** : Zod
- **Emails** : Resend + React Email
- **Analytics** : Google Analytics 4

---

## 2) Design System - Ember Luxe Theme

Le projet utilise un thème dark premium "Ember Luxe" avec des tons chauds.

### Couleurs principales (CSS Variables)

```css
--ember-amber: #f59e0b    /* Couleur accent principale */
--ember-coral: #ef6c4a    /* Couleur secondaire/hover */
--ember-rose: #f472b6     /* Accent tertiaire */
--ember-teal: #2dd4bf     /* Succès/validations */
--ember-violet: #a78bfa   /* Accent alternatif */
```

### Utilisation dans le code

```tsx
// Tailwind
className="text-[var(--ember-amber)]"
className="bg-[var(--ember-coral)]"

// Style inline
style={{ color: 'var(--ember-amber)' }}
```

---

## 3) UI/UX Policy - OBLIGATOIRE

**🚨 RÈGLE NON-NÉGOCIABLE : TOUJOURS utiliser le skill `frontend-design`**

Avant **TOUTE** modification liée à l'UI/UX, tu DOIS invoquer le skill `frontend-design`.

| Type de modification | Action requise |
|---------------------|----------------|
| Nouveau composant UI | ✅ `frontend-design` OBLIGATOIRE |
| Modification de styles | ✅ `frontend-design` OBLIGATOIRE |
| Layout / responsive | ✅ `frontend-design` OBLIGATOIRE |
| Pages / sections | ✅ `frontend-design` OBLIGATOIRE |
| Formulaires | ✅ `frontend-design` OBLIGATOIRE |
| Animations / transitions | ✅ `frontend-design` OBLIGATOIRE |
| Couleurs / typography / spacing | ✅ `frontend-design` OBLIGATOIRE |

**Comment invoquer :**
```
Skill: frontend-design
```

Le skill garantit :
- Cohérence avec le design system Ember Luxe
- Qualité premium (pas de "AI slop")
- Typographie distinctive
- Animations soignées
- Accessibilité

---

## 4) Structure des fichiers

```
src/
├── app/                    # Pages (App Router)
│   ├── api/               # Routes API
│   │   ├── contact/       # Formulaire de devis
│   │   └── audit/         # Lead magnet
│   ├── audit-gratuit/     # Landing page lead magnet
│   └── blog/              # Blog SEO
├── components/
│   ├── analytics/         # Google Analytics 4
│   ├── forms/             # Formulaires (EstimateForm, LeadMagnet)
│   ├── layout/            # NavPill, Footer
│   ├── sections/          # Sections de la landing page
│   └── shared/            # Composants réutilisables
├── config/
│   └── brand.ts           # Configuration marque (nom, domaine, etc.)
├── content/
│   └── blog.ts            # Données des articles de blog
├── emails/                # Templates React Email
│   ├── contact-*.tsx      # Emails formulaire contact
│   └── audit-*.tsx        # Emails lead magnet
└── lib/
    └── resend.ts          # Configuration Resend
```

---

## 5) Conventions de code

### Composants

```tsx
// Nommage : PascalCase
export function MyComponent() { }

// Props typées avec `type` (pas `interface`)
type MyComponentProps = {
  title: string;
  variant?: 'primary' | 'secondary';
};
```

### Animations (Framer Motion)

```tsx
// Utiliser les variants pour la cohérence
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

<motion.div {...fadeIn}>
```

### Validation (Zod)

```tsx
const schema = z.object({
  email: z.string().email("Email invalide"),
  // ...
});
```

---

## 6) Variables d'environnement

| Variable | Usage |
|----------|-------|
| `RESEND_API_KEY` | Envoi d'emails (obligatoire en prod) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `SLACK_WEBHOOK_URL` | Notifications Slack (optionnel) |

---

## 7) Domaine et marque

- **Domaine** : `stellarwave.fr`
- **Email** : `contact@stellarwave.fr`
- **Nom** : Stellar Wave
- **Tagline** : Product & Cloud Studio

Ces valeurs sont centralisées dans `src/config/brand.ts`.

---

## 8) Documentation

La documentation technique est dans le dossier `docs/` :
- `acquisition-infrastructure.md` - Infrastructure d'acquisition complète
- `setup-google-analytics.md` - Guide de configuration GA4
