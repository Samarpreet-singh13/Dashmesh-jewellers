/** @type {import('tailwindcss').Config} */
export default {
  content: [
 "./index.html",
 "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        background: "#020617", // slate-950
        surface: "#0f172a",    // slate-900 (Slightly lighter dark)
        border: "#1e293b",     // slate-800
        primary: {
          light: "#fef08a",    // yellow-200
          DEFAULT: "#eab308",  // yellow-500 
          dark: "#a16207",     // yellow-700
        },
        textPrimary: "#f5f5f5",
        textSecondary: "#a1a1aa",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Elegant font for headings
      },
      keyframes: {
        pageFade: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'page-fade': 'pageFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
