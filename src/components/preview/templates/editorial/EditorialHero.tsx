"use client";

import { motion } from "framer-motion";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.editorial;

export function EditorialHero({ prospect, theme, typeLabel }: PreviewProps) {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 600,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
        background: theme.primary,
      }}
    >
      {/* Full-screen background photo */}
      {prospect.photos?.[0] && (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${prospect.photos[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Dark gradient overlay — heavier at bottom for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      {/* Content at bottom */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 900,
          padding: "0 32px 80px",
          textAlign: "center",
        }}
      >
        {/* Thin golden line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 80,
            height: 1,
            background: theme.accent,
            margin: "0 auto 24px",
            transformOrigin: "center",
          }}
        />

        {/* Type label in italic */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            display: "block",
            fontFamily: fonts.display,
            fontSize: "1rem",
            fontStyle: "italic",
            fontWeight: 400,
            color: theme.accent,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {typeLabel}
        </motion.span>

        {/* Name — very large serif */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.05,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          {prospect.nom}
        </motion.h1>

        {/* Tagline in italic */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 32px",
            letterSpacing: "0.02em",
          }}
        >
          {theme.tagline}
        </motion.p>

        {/* Rating badge */}
        {prospect.note && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${theme.accent}20`,
              backdropFilter: "blur(8px)",
              border: `1px solid ${theme.accent}40`,
              borderRadius: 4,
              padding: "8px 20px",
            }}
          >
            <span style={{ color: theme.accent, fontSize: "1.1rem", letterSpacing: 2 }}>
              {"★".repeat(Math.round(prospect.note))}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontSize: "0.8rem",
                color: "#fff",
                opacity: 0.8,
              }}
            >
              {prospect.note}/5 — {prospect.nb_avis} avis
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
