import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: {
          0: "#0a0a0a",
          1: "#0f0f0f",
          2: "#111111",
          3: "#141414",
        },
        border: {
          subtle: "#1a1a1a",
          default: "#222222",
          hover: "#333333",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1a1",
          muted: "#666666",
          disabled: "#555555",
        },
        accent: {
          primary: "#4F8CFF",
          hover: "#3f73d1",
        },
        semantic: {
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3D56F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;