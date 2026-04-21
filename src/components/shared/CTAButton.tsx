"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpinnerGap, CheckCircle } from "@phosphor-icons/react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface CTAButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "font-semibold",
    "active:scale-[0.98]"
  ),
  secondary: cn(
    "font-medium",
    "active:scale-[0.98]"
  ),
  ghost: cn(
    "font-medium",
    "active:scale-[0.98]"
  ),
  outline: cn(
    "font-medium",
    "active:scale-[0.98]"
  ),
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "#38bdf8",
    color: "#000000",
    borderRadius: "8px",
  },
  secondary: {
    background: "transparent",
    color: "#ffffff",
    border: "2px solid #38bdf8",
    borderRadius: "8px",
  },
  ghost: {
    color: "#38bdf8",
    background: "transparent",
  },
  outline: {
    border: "1px solid rgba(56, 189, 248, 0.20)",
    color: "#38bdf8",
    borderRadius: "8px",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5",
  xl: "px-10 py-5 text-xl rounded-2xl gap-3",
};

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      success = false,
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
    const showSuccess = success && !loading;

    const content = (
      <>
        {/* Loading state */}
        {loading && (
          <SpinnerGap weight="bold" className="h-4 w-4 animate-spin" />
        )}

        {/* Success state */}
        {showSuccess && (
          <CheckCircle weight="duotone" className="h-4 w-4" />
        )}

        {/* Icon left */}
        {!loading && !showSuccess && icon && iconPosition === "left" && (
          <span className="inline-flex">{icon}</span>
        )}

        {/* Text */}
        <span>{children}</span>

        {/* Icon right */}
        {!loading && !showSuccess && icon && iconPosition === "right" && (
          <span className="inline-flex">{icon}</span>
        )}
      </>
    );

    const buttonClasses = cn(
      "inline-flex items-center justify-center",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const inlineStyle = variantStyles[variant];

    // If href is provided, render as anchor
    if (href && !isDisabled) {
      return (
        <motion.a
          href={href}
          className={buttonClasses}
          style={inlineStyle}
          whileHover={{ y: -2 }}
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
        style={inlineStyle}
        disabled={isDisabled}
        whileHover={!isDisabled ? { y: -2 } : undefined}
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
export type { CTAButtonProps };
