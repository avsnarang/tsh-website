/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			green: {
  				light: '#A6D4B4',
  				DEFAULT: '#00501B',
  				dark: '#003012'
  			},
  			orange: {
  				light: '#E1CEB9',
  				DEFAULT: '#A65A20',
  				dark: '#7A4217'
  			},
  			primary: {
  				light: '#A6D4B4',
  				DEFAULT: 'hsl(var(--primary))',
  				dark: '#003012',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			neutral: {
  				light: '#FFFFFF',
  				dark: '#202020'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Lilita One',
  				'cursive'
  			],
  			body: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'gradient-x': 'gradient-x 3s ease infinite',
  			shine: 'shine 4s linear infinite',
  			'border-glow': 'border-glow 2s ease-in-out infinite',
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			ticker: 'ticker 30s linear infinite'
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
  				}
  			},
  			shine: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'border-glow': {
  				'0%, 100%': {
  					opacity: 0.2
  				},
  				'50%': {
  					opacity: 0.5
  				}
  			},
  			ticker: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
