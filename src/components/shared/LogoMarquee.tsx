"use client";

import { motion } from "framer-motion";

type Logo = {
  name: string;
  logo: string;
};

type LogoMarqueeProps = {
  logos: readonly Logo[];
  speed?: number;
  className?: string;
};

/**
 * LogoMarquee - Continuous horizontal scroll of logos
 * Framer Motion driven (not CSS), with gradient fade masks on edges
 */
export function LogoMarquee({
  logos,
  speed = 30,
  className,
}: LogoMarqueeProps) {
  // Duplicate logos for seamless loop
  const duplicated = [...logos, ...logos, ...logos];

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      {/* Gradient masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, var(--background), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--background), transparent)",
        }}
      />

      <motion.div
        className="flex items-center gap-16"
        animate={{
          x: [0, -(logos.length * 180)],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 opacity-40 hover:opacity-80 transition-opacity duration-300"
          >
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.15)",
              }}
            >
              <img
                src={logo.logo}
                alt={logo.name}
                className={`h-7 w-7 object-contain ${
                  logo.name === "OnMangeQuoi" ? "rounded-full" : ""
                }`}
              />
            </div>
            <span
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--text-muted)" }}
            >
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
