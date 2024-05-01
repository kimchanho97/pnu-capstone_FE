/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "1300px", // => @media (min-width: 1300px) { ... },
        sm: "1000px", // => @media (min-width: 1000px) { ... },
      },
    },
  },
  plugins: [],
};
