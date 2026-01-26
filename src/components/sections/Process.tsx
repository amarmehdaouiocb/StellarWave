"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, MagnifyingGlass, Palette, Code, RocketLaunch } from "@phosphor-icons/react";
import MagnifierIcon from "@/components/ui/magnifier-icon";
import PaletteIcon from "@/components/ui/palette-icon";
import CodeIcon from "@/components/ui/code-icon";
import RocketIcon from "@/components/ui/rocket-icon";
import { cn } from "@/lib/utils";
import { processSteps } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp, easings } from "@/lib/animations";

// Step icons mapping
const stepIcons = [MagnifyingGlass, Palette, Code, RocketLaunch];
const stepAnimatedIcons = [MagnifierIcon, PaletteIcon, CodeIcon, RocketIcon];

// Step icon component
function StepIcon({ index }: { index: number }) {
  const Icon = stepIcons[index];
  const AnimatedIconComponent = stepAnimatedIcons[index];

  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--electric-blue)] mb-6"
    >
      {AnimatedIconComponent ? (
        <AnimatedIconComponent size={24} color="white" />
      ) : (
        <Icon weight="duotone" className="h-6 w-6 text-white" />
      )}
    </div>
  );
}

// Process step card - Light theme
function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: easings.smooth,
      }}
    >
      {/* Step icon */}
      <StepIcon index={index} />

      {/* Card */}
      <div
        className={cn(
          "bg-white rounded-3xl p-8",
          "border border-[oklch(0_0_0_/_6%)]",
          "transition-all duration-300",
          "hover:border-[var(--electric-blue)]/20",
          "group"
        )}
        style={{
          boxShadow: "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
      >
        {/* Duration badge */}
        <span
          className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--electric-blue)]/5 text-[var(--electric-blue)] mb-4 border border-[var(--electric-blue)]/10"
        >
          {step.duration}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-[var(--accent-dark)] mb-3 group-hover:text-[var(--electric-blue)] transition-colors duration-300">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-[var(--neutral-500)] mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Deliverables */}
        <div className="border-t border-[oklch(0_0_0_/_8%)] pt-4 mt-auto">
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--neutral-400)] mb-3 block font-medium">
            Livrables
          </span>
          <ul className="space-y-2.5">
            {step.deliverables.map((deliverable, deliverableIndex) => (
              <motion.li
                key={deliverableIndex}
                className="flex items-center gap-3 text-sm text-[var(--neutral-500)] group/item"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.4 + deliverableIndex * 0.1 }}
              >
                <motion.div
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--electric-blue)]/10 group-hover/item:bg-[var(--electric-blue)]/20 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <CheckCircle weight="duotone" className="h-3 w-3 text-[var(--electric-blue)]" />
                </motion.div>
                <span className="group-hover/item:text-[var(--neutral-600)] transition-colors">
                  {deliverable}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <AnimatedSection id="process" className="section-padding bg-[var(--background)]">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
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
            Notre méthode
          </motion.span>
          <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
            Un process <span className="text-gradient-hero">éprouvé</span>
          </h2>
          <p className="text-lg text-[var(--neutral-500)] leading-relaxed">
            Une méthodologie structurée pour des projets livrés à temps, dans le
            budget, avec la qualité attendue.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.step} step={step} index={index} />
            ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20 p-8 md:p-10 rounded-3xl bg-white border border-[oklch(0_0_0_/_8%)] relative overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            boxShadow: "0 4px 12px oklch(0.2 0.01 250 / 5%), 0 16px 48px oklch(0.2 0.01 250 / 8%)",
          }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--electric-blue)]/3 via-transparent to-[var(--electric-blue)]/3" />

          <div className="relative z-10">
            <p className="text-lg md:text-xl text-[var(--accent-dark)] mb-2 font-medium">
              Prêt à démarrer votre projet ?
            </p>
            <p className="text-[var(--neutral-500)] mb-8 max-w-md mx-auto">
              Réservez un appel découverte de 30 minutes pour discuter de vos
              besoins.
            </p>
            <motion.a
              href="#contact"
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-2xl",
                "bg-[var(--electric-blue)]",
                "text-white font-semibold text-lg",
                "transition-all duration-300"
              )}
              style={{
                boxShadow: "0 4px 12px oklch(0.55 0.25 255 / 20%)",
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "0 8px 24px oklch(0.55 0.25 255 / 30%)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <RocketIcon size={20} color="white" />
              Commencer maintenant
            </motion.a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
