/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Add your custom colors
      colors: {
        color1: '#585649', // dark greyish
        color2: '#b5651d  ',
        color3: '#F7F9EB', // white
        bg: '#ffe08a ', // background color
        yellow1: '#eab308 ', // background color
      },
      // Add keyframes and animation utilities
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out, fadeOut 0.5s ease-in-out 4.5s',
        slideUp: 'slideUp 0.5s ease-in-out',
        slideDown: 'slideDown 0.5s ease-in-out',
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      md: { min: '769px', max: '1024px' },
      desktop: '1280px',
      sm: { max: '639px' },
    },
  },
  plugins: [],
};
