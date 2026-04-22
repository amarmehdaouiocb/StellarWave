"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

const processSteps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "Nous plongeons dans votre écosystème pour comprendre vos défis. Pas de blabla, uniquement de la stratégie produit actionnable.",
    color: "var(--ember-amber)",
  },
  {
    num: "02",
    title: "Design Engineering",
    desc: "Fusion de l'esthétique et de la performance technique. Maquettes interactives, architecture logicielle et Design System.",
    color: "var(--ember-coral)",
  },
  {
    num: "03",
    title: "Build & Deploy",
    desc: "Développement itératif avec des standards de production. Déploiement automatisé sur des infrastructures Cloud résilientes.",
    color: "var(--ember-rose)",
  }
];

function ProcessCard({ step, index, scrollYProgress }: { step: typeof processSteps[0]; index: number; scrollYProgress: MotionValue<number> }) {
  // Create overlap effect via math
  const start = index * 0.3;
  const end = start + 0.3;
  
  // Only top card moves
  const y = useTransform(
    scrollYProgress,
    [start, end, 1],
    [100 * (3 - index), 0, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.1), start + 0.1],
    [0, 1]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [start, end],
    [20, 0]
  );

  return (
    <motion.div
      style={{ y, opacity, rotateX }}
      className="absolute inset-x-0 bottom-0 bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl origin-bottom"
      // Ensure they stack correctly
      initial={{ zIndex: index }}
    >
      <div 
        className="text-6xl font-bold mb-6 font-mono opacity-20"
        style={{ color: step.color }}
      >
        {step.num}
      </div>
      <h3 className="text-2xl font-medium text-white mb-4">{step.title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {step.desc}
      </p>
      <div className="mt-8 flex justify-end">
        <ArrowRight className="w-6 h-6" style={{ color: step.color }} />
      </div>
    </motion.div>
  );
}

export function StickyProcess() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={targetRef} className="py-32 bg-[#09090b] relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-8 text-white">
              Un processus <br />
              <span className="text-zinc-500">rigoureux.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-md mb-8">
              La qualité d&apos;un produit n&apos;est pas le fruit du hasard. C&apos;est le résultat d&apos;une méthodologie éprouvée et d&apos;une exécution obsessionnelle.
            </p>
          </div>

          <div className="relative h-[60vh] w-full max-w-md mx-auto perspective-[1000px]">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.num} step={step} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
