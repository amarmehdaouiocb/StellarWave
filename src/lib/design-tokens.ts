/**
 * Design Tokens for Stellar Wave
 * Stellar Macro Theme - Light Premium with Electric Blue
 */

export const tokens = {
  colors: {
    // Background & Surface - Light theme
    background: {
      primary: "oklch(0.985 0.003 250)",
      pure: "oklch(1 0 0)",
      muted: "oklch(0.97 0.005 250)",
      dark: "oklch(0.12 0.02 250)", // For dark sections
    },

    // Glass effects - Light theme
    glass: {
      light: "oklch(1 0 0 / 70%)",
      medium: "oklch(1 0 0 / 80%)",
      heavy: "oklch(1 0 0 / 90%)",
      border: "oklch(0 0 0 / 8%)",
    },

    // Text hierarchy - Light theme
    text: {
      primary: "oklch(0.15 0.02 250)",
      secondary: "oklch(0.35 0.02 250)",
      muted: "oklch(0.50 0.02 250)",
      inverse: "oklch(0.98 0.005 250)",
    },

    // Accent - Electric Blue
    accent: {
      primary: "oklch(0.55 0.25 255)",
      light: "oklch(0.70 0.18 255)",
      dark: "oklch(0.45 0.25 255)",
    },

    // Legacy ember aliases (mapped to electric blue for compatibility)
    ember: {
      amber: "oklch(0.55 0.25 255)",
      coral: "oklch(0.70 0.18 255)",
      rose: "oklch(0.45 0.25 255)",
    },

    // Neutrals
    neutral: {
      50: "oklch(0.98 0.003 250)",
      100: "oklch(0.96 0.005 250)",
      200: "oklch(0.92 0.008 250)",
      300: "oklch(0.85 0.01 250)",
      400: "oklch(0.65 0.015 250)",
      500: "oklch(0.50 0.02 250)",
      600: "oklch(0.40 0.02 250)",
      700: "oklch(0.30 0.02 250)",
      800: "oklch(0.20 0.02 250)",
      900: "oklch(0.12 0.02 250)",
    },

    // Status colors
    status: {
      success: "oklch(0.65 0.19 145)",
      warning: "oklch(0.75 0.16 85)",
      error: "oklch(0.55 0.22 25)",
    },
  },

  // Border radius
  radius: {
    sm: "12px",
    md: "18px",
    lg: "24px",
    xl: "32px",
    button: "20px",
    chip: "999px",
    input: "16px",
    card: "28px",
  },

  // Shadows - Light theme, soft & elegant
  shadows: {
    xs: "0 1px 2px oklch(0.2 0.01 250 / 4%)",
    sm: "0 2px 8px oklch(0.2 0.01 250 / 4%), 0 8px 24px oklch(0.2 0.01 250 / 6%)",
    md: "0 4px 12px oklch(0.2 0.01 250 / 5%), 0 16px 48px oklch(0.2 0.01 250 / 8%)",
    lg: "0 8px 32px oklch(0.2 0.01 250 / 8%), 0 32px 80px oklch(0.2 0.01 250 / 12%)",
    xl: "0 12px 40px oklch(0.2 0.01 250 / 10%), 0 48px 100px oklch(0.2 0.01 250 / 15%)",
    glow: {
      blue: "0 0 40px oklch(0.55 0.25 255 / 20%)",
      subtle: "0 0 20px oklch(0.55 0.25 255 / 10%)",
    },
  },

  // Backdrop blur
  blur: {
    glass: "20px",
    heavy: "40px",
  },

  // Typography scale - MEGA Statement Typography
  typography: {
    // MEGA - Monumentale (up to 14rem/224px)
    mega: {
      size: "clamp(4rem, 15vw, 14rem)",
      lineHeight: "0.85",
      letterSpacing: "-0.05em",
      weight: "600",
    },
    megaLight: {
      size: "clamp(4rem, 15vw, 14rem)",
      lineHeight: "0.85",
      letterSpacing: "-0.04em",
      weight: "300",
    },
    // Number MEGA - Stats
    numberMega: {
      size: "clamp(6rem, 20vw, 18rem)",
      lineHeight: "0.8",
      letterSpacing: "-0.06em",
      weight: "700",
    },
    // Display / Headlines
    display: {
      h1: {
        size: "clamp(2.5rem, 8vw, 7rem)",
        lineHeight: "0.9",
        letterSpacing: "-0.04em",
        weight: "600",
      },
      h2: {
        size: "clamp(2rem, 5vw, 4rem)",
        lineHeight: "0.95",
        letterSpacing: "-0.03em",
        weight: "600",
      },
      h3: {
        size: "clamp(1.5rem, 4vw, 3.5rem)",
        lineHeight: "1.0",
        letterSpacing: "-0.025em",
        weight: "500",
      },
    },
    // Body text
    body: {
      lead: {
        size: "clamp(1.125rem, 1.5vw, 1.25rem)",
        lineHeight: "1.6",
        letterSpacing: "0",
        weight: "400",
      },
      base: {
        size: "1rem",
        lineHeight: "1.65",
        letterSpacing: "0.01em",
        weight: "400",
      },
      small: {
        size: "0.875rem",
        lineHeight: "1.5",
        letterSpacing: "0.01em",
        weight: "400",
      },
    },
    // UI elements
    ui: {
      caption: {
        size: "0.8125rem",
        lineHeight: "1.4",
        letterSpacing: "0.02em",
        weight: "500",
      },
      chip: {
        size: "0.75rem",
        lineHeight: "1",
        letterSpacing: "0.08em",
        weight: "600",
      },
      button: {
        size: "0.9375rem",
        lineHeight: "1",
        letterSpacing: "0.01em",
        weight: "600",
      },
    },
  },

  // Motion / Animation
  motion: {
    duration: {
      fast: "0.2s",
      base: "0.4s",
      slow: "0.6s",
      slower: "0.9s",
    },
    ease: {
      smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      gentle: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    // Scroll reveal
    reveal: {
      y: "30px",
      duration: "0.7s",
    },
    // Hover lift
    hover: {
      y: "-4px",
      shadow: "0 12px 40px oklch(0.2 0.01 250 / 12%)",
    },
  },

  // Spacing scale
  spacing: {
    section: {
      sm: "4rem",
      md: "6rem",
      lg: "8rem",
      xl: "12rem", // More generous for MEGA typography
    },
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      wide: "1440px",
    },
  },
} as const;

// Type exports for TypeScript
export type TokenColors = typeof tokens.colors;
export type TokenRadius = typeof tokens.radius;
export type TokenShadows = typeof tokens.shadows;
export type TokenTypography = typeof tokens.typography;
export type TokenMotion = typeof tokens.motion;

export default tokens;
