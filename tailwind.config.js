module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trust-blue': '#2563eb',
        'commit-teal': '#0f766e',
        'calm-gray-blue': '#64748b',
        'background-gray': '#f8fafc'
      },
      fontFamily: {
        'jazzy': ['"Space Grotesk"', 'sans-serif'],
        'groovy': ['Poppins', 'sans-serif']
      },
      minHeight: {
        'screen': '40vh',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'open-top-right': {
          '0%': {
            transform: 'scale(0.95) translate(10px, -10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1) translate(0, 0)',
            opacity: '1',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        'open-top-right': 'open-top-right 0.4s ease-out forwards',
      }
    }
  },
  plugins: [],
}