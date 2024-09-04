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
        'night-blue': {
          DEFAULT: 'hsl(230, 58%, 12%)',
          light: 'hsl(230, 58%, 22%)',
          dark: 'hsl(230, 58%, 2%)',
        },
        'dark-blue': 'hsl(230, 40%, 20%)',
        'hard-blue': 'hsl(215, 95%, 32%)',
        'electric-blue': 'hsl(215, 99%, 45%)',
        'light-blue': 'hsl(230, 100%, 89%)',
        'dark-red': 'hsl(0, 60%, 42%)',
        'red': 'hsl(0, 80%, 63%)',
        'green': 'hsl(165, 99%, 41%)',
        'white': 'hsl(0, 0%, 100%)',
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
        't-2.5xl' : '1.25rem'
      },
      maxWidth: {
        '8xl' : '90rem'
      },
      height: {
        '15' : '3.75rem'
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
      })
    },
  ],
}