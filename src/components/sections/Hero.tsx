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
import { ParticleNetwork } from "@/components/ui/ParticleNetwork";

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
  const sectionRef = useRef<HTMLElement>(null);

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
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0a0a14 0%, #0f0f23 50%, #0a0a14 100%)" }}
    >
      {/* Interactive Particle Network Background */}
      <div className="absolute inset-0">
        <ParticleNetwork
          particleCount={80}
          particleColor="rgba(59, 130, 246, 0.8)"
          lineColor="rgba(59, 130, 246, 0.15)"
          maxDistance={160}
          speed={0.3}
          mouseRadius={180}
          mouseForce={0.02}
        />
      </div>

      {/* Subtle blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 30% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-wide pt-32 lg:pt-40 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
            className="mb-8"
          >
            {/* Eyebrow badge - Glass style on dark */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span className="text-sm font-medium text-white/80">
                {brand.tagline}
              </span>
            </motion.div>

            {/* Editorial MEGA Title - Two-tone style on dark */}
            <h1
              className="mb-6"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.1em",
                lineHeight: "0.92"
              }}
            >
              <span
                className="block text-[clamp(3.5rem,12vw,8rem)] font-extrabold"
                style={{ color: "rgba(255, 255, 255, 0.4)" }}
              >
                STELLAR
              </span>
              <span
                className="block text-[clamp(3.5rem,12vw,8rem)] font-extrabold text-white"
              >
                WAVE
              </span>
            </h1>

            {/* Subtitle - Under the MEGA title */}
            <motion.p
              className="text-xl sm:text-2xl lg:text-[1.75rem] font-light max-w-2xl text-white/70"
              style={{ lineHeight: "1.4" }}
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
              href="#contact"
            >
              Demander un devis
            </CTAButton>
          </motion.div>

          {/* Trust badges - On dark background */}
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
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <IconComponent className="h-4 w-4 text-[#3b82f6]" weight="bold" />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Social Proof - Glass card on dark */}
          <motion.div
            className="flex items-center gap-5 p-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "var(--card-radius-xl)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex -space-x-3">
              {trustedLogos.slice(0, 3).map((logo, i) => (
                <div
                  key={i}
                  className="h-11 w-11 rounded-full border-[3px] border-white/20 flex items-center justify-center overflow-hidden"
                  style={{
                    background: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className={`h-7 w-7 object-contain ${logo.name === "OnMangeQuoi" ? "rounded-full" : ""}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[#FFB800]" weight="fill" />
                ))}
                <span className="ml-2 text-sm font-semibold text-white">5.0</span>
              </div>
              <p className="text-sm text-white/60">
                <span className="font-semibold text-white">{trustedLogos.length}+ entreprises</span> nous font déjà confiance
              </p>
            </div>
          </motion.div>

          {/* KPI Row - Glass cards on dark */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-5 md:p-6 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "var(--card-radius-xl)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                }}
                whileHover={{
                  y: -4,
                  background: "rgba(255, 255, 255, 0.10)",
                }}
              >
                <div
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-xs uppercase tracking-wider font-medium text-white/50">
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
                  ? "w-10 bg-white"
                  : "w-3 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator - Simple arrow */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
