import type { Theme } from "./preview-themes";
import type { TemplateName } from "./template-registry";

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
}

/** Version sérialisable de Theme (sans fonctions) pour le passage Server → Client */
export type SerializableTheme = Omit<Theme, "aboutText"> & {
  aboutText: string;
};

export interface PreviewProps {
  prospect: Prospect;
  theme: SerializableTheme;
  template: TemplateName;
  typeLabel: string;
}
