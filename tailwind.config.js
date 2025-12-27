/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maya Primary Colors
        'maya-primary': '#4A90E2',
        'maya-primary-light': '#7CB3F5',
        'maya-primary-dark': '#2E6AB8',

        // Maya Secondary Colors
        'maya-secondary': '#50C878',
        'maya-secondary-light': '#7FDA9A',
        'maya-secondary-dark': '#3AA05A',

        // Maya Accent
        'maya-accent': '#FF6B9D',

        // Neutral Colors
        'maya-bg-light': '#F8FAFC',
        'maya-bg-gray': '#F1F5F9',
        'maya-text-primary': '#1E293B',
        'maya-text-secondary': '#64748B',
        'maya-text-muted': '#94A3B8',

        // Semantic Colors
        'maya-success': '#10B981',
        'maya-warning': '#F59E0B',
        'maya-error': '#EF4444',
        'maya-info': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
