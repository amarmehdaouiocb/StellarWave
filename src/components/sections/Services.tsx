"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/config/brand";
import { AnimatedSection, AnimatedItem } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export function Services() {
  return (
    <AnimatedSection
      id="services"
      className="section-padding"
    >
      <div className="container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Nos expertises
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Des solutions <span className="text-gradient">sur mesure</span> pour chaque besoin
          </h2>
          <p className="text-lg text-muted-foreground">
            Du prototypage rapide au déploiement en production, nous couvrons
            l&apos;ensemble du cycle de vie de vos produits digitaux.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHighlighted = index === 2; // Highlight Web Apps (middle card)

            return (
              <motion.div
                key={service.id}
                variants={staggerItem}
                className={cn(
                  index === services.length - 1 && services.length % 3 === 2
                    ? "md:col-span-2 lg:col-span-1"
                    : ""
                )}
              >
                <GlassCard
                  className={cn(
                    "h-full flex flex-col",
                    isHighlighted && "border-gradient"
                  )}
                  glow={isHighlighted ? "cyan" : "none"}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl mb-6",
                      isHighlighted
                        ? "aurora-gradient"
                        : "bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-7 w-7",
                        isHighlighted
                          ? "text-primary-foreground"
                          : "text-[var(--aurora-cyan)]"
                      )}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--aurora-cyan)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium",
                      "text-[var(--aurora-cyan)] hover:text-[var(--aurora-violet)]",
                      "transition-colors duration-200 group"
                    )}
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Vous avez un projet en tête ? Discutons-en.
          </p>
          <CTAButton
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
            href="#contact"
          >
            Demander une estimation
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
