"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { proofMetrics } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  inverse = false,
}: {
  value: number;
  suffix?: string;
  inverse?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("fr-FR")
  );

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function ProofCards() {
  return (
    <AnimatedSection
      id="proof"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--apple-bg)" }}
    >
      <div className="relative container-wide">
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
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255, 255, 255, 0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.60)",
              boxShadow: "var(--shadow-apple-sm)",
              color: "rgba(17, 17, 17, 0.6)"
            }}
          >
            Avant / Après
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
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}>L&apos;impact </span>
            <span style={{ color: "#111111", fontWeight: 600 }}>mesurable</span>
            <span style={{ color: "rgba(17, 17, 17, 0.35)" }}> de notre travail</span>
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(17, 17, 17, 0.6)" }}
          >
            Des améliorations concrètes sur les métriques qui comptent pour votre business.
          </p>
        </motion.div>

        {/* Proof cards grid - Apple-like XL cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {proofMetrics.map((metric, index) => {
            const isInverse = "inverse" in metric && metric.inverse;
            const improvement = isInverse
              ? ((metric.before - metric.after) / metric.before) * 100
              : ((metric.after - metric.before) / metric.before) * 100;

            return (
              <motion.div key={index} variants={staggerItem}>
                <div
                  className="text-center h-full p-8"
                  style={{
                    background: "white",
                    borderRadius: "var(--card-radius-xl)",
                    border: "1px solid rgba(255, 255, 255, 0.40)",
                    boxShadow: "var(--shadow-apple-lg)",
                  }}
                >
                  {/* Before/After comparison */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="text-center">
                        <span
                          className="text-sm block mb-1"
                          style={{ color: "rgba(17, 17, 17, 0.5)" }}
                        >
                          Avant
                        </span>
                        <span
                          className="text-xl font-semibold line-through"
                          style={{ color: "rgba(17, 17, 17, 0.35)" }}
                        >
                          {metric.before}
                          {metric.suffix}
                        </span>
                      </div>
                      <div
                        className="text-2xl"
                        style={{ color: "rgba(17, 17, 17, 0.2)" }}
                      >
                        →
                      </div>
                      <div className="text-center">
                        <span
                          className="text-sm block mb-1"
                          style={{ color: "rgba(17, 17, 17, 0.5)" }}
                        >
                          Après
                        </span>
                        <span
                          className="text-xl font-bold"
                          style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          }}
                        >
                          <AnimatedCounter
                            value={metric.after}
                            suffix={metric.suffix}
                            inverse={isInverse}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Improvement badge */}
                  <div
                    className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                    style={{
                      background: isInverse
                        ? "rgba(244, 114, 182, 0.12)"
                        : "rgba(102, 126, 234, 0.12)",
                      color: isInverse ? "#f472b6" : "#667eea"
                    }}
                  >
                    {isInverse ? "-" : "+"}
                    {Math.abs(Math.round(improvement))}%
                  </div>

                  {/* Label */}
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#111111" }}
                  >
                    {metric.label}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(17, 17, 17, 0.6)" }}
                  >
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm mt-10"
          style={{ color: "rgba(17, 17, 17, 0.4)" }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          * Moyennes constatées sur nos projets. Résultats réels variables selon le contexte.
        </motion.p>
      </div>
    </AnimatedSection>
  );
}
