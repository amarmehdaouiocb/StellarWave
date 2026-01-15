"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "heavy" | "gradient";
  hover?: boolean;
  glow?: "cyan" | "violet" | "teal" | "none";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      glow = "none",
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: "glass",
      heavy: "glass-heavy",
      gradient: "border-gradient bg-card",
    };

    const glowClasses = {
      none: "",
      cyan: "glow-cyan",
      violet: "glow-violet",
      teal: "glow-teal",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl p-6",
          variantClasses[variant],
          glowClasses[glow],
          className
        )}
        variants={hover ? cardHover : undefined}
        initial={hover ? "initial" : undefined}
        whileHover={hover ? "hover" : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
