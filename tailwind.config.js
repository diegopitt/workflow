module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './layout/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans : ['Open Sans']
      },
      margin: {
        '-19': '-4.9rem',
       },
      maxWidth: {
        '8xl': '1920px',
      },
      width: {
        '18': '4.5rem',
        '22': '5.3rem',
      },
      height: {
        '18': '4.5rem',
      },
      boxShadow: {
        'outline-2': '0 0 0 2px var(--accents-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2'
      },
      spacing: {
        '4': '0.92rem'
      }
    },
  },
  plugins: [require('@tailwindcss/ui')],
}