/**
 * Mapping ThemeKey → TemplateName pour le routage des previews.
 */
import type { ThemeKey } from "./preview-themes";

export type TemplateName = "editorial" | "portfolio" | "professional" | "modern";

const THEME_TO_TEMPLATE: Record<ThemeKey, TemplateName> = {
  alimentation: "editorial",
  beaute: "portfolio",
  sport: "portfolio",
  artisans: "professional",
  auto: "professional",
  sante: "modern",
  services: "modern",
  commerce: "modern",
};

export function resolveTemplate(themeKey: ThemeKey): TemplateName {
  return THEME_TO_TEMPLATE[themeKey] ?? "modern";
}

/**
 * CSS variable names pour les fonts par template.
 * Le layout.tsx définit les variables CSS, chaque template utilise les siennes.
 */
export const TEMPLATE_FONT_VARS: Record<TemplateName, { display: string; body: string }> = {
  editorial: {
    display: "var(--font-editorial-display), Georgia, serif",
    body: "var(--font-editorial-body), system-ui, sans-serif",
  },
  portfolio: {
    display: "var(--font-portfolio-display), system-ui, sans-serif",
    body: "var(--font-portfolio-body), system-ui, sans-serif",
  },
  professional: {
    display: "var(--font-professional-display), system-ui, sans-serif",
    body: "var(--font-professional-body), system-ui, sans-serif",
  },
  modern: {
    display: "var(--font-modern-display), Georgia, serif",
    body: "var(--font-modern-body), system-ui, sans-serif",
  },
};
