module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)']
      }
    },
    fontFamily: {
      display: ['var(--font-archivo)']
    }
  },
  variants: {
    extend: {
      visibility: ['group-hover']
    }
  },
  plugins: []
};
