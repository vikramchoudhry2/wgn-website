/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
      fontSize: {
        // Fluid typography using CSS clamp()
        // Format: clamp(min-size, preferred-size, max-size)
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
        'fluid-6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)',
        'fluid-7xl': 'clamp(4.5rem, 3.5rem + 5vw, 6.5rem)',
        'fluid-8xl': 'clamp(6rem, 4.5rem + 7.5vw, 8rem)',
        'fluid-9xl': 'clamp(8rem, 6rem + 10vw, 10rem)',
      },
      animation: {
        'scroll-x': 'scroll-x 15s linear infinite',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
    },
  },
  plugins: [],
} 