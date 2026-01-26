// Icon names as strings - actual icons are imported in client components
// This avoids SSR issues with Phosphor icons using React context
export type IconName =
  | "RocketLaunch"
  | "Globe"
  | "DeviceMobile"
  | "Cloud"
  | "Stack"
  | "Lightning"
  | "ShieldCheck"
  | "TrendUp"
  | "Users"
  | "Clock"
  | "Trophy"
  | "Handshake";

export const brand = {
  name: "Stellar Wave",
  tagline: "Product & Cloud Studio",
  description:
    "Studio digital premium. Landing pages, applications web & mobile, architecture cloud. Exécution industrielle, résultats mesurables.",
  calendlyUrl: "https://calendly.com/stellarwave/discovery",
  contactEmail: "contact@stellarwave.fr",
  phone: "+33 1 23 45 67 89",
  address: "Paris, France",
  socials: {
    linkedin: "https://linkedin.com/company/stellarwave",
    twitter: "https://twitter.com/stellarwave",
    github: "https://github.com/stellarwave",
  },
  siteUrl: "https://stellarwave.fr",
} as const;

export const heroMetrics = [
  { value: "4.8%", label: "Taux de conversion moyen" },
  { value: "-65%", label: "Coûts cloud réduits" },
  { value: "98+", label: "Score Lighthouse" },
  { value: "<48h", label: "Délai de réponse" },
] as const;

// Trust badges for hero - objection killers
export const heroTrustBadges = [
  { text: "Premier appel gratuit", icon: "Check" },
  { text: "Sans engagement", icon: "ShieldCheck" },
  { text: "Résultats sous 30 jours", icon: "Lightning" },
] as const;

export const heroSlides = [
  {
    title: "Multipliez vos conversions par 3 en 30 jours",
    subtitle: "Landing pages qui convertissent à 4.8%, apps qui fidélisent, cloud qui réduit vos coûts de 65%.",
    image: "/hero-1.jpg",
  },
  {
    title: "Réduisez vos coûts cloud de 65%",
    subtitle: "Audit FinOps complet. Résultats visibles en 30 jours. ROI garanti dès le premier mois.",
    image: "/hero-2.jpg",
  },
  {
    title: "De 45 à 98 en Lighthouse",
    subtitle: "Performance qui convertit. Chaque milliseconde gagnée = leads qualifiés en plus.",
    image: "/hero-3.jpg",
  },
] as const;

export const trustedLogos = [
  { name: "Fidelya", logo: "/projects/fidelya.png" },
  { name: "BoatAcademy", logo: "/projects/boatacademy.png" },
  { name: "OnMangeQuoi", logo: "/projects/onmangequoi.png" },
  { name: "RA Bâtiment", logo: "/projects/ra-batiment.svg" },
] as const;

export const services = [
  {
    id: "landing-pages",
    iconName: "RocketLaunch" as IconName,
    title: "Landing Pages Premium",
    description:
      "Pages de conversion ultra-optimisées. SEO technique, performance Lighthouse 95+, design qui convertit.",
    features: ["SEO avancé", "Lighthouse 95+", "A/B Testing ready", "Analytics intégré"],
    cta: "En savoir plus",
  },
  {
    id: "websites",
    iconName: "Globe" as IconName,
    title: "Sites Web",
    description:
      "Sites vitrines et corporate qui marquent les esprits. Design premium, CMS headless, performances exceptionnelles.",
    features: ["Design sur mesure", "CMS headless", "Multi-langue", "Performance optimale"],
    cta: "En savoir plus",
  },
  {
    id: "web-apps",
    iconName: "Stack" as IconName,
    title: "Applications Web",
    description:
      "SaaS, dashboards, portails. Architecture moderne, scalabilité native, expérience utilisateur fluide.",
    features: ["React / Next.js", "API REST & GraphQL", "Real-time", "PWA ready"],
    cta: "En savoir plus",
  },
  {
    id: "mobile-apps",
    iconName: "DeviceMobile" as IconName,
    title: "Apps iOS & Android",
    description:
      "Applications natives et cross-platform. React Native, Flutter. Publication App Store & Play Store.",
    features: ["iOS & Android", "React Native / Flutter", "Push notifications", "Offline-first"],
    cta: "En savoir plus",
  },
  {
    id: "cloud",
    iconName: "Cloud" as IconName,
    title: "Architecture Cloud",
    description:
      "Audit, migration, optimisation. AWS, GCP, Azure. FinOps, sécurité, performance. Réduction des coûts garantie.",
    features: ["Multi-cloud", "FinOps", "Sécurité", "Monitoring 24/7"],
    cta: "En savoir plus",
  },
] as const;

