"use client";

import { forwardRef, useRef } from "react";
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/animations";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "heavy" | "gradient" | "elevated" | "subtle";
  hover?: boolean;
  glow?: "cyan" | "violet" | "teal" | "none";
  borderGlow?: boolean;
  innerGlow?: boolean;
  noise?: boolean;
  children?: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      glow = "none",
      borderGlow = false,
      innerGlow = false,
      noise = false,
      children,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Inner glow that follows mouse
    const innerGlowBackground = useTransform([x, y], ([latestX, latestY]) => {
      if (!innerGlow) return "transparent";
      return `radial-gradient(300px circle at ${latestX}px ${latestY}px, oklch(0.79 0.16 85 / 6%), transparent 40%)`;
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !innerGlow) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const variantClasses = {
      default: "glass",
      heavy: "glass-heavy",
      gradient: "border-gradient bg-card",
      elevated: "glass shadow-premium-md",
      subtle: "bg-white/[0.02] border border-white/5 backdrop-blur-sm",
    };

    const glowClasses = {
      none: "",
      cyan: "shadow-glow-cyan",
      violet: "shadow-glow-violet",
      teal: "shadow-glow-teal",
    };

    return (
      <motion.div
        ref={(node) => {
          // Handle both refs
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          "relative rounded-2xl p-6 overflow-hidden",
          variantClasses[variant],
          glowClasses[glow],
          borderGlow && "border-animated",
          className
        )}
        variants={hover ? cardHover : undefined}
        initial={hover ? "initial" : undefined}
        whileHover={hover ? "hover" : undefined}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {/* Inner glow effect */}
        {innerGlow && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ background: innerGlowBackground }}
          />
        )}

        {/* Noise texture overlay */}
        {noise && (
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Border glow animation */}
        {borderGlow && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background: `conic-gradient(from var(--border-angle, 0deg), var(--ember-amber), var(--ember-coral), var(--ember-rose), var(--ember-amber))`,
              padding: "1px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
            animate={{
              "--border-angle": ["0deg", "360deg"],
            } as Record<string, string[]>}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
