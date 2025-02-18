const withMT = require("@material-tailwind/react/utils/withMT")
const plugin = require('tailwindcss/plugin')

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif", "Noto Sans Old South Arabian"],
    },
    extend: {
      boxShadow: {
        crescent: "0 9px 0 0",
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      screens: {
        "3xs": "320px",
        "2xs": "375px",
        "xs": "475px",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
})
