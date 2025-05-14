import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can extend your theme here if needed
      // Example: 
      // colors: {
      //   brand: {
      //     light: '#abcdef',
      //     dark: '#123456',
      //   }
      // }
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config; 