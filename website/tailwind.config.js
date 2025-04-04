/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            gold:"#ffcc00",
        },
        fontFamily: {
            'display': ['Freshman', 'times-new-roman']
        }
    },
  },
  plugins: [],
}
