"use client";

import { motion } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import {
  fadeUp,
  staggerContainer,
  professionalVariants,
  templateTransitions,
} from "@/lib/preview-animations";
import { PreviewBanner } from "../../shared/PreviewBanner";
import { PreviewCTA } from "../../shared/PreviewCTA";
import { AnimatedSection } from "../../shared/AnimatedSection";
import { PhotoGallery } from "../../shared/PhotoGallery";
import { ProfessionalHero } from "./ProfessionalHero";
import { TrustBar } from "./TrustBar";

const fonts = TEMPLATE_FONT_VARS.professional;
const transition = templateTransitions.professional;

export function ProfessionalTemplate(props: PreviewProps) {
  const { prospect, theme } = props;

  return (
    <div style={{ background: theme.bg, color: theme.primary, minHeight: "100vh", overflowX: "hidden" }}>
      <PreviewBanner
        fontBody={fonts.body}
        primaryColor={theme.primary}
        accentColor={theme.accent}
        textOnPrimary={theme.textOnPrimary}
      />

      <ProfessionalHero {...props} />

      {/* ── Trust Bar — stats strip ── */}
      <TrustBar {...props} />

      {/* ── Services — industrial cards with accent left border ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "72px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              color: theme.primary,
              margin: "0 0 40px",
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
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {theme.services.map((svc) => (
              <motion.div
                key={svc.name}
                variants={professionalVariants.serviceCard}
                style={{
                  background: theme.bgAlt,
                  borderLeft: `4px solid ${theme.accent}`,
                  borderRadius: 4,
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: "1.8rem", flexShrink: 0, lineHeight: 1 }}>
                  {svc.icon}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: fonts.display,
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: theme.primary,
                      margin: "0 0 4px",
                    }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.85rem",
                      color: theme.primary,
                      opacity: 0.55,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ── Gallery — simple 2-column ── */}
      {prospect.photos && prospect.photos.length > 0 && (
        <AnimatedSection
          variants={fadeUp}
          transition={transition}
          style={{ padding: "72px 24px", background: theme.bgAlt }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: theme.primary,
                margin: "0 0 40px",
              }}
            >
              {theme.sectionLabels.gallery}
            </h2>
            <PhotoGallery
              photos={prospect.photos}
              nom={prospect.nom}
              layout="grid"
              borderRadius={4}
              transition={transition}
            />
          </div>
        </AnimatedSection>
      )}

      {/* ── About — checklist style ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "72px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              color: theme.primary,
              margin: "0 0 28px",
            }}
          >
            {theme.sectionLabels.about}
          </h2>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: theme.primary,
              opacity: 0.7,
              margin: "0 0 28px",
            }}
          >
            {theme.aboutText}
          </p>

          {/* Checklist points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Devis gratuit et transparent", "Intervention rapide", "Travail soigné et garanti"].map(
              (point) => (
                <div
                  key={point}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      background: `${theme.accent}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: theme.accent,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.95rem",
                      color: theme.primary,
                      opacity: 0.8,
                    }}
                  >
                    {point}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Contact — phone prominent ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "72px 24px", background: theme.primary }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              color: theme.textOnPrimary,
              margin: "0 0 40px",
            }}
          >
            {theme.sectionLabels.contact}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              alignItems: "start",
            }}
          >
            {/* Left — phone very prominent */}
            <div>
              {prospect.telephone && (
                <a
                  href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    fontFamily: fonts.display,
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: theme.accent,
                    textDecoration: "none",
                    marginBottom: 28,
                  }}
                >
                  📞 {prospect.telephone}
                </a>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1rem" }}>📍</span>
                  <span style={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.textOnPrimary, opacity: 0.7 }}>
                    {prospect.adresse}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1rem" }}>🕐</span>
                  <span style={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.textOnPrimary, opacity: 0.7 }}>
                    {theme.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Right — repeated CTA + Google Maps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {prospect.telephone && (
                <a
                  href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                  style={{
                    display: "block",
                    fontFamily: fonts.body,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: theme.primary,
                    background: theme.accent,
                    padding: "16px 32px",
                    borderRadius: 4,
                    textDecoration: "none",
                    textAlign: "center",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Appeler maintenant →
                </a>
              )}
              {prospect.google_maps && (
                <a
                  href={prospect.google_maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    fontFamily: fonts.body,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: theme.textOnPrimary,
                    textDecoration: "none",
                    border: `1px solid ${theme.textOnPrimary}30`,
                    padding: "14px 32px",
                    borderRadius: 4,
                    textAlign: "center",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${theme.textOnPrimary}10`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  Voir sur Google Maps →
                </a>
              )}
            </div>
          </div>
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
