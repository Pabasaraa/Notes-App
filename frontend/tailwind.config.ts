/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],

  theme: {
    extend: {
      colors: {
        primaryBase: 'rgb(248, 246, 242)',
        secondaryBase: 'rgb(236, 230, 219)',
        primaryAccent: 'rgb(26, 19, 11)',
        callToAction: 'rgb(67, 136, 67)',
        textDark: 'rgb(51, 51, 51)',
        textLight: 'rgb(255, 255, 255)',
        textGray: '#ccc',
        blurBg: 'rgba(18, 18, 18, 0.85)',
        lgBlurBg: 'rgba(18, 18, 18, 0.65)',

        background: 'var(--background)',
        secondary: 'var(--secondary)',
        neutral: {
          0: 'var(--neutral-0)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          250: 'var(--neutral-250)',
          300: 'var(--neutral-300)',
          350: 'var(--neutral-350)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
        },
        textPrimary: {
          DEFAULT: 'var(--text-primary)',
          foreground: 'var(--text-secondary)',
          disabled: 'var(--text-disabled)',
        },
        divider: 'var(--divider)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        prata: ['var(--font-prata)'],
        pavanam: ['var(--font-pavanam)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
