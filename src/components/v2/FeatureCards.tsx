"use client";

import { motion } from "framer-motion";
import { RocketLaunch, Stack, ArrowUpRight } from "@phosphor-icons/react";
import { services } from "@/config/brand";
import { fadeInUp, staggerContainer, staggerItem, revealOnScroll, easings } from "@/lib/animations";

const featured = [
  {
    service: services[0], // Landing Pages Premium
    icon: <RocketLaunch size={28} weight="duotone" />,
    visual: "landing",
  },
  {
    service: services[2], // Applications Web
    icon: <Stack size={28} weight="duotone" />,
    visual: "webapp",
  },
];

function CardVisual({ type }: { type: string }) {
  if (type === "landing") {
    return (
      <div className="relative h-52 overflow-hidden rounded-xl bg-gradient-to-br from-[oklch(0.12_0.02_250)] to-[oklch(0.18_0.04_255)]">
        {/* Mockup: Landing page wireframe */}
        <div className="absolute inset-4 flex flex-col gap-3">
          <div className="h-2 w-20 rounded-full bg-white/15" />
          <div className="h-6 w-4/5 rounded bg-white/10" />
          <div className="h-3 w-3/5 rounded bg-white/8" />
          <div className="mt-auto flex gap-2">
            <div className="h-8 w-24 rounded-lg bg-[var(--electric-blue)]/40" />
            <div className="h-8 w-20 rounded-lg border border-white/15" />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-white/5" />
            ))}
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute -top-10 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-[var(--electric-blue)]/15 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden rounded-xl bg-gradient-to-br from-[oklch(0.12_0.02_250)] to-[oklch(0.18_0.04_255)]">
      {/* Mockup: Web app dashboard */}
      <div className="absolute inset-4 flex gap-3">
        {/* Sidebar */}
        <div className="w-12 flex-shrink-0 rounded-lg bg-white/5 p-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`mb-2.5 h-2 w-full rounded-sm ${i === 1 ? "bg-[var(--electric-blue)]/40" : "bg-white/10"}`} />
          ))}
        </div>
        {/* Main content */}
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 rounded-lg bg-white/5 p-2.5">
                <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
                <div className="mt-2 h-4 w-full rounded bg-white/8" />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg bg-white/5 p-3">
            <div className="flex items-end gap-1 h-full">
              {[30, 60, 45, 80, 55, 70, 90, 50, 75, 85].map((h, i) => (
                <div key={i} className="flex-1">
                  <div
                    className="w-full rounded-t-sm bg-[var(--electric-blue)]/30"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-10 right-0 h-32 w-48 rounded-full bg-[var(--electric-blue)]/10 blur-3xl" />
    </div>
  );
}

export function FeatureCards() {
  return (
    <section className="relative bg-[var(--apple-bg)] pb-20 lg:pb-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          {...revealOnScroll}
          className="grid gap-6 md:grid-cols-2"
        >
          {featured.map(({ service, icon, visual }) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-[var(--card-radius-xl)] border border-[var(--border)] bg-white p-1.5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1"
            >
              {/* Image area */}
              <CardVisual type={visual} />

              {/* Content area */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--electric-blue)]/8 text-[var(--electric-blue)]">
                    {icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--foreground)]">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-[var(--neutral-500)]">
                  {service.description}
                </p>

                {/* Features tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="rounded-lg bg-[var(--neutral-100)] px-2.5 py-1 text-xs font-medium text-[var(--neutral-600)]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--electric-blue)] transition-colors group-hover:text-[var(--electric-blue-dark)]">
                  En savoir plus
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
