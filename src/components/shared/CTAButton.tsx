"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface CTAButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "relative overflow-hidden",
    "bg-gradient-to-r from-[var(--aurora-cyan)] via-[var(--aurora-violet)] to-[var(--aurora-teal)]",
    "text-primary-foreground font-semibold",
    "shadow-lg shadow-[var(--glow-cyan)]/20",
    "hover:shadow-xl hover:shadow-[var(--glow-cyan)]/30",
    "active:scale-[0.98]"
  ),
  secondary: cn(
    "glass",
    "text-foreground font-medium",
    "hover:bg-white/10",
    "active:scale-[0.98]"
  ),
  ghost: cn(
    "text-foreground font-medium",
    "hover:bg-white/5",
    "active:scale-[0.98]"
  ),
  outline: cn(
    "border border-white/20",
    "text-foreground font-medium",
    "hover:bg-white/5 hover:border-white/30",
    "active:scale-[0.98]"
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-xl gap-2.5",
};

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "right",
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {!loading && icon && iconPosition === "left" && icon}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && icon}
      </>
    );

    const buttonClasses = cn(
      "inline-flex items-center justify-center",
      "transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    // If href is provided, render as anchor
    if (href && !isDisabled) {
      return (
        <motion.a
          href={href}
          className={buttonClasses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export { CTAButton };
