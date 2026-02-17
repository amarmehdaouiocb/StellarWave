"use client";

import { motion } from "framer-motion";
import type { TemplateName } from "@/lib/template-registry";
import { staggerContainer, staggerItem } from "@/lib/preview-animations";
import type { Transition } from "framer-motion";

interface ServiceBadgesProps {
  services: string[];
  template: TemplateName;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  bgAltColor: string;
  textOnPrimary: string;
  fontBody: string;
  transition: Transition;
  /** Informations pratiques additionnelles */
  niveauPrix?: string | null;
  accessibilite?: boolean;
  moyensPaiement?: string[] | null;
}

/** Icônes par service */
const SERVICE_ICONS: Record<string, string> = {
  "Sur place": "🍽️",
  "À emporter": "📦",
  "Livraison": "🛵",
  "Options végétariennes": "🌿",
  "Bar": "🍷",
  "Réservation": "📅",
};

const PAYMENT_ICONS: Record<string, string> = {
  "CB": "💳",
  "Espèces uniquement": "💵",
  "Sans contact": "📱",
};

export function ServiceBadges({
  services,
  template,
  primaryColor,
  accentColor,
  bgColor,
  bgAltColor,
  textOnPrimary,
  fontBody,
  transition,
  niveauPrix,
  accessibilite,
  moyensPaiement,
}: ServiceBadgesProps) {
  if (!services || services.length === 0) return null;

  // Combine badges: services + accessibility + payment methods
  const allBadges: { icon: string; label: string; type: "service" | "info" }[] = [];

  for (const s of services) {
    allBadges.push({ icon: SERVICE_ICONS[s] || "✓", label: s, type: "service" });
  }

  if (accessibilite) {
    allBadges.push({ icon: "♿", label: "Accessible PMR", type: "info" });
  }

  if (moyensPaiement && moyensPaiement.length > 0) {
    for (const mp of moyensPaiement) {
      allBadges.push({ icon: PAYMENT_ICONS[mp] || "💰", label: mp, type: "info" });
    }
  }

  // Badge style per template
  const getBadgeStyle = (type: "service" | "info"): React.CSSProperties => {
    const isInfo = type === "info";

    switch (template) {
      case "editorial":
        return {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: isInfo ? "transparent" : `${accentColor}12`,
          border: `1px solid ${isInfo ? `${primaryColor}15` : `${accentColor}25`}`,
          borderRadius: 2,
          fontFamily: fontBody,
          fontSize: "0.78rem",
          fontWeight: 500,
          color: primaryColor,
          letterSpacing: "0.02em",
        };
      case "portfolio":
        return {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 16px",
          background: isInfo ? bgAltColor : `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`,
          border: "none",
          borderRadius: 100,
          fontFamily: fontBody,
          fontSize: "0.78rem",
          fontWeight: 500,
          color: primaryColor,
        };
      case "professional":
        return {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          background: isInfo ? "transparent" : bgAltColor,
          border: isInfo ? `1px solid ${primaryColor}15` : "none",
          borderLeft: isInfo ? undefined : `3px solid ${accentColor}`,
          borderRadius: 2,
          fontFamily: fontBody,
          fontSize: "0.78rem",
          fontWeight: 600,
          color: primaryColor,
        };
      case "modern":
      default:
        return {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: isInfo ? "transparent" : bgAltColor,
          border: `1px solid ${isInfo ? `${primaryColor}10` : "transparent"}`,
          borderRadius: 6,
          fontFamily: fontBody,
          fontSize: "0.78rem",
          fontWeight: 500,
          color: primaryColor,
          opacity: isInfo ? 0.6 : 0.8,
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: template === "portfolio" ? 10 : 8,
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      {/* Prix badge en premier si présent */}
      {niveauPrix && (
        <motion.span
          variants={staggerItem}
          transition={transition}
          style={{
            ...getBadgeStyle("service"),
            fontWeight: 700,
            color: accentColor,
          }}
        >
          {niveauPrix}
        </motion.span>
      )}

      {allBadges.map((badge, i) => (
        <motion.span
          key={i}
          variants={staggerItem}
          transition={transition}
          style={getBadgeStyle(badge.type)}
        >
          <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>{badge.icon}</span>
          {badge.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
