/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  // darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/skeleton/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      poppins: [
        "Poppins_400Regular",
        "Poppins_500Medium",
        "Poppins_600SemiBold",
        "Poppins_700Bold",
      ],
    },

    extend: {
      colors: {
        primary: "#D9EAFD",
        secondary: "#F4D793",
        disabled: "#EFF1F3",
        green: "#A7E15B",
      },
    },
  },
  plugins: [],
};
