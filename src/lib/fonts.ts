/**
 * Premium Typography Configuration
 *
 * Primary: Clash Display (display/headlines)
 * Secondary: Cabinet Grotesk (body/UI)
 *
 * Fallback: Outfit (Google Fonts) until premium fonts are installed
 *
 * @see /public/fonts/README.md for installation instructions
 */

import localFont from "next/font/local";
import { Outfit } from "next/font/google";

// Check if premium fonts exist (for conditional loading)
const PREMIUM_FONTS_INSTALLED = false; // Set to true after adding .woff2 files

/**
 * Clash Display - Premium Display Font
 * Geometric, bold, high-impact headlines
 *
 * To enable:
 * 1. Download from https://www.fontshare.com/fonts/clash-display
 * 2. Place .woff2 files in /public/fonts/
 * 3. Set PREMIUM_FONTS_INSTALLED = true
 */
export const clashDisplay = PREMIUM_FONTS_INSTALLED
  ? localFont({
      src: [
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
    })
  : null;

/**
 * Cabinet Grotesk - Premium Body Font
 * Clean, readable, modern sans-serif
 */
export const cabinetGrotesk = PREMIUM_FONTS_INSTALLED
  ? localFont({
      src: [
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
      ],
      variable: "--font-body",
      display: "swap",
      preload: true,
    })
  : null;

/**
 * Outfit - Fallback Font (Google Fonts)
 * Used until premium fonts are installed
 * Geometric, contemporary, works well for both display and body
 */
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/**
 * Get font class names for the body element
 */
export function getFontVariables(): string {
  if (PREMIUM_FONTS_INSTALLED && clashDisplay && cabinetGrotesk) {
    return `${clashDisplay.variable} ${cabinetGrotesk.variable}`;
  }
  return outfit.variable;
}

/**
 * CSS Variables for typography
 * These can be referenced in Tailwind and CSS
 */
export const fontVariables = {
  display: PREMIUM_FONTS_INSTALLED
    ? "var(--font-display)"
    : "var(--font-outfit)",
  body: PREMIUM_FONTS_INSTALLED
    ? "var(--font-body)"
    : "var(--font-outfit)",
  fallback:
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
} as const;
