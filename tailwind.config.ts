import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10B981", // Islamic Emerald Green
          light: "#D1FAE5",
          dark: "#065F46",
        },
        secondary: {
          DEFAULT: "#F59E0B", // Amber Gold (Light/Knowledge)
          light: "#FEF3C7",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#8B5CF6", // Soft purple for gamification
          light: "#EDE9FE",
          dark: "#6D28D9",
        },
        danger: {
          DEFAULT: "#F87171", // Soft Coral
          light: "#FEE2E2",
          dark: "#B91C1C",
        },
        neutralWarm: {
          DEFAULT: "#FAF9F6", // Warm white
          card: "#FFFDF9",
          border: "#EAE6DF",
        },
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        amiri: ["var(--font-amiri)", "serif"],
        fredoka: ["var(--font-fredoka)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
