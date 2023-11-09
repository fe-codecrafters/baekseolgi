import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: colors.black,
          darkGray: "#7F7F7F",
          gray: "#D9D9D9",
          lightGray: "#F2F2F2",
          white: "#FFFFFF",
        },
        seolgi: {
          default: "#FFFFFF",
          pink: "#FFEBF3",
          blue: "#D5FBF3",
          yellow: "#FEF2DA",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        seolgiClick: {
          "25%": { transform: "scale(0.8,1.2) rotate(-2deg)" },
          "50%": { transform: "scale(1.1,0.9) rotate(0deg)" },
          "75%": { transform: "scale(0.9,1.1) rotate(2deg)" },
        },
        seolgiJump: {
          "50%": { transform: "scale(0.9,1.1) translate(0, -100%)" },
          "75%": { transform: "scale(1.1,0.7) translate(0, 30%)" },
        },
        loadingIndicatorBar: {
          "0%": { width: "20px" },
          "40%": { width: "100%" },
          "90%": { width: "20px" },
          "100%": { width: "18px" },
        },
      },
      animation: {
        seolgiClick: "seolgiClick 0.3s ease-in-out",
        loadingIndicatorBar: "loadingIndicatorBar 2s ease-in-out infinite",
        seolgiJump: "seolgiJump 1s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
