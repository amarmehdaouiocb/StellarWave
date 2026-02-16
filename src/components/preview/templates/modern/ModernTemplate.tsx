"use client";

import { motion } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import { fadeUp, staggerContainer, staggerItem, templateTransitions } from "@/lib/preview-animations";
import { PreviewBanner } from "../../shared/PreviewBanner";
import { PreviewCTA } from "../../shared/PreviewCTA";
import { AnimatedSection } from "../../shared/AnimatedSection";
import { PhotoGallery } from "../../shared/PhotoGallery";
import { ModernHero } from "./ModernHero";

const fonts = TEMPLATE_FONT_VARS.modern;
const transition = templateTransitions.modern;

export function ModernTemplate(props: PreviewProps) {
  const { prospect, theme } = props;

  return (
    <div style={{ background: theme.bg, color: theme.primary, minHeight: "100vh", overflowX: "hidden" }}>
      <PreviewBanner
        fontBody={fonts.body}
        primaryColor={theme.primary}
        accentColor={theme.accent}
        textOnPrimary={theme.textOnPrimary}
      />

      <ModernHero {...props} />

      {/* ── Services ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
              color: theme.primary,
              textAlign: "center",
              margin: "0 0 12px",
              letterSpacing: "-0.01em",
            }}
          >
            {theme.sectionLabels.services}
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {theme.services.map((svc) => (
              <motion.div
                key={svc.name}
                variants={staggerItem}
                transition={transition}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}
                style={{
                  background: theme.bgAlt,
                  border: "1px solid transparent",
                  borderRadius: 8,
                  padding: "36px 24px 28px",
                  textAlign: "center",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <span style={{ fontSize: "2.2rem", display: "block", marginBottom: 16 }}>
                  {svc.icon}
                </span>
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: theme.primary,
                    margin: "0 0 8px",
                  }}
                >
                  {svc.name}
                </h3>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    color: theme.primary,
                    opacity: 0.6,
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ── Gallery ── */}
      {prospect.photos && prospect.photos.length > 0 && (
        <AnimatedSection
          variants={fadeUp}
          transition={transition}
          style={{ padding: "80px 24px", background: theme.bgAlt }}
        >
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 600,
                color: theme.primary,
                textAlign: "center",
                margin: "0 0 48px",
              }}
            >
              {theme.sectionLabels.gallery}
            </h2>
            <PhotoGallery
              photos={prospect.photos}
              nom={prospect.nom}
              layout="masonry"
              borderRadius={8}
              transition={transition}
            />
          </div>
        </AnimatedSection>
      )}

      {/* ── About ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
              color: theme.primary,
              margin: "0 0 12px",
            }}
          >
            {theme.sectionLabels.about}
          </h2>
          <div
            style={{
              width: 60,
              height: 2,
              background: theme.accent,
              margin: "20px auto 32px",
            }}
          />
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: theme.primary,
              opacity: 0.75,
              margin: 0,
            }}
          >
            {theme.aboutText(prospect.nom, prospect.ville, prospect.nb_avis)}
          </p>
        </div>
      </AnimatedSection>

      {/* ── Contact ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.primary }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
              color: theme.textOnPrimary,
              margin: "0 0 48px",
            }}
          >
            {theme.sectionLabels.contact}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 32,
              marginBottom: 36,
            }}
          >
            {/* Phone */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.8rem" }}>📞</span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: theme.accent,
                }}
              >
                Téléphone
              </span>
              {prospect.telephone ? (
                <a
                  href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.95rem",
                    color: theme.textOnPrimary,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {prospect.telephone}
                </a>
              ) : (
                <span style={{ fontFamily: fonts.body, fontSize: "0.95rem", color: theme.textOnPrimary, opacity: 0.8 }}>—</span>
              )}
            </div>

            {/* Address */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.8rem" }}>📍</span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: theme.accent,
                }}
              >
                Adresse
              </span>
              <span style={{ fontFamily: fonts.body, fontSize: "0.95rem", color: theme.textOnPrimary, opacity: 0.8 }}>
                {prospect.adresse}
              </span>
            </div>

            {/* Hours */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.8rem" }}>🕐</span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: theme.accent,
                }}
              >
                Horaires
              </span>
              <span style={{ fontFamily: fonts.body, fontSize: "0.95rem", color: theme.textOnPrimary, opacity: 0.8 }}>
                {theme.hours}
              </span>
            </div>
          </div>

          {prospect.google_maps && (
            <a
              href={prospect.google_maps}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: fonts.body,
                fontSize: "0.9rem",
                fontWeight: 500,
                color: theme.accent,
                textDecoration: "none",
                border: `1px solid ${theme.accent}`,
                padding: "10px 28px",
                borderRadius: 4,
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.accent;
                e.currentTarget.style.color = theme.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = theme.accent;
              }}
            >
              Voir sur Google Maps →
            </a>
          )}
        </div>
      </AnimatedSection>

      <PreviewCTA
        fontDisplay={fonts.display}
        fontBody={fonts.body}
        primaryColor={theme.primary}
        bgColor={theme.bg}
        textOnPrimary={theme.textOnPrimary}
        transition={transition}
      />
    </div>
  );
}
