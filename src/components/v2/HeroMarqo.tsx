"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarBlank, Check, ShieldCheck, Lightning } from "@phosphor-icons/react";
import { brand, heroSlides, heroMetrics, heroTrustBadges } from "@/config/brand";
import {
  fadeInUp,
  heroTitle,
  heroSubtitle,
  heroCTA,
  staggerContainer,
  staggerItem,
  revealOnScroll,
  easings,
} from "@/lib/animations";

const trustIconMap: Record<string, React.ReactNode> = {
  Check: <Check size={16} weight="bold" />,
  ShieldCheck: <ShieldCheck size={16} weight="bold" />,
  Lightning: <Lightning size={16} weight="bold" />,
};

function AngularLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top left angular lines */}
      <svg
        className="absolute -top-20 -left-20 h-[600px] w-[600px] opacity-[0.08]"
        viewBox="0 0 600 600"
        fill="none"
      >
        <line x1="0" y1="200" x2="400" y2="0" stroke="url(#hero-line-grad)" strokeWidth="1.5" />
        <line x1="0" y1="300" x2="500" y2="50" stroke="url(#hero-line-grad)" strokeWidth="1" />
        <line x1="0" y1="400" x2="600" y2="100" stroke="url(#hero-line-grad)" strokeWidth="0.75" />
        <line x1="50" y1="600" x2="350" y2="0" stroke="url(#hero-line-grad)" strokeWidth="1" />
        <line x1="150" y1="600" x2="450" y2="0" stroke="url(#hero-line-grad)" strokeWidth="0.75" />
        <defs>
          <linearGradient id="hero-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.70 0.18 255)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="oklch(0.55 0.25 255)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.70 0.18 255)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bottom right angular lines */}
      <svg
        className="absolute -right-20 -bottom-20 h-[500px] w-[500px] opacity-[0.06]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <line x1="500" y1="300" x2="100" y2="500" stroke="oklch(0.70 0.18 255)" strokeWidth="1.5" />
        <line x1="500" y1="200" x2="0" y2="450" stroke="oklch(0.70 0.18 255)" strokeWidth="1" />
        <line x1="500" y1="100" x2="50" y2="400" stroke="oklch(0.70 0.18 255)" strokeWidth="0.75" />
      </svg>

      {/* Radial glow at center top */}
      <div
        className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.55 0.25 255 / 12%) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function HeroMarqo() {
  const slide = heroSlides[0];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[oklch(0.10_0.02_250)] pt-24 pb-16 lg:pt-32 lg:pb-24">
      <AngularLines />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: easings.smooth }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric-blue)]" />
            {brand.tagline}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {slide.title.split(" ").map((word, i) => (
            <span key={i}>
              {i === 3 || i === 4 ? (
                <span className="text-gradient">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/50 md:text-xl"
        >
          {slide.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroCTA}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={brand.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-xl bg-[var(--electric-blue)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_oklch(0.55_0.25_255/30%)] transition-all hover:shadow-[0_8px_32px_oklch(0.55_0.25_255/40%)] hover:brightness-110"
          >
            <CalendarBlank size={18} weight="bold" />
            Réserver un appel
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Demander un devis
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: easings.smooth }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        >
          {heroTrustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-sm text-white/40"
            >
              <span className="text-[var(--electric-blue)]">
                {trustIconMap[badge.icon] || <Check size={16} weight="bold" />}
              </span>
              {badge.text}
            </div>
          ))}
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 md:grid-cols-4"
        >
          {heroMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={staggerItem}
              className="flex flex-col items-center gap-1 px-6 py-6 backdrop-blur-sm"
            >
              <span className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                {metric.value}
              </span>
              <span className="text-center text-xs text-white/35 md:text-sm">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--apple-bg)] to-transparent" />
    </section>
  );
}
