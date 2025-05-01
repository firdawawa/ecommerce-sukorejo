/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4A21C4', 
        'secondary': '#FF8800',
        'hover-primary': '#7688FF',
        'toko': '#9F7EFF',
        'base': '#F0F3F9',
        'font': '#444444',
      },
      margin: {
        '1/4': '25%',
      },
    },
  },
  plugins: [],
}

