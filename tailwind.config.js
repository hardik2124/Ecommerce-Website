import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
              DEFAULT: "#0ea5e9",
              foreground: "#FFFFFF"
            }
          }
        },
        dark: {
          colors: {
            primary: {
              50: "#0c4a6e",
              100: "#075985",
              200: "#0369a1",
              300: "#0284c7",
              400: "#0ea5e9",
              500: "#38bdf8",
              600: "#7dd3fc",
              700: "#bae6fd",
              800: "#e0f2fe",
              900: "#f0f9ff",
              DEFAULT: "#38bdf8",
              foreground: "#000000"
            }
          }
        }
      }
    })
  ]
}
