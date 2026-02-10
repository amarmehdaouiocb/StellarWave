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
      className="py-20 overflow-hidden"
      style={{
        backgroundColor: "var(--apple-bg)",
        borderTop: "1px solid rgba(17, 17, 17, 0.06)",
        borderBottom: "1px solid rgba(17, 17, 17, 0.06)"
      }}
    >
      <div className="container-wide">
        <motion.p
          className="text-center text-sm uppercase tracking-widest mb-10"
          style={{ color: "rgba(17, 17, 17, 0.4)", letterSpacing: "0.15em" }}
          variants={fadeInUp}
        >
          Ils nous font confiance
        </motion.p>
      </div>

      {/* Infinite scroll logos */}
      <div className="relative">
        {/* Gradient masks - Apple style */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10"
          style={{ background: "linear-gradient(to right, var(--apple-bg), transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10"
          style={{ background: "linear-gradient(to left, var(--apple-bg), transparent)" }}
        />

        <motion.div
          className="flex items-center gap-20"
          animate={{
            x: [0, -60 * trustedLogos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className={cn(
                "flex-shrink-0 flex items-center justify-center",
                "h-14 px-6",
                "opacity-30 hover:opacity-80 transition-opacity duration-300"
              )}
            >
              {/* Placeholder logo - In production, use actual logos */}
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)"
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#667eea" }}
                  >
                    {logo.name.charAt(0)}
                  </span>
                </div>
                <span
                  className="text-lg font-medium whitespace-nowrap"
                  style={{ color: "rgba(17, 17, 17, 0.6)" }}
                >
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
