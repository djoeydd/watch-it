/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "shadow-neon-purple":
          "0 0 3px #8a2be2, 0 0 6px #8a2be2, 0 0 9px #8a2be2, 0 0 12px #8a2be2",
      },
    },
  },
  plugins: [],
};
