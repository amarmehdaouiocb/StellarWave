"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { trustedLogos } from "@/config/brand";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { fadeInUp } from "@/lib/animations";

export function TrustBanner() {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...trustedLogos, ...trustedLogos];

  return (
    <AnimatedSection
      id="trust"
      className="py-16 border-y border-white/5 overflow-hidden"
    >
      <div className="container-wide">
        <motion.p
          className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-8"
          variants={fadeInUp}
        >
          Ils nous font confiance
        </motion.p>
      </div>

      {/* Infinite scroll logos */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex items-center gap-16"
          animate={{
            x: [0, -50 * trustedLogos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className={cn(
                "flex-shrink-0 flex items-center justify-center",
                "h-12 px-8",
                "opacity-50 hover:opacity-100 transition-opacity duration-300"
              )}
            >
              {/* Placeholder logo - In production, use actual logos */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/10" />
                <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
