# Stellar Wave - Customization Guide

Ce guide explique comment personnaliser les tokens de design, la typographie, et les sections.

## Table des matières

1. [Design Tokens](#design-tokens)
2. [Typographie](#typographie)
3. [Couleurs & Power Colors](#couleurs--power-colors)
4. [Sections](#sections)
5. [Ajouter une Case Study](#ajouter-une-case-study)

---

## Design Tokens

Les tokens de design sont centralisés dans `src/lib/design-tokens.ts`.

### Modifier les couleurs principales

```typescript
// src/lib/design-tokens.ts
export const tokens = {
  colors: {
    // Accent Ember (orange/amber)
    accent: {
      amber: "oklch(0.79 0.16 85)",  // Modifiez ces valeurs
      coral: "oklch(0.705 0.185 47)",
      rose: "oklch(0.65 0.22 350)",
    },

    // Power Color (bleu électrique)
    power: {
      blue: "oklch(0.65 0.22 255)",  // Changez pour une autre teinte
      // ...
    },
  },
};
```

### Modifier les rayons de bordure

```typescript
radius: {
  card: "28px",    // Cards principales
  button: "20px",  // Boutons
  chip: "999px",   // Pills/Badges
  input: "16px",   // Champs de formulaire
},
```

### CSS Variables

Les tokens sont aussi disponibles en CSS dans `globals.css`:

```css
:root {
  --ember-amber: oklch(0.79 0.16 85);
  --power-blue: oklch(0.65 0.22 255);
  --power-yellow: oklch(0.88 0.18 95);
}
```

---

## Typographie

### Installer les fonts premium

1. **Téléchargez les fonts** depuis [Fontshare](https://www.fontshare.com):
   - Clash Display (display/headlines)
   - Cabinet Grotesk (body/UI)

2. **Placez les fichiers .woff2** dans `/public/fonts/`:
   ```
   public/fonts/
   ├── ClashDisplay-Bold.woff2
   ├── ClashDisplay-Semibold.woff2
   ├── ClashDisplay-Medium.woff2
   ├── CabinetGrotesk-Regular.woff2
   ├── CabinetGrotesk-Medium.woff2
   └── CabinetGrotesk-Bold.woff2
   ```

3. **Activez dans** `src/lib/fonts.ts`:
   ```typescript
   const PREMIUM_FONTS_INSTALLED = true; // Changez false → true
   ```

### Échelle typographique

La hiérarchie typographique est définie dans les design tokens:

| Élément | Taille Desktop | Poids | Letter-spacing |
|---------|---------------|-------|----------------|
| H1      | 56-72px       | 800   | -0.04em        |
| H2      | 40-52px       | 700   | -0.03em        |
| H3      | 28-34px       | 600   | -0.02em        |
| Lead    | 18-20px       | 400   | 0              |
| Body    | 16-18px       | 400   | 0.01em         |
| Caption | 12-13px       | 500   | 0.02em         |

### Classes utilitaires

```jsx
// Headline XXL avec tracking négatif
<h1 className="text-display-heavy">...</h1>

// Texte body avec espacement optimal
<p className="text-body-relaxed">...</p>
```

---

## Couleurs & Power Colors

### Palette Ember (accents principaux)

| Variable          | Valeur OKLCH            | Usage                    |
|-------------------|------------------------|--------------------------|
| `--ember-amber`   | oklch(0.79 0.16 85)    | CTA principal, accents   |
| `--ember-coral`   | oklch(0.705 0.185 47)  | Gradients, hovers        |
| `--ember-rose`    | oklch(0.65 0.22 350)   | Accents secondaires      |

### Power Colors (cards saturées)

| Variable          | Valeur OKLCH            | Usage                    |
|-------------------|------------------------|--------------------------|
| `--power-blue`    | oklch(0.65 0.22 255)   | Cards "développement"    |
| `--power-yellow`  | oklch(0.88 0.18 95)    | Cards "design"           |

### Changer les Power Colors

Pour un look différent, modifiez dans `globals.css`:

```css
/* Exemple: Power Color en vert */
--power-blue: oklch(0.65 0.22 145);
--power-blue-light: oklch(0.75 0.18 145);
--power-blue-dark: oklch(0.55 0.22 145);
```

---

## Sections

### Architecture des sections

```
src/components/sections/
├── Hero.tsx              # 100vh, video background
├── MosaicAZ.tsx          # Grid 2 colonnes, cards saturées
├── FullBleedCaseStudy.tsx # 100vh, mockup flottant
├── Services.tsx          # Grid de services
├── FullBleedCloud.tsx    # 100vh, wireframe monoline
├── ProjectsCarousel.tsx  # Carrousel projets
├── FinalCTA.tsx          # CTA final énorme
└── ...
```

### Ordre des sections (page.tsx)

```tsx
<main>
  <Hero />                    {/* CALME - Cinématique */}
  <TrustBanner />
  <MosaicAZ />                {/* CALME - Cards grid */}
  <FullBleedCaseStudy />      {/* CHOC - 100vh */}
  <Services />                {/* CALME */}
  <WhyUs />
  <FullBleedCloud />          {/* CHOC - 100vh */}
  <ProjectsCarousel />        {/* CALME */}
  <CaseStudies />
  <ProofCards />
  <Process />
  <Offers />
  <LeadMagnet />
  <EstimateForm />
  <FAQ />
  <FinalCTA />                {/* CHOC - CTA énorme */}
</main>
```

---

## Ajouter une Case Study

### 1. Créer les données

Dans `src/config/brand.ts`, ajoutez votre case study:

```typescript
export const caseStudies = [
  {
    title: "Nom du Projet",
    client: "Nom du Client",
    category: "E-commerce" | "SaaS" | "Mobile" | "Cloud",
    metrics: {
      conversion: "+340%",
      performance: "0.8s",
      users: "50K+",
    },
    description: "Description courte...",
    image: "/projects/project-name.webp",
    url: "https://...",
  },
];
```

### 2. Ajouter l'image

Placez l'image dans `/public/projects/`:
- Format: WebP
- Taille: 1200x800px minimum
- Aspect ratio: 3:2 ou 16:9

### 3. Mettre à jour le composant

Le composant `CaseStudies.tsx` lit automatiquement depuis `brand.ts`.

---

## Animations & Motion

### Scroll reveal

Toutes les sections utilisent `AnimatedSection` avec Framer Motion:

```tsx
<AnimatedSection
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
```

### Désactiver les animations

Pour les utilisateurs avec `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();
// Les animations sont automatiquement désactivées
```

### Hover effects

Classes utilitaires pour les effets hover:

```css
.hover-lift     /* translateY + shadow */
.hover-glow     /* glow effect */
.hover-scale    /* scale 1.02 */
```

---

## Performance

### Images

Utilisez toujours `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/hero/hero-poster-4k.webp"
  alt="..."
  width={1920}
  height={1080}
  priority // Pour les images above-the-fold
/>
```

### Lazy loading

Les sections lourdes sont lazy-loaded automatiquement via Intersection Observer.

### Fonts

- Preload activé pour les fonts critiques
- `display: swap` pour éviter le FOIT
- Seulement 2-3 weights par font

---

## Support

Pour toute question, consultez:
- `/public/fonts/README.md` - Installation des fonts
- `/src/lib/design-tokens.ts` - Référence des tokens
- Les commentaires dans chaque composant
