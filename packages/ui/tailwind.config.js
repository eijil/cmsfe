/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx,js,mjs}'],
  theme: {
    extend: {},
  },
   plugins: [
    require('daisyui'),
  ],
}
