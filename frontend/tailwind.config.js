/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffdf5',
          100: '#fef7da',
          200: '#fdedaf',
          300: '#fbdf7e',
          400: '#f8cd4c',
          500: '#f5b525',
          600: '#d99217',
          700: '#b46e13',
          800: '#925413',
          900: '#784412',
        },
        darkbg: '#0F0F13',
        darkcard: '#16161F',
        darkborder: '#2A2A38',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
