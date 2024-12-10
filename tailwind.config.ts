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
        primary: "#EDE5E3",
        card1: "#DEECF2",
        buttonDark: "#053558",
        buttonDarkHover: "#0A6C9C",
        footerHeader: "#053558",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        lacquer: ["var(--font-lacquer)", "cursive"],
      },
      backgroundImage: {
        "concert-background": "url('/images/background.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
