"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TEMPLATE_FONT_VARS } from "@/lib/template-registry";
import { staggerContainer, professionalVariants } from "@/lib/preview-animations";
import type { PreviewProps } from "@/lib/preview-types";

const fonts = TEMPLATE_FONT_VARS.professional;

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const numMatch = target.match(/[\d.]+/);
  const [current, setCurrent] = useState(0);

  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const prefix = numMatch ? target.slice(0, target.indexOf(numMatch[0])) : "";
  const rest = numMatch ? target.slice(target.indexOf(numMatch[0]) + numMatch[0].length) : target;
  const isDecimal = numMatch ? numMatch[0].includes(".") : false;

  useEffect(() => {
    if (num === 0) return;

    const duration = 1500;
    const steps = 30;
    const increment = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(step >= steps ? num : increment * step);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  if (!numMatch) return <>{target}</>;
  return <>{prefix}{isDecimal ? current.toFixed(1) : Math.round(current)}{rest}{suffix}</>;
}

export function TrustBar({ prospect, theme }: PreviewProps) {
  const stats = [
    {
      value: prospect.note ? `${prospect.note}/5` : "—",
      label: "Note Google",
      show: true,
      icon: "★",
    },
    {
      value: prospect.nb_avis > 0 ? `${prospect.nb_avis}+` : "—",
      label: "Avis clients",
      show: true,
      icon: "💬",
    },
    {
      value: "7j/7",
      label: "Disponibilité",
      show: true,
      icon: "⏰",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      style={{
        background: theme.bgAlt,
        borderTop: `3px solid ${theme.accent}`,
        padding: "32px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          textAlign: "center",
        }}
      >
        {stats
          .filter((s) => s.show)
          .map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={professionalVariants.trustStat}
              style={{
                borderRight: index < stats.filter(s => s.show).length - 1 ? `1px solid ${theme.accent}20` : "none",
                paddingRight: 24,
              }}
            >
              <div style={{ fontSize: "1.2rem", marginBottom: 4 }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  fontWeight: 700,
                  color: theme.accent,
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                <CountUp target={stat.value} />
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: theme.primary,
                  opacity: 0.6,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
