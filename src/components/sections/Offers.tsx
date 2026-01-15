"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { offers, cloudOffers } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export function Offers() {
  return (
    <AnimatedSection
      id="offers"
      className="section-padding"
    >
      <div className="container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Nos formules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Des offres <span className="text-gradient">transparentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choisissez la formule adaptée à votre projet. Prix fixe, sans surprise.
          </p>
        </motion.div>

        {/* Main offers */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              variants={staggerItem}
              className={cn(
                offer.popular && "md:-mt-4 md:mb-4"
              )}
            >
              <GlassCard
                className={cn(
                  "h-full flex flex-col relative",
                  offer.popular && "border-gradient"
                )}
                glow={offer.popular ? "cyan" : "none"}
              >
                {/* Popular badge */}
                {offer.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full aurora-gradient text-xs font-semibold text-primary-foreground">
                      <Star className="h-3 w-3" />
                      Populaire
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {offer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {offer.description}
                  </p>
                  <div className="text-3xl font-bold text-gradient">
                    {offer.price}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {offer.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="h-5 w-5 text-[var(--aurora-cyan)] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <CTAButton
                  variant={offer.popular ? "primary" : "secondary"}
                  className="w-full"
                  icon={<ArrowRight className="h-4 w-4" />}
                  href="#contact"
                >
                  {offer.cta}
                </CTAButton>
              </GlassCard>
            </motion.div>
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
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Offres <span className="text-gradient">Architecture Cloud</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Audit et optimisation de votre infrastructure cloud.
              Réduisez vos coûts, améliorez la sécurité et les performances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium aurora-gradient text-primary-foreground mb-3">
                      {offer.duration}
                    </span>
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {offer.title}
                    </h4>
                    <p className="text-sm text-[var(--aurora-cyan)]">
                      {offer.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {offer.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                      Livrables inclus
                    </span>
                    <ul className="space-y-2">
                      {offer.deliverables.map((deliverable, deliverableIndex) => (
                        <li
                          key={deliverableIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-[var(--aurora-teal)] flex-shrink-0 mt-0.5" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-2xl font-bold text-gradient">
                      {offer.price}
                    </div>
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
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
