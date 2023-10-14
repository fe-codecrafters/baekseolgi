import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          default: "#F3F3F3",
          pink: "#FFEBF3",
          green: "#D5FBF3",
          yellow: "#FEF2DA",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "600": "600px",
        "150": "150px",
      },
      height: {
        "80": "80px",
        "50": "50px",
      },
    },
  },
  plugins: [],
};
export default config;
