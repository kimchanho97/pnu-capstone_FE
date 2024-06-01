/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxxl: "2620px", // => @media (min-width: 2620px) { ... },
        xxl: "2300px", // => @media (min-width: 2300px) { ... },
        xl: "1980px", // => @media (min-width: 1980px) { ... },
        lg: "1660px", // => @media (min-width: 1660px) { ... },
        md: "1340px", // => @media (min-width: 1340px) { ... },
        sm: "1020px", // => @media (min-width: 1020px) { ... },
      },
    },
  },
  plugins: [],
};

// grid 제외 width: 380px
// Item 하나의 px: 320
// 700 1020 1340 1660 1980 2300 2620 2940 3260 3580
