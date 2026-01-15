"use client";

import { motion } from "framer-motion";
import {
  Lightning,
  ShieldCheck,
  TrendUp,
  Handshake,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { whyUs } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { GlassCard } from "@/components/shared/GlassCard";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

// Icon map for looking up Phosphor icons by name
const iconMap: Record<string, React.ElementType> = {
  Lightning,
  ShieldCheck,
  TrendUp,
  Handshake,
};

export function WhyUs() {
  return (
    <AnimatedSection
      id="why-us"
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--ember-coral)] opacity-5 blur-[150px] rounded-full" />
      </div>

      <div className="relative container-wide lg:pl-64">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeInUp}
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-6">
            Notre différence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Pourquoi choisir <span className="text-gradient">Stellar Wave</span> ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Au-delà du code, nous apportons une vision produit et une exécution
            industrielle qui font la différence.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {whyUs.map((item, index) => {
            const Icon = iconMap[item.iconName] || Lightning;

            return (
              <motion.div key={index} variants={staggerItem}>
                <GlassCard className="h-full group">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl",
                        "bg-gradient-to-br from-[var(--ember-amber)]/20 to-[var(--ember-coral)]/20",
                        "group-hover:from-[var(--ember-amber)]/30 group-hover:to-[var(--ember-coral)]/30",
                        "transition-all duration-300"
                      )}
                    >
                      <Icon weight="duotone" className="h-6 w-6 text-[var(--ember-amber)]" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: "100%", label: "Projets livrés à temps" },
            { value: "24h", label: "Temps de réponse max" },
            { value: "98%", label: "Taux de satisfaction" },
            { value: "0", label: "Surprise sur le budget" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center p-6 rounded-2xl glass"
            >
              <div className="text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
