"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const stepIcons = ["01", "02", "03", "04"];

export function Process() {
  return (
    <AnimatedSection
      id="process"
      className="section-padding"
    >
      <div className="container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Notre méthode
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Un process <span className="text-gradient">éprouvé</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Une méthodologie structurée pour des projets livrés à temps,
            dans le budget, avec la qualité attendue.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--aurora-cyan)] via-[var(--aurora-violet)] to-[var(--aurora-teal)]" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="relative"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-6">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center",
                      "h-16 w-16 rounded-2xl",
                      "aurora-gradient",
                      "text-2xl font-bold text-primary-foreground"
                    )}
                  >
                    {stepIcons[index]}
                  </div>
                </div>

                {/* Card */}
                <GlassCard className="h-full">
                  {/* Duration */}
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted-foreground mb-4">
                    {step.duration}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="border-t border-white/5 pt-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                      Livrables
                    </span>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <li
                          key={deliverableIndex}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-[var(--aurora-cyan)]" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>

                {/* Mobile connector line */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden absolute left-8 bottom-0 translate-y-full w-0.5 h-6 bg-gradient-to-b from-[var(--aurora-cyan)] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 p-8 rounded-2xl glass"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground mb-2">
            Prêt à démarrer votre projet ?
          </p>
          <p className="text-muted-foreground mb-6">
            Réservez un appel découverte de 30 minutes pour discuter de vos besoins.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl aurora-gradient text-primary-foreground font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Commencer maintenant
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
