/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sans-serf']
    },
    extend: {
      backgroundImage:{
        "home":"url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

