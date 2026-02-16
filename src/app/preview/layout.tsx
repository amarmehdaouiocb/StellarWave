import {
  Playfair_Display,
  Outfit,
  Cormorant_Garamond,
  Source_Sans_3,
  Sora,
  Nunito_Sans,
  Space_Grotesk,
  Inter,
} from "next/font/google";
import type { Metadata } from "next";

// Modern (santé, services, commerce) — existant
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-modern-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-modern-body",
  weight: ["300", "400", "500", "600", "700"],
});

// Editorial (alimentation) — serif luxueux
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-editorial-body",
  weight: ["300", "400", "500", "600", "700"],
});

// Portfolio (beauté, sport) — géométrique moderne
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-portfolio-display",
  weight: ["400", "500", "600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-portfolio-body",
  weight: ["300", "400", "500", "600", "700"],
});

// Professional (artisans, auto) — technique, fiable
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-professional-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-professional-body",
  weight: ["300", "400", "500", "600", "700"],
});

const fontVars = [
  playfair.variable,
  outfit.variable,
  cormorant.variable,
  sourceSans.variable,
  sora.variable,
  nunitoSans.variable,
  spaceGrotesk.variable,
  inter.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Votre futur site web — Facilsite",
  description: "Aperçu personnalisé de votre site web professionnel par Facilsite.",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={fontVars}
      style={{
        fontFamily: "var(--font-modern-body), system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
