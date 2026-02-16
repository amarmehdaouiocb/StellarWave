"use client";

import { motion } from "framer-motion";
import { StarRating } from "../../shared/StarRating";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.modern;

export function ModernHero({ prospect, theme, typeLabel }: PreviewProps) {
  return (
    <section
      style={{
        position: "relative",
        background: theme.primary,
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      {prospect.photos?.[0] && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${prospect.photos[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            filter: "blur(2px) saturate(0.6)",
          }}
        />
      )}

      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: theme.textOnPrimary,
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1px solid ${theme.accent}`,
          opacity: 0.1,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "80px 24px 60px",
          maxWidth: 800,
        }}
      >
        {/* Type badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: "inline-block",
            fontFamily: fonts.body,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme.accent,
            border: `1px solid ${theme.accent}`,
            padding: "6px 20px",
            borderRadius: 2,
            marginBottom: 28,
          }}
        >
          {typeLabel}
        </motion.span>

        {/* Name */}
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 700,
            color: theme.textOnPrimary,
            lineHeight: 1.1,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          {prospect.nom}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: fonts.body,
            fontSize: "1.15rem",
            fontWeight: 300,
            color: theme.textOnPrimary,
            margin: "0 0 36px",
            letterSpacing: "0.02em",
          }}
        >
          {theme.tagline}
        </motion.p>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {prospect.telephone && (
            <a
              href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
              style={{
                fontFamily: fonts.body,
                fontSize: "1.3rem",
                fontWeight: 600,
                color: theme.accent,
                textDecoration: "none",
              }}
            >
              {prospect.telephone}
            </a>
          )}
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              color: theme.textOnPrimary,
              opacity: 0.6,
            }}
          >
            {prospect.adresse}
          </span>
        </motion.div>

        {/* Rating */}
        {prospect.note && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StarRating
              note={prospect.note}
              nbAvis={prospect.nb_avis}
              accentColor={theme.accent}
              textColor={theme.textOnPrimary}
              fontBody={fonts.body}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
