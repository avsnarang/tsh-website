/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ring: "hsl(var(--ring))",
        green: {
          light: '#A6D4B4',  // Light green
          DEFAULT: '#00501B', // Dark green
          dark: '#003012',    // Darker green
        },
        orange: {
          light: '#E1CEB9', // Light orange
          DEFAULT: '#A65A20', // Orange
          dark: '#7A4217'    // Dark orange
        },
        primary: {
          light: '#A6D4B4',  // Light green
          DEFAULT: '#00501B', // Dark green
          dark: '#003012',    // Darker green
        },
        neutral: {
          light: '#FFFFFF',
          dark: '#202020',
        }
      },
      fontFamily: {
        display: ['Lilita One', 'cursive'],
        body: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'shine': 'shine 4s linear infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 30s linear infinite',
        shimmer: 'shimmer 3s linear infinite'
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'border-glow': {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.5 },
        },
        'ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 200%' },
          '100%': { backgroundPosition: '-200% -200%' }
        }
      },
    },
  },
  plugins: [],
}
