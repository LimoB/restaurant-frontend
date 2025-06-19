/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ea580c",   // 🍊 Rich orange (calls to action)
        secondary: "#1f2937", // 🖤 Dark gray (headers/nav)
        accent: "#f59e0b",    // 🌽 Amber (highlights)

        // 🍽️ Additional food-inspired colors
        cream: "#fff7ed",     // ☁️ Backgrounds
        chocolate: "#7b341e", // 🍫 Dark brown (borders)
        lemon: "#fde047",     // 🍋 Bright yellow (badges)
        grape: "#7c3aed",     // 🍇 Purple for contrast
        mint: "#10b981",      // 🌿 Success green
        tomato: "#ef4444",    // 🍅 Error red
        butter: "#fcd34d",    // 🧈 Form backgrounds
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        hero: "url('/hero.jpg')", // Tailwind bg-hero utility
      },
    },
  },
  plugins: [],
};
