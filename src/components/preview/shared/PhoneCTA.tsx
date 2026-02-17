"use client";

import { motion } from "framer-motion";

type PhoneCTAVariant = "editorial" | "pill" | "block" | "outline";

interface PhoneCTAProps {
  telephone: string;
  accentColor: string;
  primaryColor: string;
  textOnPrimary: string;
  fontBody: string;
  variant: PhoneCTAVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<
  PhoneCTAVariant,
  (p: PhoneCTAProps) => React.CSSProperties
> = {
  editorial: (p) => ({
    fontFamily: p.fontBody,
    fontSize: "1.1rem",
    fontWeight: 700,
    color: p.primaryColor,
    background: p.accentColor,
    padding: "16px 40px",
    borderRadius: 4,
    textDecoration: "none",
    letterSpacing: "0.03em",
  }),
  pill: (p) => ({
    fontFamily: p.fontBody,
    fontSize: "1rem",
    fontWeight: 600,
    color: p.textOnPrimary,
    background: p.primaryColor,
    padding: "14px 32px",
    borderRadius: 100,
    textDecoration: "none",
  }),
  block: (p) => ({
    fontFamily: p.fontBody,
    fontSize: "1rem",
    fontWeight: 700,
    color: p.primaryColor,
    background: p.accentColor,
    padding: "16px 32px",
    borderRadius: 4,
    textDecoration: "none",
    textAlign: "center" as const,
  }),
  outline: (p) => ({
    fontFamily: p.fontBody,
    fontSize: "1rem",
    fontWeight: 600,
    color: p.accentColor,
    background: "transparent",
    border: `2px solid ${p.accentColor}`,
    padding: "14px 32px",
    borderRadius: 4,
    textDecoration: "none",
  }),
};

export function PhoneCTA(props: PhoneCTAProps) {
  const { telephone, accentColor, variant, fullWidth } = props;
  const style = variantStyles[variant](props);

  return (
    <div
      style={{
        position: "relative",
        display: fullWidth ? "block" : "inline-block",
      }}
    >
      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: variant === "pill" ? 100 : 8,
          border: `2px solid ${accentColor}`,
          pointerEvents: "none",
        }}
      />
      <motion.a
        href={`tel:${telephone.replace(/\s/g, "")}`}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          ...style,
          display: fullWidth ? "block" : "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          position: "relative",
          width: fullWidth ? "100%" : undefined,
        }}
      >
        <span role="img" aria-label="phone">📞</span> {telephone}
      </motion.a>
    </div>
  );
}
