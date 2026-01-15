"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
} from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import SparklesIcon from "@/components/ui/sparkles-icon";
import { cn } from "@/lib/utils";
import { services, type IconName } from "@/config/brand";

// Icon map for looking up Phosphor icons by name
const iconMap: Record<string, React.ElementType> = {
  RocketLaunch,
  Globe,
  Stack,
  DeviceMobile,
  Cloud,
};
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  staggerContainer,
  staggerItemBlur,
  fadeInUp,
  easings,
  cardHover,
} from "@/lib/animations";

// Animated icon component with hover effects
function AnimatedIcon({
  icon: Icon,
  isHighlighted,
  className,
}: {
  icon: React.ElementType;
  isHighlighted?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-2xl overflow-hidden",
        "transition-all duration-500",
        isHighlighted
          ? "bg-gradient-to-br from-[var(--ember-amber)] via-[var(--ember-coral)] to-[var(--ember-rose)]"
          : "bg-white/5 group-hover:bg-white/10",
        className
      )}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Shimmer effect on highlighted */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      )}
      <Icon
        weight="duotone"
        className={cn(
          "h-7 w-7 relative z-10 transition-all duration-300",
          isHighlighted
            ? "text-white"
            : "text-[var(--ember-amber)] group-hover:text-[var(--ember-coral)] group-hover:scale-110"
        )}
      />
    </motion.div>
  );
}

// Background pattern component for variety
function CardPattern({
  variant,
  className,
}: {
  variant: "dots" | "grid" | "diagonal" | "circles" | "none";
  className?: string;
}) {
  const patterns = {
    dots: (
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(1 0 0) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    ),
    grid: (
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0 / 10%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 10%) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    ),
    diagonal: (
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            oklch(1 0 0 / 8%),
            oklch(1 0 0 / 8%) 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />
    ),
    circles: (
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, oklch(1 0 0 / 15%) 0%, transparent 50%)`,
          backgroundSize: "60px 60px",
        }}
      />
    ),
    none: null,
  };

  return <div className={cn("pointer-events-none", className)}>{patterns[variant]}</div>;
}

// Service card with mouse-follow glow
function ServiceCard({
  service,
  index,
  isHighlighted,
  pattern,
  className,
}: {
  service: (typeof services)[number];
  index: number;
  isHighlighted: boolean;
  pattern: "dots" | "grid" | "diagonal" | "circles" | "none";
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Create radial gradient that follows mouse
  const background = useTransform([x, y], ([latestX, latestY]) => {
    if (!isHighlighted) return "transparent";
    return `radial-gradient(600px circle at ${latestX}px ${latestY}px, oklch(0.79 0.16 85 / 8%), transparent 40%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = iconMap[service.iconName] || RocketLaunch;

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItemBlur}
      className={cn("group relative", className)}
      onMouseMove={handleMouseMove}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <GlassCard
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          isHighlighted && "border-gradient shadow-glow-amber"
        )}
        glow={isHighlighted ? "cyan" : "none"}
      >
        {/* Background pattern */}
        <CardPattern variant={pattern} />

        {/* Mouse-follow glow for highlighted card */}
        {isHighlighted && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background }}
          />
        )}

        {/* Accent corner for highlighted card */}
        {isHighlighted && (
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[var(--ember-amber)]/20 to-transparent rounded-full blur-3xl" />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with icon and badge */}
          <div className="flex items-start justify-between mb-6">
            <AnimatedIcon icon={Icon} isHighlighted={isHighlighted} />
            {isHighlighted && (
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ember-amber)]/10 border border-[var(--ember-amber)]/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SparklesIcon size={14} className="text-[var(--ember-amber)]" />
                <span className="text-xs font-medium text-[var(--ember-amber)]">
                  Populaire
                </span>
              </motion.div>
            )}
          </div>

          {/* Title with gradient on highlighted */}
          <h3
            className={cn(
              "text-xl font-semibold mb-3 transition-colors duration-300",
              isHighlighted
                ? "text-gradient-hero"
                : "text-foreground group-hover:text-[var(--ember-amber)]"
            )}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 flex-grow text-body-relaxed">
            {service.description}
          </p>

          {/* Features with animated bullets */}
          <ul className="space-y-2.5 mb-6">
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: featureIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full flex-shrink-0",
                    isHighlighted
                      ? "bg-[var(--ember-amber)]"
                      : "bg-muted-foreground/50 group-hover:bg-[var(--ember-amber)]"
                  )}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
                <span className="group-hover:text-foreground/80 transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA with enhanced animation */}
          <motion.a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium mt-auto",
              "transition-all duration-300",
              isHighlighted
                ? "text-[var(--ember-amber)]"
                : "text-muted-foreground hover:text-[var(--ember-amber)]"
            )}
            whileHover={{ x: 4 }}
          >
            {service.cta}
            <ArrowNarrowRightIcon size={16} />
          </motion.a>
        </div>
      </GlassCard>

      {/* Connection lines (visible only on large screens) */}
      {index < services.length - 1 && index !== 2 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" />
      )}
    </motion.div>
  );
}

export function Services() {
  // Pattern assignments for variety
  const patterns: ("dots" | "grid" | "diagonal" | "circles" | "none")[] = [
    "dots",
    "grid",
    "none", // Highlighted card gets subtle treatment
    "diagonal",
    "circles",
  ];

  return (
    <AnimatedSection id="services" className="section-padding relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--ember-amber)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[var(--ember-coral)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Header with enhanced styling */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
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
            Nos expertises
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-display">
            Des solutions{" "}
            <span className="text-gradient-hero">sur mesure</span> pour
            chaque besoin
          </h2>
          <p className="text-lg text-muted-foreground text-body-relaxed">
            Du prototypage rapide au déploiement en production, nous couvrons
            l&apos;ensemble du cycle de vie de vos produits digitaux.
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const isHighlighted = index === 2; // Web Apps is highlighted

            // Bento layout: highlighted card spans 2 columns on large screens
            const gridClass = isHighlighted
              ? "md:col-span-2 lg:col-span-2 lg:row-span-1"
              : "";

            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isHighlighted={isHighlighted}
                pattern={patterns[index]}
                className={gridClass}
              />
            );
          })}
        </motion.div>

        {/* Bottom CTA with enhanced styling */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6 text-body">
            Vous avez un projet en tête ? Discutons-en.
          </p>
          <CTAButton
            variant="primary"
            size="lg"
            icon={<ArrowNarrowRightIcon size={20} />}
            href="#contact"
            className="shadow-glow-amber"
          >
            Demander une estimation
          </CTAButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
