/* eslint-disable */
module.exports = {
  purge: [
    './client/**/*.{js,ts,jsx,tsx,html}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      sm: "30em",
      md: "48em",
      lg: "62em",
      xl: "80em",
      "2xl": "96em",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
