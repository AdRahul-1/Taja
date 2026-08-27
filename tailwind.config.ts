import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme A: Heritage Gold Palette
        navy: {
          950: "#0b172d",
          900: "#142B54", // Primary Hero & Dark Section Background
          800: "#1b376b",
          700: "#24498e",
        },
        cream: {
          50: "#FBF3E7", // Primary Warm Light Panel Background
          100: "#f7ebd7",
          200: "#efdec0",
          300: "#e5cca0",
        },
        heritageRed: {
          DEFAULT: "#B91C1C", // Heritage Red Accent Button & Price Pill
          hover: "#991b1b",
          dark: "#7f1d1d",
          light: "#dc2626",
        },
        gold: {
          DEFAULT: "#C9982E", // Heritage Gold Hairlines, Dividers & Highlights
          light: "#dfb14b",
          dark: "#a67b21",
          muted: "rgba(201, 152, 46, 0.35)",
        },
        espresso: {
          900: "#241C15", // Rich Body Copy on Cream panels
          800: "#362a20",
          700: "#4f3e30",
          muted: "#6e5d4e",
        },

        // Standard shadcn variable tokens mapped to Theme A
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#B91C1C",
          foreground: "#FBF3E7",
        },
        secondary: {
          DEFAULT: "#142B54",
          foreground: "#FBF3E7",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#C9982E",
          foreground: "#142B54",
        },
        destructive: {
          DEFAULT: "#B91C1C",
          foreground: "#FBF3E7",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#C9982E",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        display: ["var(--font-fraunces)", "serif"],
        bengaliDisplay: ["var(--font-tiro-bangla)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        bengaliSans: ["var(--font-noto-bangla)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-4deg)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        subtlePulse: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.45" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "subtle-pulse": "subtlePulse 4s ease-in-out infinite",
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(201, 152, 46, 0.25)",
        "red-glow": "0 0 35px -5px rgba(185, 28, 28, 0.35)",
        "navy-depth": "0 25px 50px -12px rgba(11, 23, 45, 0.6)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
