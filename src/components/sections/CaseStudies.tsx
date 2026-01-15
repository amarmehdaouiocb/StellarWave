"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendUp, TrendDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export function CaseStudies() {
  return (
    <AnimatedSection
      id="case-studies"
      className="section-padding"
    >
      <div className="container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Études de cas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Des résultats <span className="text-gradient">mesurables</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Chaque projet est une histoire de transformation. Découvrez comment
            nous avons aidé nos clients à atteindre leurs objectifs.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={staggerItem}
            >
              <GlassCard className="h-full flex flex-col group cursor-pointer">
                {/* Image placeholder */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/10">
                  <div className="absolute inset-0 aurora-gradient opacity-20" />

                  {/* Industry badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass">
                      {study.industry}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>Voir l&apos;étude</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {study.client}
                  </h3>

                  {/* Context */}
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Contexte
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {study.context}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Notre action
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {study.action}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="border-t border-white/5 pt-6">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
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
                        <div
                          key={resultIndex}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground">
                            {result.metric}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground line-through">
                              {result.before}
                            </span>
                            <span
                              className={cn(
                                "text-sm font-semibold flex items-center gap-1",
                                isPositive
                                  ? "text-[var(--ember-rose)]"
                                  : "text-[var(--ember-amber)]"
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
