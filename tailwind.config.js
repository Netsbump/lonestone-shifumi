/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'var(--dark-blue)',
        'hard-blue': 'var(--hard-blue)',
        'button': 'var(--electric-blue)',
        'electric-blue' : 'var(--electric-blue)',
        'night-blue' : 'var(--night-blue)',
        'light-blue': 'var(--light-blue)',
        'dark-red': 'var(--dark-red)',
        'red': 'var(--red)',
        'green': 'var(--green)',
        'white': 'var(--white)',
        'background': 'var(--dark-blue)',
        'title-container': 'var(--night-blue)',
        'container' : 'var(--night-blue-medium)'
      },
      fontFamily: {
        'chivo': ['Chivo', 'sans-serif'],
        'overpass': ['Overpass', 'sans-serif'],
      },
      fontSize: {
        'h1': '72px',
        'h2': '36px',
        'h3': '24px',
        'h4': '24px',
        'h5': '16px',
        'texte-courant': '12px',
      },
      fontWeight: {
        'normal': 400,
        'black': 900,
      },
      borderRadius: {
        'primary' : 'var(--rounded-primary)',
      },
      maxWidth: {
        '8xl' : '90rem'
      },
      height: {
        '15' : '3.75rem'
      },
      boxShadow: {
        'button-primary' : 'var(--shadow-button-default)'
      },
      padding: {
        'container' : 'var(--padding-game-container)' 
      }
    },
  },
  plugins: [ 
    function({ addBase, theme }) {
      addBase({
        'h1': {
          fontFamily: theme('fontFamily.overpass'),
          fontSize: theme('fontSize.h1'),
          fontWeight: theme('fontWeight.black'),
          textAlign: 'center',
        },
        'h2': {
          fontFamily: theme('fontFamily.overpass'),
          fontSize: theme('fontSize.h2'),
          fontWeight: theme('fontWeight.black'),
          textAlign: 'center',
        },
        'h3': {
          fontFamily: theme('fontFamily.overpass'),
          fontSize: theme('fontSize.h3'),
          fontWeight: theme('fontWeight.black'),
          textAlign: 'right',
        },
        'h4': {
          fontFamily: theme('fontFamily.chivo'),
          fontSize: theme('fontSize.h4'),
          fontWeight: theme('fontWeight.normal'),
          textAlign: 'center',
        },
        'h5': {
          fontFamily: theme('fontFamily.overpass'),
          fontSize: theme('fontSize.h5'),
          fontWeight: theme('fontWeight.black'),
          textAlign: 'center',
        },
        '.Texte-courant': {
          fontFamily: theme('fontFamily.chivo'),
          fontSize: theme('fontSize.texte-courant'),
          fontWeight: theme('fontWeight.normal'),
          textAlign: 'center',
        },
        '.Text-button': {
          fontFamily: theme('fontFamily.chivo'),
          fontSize: theme('fontSize.h4'),
          fontWeight: theme('fontWeight.normal'),
          textAlign: 'center',
        },
      })
    },
  ],
}