import { Playfair_Display, Outfit } from "next/font/google";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-preview-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-preview-body",
  weight: ["300", "400", "500", "600", "700"],
});

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
      className={`${playfair.variable} ${outfit.variable}`}
      style={{
        fontFamily: "var(--font-preview-body), system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
