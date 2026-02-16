"use client";

import { motion } from "framer-motion";
import { StarRating } from "../../shared/StarRating";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.portfolio;

export function PortfolioHero({ prospect, theme, typeLabel }: PreviewProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        background: theme.bg,
        overflow: "hidden",
        padding: "80px 24px 60px",
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${theme.accent}08, transparent 60%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left — text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* Type badge pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
            style={{
              display: "inline-block",
              fontFamily: fonts.body,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: theme.primary,
              background: `${theme.accent}20`,
              padding: "6px 18px",
              borderRadius: 100,
              marginBottom: 24,
            }}
          >
            {typeLabel}
          </motion.span>

          {/* Name */}
          <h1
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              color: theme.primary,
              lineHeight: 1.1,
              margin: "0 0 20px",
              letterSpacing: "-0.03em",
            }}
          >
            {prospect.nom}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: fonts.body,
              fontSize: "1.1rem",
              fontWeight: 400,
              color: theme.primary,
              margin: "0 0 28px",
              lineHeight: 1.6,
            }}
          >
            {theme.tagline}
          </motion.p>

          {/* Rating */}
          {prospect.note && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: 32 }}
            >
              <StarRating
                note={prospect.note}
                nbAvis={prospect.nb_avis}
                accentColor={theme.accent}
                textColor={theme.primary}
                fontBody={fonts.body}
                size="md"
              />
            </motion.div>
          )}

          {/* CTA phone button */}
          {prospect.telephone && (
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: fonts.body,
                fontSize: "1rem",
                fontWeight: 600,
                color: theme.textOnPrimary,
                background: theme.primary,
                padding: "14px 32px",
                borderRadius: 100,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${theme.primary}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📞 {prospect.telephone}
            </motion.a>
          )}
        </motion.div>

        {/* Right — photo with rounded frame + glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, delay: 0.2 }}
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            borderRadius: 24,
            overflow: "hidden",
            background: theme.bgAlt,
            boxShadow: `0 24px 80px ${theme.accent}20`,
          }}
        >
          {prospect.photos?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={prospect.photos[0]}
              alt={prospect.nom}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                background: `linear-gradient(135deg, ${theme.bgAlt}, ${theme.bg})`,
              }}
            >
              ✨
            </div>
          )}

          {/* Accent glow border */}
          <div
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 24,
              border: `2px solid ${theme.accent}25`,
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
