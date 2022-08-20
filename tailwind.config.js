/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        emerald: {
          // eslint-disable-next-line import/no-extraneous-dependencies
          ...require("daisyui/src/colors/themes")["[data-theme=emerald]"],

          "--animation-btn": "0.25s",
          "--btn-focus-scale": "0.95",
        },
      },
    ],
  },
}
