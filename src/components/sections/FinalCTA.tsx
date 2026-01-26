"use client";

import { motion } from "framer-motion";
import { CalendarDots, ArrowRight, Envelope } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/shared/CTAButton";
import { brand } from "@/config/brand";
import { fadeInUp, easings } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-32 lg:py-40 bg-[var(--background)]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--neutral-50)] to-[var(--background)]" />

      {/* Content */}
      <div className="relative z-10 container-wide">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Headline - MEGA */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[var(--accent-dark)] mb-8"
            style={{ letterSpacing: "-0.05em", lineHeight: "0.9" }}
          >
            Prêt à{" "}
            <span className="text-gradient-hero">
              transformer
            </span>
            <br />
            votre digital ?
          </h2>

          {/* Subtext */}
          <p className="text-xl lg:text-2xl text-[var(--neutral-500)] max-w-2xl mx-auto mb-12">
            Discutons de votre projet. Premier appel gratuit, sans engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <CTAButton
              variant="primary"
              size="xl"
              href={brand.calendlyUrl}
              icon={<CalendarDots weight="duotone" className="h-6 w-6" />}
            >
              Réserver un appel découverte
            </CTAButton>

            <CTAButton
              variant="secondary"
              size="xl"
              href="#lead-magnet"
              icon={<Envelope weight="duotone" className="h-6 w-6" />}
            >
              Obtenir un audit gratuit
            </CTAButton>
          </div>

          {/* Trust indicators - Light theme */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[var(--neutral-500)]">
            <span>Premier appel gratuit</span>
            <span className="hidden sm:inline">•</span>
            <span>Sans engagement</span>
            <span className="hidden sm:inline">•</span>
            <span>Résultats sous 30 jours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
