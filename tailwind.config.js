// tailwind.config.cjs
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main1: "#AE89FF",
          main2: "#AE89FF",
          main3: "#DAC8FF",
        },
        "custom-red": "#f84f4f",
        "custom-blue": "#525AFF",
        "custom-green": "#37CC70",
        "custom-green2": "#8AFF8C",
        "custom-yellow": "#FFFF65",
        background: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
