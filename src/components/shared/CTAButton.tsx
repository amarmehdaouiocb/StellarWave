"use client";

import { forwardRef, useState, useRef } from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpinnerGap, CheckCircle } from "@phosphor-icons/react";
import { easings } from "@/lib/animations";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gradient";
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
  magnetic?: boolean;
  ripple?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "relative overflow-hidden",
    "bg-gradient-to-r from-[var(--ember-amber)] via-[var(--ember-coral)] to-[var(--ember-rose)]",
    "text-white font-semibold",
    "shadow-lg shadow-[var(--ember-amber)]/20",
    "hover:shadow-xl hover:shadow-[var(--ember-amber)]/30",
    "active:scale-[0.98]"
  ),
  secondary: cn(
    "glass-highlight",
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
  gradient: cn(
    "relative overflow-hidden",
    "bg-gradient-to-r from-[var(--ember-amber)] to-[var(--ember-coral)]",
    "text-white font-semibold",
    "shadow-premium-md",
    "active:scale-[0.98]"
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-2xl gap-2.5",
  xl: "px-10 py-5 text-xl rounded-2xl gap-3",
};

// Ripple effect component
function Ripple({
  x,
  y,
  onComplete,
}: {
  x: number;
  y: number;
  onComplete: () => void;
}) {
  return (
    <motion.span
      className="absolute rounded-full bg-white/30 pointer-events-none"
      initial={{ width: 0, height: 0, x, y, opacity: 0.5 }}
      animate={{
        width: 500,
        height: 500,
        x: x - 250,
        y: y - 250,
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: easings.smooth }}
      onAnimationComplete={onComplete}
    />
  );
}

// Shimmer effect for primary buttons
function ShimmerEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{
        duration: 0.6,
        ease: easings.smooth,
      }}
    >
      <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
    </motion.div>
  );
}

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
      magnetic = false,
      ripple = true,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

    const isDisabled = disabled || loading;
    const showSuccess = success && !loading;

    // Handle ripple effect
    const handleRipple = (e: React.MouseEvent<HTMLElement>) => {
      if (!ripple || isDisabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);
    };

    const removeRipple = (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    // Handle magnetic effect
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!magnetic || isDisabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;

      setMagneticPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setMagneticPosition({ x: 0, y: 0 });
    };

    const content = (
      <>
        {/* Shimmer effect for primary variant */}
        {variant === "primary" && <ShimmerEffect />}

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map((r) => (
            <Ripple
              key={r.id}
              x={r.x}
              y={r.y}
              onComplete={() => removeRipple(r.id)}
            />
          ))}
        </AnimatePresence>

        {/* Loading state */}
        {loading && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <SpinnerGap weight="bold" className="h-4 w-4 animate-spin" />
          </motion.span>
        )}

        {/* Success state */}
        {showSuccess && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <CheckCircle weight="duotone" className="h-4 w-4" />
          </motion.span>
        )}

        {/* Icon left */}
        {!loading && !showSuccess && icon && iconPosition === "left" && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}

        {/* Text */}
        <span className="relative z-10">{children}</span>

        {/* Icon right */}
        {!loading && !showSuccess && icon && iconPosition === "right" && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
        )}
      </>
    );

    const buttonClasses = cn(
      "inline-flex items-center justify-center",
      "transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember-amber)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const motionProps = {
      whileHover: !isDisabled ? { scale: 1.02, y: -2 } : undefined,
      whileTap: !isDisabled ? { scale: 0.98 } : undefined,
      animate: magnetic ? magneticPosition : undefined,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    };

    // If href is provided, render as anchor
    if (href && !isDisabled) {
      return (
        <motion.a
          href={href}
          className={buttonClasses}
          onClick={handleRipple}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...motionProps}
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
        onClick={(e) => {
          handleRipple(e);
          props.onClick?.(e);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
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
