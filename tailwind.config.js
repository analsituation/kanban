/** @type {import('tailwindcss').Config} */

const accent = '#645FC6'
const dark = '#2C2C38'
const darker = '#21212D'
const secondText = '#798291'
const black = '#000000'
const white = '#FFFFFF'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      accent: accent,
      dark: dark,
      darker: darker,
      secondText: secondText,
      black: black,
      white: white,
      transparent: 'transparent'
    },
    fontFamily: {
      barlow: ['Barlow', 'sans-serif'],
      kanit: ['Kanit', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
}
