/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'pastel-purple': '#A1869E', // Violet pastel pour le texte
        'pastel-blue': '#B0E0E6',  // Bleu pastel pour le bouton
      },
      backgroundImage: {
        'gradient-pastel': 'linear-gradient(to bottom right, #F5F7FA, #E6ECEF)',
      },
    },
  },
  plugins: [],
}