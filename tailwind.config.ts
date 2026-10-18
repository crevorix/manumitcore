import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Foundation palette – Emerald + Gold
        emerald: {
          DEFAULT: "#00A86B",
          dark: "#007A4D",
          light: "#33BC85",
          50: "#E6F7F1",
          100: "#C0ECD8",
          200: "#80D9B2",
          300: "#40C68B",
          400: "#00A86B",
          500: "#008A57",
          600: "#007A4D",
          700: "#005A38",
          800: "#003D26",
          900: "#001F13",
        },
        gold: {
          DEFAULT: "#D4AF37",
          dark: "#A88A1E",
          light: "#E8CC6A",
          metallic: "#C9A84C",
          50: "#FBF7E8",
          100: "#F6EECE",
          200: "#EDDD9D",
          300: "#E4CB6D",
          400: "#D4AF37",
          500: "#B8961F",
          600: "#A88A1E",
          700: "#8A6F18",
          800: "#6B5412",
          900: "#4D3A0B",
        },
        ruby: {
          DEFAULT: "#9B111E",
          dark: "#7A0D17",
          light: "#C41527",
          50: "#FDECEA",
          100: "#FAC9CC",
          200: "#F59399",
          300: "#EF5D67",
          400: "#C41527",
          500: "#9B111E",
          600: "#7A0D17",
          700: "#5A0A12",
          800: "#3B060C",
          900: "#1D0306",
        },
        jade: {
          DEFAULT: "#00A86B",
          dark: "#007A4D",
        },
        // Coin palette
        coin: {
          black: "#0D0D0D",
          "near-black": "#1A1A1A",
          surface: "#242424",
          border: "#333333",
        },
        // Neutral / background
        cream: "#F8F5EE",
        "off-white": "#F2EFE9",
        charcoal: "#1C1C1C",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #E8CC6A 40%, #C9A84C 70%, #A88A1E 100%)",
        "emerald-gradient":
          "linear-gradient(135deg, #007A4D 0%, #00A86B 50%, #33BC85 100%)",
        "hero-gradient":
          "linear-gradient(160deg, #0D1F17 0%, #0A2E1E 40%, #0D0D0D 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.3)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.4)",
        emerald: "0 0 20px rgba(0, 168, 107, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 20px 60px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212,175,55,0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
