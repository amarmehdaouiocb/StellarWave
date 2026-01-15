"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand, heroMetrics, heroSlides } from "@/config/brand";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  NoiseOverlay,
  VignetteOverlay,
} from "@/components/shared/NoiseOverlay";
import {
  heroSubtitle,
  heroCTA,
  fadeInUp,
  carouselSlide,
  easings,
  textCharacterContainer,
  textCharacter,
  staggerContainer,
  staggerItemBlur,
  float,
} from "@/lib/animations";

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

// Mouse-follow aurora glow
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
      {/* Cyan glow - follows mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * 0.3),
          y: useTransform(y, (v) => v * 0.3),
          width: "60vw",
          height: "60vw",
          left: "20%",
          top: "10%",
          background: "radial-gradient(circle, oklch(0.75 0.15 195 / 20%) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      {/* Violet glow - inverse movement */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * -0.2),
          y: useTransform(y, (v) => v * -0.2),
          width: "50vw",
          height: "50vw",
          right: "10%",
          bottom: "20%",
          background: "radial-gradient(circle, oklch(0.65 0.2 300 / 15%) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Teal glow - subtle movement */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: useTransform(x, (v) => v * 0.1),
          y: useTransform(y, (v) => v * 0.1),
          width: "40vw",
          height: "40vw",
          left: "50%",
          bottom: "10%",
          background: "radial-gradient(circle, oklch(0.7 0.15 175 / 12%) 0%, transparent 60%)",
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
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.1_0.015_270)] to-background" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 10% 20%, oklch(0.75 0.1 195 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 90% 80%, oklch(0.65 0.15 300 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 30% 40%, oklch(0.75 0.1 195 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 70% 60%, oklch(0.65 0.15 300 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.75 0.1 195 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 50% 90%, oklch(0.65 0.15 300 / 6%) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 10% 20%, oklch(0.75 0.1 195 / 8%) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 90% 80%, oklch(0.65 0.15 300 / 6%) 0%, transparent 50%)",
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
            linear-gradient(oklch(1 0 0 / 8%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 8%) 1px, transparent 1px)
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
          className="absolute left-1/2 -translate-x-1/2 top-2 w-1.5 h-1.5 rounded-full bg-[var(--aurora-cyan)]"
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

// Character-by-character animated text
function AnimatedTitle({ text, highlightIndices }: { text: string; highlightIndices: number[] }) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-display text-foreground mb-6"
      variants={textCharacterContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className={cn(
                "inline-block",
                highlightIndices.includes(wordIndex) && "text-gradient-hero"
              )}
              variants={textCharacter}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <GradientMeshBackground />

        {/* Mouse-follow aurora glow */}
        <MouseFollowAurora />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Noise texture */}
        <NoiseOverlay opacity={0.03} />

        {/* Vignette */}
        <VignetteOverlay />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide px-4 sm:px-6 lg:px-8 lg:pl-72 py-32">
        <div className="max-w-4xl">
          {/* Animated slide content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={carouselSlide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-highlight mb-8 shadow-premium-sm"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: easings.smooth }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--aurora-cyan)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--aurora-cyan)]" />
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {brand.tagline}
                </span>
              </motion.div>

              {/* Animated H1 Title */}
              <AnimatedTitle
                text={slide.title}
                highlightIndices={[2, 5]}
              />

              {/* Subtitle with blur reveal */}
              <motion.p
                className="text-lg sm:text-xl text-body-relaxed text-muted-foreground max-w-2xl mb-10"
                variants={heroSubtitle}
                initial="hidden"
                animate="visible"
              >
                {slide.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs with stagger */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            variants={heroCTA}
            initial="hidden"
            animate="visible"
          >
            <CTAButton
              variant="primary"
              size="lg"
              icon={<Calendar className="h-5 w-5" />}
              href={brand.calendlyUrl}
              className="shadow-glow-cyan"
            >
              Réserver un appel
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              href="#contact"
            >
              Recevoir une estimation
            </CTAButton>
          </motion.div>

          {/* KPI Row with animated counters */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className={cn(
                  "text-center p-4 md:p-5 rounded-2xl",
                  "glass-highlight",
                  "shadow-premium-sm",
                  "hover-lift",
                  "border border-white/5"
                )}
                variants={staggerItemBlur}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient-hero mb-1 text-h2">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-sm text-muted-foreground text-small-caps">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide dots - redesigned */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-12 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: easings.smooth }}
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative h-3 rounded-full transition-all duration-500",
                currentSlide === index
                  ? "w-10 bg-gradient-to-r from-[var(--aurora-cyan)] to-[var(--aurora-violet)]"
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
                      "0 0 10px oklch(0.75 0.15 195 / 30%)",
                      "0 0 20px oklch(0.75 0.15 195 / 50%)",
                      "0 0 10px oklch(0.75 0.15 195 / 30%)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - redesigned */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
