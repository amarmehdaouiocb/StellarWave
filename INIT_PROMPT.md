Tu es un binôme “frontend-design + senior frontend engineer + SEO/Conversion specialist”.
Objectif : générer une landing page ultra premium (inspirée des interfaces de streaming cinématiques type Apple TV — sans affiliation) pour présenter mon studio :
STELLAR WAVE
Activités : landing pages premium, sites web, web apps, apps iOS/Android, architecture cloud (audit + build + optimisation coûts/sécurité/perf).
But : obtenir des leads qualifiés et les convertir en contrats applicatifs à forte valeur.

⚠️ BRAND-SAFE / LÉGAL
- Interdiction d’utiliser logos Apple / Apple TV / marques déposées ou d’induire une affiliation.
- On s’inspire UNIQUEMENT des codes UI : “cinematic”, verre dépoli, carrousels, pills nav, etc.

========================================
CONTRAINTES TECH
- Stack : Next.js (App Router) + TypeScript + Tailwind CSS
- UI : shadcn/ui (si utile), lucide-react, framer-motion
- Qualité : design premium, animations subtiles, responsive parfait, accessibilité (ARIA), perf Lighthouse ≥ 90
- Images : utiliser des placeholders locaux (ex: /public/hero.jpg) + dégradés si aucune image réelle
- Output : code exécutable, fichiers complets, structure propre

========================================
DIRECTION DESIGN (RÉFÉRENCES VISUELLES)
Reproduire l’esprit UI :
1) Sidebar verre dépoli à gauche : icônes + item actif en pill clair (navigation type “Regarder / Services / Projets / Offres…”).
2) Top pill nav centré en haut : capsule arrondie avec tabs, item actif en pill blanc, icône recherche à droite.
3) Hero poster plein écran : grande image cinématique + overlay dégradé sombre (vignette) + léger blur + grain/noise ultra subtil.
4) Carrousels horizontaux : rangées de cards arrondies, ombres soft, hover lift + légère scale, scroll-snap, indicateurs “dots”.
5) Coins très arrondis, spacing généreux, typographie moderne, lueurs (glow) très contrôlées.

Palette :
- Fond : noir/anthracite profond
- Accents : dégradés froids (bleu/violet/teal) + highlights lumineux subtils
- Effets : glassmorphism (backdrop-blur), light bloom, noise léger
Anim :
- Framer-motion : fade/slide doux, parallax léger, micro-interactions
- Respecter prefers-reduced-motion

========================================
CONVERSION (OBLIGATOIRE — inclure TOUS ces items)
✅ Deux parcours de conversion :
A) CTA primaire : “Réserver un appel” (Calendly placeholder dans config)
B) CTA secondaire : “Recevoir une estimation” (modal OU scroll vers formulaire long)
   -> Après soumission : redirection /merci avec next-steps + rappel CTA Calendly

✅ Lead magnet premium :
- Bloc : “Mini-audit Performance & SEO (15 min) — PDF récap sous 24h”
- Form court (email + URL site) OU option dans formulaire principal
- Copywriting premium et rassurant

✅ Preuve (proof) :
- Section “Before / After” (placeholders chiffrés) :
  - Lighthouse 95+
  - -40% TTFB / +32% conversion / -25% coût infra (exemples)
- UI en scorecards premium

✅ Offre cloud haut-ticket :
- Section “Architecture Cloud” avec 2 offres :
  1) Audit Cloud (FinOps + sécurité + performance) -> livrable : rapport + roadmap
  2) Plan d’actions 30 jours (implémentation) -> quick wins + durcissement + monitoring
- CTA vers “Recevoir une estimation” + “Réserver un appel”

Anti-spam :
- Honeypot + timing check
- Validation Zod + UX erreurs premium

========================================
SEO (OBLIGATOIRE)
- metadata complète (title/description), OpenGraph, Twitter card
- robots.ts + sitemap.ts
- JSON-LD : Organization + WebSite + Service (au moins 2 services : “Développement d’applications” + “Architecture cloud”)
- H1 unique, H2/H3 sémantiques, copy FR orientée mots-clés :
  “landing page premium”, “développement application web”, “développement app iOS Android”, “architecture cloud”, “audit performance”, “SEO technique”
- opengraph image :
  - Créer app/opengraph-image.tsx avec rendu premium (gradient + logo texte)

========================================
CONTENU (FR) — TON
- Haut de gamme, concis, orienté résultats, “studio produit” + “exécution industrielle”
- Cible : dirigeants PME/ETI, startups, e-commerce, services pro
- Inclure : stack, garanties, méthode, cas d’usage, FAQ, délais moyens

========================================
STRUCTURE DE PAGE (landing)
1) HERO cinématique (H1) + sous-titre + KPI row + 2 CTA + dots slider
2) Bandeau “preuves / logos” (placeholders)
3) Carrousel Réalisations / Projets (cards)
4) Services (cards premium) :
   - Landing pages premium (SEO + conversion)
   - Sites web
   - Web apps
   - Apps iOS/Android
   - Architecture Cloud (audit + build)
5) Différenciation “Pourquoi Stellar Wave”
6) Études de cas (3) : Contexte → Action → Résultat (placeholders)
7) Proof “Before/After”
8) Process en 4 étapes : Discovery → Design → Build → Launch
9) Packs / Offres (3) + prix placeholders + CTA
10) Lead magnet “Mini-audit Performance & SEO” (form court)
11) Formulaire principal “Recevoir une estimation” + RGPD wording + honeypot
12) FAQ (8)
13) Footer (mentions placeholders + socials)

Page /merci :
- Confirmation premium + next steps
- CTA Calendly
- Checklist de brief
- Option “envoyer un brief PDF” (placeholder)

========================================
CONFIG MODIFIABLE (IMPORTANT)
Créer src/config/brand.ts avec :
- brandName: "Stellar Wave"
- tagline: "Product & Cloud Studio" (modifiable)
- calendlyUrl (placeholder)
- contactEmail (placeholder)
- socials (placeholder)
- arrays : services, offers, faqs, caseStudies, metrics
=> Toute la page doit consommer ces données (facile à éditer)

========================================
LIVRABLES CODE (fichiers attendus)
- app/page.tsx
- app/merci/page.tsx
- app/layout.tsx + globals.css
- app/sitemap.ts + app/robots.ts
- app/opengraph-image.tsx
- components/sections/* (Hero, NavPill, SidebarGlass, CarouselRow, Offers, ProofCards, LeadMagnet, EstimateForm, FAQ)
- lib/validators.ts (Zod)
- README.md (run/build/deploy + checklist SEO/conversion/perf)

========================================
SORTIE
- Génère tous les fichiers nécessaires avec leurs chemins.
- Pas de pseudo-code : tout doit compiler.
- Ajoute dans README une checklist SEO + conversion + perf.
- Choix font : Google Font moderne (Inter / Manrope / Sora) + hiérarchie premium.
