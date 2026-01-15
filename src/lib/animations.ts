import { Variants, Transition, TargetAndTransition } from "framer-motion";

/* ================================================
   PREMIUM EASING LIBRARY
   Distinct curves for different contexts
   ================================================ */

export const easings = {
  // Smooth - Default premium feel, elegant
  smooth: [0.25, 0.46, 0.45, 0.94] as const,

  // Snappy - Quick response with subtle overshoot
  snappy: [0.68, -0.05, 0.27, 1.05] as const,

  // Dramatic - Slow start, fast end (for hero reveals)
  dramatic: [0.16, 1, 0.3, 1] as const,

  // Gentle - Material Design standard
  gentle: [0.4, 0, 0.2, 1] as const,

  // Bounce - Subtle overshoot (use sparingly)
  bounce: [0.175, 0.885, 0.32, 1.275] as const,

  // Expo out - Very fast start, slow end
  expoOut: [0.19, 1, 0.22, 1] as const,

  // Circ out - Natural deceleration
  circOut: [0, 0.55, 0.45, 1] as const,

  // Back out - Slight overshoot
  backOut: [0.34, 1.56, 0.64, 1] as const,

  // Linear - For continuous animations
  linear: [0, 0, 1, 1] as const,

  // Ease in - For exit animations
  easeIn: [0.42, 0, 1, 1] as const,
} as const;

// Legacy exports for compatibility
export const easeOut = easings.dramatic;
export const easeInOut = easings.gentle;

/* ================================================
   TRANSITION PRESETS - Context-aware
   ================================================ */

export const transitions = {
  // Default - Most elements
  default: {
    duration: 0.6,
    ease: easings.smooth,
  } as Transition,

  // Fast - Quick feedback (buttons, toggles)
  fast: {
    duration: 0.25,
    ease: easings.snappy,
  } as Transition,

  // Slow - Hero reveals, important content
  slow: {
    duration: 1,
    ease: easings.dramatic,
  } as Transition,

  // Spring - Natural physics-based
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  } as Transition,

  // Spring bouncy - For playful elements
  springBouncy: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  } as Transition,

  // Spring stiff - For snappy interactions
  springStiff: {
    type: "spring",
    stiffness: 500,
    damping: 35,
  } as Transition,

  // Micro - Very subtle, quick
  micro: {
    duration: 0.15,
    ease: easings.gentle,
  } as Transition,

  // Dramatic - For hero elements
  dramatic: {
    duration: 0.8,
    ease: easings.dramatic,
  } as Transition,
} as const;

// Legacy exports
export const defaultTransition = transitions.default;
export const springTransition = transitions.spring;

/* ================================================
   FADE ANIMATIONS
   ================================================ */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.default,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.default,
  },
};

/* ================================================
   BLUR REVEAL ANIMATIONS - Premium
   ================================================ */

export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.dramatic,
    },
  },
};

export const blurInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easings.dramatic,
    },
  },
};

export const blurInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

/* ================================================
   SCALE ANIMATIONS
   ================================================ */

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.default,
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.97,
    transition: transitions.micro,
  },
};

/* ================================================
   CARD HOVER ANIMATIONS - Premium
   ================================================ */

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -2px rgba(0,0,0,0.15)",
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.35), 0 0 30px rgba(34, 211, 238, 0.15)",
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

export const cardHoverGlow: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  hover: {
    y: -6,
    boxShadow: [
      "0 4px 15px rgba(0,0,0,0.2)",
      "0 15px 35px rgba(0,0,0,0.3), 0 0 40px rgba(34, 211, 238, 0.2)",
    ],
    transition: {
      duration: 0.35,
      ease: easings.smooth,
    },
  },
};

export const cardHoverTilt: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
};

/* ================================================
   STAGGER CONTAINERS - Multiple speeds
   ================================================ */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.default,
  },
};

export const staggerItemBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

/* ================================================
   SLIDE ANIMATIONS
   ================================================ */

export const slideInFromLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easings.dramatic },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easings.gentle },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easings.dramatic },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easings.gentle },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easings.dramatic },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easings.gentle },
  },
};

/* ================================================
   HERO ANIMATIONS - Cinematic
   ================================================ */

export const heroTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: easings.dramatic,
    },
  },
};

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.smooth,
      delay: 0.3,
    },
  },
};

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
      delay: 0.5,
    },
  },
};

export const heroBackground: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: easings.gentle,
    },
  },
};

/* ================================================
   CHARACTER-BY-CHARACTER TEXT ANIMATION
   ================================================ */

export const textCharacterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const textCharacter: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: easings.smooth,
    },
  },
};

