"use client";

import type { TemplateName } from "@/lib/template-registry";

interface SectionDividerProps {
  template: TemplateName;
  accentColor: string;
  bgFrom: string;
  bgTo: string;
}

export function SectionDivider({ template, accentColor, bgFrom, bgTo }: SectionDividerProps) {
  if (template === "editorial") {
    // Ligne fine + losange central
    return (
      <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: bgFrom }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: `${accentColor}25` }} />
        <div
          style={{
            position: "relative",
            width: 10,
            height: 10,
            background: accentColor,
            transform: "rotate(45deg)",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  if (template === "portfolio") {
    // Wave SVG
    return (
      <div style={{ lineHeight: 0, background: bgFrom }}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: 40, display: "block" }}
        >
          <path
            d="M0,20 C200,0 400,40 600,20 C800,0 1000,40 1200,20 L1200,40 L0,40 Z"
            fill={bgTo}
          />
        </svg>
      </div>
    );
  }

  if (template === "professional") {
    // Ligne accent full-width
    return (
      <div style={{ height: 3, background: `${accentColor}30` }} />
    );
  }

  // modern — dégradé fondu
  return (
    <div
      style={{
        height: 40,
        background: `linear-gradient(${bgFrom}, ${bgTo})`,
      }}
    />
  );
}
