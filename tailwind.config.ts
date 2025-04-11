/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#e32929",
          "primary-dark": "#c81e1e",
          secondary: "#333333",
          light: "#f5f5f5",
          gray: {
            DEFAULT: "#666666",
            light: "#e0e0e0",
          },
        },
        fontFamily: {
          sans: ["var(--font-inter)", "system-ui", "sans-serif"],
          poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        },
        animation: {
          "brand-scroll": "scroll 30s linear infinite",
        },
        keyframes: {
          scroll: {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-100%)" },
          },
        },
      },
    },
    plugins: [],
  };