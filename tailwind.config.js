/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "Roboto"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
});
