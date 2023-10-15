import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        'barbecue': 'url(\'/background.svg\')'
      },
      background: {
        linear: 'linear-gradient(transparent, rgb(252 211 77 / 1) 60%)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
export default config;
