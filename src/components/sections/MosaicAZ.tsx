"use client";

import { motion } from "framer-motion";
import { CheckCircle, Lightning, Gauge, Globe, Code, Palette } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Performance metrics for the "assessment" card
const performanceMetrics = [
  { label: "Core Web Vitals", status: "passed", icon: Gauge },
  { label: "SEO Score", value: "98/100", icon: Globe },
  { label: "Accessibility", status: "AAA", icon: CheckCircle },
  { label: "Performance", value: "100", icon: Lightning },
];

// Service chips for the small cards
const serviceChips = [
  "React", "Next.js", "TypeScript", "Tailwind",
  "Framer Motion", "Vercel", "AWS", "Supabase"
];

const designChips = [
  "UI/UX", "Figma", "Design System", "Prototyping",
  "Motion Design", "Brand Identity"
];

export function MosaicAZ() {
  return (
    <AnimatedSection
      id="mosaic"
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--power-blue)] opacity-[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--power-yellow)] opacity-[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--power-blue)] text-white text-xs font-semibold uppercase tracking-wider mb-6">
            <Lightning weight="fill" className="h-3.5 w-3.5" />
            Expertise complète
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground text-display-heavy mb-4">
            Le digital de{" "}
            <span className="text-gradient-hero">A à Z</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche holistique pour des résultats mesurables
          </p>
        </motion.div>

        {/* Main mosaic grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Large Power Card - Electric Blue */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "relative p-8 lg:p-10 rounded-[28px] overflow-hidden",
              "bg-[var(--power-blue)] text-white",
              "hover-lift transition-all duration-500",
              "min-h-[320px] flex flex-col justify-between"
            )}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10">
              <Code weight="duotone" className="h-12 w-12 mb-6 opacity-80" />
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 text-display-heavy" style={{ letterSpacing: "-0.03em" }}>
                Développement
                <br />
                sur-mesure
              </h3>
              <p className="text-white/80 text-lg max-w-sm">
                Applications web & mobile performantes, scalables, et maintenables.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3 mt-6">
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                Landing Pages
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                Apps Web
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                SaaS
              </span>
            </div>

            {/* Glow effect */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Assessment Card - Neutral/Light */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "relative p-8 lg:p-10 rounded-[28px] overflow-hidden",
              "bg-[var(--neutral-50)] text-[var(--neutral-900)]",
              "hover-lift transition-all duration-500",
              "min-h-[320px]"
            )}
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle weight="fill" className="h-3.5 w-3.5" />
                All Tests Passed
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-display-heavy" style={{ letterSpacing: "-0.02em" }}>
              Performance
              <br />
              garantie
            </h3>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <Icon weight="duotone" className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--neutral-800)]/60 uppercase tracking-wide">
                        {metric.label}
                      </div>
                      <div className="font-semibold text-green-600">
                        {metric.value || metric.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Secondary row - smaller cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Tech Stack Card */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "relative p-6 lg:p-8 rounded-[28px] overflow-hidden",
              "glass-card border border-white/10",
              "hover-lift transition-all duration-500"
            )}
          >
            <Code weight="duotone" className="h-8 w-8 text-[var(--ember-amber)] mb-4" />
            <h4 className="text-xl font-bold text-foreground mb-4">Stack technique</h4>
            <div className="flex flex-wrap gap-2">
              {serviceChips.map((chip, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Design Card - Yellow accent */}
          <motion.div
            variants={staggerItem}
            className={cn(
              "relative p-6 lg:p-8 rounded-[28px] overflow-hidden",
              "bg-[var(--power-yellow)] text-[var(--neutral-900)]",
              "hover-lift transition-all duration-500"
            )}
          >
            <Palette weight="duotone" className="h-8 w-8 opacity-70 mb-4" />
            <h4 className="text-xl font-bold mb-4">Design & UX</h4>
            <div className="flex flex-wrap gap-2">
              {designChips.map((chip, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-black/10 text-sm font-medium"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default MosaicAZ;
