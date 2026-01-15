# Stellar Wave - Landing Page Premium

Landing page ultra-premium pour **Stellar Wave**, studio digital spécialisé en landing pages, applications web/mobile et architecture cloud.

## Stack technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS Variables
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Fonts**: Sora + DM Sans (Google Fonts)

## Installation

```bash
# Cloner le projet
git clone <repo-url>
cd stellar-wave

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout root + metadata + JSON-LD
│   ├── page.tsx            # Page principale (13 sections)
│   ├── merci/page.tsx      # Page de remerciement
│   ├── globals.css         # Styles globaux + thème Aurora
│   ├── sitemap.ts          # Sitemap dynamique
│   ├── robots.ts           # robots.txt
│   └── opengraph-image.tsx # Image OG générée
├── components/
│   ├── layout/             # Navigation, Footer
│   ├── sections/           # 12 sections de la landing
│   ├── shared/             # Composants réutilisables
│   └── ui/                 # shadcn/ui components
├── config/
│   └── brand.ts            # Configuration centralisée
├── lib/
│   ├── animations.ts       # Variants Framer Motion
│   ├── validators.ts       # Schemas Zod
│   └── utils.ts            # Utilitaires (cn)
└── types/
    └── index.ts            # Types TypeScript
```

## Configuration

Toute la configuration est centralisée dans `src/config/brand.ts` :

- **brand**: Nom, tagline, coordonnées, réseaux sociaux
- **services**: Liste des services
- **offers**: Offres et tarifs
- **faqs**: Questions fréquentes
- **caseStudies**: Études de cas
- **proofMetrics**: Métriques avant/après

## Personnalisation

### Modifier le contenu

1. Éditez `src/config/brand.ts` pour modifier textes, services, prix, etc.
2. Les changements sont reflétés automatiquement dans toute l'application.

### Modifier le thème

Le thème "Aurora Cinema" est défini dans `src/app/globals.css` :

- **Couleurs**: Variables CSS dans `:root`
- **Glass effects**: Classes `.glass` et `.glass-heavy`
- **Gradients**: `.aurora-gradient`, `.text-gradient`
- **Animations**: Classes utilitaires Tailwind

### Ajouter des images

1. Placer les images dans `public/`
2. Structure recommandée :
   ```
   public/
   ├── hero-1.jpg, hero-2.jpg, hero-3.jpg
   ├── projects/
   │   └── project-*.jpg
   ├── cases/
   │   └── *.jpg
   └── logos/
       └── *.svg
   ```

## Formulaires

Les formulaires sont en mode "UI only" (pas de backend connecté). Pour les connecter :

1. **Lead Magnet** (`LeadMagnet.tsx`): Modifier `onSubmit` pour envoyer à votre API
2. **Estimation** (`EstimateForm.tsx`): Modifier `onSubmit` pour envoyer à votre API

### Protection anti-spam

- **Honeypot**: Champ caché `website` que les bots remplissent
- **Timing check**: Rejette les soumissions < 3 secondes
- **Validation Zod**: Validation stricte côté client

## SEO

### Metadata

Configuré dans `src/app/layout.tsx` :
- Title, description, keywords
- OpenGraph (Facebook, LinkedIn)
- Twitter Card
- Canonical URL

### JSON-LD (Structured Data)

4 schemas inclus :
- Organization
- WebSite
- Service (Développement d'applications)
- Service (Architecture cloud)

### Fichiers SEO

- `sitemap.ts`: Génère `/sitemap.xml`
- `robots.ts`: Génère `/robots.txt`
- `opengraph-image.tsx`: Génère l'image OG dynamiquement

## Checklist avant mise en production

### SEO
- [ ] Vérifier les metadata dans `layout.tsx`
- [ ] Tester l'image OG sur [opengraph.xyz](https://opengraph.xyz)
- [ ] Valider JSON-LD sur [Schema Validator](https://validator.schema.org)
- [ ] Vérifier le sitemap `/sitemap.xml`
- [ ] Configurer Google Search Console

### Conversion
- [ ] Connecter les formulaires à un backend (API, Formspree, etc.)
- [ ] Configurer Calendly avec votre vrai lien
- [ ] Ajouter Google Analytics / Plausible
- [ ] Configurer les événements de conversion

### Performance
- [ ] Optimiser les images (WebP, compression)
- [ ] Vérifier Lighthouse score (cible: 90+)
- [ ] Activer le cache CDN (Vercel Edge)
- [ ] Minifier les assets (automatique avec Next.js)

### Accessibilité
- [ ] Tester avec un lecteur d'écran
- [ ] Vérifier les contrastes de couleur
- [ ] Tester la navigation clavier
- [ ] Valider sur [WAVE](https://wave.webaim.org/)

### Légal
- [ ] Ajouter les mentions légales
- [ ] Créer la politique de confidentialité
- [ ] Configurer le bandeau cookies (si nécessaire)

## Déploiement

### Vercel (recommandé)

```bash
# Via CLI
npm i -g vercel
vercel

# Ou via l'interface Vercel
# Connecter le repo GitHub/GitLab
```

### Variables d'environnement

Aucune variable requise pour le moment. À ajouter si vous connectez :
- API de formulaires
- Analytics
- CMS

## Support

Pour toute question ou problème, contactez l'équipe de développement.

---

Conçu avec [Next.js](https://nextjs.org) + [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
