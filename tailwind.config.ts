import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#e5e7eb",
        gray: "#e5e7eb",
      },
      colors: {
        gray: {
          250: "#e5e7eb",
        },
      },
    },
  },
  plugins: [],
};

export default config;
