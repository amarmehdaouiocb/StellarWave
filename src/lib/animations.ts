import { Variants, Transition } from "framer-motion";

// Default easing for smooth, premium feel
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.4, 0, 0.2, 1] as const;

// Base transition settings
export const defaultTransition: Transition = {
  duration: 0.6,
  ease: easeOut,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
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
    transition: defaultTransition,
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
    transition: defaultTransition,
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
    transition: defaultTransition,
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
    transition: defaultTransition,
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: easeOut },
  },
  tap: {
    scale: 0.98,
  },
};

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    transition: { duration: 0.3, ease: easeOut },
  },
};

// Stagger container
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

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Slide animations
export const slideInFromLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
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
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
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
    transition: { duration: 0.5, ease: easeOut },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

// Hero specific animations
export const heroTitle: Variants = {
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
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export const heroSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.2,
    },
  },
};

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
      delay: 0.4,
    },
  },
};

// Counter animation helper
export const counterAnimation = {
  duration: 2,
  ease: easeOut,
};

// Parallax scroll effect
export const parallaxY = (strength: number = 50) => ({
  initial: { y: -strength },
  animate: { y: strength },
});

// Glow pulse animation
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(34, 211, 238, 0.2)",
      "0 0 40px rgba(34, 211, 238, 0.4)",
      "0 0 20px rgba(34, 211, 238, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Aurora gradient animation
export const auroraGradient: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Reveal on scroll wrapper props helper
export const revealOnScroll = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" },
};

// Nav pill animation
export const navPillIndicator: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

// Carousel slide animation
export const carouselSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  }),
};

// Accordion animation
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: easeInOut },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: easeOut },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

// Morphing blob background
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
      ease: "easeInOut",
    },
  },
};

// Reduced motion variants (returns static state)
export const getReducedMotionVariants = (variants: Variants): Variants => {
  return {
    hidden: variants.visible || variants.animate || {},
    visible: variants.visible || variants.animate || {},
  };
};
