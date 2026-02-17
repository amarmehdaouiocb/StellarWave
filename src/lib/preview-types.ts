import type { Theme } from "./preview-themes";
import type { TemplateName } from "./template-registry";

export interface ProspectReview {
  author: string;
  text: string;
  rating: number;
  relativeTime: string;
}

export interface Prospect {
  id: string;
  nom: string;
  adresse: string;
  telephone: string;
  site_web: string | null;
  google_maps: string;
  note: number | null;
  nb_avis: number;
  type_commerce: string;
  recherche: string;
  ville: string;
  photos: string[];
  horaires?: string[] | null;
  avis?: ProspectReview[] | null;
  description_google?: string | null;
  niveau_prix?: string | null;
  types_google?: string[] | null;
  services_disponibles?: string[] | null;
  accessibilite?: boolean;
  moyens_paiement?: string[] | null;
  reservable?: boolean;
}

/** Version sérialisable de Theme (sans fonctions) pour le passage Server → Client */
export type SerializableTheme = Omit<Theme, "aboutText"> & {
  aboutText: string;
};

export interface TemplateVariant {
  template: TemplateName;
  theme: SerializableTheme;
  label: string;
  isPrimary: boolean;
}

export interface PreviewProps {
  prospect: Prospect;
  theme: SerializableTheme;
  template: TemplateName;
  typeLabel: string;
  variants?: TemplateVariant[];
}
