/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        js: ['js', 'sans-serif'],
        'js-mid': ['js-mid', 'sans-serif'],
      },
      colors: {
        primary: '#ED1C24',
      },
    },
  },
  plugins: [],
}
