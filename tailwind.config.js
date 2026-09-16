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
        dark: {
          950: '#07080B',
          900: '#0C0E14',
          850: '#11141C',
          800: '#171B26',
          700: '#23293A',
          600: '#333B50',
        },
        accent: {
          blue: '#3B82F6',
          amber: '#F59E0B',
          emerald: '#10B981',
          gold: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      boxShadow: {
        'glow-subtle': '0 0 40px -10px rgba(59, 130, 246, 0.15)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

