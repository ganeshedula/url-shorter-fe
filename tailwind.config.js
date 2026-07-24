/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        app: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
      boxShadow: {
        glow: "0 24px 60px rgba(37, 99, 235, 0.18)",
        soft: "0 20px 50px rgba(15, 23, 42, 0.08)",
        glass: "0 18px 45px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
        aurora:
          "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 34%), radial-gradient(circle at top right, rgba(124,58,237,0.16), transparent 28%), radial-gradient(circle at bottom, rgba(6,182,212,0.12), transparent 35%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.55" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseRing: "pulseRing 2.5s ease-out infinite",
      },
    },
  },
  plugins: [],
};
