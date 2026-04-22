"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { caseStudies, proofMetrics } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  easings,
} from "@/lib/animations";

function CaseStudyCard({
  study,
}: {
  study: (typeof caseStudies)[number];
}) {
  return (
    <motion.div variants={staggerItem} className="group cursor-pointer">
      <div
        className="h-full p-8 relative"
        style={{
          background: "#1e293b",
          borderRadius: "var(--card-radius-2xl)",
          border: "1px solid rgba(56, 189, 248, 0.15)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            borderRadius: "inherit",
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span
              className="inline-flex px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(56, 189, 248, 0.08)",
                color: "#c0cca8",
                border: "1px solid rgba(56, 189, 248, 0.12)",
              }}
            >
              {study.industry}
            </span>
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "rgba(56, 189, 248, 0.10)" }}
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="h-4 w-4" style={{ color: "#38bdf8" }} />
            </motion.div>
          </div>

          <h4
            className="font-semibold mb-3 text-white"
            style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
          >
            {study.client}
          </h4>

          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: "var(--text-body)" }}
          >
            {study.context}
          </p>

          <div
            className="pt-5"
            style={{ borderTop: "1px solid rgba(56, 189, 248, 0.08)" }}
          >
            <div
              className="text-xs uppercase tracking-wider mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              R&eacute;sultat cl&eacute;
            </div>
            <div className="text-lg font-bold" style={{ color: "#38bdf8" }}>
              {study.results[0].after}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Proof() {
  // Pick the most impactful metric for the giant number
  const heroMetric = proofMetrics[0];
  const percentChange = Math.round(
    ((heroMetric.after - heroMetric.before) / heroMetric.before) * 100
  );

  return (
    <AnimatedSection
      id="proof"
      className="section-padding-loose relative dot-grid-bg"
      style={{ backgroundColor: "#020617" }}
    >
      <div className="container-wide">
        {/* Section title — left aligned, oversized */}
        <motion.div
          className="mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easings.smooth }}
            style={{
              background: "rgba(56, 189, 248, 0.06)",
              border: "1px solid rgba(56, 189, 248, 0.12)",
              color: "rgba(56, 189, 248, 0.8)",
            }}
          >
            R&eacute;sultats prouv&eacute;s
          </motion.span>

          <h2
            className="mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>Des chiffres </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "1.15em",
              }}
            >
              qui parlent
            </span>
          </h2>
          {/* Lime accent line — editorial separator */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, #38bdf8 0%, transparent 100%)",
              marginTop: "32px",
            }}
          />
        </motion.div>

        {/* Giant number — single impactful metric */}
        <motion.div
          className="mb-24 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easings.smooth }}
        >
          {/* Decorative circle behind the giant number */}
          <div
            className="absolute pointer-events-none hidden md:block"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "2px solid rgba(56, 189, 248, 0.25)",
              top: "50%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          />
          <div
            className="font-bold select-none relative z-10"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 18vw, 14rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: "#38bdf8",
            }}
          >
            +{percentChange}%
          </div>
          <p
            className="mt-4"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--text-body)",
            }}
          >
            {heroMetric.label} &mdash; de {heroMetric.before}{heroMetric.suffix} &agrave; {heroMetric.after}{heroMetric.suffix}
          </p>
        </motion.div>

        {/* 2 case studies side by side */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.slice(0, 2).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export default Proof;
