"use client";

import { motion } from "framer-motion";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import { staggerContainer, professionalVariants } from "@/lib/preview-animations";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.professional;

export function TrustBar({ prospect, theme }: PreviewProps) {
  const stats = [
    {
      value: prospect.note ? `${prospect.note}/5` : "—",
      label: "Note Google",
      show: true,
    },
    {
      value: prospect.nb_avis > 0 ? `${prospect.nb_avis}+` : "—",
      label: "Avis clients",
      show: true,
    },
    {
      value: "7j/7",
      label: "Disponibilité",
      show: true,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      style={{
        background: theme.bgAlt,
        borderTop: `3px solid ${theme.accent}`,
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          textAlign: "center",
        }}
      >
        {stats
          .filter((s) => s.show)
          .map((stat) => (
            <motion.div
              key={stat.label}
              variants={professionalVariants.trustStat}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  fontWeight: 700,
                  color: theme.accent,
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: theme.primary,
                  opacity: 0.6,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
