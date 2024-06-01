/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainLightColor: "rgb(35, 39, 47)",
        mainDarkColor: "rgb(22, 24, 29)",
        buttonColor: "rgb(88, 196, 220)",
        textColor: "rgb(246 247 249)",
      },
      fontFamily: {
        sans: ["Source Code Pro", "monospace"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  plugins: [],
};
