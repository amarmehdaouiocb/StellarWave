"use client";

import { motion } from "framer-motion";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react";
import { brand } from "@/config/brand";
import { fadeInUp, revealOnScroll, easings } from "@/lib/animations";

function AngularDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute -left-20 -top-10 h-[400px] w-[400px] opacity-10"
        viewBox="0 0 400 400"
        fill="none"
      >
        <line x1="0" y1="150" x2="300" y2="0" stroke="white" strokeWidth="1.5" />
        <line x1="0" y1="250" x2="350" y2="50" stroke="white" strokeWidth="1" />
        <line x1="50" y1="400" x2="250" y2="0" stroke="white" strokeWidth="0.75" />
      </svg>
      <svg
        className="absolute -right-10 -bottom-10 h-[300px] w-[300px] opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <line x1="300" y1="150" x2="0" y2="300" stroke="white" strokeWidth="1.5" />
        <line x1="300" y1="80" x2="50" y2="250" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function CTABanner() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          {...revealOnScroll}
          className="relative overflow-hidden rounded-[32px] px-8 py-16 md:px-16 md:py-20"
          style={{
            background: "linear-gradient(135deg, oklch(0.45 0.25 255) 0%, oklch(0.35 0.22 260) 50%, oklch(0.30 0.20 265) 100%)",
          }}
        >
          <AngularDecor />

          <div className="relative z-10 text-center">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Prêt à transformer votre{" "}
              <span className="text-white/80">business digital ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-white/50 md:text-lg">
              Réservez un appel découverte gratuit de 30 minutes. Nous analysons vos besoins et proposons une solution sur mesure.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={brand.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[oklch(0.35_0.22_260)] shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <CalendarBlank size={18} weight="bold" />
                Réserver mon appel gratuit
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                Demander un devis
              </a>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-sm text-white/30">
              Premier appel gratuit • Sans engagement • Réponse sous 24h
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
