"use client";

import { motion } from "framer-motion";
import type { TemplateVariant } from "@/lib/preview-types";

interface TemplateSwitcherProps {
  variants: TemplateVariant[];
  activeIndex: number;
  onSwitch: (index: number) => void;
}

export function TemplateSwitcher({ variants, activeIndex, onSwitch }: TemplateSwitcherProps) {
  if (variants.length <= 1) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: 2 }}
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
        borderRadius: 16,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {variants.map((variant, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={variant.template}
            onClick={() => onSwitch(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.85rem",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? variant.theme.primary : "rgba(255,255,255,0.7)",
              background: isActive ? variant.theme.accent : "transparent",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: variant.theme.accent,
                border: isActive ? `2px solid ${variant.theme.primary}` : "2px solid transparent",
                flexShrink: 0,
              }}
            />
            <span className="switcher-label">{variant.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}
