/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Roboto": ["Roboto", "sans-serif"],
    },
    extend: {
      dropShadow: {
        "xl": "0 5px 10px rgb(24, 24, 27)",
      }
    },
  },
  plugins: [],
}

