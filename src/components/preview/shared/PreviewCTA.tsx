"use client";

import { AnimatedSection } from "./AnimatedSection";
import { fadeUp } from "@/lib/preview-animations";
import type { Transition } from "framer-motion";

interface PreviewCTAProps {
  fontDisplay: string;
  fontBody: string;
  primaryColor: string;
  bgColor: string;
  textOnPrimary: string;
  transition?: Transition;
}

export function PreviewCTA({
  fontDisplay,
  fontBody,
  primaryColor,
  bgColor,
  textOnPrimary,
  transition,
}: PreviewCTAProps) {
  return (
    <AnimatedSection
      variants={fadeUp}
      transition={transition}
      style={{
        padding: "80px 24px",
        background: bgColor,
        borderTop: `1px solid ${primaryColor}10`,
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: fontDisplay,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: primaryColor,
            margin: "0 0 16px",
          }}
        >
          Ce site vous plaît ?
        </h2>
        <p
          style={{
            fontFamily: fontBody,
            fontSize: "1.05rem",
            color: primaryColor,
            opacity: 0.7,
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          Facilsite crée votre site web professionnel, clé en main, à partir de{" "}
          <strong>29€/mois</strong>. Mise en ligne en 24h.
        </p>
        <a
          href="https://stellarwave.fr/facilsite"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: fontBody,
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: textOnPrimary,
            background: primaryColor,
            padding: "16px 48px",
            borderRadius: 4,
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Je veux mon site →
        </a>
        <p
          style={{
            fontFamily: fontBody,
            fontSize: "0.72rem",
            color: primaryColor,
            opacity: 0.35,
            marginTop: 32,
            lineHeight: 1.5,
          }}
        >
          Aperçu généré automatiquement par Facilsite — Les informations
          proviennent de Google Maps.
        </p>
      </div>
    </AnimatedSection>
  );
}
