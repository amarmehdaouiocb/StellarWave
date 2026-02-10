"use client";

import { motion } from "framer-motion";
import { Binoculars, PencilSimple, Code, Rocket } from "@phosphor-icons/react";
import { processSteps } from "@/config/brand";
import {
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  revealOnScroll,
  easings,
} from "@/lib/animations";

const stepIcons = [
  <Binoculars size={24} weight="duotone" key="1" />,
  <PencilSimple size={24} weight="duotone" key="2" />,
  <Code size={24} weight="duotone" key="3" />,
  <Rocket size={24} weight="duotone" key="4" />,
];

export function ProcessMarqo() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white py-20 lg:py-32"
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--neutral-400) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          {...revealOnScroll}
          className="mb-16 text-center"
        >
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--neutral-50)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--neutral-500)]">
              Notre méthode
            </span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-5xl"
          >
            4 étapes vers votre{" "}
            <span className="text-gradient">succès digital</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mx-auto mt-4 max-w-xl text-base text-[var(--neutral-500)]"
          >
            Une méthodologie éprouvée pour transformer vos idées en produits qui performent.
          </motion.p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={staggerContainerSlow}
          {...revealOnScroll}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={staggerItem}
              className="group relative rounded-[var(--card-radius-xl)] border border-[var(--border)] bg-[var(--neutral-50)] p-6 transition-all duration-300 hover:border-[var(--electric-blue)]/20 hover:bg-white hover:shadow-[var(--shadow-md)]"
            >
              {/* Step number */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-display text-5xl font-bold tracking-tighter text-[var(--neutral-200)] transition-colors group-hover:text-[var(--electric-blue)]/20">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[var(--neutral-500)] shadow-[var(--shadow-xs)] transition-all group-hover:bg-[var(--electric-blue)] group-hover:text-white group-hover:shadow-[0_4px_16px_oklch(0.55_0.25_255/25%)]">
                  {stepIcons[idx]}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-2 font-display text-lg font-semibold tracking-tight text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[var(--neutral-500)]">
                {step.description}
              </p>

              {/* Duration badge */}
              <div className="inline-flex items-center rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[var(--neutral-500)] shadow-[var(--shadow-xs)]">
                ⏱ {step.duration}
              </div>

              {/* Deliverables */}
              <div className="mt-4 space-y-1.5">
                {step.deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-2 text-xs text-[var(--neutral-400)]"
                  >
                    <div className="h-1 w-1 rounded-full bg-[var(--electric-blue)]" />
                    {d}
                  </div>
                ))}
              </div>

              {/* Connector line (hidden on last + mobile) */}
              {idx < processSteps.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-[var(--neutral-300)] lg:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
