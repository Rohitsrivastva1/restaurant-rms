/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0806',
        'bg-2': '#120D0A',
        card: '#1A130E',
        'card-2': '#241A13',
        line: '#3B2E22',
        edge: '#8C7A62',
        cream: '#F5ECDD',
        muted: '#C9BBA3',
        brass: '#C9A45C',
        'brass-hi': '#E6C98A',
        'brass-deep': '#7A5A1E',
        'ink-2': '#1A120C',
        ok: '#8CC7A0',
        ember: '#E7924F',
        err: '#F4A59B',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '10px',
        lg: '22px',
      },
      screens: {
        sm: '640px',
        md: '780px',
        lg: '1024px',
        xl: '1360px',
      },
    },
  },
  plugins: [],
} 