/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',  // Slow continuous rotation
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}