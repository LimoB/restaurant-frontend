/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ea580c",   // Orange brand color
        secondary: "#1f2937", // Dark gray
        accent: "#f59e0b",    // Amber
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
}
