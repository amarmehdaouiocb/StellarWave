"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";
import MagnifierIcon from "@/components/ui/magnifier-icon";
import CodeIcon from "@/components/ui/code-icon";
import RocketIcon from "@/components/ui/rocket-icon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp, easings } from "@/lib/animations";

// Simplified 3-step process
const steps = [
  {
    step: 1,
    title: "Discovery & Design",
    duration: "1-3 semaines",
    description: "Compréhension de vos enjeux, maquettes haute fidélité, prototype validé.",
    deliverables: ["Brief validé", "Maquettes Figma", "Roadmap"],
    Icon: MagnifierIcon,
  },
  {
    step: 2,
    title: "Build",
    duration: "4-12 semaines",
    description: "Développement itératif avec démos hebdomadaires. Qualité industrielle garantie.",
    deliverables: ["Code source", "Tests automatisés", "Documentation"],
    Icon: CodeIcon,
  },
  {
    step: 3,
    title: "Launch & Support",
    duration: "1-2 semaines",
    description: "Déploiement progressif, monitoring, optimisations et accompagnement continu.",
    deliverables: ["Mise en production", "Formation", "Support 3 mois"],
    Icon: RocketIcon,
  },
];

function ProcessCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.Icon;
  const isDark = index === 1; // Middle card is dark

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
        className="absolute -top-5 left-6 text-[4rem] font-bold pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          lineHeight: "1",
          color: isDark ? "rgba(255,255,255,0.08)" : "rgba(17,17,17,0.04)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Card */}
      <div
        className="relative overflow-hidden h-full"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
            : "white",
          borderRadius: "var(--card-radius-xl)",
          padding: "32px",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "var(--shadow-apple-lg)",
        }}
      >
        {/* Dark card inner glow */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
            style={{
              background: isDark
                ? "rgba(59, 130, 246, 0.20)"
                : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            <Icon size={22} color="white" />
          </div>

          {/* Duration badge */}
          <span
            className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{
              background: isDark ? "rgba(255,255,255,0.10)" : "rgba(59, 130, 246, 0.08)",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(59, 130, 246, 0.15)",
              color: isDark ? "white" : "#3b82f6",
            }}
          >
            {step.duration}
          </span>

          {/* Title */}
          <h3
            className="text-xl font-semibold mb-3"
            style={{ color: isDark ? "white" : "#111111" }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p
            className="mb-6 text-sm leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(17,17,17,0.6)" }}
          >
            {step.description}
          </p>

          {/* Deliverables */}
          <div
            className="pt-4"
            style={{
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(17,17,17,0.08)",
            }}
          >
            <span
              className="text-xs uppercase tracking-wider mb-3 block font-medium"
              style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(17,17,17,0.4)" }}
            >
              Livrables
            </span>
            <ul className="space-y-2">
              {step.deliverables.map((deliverable, deliverableIndex) => (
                <motion.li
                  key={deliverableIndex}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: isDark ? "rgba(255,255,255,0.8)" : "rgba(17,17,17,0.6)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.4 + deliverableIndex * 0.1 }}
                >
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      background: isDark
                        ? "rgba(59, 130, 246, 0.25)"
                        : "rgba(59, 130, 246, 0.12)",
                    }}
                  >
                    <CheckCircle
                      weight="duotone"
                      className="h-2.5 w-2.5"
                      style={{ color: isDark ? "rgba(59, 130, 246, 0.9)" : "#3b82f6" }}
                    />
                  </div>
                  <span>{deliverable}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Connector line (between cards on desktop) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[rgba(59,130,246,0.3)] to-transparent" />
      )}
    </motion.div>
  );
}

export function ProcessSimple() {
  return (
    <AnimatedSection
      id="process"
      className="section-padding"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
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
              color: "rgba(17, 17, 17, 0.6)",
            }}
          >
            Notre méthode
          </motion.span>

          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>3 étapes </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>vers le succès</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Une méthodologie éprouvée pour des projets livrés à temps, dans le budget.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <ProcessCard key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default ProcessSimple;
