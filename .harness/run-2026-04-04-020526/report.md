# Harness Report — run-2026-04-04-020526

## Brief
Redesign de src/app/page.tsx inspiré de landonorris.com. Direction esthétique : dark premium, palette sombre avec couleur accent néon amber/coral, typographie fluide, smooth scroll, animations scroll-driven, hero sticky, navigation thème dynamique, hover reveal, marquee de logos. Vitrine d'agence web avec craft exceptionnel.

## Résultat
Convergence atteinte à l'itération 10/15
Score final : 8.0/10

## Progression des scores

| Itération | Design | Originalité | Craft | Fonctionnalité | A11y | Responsive | Perf. | Global |
|-----------|--------|-------------|-------|----------------|------|------------|-------|--------|
| 1         | 5.0    | 5.0         | 4.0   | 3.0            | 4.0  | 5.0        | 3.0   | 4.1    |
| 2         | 5.5    | 4.5         | 5.0   | 6.5            | 6.0  | 5.5        | 6.0   | 5.6    |
| 3         | 6.2    | 5.8         | 6.0   | 6.5            | 5.5  | 6.5        | 6.0   | 6.07   |
| 4         | 7.0    | 6.5         | 6.5   | 7.5            | 6.0  | 6.5        | 7.0   | 6.71   |
| 5         | 7.2    | 6.8         | 6.9   | 7.5            | 7.0  | 7.2        | 7.3   | 7.13   |
| 6         | 6.8    | 7.2         | 6.0   | 5.5            | 6.5  | 5.0        | 6.5   | 6.21   |
| 7         | 7.5    | 7.1         | 7.3   | 7.8            | 6.8  | 7.5        | 7.5   | 7.36   |
| 8         | 7.8    | 6.9         | 7.6   | 7.9            | 7.2  | 7.7        | 7.5   | 7.51   |
| 9         | 7.8    | 7.5         | 7.7   | 8.2            | 7.0  | 7.9        | 7.8   | 7.7    |
| 10        | 8.1    | 7.6         | 8.0   | 8.2            | 7.8  | 8.3        | 8.0   | 8.0    |

## Incidents et apprentissages

- **Itération 2** : Découverte du bug IntersectionObserver — les animations `whileInView` de Framer Motion ne se déclenchent pas dans Playwright headless. Solution : fallback CSS + timer.
- **Itération 6** : Régression causée par `overflow-hidden` ajouté avec les watermarks. Solution : `overflow-x: clip` au lieu de `overflow-hidden`.
- **Leçon clé** : L'accessibilité (contraste) est le critère le plus difficile à satisfaire sur un thème dark. Nécessite des audits exhaustifs fichier par fichier.

## Fichiers modifiés
- src/app/globals.css
- src/app/page.tsx
- src/app/layout.tsx
- src/components/sections/Hero.tsx
- src/components/sections/Services.tsx
- src/components/sections/Proof.tsx
- src/components/sections/ProcessSimple.tsx
- src/components/sections/OffersWithFAQ.tsx
- src/components/sections/Contact.tsx
- src/components/sections/ImpactDivider.tsx (nouveau)
- src/components/sections/index.ts
- src/components/shared/CTAButton.tsx
- src/components/shared/AnimatedSection.tsx
- src/components/shared/ScrollProgress.tsx
- src/components/layout/NavPill.tsx
- src/components/layout/Footer.tsx

## Screenshots finaux
- Mobile : iteration-10/screenshot-375.png
- Tablet : iteration-10/screenshot-768.png
- Desktop : iteration-10/screenshot-1440.png
