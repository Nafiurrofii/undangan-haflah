/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
    "./assets/**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F5F0E8', light: '#FAF7F0', dark: '#EDE5D5' },
        sage:  { DEFAULT: '#7A9E7E', light: '#9BB89F', dark: '#5C7A60' },
        emerald: { DEFAULT: '#2D5A3D', light: '#3D7A52', dark: '#1E3D28' },
        gold:  { DEFAULT: '#C9A84C', light: '#E0C06A', dark: '#A07830' },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        sacramento: ['Sacramento', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'fade-up': 'fadeUp 1s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'particle': 'particleDrift 12s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { textShadow: '0 0 20px rgba(201,168,76,0.3), 0 0 40px rgba(201,168,76,0.1)' },
          '50%':     { textShadow: '0 0 30px rgba(201,168,76,0.6), 0 0 60px rgba(201,168,76,0.25)' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-120px) translateX(40px) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
