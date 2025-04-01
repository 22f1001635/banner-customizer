module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'funky-purple': '#8B5CF6',
        'funky-blue': '#3B82F6',
        'funky-pink': '#EC4899',
        'funky-green': '#10B981',
        'trust-blue': '#2563eb',
        'commit-teal': '#0f766e',
        'calm-gray-blue': '#64748b',
        'focus-blue': '#1d4ed8',
        'background-gray': '#f8fafc'
      },
      fontFamily: {
        'jazzy': ['"Space Grotesk"', 'sans-serif'],
        'groovy': ['Poppins', 'sans-serif']
      },
      minHeight: {
        'screen': '100vh',
      }
    }
  },
  plugins: [],
}