export const whyUs = [
  {
    iconName: "Lightning" as IconName,
    title: "Exécution rapide",
    description: "Méthodologie agile éprouvée. Livraisons itératives. Time-to-market optimisé.",
  },
  {
    iconName: "ShieldCheck" as IconName,
    title: "Qualité industrielle",
    description: "Tests automatisés, CI/CD, monitoring. Code maintenable et documenté.",
  },
  {
    iconName: "TrendUp" as IconName,
    title: "ROI mesurable",
    description: "Chaque projet est conçu pour générer des résultats. KPIs définis dès le départ.",
  },
  {
    iconName: "Handshake" as IconName,
    title: "Partenaire long terme",
    description: "Support continu, évolutions, maintenance. Nous grandissons avec vous.",
  },
] as const;

export const caseStudies = [
  {
    id: "fidelya",
    client: "Fidelya",
    industry: "Restauration",
    image: "/projects/fidelya.png",
    context:
      "Besoin d'un CRM complet pour restaurants avec gestion de la fidélité client, caisse web et portail membres.",
    action:
      "Développement React + Supabase, système de points/visites/cashback, caisse offline-first, accès QR code sans mot de passe.",
    results: [
      { metric: "Modules", before: "-", after: "CRM + Caisse + Portail" },
      { metric: "Authentification", before: "-", after: "QR Code passwordless" },
      { metric: "Mode offline", before: "Non", after: "Oui" },
    ],
  },
  {
    id: "boatacademy",
    client: "BoatAcademy",
    industry: "Éducation nautique",
    image: "/projects/boatacademy.png",
    context:
      "Plateforme SaaS pour auto-écoles nautiques : gestion des élèves, cours et paiements.",
    action:
      "Monorepo Turbo avec admin Next.js + app mobile Expo, backend Supabase, paiements Stripe.",
    results: [
      { metric: "Plateformes", before: "-", after: "Web + iOS + Android" },
      { metric: "Architecture", before: "-", after: "Monorepo Turbo" },
      { metric: "Paiements", before: "-", after: "Stripe intégré" },
    ],
  },
  {
    id: "onmangequoi",
    client: "OnMangeQuoi",
    industry: "Food & Directory",
    image: "/projects/onmangequoi.png",
    context:
      "Annuaire alimentaire avec formulaire d'inscription pour restaurants et dashboard admin.",
    action:
      "PWA React avec support offline, onboarding public, gestion des profils et menus.",
    results: [
      { metric: "Type", before: "-", after: "PWA offline-first" },
      { metric: "Fonctionnalités", before: "-", after: "Onboarding + Admin" },
      { metric: "Service workers", before: "-", after: "Workbox intégré" },
    ],
  },
  {
    id: "ra-batiment",
    client: "RA Bâtiment",
    industry: "BTP / Artisan",
    image: "/projects/ra-batiment.svg",
    context:
      "Site vitrine premium pour artisan en rénovation/construction en Île-de-France.",
    action:
      "Next.js 16 avec animations Framer Motion, portfolio avant/après, formulaire de devis, SEO optimisé.",
    results: [
      { metric: "Lighthouse", before: "-", after: "95+" },
      { metric: "Animations", before: "-", after: "Framer Motion" },
      { metric: "SEO", before: "-", after: "Schemas structurés" },
    ],
  },
] as const;

