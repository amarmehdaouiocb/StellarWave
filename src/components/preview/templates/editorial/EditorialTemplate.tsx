"use client";

import { motion } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  slideFromLeft,
  slideFromRight,
  templateTransitions,
} from "@/lib/preview-animations";
import { PreviewBanner } from "../../shared/PreviewBanner";
import { PreviewCTA } from "../../shared/PreviewCTA";
import { AnimatedSection } from "../../shared/AnimatedSection";
import { EditorialHero } from "./EditorialHero";

const fonts = TEMPLATE_FONT_VARS.editorial;
const transition = templateTransitions.editorial;

export function EditorialTemplate(props: PreviewProps) {
  const { prospect, theme } = props;

  return (
    <div style={{ background: theme.bg, color: theme.primary, minHeight: "100vh", overflowX: "hidden" }}>
      <PreviewBanner
        fontBody={fonts.body}
        primaryColor={theme.primary}
        accentColor={theme.accent}
        textOnPrimary={theme.textOnPrimary}
      />

      <EditorialHero {...props} />

      {/* ── Spécialités — editorial 2-column layout ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "100px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Section header with golden line */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              style={{
                width: 50,
                height: 1,
                background: theme.accent,
                margin: "0 auto 20px",
              }}
            />
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                color: theme.primary,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {theme.sectionLabels.services}
            </h2>
          </div>

          {/* 2-column: large photo left, stacked services right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left — photo */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideFromLeft}
              transition={transition}
              style={{
                borderRadius: 4,
                overflow: "hidden",
                aspectRatio: "3 / 4",
                background: theme.bgAlt,
              }}
            >
              {prospect.photos?.[1] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={prospect.photos[1]}
                  alt={`${prospect.nom} — spécialités`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : prospect.photos?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={prospect.photos[0]}
                  alt={prospect.nom}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: theme.bgAlt,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                  }}
                >
                  🍽️
                </div>
              )}
            </motion.div>

            {/* Right — stacked services */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {theme.services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  variants={staggerItem}
                  transition={transition}
                  style={{
                    padding: "28px 0",
                    borderBottom: i < theme.services.length - 1 ? `1px solid ${theme.primary}15` : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: "1.4rem" }}>{svc.icon}</span>
                    <h3
                      style={{
                        fontFamily: fonts.display,
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        color: theme.primary,
                        margin: 0,
                      }}
                    >
                      {svc.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.95rem",
                      color: theme.primary,
                      opacity: 0.6,
                      margin: 0,
                      paddingLeft: 44,
                      lineHeight: 1.6,
                    }}
                  >
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Gallery — asymmetric grid ── */}
      {prospect.photos && prospect.photos.length > 0 && (
        <AnimatedSection
          variants={fadeUp}
          transition={transition}
          style={{ padding: "100px 24px", background: theme.bgAlt }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ width: 50, height: 1, background: theme.accent, margin: "0 auto 20px" }} />
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 600,
                  color: theme.primary,
                  margin: 0,
                }}
              >
                {theme.sectionLabels.gallery}
              </h2>
            </div>

            {/* Asymmetric: 1 large + 2 small */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 12,
                minHeight: 500,
              }}
            >
              {prospect.photos.slice(0, 3).map((photo, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  transition={transition}
                  style={{
                    gridRow: i === 0 ? "1 / 3" : undefined,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    background: theme.bg,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`${prospect.nom} — photo ${i + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {/* ── À propos — full-width dark band ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{
          padding: "100px 32px",
          background: theme.primary,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Decorative quotation marks */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: "block",
              fontFamily: fonts.display,
              fontSize: "6rem",
              lineHeight: 0.8,
              color: theme.accent,
              marginBottom: 16,
            }}
          >
            &ldquo;
          </motion.span>

          <p
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontStyle: "italic",
              fontWeight: 400,
              color: theme.textOnPrimary,
              lineHeight: 1.9,
              margin: "0 0 32px",
              opacity: 0.85,
            }}
          >
            {theme.aboutText(prospect.nom, prospect.ville, prospect.nb_avis)}
          </p>

          <div style={{ width: 50, height: 1, background: theme.accent, margin: "0 auto" }} />
        </div>
      </AnimatedSection>

      {/* ── Contact — split layout ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bg }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left — info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromLeft}
            transition={transition}
          >
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 600,
                color: theme.primary,
                margin: "0 0 32px",
              }}
            >
              {theme.sectionLabels.contact}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {prospect.telephone && (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "1.2rem" }}>📞</span>
                  <a
                    href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: theme.primary,
                      textDecoration: "none",
                    }}
                  >
                    {prospect.telephone}
                  </a>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.2rem" }}>📍</span>
                <span style={{ fontFamily: fonts.body, fontSize: "0.95rem", color: theme.primary, opacity: 0.7 }}>
                  {prospect.adresse}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.2rem" }}>🕐</span>
                <span style={{ fontFamily: fonts.body, fontSize: "0.95rem", color: theme.primary, opacity: 0.7 }}>
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
                  marginTop: 28,
                  fontFamily: fonts.body,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: theme.accent,
                  textDecoration: "none",
                  borderBottom: `1px solid ${theme.accent}`,
                  paddingBottom: 2,
                }}
              >
                Voir sur Google Maps →
              </a>
            )}
          </motion.div>

          {/* Right — large CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideFromRight}
            transition={transition}
            style={{
              background: theme.primary,
              borderRadius: 4,
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: fonts.display,
                fontSize: "1.6rem",
                fontWeight: 600,
                color: theme.textOnPrimary,
                margin: "0 0 8px",
              }}
            >
              Envie de goûter ?
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: "0.9rem",
                color: theme.textOnPrimary,
                opacity: 0.6,
                margin: "0 0 28px",
              }}
            >
              Réservez votre table ou passez commande
            </p>
            {prospect.telephone && (
              <a
                href={`tel:${prospect.telephone.replace(/\s/g, "")}`}
                style={{
                  display: "inline-block",
                  fontFamily: fonts.body,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: theme.primary,
                  background: theme.accent,
                  padding: "16px 40px",
                  borderRadius: 4,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                📞 {prospect.telephone}
              </a>
            )}
          </motion.div>
        </div>
      </AnimatedSection>

      <PreviewCTA
        fontDisplay={fonts.display}
        fontBody={fonts.body}
        primaryColor={theme.primary}
        bgColor={theme.bgAlt}
        textOnPrimary={theme.textOnPrimary}
        transition={transition}
      />
    </div>
  );
}
