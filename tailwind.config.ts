import type { Config } from "tailwindcss";
import tailwindcssRtl from "tailwindcss-rtl";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          primary: "#0B0B0C",
          secondary: "#1B1E24",
          tertiary: "#F8FAFC",
        },
        accent: {
          gold: "#C5A46D",
          teal: "#0EA5A6",
          sky: "#38BDF8",
        },
        neutral: {
          sand: "#E8DCC8",
          white: "#FFFFFF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#E2E8F0",
          dark: "#111827",
        },
        border: {
          subtle: "#334155",
          light: "#CBD5E1",
        },
        state: {
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "0.75rem",
        DEFAULT: "1rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
      boxShadow: {
        "elevate-sm": "0 6px 16px rgba(11, 11, 12, 0.08)",
        "elevate-lg": "0 24px 48px rgba(11, 11, 12, 0.16)",
        "glow-gold": "0 0 24px rgba(197, 164, 109, 0.35)",
        "glow-teal": "0 0 24px rgba(14, 165, 166, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "gradient-flow": "gradientFlow 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundImage: {
        "desert-sunset":
          "linear-gradient(135deg, #FF6B35 0%, #F7931E 25%, #FDC830 50%, #F37335 75%, #C94B4B 100%)",
        "arabian-night":
          "linear-gradient(135deg, #0B0B0C 0%, #1B1E24 25%, #2C3E50 50%, #34495E 75%, #1B1E24 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(197, 164, 109, 0.3), transparent)",
      },
    },
  },
  plugins: [tailwindcssRtl],
};

export default config;
