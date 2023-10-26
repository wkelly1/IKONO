module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins']
      }
    },
    fontFamily: {
      display: ['Archivo Black']
    }
  },
  variants: {
    extend: {
      visibility: ['group-hover']
    }
  },
  plugins: []
};
