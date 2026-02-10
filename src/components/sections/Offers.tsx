"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkle, Lightning, Buildings } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { offers, cloudOffers } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItemBlur, fadeInUp, easings } from "@/lib/animations";

// Plan icons mapping
const planIcons = [Lightning, Star, Buildings];

// Pricing card - Apple-like XL cards with popular as dark
function PricingCard({
  offer,
  index,
}: {
  offer: (typeof offers)[number];
  index: number;
}) {
  const Icon = planIcons[index];
  const isDark = offer.popular;

  return (
    <motion.div
      variants={staggerItemBlur}
      className={cn(
        "relative group",
        offer.popular && "z-10 md:-mt-6 md:mb-6"
      )}
    >
      <div
        className="h-full flex flex-col relative overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
            : "white",
          borderRadius: "var(--card-radius-xl)",
          padding: "36px",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: isDark
            ? "var(--shadow-apple-xl)"
            : "var(--shadow-apple-lg)",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
        }}
      >

        {/* Dark card inner glow */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)"
            }}
          />
        )}

        {/* Popular badge - Glass style */}
        {offer.popular && (
          <motion.div
            className="absolute -top-px left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-b-2xl text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.35)"
              }}
            >
              <Sparkle className="h-4 w-4" weight="fill" />
              Recommandé
            </span>
          </motion.div>
        )}

        {/* Content */}
        <div className={cn("relative z-10", offer.popular && "pt-4")}>
          {/* Icon and name */}
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                background: isDark
                  ? "rgba(99, 102, 241, 0.20)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
            >
              <Icon
                className="h-7 w-7 text-white"
                weight="duotone"
              />
            </motion.div>
            <div>
              <h3
                className="text-xl font-semibold"
                style={{ color: isDark ? "white" : "#111111" }}
              >
                {offer.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-[15px] mb-6 leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(17,17,17,0.6)" }}
          >
            {offer.description}
          </p>

          {/* Price */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="text-3xl md:text-4xl font-bold"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #667eea 0%, #a78bfa 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {offer.price}
            </div>
          </motion.div>

          {/* Features with staggered animation */}
          <ul className="space-y-3 mb-8 flex-grow">
            {offer.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-start gap-3 text-sm"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.6)" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    background: isDark
                      ? "rgba(99, 102, 241, 0.25)"
                      : "rgba(102, 126, 234, 0.12)"
                  }}
                >
                  <Check
                    className="h-3 w-3"
                    style={{ color: isDark ? "rgba(99, 102, 241, 0.9)" : "#667eea" }}
                    weight="bold"
                  />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button - Custom styled */}
          <motion.a
            href="#contact"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-base rounded-2xl transition-all duration-300"
            style={isDark ? {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
            } : {
              background: "rgba(102, 126, 234, 0.08)",
              color: "#667eea",
              border: "1px solid rgba(102, 126, 234, 0.15)"
            }}
            whileHover={{
              scale: 1.02,
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {offer.cta}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// Cloud offer card - Apple-like XL cards
function CloudOfferCard({
  offer,
  index,
}: {
  offer: (typeof cloudOffers)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, ease: easings.smooth }}
      className="group"
    >
      <div
        className="h-full flex flex-col relative overflow-hidden"
        style={{
          background: "white",
          borderRadius: "var(--card-radius-xl)",
          padding: "36px",
          border: "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "var(--shadow-apple-lg)",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
        }}
      >
        {/* Accent gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "var(--card-radius-xl) var(--card-radius-xl) 0 0"
          }}
        />

        {/* Header */}
        <div className="mb-6">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-4"
            style={{
              background: "rgba(102, 126, 234, 0.08)",
              color: "#667eea",
              border: "1px solid rgba(102, 126, 234, 0.15)"
            }}
            whileHover={{ scale: 1.05 }}
          >
            {offer.duration}
          </motion.span>
          <h4
            className="text-xl font-semibold mb-1 transition-colors duration-300"
            style={{ color: "#111111" }}
          >
            {offer.title}
          </h4>
          <p
            className="text-sm font-medium"
            style={{ color: "#667eea" }}
          >
            {offer.subtitle}
          </p>
        </div>

        {/* Description */}
        <p
          className="mb-6 leading-relaxed text-[15px]"
          style={{ color: "rgba(17, 17, 17, 0.6)" }}
        >
          {offer.description}
        </p>

        {/* Deliverables */}
        <div className="mb-6">
          <span
            className="text-xs uppercase tracking-[0.15em] mb-3 block font-medium"
            style={{ color: "rgba(17, 17, 17, 0.4)" }}
          >
            Livrables inclus
          </span>
          <ul className="space-y-2.5">
            {offer.deliverables.map((deliverable, deliverableIndex) => (
              <motion.li
                key={deliverableIndex}
                className="flex items-start gap-3 text-sm"
                style={{ color: "rgba(17, 17, 17, 0.6)" }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + deliverableIndex * 0.05 }}
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(102, 126, 234, 0.12)" }}
                >
                  <Check className="h-3 w-3" style={{ color: "#667eea" }} weight="bold" />
                </div>
                <span>{deliverable}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div
          className="flex items-center justify-between pt-6 mt-auto"
          style={{ borderTop: "1px solid rgba(17, 17, 17, 0.06)" }}
        >
          <motion.div
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {offer.price}
          </motion.div>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-sm rounded-xl"
            style={{
              background: "rgba(102, 126, 234, 0.08)",
              color: "#667eea",
              border: "1px solid rgba(102, 126, 234, 0.15)"
            }}
            whileHover={{
              scale: 1.02,
              background: "rgba(102, 126, 234, 0.12)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            En savoir plus
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export function Offers() {
  return (
    <AnimatedSection
      id="offers"
      className="section-padding"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="container-wide">
        {/* Editorial Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)"
            }}
          >
            Nos formules
          </motion.span>
          {/* Editorial two-tone title */}
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em"
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Des offres </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>transparentes</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Choisissez la formule adaptée à votre projet. Prix fixe, sans surprise.
          </p>
        </motion.div>

        {/* Main offers - pricing cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-24 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offers.map((offer, index) => (
            <PricingCard key={offer.id} offer={offer} index={index} />
          ))}
        </motion.div>

        {/* Cloud offers section */}
        <motion.div
          id="cloud"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                background: "rgba(255, 255, 255, 0.80)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.60)",
                boxShadow: "var(--shadow-apple-sm)",
                color: "rgba(17, 17, 17, 0.6)"
              }}
            >
              Services Cloud
            </motion.div>
            <h3
              className="text-2xl sm:text-3xl mb-4"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em"
              }}
            >
              <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Offres </span>
              <span style={{ color: "#111111", fontWeight: 600 }}>Architecture Cloud</span>
            </h3>
            <p
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ color: "rgba(17, 17, 17, 0.6)" }}
            >
              Audit et optimisation de votre infrastructure cloud. Réduisez vos
              coûts, améliorez la sécurité et les performances.
            </p>
          </div>

          {/* Cloud offer cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudOffers.map((offer, index) => (
              <CloudOfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
