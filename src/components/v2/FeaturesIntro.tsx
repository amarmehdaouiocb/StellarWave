"use client";

import { motion } from "framer-motion";
import { Sparkle, ChartLineUp, Globe, Lightning } from "@phosphor-icons/react";
import { brand } from "@/config/brand";
import { fadeInUp, fadeInLeft, fadeInRight, revealOnScroll, staggerContainer, staggerItem, easings } from "@/lib/animations";

const highlights = [
  { icon: <ChartLineUp size={20} weight="duotone" />, text: "Conversion +300%" },
  { icon: <Lightning size={20} weight="duotone" />, text: "Lighthouse 98+" },
  { icon: <Globe size={20} weight="duotone" />, text: "SEO technique avancé" },
];

function DashboardMockup() {
  return (
    <div className="relative">
      {/* Main dashboard card */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-lg)]">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="h-2.5 w-32 rounded-full bg-[var(--neutral-200)]" />
        </div>

        {/* Stats row */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[
            { label: "Conversions", value: "4.8%", color: "bg-[var(--electric-blue)]" },
            { label: "Visites", value: "12.4k", color: "bg-emerald-500" },
            { label: "Lighthouse", value: "98", color: "bg-violet-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-[var(--neutral-50)] p-3"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--neutral-400)]">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
                {stat.value}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--neutral-200)]">
                <div className={`h-full w-3/4 rounded-full ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="rounded-xl bg-[var(--neutral-50)] p-4">
          <div className="flex items-end gap-1.5 h-24">
            {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-[var(--electric-blue)] to-[var(--electric-blue-light)]"
                  style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5, ease: easings.smooth }}
        className="absolute -top-4 -right-4 rounded-xl border border-[var(--border)] bg-white p-3 shadow-[var(--shadow-md)] lg:-right-8"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <ChartLineUp size={16} weight="bold" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--foreground)]">+32% ce mois</p>
            <p className="text-[10px] text-[var(--neutral-400)]">Conversions en hausse</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturesIntro() {
  return (
    <section
      id="services"
      className="relative bg-[var(--apple-bg)] py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[45%_55%] lg:gap-20">
          {/* Left: Text content */}
          <motion.div
            variants={fadeInLeft}
            {...revealOnScroll}
          >
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--electric-blue)]/15 bg-[var(--electric-blue)]/5 px-4 py-1.5">
              <Sparkle size={16} weight="fill" className="text-[var(--electric-blue)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--electric-blue)]">
                Studio Digital Premium
              </span>
            </div>

            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--foreground)] md:text-4xl lg:text-5xl">
              Votre département digital,{" "}
              <span className="text-gradient">en pilote automatique</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[var(--neutral-500)] md:text-lg">
              {brand.description}
            </p>

            {/* Highlights */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.text}
                  variants={staggerItem}
                  className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 shadow-[var(--shadow-xs)]"
                >
                  <span className="text-[var(--electric-blue)]">{item.icon}</span>
                  <span className="text-sm font-medium text-[var(--foreground)]">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--electric-blue)] transition-colors hover:text-[var(--electric-blue-dark)]"
              >
                Découvrir nos réalisations
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            variants={fadeInRight}
            {...revealOnScroll}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
