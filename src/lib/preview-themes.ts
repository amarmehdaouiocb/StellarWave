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
