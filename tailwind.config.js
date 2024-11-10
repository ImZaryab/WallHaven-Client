/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ["Epilogue", "serif"],
      },
      colors: {
        primary: "#ebe8e0",
        "btn-primary": "#D6FF69",
      },
    },
  },
  plugins: [],
};
