/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/path/to/your/background-image.jpg')", // Replace with the actual path to your image
      },
    },
  },
  plugins: [],
}

