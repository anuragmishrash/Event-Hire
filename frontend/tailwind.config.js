/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF9',
        surface: '#FFFFFF',
        border: '#E5E4E0',
        primary: '#1A1A1A',
        accent: '#6C47FF',
        'accent-hover': '#5535E0',
        success: '#22C55E',
        muted: '#6B7280',
      },
      borderRadius: {
        card: '12px',
        input: '8px',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        heading: ['Bricolage Grotesque', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,0,0,0.06), 0 4px 24px 0 rgba(108,71,255,0.04)',
        'card-hover': '0 4px 24px 0 rgba(108,71,255,0.12)',
      },
    },
  },
  plugins: [],
}
