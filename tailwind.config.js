/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cod: {
          black: "#0B0D0F",
          gray: "#1B1F24",
          green: "#4D5B3D",
          neon: "#95FF00",
          silver: "#A8B0B8",
          darkGreen: "#1f2b18",
          cardBg: "rgba(27, 31, 36, 0.8)",
          glowGreen: "rgba(149, 255, 0, 0.15)",
        }
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        'scan': 'scan 6s linear infinite',
        'noise': 'noise 0.2s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-1%, -1%)' },
          '20%': { transform: 'translate(-2%, 1%)' },
          '30%': { transform: 'translate(1%, -2%)' },
          '40%': { transform: 'translate(-1%, 3%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '60%': { transform: 'translate(3%, -1%)' },
          '70%': { transform: 'translate(1%, 2%)' },
          '80%': { transform: 'translate(-1%, -3%)' },
          '90%': { transform: 'translate(2%, 1%)' },
        }
      }
    },
  },
  plugins: [],
}
