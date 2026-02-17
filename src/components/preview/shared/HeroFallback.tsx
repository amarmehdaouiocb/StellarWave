"use client";

import { motion } from "framer-motion";
import type { TemplateName } from "@/lib/template-registry";

interface HeroFallbackProps {
  template: TemplateName;
  primary: string;
  accent: string;
}

/** CSS-only hero backgrounds quand prospect.photos est vide */
export function HeroFallback({ template, primary, accent }: HeroFallbackProps) {
  if (template === "editorial") {
    return (
      <>
        {/* Gradient chaud primary → primary+15% lightness */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${primary}, ${primary}ee 60%, ${primary}cc)`,
          }}
        />
        {/* Radial glow accent en bas-centre */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 90%, ${accent}30, transparent 60%)`,
          }}
        />
      </>
    );
  }

  if (template === "portfolio") {
    return (
      <>
        {/* Animated blobs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `${accent}18`,
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 25, -15, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            bottom: "15%",
            right: "20%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `${primary}15`,
            filter: "blur(50px)",
          }}
        />
        <motion.div
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -30, 10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "50%",
            right: "35%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `${accent}12`,
            filter: "blur(45px)",
          }}
        />
      </>
    );
  }

  if (template === "professional") {
    return (
      <>
        {/* Cross-hatch SVG pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 40M40 0L0 40' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Diagonal accent stripe */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, transparent 40%, ${accent}08 50%, transparent 60%)`,
          }}
        />
      </>
    );
  }

  // modern
  return (
    <>
      {/* Gradient radial accent amplifié */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}20, transparent 65%)`,
        }}
      />
      {/* 2e cercle décoratif */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}10, transparent 60%)`,
        }}
      />
    </>
  );
}
