"use client";

import { motion } from "framer-motion";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.portfolio;

export function PortfolioRating({ prospect, theme }: PreviewProps) {
  if (!prospect.note) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "80px 24px",
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.primary}ee)`,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15, delay: 0.1 }}
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(4rem, 10vw, 7rem)",
            fontWeight: 800,
            color: theme.accent,
            lineHeight: 1,
            margin: "0 0 8px",
            letterSpacing: "-0.03em",
          }}
        >
          {prospect.note}
          <span style={{ fontSize: "0.4em", opacity: 0.6 }}>/5</span>
        </motion.div>

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: "1.8rem",
            color: theme.accent,
            letterSpacing: 6,
            marginBottom: 16,
          }}
        >
          {"★".repeat(Math.round(prospect.note))}
          {"☆".repeat(5 - Math.round(prospect.note))}
        </motion.div>

        {/* Avis count */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontFamily: fonts.body,
            fontSize: "1rem",
            color: theme.textOnPrimary,
            margin: 0,
          }}
        >
          {prospect.nb_avis} avis Google
        </motion.p>
      </div>
    </motion.section>
  );
}
