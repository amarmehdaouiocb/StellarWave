"use client";

import { cn } from "@/lib/utils";

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

export function NoiseOverlay({ className, opacity = 0.03 }: NoiseOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

// Gradient overlay for hero sections
interface GradientOverlayProps {
  className?: string;
  direction?: "top" | "bottom" | "radial";
}

export function GradientOverlay({
  className,
  direction = "bottom",
}: GradientOverlayProps) {
  const gradientClasses = {
    top: "bg-gradient-to-t from-transparent via-background/50 to-background",
    bottom: "bg-gradient-to-b from-transparent via-background/50 to-background",
    radial:
      "bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        gradientClasses[direction],
        className
      )}
      aria-hidden="true"
    />
  );
}

// Vignette effect for cinematic look
export function VignetteOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        "bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.08_0.01_270/70%)_100%)]",
        className
      )}
      aria-hidden="true"
    />
  );
}

// Aurora glow background effect
interface AuroraGlowProps {
  className?: string;
  animated?: boolean;
}

export function AuroraGlow({ className, animated = true }: AuroraGlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Cyan blob */}
      <div
        className={cn(
          "absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full",
          "bg-[var(--ember-amber)] opacity-10 blur-[120px]",
          animated && "animate-pulse"
        )}
        style={{ animationDuration: "8s" }}
      />
      {/* Violet blob */}
      <div
        className={cn(
          "absolute -bottom-1/2 -right-1/4 h-[600px] w-[600px] rounded-full",
          "bg-[var(--ember-coral)] opacity-10 blur-[100px]",
          animated && "animate-pulse"
        )}
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      />
      {/* Teal accent */}
      <div
        className={cn(
          "absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full",
          "bg-[var(--ember-rose)] opacity-5 blur-[80px]",
          animated && "animate-pulse"
        )}
        style={{ animationDuration: "12s", animationDelay: "4s" }}
      />
    </div>
  );
}
