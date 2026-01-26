"use client";

import { motion } from "framer-motion";
import { CalendarDots, ArrowRight, Envelope } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/shared/CTAButton";
import { brand } from "@/config/brand";
import { fadeInUp } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.01_60)] via-background to-background" />

        {/* Aurora glow - centered */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px]"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.79 0.12 85 / 12%) 0%, transparent 70%)",
              "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.705 0.14 47 / 10%) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.79 0.12 85 / 12%) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Accent glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--ember-amber)] opacity-[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--ember-coral)] opacity-[0.04] blur-[150px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide lg:pl-64">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Headline - Énorme */}
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-8"
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
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Discutons de votre projet. Premier appel gratuit, sans engagement.
          </p>

          {/* CTA Buttons - Même CTA principal qu'en hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <CTAButton
              variant="primary"
              size="xl"
              href={brand.calendlyUrl}
              icon={<CalendarDots weight="duotone" className="h-6 w-6" />}
              className="shadow-glow-amber"
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

          {/* Trust indicators - Objection killers agrandis */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
              <div className="w-3 h-3 rounded-full bg-[var(--ember-teal)] animate-pulse" />
              <span className="text-foreground font-medium">Premier appel gratuit</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
              <div className="w-3 h-3 rounded-full bg-[var(--ember-teal)] animate-pulse" />
              <span className="text-foreground font-medium">Sans engagement</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
              <div className="w-3 h-3 rounded-full bg-[var(--ember-teal)] animate-pulse" />
              <span className="text-foreground font-medium">Résultats sous 30 jours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
