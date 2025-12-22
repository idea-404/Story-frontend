/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