export const proofMetrics = [
  {
    label: "Score Lighthouse",
    before: 45,
    after: 98,
    suffix: "",
    description: "Performance, accessibilité, SEO",
  },
  {
    label: "TTFB",
    before: 2400,
    after: 180,
    suffix: "ms",
    description: "Time to First Byte",
    inverse: true,
  },
  {
    label: "Conversion",
    before: 1.2,
    after: 4.8,
    suffix: "%",
    description: "Taux de conversion moyen",
  },
  {
    label: "Coûts Infra",
    before: 100,
    after: 35,
    suffix: "%",
    description: "Réduction moyenne",
    inverse: true,
  },
] as const;

export const processSteps = [
  {
    step: 1,
    title: "Discovery",
    description:
      "Compréhension de vos enjeux, audit de l'existant, définition des objectifs et KPIs.",
    duration: "1-2 semaines",
    deliverables: ["Brief validé", "Roadmap", "Estimations"],
  },
  {
    step: 2,
    title: "Design",
    description:
      "Wireframes, maquettes haute fidélité, prototypes interactifs. Validation utilisateur.",
    duration: "2-3 semaines",
    deliverables: ["Maquettes Figma", "Design system", "Prototype"],
  },
  {
    step: 3,
    title: "Build",
    description:
      "Développement itératif, tests continus, démos hebdomadaires. Qualité garantie.",
    duration: "4-12 semaines",
    deliverables: ["Code source", "Documentation", "Tests"],
  },
  {
    step: 4,
    title: "Launch",
    description:
      "Déploiement progressif, monitoring, optimisations. Support et accompagnement.",
    duration: "1-2 semaines",
    deliverables: ["Mise en production", "Formation", "Support"],
  },
] as const;

export const offers = [
  {
    id: "starter",
    name: "Starter",
    description: "Idéal pour tester notre approche sur un projet ciblé.",
    price: "À partir de 5 000€",
    features: [
      "Landing page ou site vitrine",
      "Design premium responsive",
      "SEO technique de base",
      "Lighthouse 90+",
      "2 semaines de support",
    ],
    cta: "Demander un devis",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    description: "Pour les projets ambitieux qui nécessitent une solution complète.",
    price: "À partir de 15 000€",
    features: [
      "Application web complète",
      "Design system sur mesure",
      "API & intégrations",
      "Tests automatisés",
      "3 mois de support",
      "Formation équipe",
    ],
    cta: "Demander un devis",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Accompagnement complet pour les projets stratégiques.",
    price: "Sur mesure",
    features: [
      "Architecture cloud complète",
      "Applications multi-plateformes",
      "Équipe dédiée",
      "SLA garanti",
      "Support prioritaire 24/7",
      "Évolutions continues",
    ],
    cta: "Nous contacter",
    popular: false,
  },
] as const;

export const cloudOffers = [
  {
    id: "audit",
    title: "Audit Cloud",
    subtitle: "FinOps + Sécurité + Performance",
    description:
      "Analyse complète de votre infrastructure cloud. Identification des optimisations, risques de sécurité et axes d'amélioration.",
    deliverables: [
      "Rapport d'audit détaillé",
      "Cartographie des ressources",
      "Recommandations priorisées",
      "Roadmap d'optimisation",
      "Estimation des économies",
    ],
    duration: "2 semaines",
    price: "À partir de 4 000€",
  },
  {
    id: "implementation",
    title: "Plan d'actions 30 jours",
    subtitle: "Quick wins + Durcissement + Monitoring",
    description:
      "Implémentation des optimisations prioritaires. Résultats visibles en 30 jours.",
    deliverables: [
      "Optimisations FinOps immédiates",
      "Durcissement sécurité",
      "Mise en place monitoring",
      "Alerting configuré",
      "Documentation mise à jour",
    ],
    duration: "4 semaines",
    price: "À partir de 8 000€",
  },
] as const;

