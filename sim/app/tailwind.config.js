/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1378A5",
        secondary: "#000",
      },
      fontFamily: {
        sans: ["Nunito", "Roboto", "Helvetica", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
} 