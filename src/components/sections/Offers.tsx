"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkle, Lightning, Buildings } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { offers, cloudOffers } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { staggerContainer, staggerItemBlur, fadeInUp, easings } from "@/lib/animations";

// Plan icons mapping
const planIcons = [Lightning, Star, Buildings];

// Pricing card - Light theme
function PricingCard({
  offer,
  index,
}: {
  offer: (typeof offers)[number];
  index: number;
}) {
  const Icon = planIcons[index];

  return (
    <motion.div
      variants={staggerItemBlur}
      className={cn(
        "relative group",
        offer.popular && "z-10 md:-mt-6 md:mb-6"
      )}
    >
      <div
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          "bg-white rounded-3xl p-8",
          "border transition-all duration-300",
          offer.popular
            ? "border-[var(--electric-blue)]/30"
            : "border-[oklch(0_0_0_/_6%)] hover:border-[var(--electric-blue)]/20"
        )}
        style={{
          boxShadow: offer.popular
            ? "0 8px 30px -4px oklch(0.55 0.25 255 / 12%), 0 24px 60px -12px oklch(0.2 0.01 250 / 10%)"
            : "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
      >

        {/* Popular badge - animated */}
        {offer.popular && (
          <motion.div
            className="absolute -top-px left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-b-xl bg-[var(--electric-blue)] text-sm font-semibold text-white shadow-lg">
              <Sparkle className="h-4 w-4" weight="fill" />
              Recommandé
            </span>
          </motion.div>
        )}

        {/* Content */}
        <div className={cn("relative z-10", offer.popular && "pt-4")}>
          {/* Icon and name */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                offer.popular
                  ? "bg-[var(--electric-blue)]"
                  : "bg-[var(--electric-blue)]/10 group-hover:bg-[var(--electric-blue)]/15"
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                boxShadow: offer.popular
                  ? "0 4px 16px oklch(0.55 0.25 255 / 25%)"
                  : "none",
              }}
            >
              <Icon
                className={cn(
                  "h-6 w-6",
                  offer.popular ? "text-white" : "text-[var(--electric-blue)]"
                )}
                weight="duotone"
              />
            </motion.div>
            <div>
              <h3 className={cn(
                "text-xl font-bold",
                offer.popular ? "text-[var(--electric-blue)]" : "text-[var(--accent-dark)]"
              )}>
                {offer.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--neutral-500)] mb-6 leading-relaxed">
            {offer.description}
          </p>

          {/* Price with animation */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={cn(
                "text-3xl md:text-4xl font-bold",
                offer.popular ? "text-gradient-hero" : "text-[var(--accent-dark)]"
              )}
            >
              {offer.price}
            </div>
          </motion.div>

          {/* Features with staggered animation */}
          <ul className="space-y-3 mb-8 flex-grow">
            {offer.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-start gap-3 text-sm text-[var(--neutral-500)] group/feature"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
              >
                <motion.div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5",
                    offer.popular
                      ? "bg-[var(--electric-blue)]/15"
                      : "bg-[var(--neutral-100)] group-hover/feature:bg-[var(--electric-blue)]/10"
                  )}
                  whileHover={{ scale: 1.2 }}
                >
                  <Check
                    className={cn(
                      "h-3 w-3",
                      offer.popular
                        ? "text-[var(--electric-blue)]"
                        : "text-[var(--neutral-400)] group-hover/feature:text-[var(--electric-blue)]"
                    )}
                    weight="bold"
                  />
                </motion.div>
                <span className="group-hover/feature:text-[var(--neutral-600)] transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <CTAButton
            variant={offer.popular ? "primary" : "secondary"}
            className={cn(
              "w-full",
              offer.popular && "shadow-glow-blue"
            )}
            icon={<ArrowRight className="h-4 w-4" />}
            href="#contact"
          >
            {offer.cta}
          </CTAButton>
        </div>
      </div>
    </motion.div>
  );
}

// Cloud offer card - Light theme
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
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          "bg-white rounded-3xl p-8",
          "border border-[oklch(0_0_0_/_6%)]",
          "hover:border-[var(--electric-blue)]/20",
          "transition-all duration-300"
        )}
        style={{
          boxShadow: "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
      >
        {/* Accent gradient - Electric Blue */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[var(--electric-blue)] to-[var(--electric-blue-light)]" />

        {/* Header */}
        <div className="mb-6">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4 bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] border border-[var(--electric-blue)]/20"
            whileHover={{ scale: 1.05 }}
          >
            {offer.duration}
          </motion.span>
          <h4 className="text-xl font-semibold text-[var(--accent-dark)] mb-1 group-hover:text-[var(--electric-blue)] transition-colors duration-300">
            {offer.title}
          </h4>
          <p className="text-sm font-medium text-[var(--electric-blue)]">
            {offer.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-[var(--neutral-500)] mb-6 leading-relaxed">
          {offer.description}
        </p>

        {/* Deliverables */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--neutral-400)] mb-3 block font-medium">
            Livrables inclus
          </span>
          <ul className="space-y-2.5">
            {offer.deliverables.map((deliverable, deliverableIndex) => (
              <motion.li
                key={deliverableIndex}
                className="flex items-start gap-3 text-sm text-[var(--neutral-500)] group/item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + deliverableIndex * 0.05 }}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-colors bg-[var(--electric-blue)]/10 group-hover/item:bg-[var(--electric-blue)]/15">
                  <Check className="h-3 w-3 text-[var(--electric-blue)]" weight="bold" />
                </div>
                <span className="group-hover/item:text-[var(--neutral-600)] transition-colors">
                  {deliverable}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-[oklch(0_0_0_/_6%)] mt-auto">
          <motion.div
            className="text-2xl font-bold text-gradient-hero"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {offer.price}
          </motion.div>
          <CTAButton
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="h-4 w-4" />}
            href="#contact"
          >
            En savoir plus
          </CTAButton>
        </div>
      </div>
    </motion.div>
  );
}

export function Offers() {
  return (
    <AnimatedSection id="offers" className="section-padding bg-[var(--background)]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
            }}
          >
            Nos formules
          </motion.span>
          <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
            Des offres <span className="text-gradient-hero">transparentes</span>
          </h2>
          <p className="text-lg text-[var(--neutral-500)] leading-relaxed">
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
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
              }}
            >
              Services Cloud
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--accent-dark)] mb-4">
              Offres <span className="text-gradient-hero">Architecture Cloud</span>
            </h3>
            <p className="text-[var(--neutral-500)] max-w-2xl mx-auto leading-relaxed">
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
