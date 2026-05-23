/** @type {import('tailwindcss').Config} */
// Loyola Blakefield color tokens. Centralized here so the whole app
// pulls from one source of truth instead of scattered hex values.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Loyola Blue (dominant)
        loyola: {
          blue: '#0033A0',
          'blue-dark': '#001A5C',
          'blue-deep': '#000D33',
          gold: '#FFC72C',
          'gold-dark': '#E5A800',
          paper: '#F8F6EF',
        },
      },
      fontFamily: {
        // Retro-futuristic lab terminal aesthetic
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        display: ['"Space Mono"', '"Courier New"', 'monospace'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'shake': 'shake 0.4s',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 199, 44, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 199, 44, 0.6)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
