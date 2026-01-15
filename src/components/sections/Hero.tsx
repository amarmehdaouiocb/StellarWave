"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand, heroMetrics, heroSlides } from "@/config/brand";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  NoiseOverlay,
  VignetteOverlay,
  AuroraGlow,
} from "@/components/shared/NoiseOverlay";
import {
  heroTitle,
  heroSubtitle,
  heroCTA,
  fadeInUp,
  carouselSlide,
} from "@/lib/animations";

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
    const interval = setInterval(nextSlide, 8000);
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
        {/* Gradient background fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[oklch(0.12_0.02_270)]" />

        {/* Aurora glow effect */}
        <AuroraGlow />

        {/* Placeholder for hero image - with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Noise texture */}
        <NoiseOverlay opacity={0.04} />

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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <span className="flex h-2 w-2 rounded-full bg-[var(--aurora-cyan)] animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  {brand.tagline}
                </span>
              </motion.div>

              {/* H1 Title */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
                variants={heroTitle}
                initial="hidden"
                animate="visible"
              >
                {slide.title.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                    {i === 2 || i === 5 ? (
                      <span className="text-gradient">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
                variants={heroSubtitle}
                initial="hidden"
                animate="visible"
              >
                {slide.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
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

          {/* KPI Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            {heroMetrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  "text-center p-4 rounded-2xl",
                  "glass",
                  "transition-all duration-300 hover:bg-white/8"
                )}
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slide dots */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-12 flex items-center gap-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-8 bg-[var(--aurora-cyan)]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:bottom-8 lg:left-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a
          href="#trust"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Défiler vers le bas"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
