/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, editorial specialty-coffee palette.
        cream: '#F8F5F2',
        espresso: {
          DEFAULT: '#3E2723',
          50: '#F5F0EE',
          100: '#E9DFDB',
          200: '#CBB3AC',
          400: '#7A5750',
          600: '#503530',
          700: '#3E2723',
          900: '#241412',
        },
        caramel: {
          DEFAULT: '#C68A52',
          50: '#FBF3EA',
          100: '#F3DFC6',
          400: '#C68A52',
          600: '#A16D3B',
        },
        sage: {
          DEFAULT: '#7BAE7F',
          100: '#E4F0E4',
          600: '#5C8F60',
        },
        ink: '#2E2A27',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(62, 39, 35, 0.08)',
        card: '0 4px 20px -4px rgba(62, 39, 35, 0.10)',
        lift: '0 16px 32px -12px rgba(62, 39, 35, 0.22)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalPop: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        overlayIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.45s ease-out both',
        modalPop: 'modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
        overlayIn: 'overlayIn 0.18s ease-out both',
      },
    },
  },
  plugins: [],
};
