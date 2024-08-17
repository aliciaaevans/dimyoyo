/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: ["lg:bg-red-500", "hover:bg-red-200", "text-red-500", "lg:bg-blue-500", "hover:bg-blue-200", "text-blue-500"],
  theme: {
    extend: {},
  },
  plugins: [],
}