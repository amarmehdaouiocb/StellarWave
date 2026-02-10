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

// Process step card - Apple-like XL cards with alternating styles
function ProcessCard({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = stepIcons[index];
  const AnimatedIconComponent = stepAnimatedIcons[index];

  // Alternate: cards 1 and 3 are dark, 0 and 2 are light
  const isDark = index === 1 || index === 3;

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
      className="relative"
    >
      {/* Step number - Big editorial */}
      <div
        className="absolute -top-6 left-8 text-[5rem] font-bold pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          lineHeight: "1",
          color: isDark ? "rgba(255,255,255,0.08)" : "rgba(17,17,17,0.04)"
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Card */}
      <div
        className="relative overflow-hidden group"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
            : "white",
          borderRadius: "var(--card-radius-xl)",
          padding: "36px",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "var(--shadow-apple-lg)",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
        }}
      >
        {/* Dark card inner glow */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)"
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6"
            style={{
              background: isDark
                ? "rgba(99, 102, 241, 0.20)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }}
          >
            {AnimatedIconComponent ? (
              <AnimatedIconComponent size={24} color="white" />
            ) : (
              <Icon weight="duotone" className="h-6 w-6 text-white" />
            )}
          </div>

          {/* Duration badge - Glass style */}
          <span
            className="inline-flex px-4 py-2 rounded-full text-xs font-medium mb-5"
            style={{
              background: isDark ? "rgba(255,255,255,0.10)" : "rgba(102, 126, 234, 0.08)",
              backdropFilter: isDark ? "blur(20px)" : "none",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(102, 126, 234, 0.15)",
              color: isDark ? "white" : "#667eea"
            }}
          >
            {step.duration}
          </span>

          {/* Title */}
          <h3
            className="text-2xl font-semibold mb-4 transition-colors duration-300"
            style={{ color: isDark ? "white" : "#111111" }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p
            className="mb-8 leading-relaxed text-[15px]"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(17,17,17,0.6)" }}
          >
            {step.description}
          </p>

          {/* Deliverables */}
          <div
            className="pt-5 mt-auto"
            style={{
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(17,17,17,0.08)"
            }}
          >
            <span
              className="text-xs uppercase tracking-[0.15em] mb-4 block font-medium"
              style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(17,17,17,0.4)" }}
            >
              Livrables
            </span>
            <ul className="space-y-3">
              {step.deliverables.map((deliverable, deliverableIndex) => (
                <motion.li
                  key={deliverableIndex}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.6)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.4 + deliverableIndex * 0.1 }}
                >
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      background: isDark
                        ? "rgba(99, 102, 241, 0.25)"
                        : "rgba(102, 126, 234, 0.12)"
                    }}
                  >
                    <CheckCircle
                      weight="duotone"
                      className="h-3 w-3"
                      style={{ color: isDark ? "rgba(99, 102, 241, 0.9)" : "#667eea" }}
                    />
                  </div>
                  <span>{deliverable}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <AnimatedSection
      id="process"
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
            Notre méthode
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
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Un process </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>éprouvé</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
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

        {/* Bottom CTA - Dark card style */}
        <motion.div
          className="text-center mt-20 relative overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
            borderRadius: "var(--card-radius-2xl)",
            padding: "48px 36px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "var(--shadow-apple-xl)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)"
            }}
          />

          <div className="relative z-10">
            <p
              className="text-xl md:text-2xl mb-3 font-semibold"
              style={{ color: "white" }}
            >
              Prêt à démarrer votre projet ?
            </p>
            <p
              className="mb-10 max-w-md mx-auto"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Réservez un appel découverte de 30 minutes pour discuter de vos
              besoins.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "16px",
                color: "white",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "0 12px 32px rgba(102, 126, 234, 0.45)",
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
