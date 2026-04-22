"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LiquidGlassCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function LiquidGlassCard({ children, className, delay = 0 }: LiquidGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay, 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className={cn(
        "v3-liquid-glass rounded-3xl p-8 relative overflow-hidden group",
        className
      )}
    >
      {/* Subtle hover gradient that follows mouse could be added here, but static glow for now */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--v3-ember-amber)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
