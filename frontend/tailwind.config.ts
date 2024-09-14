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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#0d6efd',
        success: '#198754',
        secondary: '#6c757d',
        info: '#0dcaf0',
        danger: '#dc3545',
        warning: '#ffc107',
        light: '#f8f9fa',
        dark: '#212529',
      },
    },
  },
  plugins: [],
};
export default config;
