/**
 * Thèmes et données par type de commerce pour les pages de preview.
 * Direction esthétique : "Elevated Local" — élégance boutique pour chaque métier.
 */

export type ThemeKey =
  | "artisans"
  | "beaute"
  | "alimentation"
  | "sante"
  | "services"
  | "auto"
  | "sport"
  | "commerce";

export interface Theme {
  key: ThemeKey;
  label: string;
  primary: string;
  accent: string;
  bg: string;
  bgAlt: string;
  textOnPrimary: string;
  services: { icon: string; name: string; desc: string }[];
  tagline: string;
  hours: string;
  sectionLabels: {
    services: string;
    gallery: string;
    about: string;
    contact: string;
    reviews: string;
    hours: string;
  };
  contactCTA: { headline: string; subtitle: string };
  checklistItems: string[];
  aboutText: (nom: string, ville: string, nbAvis: number) => string;
}

const THEMES: Record<ThemeKey, Theme> = {
  artisans: {
    key: "artisans",
    label: "Artisan",
    primary: "#1a2744",
    accent: "#c8862a",
    bg: "#faf6f0",
    bgAlt: "#f0ebe3",
    textOnPrimary: "#faf6f0",
    tagline: "L'expertise au service de votre confort",
    hours: "Lun-Ven : 8h-18h | Sam : 9h-13h",
    sectionLabels: {
      services: "Nos Prestations",
      gallery: "Nos Réalisations",
      about: "Notre Savoir-Faire",
      contact: "Demander un Devis",
      reviews: "Ce que disent nos clients",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Besoin d'un pro ?", subtitle: "Demandez votre devis gratuit ou appelez-nous" },
    checklistItems: ["Devis gratuit et transparent", "Intervention rapide", "Travail soigné et garanti"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} intervient sur ${ville} et ses environs avec un savoir-faire reconnu. ${nbAvis > 0 ? `Avec ${nbAvis} avis clients, notre` : "Notre"} engagement : un travail soigné, des délais respectés et un devis transparent. Chaque chantier est unique, et nous y apportons la même exigence de qualité.`,
    services: [
      { icon: "🔧", name: "Dépannage Urgent", desc: "Intervention rapide 7j/7" },
      { icon: "🏗️", name: "Installation", desc: "Travail soigné et garanti" },
      { icon: "🔄", name: "Rénovation", desc: "Modernisez votre intérieur" },
      { icon: "📋", name: "Devis Gratuit", desc: "Sans engagement" },
    ],
  },
  beaute: {
    key: "beaute",
    label: "Beauté",
    primary: "#6b2d4e",
    accent: "#c4986c",
    bg: "#fdf5f7",
    bgAlt: "#f5eaee",
    textOnPrimary: "#fdf5f7",
    tagline: "Sublimez votre beauté naturelle",
    hours: "Mar-Sam : 9h-19h",
    sectionLabels: {
      services: "Nos Soins",
      gallery: "Notre Salon",
      about: "Notre Philosophie",
      contact: "Prendre Rendez-vous",
      reviews: "L'avis de nos clientes",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Envie de vous faire plaisir ?", subtitle: "Réservez votre moment de détente" },
    checklistItems: ["Accueil personnalisé", "Produits haut de gamme", "Résultat garanti"],
    aboutText: (nom, ville, nbAvis) =>
      `Bienvenue chez ${nom}, votre espace beauté au cœur de ${ville}. ${nbAvis > 0 ? `Recommandé par ${nbAvis} clients, nous` : "Nous"} mettons notre expertise au service de votre bien-être. Dans une ambiance chaleureuse et raffinée, laissez-vous sublimer par notre équipe passionnée.`,
    services: [
      { icon: "✂️", name: "Coupe & Coiffure", desc: "Experts pour tous styles" },
      { icon: "🎨", name: "Coloration", desc: "Techniques sur-mesure" },
      { icon: "💆", name: "Soins & Traitements", desc: "Pour un résultat sublime" },
      { icon: "💅", name: "Mise en beauté", desc: "Pour chaque occasion" },
    ],
  },
  alimentation: {
    key: "alimentation",
    label: "Restauration",
    primary: "#5c1a28",
    accent: "#d4a24e",
    bg: "#faf5ef",
    bgAlt: "#f2ebe0",
    textOnPrimary: "#faf5ef",
    tagline: "Des saveurs authentiques, chaque jour",
    hours: "Lun-Sam : 11h30-14h30, 18h30-22h30",
    sectionLabels: {
      services: "Nos Spécialités",
      gallery: "Notre Établissement",
      about: "Notre Histoire",
      contact: "Réserver une Table",
      reviews: "L'avis des gourmands",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Envie de goûter ?", subtitle: "Réservez votre table ou passez commande" },
    checklistItems: ["Produits frais et locaux", "Carte renouvelée", "Service attentionné"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} vous accueille à ${ville} dans un cadre chaleureux où chaque plat raconte une histoire. ${nbAvis > 0 ? `Plébiscité par ${nbAvis} gourmands, notre` : "Notre"} cuisine allie savoir-faire traditionnel et produits frais sélectionnés avec soin. Une expérience culinaire authentique vous attend.`,
    services: [
      { icon: "🍽️", name: "Nos Spécialités", desc: "Préparées avec passion" },
      { icon: "⭐", name: "Produits Frais", desc: "Qualité irréprochable" },
      { icon: "🛵", name: "À emporter", desc: "Prêt en quelques minutes" },
      { icon: "📋", name: "Notre Carte", desc: "Découvrez nos créations" },
    ],
  },
  sante: {
    key: "sante",
    label: "Santé",
    primary: "#16504a",
    accent: "#3da890",
    bg: "#f0faf7",
    bgAlt: "#e2f2ec",
    textOnPrimary: "#f0faf7",
    tagline: "Votre santé, notre priorité",
    hours: "Lun-Ven : 9h-19h | Sam : 9h-12h",
    sectionLabels: {
      services: "Notre Cabinet",
      gallery: "Nos Locaux",
      about: "Notre Approche",
      contact: "Prendre Rendez-vous",
      reviews: "Témoignages patients",
      hours: "Horaires de consultation",
    },
    contactCTA: { headline: "Prenez soin de vous", subtitle: "Prenez rendez-vous dès maintenant" },
    checklistItems: ["Approche bienveillante", "Suivi personnalisé", "Cabinet accessible"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} vous reçoit à ${ville} dans un cadre professionnel et bienveillant. ${nbAvis > 0 ? `Fort de ${nbAvis} avis positifs, notre` : "Notre"} approche personnalisée place votre bien-être au centre de chaque consultation. Prenez rendez-vous et bénéficiez d'un accompagnement adapté à vos besoins.`,
    services: [
      { icon: "🩺", name: "Consultation", desc: "Bilan complet et personnalisé" },
      { icon: "💪", name: "Traitement", desc: "Protocoles adaptés" },
      { icon: "📅", name: "Prise de RDV", desc: "Simple et rapide" },
      { icon: "🏥", name: "Suivi régulier", desc: "Accompagnement continu" },
    ],
  },
  services: {
    key: "services",
    label: "Services",
    primary: "#2d4a3e",
    accent: "#7fa06d",
    bg: "#f5f8f3",
    bgAlt: "#e8ede4",
    textOnPrimary: "#f5f8f3",
    tagline: "Un service de qualité, à deux pas de chez vous",
    hours: "Lun-Sam : 9h-19h",
    sectionLabels: {
      services: "Nos Services",
      gallery: "Notre Établissement",
      about: "À Propos",
      contact: "Nous Contacter",
      reviews: "Avis de nos clients",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Un besoin ? On s'en occupe", subtitle: "Contactez-nous pour un service rapide" },
    checklistItems: ["Service rapide et fiable", "Tarifs transparents", "Satisfaction garantie"],
    aboutText: (nom, ville, nbAvis) =>
      `Bienvenue chez ${nom}, votre partenaire de confiance à ${ville}. ${nbAvis > 0 ? `Avec ${nbAvis} avis clients satisfaits, nous` : "Nous"} mettons notre savoir-faire et notre passion au service de notre clientèle. Qualité, proximité et professionnalisme sont les valeurs qui nous guident au quotidien.`,
    services: [
      { icon: "⚡", name: "Service Express", desc: "Rapidité garantie" },
      { icon: "👔", name: "Qualité Pro", desc: "Finitions impeccables" },
      { icon: "💰", name: "Tarifs Justes", desc: "Meilleur rapport qualité-prix" },
      { icon: "📍", name: "Proximité", desc: "Au cœur de votre quartier" },
    ],
  },
  auto: {
    key: "auto",
    label: "Automobile",
    primary: "#1c2833",
    accent: "#2874a6",
    bg: "#f0f4f8",
    bgAlt: "#e1e8ef",
    textOnPrimary: "#f0f4f8",
    tagline: "Votre véhicule entre de bonnes mains",
    hours: "Lun-Ven : 8h-18h | Sam : 9h-12h",
    sectionLabels: {
      services: "Nos Prestations",
      gallery: "Notre Atelier",
      about: "Notre Expertise",
      contact: "Prendre Rendez-vous",
      reviews: "Avis de nos clients",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Votre véhicule mérite le meilleur", subtitle: "Prenez rendez-vous pour un diagnostic" },
    checklistItems: ["Diagnostic complet", "Pièces d'origine", "Délais respectés"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} est votre spécialiste automobile à ${ville}. ${nbAvis > 0 ? `Reconnu par ${nbAvis} automobilistes, notre` : "Notre"} atelier dispose d'équipements de pointe pour diagnostiquer et réparer tous types de véhicules. Transparence, qualité et respect des délais sont notre engagement.`,
    services: [
      { icon: "🔧", name: "Réparation", desc: "Toutes marques, tous modèles" },
      { icon: "🔍", name: "Diagnostic", desc: "Équipement de pointe" },
      { icon: "🚗", name: "Entretien", desc: "Vidange, freins, pneus…" },
      { icon: "📋", name: "Devis Gratuit", desc: "Transparence totale" },
    ],
  },
  sport: {
    key: "sport",
    label: "Sport & Loisirs",
    primary: "#2c1a4a",
    accent: "#8b5cf6",
    bg: "#f5f3fa",
    bgAlt: "#eae5f5",
    textOnPrimary: "#f5f3fa",
    tagline: "Dépassez vos limites",
    hours: "Lun-Sam : 7h-21h | Dim : 9h-13h",
    sectionLabels: {
      services: "Nos Activités",
      gallery: "Nos Installations",
      about: "Notre Mission",
      contact: "S'inscrire",
      reviews: "Avis de nos membres",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Prêt à relever le défi ?", subtitle: "Inscrivez-vous et commencez dès maintenant" },
    checklistItems: ["Coaching personnalisé", "Matériel professionnel", "Ambiance motivante"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} est votre espace sport et bien-être à ${ville}. ${nbAvis > 0 ? `Avec ${nbAvis} membres satisfaits, nous` : "Nous"} proposons un accompagnement personnalisé pour atteindre vos objectifs. Que vous soyez débutant ou confirmé, notre équipe de coachs est à vos côtés.`,
    services: [
      { icon: "💪", name: "Cours collectifs", desc: "Énergie de groupe" },
      { icon: "🎯", name: "Coaching perso", desc: "Programme sur-mesure" },
      { icon: "📅", name: "Planning flexible", desc: "Adapté à vos horaires" },
      { icon: "🏆", name: "Résultats", desc: "Objectifs atteints" },
    ],
  },
  commerce: {
    key: "commerce",
    label: "Commerce",
    primary: "#3b2a1a",
    accent: "#b8860b",
    bg: "#faf7f2",
    bgAlt: "#f0ebe2",
    textOnPrimary: "#faf7f2",
    tagline: "Une sélection choisie avec passion",
    hours: "Lun-Sam : 9h30-19h",
    sectionLabels: {
      services: "Notre Offre",
      gallery: "Notre Boutique",
      about: "Notre Passion",
      contact: "Nous Rendre Visite",
      reviews: "L'avis de nos clients",
      hours: "Nos Horaires",
    },
    contactCTA: { headline: "Venez découvrir notre sélection", subtitle: "Passez nous voir en boutique" },
    checklistItems: ["Produits sélectionnés avec soin", "Conseil personnalisé", "Nouveautés régulières"],
    aboutText: (nom, ville, nbAvis) =>
      `${nom} vous accueille à ${ville} avec une sélection de produits choisis avec soin. ${nbAvis > 0 ? `Recommandé par ${nbAvis} clients, notre` : "Notre"} boutique allie qualité et conseil personnalisé. Venez découvrir notre univers et laissez-vous guider par nos passionnés.`,
    services: [
      { icon: "🛍️", name: "Notre Sélection", desc: "Produits de qualité" },
      { icon: "💎", name: "Conseil Expert", desc: "À votre écoute" },
      { icon: "🎁", name: "Idées Cadeaux", desc: "Pour toutes les occasions" },
      { icon: "📍", name: "En boutique", desc: "Venez nous rencontrer" },
    ],
  },
};

// Mots-clés → thème (depuis type_commerce Google ou recherche)
const TYPE_MAP: [RegExp, ThemeKey][] = [
  [/coiff|barb|beaut|ongles|onglerie|esthéti|spa|massage|hair_salon|barber|beauty_salon/, "beaute"],
  [/boulang|pâtiss|pizza|kebab|snack|traiteur|épicerie|sandwich|crêp|glacier|bakery|restaurant|cafe|food/, "alimentation"],
  [/plomb|électri|serrur|peintr|carrel|maçon|couvreur|menuisi|chauffag|vitri|plumber|electrician|carpenter|roofer/, "artisans"],
  [/ostéo|kiné|podolog|orthophon|diétét|psycholog|sophro|naturo|chiropra|physiotherapist|chiropractor|doctor/, "sante"],
  [/press|retouch|cordonn|fleuris|toilett|répar.*télé|auto-école|photograph|déménag|imprim|dry_clean|shoe_repair|florist/, "services"],
  [/garage|carross|contrôle.*tech|lavage.*auto|répar.*moto|car_repair|car_wash/, "auto"],
  [/coach.*sport|salle.*sport|yoga|danse|escalad|gym|fitness/, "sport"],
  [/bijout|mercer|librair|magasin|animal|quincaill|jouet|jewelry|pet_store|bicycle|toy/, "commerce"],
];

export function detectTheme(typeCommerce: string, recherche: string): Theme {
  const combined = `${typeCommerce} ${recherche}`.toLowerCase();
  for (const [regex, key] of TYPE_MAP) {
    if (regex.test(combined)) return THEMES[key];
  }
  return THEMES.services; // fallback
}

export function getTheme(key: ThemeKey): Theme {
  return THEMES[key];
}

export { THEMES };
