"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { num: "01", title: "Discovery", desc: "Audit de l'existant, définition des KPIs et architecture de la solution." },
  { num: "02", title: "Design", desc: "UI/UX premium. Wireframes, maquettes et validation des flux utilisateurs." },
  { num: "03", title: "Build", desc: "Développement itératif, tests automatisés et revues de code systématiques." },
  { num: "04", title: "Launch", desc: "Déploiement progressif, monitoring en temps réel et optimisation FinOps." },
];

export function ProcessTimelineV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative bg-[var(--v3-background)]">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-24 text-center">
          The <span className="text-[var(--v3-ember-amber)]">Method.</span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Base Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--v3-ember-amber)] to-[var(--v3-ember-coral)] -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-24 relative z-10">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={cn("flex items-center gap-8 md:gap-0", isEven ? "md:flex-row" : "md:flex-row-reverse")}>
                  {/* Left (or Right) Content */}
                  <div className={cn("hidden md:block flex-1", isEven ? "text-right pr-16" : "pl-16")}>
                    <div className="text-3xl font-display font-bold text-white mb-2">{step.title}</div>
                    <p className="text-[var(--v3-foreground-muted)]">{step.desc}</p>
                  </div>

                  {/* Center Node */}
                  <div className="relative flex items-center justify-center w-[54px] h-[54px] shrink-0">
                    <div className="absolute inset-0 bg-[var(--v3-background)] rounded-full z-0" />
                    <div className="absolute inset-0 rounded-full border-2 border-white/10 z-10" />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[var(--v3-ember-amber)]/20 blur-md z-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-50% 0px -50% 0px" }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="relative z-20 text-sm font-mono font-bold text-[var(--v3-ember-amber)]">
                      {step.num}
                    </div>
                  </div>

                  {/* Mobile Content (Always right) or Desktop empty space */}
                  <div className={cn("flex-1", isEven ? "pl-0 md:pl-16" : "pr-0 md:pr-16 text-left md:text-right")}>
                    <div className={cn("md:hidden mb-2 text-2xl font-display font-bold text-white")}>{step.title}</div>
                    <p className={cn("md:hidden text-[var(--v3-foreground-muted)]")}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
