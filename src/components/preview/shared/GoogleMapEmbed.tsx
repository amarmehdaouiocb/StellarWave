"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/preview-animations";
import type { TemplateName } from "@/lib/template-registry";
import type { Transition } from "framer-motion";

interface GoogleMapEmbedProps {
  address: string;
  template: TemplateName;
  accentColor: string;
  primaryColor: string;
  bgColor: string;
  transition: Transition;
}

const templateStyles: Record<TemplateName, (accent: string) => React.CSSProperties> = {
  editorial: (accent) => ({
    borderRadius: 4,
    border: `1px solid ${accent}30`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  }),
  portfolio: () => ({
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  }),
  professional: (accent) => ({
    borderRadius: 4,
    borderLeft: `4px solid ${accent}`,
  }),
  modern: (accent) => ({
    borderRadius: 8,
    borderTop: `3px solid ${accent}`,
  }),
};

export function GoogleMapEmbed({
  address,
  template,
  accentColor,
  transition: trans,
}: GoogleMapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey) return null;

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`;
  const style = templateStyles[template](accentColor);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={trans}
      style={{ overflow: "hidden", ...style }}
    >
      <iframe
        src={src}
        width="100%"
        height="300"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title={`Carte — ${address}`}
      />
    </motion.div>
  );
}
