"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  as?: "section" | "div";
  viewportMargin?: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedSection({
  children,
  variants = defaultVariants,
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  className,
  style,
  as = "section",
  viewportMargin = "-80px",
}: AnimatedSectionProps) {
  const props = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, margin: viewportMargin },
    variants,
    transition,
    className,
    style,
  };

  if (as === "div") {
    return <motion.div {...props}>{children}</motion.div>;
  }

  return <motion.section {...props}>{children}</motion.section>;
}
