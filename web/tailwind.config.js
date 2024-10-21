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
      colors: {
        primary: 'var(--color-primary)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-accent-primary': 'var(--bg-accent-primary)',
        'bg-accent-secondary': 'var(--bg-accent-secondary)',
        'bg-accent-secondary-hover': 'var(--bg-accent-secondary-hover)',
        'bg-primary-inverse': 'var(--bg-primary-inverse)',
        'fg-primary': 'var(--fg-primary)',
        'fg-primary-muted': 'var(--fg-primary-muted)',
        'fg-primary-accent': 'var(--fg-primary-accent)',
        'fg-primary-accent-secondary': 'var(--fg-primary-accent-secondary)',
        'fg-primary-hover': 'var(--fg-primary-hover)',
        'fg-primary-inverse': 'var(--fg-primary-inverse)',
        'fg-secondary': 'var(--fg-secondary)',
        'fg-tertiary': 'var(--fg-tertiary)',
        'fg-accent-primary': 'var(--fg-accent-primary)',
        'fg-accent-secondary': 'var(--fg-accent-secondary)',
        'fg-accent-secondary-hover': 'var(--fg-accent-secondary-hover)',
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'border-neutral-primary': 'var(--border-neutral-primary)',
        'border-neutral-secondary': 'var(--border-neutral-secondary)'
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
