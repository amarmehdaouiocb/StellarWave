# Case studies — Contenu pour la section "Ce qu'on construit"

Document de référence pour la section fan deck (9 cards). Contient :
1. Liste des projets
2. Drafts case studies (Société / Besoin / Solution)
3. Prompts d'illustration (GPT Image 2 / gpt-image-1)
4. Notes techniques d'implémentation

---

## 1. Liste finale — 9 projets

| # | Nom | Catégorie | Slug |
|---|---|---|---|
| 1 | Fidelya | Restaurant CRM | `fidelya` |
| 2 | Stellarvision | Vidéo SaaS copropriétés | `stellarvision` |
| 3 | Coproflow | OS gestion syndic | `coproflow` |
| 4 | BoatAcademy | SaaS permis bateau | `boat-academy` |
| 5 | OnMangeQuoi | Annuaire commerces alimentaires | `on-mange-quoi` |
| 6 | MariposaWorld | Vitrine artisan / atelier | `mariposa-world` |
| 7 | École Gallieni | App TAXI / VTC native + dashboard | `ecole-gallieni` |
| 8 | GP Formation | Site TAXI / VTC | `gp-formation` |
| 9 | Formation EDV | Site formation médicale (Étoile de Vie) | `formation-edv` |

> **Note** : 9 cards = recalcul des positions du fan deck (centre = card 5, écartement étendu jusqu'à ±960px). Adapter les `:nth-child` + le media query `1100px`.

---

## 2. Drafts case studies

Format : **01 La société** / **02 Le besoin** / **03 La solution**.

---

### 1. Fidelya — Restaurant CRM

**01 La société**
Restaurants indépendants et petites chaînes en France qui veulent reprendre la main sur leur relation client sans dépendre des marketplaces tiers (Uber Eats, TheFork).

**02 Le besoin**
Outils de fidélité fragmentés (carte papier, app SMS, marketing externe). Pas de vue unifiée du client. Aucun cashier web simple. Impossible de mesurer l'impact réel des campagnes.

**03 La solution**
Cashier web (QR scan + transactions), portal membre passwordless, programmes loyalty (points / visites / cashback), campagnes email + SMS automatisées, gestion menu + commandes (sur place / à emporter / pré-co), reviews centralisées, intégrations POS / réservation / livraison.
**Stack** : Next.js · Supabase · e2e tests · codecov.

---

### 2. Stellarvision — Vidéo SaaS copropriétés

**01 La société**
Cabinets syndic et conseils syndicaux gérant des copropriétés équipées de caméras parties communes (parkings, halls, accès).

**02 Le besoin**
L'extraction d'une séquence après incident prend des heures (déplacement gardien, sortie disque dur, transfert manuel). Conformité RGPD floue : qui accède, qui valide, où est le registre ? Risque CNIL en cas d'audit.

**03 La solution**
Plateforme SaaS d'extraction à la demande, traçabilité complète (qui a demandé, quand, validé par qui), durée de rétention configurable, registre RGPD intégré, validation par conseil syndical. Compatible ONVIF.
**Stack** : MVP vertical slice end-to-end (caméra → gateway → portal) déployé en Docker Compose.

---

### 3. Coproflow — OS gestion syndic

**01 La société**
Cabinets syndic indépendants et conseils syndicaux qui veulent moderniser la gestion administrative et financière sans logiciel monolithique vieillissant.

**02 Le besoin**
Outils legacy lourds (ergonomie 2005, multi-fenêtres pour préparer une AG). Pas de portail copropriétaire moderne. Conseil syndical privé de visibilité temps réel sur les comptes et les travaux.

**03 La solution**
Plateforme dashboard SaaS avec auth multi-rôles (gestionnaire / conseil / copropriétaire), gestion AG, comptes par lot, appels de fonds, suivi travaux, vue temps réel pour le conseil.
**Stack** : Next.js 16 · Supabase RLS multi-tenant.

---

### 4. BoatAcademy — SaaS permis bateau

**01 La société**
Auto-écoles nautiques formant au permis bateau (côtier, hauturier, fluvial). Marché niche, fragmenté, sans outil métier.

**02 Le besoin**
Stagiaires gérés sur Excel, paiement par chèque, suivi pédagogique sur papier. Aucune app stagiaire pour réviser, voir le planning, payer en ligne.

**03 La solution**
Architecture monorepo : back-office admin web (Next.js 15 + Tailwind) + app mobile stagiaire (Expo SDK 52 + NativeWind). Synchronisation offline-first. Publié iOS + Android.
**Stack** : Next.js 15 · Expo SDK 52 · Supabase RLS · Stripe Checkout.

---

### 5. OnMangeQuoi — Annuaire commerces alimentaires

**01 La société**
Plateforme de référencement de commerces alimentaires (boulangeries, primeurs, traiteurs, fromagers) qui alimente une expérience consumer "qu'est-ce qu'on mange aujourd'hui ?".

**02 Le besoin**
Inscrire 1000+ commerces nécessite un workflow simple (formulaire public) + une admin pour valider, modérer, exporter. Pas de budget pour coder une admin from scratch.

**03 La solution**
Form public avec upload photos vers Supabase Storage + dashboard admin pour valider / éditer / exporter. Coverage tests, déploiement Netlify.
**Stack** : React · Vite · Tailwind · Supabase (auth + storage + RLS) · React Router.

---

### 6. MariposaWorld — Vitrine artisan / atelier

**01 La société**
Maison de savoir-faire artisanal (textile et accessoires haut de gamme). Univers éditorial premium, marque qui vend par l'émotion.

**02 Le besoin**
Sortir du template e-commerce générique. Raconter le geste, le matériau, le rituel. Faire vibrer la marque, pas vendre un panier.

**03 La solution**
Site éditorial avec Hero asymétrique, MasonryGallery, ArtisanTrail (parcours scroll-driven), SavoirFaire (storytelling séquencé), PrivateSession (formulaire RDV privé).
**Stack** : Next.js 16 · React 19 · Framer Motion · Lenis (scroll smooth) · react-hook-form + Zod.

---

### 7. École Gallieni — App TAXI / VTC native + dashboard

**01 La société**
Centre de formation TAXI / VTC à Paris. Formations longues (préparation examen) avec contenu structuré (vidéos, QCM, fiches), suivi stagiaire individualisé.

**02 Le besoin**
Le studio précédent avait livré une app instable, refusée à plusieurs reprises par Apple Review, avec un backend mal documenté. Reprise complète demandée + audit + republication.

**03 La solution**
Reprise iOS (Swift) + Android (Kotlin) + backend, audit technique complet, dossier Apple Review réussi (republication App Store + Play Store), dashboard gérant pour suivi stagiaires, documentation produit, fiches Connect / Console.
**Stack** : Swift (iOS) · Kotlin (Android) · backend custom · App Store + Play Store.

---

### 8. GP Formation — Site TAXI / VTC

**01 La société**
Centre de formation TAXI / VTC. Mêmes formations qu'École Gallieni (initiale, continue, mobilité, passerelle Taxi↔VTC, distance, soir), identité distincte (vert dégradé).

**02 Le besoin**
Site vitrine professionnel (16+ pages formations) avec réservation RDV intégrée. Les concurrents ont des sites datés ; il fallait sortir du lot par la modernité visuelle.

**03 La solution**
~16 pages : fiches formation, tarifs, contact, blog, légales. Bouton flottant prise de RDV (Google Calendar iframe). Identité brand complète (logo, signature, carte de visite). Déployé Vercel.
**Stack** : Next.js 16 · Tailwind 4 · Framer Motion · HugeIcons · Vercel.

---

### 9. Formation EDV — Étoile de Vie (formation médicale)

**01 La société**
Centre de formation médicale Étoile de Vie (Paris) — auxiliaire ambulancier, DEA, brancardier, AFGSU 1/2, SST, PSC, Référent SST, Formateur SST. Partenaire Croix-Rouge.

**02 Le besoin**
Site vitrine qui inspire confiance dans un secteur sensible (urgence, secourisme). Mettre en avant la rigueur pédagogique et le partenariat Croix-Rouge.

**03 La solution**
Site Next.js (charte bleue / blanche), pages détaillées par formation (programmes Croix-Rouge), SEO local. Identité de marque complète : cartes de visite imprimables (PDF/X CMYK fonds perdus), signature email, refonte logo.
**Stack** : Next.js · Tailwind · charte print PDF/X.

---

## 3. Prompts d'illustration (GPT Image 2 / gpt-image-1)

**Format conseillé** : portrait 2:3 (cohérent avec les cards verticales 320×560 ≈ 4:7).
**Style global** : éditorial, premium, abstract + typo. Cohésion typographique entre toutes les illustrations — Bodoni serif italique pour le nom de la marque + Mona Sans uppercase pour le label de catégorie. Aucun visage humain réaliste. Aucun logo réel reproduit.

---

### 1. Fidelya

```
Editorial portrait illustration, 2:3 vertical, premium magazine style. Foreground: a glossy ceramic plate with steam rising in spiraling patterns that resolve into abstract loyalty icons (heart, points circle, return arrow). Background: deep gradient ember orange (#f9ce34) → magenta (#ee2a7b) → royal violet (#6228d7), film grain. Upper-left, large serif italic typography reads "Fidelya" in cream-white. Bottom-right, small uppercase sans-serif label "RESTAURANT CRM". Atmospheric warmth meets data elegance. No people, no logos. Style: art-house photography meets data viz.
```

### 2. Stellarvision

```
Editorial portrait illustration, 2:3 vertical, dark cinematic style. Foreground: an abstract residential courtyard at dusk seen through a stylized camera-lens iris with concentric rings and faint cyan scan lines, suggesting both surveillance and care. Background: deep slate gradient (#1f2937 → #0f172a → #020617), soft cyan rim light, fine film grain. Upper-left, serif italic typography reads "Stellarvision" in pearl white. Bottom-right, uppercase sans-serif label "VIDÉO SAAS · COPROPRIÉTÉS". No human faces, no real logos. Style: brutalist architecture photo meets editorial poster.
```

### 3. Coproflow

```
Editorial portrait illustration, 2:3 vertical, refined corporate style. Foreground: an abstract isometric stack of translucent geometric apartment-block ribbons flowing water-like between floors, evoking effortless orchestration of residential units. Background: corporate blue gradient (#0a66c2 → #1f7fd8 → #073860). Upper-left, serif italic typography reads "Coproflow" in soft cream. Bottom-right, uppercase sans-serif label "OS · GESTION SYNDIC". Sophisticated, clean. No people. Style: Bauhaus diagram meets Apple keynote aesthetic.
```

### 4. BoatAcademy

```
Editorial portrait illustration, 2:3 vertical, vibrant nautical style. Foreground: a single sailboat silhouette navigating a stylized horizon line; the wake forms abstract data-waves and connection nodes. Background: vibrant cyan → coral → black gradient (#25f4ee · #000000 · #fe2c55) with faint compass rose and latitude/longitude lines. Upper-left, serif italic typography reads "Boat Academy" in pearl white. Bottom-right, uppercase sans-serif label "PERMIS BATEAU · SAAS". Clean, premium, optimistic. No people. Style: editorial yachting magazine meets minimalist UI illustration.
```

### 5. OnMangeQuoi

```
Editorial portrait illustration, 2:3 vertical, warm market style. Foreground: an open hand offering a market basket containing stylized 3D paper-craft shapes (bread, fruit, vegetables); above, a question-mark formed by intersecting plate-rim arcs. Background: warm sunrise gradient pale ochre → terracotta → deep burgundy, with chalk-board texture hint. Upper-left, serif italic typography reads "OnMangeQuoi" in cream. Bottom-right, uppercase sans-serif label "ANNUAIRE · COMMERCES". No human faces. Style: warm editorial collage meets Le Bon Marché poster.
```

### 6. MariposaWorld

```
Editorial portrait illustration, 2:3 vertical, romantic atelier style. Foreground: a single butterfly emerging from delicate folds of silk and linen fabric cascading like flowing watercolor; threads catch light, wings reveal intricate guilloché patterns. Background: warm dusty-rose → deep magenta gradient (#ea4c89 · #ff7eb8 · #6f1e3c) with hand-drawn ink-dot constellation. Upper-left, serif italic typography reads "Mariposa World" in cream. Bottom-right, uppercase sans-serif label "ATELIER · MAISON". Slow-craftsmanship atmosphere. No people. Style: French haute-couture editorial meets Miyazaki textures.
```

### 7. École Gallieni

```
Editorial portrait illustration, 2:3 vertical, urban driving-school style. Foreground: an aerial view of a Paris boulevard at dusk, taxi-yellow road stripes forming a stylized roadmap that resolves into the silhouette of a steering wheel; subtle constellation overlay suggests the digital app layer. Background: deep navy → bordeaux gradient with faint topographic Paris arrondissement contours. Upper-left, serif italic typography reads "École Gallieni" in cream. Bottom-right, uppercase sans-serif label "TAXI · VTC · APP". Cinematic, urban, premium. No people, no real logos. Style: New Yorker cover meets transit-map design.
```

### 8. GP Formation

```
Editorial portrait illustration, 2:3 vertical, vibrant green driving style. Foreground: a stylized "G" letter shaped by an arrow loop embedded in a geometric roundabout road-grid pattern; lines glow softly. Background: gradient fresh emerald (#7ED321) → deep forest (#4CAF50) → dark teal, with a hint of golden sunrise on the horizon. Upper-left, serif italic typography reads "GP Formation" in cream. Bottom-right, uppercase sans-serif label "SITE · TAXI · VTC". Modern, optimistic, professional. No people. Style: editorial poster meets infrastructure illustration.
```

### 9. Formation EDV

```
Editorial portrait illustration, 2:3 vertical, calming medical style. Foreground: a softly glowing star (étoile) formed by intersecting compass-pulse waves, embedded in a stylized open hand offering care; a very subtle red-cross dot in one corner. Background: deep medical-blue → white-cream gradient (#1a3a6e → #ffffff) with faint EKG-line texture. Upper-left, serif italic typography reads "Étoile de Vie" in deep navy. Bottom-right, uppercase sans-serif label "FORMATION · MÉDICALE". Reassuring, professional, clinical-meets-warm. No human faces, no real logos. Style: editorial healthcare poster meets art-deco geometry.
```

---

## 4. Notes techniques d'implémentation

### Fan deck — recalcul pour 9 cards

Centre = card 5 (`x=0, y=0, rot=0`). SPACING = 240, ARC = 18, ROT = 3.5°.

| nth-child | x (px) | y (px) | rot (deg) | z-index |
|---|---|---|---|---|
| 1 | -960 | 252 | -14 | 1 |
| 2 | -720 | 162 | -10.5 | 2 |
| 3 | -480 | 90 | -7 | 3 |
| 4 | -240 | 36 | -3.5 | 4 |
| 5 | 0 | 0 | 0 | 5 |
| 6 | 240 | 36 | 3.5 | 4 |
| 7 | 480 | 90 | 7 | 3 |
| 8 | 720 | 162 | 10.5 | 2 |
| 9 | 960 | 252 | 14 | 1 |

Media query `max-width: 1100px` → multiplier ~0.7.

### Architecture composants

```
src/
├── content/
│   └── case-studies.ts        # 9 cas typés (slug, title, category, gradient, sections)
├── components/sections/
│   ├── HorizontalGallery.tsx  # fan deck, click → ouvre modal
│   ├── HorizontalGallery.css  # nouvelles positions :nth-child
│   └── CaseStudyModal.tsx     # nouveau — modal avec layoutId pour le morph
└── public/
    └── case-studies/          # illustrations 2:3 générées
        ├── fidelya.webp
        ├── stellarvision.webp
        └── ... (9 fichiers)
```

### Modal — animation morph

- `framer-motion` `<AnimatePresence>` au niveau root.
- `layoutId="case-study-${slug}"` partagé entre la card du fan deck et l'image hero du modal → morph fluide à l'ouverture / fermeture.
- Backdrop : `motion.div` avec `backdrop-blur(20px)` + opacité 0.8.
- Sections 01 / 02 / 03 : `staggerChildren` `0.08`, `slide-up + fade` 24px.
- Pendant l'ouverture : fan se replie en stack (les autres cards animent vers stackPositions), titre `opacity 0.3`.

### Accessibilité

- `role="dialog"` `aria-modal="true"` `aria-labelledby="case-study-title"`.
- Focus trap (premier élément focusable au mount, return focus à la card source au close).
- ESC handler global.
- Click backdrop = close.

### Data structure (TypeScript)

```ts
type CaseStudy = {
  slug: string;
  title: string;            // "Fidelya"
  category: string;         // "RESTAURANT CRM"
  tagline: string;          // 1 phrase italique
  gradient: string;         // CSS gradient (header card + modal hero)
  illustration: string;     // chemin /case-studies/<slug>.webp
  sections: {
    company: string;        // 01 La société
    need: string;           // 02 Le besoin
    solution: string;       // 03 La solution
    stack: string[];        // ["Next.js 16", "Supabase", ...]
  };
};
```
