/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#faf6f2',
          100: '#f0e6da',
          200: '#ddc4a8',
          400: '#a9764c',
          600: '#6f4a30',
          800: '#3c2a1e',
          900: '#231712',
        },
      },
    },
  },
  plugins: [],
};
