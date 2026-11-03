/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garvi-orange': '#D58B00',
        'garvi-gold': '#F4A623',
      },
    },
  },
  plugins: [],
}
