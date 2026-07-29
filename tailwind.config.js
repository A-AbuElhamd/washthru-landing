/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          hover: 'rgb(var(--color-surface-hover) / <alpha-value>)',
        },
        fg: {
          DEFAULT: 'rgb(var(--color-fg) / <alpha-value>)',
          muted: 'rgb(var(--color-fg-muted) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          dark: 'rgb(var(--color-brand-dark) / <alpha-value>)',
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        live: 'rgb(var(--color-live) / <alpha-value>)',
        footer: {
          bg: 'rgb(var(--color-footer-bg) / <alpha-value>)',
          fg: 'rgb(var(--color-footer-fg) / <alpha-value>)',
        },
      },
      fontFamily: {
        // Real site uses ONE font-family everywhere (`body { font-family:
        // Montserrat arabic, sans-serif }`), for Arabic AND Latin text alike
        // — not a per-locale pairing. Self-hosted real TTF, see globals.css
        // @font-face. `arabic` kept as an alias so no call site needs to
        // change; both now resolve to the same real family.
        sans: ['Montserrat Arabic', 'sans-serif'],
        arabic: ['Montserrat Arabic', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
