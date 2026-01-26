"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CalendarDots } from "@phosphor-icons/react";
import ArrowNarrowRightIcon from "@/components/ui/arrow-narrow-right-icon";
import { cn } from "@/lib/utils";
import { brand, heroMetrics, heroSlides, heroTrustBadges, trustedLogos } from "@/config/brand";
import { Check, ShieldCheck, Lightning, Star } from "@phosphor-icons/react";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  NoiseOverlay,
  VignetteOverlay,
} from "@/components/shared/NoiseOverlay";
import { VideoBackground } from "@/components/shared/VideoBackground";
import { easings, float } from "@/lib/animations";

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
          // Extract number from value
          const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
          if (isNaN(numericValue)) {
            setDisplayValue(value);
            return;
          }

          // Animate counter
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Expo out easing
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(numericValue * eased);

            // Format with original prefix/suffix
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

// Mouse-follow ember glow
function MouseFollowAurora() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Amber glow - follows mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * 0.3),
          y: useTransform(y, (v) => v * 0.3),
          width: "60vw",
          height: "60vw",
          left: "20%",
          top: "10%",
          background: "radial-gradient(circle, oklch(0.79 0.16 85 / 20%) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Coral glow - inverse movement */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * -0.2),
          y: useTransform(y, (v) => v * -0.2),
          width: "50vw",
          height: "50vw",
          right: "10%",
          bottom: "20%",
          background: "radial-gradient(circle, oklch(0.705 0.185 47 / 15%) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Rose glow - subtle movement */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * 0.1),
          y: useTransform(y, (v) => v * 0.1),
          width: "40vw",
          height: "40vw",
          left: "50%",
          bottom: "10%",
          background: "radial-gradient(circle, oklch(0.65 0.22 350 / 12%) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />
    </>
  );
}

// Animated gradient mesh background
function GradientMeshBackground() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Base gradient - warm charcoal */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.13_0.012_55)] to-background" />

      {/* Animated mesh gradient - Ember colors */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 10% 20%, oklch(0.79 0.12 85 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 90% 80%, oklch(0.705 0.14 47 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 30% 40%, oklch(0.79 0.12 85 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 70% 60%, oklch(0.705 0.14 47 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.79 0.12 85 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 50% 90%, oklch(0.705 0.14 47 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 10% 20%, oklch(0.79 0.12 85 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 90% 80%, oklch(0.705 0.14 47 / 6%) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0.01 60 / 8%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0.01 60 / 8%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </motion.div>
  );
}

// Custom scroll indicator
function ScrollIndicator() {
  return (
    <motion.a
      href="#trust"
      className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
      aria-label="Défiler vers le bas"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: easings.smooth }}
    >
      <span className="text-xs uppercase tracking-[0.2em] font-medium text-micro">
        Explorer
      </span>

      {/* Custom animated scroll icon */}
      <motion.div
        className="relative w-6 h-10 rounded-full border-2 border-current opacity-60 group-hover:opacity-100 transition-opacity"
        variants={float}
        initial="initial"
        animate="animate"
      >
        {/* Animated dot inside */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-2 w-1.5 h-1.5 rounded-full bg-[var(--ember-amber)]"
          animate={{
            y: [0, 16, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: easings.gentle,
          }}
        />
      </motion.div>
    </motion.a>
  );
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

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Layer 0: Video/Image Background with parallax */}
      <VideoBackground
        posterSrc="/hero/hero-poster-4k.webp"
        videoSrc="/hero/hero-bg.webm"
        videoSrcFallback="/hero/hero-bg.mp4"
        overlayOpacity={0.65}
        parallaxStrength={150}
        scaleOnScroll={1.25}
      />

      {/* Layer 1: Animated gradient mesh */}
      <GradientMeshBackground />

      {/* Layer 2: Interactive aurora glow */}
      <MouseFollowAurora />

      {/* Layer 3: Overlays for depth */}
      <NoiseOverlay opacity={0.03} />
      <VignetteOverlay intensity={0.4} />

      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 lg:pl-72 pt-28 lg:pt-36 pb-24">
        <div className="max-w-4xl">
          {/* Slide content */}
          <div key={currentSlide}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-highlight mb-8 shadow-premium-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ember-amber)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ember-amber)]" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {brand.tagline}
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-display-heavy text-foreground mb-6">
              {slide.title.split(" ").map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={cn(
                    "inline-block mr-[0.25em]",
                    [2, 5].includes(wordIndex) && "text-gradient-hero"
                  )}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-light text-body-relaxed text-muted-foreground max-w-2xl mb-10">
              {slide.subtitle}
            </p>
          </div>

          {/* CTAs - Un seul CTA principal, répété */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <CTAButton
              variant="primary"
              size="lg"
              icon={<CalendarDots weight="duotone" className="h-5 w-5" />}
              href={brand.calendlyUrl}
              className="shadow-glow-amber"
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
          </div>

          {/* Trust badges - Objection killers */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
            {heroTrustBadges.map((badge, index) => {
              const IconComponent = badge.icon === "Check" ? Check : badge.icon === "ShieldCheck" ? ShieldCheck : Lightning;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <IconComponent className="h-4 w-4 text-[var(--ember-teal)]" weight="bold" />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>

          {/* Social Proof - Micro testimonial */}
          <div className="flex items-center gap-4 p-4 rounded-xl glass-highlight mb-10">
            <div className="flex -space-x-2">
              {/* Avatars simulés des clients */}
              {trustedLogos.slice(0, 3).map((logo, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-[var(--ember-amber)] to-[var(--ember-coral)] flex items-center justify-center text-primary-foreground text-xs font-bold"
                >
                  {logo.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-[var(--ember-amber)]" weight="fill" />
                ))}
                <span className="ml-2 text-sm font-semibold text-foreground">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{trustedLogos.length}+ entreprises</span> nous font déjà confiance
              </p>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {heroMetrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-4 md:p-5 rounded-2xl",
                  "glass-highlight",
                  "shadow-premium-sm",
                  "hover-lift",
                  "border border-white/5"
                )}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient-hero mb-1 text-h2">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-sm text-muted-foreground text-small-caps">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-12 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-3 rounded-full transition-all duration-500",
                currentSlide === index
                  ? "w-10 bg-gradient-to-r from-[var(--ember-amber)] to-[var(--ember-coral)]"
                  : "w-3 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Aller à la slide ${index + 1}`}
            >
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      "0 0 10px oklch(0.79 0.16 85 / 30%)",
                      "0 0 20px oklch(0.79 0.16 85 / 50%)",
                      "0 0 10px oklch(0.79 0.16 85 / 30%)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator - redesigned */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
