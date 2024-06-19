/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./docs/**/*.{tsx,ts,md,css}','./src/**/*.{tsx,ts,md,css}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
