"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { proofMetrics } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
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
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[var(--ember-amber)] opacity-5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--ember-rose)] opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Avant / Après
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            L&apos;impact <span className="text-gradient">mesurable</span> de notre travail
          </h2>
          <p className="text-lg text-muted-foreground">
            Des améliorations concrètes sur les métriques qui comptent pour votre business.
          </p>
        </motion.div>

        {/* Proof cards grid */}
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
                <GlassCard className="text-center h-full" glow={index === 0 ? "cyan" : "none"}>
                  {/* Before/After comparison */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground block mb-1">
                          Avant
                        </span>
                        <span className="text-xl font-semibold text-muted-foreground line-through">
                          {metric.before}
                          {metric.suffix}
                        </span>
                      </div>
                      <div className="text-2xl text-muted-foreground">→</div>
                      <div className="text-center">
                        <span className="text-sm text-muted-foreground block mb-1">
                          Après
                        </span>
                        <span className="text-xl font-bold text-gradient">
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
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold mb-4",
                      isInverse
                        ? "bg-[var(--ember-rose)]/20 text-[var(--ember-rose)]"
                        : "bg-[var(--ember-amber)]/20 text-[var(--ember-amber)]"
                    )}
                  >
                    {isInverse ? "-" : "+"}
                    {Math.abs(Math.round(improvement))}%
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
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
