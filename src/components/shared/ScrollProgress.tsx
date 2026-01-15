"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  variant?: "default" | "gradient" | "glow";
  height?: number;
  showPercentage?: boolean;
}

export function ScrollProgress({
  className,
  variant = "gradient",
  height = 3,
  showPercentage = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const variantStyles = {
    default: "bg-[var(--ember-amber)]",
    gradient:
      "bg-gradient-to-r from-[var(--ember-amber)] via-[var(--ember-coral)] to-[var(--ember-rose)]",
    glow: "bg-[var(--ember-amber)] shadow-glow-amber",
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] origin-left",
          variantStyles[variant],
          className
        )}
        style={{
          scaleX,
          height,
          transformOrigin: "0%",
        }}
      >
        {/* Animated shimmer effect */}
        {variant === "gradient" && (
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>

      {/* Optional percentage indicator */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-[100] px-3 py-1.5 rounded-full glass-highlight text-xs font-medium text-muted-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span className="tabular-nums">
            {percentage.get().toFixed(0)}%
          </motion.span>
        </motion.div>
      )}
    </>
  );
}
