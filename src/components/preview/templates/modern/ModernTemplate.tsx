"use client";

import { motion } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import { fadeUp, staggerContainerSlow, staggerItem, templateTransitions } from "@/lib/preview-animations";
import { PreviewBanner } from "../../shared/PreviewBanner";
import { PreviewCTA } from "../../shared/PreviewCTA";
import { AnimatedSection } from "../../shared/AnimatedSection";
import { PhotoGallery } from "../../shared/PhotoGallery";
import { PhoneCTA } from "../../shared/PhoneCTA";
import { SectionDivider } from "../../shared/SectionDivider";
import { ModernHero } from "./ModernHero";
import { ReviewSection } from "../../shared/ReviewCard";
import { OpeningHours } from "../../shared/OpeningHours";
import { ServiceBadges } from "../../shared/ServiceBadges";
import { GoogleMapEmbed } from "../../shared/GoogleMapEmbed";
import { ContactForm } from "../../shared/ContactForm";

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

      {/* ── Service badges ── */}
      {prospect.services_disponibles && prospect.services_disponibles.length > 0 && (
        <div style={{ padding: "24px 24px 0", background: theme.bg }}>
          <ServiceBadges
            services={prospect.services_disponibles}
            template="modern"
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
            variants={staggerContainerSlow}
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
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}60)`,
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: `${theme.accent}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: "1.6rem",
                  }}
                >
                  {svc.icon}
                </div>
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

      <SectionDivider template="modern" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bgAlt} />

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
            {prospect.photos.length >= 4 && (
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.8rem",
                  color: theme.primary,
                  opacity: 0.5,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {prospect.photos.length} photos
              </p>
            )}
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
          <div style={{ fontSize: "2rem", marginBottom: 12 }}>
            {theme.key === "sante" ? "❤️" : theme.key === "services" ? "💼" : "🛍️"}
          </div>
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
            {theme.aboutText}
          </p>
        </div>
      </AnimatedSection>

      {/* ── Avis clients ── */}
      {prospect.avis && prospect.avis.length > 0 && (
        <>
          <SectionDivider template="modern" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bgAlt} />
          <ReviewSection
            reviews={prospect.avis}
            sectionTitle={theme.sectionLabels.reviews}
            template="modern"
            primaryColor={theme.primary}
            accentColor={theme.accent}
            bgColor={theme.bg}
            bgAltColor={theme.bgAlt}
            textOnPrimary={theme.textOnPrimary}
            fontDisplay={fonts.display}
            fontBody={fonts.body}
            transition={transition}
          />
        </>
      )}

      {/* ── Horaires ── */}
      {prospect.horaires && prospect.horaires.length > 0 && (
        <OpeningHours
          horaires={prospect.horaires}
          sectionTitle={theme.sectionLabels.hours}
          template="modern"
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
                {prospect.horaires && prospect.horaires.length > 0
                  ? prospect.horaires.find((_, i) => i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)) || theme.hours
                  : theme.hours}
              </span>
            </div>
          </div>

          {prospect.telephone && (
            <div style={{ marginBottom: 24 }}>
              <PhoneCTA
                telephone={prospect.telephone}
                accentColor={theme.accent}
                primaryColor={theme.primary}
                textOnPrimary={theme.textOnPrimary}
                fontBody={fonts.body}
                variant="outline"
              />
            </div>
          )}

          <div style={{ width: 60, height: 2, background: `${theme.accent}30`, margin: "0 auto 24px" }} />

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

          {/* Map + Form */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              marginTop: 48,
              textAlign: "left",
            }}
          >
            <div>
              <GoogleMapEmbed
                address={prospect.adresse}
                template="modern"
                accentColor={theme.accent}
                primaryColor={theme.primary}
                bgColor={theme.bg}
                transition={transition}
              />
            </div>
            <div>
              <ContactForm
                template="modern"
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
