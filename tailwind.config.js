/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        verdant: '#0B3D2E',
        amber: '#FCB017',
        parchment: '#FAF9F6',
        slate: '#2D3436',
      },
      fontFamily: {
        serif: ['Noto Serif', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Noto Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
        accent: ['Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};


