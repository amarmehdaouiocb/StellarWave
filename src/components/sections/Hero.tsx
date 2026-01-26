"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDots, ArrowDown } from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import { cn } from "@/lib/utils";
import { brand, heroMetrics, heroSlides, heroTrustBadges, trustedLogos } from "@/config/brand";
import { Check, ShieldCheck, Lightning, Star } from "@phosphor-icons/react";
import { CTAButton } from "@/components/shared/CTAButton";
import { easings } from "@/lib/animations";

// Animated counter component for KPIs
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
          if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
          }

          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(numericValue * eased);
            const prefix = value.match(/^[^0-9]+/)?.[0] || "";
            const originalSuffix = value.match(/[^0-9]+$/)?.[0] || "";
            setDisplayValue(`${prefix}${current}${originalSuffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <div ref={ref}>{displayValue}{suffix}</div>;
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[var(--background)]"
    >
      {/* Background - Clean light gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.003_250)] via-white to-[oklch(0.985_0.003_250)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* MEGA Title - Monumentale */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
            className="mb-6"
          >
            {/* Eyebrow badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 6%)",
              }}
            >
              <span className="text-sm font-medium text-[var(--neutral-600)]">
                {brand.tagline}
              </span>
            </motion.div>

            {/* MEGA Title */}
            <h1 className="text-mega text-[var(--accent-dark)] leading-[0.85] tracking-[-0.05em] mb-4">
              <span className="block">STELLAR</span>
              <span className="block text-gradient-hero">WAVE</span>
            </h1>

            {/* Subtitle - Under the MEGA title */}
            <motion.p
              className="text-xl sm:text-2xl lg:text-3xl font-light text-[var(--neutral-500)] max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {slide.subtitle}
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CTAButton
              variant="primary"
              size="lg"
              icon={<CalendarDots weight="duotone" className="h-5 w-5" />}
              href={brand.calendlyUrl}
            >
              Réserver un appel découverte
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="lg"
              icon={<ArrowNarrowRightIcon size={20} />}
              href="#lead-magnet"
            >
              Obtenir un audit gratuit
            </CTAButton>
          </motion.div>

          {/* Trust badges - Clean light style */}
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {heroTrustBadges.map((badge, index) => {
              const IconComponent = badge.icon === "Check" ? Check : badge.icon === "ShieldCheck" ? ShieldCheck : Lightning;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-[var(--neutral-500)]"
                >
                  <IconComponent className="h-4 w-4 text-[var(--electric-blue)]" weight="bold" />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Social Proof - Light card */}
          <motion.div
            className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[oklch(0_0_0_/_8%)] mb-12 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              boxShadow: "0 4px 12px oklch(0.2 0.01 250 / 5%), 0 16px 48px oklch(0.2 0.01 250 / 8%)",
            }}
          >
            <div className="flex -space-x-2">
              {trustedLogos.slice(0, 3).map((logo, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-[var(--electric-blue)] flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    boxShadow: "0 2px 8px oklch(0.55 0.25 255 / 20%)",
                  }}
                >
                  {logo.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[var(--electric-blue)]" weight="fill" />
                ))}
                <span className="ml-2 text-sm font-semibold text-[var(--accent-dark)]">5.0</span>
              </div>
              <p className="text-sm text-[var(--neutral-500)]">
                <span className="text-[var(--accent-dark)] font-medium">{trustedLogos.length}+ entreprises</span> nous font déjà confiance
              </p>
            </div>
          </motion.div>

          {/* KPI Row - Clean white cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className={cn(
                  "text-center p-5 md:p-6 rounded-2xl",
                  "bg-white border border-[oklch(0_0_0_/_8%)]",
                  "hover:border-[var(--electric-blue)]/30",
                  "transition-all duration-300"
                )}
                style={{
                  boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%), 0 8px 24px oklch(0.2 0.01 250 / 6%)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 32px oklch(0.2 0.01 250 / 8%), 0 32px 80px oklch(0.2 0.01 250 / 12%)",
                }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient-hero mb-2">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-sm text-[var(--neutral-500)] uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide dots - Positioned bottom right */}
        <div className="absolute bottom-24 right-8 lg:right-16 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-3 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-10 bg-[var(--electric-blue)]"
                  : "w-3 bg-[var(--neutral-300)] hover:bg-[var(--neutral-400)]"
              )}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator - Simple arrow */}
      <motion.a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--neutral-400)] hover:text-[var(--electric-blue)] transition-colors"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
