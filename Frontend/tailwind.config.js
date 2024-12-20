/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        kellySlab: ['"Kelly Slab"', "cursive"],
      },
      backgroundImage: {
        mainBannerBg: "url('/mainBanner.svg')",
        gapBannerBg: "url('/gapBanner.svg')",
        itemsBg: "url('/itemsBg.svg')",
      },
      textShadow: {
        outline: "2px 2px 0 rgba(0, 0, 0, 0.5)",
        glow: "0 0 8px rgba(255, 255, 255, 0.8)",
        doubleLayer: "2px 2px 0 #000, -2px -2px 0 #FFF",
        doubleLayerRed: "4px 2px 0 rgba(128, 0, 32, 1)",
        doubleLayerButton: "1px 0.5px 0 rgba(128, 0, 32, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
