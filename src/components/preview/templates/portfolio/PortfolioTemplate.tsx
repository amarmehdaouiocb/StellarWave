"use client";

import { motion } from "framer-motion";
import type { PreviewProps } from "@/lib/preview-types";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import { fadeUp, staggerContainer, staggerContainerSlow, staggerItem, templateTransitions } from "@/lib/preview-animations";
import { PreviewBanner } from "../../shared/PreviewBanner";
import { PreviewCTA } from "../../shared/PreviewCTA";
import { AnimatedSection } from "../../shared/AnimatedSection";
import { PhoneCTA } from "../../shared/PhoneCTA";
import { SectionDivider } from "../../shared/SectionDivider";
import { PortfolioHero } from "./PortfolioHero";
import { PortfolioRating } from "./PortfolioRating";
import { ReviewSection } from "../../shared/ReviewCard";
import { OpeningHours } from "../../shared/OpeningHours";
import { ServiceBadges } from "../../shared/ServiceBadges";
import { GoogleMapEmbed } from "../../shared/GoogleMapEmbed";
import { ContactForm } from "../../shared/ContactForm";

const fonts = TEMPLATE_FONT_VARS.portfolio;
const transition = templateTransitions.portfolio;

export function PortfolioTemplate(props: PreviewProps) {
  const { prospect, theme } = props;

  return (
    <div style={{ background: theme.bg, color: theme.primary, minHeight: "100vh", overflowX: "hidden" }}>
      <PreviewBanner
        fontBody={fonts.body}
        primaryColor={theme.primary}
        accentColor={theme.accent}
        textOnPrimary={theme.textOnPrimary}
      />

      <PortfolioHero {...props} />

      {/* ── Service badges ── */}
      {prospect.services_disponibles && prospect.services_disponibles.length > 0 && (
        <div style={{ padding: "24px 24px 0", background: theme.bg }}>
          <ServiceBadges
            services={prospect.services_disponibles}
            template="portfolio"
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

      {/* ── Services — 2x2 gradient cards ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: theme.primary,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {theme.sectionLabels.services}
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainerSlow}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {theme.services.map((svc) => (
              <motion.div
                key={svc.name}
                variants={staggerItem}
                transition={transition}
                whileHover={{ y: -3, boxShadow: `0 16px 48px ${theme.accent}15` }}
                style={{
                  background: `linear-gradient(135deg, ${theme.bgAlt}, ${theme.bg})`,
                  border: `1px solid ${theme.primary}08`,
                  borderRadius: 16,
                  padding: "36px 28px",
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: `${theme.accent}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "1.8rem",
                  transition: "transform 0.3s",
                }}>
                  {svc.icon}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "1.15rem",
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
                    opacity: 0.55,
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

      <SectionDivider template="portfolio" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bgAlt} />

      {/* ── Gallery — alternating + very rounded ── */}
      {prospect.photos && prospect.photos.length > 0 && (
        <AnimatedSection
          variants={fadeUp}
          transition={transition}
          style={{ padding: "80px 24px", background: theme.bgAlt }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 700,
                  color: theme.primary,
                  margin: 0,
                }}
              >
                {theme.sectionLabels.gallery}
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {prospect.photos.slice(0, 4).map((photo, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  transition={transition}
                  style={{
                    gridColumn: i === 0 ? "1 / -1" : undefined,
                    borderRadius: 16,
                    overflow: "hidden",
                    aspectRatio: i === 0 ? "16 / 7" : "4 / 3",
                    background: theme.bg,
                    position: "relative",
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
                      transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0"; }}
                  >
                    <span style={{ color: "#fff", fontSize: "1.5rem" }}>🔍</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      <SectionDivider template="portfolio" accentColor={theme.accent} bgFrom={theme.bgAlt} bgTo={theme.bg} />

      {/* ── Social Proof Rating ── */}
      <PortfolioRating {...props} />

      <SectionDivider template="portfolio" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bg} />

      {/* ── About — centered minimal ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bg }}
      >
        <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: theme.primary,
              margin: "0 0 12px",
            }}
          >
            {theme.sectionLabels.about}
          </h2>

          {/* Decorative dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.accent,
                  opacity: 1 - i * 0.25,
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontFamily: fonts.body,
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: theme.primary,
              opacity: 0.7,
              margin: 0,
            }}
          >
            {theme.aboutText}
          </p>

          {prospect.note && prospect.nb_avis > 0 && (
            <p style={{
              fontFamily: fonts.body,
              fontSize: "0.9rem",
              color: theme.accent,
              fontWeight: 600,
              marginTop: 20,
            }}>
              Recommandé par {prospect.nb_avis} clients
            </p>
          )}
        </div>
      </AnimatedSection>

      {/* ── Avis clients ── */}
      {prospect.avis && prospect.avis.length > 0 && (
        <>
          <SectionDivider template="portfolio" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bgAlt} />
          <ReviewSection
            reviews={prospect.avis}
            sectionTitle={theme.sectionLabels.reviews}
            template="portfolio"
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
          template="portfolio"
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

      <SectionDivider template="portfolio" accentColor={theme.accent} bgFrom={theme.bg} bgTo={theme.bgAlt} />

      {/* ── Contact ── */}
      <AnimatedSection
        variants={fadeUp}
        transition={transition}
        style={{ padding: "80px 24px", background: theme.bgAlt }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fonts.display,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              color: theme.primary,
              margin: "0 0 48px",
            }}
          >
            {theme.sectionLabels.contact}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 24,
              marginBottom: 36,
            }}
          >
            {[
              { icon: "📞", label: "Téléphone", value: prospect.telephone, href: prospect.telephone ? `tel:${prospect.telephone.replace(/\s/g, "")}` : undefined },
              { icon: "📍", label: "Adresse", value: prospect.adresse },
              { icon: "🕐", label: "Horaires", value: prospect.horaires && prospect.horaires.length > 0
                ? prospect.horaires.find((_, i) => i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)) || theme.hours
                : theme.hours },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: theme.bg,
                  borderRadius: 16,
                  padding: "28px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: theme.accent,
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: fonts.body,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: theme.primary,
                      textDecoration: "none",
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontFamily: fonts.body, fontSize: "0.9rem", color: theme.primary, opacity: 0.7, textAlign: "center" }}>
                    {item.value || "—"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {prospect.telephone && (
            <div style={{ marginBottom: 24 }}>
              <PhoneCTA
                telephone={prospect.telephone}
                accentColor={theme.accent}
                primaryColor={theme.primary}
                textOnPrimary={theme.textOnPrimary}
                fontBody={fonts.body}
                variant="pill"
              />
            </div>
          )}

          {prospect.google_maps && (
            <a
              href={prospect.google_maps}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: fonts.body,
                fontSize: "0.9rem",
                fontWeight: 600,
                color: theme.textOnPrimary,
                background: theme.primary,
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: 100,
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
              Voir sur Google Maps →
            </a>
          )}

          {/* Map + Form — side by side */}
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
                template="portfolio"
                accentColor={theme.accent}
                primaryColor={theme.primary}
                bgColor={theme.bg}
                transition={transition}
              />
            </div>
            <div>
              <ContactForm
                template="portfolio"
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
