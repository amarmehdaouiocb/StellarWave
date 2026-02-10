"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Users, Star } from "@phosphor-icons/react";
import { caseStudies, trustedLogos } from "@/config/brand";
import {
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  revealOnScroll,
} from "@/lib/animations";

function LogoCarousel() {
  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--apple-bg)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--apple-bg)] to-transparent" />

      <div className="flex animate-[scroll-x_20s_linear_infinite] gap-12">
        {[...trustedLogos, ...trustedLogos, ...trustedLogos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-10 flex-shrink-0 items-center gap-3 text-[var(--neutral-400)]"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[var(--neutral-100)]">
              <Image
                src={logo.logo}
                alt={logo.name}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section
      id="projets"
      className="relative bg-[var(--apple-bg)] py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          {...revealOnScroll}
          className="mb-16 text-center"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--neutral-500)] shadow-[var(--shadow-xs)]">
              <Trophy size={14} weight="fill" className="text-amber-500" />
              Résultats prouvés
            </span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-5xl"
          >
            Résultats garantis{" "}
            <span className="text-gradient">pour nos clients</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mx-auto mt-4 max-w-xl text-base text-[var(--neutral-500)]"
          >
            Chaque projet est conçu pour délivrer des résultats mesurables. Voici quelques exemples.
          </motion.p>
        </motion.div>

        {/* Avatars row */}
        <motion.div
          {...revealOnScroll}
          variants={fadeInUp}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <div className="flex -space-x-3">
            {caseStudies.slice(0, 4).map((cs) => (
              <div
                key={cs.id}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[var(--neutral-100)] shadow-sm"
              >
                <Image
                  src={cs.image}
                  alt={cs.client}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} weight="fill" className="text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-[var(--neutral-500)]">
              {caseStudies.length}+ projets livrés
            </span>
          </div>
        </motion.div>

        {/* Case study cards */}
        <motion.div
          variants={staggerContainerSlow}
          {...revealOnScroll}
          className="grid gap-6 md:grid-cols-2"
        >
          {caseStudies.slice(0, 4).map((cs) => (
            <motion.div
              key={cs.id}
              variants={staggerItem}
              className="group rounded-[var(--card-radius-xl)] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--neutral-50)]">
                  <Image
                    src={cs.image}
                    alt={cs.client}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--foreground)]">
                    {cs.client}
                  </h3>
                  <p className="text-xs text-[var(--neutral-400)]">{cs.industry}</p>
                </div>
              </div>

              {/* Context */}
              <p className="mb-4 text-sm leading-relaxed text-[var(--neutral-500)]">
                {cs.context}
              </p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-3">
                {cs.results.map((r) => (
                  <div
                    key={r.metric}
                    className="rounded-xl bg-[var(--neutral-50)] p-3 text-center"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--neutral-400)]">
                      {r.metric}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                      {r.after}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo carousel */}
        <motion.div {...revealOnScroll} variants={fadeInUp} className="mt-16">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--neutral-400)]">
            Ils nous font confiance
          </p>
          <LogoCarousel />
        </motion.div>
      </div>
    </section>
  );
}