export const faqs = [
  {
    question: "Quels sont vos délais de livraison ?",
    answer:
      "Les délais varient selon la complexité du projet. Une landing page premium : 2-3 semaines. Une application web : 8-16 semaines. Nous définissons ensemble un planning réaliste dès le départ et nous nous engageons à le respecter.",
  },
  {
    question: "Comment fonctionne votre processus de travail ?",
    answer:
      "Nous suivons une méthodologie agile en 4 phases : Discovery (compréhension des besoins), Design (maquettes et validation), Build (développement itératif avec démos hebdomadaires), Launch (déploiement et support). Vous avez une visibilité totale à chaque étape.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Nous privilégions les technologies modernes et éprouvées : React, Next.js, TypeScript pour le frontend. Node.js, Python pour le backend. AWS, GCP, Vercel pour le cloud. Nous adaptons notre stack à vos contraintes existantes.",
  },
  {
    question: "Proposez-vous de la maintenance ?",
    answer:
      "Oui, tous nos projets incluent une période de support. Nous proposons également des contrats de maintenance évolutive pour accompagner la croissance de votre produit : mises à jour, nouvelles fonctionnalités, optimisations continues.",
  },
  {
    question: "Comment garantissez-vous la qualité ?",
    answer:
      "Qualité industrielle : tests automatisés (unitaires, intégration, E2E), code review systématique, CI/CD, monitoring en production. Nous visons Lighthouse 95+ et suivons les bonnes pratiques d'accessibilité (WCAG 2.1).",
  },
  {
    question: "Travaillez-vous avec des startups ?",
    answer:
      "Absolument. Nous accompagnons de nombreuses startups, de la phase MVP à la scale-up. Nous comprenons les contraintes de time-to-market et de budget. Notre approche itérative permet de valider rapidement les hypothèses produit.",
  },
  {
    question: "Quelle est votre politique tarifaire ?",
    answer:
      "Nous proposons des forfaits adaptés à chaque type de projet. Après un premier échange, nous établissons un devis détaillé avec un prix fixe. Pas de surprise : le budget est validé avant le démarrage et respecté.",
  },
  {
    question: "Pouvez-vous reprendre un projet existant ?",
    answer:
      "Oui, nous réalisons régulièrement des audits et reprises de projets. Nous analysons l'existant, identifions les axes d'amélioration et proposons un plan d'action. Refonte progressive ou migration complète selon les besoins.",
  },
] as const;

export const leadMagnet = {
  title: "Mini-audit Performance & SEO",
  subtitle: "Gratuit • 15 minutes • PDF récap sous 24h",
  description:
    "Découvrez les quick wins pour améliorer les performances et le référencement de votre site. Analyse automatisée + recommandations personnalisées.",
  features: [
    "Score Lighthouse détaillé",
    "Audit SEO technique",
    "Recommandations priorisées",
    "Estimation des gains",
  ],
} as const;

export const thankYouPage = {
  title: "Merci pour votre demande !",
  subtitle: "Nous revenons vers vous sous 24h.",
  nextSteps: [
    {
      step: 1,
      title: "Analyse de votre demande",
      description: "Notre équipe étudie votre projet et prépare une première analyse.",
    },
    {
      step: 2,
      title: "Prise de contact",
      description: "Nous vous contactons pour un premier échange de 30 minutes.",
    },
    {
      step: 3,
      title: "Proposition sur mesure",
      description: "Vous recevez une proposition détaillée avec planning et budget.",
    },
  ],
  briefChecklist: [
    "Objectifs du projet",
    "Cible utilisateur",
    "Fonctionnalités clés",
    "Contraintes techniques",
    "Budget indicatif",
    "Délais souhaités",
  ],
} as const;

export const seoKeywords = [
  "landing page premium",
  "développement application web",
  "développement app iOS Android",
  "architecture cloud",
  "audit performance",
  "SEO technique",
  "studio digital Paris",
  "agence développement web",
] as const;
