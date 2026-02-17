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
import { PhoneCTA } from "../../shared/PhoneCTA";
import { ProfessionalHero } from "./ProfessionalHero";
import { TrustBar } from "./TrustBar";
import { ReviewSection } from "../../shared/ReviewCard";
import { OpeningHours } from "../../shared/OpeningHours";
import { ServiceBadges } from "../../shared/ServiceBadges";
import { GoogleMapEmbed } from "../../shared/GoogleMapEmbed";
import { ContactForm } from "../../shared/ContactForm";

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

      {/* ── Service badges ── */}
      {prospect.services_disponibles && prospect.services_disponibles.length > 0 && (
        <div style={{ padding: "20px 24px", background: theme.bg }}>
          <ServiceBadges
            services={prospect.services_disponibles}
            template="professional"
            primaryColor={theme.primary}
            accentColor={theme.accent}
            bgColor={theme.bg}
            bgAltColor={theme.bgAlt}
            textOnPrimary={theme.textOnPrimary}
            fontBody={fonts.body}
            transition={transition}
            niveauPrix={prospect.niveau_prix}
            accessibilite={prospect.accessibilite}
            moyensPaiement={prospect.moyens_paiement}
          />
        </div>
      )}

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
            {theme.services.map((svc, i) => (
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
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: 8,
                    bottom: -4,
                    fontFamily: fonts.display,
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    color: theme.accent,
                    opacity: 0.08,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
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
            {theme.checklistItems.map(
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

      {/* ── Avis clients ── */}
      {prospect.avis && prospect.avis.length > 0 && (
        <ReviewSection
          reviews={prospect.avis}
          sectionTitle={theme.sectionLabels.reviews}
          template="professional"
          primaryColor={theme.primary}
          accentColor={theme.accent}
          bgColor={theme.bg}
          bgAltColor={theme.bgAlt}
          textOnPrimary={theme.textOnPrimary}
          fontDisplay={fonts.display}
          fontBody={fonts.body}
          transition={transition}
        />
      )}

      {/* ── Horaires ── */}
      {prospect.horaires && prospect.horaires.length > 0 && (
        <OpeningHours
          horaires={prospect.horaires}
          sectionTitle={theme.sectionLabels.hours}
          template="professional"
          primaryColor={theme.primary}
          accentColor={theme.accent}
          bgColor={theme.bg}
          bgAltColor={theme.bgAlt}
          textOnPrimary={theme.textOnPrimary}
          fontDisplay={fonts.display}
          fontBody={fonts.body}
          transition={transition}
        />
      )}

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
                <PhoneCTA
                  telephone={prospect.telephone}
                  accentColor={theme.accent}
                  primaryColor={theme.primary}
                  textOnPrimary={theme.textOnPrimary}
                  fontBody={fonts.body}
                  variant="block"
                />
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
                    {prospect.horaires && prospect.horaires.length > 0
                      ? prospect.horaires.find((_, i) => i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)) || theme.hours
                      : theme.hours}
                  </span>
                </div>
              </div>

              {/* Map */}
              <div style={{ marginTop: 24 }}>
                <GoogleMapEmbed
                  address={prospect.adresse}
                  template="professional"
                  accentColor={theme.accent}
                  primaryColor={theme.primary}
                  bgColor={theme.bg}
                  transition={transition}
                />
              </div>

              {prospect.google_maps && (
                <a
                  href={prospect.google_maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    fontFamily: fonts.body,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: theme.textOnPrimary,
                    textDecoration: "none",
                    opacity: 0.6,
                  }}
                >
                  Voir sur Google Maps →
                </a>
              )}
            </div>

            {/* Right — contact form */}
            <div>
              <ContactForm
                template="professional"
                accentColor={theme.accent}
                primaryColor={theme.primary}
                bgColor={theme.bg}
                bgAltColor={theme.bgAlt}
                textOnPrimary={theme.textOnPrimary}
                fontDisplay={fonts.display}
                fontBody={fonts.body}
                transition={transition}
              />
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
