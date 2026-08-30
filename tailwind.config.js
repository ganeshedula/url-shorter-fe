/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"SF Pro"',
          "system-ui",
          "-apple-system-font",
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          "SFMono-Regular",
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        app: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-secondary": "var(--color-surface-secondary)",
        "surface-tertiary": "var(--color-surface-tertiary)",
        separator: "var(--color-separator)",
        "separator-opaque": "var(--color-separator-opaque)",
        
        /* Apple Label Hierarchy */
        label: "var(--color-label-primary)",
        "label-secondary": "var(--color-label-secondary)",
        "label-tertiary": "var(--color-label-tertiary)",
        "label-quaternary": "var(--color-label-quaternary)",

        /* Apple System Accents */
        "system-blue": "var(--color-system-blue)",
        "system-green": "var(--color-system-green)",
        "system-red": "var(--color-system-red)",
        "system-orange": "var(--color-system-orange)",
        "system-purple": "var(--color-system-purple)",
        "system-teal": "var(--color-system-teal)",
        "system-gray": "var(--color-system-gray)",

        /* Backward-compatibility aliases */
        primary: "var(--color-system-blue)",
        secondary: "var(--color-system-gray)",
        accent: "var(--color-system-purple)",
        success: "var(--color-system-green)",
        danger: "var(--color-system-red)",
        text: "var(--color-label-primary)",
        muted: "var(--color-label-secondary)",
        border: "var(--color-separator)",
      },
      boxShadow: {
        apple: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)",
        "apple-elevated": "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)",
        "apple-sheet": "0 -4px 24px rgba(0, 0, 0, 0.12)",
        "apple-popover": "0 10px 30px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        "apple-sm": "8px",
        "apple-md": "12px",
        "apple-lg": "16px",
        "apple-xl": "20px",
        "apple-2xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "scale-in": "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
