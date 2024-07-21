import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:{
          default:"#10857f",
          100:"#edf3ff"
        },
        text: {
          DEFAULT: "#363C4F",
          1: "#363C4F",
          2: "#9A9DA5",
          3: "#CDCED3",
          4: "#B0B7C3",
        },
        background: {
          DEFAULT: "#FFFFFF",
          1: "#FFFFFF",
          2: "#FAFBFC",
          3: "#F3F3F3",
          4: "#C1C7D0",
          5: "#F6F6F6",
          6: "#F5F3F4",
        },
      }
    },
  },
  plugins: [],
};
export default config;
