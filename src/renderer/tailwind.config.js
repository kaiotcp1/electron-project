/** u/type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      keyFrames: {
        slideIn: {
          from: {width: 0},
          to: {width: 'var(--radix-collapsible-content-width)'}
        },
        slideOut: {
          from: {width: 'var(--radix-collapsible-content-width)'},
          to: {width: 0} 
        }
      },
      animation: {
        slideIn: 'slideIn 200ms ease-in-out',
        slideOut: 'slideOut 200ms ease-in-out'
      }
    }
  },

  plugins: []
}
