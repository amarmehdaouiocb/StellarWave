"use client";

import { motion } from "framer-motion";
import { TrendUp, TrendDown, Star, ArrowUpRight } from "@phosphor-icons/react";
import { trustedLogos, caseStudies, proofMetrics } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp, staggerContainer, staggerItem, easings } from "@/lib/animations";

// Animated metric card
function MetricCard({
  metric,
  index,
}: {
  metric: (typeof proofMetrics)[number];
  index: number;
}) {
  const isInverse = "inverse" in metric && metric.inverse;
  const isImprovement = !isInverse;
  const percentChange = isInverse
    ? Math.round(((metric.before - metric.after) / metric.before) * 100)
    : Math.round(((metric.after - metric.before) / metric.before) * 100);

  return (
    <motion.div
      variants={staggerItem}
      className="relative p-6 text-center group"
      style={{
        background: "white",
        borderRadius: "var(--card-radius-xl)",
        border: "1px solid rgba(255, 255, 255, 0.40)",
        boxShadow: "var(--shadow-apple-md)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-apple-xl)",
      }}
    >
      {/* Before → After */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span
          className="text-lg line-through"
          style={{ color: "rgba(17, 17, 17, 0.35)" }}
        >
          {metric.before}{metric.suffix}
        </span>
        <motion.span
          className="text-3xl font-bold"
          style={{
            backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {metric.after}{metric.suffix}
        </motion.span>
      </div>

      {/* Label */}
      <div
        className="text-sm font-medium mb-1"
        style={{ color: "#111111" }}
      >
        {metric.label}
      </div>

      {/* Change indicator */}
      <div
        className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
        style={{
          background: "rgba(34, 197, 94, 0.1)",
          color: "#22c55e",
        }}
      >
        {isImprovement ? (
          <TrendUp className="h-3 w-3" weight="bold" />
        ) : (
          <TrendDown className="h-3 w-3" weight="bold" />
        )}
        {percentChange > 0 ? "+" : ""}{percentChange}%
      </div>
    </motion.div>
  );
}

// Mini case study card
function CaseStudyMini({
  study,
  index,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="group cursor-pointer"
    >
      <div
        className="h-full p-6 relative overflow-hidden"
        style={{
          background: index === 0
            ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)"
            : "white",
          borderRadius: "var(--card-radius-xl)",
          border: index === 0
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "var(--shadow-apple-lg)",
        }}
      >
        {/* Inner glow for dark card */}
        {index === 0 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
            }}
          />
        )}

        <div className="relative z-10">
          {/* Industry badge */}
          <span
            className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium mb-4"
            style={{
              background: index === 0 ? "rgba(255,255,255,0.10)" : "rgba(59, 130, 246, 0.08)",
              color: index === 0 ? "white" : "#3b82f6",
              border: index === 0 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(59, 130, 246, 0.15)",
            }}
          >
            {study.industry}
          </span>

          {/* Client name */}
          <h4
            className="text-xl font-semibold mb-3"
            style={{ color: index === 0 ? "white" : "#111111" }}
          >
            {study.client}
          </h4>

          {/* Context (truncated) */}
          <p
            className="text-sm mb-4 line-clamp-2"
            style={{ color: index === 0 ? "rgba(255,255,255,0.7)" : "rgba(17,17,17,0.6)" }}
          >
            {study.context}
          </p>

          {/* Key result */}
          <div
            className="flex items-center justify-between pt-4"
            style={{
              borderTop: index === 0
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(17,17,17,0.08)",
            }}
          >
            <div>
              <div
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: index === 0 ? "rgba(255,255,255,0.5)" : "rgba(17,17,17,0.4)" }}
              >
                Résultat clé
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: index === 0 ? "#60a5fa" : "#3b82f6" }}
              >
                {study.results[0].after}
              </div>
            </div>
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: index === 0 ? "rgba(255,255,255,0.10)" : "rgba(59, 130, 246, 0.08)",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight
                className="h-4 w-4"
                style={{ color: index === 0 ? "white" : "#3b82f6" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Proof() {
  // Take only first 2 case studies for conciseness
  const featuredStudies = caseStudies.slice(0, 2);
  // Duplicate logos for infinite scroll
  const duplicatedLogos = [...trustedLogos, ...trustedLogos];

  return (
    <AnimatedSection
      id="proof"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
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
              color: "rgba(17, 17, 17, 0.6)",
            }}
          >
            Résultats prouvés
          </motion.span>

          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>Des chiffres </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>qui parlent</span>
          </h2>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {proofMetrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </motion.div>

        {/* Trust logos - Compact inline */}
        <motion.div
          className="relative mb-16 py-8"
          style={{
            borderTop: "1px solid rgba(17, 17, 17, 0.06)",
            borderBottom: "1px solid rgba(17, 17, 17, 0.06)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-center text-xs uppercase tracking-widest mb-6"
            style={{ color: "rgba(17, 17, 17, 0.4)", letterSpacing: "0.15em" }}
          >
            Ils nous font confiance
          </p>

          {/* Gradient masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, var(--apple-bg), transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, var(--apple-bg), transparent)" }}
          />

          <motion.div
            className="flex items-center gap-16 justify-center"
            animate={{ x: [0, -50 * trustedLogos.length] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
              >
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)",
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: "#3b82f6" }}>
                    {logo.name.charAt(0)}
                  </span>
                </div>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: "rgba(17, 17, 17, 0.6)" }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured case studies */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredStudies.map((study, index) => (
            <CaseStudyMini key={study.id} study={study} index={index} />
          ))}
        </motion.div>

        {/* Social proof summary */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {trustedLogos.slice(0, 3).map((logo, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  }}
                >
                  {logo.name.charAt(0)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-[#FFB800]" weight="fill" />
              ))}
            </div>
            <span className="text-sm" style={{ color: "rgba(17, 17, 17, 0.6)" }}>
              <strong style={{ color: "#111111" }}>5.0</strong> • {trustedLogos.length}+ clients satisfaits
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default Proof;
