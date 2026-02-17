/**
 * Variants framer-motion partagés pour les templates de preview.
 * Chaque template peut utiliser ces variants directement ou les personnaliser.
 */
import type { Variants, Transition } from "framer-motion";

// ── Transitions par template ──────────────────────────────

export const templateTransitions = {
  editorial: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
  portfolio: { type: "spring", damping: 20, stiffness: 100 } satisfies Transition,
  professional: { duration: 0.4, ease: "easeOut" } satisfies Transition,
  modern: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
} as const;

// ── Variants partagés ─────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)" },
};

export const decorativeReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -5 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

// ── Variants spécialisés par template ─────────────────────

export const editorialVariants = {
  heroTitle: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  } satisfies Variants,
  heroTagline: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } },
  } satisfies Variants,
  parallaxPhoto: {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
  } satisfies Variants,
};

export const portfolioVariants = {
  heroSplit: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20 } },
  } satisfies Variants,
  heroPhoto: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20, delay: 0.2 } },
  } satisfies Variants,
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
  } satisfies Variants,
};

export const professionalVariants = {
  trustStat: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  } satisfies Variants,
  serviceCard: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } satisfies Variants,
};
