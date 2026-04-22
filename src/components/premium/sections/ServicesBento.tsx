"use client";

import React from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Code2, Cloud, Zap, Rocket, Layout, Database } from "lucide-react";

const bentoItems = [
  {
    title: "Product Engineering",
    description: "Développement d'applications web et mobiles de pointe, de l&apos;idée au déploiement.",
    icon: <Code2 className="w-6 h-6 text-[var(--ember-amber)]" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-8",
    rowSpan: "row-span-1 lg:row-span-2",
    delay: 0.1,
    microInteraction: (
      <div className="absolute inset-0 right-0 left-auto w-1/2 overflow-hidden pointer-events-none opacity-20">
        <div className="w-[150%] h-full flex flex-col gap-2 p-8 pt-12 transform rotate-12 translate-x-1/4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-white/20 rounded-full" />
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Cloud Infrastructure",
    description: "Architectures serverless scalables et sécurisées sur AWS et Google Cloud.",
    icon: <Cloud className="w-6 h-6 text-[var(--ember-coral)]" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-4",
    rowSpan: "row-span-1",
    delay: 0.2,
  },
  {
    title: "Design System",
    description: "UI/UX premium et cohérent.",
    icon: <Layout className="w-6 h-6 text-[var(--ember-rose)]" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-4",
    rowSpan: "row-span-1",
    delay: 0.3,
  },
  {
    title: "Performance",
    description: "Optimisation de l&apos;Edge et Core Web Vitals.",
    icon: <Zap className="w-6 h-6 text-[var(--ember-teal)]" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-4",
    rowSpan: "row-span-1",
    delay: 0.4,
  },
  {
    title: "Data & Backend",
    description: "Bases de données résilientes et APIs ultra-rapides.",
    icon: <Database className="w-6 h-6 text-[var(--ember-violet)]" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-4",
    rowSpan: "row-span-1",
    delay: 0.5,
  },
  {
    title: "Go To Market",
    description: "Landing pages orientées conversion.",
    icon: <Rocket className="w-6 h-6 text-[var(--ember-amber)]" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-4",
    rowSpan: "row-span-1",
    delay: 0.6,
  }
];

export function ServicesBento() {
  return (
    <section id="expertises" className="py-32 px-6 lg:px-12 bg-[#09090b] relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6 text-white"
          >
            L&apos;excellence technique<br/>
            <span className="text-zinc-500">au service de l&apos;esthétique.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl"
          >
            Nous refusons les templates préfabriqués. Chaque ligne de code, chaque pixel 
            est conçu sur mesure pour élever votre marque au rang d'icône digitale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[240px] gap-6">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className={`${item.colSpan} ${item.rowSpan} h-full`}
            >
              <SpotlightCard className="h-full w-full p-8 flex flex-col justify-between group cursor-default">
                {item.microInteraction}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative z-20 group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {item.icon}
                </div>
                <div className="relative z-20">
                  <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
