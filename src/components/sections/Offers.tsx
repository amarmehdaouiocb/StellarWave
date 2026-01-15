"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Star, ArrowRight, Sparkles, Zap, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { offers, cloudOffers } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { staggerContainer, staggerItemBlur, fadeInUp, easings } from "@/lib/animations";

// Plan icons mapping
const planIcons = [Zap, Star, Building2];

// Pricing card with mouse-follow spotlight effect
function PricingCard({
  offer,
  index,
}: {
  offer: (typeof offers)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Create radial gradient spotlight that follows mouse
  const spotlightBackground = useTransform([x, y], ([latestX, latestY]) => {
    if (!offer.popular) return "transparent";
    return `radial-gradient(400px circle at ${latestX}px ${latestY}px, oklch(0.75 0.15 195 / 10%), transparent 40%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = planIcons[index];

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItemBlur}
      className={cn(
        "relative group",
        offer.popular && "z-10 md:-mt-6 md:mb-6"
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Background glow for popular plan */}
      {offer.popular && (
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[var(--aurora-cyan)] via-[var(--aurora-violet)] to-[var(--aurora-teal)] opacity-50 blur-xl" />
      )}

      <GlassCard
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          offer.popular
            ? "border-gradient shadow-glow-cyan bg-gradient-to-b from-white/[0.08] to-white/[0.02]"
            : "hover:border-white/10"
        )}
        glow={offer.popular ? "cyan" : "none"}
      >
        {/* Mouse-follow spotlight */}
        {offer.popular && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: spotlightBackground }}
          />
        )}

        {/* Popular badge - animated */}
        {offer.popular && (
          <motion.div
            className="absolute -top-px left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-b-xl bg-gradient-to-r from-[var(--aurora-cyan)] via-[var(--aurora-teal)] to-[var(--aurora-violet)] text-sm font-semibold text-white shadow-lg">
              <Sparkles className="h-4 w-4" />
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
                  ? "bg-gradient-to-br from-[var(--aurora-cyan)] to-[var(--aurora-violet)]"
                  : "bg-white/5 group-hover:bg-white/10"
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon
                className={cn(
                  "h-6 w-6",
                  offer.popular ? "text-white" : "text-[var(--aurora-cyan)]"
                )}
              />
            </motion.div>
            <div>
              <h3 className={cn(
                "text-xl font-bold",
                offer.popular ? "text-gradient-hero" : "text-foreground"
              )}>
                {offer.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 text-body-relaxed">
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
                offer.popular ? "text-gradient-hero" : "text-gradient"
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
                className="flex items-start gap-3 text-sm text-muted-foreground group/feature"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
              >
                <motion.div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5",
                    offer.popular
                      ? "bg-[var(--aurora-cyan)]/20"
                      : "bg-white/5 group-hover/feature:bg-[var(--aurora-cyan)]/10"
                  )}
                  whileHover={{ scale: 1.2 }}
                >
                  <Check
                    className={cn(
                      "h-3 w-3",
                      offer.popular
                        ? "text-[var(--aurora-cyan)]"
                        : "text-muted-foreground group-hover/feature:text-[var(--aurora-cyan)]"
                    )}
                  />
                </motion.div>
                <span className="group-hover/feature:text-foreground/80 transition-colors">
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
              offer.popular && "shadow-glow-cyan"
            )}
            icon={<ArrowRight className="h-4 w-4" />}
            href="#contact"
          >
            {offer.cta}
          </CTAButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// Cloud offer card
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
      <GlassCard className="h-full relative overflow-hidden">
        {/* Accent gradient */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 rounded-t-2xl",
            index === 0
              ? "bg-gradient-to-r from-[var(--aurora-cyan)] to-[var(--aurora-teal)]"
              : "bg-gradient-to-r from-[var(--aurora-violet)] to-[var(--aurora-cyan)]"
          )}
        />

        {/* Header */}
        <div className="mb-6">
          <motion.span
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4",
              index === 0
                ? "bg-[var(--aurora-cyan)]/10 text-[var(--aurora-cyan)] border border-[var(--aurora-cyan)]/20"
                : "bg-[var(--aurora-violet)]/10 text-[var(--aurora-violet)] border border-[var(--aurora-violet)]/20"
            )}
            whileHover={{ scale: 1.05 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {offer.duration}
          </motion.span>
          <h4 className="text-xl font-semibold text-foreground mb-1 group-hover:text-gradient transition-all duration-300">
            {offer.title}
          </h4>
          <p
            className={cn(
              "text-sm font-medium",
              index === 0 ? "text-[var(--aurora-cyan)]" : "text-[var(--aurora-violet)]"
            )}
          >
            {offer.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 text-body-relaxed">
          {offer.description}
        </p>

        {/* Deliverables */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 block font-medium">
            Livrables inclus
          </span>
          <ul className="space-y-2.5">
            {offer.deliverables.map((deliverable, deliverableIndex) => (
              <motion.li
                key={deliverableIndex}
                className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + deliverableIndex * 0.05 }}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0 mt-0.5 transition-colors",
                    index === 0
                      ? "bg-[var(--aurora-teal)]/10 group-hover/item:bg-[var(--aurora-teal)]/20"
                      : "bg-[var(--aurora-violet)]/10 group-hover/item:bg-[var(--aurora-violet)]/20"
                  )}
                >
                  <Check
                    className={cn(
                      "h-3 w-3",
                      index === 0 ? "text-[var(--aurora-teal)]" : "text-[var(--aurora-violet)]"
                    )}
                  />
                </div>
                <span className="group-hover/item:text-foreground/80 transition-colors">
                  {deliverable}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
          <motion.div
            className={cn(
              "text-2xl font-bold",
              index === 0 ? "text-gradient" : "text-gradient-hero"
            )}
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
      </GlassCard>
    </motion.div>
  );
}

export function Offers() {
  return (
    <AnimatedSection id="offers" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[var(--aurora-cyan)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[var(--aurora-violet)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass-highlight text-sm font-medium text-muted-foreground mb-6 shadow-premium-sm"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
          >
            Nos formules
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-display">
            Des offres <span className="text-gradient-hero">transparentes</span>
          </h2>
          <p className="text-lg text-muted-foreground text-body-relaxed">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-highlight text-sm font-medium text-muted-foreground mb-6 shadow-premium-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="h-2 w-2 rounded-full bg-[var(--aurora-teal)] animate-pulse" />
              Services Cloud
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-h2">
              Offres <span className="text-gradient-hero">Architecture Cloud</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-body-relaxed">
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