export const textWordContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const textWord: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: easings.dramatic,
    },
  },
};

/* ================================================
   COUNTER ANIMATION
   ================================================ */

export const counterAnimation = {
  duration: 2.5,
  ease: easings.expoOut,
};

/* ================================================
   PARALLAX & SCROLL EFFECTS
   ================================================ */

export const parallaxY = (strength: number = 50) => ({
  initial: { y: -strength },
  animate: { y: strength },
});

export const parallaxScale = (min: number = 0.95, max: number = 1.05) => ({
  initial: { scale: min },
  animate: { scale: max },
});

export const scrollFadeOut: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
};

/* ================================================
   GLOW & PULSE ANIMATIONS
   ================================================ */

export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(34, 211, 238, 0.2)",
      "0 0 50px rgba(34, 211, 238, 0.4)",
      "0 0 20px rgba(34, 211, 238, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

export const glowPulseViolet: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(168, 85, 247, 0.2)",
      "0 0 50px rgba(168, 85, 247, 0.4)",
      "0 0 20px rgba(168, 85, 247, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

export const borderGlowPulse: Variants = {
  initial: {
    borderColor: "rgba(34, 211, 238, 0.2)",
  },
  animate: {
    borderColor: [
      "rgba(34, 211, 238, 0.2)",
      "rgba(34, 211, 238, 0.5)",
      "rgba(34, 211, 238, 0.2)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

/* ================================================
   AURORA GRADIENT ANIMATION
   ================================================ */

export const auroraGradient: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: easings.linear,
    },
  },
};

export const auroraShift: Variants = {
  animate: {
    background: [
      "radial-gradient(ellipse at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
      "radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
      "radial-gradient(ellipse at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
      "radial-gradient(ellipse at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
    ],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: easings.linear,
    },
  },
};

/* ================================================
   REVEAL ON SCROLL HELPER
   ================================================ */

export const revealOnScroll = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
};

export const revealOnScrollEager = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-50px" },
};

/* ================================================
   NAV & CAROUSEL ANIMATIONS
   ================================================ */

export const navPillIndicator: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: transitions.fast,
  },
};

export const carouselSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    rotateY: direction < 0 ? 15 : -15,
    transition: {
      duration: 0.5,
      ease: easings.gentle,
    },
  }),
};

export const carouselSlideSimple: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "50%" : "-50%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "50%" : "-50%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easings.gentle,
    },
  }),
};

/* ================================================
   ACCORDION ANIMATIONS
   ================================================ */

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.35, ease: easings.gentle },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: easings.smooth },
      opacity: { duration: 0.35, delay: 0.1 },
    },
  },
};

export const accordionIcon: Variants = {
  collapsed: { rotate: 0 },
  expanded: {
    rotate: 45,
    transition: {
      duration: 0.3,
      ease: easings.smooth,
    },
  },
};

/* ================================================
   BUTTON ANIMATIONS - Premium
   ================================================ */

export const buttonPress: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.97,
    transition: transitions.micro,
  },
};

export const buttonGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(34, 211, 238, 0)",
  },
  hover: {
    boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
    transition: transitions.fast,
  },
};

export const buttonIconSlide: Variants = {
  initial: { x: 0 },
  hover: {
    x: 4,
    transition: transitions.fast,
  },
};

export const buttonIconRotate: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 45,
    transition: transitions.fast,
  },
};

/* ================================================
   MORPHING BLOB
   ================================================ */

export const morphBlob: Variants = {
  animate: {
    borderRadius: [
      "60% 40% 30% 70%/60% 30% 70% 40%",
      "30% 60% 70% 40%/50% 60% 30% 60%",
      "60% 40% 30% 70%/60% 30% 70% 40%",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

/* ================================================
   ICON ANIMATIONS
   ================================================ */

export const iconBounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

export const iconPulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

export const iconRotate: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

/* ================================================
   LOADING ANIMATIONS
   ================================================ */

export const spinnerRotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: easings.linear,
    },
  },
};

export const dotsLoading: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

/* ================================================
   REDUCED MOTION HELPER
   ================================================ */

export const getReducedMotionVariants = (variants: Variants): Variants => {
  return {
    hidden: variants.visible || variants.animate || {},
    visible: variants.visible || variants.animate || {},
  };
};

/* ================================================
   TIMELINE ANIMATIONS - Process section
   ================================================ */

export const timelineLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: easings.smooth,
    },
  },
};

export const timelineStep: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: easings.smooth,
    },
  }),
};

/* ================================================
   FLOATING ANIMATION
   ================================================ */

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};

export const floatSlow: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: easings.gentle,
    },
  },
};
