/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#121826',
        charcoal2: '#1A2233',
        emerald: {
          DEFAULT: '#10B981',
          soft: '#34D399',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E9CE6B',
        },
        crimson: '#EF4444',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-emerald': '0 0 40px -8px rgba(16,185,129,0.55)',
        'glow-gold': '0 0 30px -8px rgba(212,175,55,0.55)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at 20% 20%, rgba(16,185,129,0.08), transparent 40%), radial-gradient(circle at 80% 0%, rgba(212,175,55,0.08), transparent 40%)',
      },
    },
  },
  plugins: [],
}
