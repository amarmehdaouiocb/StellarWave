"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, Search, Palette, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { fadeInUp, easings, staggerItemBlur } from "@/lib/animations";

// Step icons mapping
const stepIcons = [Search, Palette, Code2, Rocket];

// Animated step number with glow effect
function StepNumber({
  number,
  isActive,
  index,
}: {
  number: string;
  isActive: boolean;
  index: number;
}) {
  const Icon = stepIcons[index];

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      {/* Outer glow ring - animated */}
      <motion.div
        className="absolute -inset-3 rounded-full"
        style={{
          background: `conic-gradient(from ${index * 90}deg, var(--aurora-cyan), var(--aurora-violet), var(--aurora-teal), var(--aurora-cyan))`,
        }}
        animate={{
          rotate: [0, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Inner background */}
      <div className="absolute -inset-2 rounded-full bg-background" />

      {/* Main circle with gradient */}
      <motion.div
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-full",
          "bg-gradient-to-br from-[var(--aurora-cyan)] via-[var(--aurora-teal)] to-[var(--aurora-violet)]",
          "shadow-glow-cyan"
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Icon or number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>

        {/* Step number badge */}
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-foreground border border-white/10">
          {number}
        </div>
      </motion.div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[var(--aurora-cyan)]"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5,
        }}
      />
    </motion.div>
  );
}

// Animated timeline line
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden lg:block absolute top-[52px] left-0 right-0 h-1">
      {/* Background line */}
      <div className="absolute inset-0 bg-white/5 rounded-full" />

      {/* Animated gradient line */}
      <motion.div
        className="absolute inset-0 rounded-full origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--aurora-cyan), var(--aurora-violet), var(--aurora-teal), var(--aurora-cyan))",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-sm"
        style={{
          scaleX,
          background: "var(--aurora-cyan)",
          opacity: 0.5,
        }}
      />

      {/* Moving dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-glow-cyan"
        style={{
          left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        }}
      />
    </div>
  );
}

// Vertical timeline for mobile
function VerticalTimeline({ totalSteps }: { totalSteps: number }) {
  return (
    <div className="lg:hidden absolute left-8 top-16 bottom-16 w-0.5">
      <div className="h-full w-full bg-gradient-to-b from-[var(--aurora-cyan)] via-[var(--aurora-violet)] to-[var(--aurora-teal)] rounded-full" />

      {/* Animated glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-20 rounded-full"
        style={{
          background: "linear-gradient(to bottom, var(--aurora-cyan), transparent)",
          filter: "blur(8px)",
        }}
        animate={{ y: ["0%", "400%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Process step card
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
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: easings.smooth,
      }}
    >
      {/* Step number - absolute positioned on desktop */}
      <div className="relative z-10 mb-6 flex justify-center lg:justify-start">
        <StepNumber number={`0${index + 1}`} isActive={isInView} index={index} />
      </div>

      {/* Card */}
      <GlassCard className="h-full group" hover>
        {/* Duration badge */}
        <motion.span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-muted-foreground mb-4 border border-white/5"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--aurora-cyan)] animate-pulse" />
          {step.duration}
        </motion.span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 text-body-relaxed">
          {step.description}
        </p>

        {/* Deliverables */}
        <div className="border-t border-white/5 pt-4 mt-auto">
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 block font-medium">
            Livrables
          </span>
          <ul className="space-y-2.5">
            {step.deliverables.map((deliverable, deliverableIndex) => (
              <motion.li
                key={deliverableIndex}
                className="flex items-center gap-3 text-sm text-muted-foreground group/item"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + 0.4 + deliverableIndex * 0.1 }}
              >
                <motion.div
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--aurora-cyan)]/10 group-hover/item:bg-[var(--aurora-cyan)]/20 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Check className="h-3 w-3 text-[var(--aurora-cyan)]" />
                </motion.div>
                <span className="group-hover/item:text-foreground/80 transition-colors">
                  {deliverable}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Process() {
  return (
    <AnimatedSection id="process" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--aurora-teal)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--aurora-violet)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass-highlight text-sm font-medium text-muted-foreground mb-6 shadow-premium-sm"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
          >
            Notre méthode
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-display">
            Un process <span className="text-gradient-hero">éprouvé</span>
          </h2>
          <p className="text-lg text-muted-foreground text-body-relaxed">
            Une méthodologie structurée pour des projets livrés à temps, dans le
            budget, avec la qualité attendue.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal timeline line - desktop */}
          <TimelineLine />

          {/* Vertical timeline - mobile */}
          <VerticalTimeline totalSteps={processSteps.length} />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pl-16 lg:pl-0">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20 p-8 md:p-10 rounded-3xl glass-highlight border border-white/5 relative overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--aurora-cyan)]/5 via-transparent to-[var(--aurora-violet)]/5" />

          <div className="relative z-10">
            <p className="text-lg md:text-xl text-foreground mb-2 font-medium">
              Prêt à démarrer votre projet ?
            </p>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Réservez un appel découverte de 30 minutes pour discuter de vos
              besoins.
            </p>
            <motion.a
              href="#contact"
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-2xl",
                "bg-gradient-to-r from-[var(--aurora-cyan)] via-[var(--aurora-teal)] to-[var(--aurora-violet)]",
                "text-white font-semibold text-lg",
                "shadow-glow-cyan",
                "transition-all duration-300"
              )}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Rocket className="h-5 w-5" />
              Commencer maintenant
            </motion.a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
