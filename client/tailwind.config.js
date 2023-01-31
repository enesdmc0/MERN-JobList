/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tema": "#C0CAAD",
        "tema2": "#9DA9A0",
        "tema3": "#28112B",
      }
    },
  },
  plugins: [],
}