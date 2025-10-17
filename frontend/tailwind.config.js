/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom theme colors
        twitter: {
          blue: '#1DA1F2',
          darkBlue: '#0d8bd9',
          lightGray: '#657786',
          extraLightGray: '#AAB8C2',
          extraExtraLightGray: '#E1E8ED',
          lighterGray: '#F7F9FA'
        }
      }
    },
  },
  plugins: [],
}