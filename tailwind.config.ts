import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'wiggle-fast': 'wiggle .15s'
      },
      backgroundImage: {
        'template-page': 'linear-gradient(215deg, #ffd998, #ffbd4f)'
      },
      boxShadow: {
        'template-page': '-4px 3px 5px 0px #00000026'
      },
      transitionProperty: {
        'menu-item-show': 'height 0s 0s, opacity .3s 50ms, transform .3s 50ms'
      }
    },
  },
  plugins: [],
} satisfies Config;
