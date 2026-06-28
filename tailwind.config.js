/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wyze-purple': '#4E2FD2',
        'obsidian': '#0B0D10',
        'gray-c': {
          200: '#F0F4F7',
          300: '#E6EBF0',
          400: '#CED6DE',
          500: '#A8B2BD',
          600: '#6F7882',
          700: '#525963',
        },
        'teal-savings': '#0AA288',
        'blue-surface': '#EDF4FF',
        'utility-gray': '#575757',
      },
      fontFamily: {
        sans: ['Gilroy', 'Inter', 'system-ui', 'sans-serif'],
        bold: ['Gilroy-Bold', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '10px',
      },
    },
  },
  plugins: [],
};
