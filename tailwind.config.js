/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#ffe0e0',
          100: '#ffb3b3',
          200: '#ff8585',
          300: '#ff5757',
          400: '#ff2a2a',
          500: '#ff0000',
          600: '#d10000',
          700: '#a30000',
          800: '#750000',
          900: '#470000',
        },
        'dark': {
          950: '#0A0A0A',
          900: '#121212',
          800: '#1A1A1A',
          700: '#262626',
          600: '#333333',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px',
      },
      rotate: {
        'y-6': 'rotateY(6deg)',
        'y-12': 'rotateY(12deg)',
        'y-45': 'rotateY(45deg)',
        'x-45': 'rotateX(45deg)',
      },
      translate: {
        'z-10': 'translateZ(10px)',
        'z-[-50px]': 'translateZ(-50px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'cinematic-zoom': 'cinematic-zoom 1.5s ease-out',
        'depth-slide': 'depth-slide 1s ease-out',
        'shrink': 'shrink 5s linear forwards',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'warp-transition': 'warp-transition 3s ease-in-out forwards',
        'tunnel-zoom': 'tunnel-zoom 4s ease-out infinite',
        'particle-stream': 'particle-stream 3s linear infinite',
        'fragment-scatter': 'fragment-scatter 2s ease-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'warp-final': 'warp-final 1s ease-in-out forwards',
        'reverse-glitch': 'reverse-glitch 0.5s ease-in-out infinite',
        'reality-exit': 'reality-exit 1.5s ease-in-out forwards',
      },
      keyframes: {
        'gradient-x': { 
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'cinematic-zoom': {
          '0%': {
            transform: 'scale(0.8) translateY(50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1',
          },
        },
        'depth-slide': {
          '0%': {
            transform: 'translateZ(-100px) translateY(30px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateZ(0) translateY(0)',
            opacity: '1',
          },
        },
        'shrink': {
          '0%': {
            width: '100%',
          },
          '100%': {
            width: '0%',
          },
        },
        'glitch': {
          '0%': {
            transform: 'translateX(0) rotateY(0deg)',
            textShadow: '0 0 0 transparent',
          },
          '20%': {
            transform: 'translateX(-2px) rotateY(2deg)',
            textShadow: '2px 0 0 #ff0000, -2px 0 0 #00ffff',
          },
          '40%': {
            transform: 'translateX(2px) rotateY(-1deg)',
            textShadow: '-2px 0 0 #ff0000, 2px 0 0 #00ffff',
          },
          '60%': {
            transform: 'translateX(-1px) rotateY(1deg)',
            textShadow: '1px 0 0 #ff0000, -1px 0 0 #00ffff',
          },
          '80%': {
            transform: 'translateX(1px) rotateY(-2deg)',
            textShadow: '-1px 0 0 #ff0000, 1px 0 0 #00ffff',
          },
          '100%': {
            transform: 'translateX(0) rotateY(0deg)',
            textShadow: '0 0 0 transparent',
          },
        },
        'warp-transition': {
          '0%': {
            transform: 'scale(1) rotateY(0deg) perspective(1000px)',
            opacity: '1',
          },
          '25%': {
            transform: 'scale(1.1) rotateY(15deg) perspective(1000px)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(0.8) rotateY(180deg) perspective(1000px)',
            opacity: '0.3',
          },
          '75%': {
            transform: 'scale(1.2) rotateY(270deg) perspective(1000px)',
            opacity: '0.6',
          },
          '100%': {
            transform: 'scale(1) rotateY(360deg) perspective(1000px)',
            opacity: '0',
          },
        },
        'tunnel-zoom': {
          '0%': {
            transform: 'translateZ(0) scale(1)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'translateZ(-500px) scale(2)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateZ(-1000px) scale(4)',
            opacity: '0',
          },
        },
        'particle-stream': {
          '0%': {
            transform: 'translateZ(500px) translateY(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateZ(-500px) translateY(-100px)',
            opacity: '0',
          },
        },
        'fragment-scatter': {
          '0%': {
            transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'rotateX(180deg) rotateY(180deg) rotateZ(180deg) translateZ(200px)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg) translateZ(400px)',
            opacity: '0',
          },
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'warp-final': {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '0.3',
          },
          '50%': {
            transform: 'scale(1.5) rotate(180deg)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(3) rotate(360deg)',
            opacity: '1',
          },
        },
        'reverse-glitch': {
          '0%': {
            transform: 'translateX(0)',
            filter: 'hue-rotate(0deg)',
          },
          '25%': {
            transform: 'translateX(2px)',
            filter: 'hue-rotate(90deg)',
          },
          '50%': {
            transform: 'translateX(-2px)',
            filter: 'hue-rotate(180deg)',
          },
          '75%': {
            transform: 'translateX(1px)',
            filter: 'hue-rotate(270deg)',
          },
          '100%': {
            transform: 'translateX(0)',
            filter: 'hue-rotate(360deg)',
          },
        },
        'reality-exit': {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1.2) rotate(180deg)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(0.8) rotate(360deg)',
            opacity: '1',
          },
        },
        'width': {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-cyan-400/10',
    'bg-green-400/10',
    'bg-orange-400/10',
    'bg-purple-400/10',
    'border-cyan-400/30',
    'border-green-400/30',
    'border-orange-400/30',
    'border-purple-400/30',
    'text-cyan-400',
    'text-green-400',
    'text-orange-400',
    'text-purple-400',
    'shadow-cyan-400/50',
    'shadow-green-400/50',
    'shadow-orange-400/50',
    'shadow-purple-400/50',
  ],
};