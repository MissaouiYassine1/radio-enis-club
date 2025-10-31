/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FBEDEB',
          100: '#F6D4CF',
          200: '#EEA59A',
          300: '#E67665',
          400: '#DD4730',
          500: '#C53B26',
          600: '#8B2417',
          700: '#661C12',
          800: '#41100A',
          900: '#240804',
        },
        dark: {
          700: '#1A1A1A',
          800: '#121212',
          900: '#0A0A0A',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}