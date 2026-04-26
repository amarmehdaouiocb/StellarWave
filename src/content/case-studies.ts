/**
 * Case studies — données des 9 cards du fan deck "Ce qu'on construit".
 *
 * Chaque cas a une vue compacte (affichée dans la card) et une vue détaillée
 * (affichée dans le modal) au format 01 La société / 02 Le besoin / 03 La solution.
 */

import {
  Storefront,
  VideoCamera,
  Buildings,
  Sailboat,
  ForkKnife,
  Butterfly,
  Car,
  Compass,
  HeartStraight,
  type Icon,
} from "@phosphor-icons/react";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string; // uppercase tag (ex. "RESTAURANT CRM")
  tagline: string; // 1 phrase italique pour la card (caption)
  gradient: string; // CSS gradient — header card + modal hero
  accent: string; // text color sur le gradient
  Icon: Icon;
  illustration?: string; // /case-studies/<slug>.webp (optionnel — fallback gradient seul)
  sections: {
    company: string;
    need: string;
    solution: string;
    stack: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fidelya",
    title: "Fidelya",
    category: "Restaurant CRM",
    tagline:
      "Reprendre la main sur la relation client, sans dépendre des marketplaces.",
    gradient:
      "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 35%, #6228d7 100%)",
    accent: "#ffffff",
    Icon: Storefront,
    illustration: "/case-studies/fidelya.webp",
    sections: {
      company:
        "Restaurants indépendants et petites chaînes en France qui veulent reprendre la main sur leur relation client sans dépendre des marketplaces tiers (Uber Eats, TheFork).",
      need: "Outils de fidélité fragmentés (carte papier, app SMS, marketing externe). Pas de vue unifiée du client. Aucun cashier web simple. Impossible de mesurer l'impact réel des campagnes.",
      solution:
        "Cashier web (QR scan + transactions), portal membre passwordless, programmes loyalty (points / visites / cashback), campagnes email + SMS automatisées, gestion menu + commandes (sur place / à emporter / pré-co), reviews centralisées, intégrations POS / réservation / livraison.",
      stack: ["Next.js", "Supabase", "e2e tests", "codecov"],
    },
  },
  {
    slug: "stellarvision",
    title: "Stellarvision",
    category: "Vidéo SaaS · Copropriétés",
    tagline: "Extraire une séquence vidéo en 5 minutes, RGPD-ready.",
    gradient:
      "linear-gradient(150deg, #1f2937 0%, #0f172a 50%, #020617 100%)",
    accent: "#7dd3fc",
    Icon: VideoCamera,
    illustration: "/case-studies/stellarvision.webp",
    sections: {
      company:
        "Cabinets syndic et conseils syndicaux gérant des copropriétés équipées de caméras parties communes (parkings, halls, accès).",
      need: "L'extraction d'une séquence après incident prend des heures (déplacement gardien, sortie disque dur, transfert manuel). Conformité RGPD floue : qui accède, qui valide, où est le registre ? Risque CNIL en cas d'audit.",
      solution:
        "Plateforme SaaS d'extraction à la demande, traçabilité complète (qui a demandé, quand, validé par qui), durée de rétention configurable, registre RGPD intégré, validation par conseil syndical. Compatible ONVIF.",
      stack: ["Docker Compose", "ONVIF", "Vertical slice MVP", "RGPD"],
    },
  },
  {
    slug: "coproflow",
    title: "Coproflow",
    category: "OS · Gestion syndic",
    tagline: "L'OS moderne du syndic indépendant.",
    gradient:
      "linear-gradient(160deg, #0a66c2 0%, #1f7fd8 60%, #073860 100%)",
    accent: "#dbeafe",
    Icon: Buildings,
    illustration: "/case-studies/coproflow.webp",
    sections: {
      company:
        "Cabinets syndic indépendants et conseils syndicaux qui veulent moderniser la gestion administrative et financière sans logiciel monolithique vieillissant.",
      need: "Outils legacy lourds (ergonomie 2005, multi-fenêtres pour préparer une AG). Pas de portail copropriétaire moderne. Conseil syndical privé de visibilité temps réel sur les comptes et les travaux.",
      solution:
        "Plateforme dashboard SaaS avec auth multi-rôles (gestionnaire / conseil / copropriétaire), gestion AG, comptes par lot, appels de fonds, suivi travaux, vue temps réel pour le conseil.",
      stack: ["Next.js 16", "Supabase RLS", "Multi-tenant", "TypeScript"],
    },
  },
  {
    slug: "boat-academy",
    title: "Boat Academy",
    category: "Permis bateau · SaaS",
    tagline: "L'auto-école nautique avec son back-office et son app stagiaire.",
    gradient:
      "linear-gradient(150deg, #25f4ee 0%, #000000 50%, #fe2c55 100%)",
    accent: "#ffffff",
    Icon: Sailboat,
    illustration: "/case-studies/boat-academy.webp",
    sections: {
      company:
        "Auto-écoles nautiques formant au permis bateau (côtier, hauturier, fluvial). Marché niche, fragmenté, sans outil métier.",
      need: "Stagiaires gérés sur Excel, paiement par chèque, suivi pédagogique sur papier. Aucune app stagiaire pour réviser, voir le planning, payer en ligne.",
      solution:
        "Architecture monorepo : back-office admin web (Next.js 15 + Tailwind) + app mobile stagiaire (Expo SDK 52 + NativeWind). Synchronisation offline-first. Publié iOS + Android.",
      stack: ["Next.js 15", "Expo SDK 52", "Supabase RLS", "Stripe Checkout"],
    },
  },
  {
    slug: "on-mange-quoi",
    title: "OnMangeQuoi",
    category: "Annuaire · Commerces",
    tagline: "Référencer 1 000 commerces alimentaires sans coder l'admin.",
    gradient:
      "linear-gradient(155deg, #f59e0b 0%, #d97706 50%, #7c2d12 100%)",
    accent: "#ffffff",
    Icon: ForkKnife,
    illustration: "/case-studies/on-mange-quoi.webp",
    sections: {
      company:
        "Plateforme de référencement de commerces alimentaires (boulangeries, primeurs, traiteurs, fromagers) qui alimente une expérience consumer « qu'est-ce qu'on mange aujourd'hui ? ».",
      need: "Inscrire 1 000+ commerces nécessite un workflow simple (formulaire public) + une admin pour valider, modérer, exporter. Pas de budget pour coder une admin from scratch.",
      solution:
        "Form public avec upload photos vers Supabase Storage + dashboard admin pour valider / éditer / exporter. Coverage tests, déploiement Netlify.",
      stack: ["React", "Vite", "Tailwind", "Supabase", "Netlify"],
    },
  },
  {
    slug: "mariposa-world",
    title: "Mariposa World",
    category: "Atelier · Maison",
    tagline: "Un site qui raconte le geste, pas un panier.",
    gradient:
      "linear-gradient(155deg, #ea4c89 0%, #ff7eb8 60%, #6f1e3c 100%)",
    accent: "#ffe5f0",
    Icon: Butterfly,
    illustration: "/case-studies/mariposa-world.webp",
    sections: {
      company:
        "Maison de savoir-faire artisanal (textile et accessoires haut de gamme). Univers éditorial premium, marque qui vend par l'émotion.",
      need: "Sortir du template e-commerce générique. Raconter le geste, le matériau, le rituel. Faire vibrer la marque, pas vendre un panier.",
      solution:
        "Site éditorial avec Hero asymétrique, MasonryGallery, ArtisanTrail (parcours scroll-driven), SavoirFaire (storytelling séquencé), PrivateSession (formulaire RDV privé).",
      stack: [
        "Next.js 16",
        "React 19",
        "Framer Motion",
        "Lenis",
        "react-hook-form",
        "Zod",
      ],
    },
  },
  {
    slug: "ecole-gallieni",
    title: "École Gallieni",
    category: "Taxi · VTC · App",
    tagline:
      "Reprise complète d'une app refusée par Apple : republiée, audit-clean.",
    gradient:
      "linear-gradient(160deg, #1e3a8a 0%, #7c2d12 60%, #1c1917 100%)",
    accent: "#fef3c7",
    Icon: Car,
    illustration: "/case-studies/ecole-gallieni.webp",
    sections: {
      company:
        "Centre de formation TAXI / VTC à Paris. Formations longues (préparation examen) avec contenu structuré (vidéos, QCM, fiches), suivi stagiaire individualisé.",
      need: "Le studio précédent avait livré une app instable, refusée à plusieurs reprises par Apple Review, avec un backend mal documenté. Reprise complète demandée + audit + republication.",
      solution:
        "Reprise iOS (Swift) + Android (Kotlin) + backend, audit technique complet, dossier Apple Review réussi (republication App Store + Play Store), dashboard gérant pour suivi stagiaires, documentation produit, fiches Connect / Console.",
      stack: ["Swift (iOS)", "Kotlin (Android)", "Backend custom", "App Store", "Play Store"],
    },
  },
  {
    slug: "gp-formation",
    title: "GP Formation",
    category: "Site · Taxi · VTC",
    tagline: "Sortir du lot par la modernité visuelle, dans un secteur daté.",
    gradient:
      "linear-gradient(160deg, #7ED321 0%, #4CAF50 50%, #134e1f 100%)",
    accent: "#f0fdf4",
    Icon: Compass,
    illustration: "/case-studies/gp-formation.webp",
    sections: {
      company:
        "Centre de formation TAXI / VTC. Mêmes formations qu'École Gallieni (initiale, continue, mobilité, passerelle Taxi↔VTC, distance, soir), identité distincte (vert dégradé).",
      need: "Site vitrine professionnel (16+ pages formations) avec réservation RDV intégrée. Les concurrents ont des sites datés ; il fallait sortir du lot par la modernité visuelle.",
      solution:
        "~16 pages : fiches formation, tarifs, contact, blog, légales. Bouton flottant prise de RDV (Google Calendar iframe). Identité brand complète (logo, signature, carte de visite). Déployé Vercel.",
      stack: ["Next.js 16", "Tailwind 4", "Framer Motion", "HugeIcons", "Vercel"],
    },
  },
  {
    slug: "formation-edv",
    title: "Étoile de Vie",
    category: "Formation · Médicale",
    tagline:
      "Inspirer confiance dans un secteur sensible : urgence et secourisme.",
    gradient:
      "linear-gradient(165deg, #1e40af 0%, #3b82f6 50%, #082f49 100%)",
    accent: "#e0ecff",
    Icon: HeartStraight,
    illustration: "/case-studies/formation-edv.webp",
    sections: {
      company:
        "Centre de formation médicale Étoile de Vie (Paris) — auxiliaire ambulancier, DEA, brancardier, AFGSU 1/2, SST, PSC, Référent SST, Formateur SST. Partenaire Croix-Rouge.",
      need: "Site vitrine qui inspire confiance dans un secteur sensible (urgence, secourisme). Mettre en avant la rigueur pédagogique et le partenariat Croix-Rouge.",
      solution:
        "Site Next.js (charte bleue / blanche), pages détaillées par formation (programmes Croix-Rouge), SEO local. Identité de marque complète : cartes de visite imprimables (PDF/X CMYK fonds perdus), signature email, refonte logo.",
      stack: ["Next.js", "Tailwind", "Charte print PDF/X", "SEO local"],
    },
  },
];
