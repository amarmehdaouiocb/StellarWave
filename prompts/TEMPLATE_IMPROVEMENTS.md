Tu es Claude Opus 4.5 en mode “senior product designer + senior frontend engineer”.
Projet: Stellar Wave (Next.js + TS + Tailwind + Framer Motion).
Objectif: intégrer un rendu “WOW” en alternant chapitres full-page (100vh, full-bleed) + sections mosaïque de cards (inspiration wiistudio.fr) tout en conservant l’ADN actuel (dark premium, glassmorphism, aurora gradients, sidebar).

NOUVELLE EXIGENCE : TYPOGRAPHIE SIGNATURE (OBLIGATOIRE)
Je veux une police premium “rare” (éviter Inter, Manrope, Poppins, Montserrat, Space Grotesk, DM Sans, etc.).
- Choisis 1 font principale (display/headlines) + 1 font secondaire (body/UI) qui matchent le style dark premium + editorial minimal.
- La font doit être intégrée proprement dans Next.js, idéalement via:
  A) next/font/local (préféré) avec fichiers .woff2 (à ajouter dans /public/fonts), ou
  B) self-host (fichiers téléchargés), ou
  C) en dernier recours seulement: une font non “overused” accessible via une fonderie/host fiable (mais évite les Google Fonts classiques).
- Si tu ne peux pas fournir les fichiers, implémente la structure complète + variables CSS + classes Tailwind, et laisse des placeholders + instructions claires “où mettre les .woff2”.
- Typo requirements:
  - Titres: très impactants, lourds, tracking légèrement négatif, tailles XXL.
  - Corps: hyper lisible, sobre, bon contraste sur fond dark.
  - Appliquer une vraie hiérarchie: H1/H2/H3, lead, body, caption, chips.
  - Pas de “font mismatch”: tout le design doit sembler construit autour de la typo.

RÉFÉRENCE DE STYLE (à respecter)
- ADN actuel: dark premium, arrière-plan aurora/blur, glass panels, accents orange, sidebar à gauche.
- Nouveau rendu à intégrer: “editorial minimal + cards grid + gros aplats saturés + typographie XXL + monoline geometry + mockups flottants”, MAIS sans transformer tout le site en fond clair: les cards couleur sont des “panneaux” posés sur le fond dark.
- Alternance de rythme: CALME (cards propres) -> CHOC (full-bleed 100vh) -> CALME -> CHOC.

ARCHITECTURE DE PAGE (ordre exact)
1) HERO (100vh) : conserver “Performance & Conversion” + CTA.
   - Améliorer: hero full page + background aurora plus cinématique (grain + light sweep subtil), KPI cards en dock.
2) SECTION MOSAÏQUE “Le digital de A à Z” (1 à 2 écrans)
   - Grille 2 colonnes: 
     - grosse card couleur saturée (bleu électrique OU jaune chaud) avec titre XXL + sous-texte court,
     - card neutre (blanc cassé/clair) avec “Core Web Vitals / SEO / Perf” style “assessment passed”.
   - Sous-ligne: 2 petites cards (mockups + chips/badges).
3) FULL-BLEED CASE STUDY (100vh)
   - Layout: phrase forte à gauche, mockup géant à droite/derrière (floating + ombres diffuses + blur).
   - 3 bullets (perf, conversion, délai) + mini proof (logos placeholders).
4) SERVICES (cards) : design system cohérent (radius, blur, border).
5) FULL-BLEED CLOUD (100vh)
   - Fond dark + schéma monoline géant (wireframe) en opacity faible (VPC / CI/CD / Observability).
   - Overlay de 4 cards: Audit / Sécurité / IaC / Scaling-FinOps.
6) RÉALISATIONS: grid + filtres (placeholders)
7) CTA FINAL (simple, énorme)

DESIGN SYSTEM / TOKENS (obligatoire)
- Définir et appliquer des tokens dans un fichier: src/styles/design-tokens.ts (ou lib/tokens.ts)
  - colors: background dark, surface glass, border subtle, text primary/secondary, accent orange, + 1 “power color” (bleu OU jaune) + neutrals.
  - radius: card (28–32), button (18–22), chip (999), input (16–18)
  - shadows: 2 niveaux max, très diffus
  - blur: 1 valeur unique pour tout le glass
- RÈGLES: 2 accents maximum (orange + 1 power). Ne pas multiplier les couleurs.

TYPO IMPLEMENTATION (détails attendus)
- Mettre en place:
  - /public/fonts/<FontName>-*.woff2 (placeholder si besoin)
  - src/styles/fonts.ts utilisant next/font/local avec fallback system
  - CSS variables: --font-display, --font-sans
  - Tailwind config: fontFamily.display / fontFamily.sans
  - Appliquer dans layout.tsx (className) et sur les titres/sections.
- Fournir un “type scale” cohérent:
  - H1: 56–72px desktop (responsive)
  - H2: 40–52px
  - H3: 28–34px
  - Lead: 18–20px
  - Body: 16–18px
  - Caption/Chip: 12–13px
- Ajuster letter-spacing:
  - display: tracking -0.02 à -0.04
  - body: tracking normal / légèrement positif si nécessaire

MOTION / INTERACTIONS (Framer Motion)
- Entrées au scroll: fade + translateY 12–20px, duration 0.6–0.9, ease douce.
- Hovers cards: translateY 4–8px + shadow up + border un poil plus visible.
- Background: animation lente (20–40s) sur l’aurora (CSS keyframes) + noise statique.
- Optionnel (subtil): spotlight très léger au mouvement de souris sur les chapitres full-bleed (désactivable en prefers-reduced-motion).

PERF & SEO (obligatoire)
- Next Image pour les visuels (placeholders si besoin).
- Lazy-load sections lourdes.
- Metadata (title/description/OG), headings propres, JSON-LD Organization + Service.
- Fonts: preload + display swap, poids limités (2–3 weights max), woff2 only.

LIVRABLE ATTENDU
- Implémentation complète sur la page principale:
  - composants: HeroFullBleed, MosaicAZ, FullBleedCaseStudy, FullBleedCloud, ServicesGrid, WorkGrid, FinalCTA
  - un dossier /components/sections et /components/ui (Card, Badge, Button, StatPill…)
- Typo intégrée et appliquée partout (pas juste le hero).
- Code propre, lisible, “non vibecoded”:
  - pas de duplications, props typées, variants, classnames propres.
- Fournir aussi:
  - un mini README (comment modifier les couleurs/tokens, comment ajouter une case study, comment remplacer les fonts avec de vrais .woff2).

PLAN D’EXÉCUTION (important)
1) Analyse de la structure existante (fichiers, composants, styles).
2) Création des tokens + refacto des composants UI pour s’y conformer.
3) Mise en place typography (next/font/local + tailwind + scale) + application globale.
4) Ajout des 3 nouvelles sections (Mosaic + 2 full-bleed) + wiring navigation.
5) Ajout motion + perf + SEO.
6) Vérification responsive (mobile/tablet/desktop) + prefers-reduced-motion.

Maintiens l’identité Stellar Wave actuelle, ajoute les chapitres “WOW”, la mosaïque cards façon wiistudio, ET une typo signature rare, self-hosted, parfaitement intégrée.
Implémente maintenant.
