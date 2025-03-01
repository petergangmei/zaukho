/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Update this to match the blue in the screenshot
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#6B7280', // gray-500
          dark: '#4B5563', // gray-600
        },
        background: {
          light: '#F9FAFB', // gray-50
          dark: '#111827', // gray-900
        },
        accent: {
          DEFAULT: '#EC4899', // pink-500
          dark: '#DB2777', // pink-600
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class', // Enable dark mode with 'class' strategy
} 