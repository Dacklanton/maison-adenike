/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle Palette Haute Hospitalité Béninoise
        'linen-white': '#FAF8F5',
        'warm-cream': '#F3EDE2',
        'deep-espresso': {
          DEFAULT: '#2B1810',
          muted: '#5C4438',
          subtle: '#7D6559',
        },
        'ochre-red': {
          DEFAULT: '#A83B24',
          hover: '#8C2F1A',
          active: '#752514',
          soft: 'rgba(168, 59, 36, 0.12)',
        },
        'raffia-straw': {
          DEFAULT: '#D8BA8E',
          light: '#EADBC3',
          soft: 'rgba(216, 186, 142, 0.25)',
        },
        'champagne-gold': {
          DEFAULT: '#CBA158',
          hover: '#B58D46',
          bright: '#E0BC75',
          soft: 'rgba(203, 161, 88, 0.18)',
        },
        // Alias de compatibilité
        'brand-gold': {
          DEFAULT: '#CBA158',
          hover: '#B58D46',
          accent: '#E0BC75',
          soft: 'rgba(203, 161, 88, 0.18)',
        },
        'brand-sand': {
          DEFAULT: '#FAF8F5',
          muted: '#F3EDE2',
          sub: '#F3EDE2',
        },
        'brand-terracotta': {
          DEFAULT: '#A83B24',
          hover: '#8C2F1A',
          accent: '#C44B30',
          soft: 'rgba(168, 59, 36, 0.12)',
        },
        'primary-gold': {
          DEFAULT: '#CBA158',
          hover: '#B58D46',
          accent: '#E0BC75',
        },
        'obsidian-noir': {
          DEFAULT: '#14100E',
          surface: '#1E1714',
          card: '#251C18',
        },
        'warm-sand': {
          DEFAULT: '#FAF8F5',
          sub: '#F3EDE2',
          muted: '#F3EDE2',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury-glow': '0 0 15px rgba(203, 161, 88, 0.25)',
        'ambient-gold': '0 0 35px -8px rgba(203, 161, 88, 0.22)',
        'luxury-card': '0 16px 40px -12px rgba(43, 24, 16, 0.08), 0 0 0 1px rgba(216, 186, 142, 0.35)',
        'floating-widget': '0 12px 30px -4px rgba(37, 211, 102, 0.35), 0 0 0 2px #CBA158',
      },
      borderRadius: {
        'squircle-lg': '2rem',
        'squircle-md': '1.25rem',
        'squircle-sm': '0.75rem',
      },
      transitionTimingFunction: {
        haptic: 'cubic-bezier(0.32, 0.72, 0, 1)',
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
