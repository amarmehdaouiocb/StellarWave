"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendUp, Clock, Users, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/shared/CTAButton";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Case study metrics
const metrics = [
  {
    icon: TrendUp,
    value: "+340%",
    label: "Conversion",
    color: "text-green-400",
  },
  {
    icon: Clock,
    value: "0.8s",
    label: "Load Time",
    color: "text-[var(--power-blue-light)]",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Utilisateurs/mois",
    color: "text-[var(--ember-amber)]",
  },
];

// Client logos (placeholders)
const clientLogos = [
  "TechCorp",
  "InnovateLab",
  "DigitalFirst",
  "CloudScale",
];

export function FullBleedCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for mockup
  const mockupY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section
      ref={containerRef}
      id="case-study"
      className="relative min-h-screen flex items-center overflow-hidden py-20 lg:py-0"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.09_0.015_255)] to-background" />

        {/* Aurora glow */}
        <motion.div
          className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[var(--power-blue)] opacity-[0.06] blur-[200px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.08, 0.06],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[var(--ember-amber)] opacity-[0.04] blur-[150px] rounded-full" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(1 0 0 / 8%) 1px, transparent 1px),
              linear-gradient(90deg, oklch(1 0 0 / 8%) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide lg:pl-64 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Eyebrow */}
            <motion.span
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8"
            >
              Case Study
            </motion.span>

            {/* Headline */}
            <motion.h2
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground mb-6"
              style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}
            >
              Des résultats{" "}
              <span className="text-gradient-hero">mesurables</span>,
              <br />
              pas des promesses.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={staggerItem}
              className="text-lg lg:text-xl text-muted-foreground max-w-lg mb-10"
            >
              Notre approche data-driven génère des résultats concrets.
              Performance, conversion, satisfaction utilisateur.
            </motion.p>

            {/* Metrics */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-6 mb-10"
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                      <Icon weight="duotone" className={cn("h-6 w-6", metric.color)} />
                    </div>
                    <div>
                      <div className={cn("text-2xl font-bold", metric.color)}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div variants={staggerItem}>
              <CTAButton
                variant="primary"
                size="lg"
                href="#projets"
                icon={<ArrowRight weight="bold" className="h-5 w-5" />}
              >
                Voir nos réalisations
              </CTAButton>
            </motion.div>

            {/* Client logos */}
            <motion.div
              variants={staggerItem}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Ils nous font confiance
              </p>
              <div className="flex flex-wrap gap-6">
                {clientLogos.map((logo, index) => (
                  <span
                    key={index}
                    className="text-sm font-medium text-muted-foreground/60"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating Mockup */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mockup container */}
            <motion.div
              className="relative w-full max-w-[500px] aspect-[4/3]"
              style={{
                y: mockupY,
                rotateY: mockupRotate,
              }}
            >
              {/* Shadow layer */}
              <div className="absolute inset-0 translate-y-8 scale-95 bg-black/40 rounded-3xl blur-3xl" />

              {/* Main mockup */}
              <div
                className={cn(
                  "relative w-full h-full rounded-3xl overflow-hidden",
                  "bg-gradient-to-br from-[var(--neutral-100)] to-[var(--neutral-200)]",
                  "border border-white/20",
                  "shadow-2xl"
                )}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/80 border-b border-black/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 rounded-md bg-black/5 flex items-center px-3">
                      <span className="text-xs text-black/40">client-website.com</span>
                    </div>
                  </div>
                </div>

                {/* Page content placeholder */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-24 h-6 rounded bg-black/10" />
                    <div className="flex gap-2">
                      <div className="w-16 h-6 rounded bg-black/5" />
                      <div className="w-16 h-6 rounded bg-black/5" />
                    </div>
                  </div>

                  {/* Hero mockup */}
                  <div className="h-32 rounded-xl bg-gradient-to-br from-[var(--power-blue)] to-[var(--power-blue-dark)] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-4 rounded bg-white/30 mx-auto mb-2" />
                      <div className="w-20 h-3 rounded bg-white/20 mx-auto" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 rounded-lg bg-black/5">
                        <div className="w-8 h-4 rounded bg-[var(--ember-amber)]/30 mb-2" />
                        <div className="w-12 h-2 rounded bg-black/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-bold shadow-lg"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                +340% Conv.
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FullBleedCaseStudy;
