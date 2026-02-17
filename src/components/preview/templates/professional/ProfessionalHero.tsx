"use client";

import { motion } from "framer-motion";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import type { PreviewProps } from "@/lib/preview-types";
import { HeroFallback } from "../../shared/HeroFallback";

const fonts = TEMPLATE_FONT_VARS.professional;

export function ProfessionalHero({ prospect, theme, typeLabel }: PreviewProps) {
  return (
    <section
      style={{
        position: "relative",
        background: theme.primary,
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: "80px 24px 60px",
      }}
    >
      {/* Background photo — darker overlay */}
      {prospect.photos?.[0] ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${prospect.photos[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
            filter: "saturate(0.4)",
          }}
        />
      ) : (
        <HeroFallback template="professional" primary={theme.primary} accent={theme.accent} />
      )}

      {/* Angular accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 6,
          height: "100%",
          background: theme.accent,
        }}
      />

      {/* Right accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 2,
          height: "100%",
          background: theme.accent,
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Type badge — industrial feel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: theme.accent,
            }}
          />
          <span
            style={{
              fontFamily: fonts.body,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            {typeLabel}
          </span>
        </motion.div>

        {/* Name — left aligned, bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: fonts.display,
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 700,
            color: theme.textOnPrimary,
            lineHeight: 1.1,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          {prospect.nom}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            fontFamily: fonts.body,
            fontSize: "1.05rem",
            color: theme.textOnPrimary,
            margin: "0 0 32px",
            maxWidth: 500,
          }}
        >
          {theme.tagline}
        </motion.p>

        {/* Big CTA phone button — primary action for artisans */}
        {prospect.telephone && (
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: fonts.body,
              fontSize: "1.15rem",
              fontWeight: 700,
              color: theme.primary,
              background: theme.accent,
              padding: "16px 36px",
              borderRadius: 4,
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            📞 Appeler maintenant
          </motion.a>
        )}

        {/* Badge — "Disponible 7j/7" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: fonts.body,
            fontSize: "0.75rem",
            fontWeight: 600,
            color: theme.textOnPrimary,
            marginTop: 16,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
          Disponible 7j/7
        </motion.div>
      </div>
    </section>
  );
}
