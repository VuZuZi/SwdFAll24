/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        header: "560px",
        rate: "400px",
      },
      fontSize: {
        h1: "2.6rem",
      },
      screens: {
        xs: "475px",
      },
      colors: {
        main: "#080A1A",
        subMain: "#669435",
        dry: "#0B0F29",
        star: "#FFCC33	",
        text: "#C0C0C0",
        border: "#4b5563",
        dryGray: "#E0D5D5",
        gold: "#e29e38",
        blue: "#123577",
        violet: "#8B008B	",
      },
      fontFamily: {
        euclid: ["Euclid Circular A", "sans-serif"],
      },
    },
  },
  plugins: [],
};
