/**
 * Design Tokens for Stellar Wave
 * Centralized design system values
 */

export const tokens = {
  colors: {
    // Background & Surface
    background: {
      dark: "oklch(0.08 0.01 60)",
      darker: "oklch(0.06 0.008 60)",
      surface: "oklch(0.12 0.012 60)",
    },

    // Glass effects
    glass: {
      light: "oklch(1 0 0 / 4%)",
      medium: "oklch(1 0 0 / 8%)",
      heavy: "oklch(1 0 0 / 12%)",
      border: "oklch(1 0 0 / 10%)",
    },

    // Text hierarchy
    text: {
      primary: "oklch(0.98 0.01 60)",
      secondary: "oklch(0.7 0.01 60)",
      muted: "oklch(0.55 0.01 60)",
      inverse: "oklch(0.12 0.01 60)",
    },

    // Accent - Ember palette (orange/amber)
    accent: {
      amber: "oklch(0.79 0.16 85)",
      coral: "oklch(0.705 0.185 47)",
      rose: "oklch(0.65 0.22 350)",
    },

    // Power color - Electric Blue
    power: {
      blue: "oklch(0.65 0.22 255)",
      blueLight: "oklch(0.75 0.18 255)",
      blueDark: "oklch(0.55 0.22 255)",
    },

    // Alternative power - Warm Yellow
    powerAlt: {
      yellow: "oklch(0.88 0.18 95)",
      yellowLight: "oklch(0.92 0.14 95)",
      yellowDark: "oklch(0.78 0.18 95)",
    },

    // Neutrals (for light cards)
    neutral: {
      50: "oklch(0.98 0.005 60)",
      100: "oklch(0.95 0.008 60)",
      200: "oklch(0.90 0.01 60)",
      300: "oklch(0.85 0.012 60)",
      800: "oklch(0.25 0.01 60)",
      900: "oklch(0.15 0.01 60)",
    },

    // Status colors
    status: {
      success: "oklch(0.72 0.19 145)",
      warning: "oklch(0.80 0.16 85)",
      error: "oklch(0.65 0.22 25)",
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

  // Shadows (very diffuse)
  shadows: {
    sm: "0 4px 20px -4px oklch(0 0 0 / 20%)",
    md: "0 8px 40px -8px oklch(0 0 0 / 25%)",
    lg: "0 16px 60px -12px oklch(0 0 0 / 30%)",
    glow: {
      amber: "0 0 40px -8px oklch(0.79 0.16 85 / 40%)",
      blue: "0 0 40px -8px oklch(0.65 0.22 255 / 40%)",
    },
  },

  // Backdrop blur (single value for consistency)
  blur: {
    glass: "40px",
    heavy: "60px",
  },

  // Typography scale
  typography: {
    // Display / Headlines
    display: {
      h1: {
        size: "clamp(3rem, 5vw, 4.5rem)", // 48-72px
        lineHeight: "0.95",
        letterSpacing: "-0.04em",
        weight: "800",
      },
      h2: {
        size: "clamp(2.5rem, 4vw, 3.25rem)", // 40-52px
        lineHeight: "1",
        letterSpacing: "-0.03em",
        weight: "700",
      },
      h3: {
        size: "clamp(1.75rem, 3vw, 2.125rem)", // 28-34px
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
        weight: "600",
      },
    },
    // Body text
    body: {
      lead: {
        size: "clamp(1.125rem, 1.5vw, 1.25rem)", // 18-20px
        lineHeight: "1.6",
        letterSpacing: "0",
        weight: "400",
      },
      base: {
        size: "1rem", // 16px
        lineHeight: "1.65",
        letterSpacing: "0.01em",
        weight: "400",
      },
      small: {
        size: "0.875rem", // 14px
        lineHeight: "1.5",
        letterSpacing: "0.01em",
        weight: "400",
      },
    },
    // UI elements
    ui: {
      caption: {
        size: "0.8125rem", // 13px
        lineHeight: "1.4",
        letterSpacing: "0.02em",
        weight: "500",
      },
      chip: {
        size: "0.75rem", // 12px
        lineHeight: "1",
        letterSpacing: "0.04em",
        weight: "600",
      },
      button: {
        size: "0.9375rem", // 15px
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
      y: "20px",
      duration: "0.7s",
    },
    // Hover lift
    hover: {
      y: "-6px",
      shadow: "0 12px 40px -8px oklch(0 0 0 / 30%)",
    },
  },

  // Spacing scale
  spacing: {
    section: {
      sm: "4rem",
      md: "6rem",
      lg: "8rem",
      xl: "10rem",
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
