"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TrendUp, TrendDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItem, fadeInUp, easings } from "@/lib/animations";

// Case study card - Light theme
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="group"
    >
      <motion.div
        className={cn(
          "h-full flex flex-col relative overflow-hidden",
          "bg-white rounded-3xl",
          "border border-[oklch(0_0_0_/_6%)]",
          "transition-all duration-300",
          "hover:border-[var(--electric-blue)]/20",
          "cursor-pointer"
        )}
        style={{
          boxShadow: "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 8px 30px -4px oklch(0.2 0.01 250 / 12%), 0 20px 60px -12px oklch(0.2 0.01 250 / 10%)",
        }}
      >
        {/* Image placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--neutral-100)]">

          {/* Industry badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-[var(--accent-dark)] border border-[oklch(0_0_0_/_8%)]"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {study.industry}
            </motion.span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[var(--electric-blue)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              className="flex items-center gap-2 text-white font-medium"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <span>Voir l&apos;étude</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-grow relative z-10">
          <h3 className="text-xl font-semibold text-[var(--accent-dark)] mb-4 group-hover:text-[var(--electric-blue)] transition-colors">
            {study.client}
          </h3>

          {/* Context */}
          <div className="mb-4">
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--neutral-400)] font-medium">
              Contexte
            </span>
            <p className="text-sm text-[var(--neutral-500)] mt-1">
              {study.context}
            </p>
          </div>

          {/* Action */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--neutral-400)] font-medium">
              Notre action
            </span>
            <p className="text-sm text-[var(--neutral-500)] mt-1">
              {study.action}
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="px-8 pb-8 pt-5 border-t border-[oklch(0_0_0_/_6%)]">
          <span className="text-xs uppercase tracking-[0.15em] text-[var(--neutral-400)] mb-3 block font-medium">
            Résultats
          </span>
          <div className="space-y-3">
            {study.results.map((result, resultIndex) => {
              const isPositive =
                result.after > result.before ||
                result.after.includes("+") ||
                result.after.includes("€") ||
                result.after.includes("semaines");

              return (
                <motion.div
                  key={resultIndex}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + resultIndex * 0.1 + 0.3 }}
                >
                  <span className="text-sm text-[var(--neutral-500)]">
                    {result.metric}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--neutral-400)] line-through">
                      {result.before}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold flex items-center gap-1",
                        isPositive
                          ? "text-[var(--electric-blue)]"
                          : "text-[var(--electric-blue-dark)]"
                      )}
                    >
                      {result.after}
                      {isPositive ? (
                        <TrendUp className="h-3 w-3" weight="bold" />
                      ) : (
                        <TrendDown className="h-3 w-3" weight="bold" />
                      )}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CaseStudies() {
  return (
    <AnimatedSection
      id="case-studies"
      className="section-padding bg-[var(--background)]"
    >
      <div className="container-wide">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-white border border-[oklch(0_0_0_/_8%)] text-sm font-medium text-[var(--neutral-600)] mb-6"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              boxShadow: "0 2px 8px oklch(0.2 0.01 250 / 4%)",
            }}
          >
            Études de cas
          </motion.span>
          <h2 className="text-display-mega text-[var(--accent-dark)] mb-6">
            Des résultats <span className="text-gradient-hero">mesurables</span>
          </h2>
          <p className="text-lg text-[var(--neutral-500)] leading-relaxed">
            Chaque projet est une histoire de transformation. Découvrez comment
            nous avons aidé nos clients à atteindre leurs objectifs.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
