"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainer,
  getReducedMotionVariants,
} from "@/lib/animations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  stagger?: boolean;
  delay?: number;
  id?: string;
  as?: "section" | "div" | "article" | "aside";
  style?: React.CSSProperties;
}

export function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  stagger = false,
  delay = 0,
  id,
  as = "section",
  style,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sectionRef = useRef<any>(null);

  const animationVariants = prefersReducedMotion
    ? getReducedMotionVariants(variants)
    : variants;

  const containerVariants = stagger
    ? prefersReducedMotion
      ? getReducedMotionVariants(staggerContainer)
      : staggerContainer
    : animationVariants;

  // Fallback: force section visible after 2s for headless/screenshot environments
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.style.opacity = "1";
        sectionRef.current.style.transform = "none";
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Component
      ref={sectionRef}
      id={id}
      className={cn(className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

// Stagger item wrapper for children
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function AnimatedItem({
  children,
  className,
  variants = fadeInUp,
}: AnimatedItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const animationVariants = prefersReducedMotion
    ? getReducedMotionVariants(variants)
    : variants;

  return (
    <motion.div className={cn(className)} variants={animationVariants}>
      {children}
    </motion.div>
  );
}
