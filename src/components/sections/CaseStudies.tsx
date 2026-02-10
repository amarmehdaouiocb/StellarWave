"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TrendUp, TrendDown } from "@phosphor-icons/react";
import { caseStudies } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItem, fadeInUp, easings } from "@/lib/animations";

// Case study card - Apple-like XL cards
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
        className="h-full flex flex-col relative overflow-hidden cursor-pointer"
        style={{
          background: "white",
          borderRadius: "var(--card-radius-xl)",
          border: "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "var(--shadow-apple-lg)",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
        }}
        whileHover={{
          y: -4,
          boxShadow: "var(--shadow-apple-xl)",
        }}
      >
        {/* Image placeholder */}
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f5f5f7 0%, #e5e5ea 100%)" }}
        >
          {/* Industry badge - Glass style */}
          <div className="absolute top-4 left-4 z-10">
            <motion.span
              className="px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.60)",
                boxShadow: "var(--shadow-apple-sm)",
                color: "#111111"
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {study.industry}
            </motion.span>
          </div>

          {/* Hover overlay - Gradient */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)"
            }}
          >
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
          <h3
            className="text-xl font-semibold mb-4 transition-colors duration-300"
            style={{ color: "#111111" }}
          >
            {study.client}
          </h3>

          {/* Context */}
          <div className="mb-4">
            <span
              className="text-xs uppercase tracking-[0.15em] font-medium"
              style={{ color: "rgba(17, 17, 17, 0.4)" }}
            >
              Contexte
            </span>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(17, 17, 17, 0.6)" }}
            >
              {study.context}
            </p>
          </div>

          {/* Action */}
          <div className="mb-6">
            <span
              className="text-xs uppercase tracking-[0.15em] font-medium"
              style={{ color: "rgba(17, 17, 17, 0.4)" }}
            >
              Notre action
            </span>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(17, 17, 17, 0.6)" }}
            >
              {study.action}
            </p>
          </div>
        </div>

        {/* Results */}
        <div
          className="px-8 pb-8 pt-5"
          style={{ borderTop: "1px solid rgba(17, 17, 17, 0.06)" }}
        >
          <span
            className="text-xs uppercase tracking-[0.15em] mb-3 block font-medium"
            style={{ color: "rgba(17, 17, 17, 0.4)" }}
          >
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
                  <span
                    className="text-sm"
                    style={{ color: "rgba(17, 17, 17, 0.6)" }}
                  >
                    {result.metric}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-sm line-through"
                      style={{ color: "rgba(17, 17, 17, 0.35)" }}
                    >
                      {result.before}
                    </span>
                    <span
                      className="text-sm font-semibold flex items-center gap-1"
                      style={{ color: "#667eea" }}
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
      className="section-padding"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="container-wide">
        {/* Editorial Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)"
            }}
          >
            Études de cas
          </motion.span>
          {/* Editorial two-tone title */}
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em"
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Des résultats </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>mesurables</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
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
