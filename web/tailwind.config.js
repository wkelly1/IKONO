module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)']
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        contentShow: {
          from: {
            opacity: '0'
          },
          to: { opacity: '1' }
        }
      },
      animation: {
        overlayShow: 'overlayShow 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 600ms cubic-bezier(0.16, 1, 0.3, 1)'
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
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography')
  ]
};
