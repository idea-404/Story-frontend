// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main1: "#AE89FF",
          main2: "#AE89FF",
          main3: "#DAC8FF",
          red: "#f84f4f",
          blue: "#525AFF",
          green: "#37CC70",
          green2: "#8AFF8C",
          yellow: "#FFFF65",
        },
        background: "#FAFAFA",
      },
    },
    plugins: [],
  },
};
