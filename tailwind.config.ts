import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.10)",
        glow: "0 0 0 1px rgba(59,130,246,0.25), 0 20px 60px rgba(37,99,235,0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
