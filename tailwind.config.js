/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content:  [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'blue': '#001AFF',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'highlight': '#E7F263',
      'highlight-glow': '#C9DB00',
      'yellow': '#ffc82c',
      'gray-dark': '#5C5C5C',
      'gray-med': '##828282',
      'gray-light': '#EEEEF0',
      'gray-ultralight': '#F8F8F8',
      'white': '#fff',
      'black': '#000',
      'error-red': '#EE0004'
    },
    fontFamily: {
      sans: ['Arial', ...fontFamily.sans],
    },
    fontSize: {
      sm: ['10px'],
      base: ['13px'],
      med: ['15px'],
      lg: ['19px'],
      xl: ['25px'],
    },
    dropShadow: {
      sm: ['0px 0px 4px 0px rgba(0, 0, 0, 0.25)']
    },
    extend: {
      'textShadow': {
        'DEFAULT': '0px 0px 4px var(--tw-shadow-color)',
        'lg': '0px 0px 8px var(--tw-shadow-color), 0px 0px 8px var(--tw-shadow-color)'
      },
      'fontFamily': {
        serif: ['var(--font-migra)', ...fontFamily.serif]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
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
}
