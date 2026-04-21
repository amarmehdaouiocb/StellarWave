"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const cases = [
  {
    id: "01",
    client: "Fidelya",
    metric: "+300%",
    label: "User Retention",
    desc: "CRM complet avec système de points et accès QR code sans mot de passe. Architecture offline-first avec Supabase.",
    color: "bg-[var(--v3-ember-amber)]",
  },
  {
    id: "02",
    client: "BoatAcademy",
    metric: "-40%",
    label: "Dev Costs",
    desc: "Monorepo Turbo (Next.js + Expo). Une seule base de code pour le web, iOS et Android. Paiements Stripe intégrés.",
    color: "bg-[var(--v3-ember-coral)]",
  },
  {
    id: "03",
    client: "RA Bâtiment",
    metric: "98+",
    label: "Lighthouse Score",
    desc: "Site vitrine premium animé avec Framer Motion. SEO technique avancé générant +45% de leads organiques.",
    color: "bg-white",
  }
];

export function ScrollStackProofV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[var(--v3-background)] py-24 pb-[30vh]">
      <div className="container mx-auto px-6 lg:px-12 mb-24">
        <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
          Proof of <span className="text-[var(--v3-ember-amber)] italic font-serif tracking-normal">work.</span>
        </h2>
      </div>

      <div className="relative h-[300vh]">
        <div className="sticky top-24 flex flex-col items-center justify-center gap-6 px-4">
          {cases.map((c, i) => {
            // Each card scales down slightly as the next one comes up
            const targetScale = 1 - (cases.length - 1 - i) * 0.05;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [max(0, (i - 0.5) / cases.length), i / cases.length, min(1, (i + 1) / cases.length)],
              [1, 1, targetScale]
            );

            return (
              <motion.div
                key={c.id}
                style={{
                  scale,
                  top: `calc(10vh + ${i * 40}px)`,
                }}
                className="sticky w-full max-w-4xl h-[400px] v3-liquid-glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end origin-top border-t border-[var(--v3-border)] shadow-2xl"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="text-sm font-mono text-[var(--v3-foreground-muted)]">
                    {c.id} — {c.client}
                  </div>
                  <div className="mt-auto">
                    <p className="max-w-md text-lg text-white/80 leading-relaxed mb-6 font-sans">
                      {c.desc}
                    </p>
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-[var(--v3-ember-amber)] transition-colors">
                      View Case Study <ArrowUpRight />
                    </button>
                  </div>
                </div>

                <div className="mt-8 md:mt-0 text-left md:text-right">
                  <div className="text-6xl md:text-8xl font-black font-display tracking-tighter text-white">
                    {c.metric}
                  </div>
                  <div className="text-[var(--v3-ember-amber)] font-mono text-sm tracking-widest uppercase mt-2">
                    {c.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function min(a: number, b: number) { return a < b ? a : b; }
function max(a: number, b: number) { return a > b ? a : b; }
