const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#e50914",
        background: "#141414",
        "navbar-text": "#e5e5e5",
        "navbar-text-hover": "#b3b3b3",
        "footer-text": "#808080",
        "notifications-text": "#CCCCCC",
        "notifications-date-text": "#808080",
        "profile-icon": "#b3b3b3",
      },
      animation: {
        "grow-search-bar": "grow-search-bar 400ms ease-in-out forwards",
      },
      keyframes: {
        "grow-search-bar": {
          "0%": { width: "10%", "margin-left": "auto", opacity: "0" },
          "10%": { width: "10%", "margin-left": "auto", opacity: "1" },
          "100%": { width: "100%", "margin-left": "auto", opacity: "1" },
        },
      },
    },
    screens: {
      xs: "425px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          paddingLeft: "3vw",
          paddingRight: "3vw",
        },
      });
    },
  ],
};
