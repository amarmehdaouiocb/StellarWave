/**
 * Premium Typography Configuration
 *
 * Primary: Clash Display (display/headlines)
 * Secondary: Cabinet Grotesk (body/UI)
 * Fallback: Outfit (Google Fonts)
 *
 * @see /public/fonts/README.md for font sources
 */

import localFont from "next/font/local";
import { Outfit, Raleway, Mona_Sans } from "next/font/google";

/**
 * Clash Display - Premium Display Font
 * Geometric, bold, high-impact headlines
 * Source: https://www.fontshare.com/fonts/clash-display
 */
export const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/**
 * Cabinet Grotesk - Premium Body Font
 * Clean, readable, modern sans-serif
 * Source: https://www.fontshare.com/fonts/cabinet-grotesk
 */
export const cabinetGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/CabinetGrotesk-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

/**
 * Outfit - Fallback Font (Google Fonts)
 * Geometric, contemporary, works as fallback
 */
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/* Playfair Display & BodoniFLF retirés du chargement.
   Tous les usages de var(--font-serif) et var(--font-bodoni) sont
   redirigés vers Behind the Nineties via aliases dans globals.css. */

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

/**
 * Mona Sans Variable - Vraie font variable (open-source by GitHub)
 * Axes : wght (200-900 continu) + wdth (75-125 condensation)
 * Usage : font-variation-settings: "wght" 750, "wdth" 93 (façon Lando)
 * On omet `weight` → next/font sert le fichier .woff2 variable unique.
 */
export const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  display: "swap",
  axes: ["wdth"],
  style: ["normal"],
});

/**
 * Behind The Nineties - Display font 90s/80s retro
 * 2 weights seulement (Regular + Italic) — les seuls réellement utilisés
 * comme accents éditoriaux ("qui parlent", "pourquoi", numéros jumbo).
 * Bd / Blk supprimés pour économiser ~240 KB au bundle initial.
 * Pas en preload : pas critique au LCP, swap sur Mona Sans suffit.
 */
export const behindTheNineties = localFont({
  src: [
    {
      path: "../../public/fonts/Behind-The-Nineties-Rg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Behind-The-Nineties-It.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-btn",
  display: "swap",
  preload: false,
});

export function getFontVariables(): string {
  return `${raleway.variable} ${monaSans.variable} ${behindTheNineties.variable}`;
}

/**
 * CSS Variables for typography
 * These can be referenced in Tailwind and CSS
 */
export const fontVariables = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  fallback:
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
} as const;
