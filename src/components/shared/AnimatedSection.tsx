"use client";

import { ReactNode } from "react";
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
}

export function AnimatedSection({
  children,
  className,
  variants = fadeInUp,
  stagger = false,
  delay = 0,
  id,
  as = "section",
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  const animationVariants = prefersReducedMotion
    ? getReducedMotionVariants(variants)
    : variants;

  const containerVariants = stagger
    ? prefersReducedMotion
      ? getReducedMotionVariants(staggerContainer)
      : staggerContainer
    : animationVariants;

  return (
    <Component
      id={id}
      className={cn(className)}
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
