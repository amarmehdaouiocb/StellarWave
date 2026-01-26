"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "subtle";
  hover?: boolean;
  children?: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        base: "bg-white border border-[oklch(0_0_0_/_6%)]",
        shadow: "0 4px 20px -4px oklch(0.2 0.01 250 / 8%), 0 12px 40px -8px oklch(0.2 0.01 250 / 6%)",
        hoverShadow: "0 8px 30px -4px oklch(0.2 0.01 250 / 12%), 0 20px 60px -12px oklch(0.2 0.01 250 / 10%)",
      },
      elevated: {
        base: "bg-white border border-[oklch(0_0_0_/_5%)]",
        shadow: "0 8px 30px -4px oklch(0.2 0.01 250 / 10%), 0 20px 60px -12px oklch(0.2 0.01 250 / 8%)",
        hoverShadow: "0 12px 40px -4px oklch(0.2 0.01 250 / 14%), 0 30px 80px -16px oklch(0.2 0.01 250 / 12%)",
      },
      subtle: {
        base: "bg-[var(--neutral-50)] border border-[oklch(0_0_0_/_4%)]",
        shadow: "0 2px 12px -2px oklch(0.2 0.01 250 / 5%)",
        hoverShadow: "0 4px 20px -4px oklch(0.2 0.01 250 / 8%)",
      },
    };

    const style = variantStyles[variant];

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-3xl p-8",
          style.base,
          className
        )}
        style={{ boxShadow: style.shadow }}
        whileHover={hover ? {
          y: -4,
          boxShadow: style.hoverShadow,
          transition: { duration: 0.3, ease: "easeOut" }
        } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
