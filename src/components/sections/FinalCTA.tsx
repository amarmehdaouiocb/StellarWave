"use client";

import { motion } from "framer-motion";
import { CalendarDots, Envelope } from "@phosphor-icons/react";
import { brand } from "@/config/brand";
import { fadeInUp, easings } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      {/* Content */}
      <div className="relative z-10 container-wide">
        <motion.div
          className="relative overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
            borderRadius: "var(--card-radius-2xl)",
            padding: "64px 48px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "var(--shadow-apple-xl)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59, 130, 246, 0.20) 0%, transparent 60%)"
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Editorial Headline */}
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: "1.0",
                letterSpacing: "-0.04em"
              }}
            >
              <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>Prêt à </span>
              <span style={{ color: "white", fontWeight: 600 }}>transformer</span>
              <br />
              <span style={{ color: "white", fontWeight: 600 }}>votre digital</span>
              <span style={{ color: "rgba(255, 255, 255, 0.5)" }}> ?</span>
            </h2>

            {/* Subtext */}
            <p
              className="text-lg lg:text-xl max-w-2xl mx-auto mb-10"
              style={{ color: "rgba(255, 255, 255, 0.6)" }}
            >
              Discutons de votre projet. Premier appel gratuit, sans engagement.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <motion.a
                href={brand.calendlyUrl}
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  borderRadius: "16px",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 12px 32px rgba(59, 130, 246, 0.45)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDots weight="duotone" className="h-5 w-5" />
                Réserver un appel découverte
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  background: "rgba(255, 255, 255, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Envelope weight="duotone" className="h-5 w-5" />
                Demander un devis
              </motion.a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm"
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              <span>Premier appel gratuit</span>
              <span className="hidden sm:inline">•</span>
              <span>Sans engagement</span>
              <span className="hidden sm:inline">•</span>
              <span>Résultats sous 30 jours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
