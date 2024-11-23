/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        "elevation-1": "var(--color-elevation-1)",
        "elevation-2": "var(--color-elevation-2)",
        "inv-base": "var(--color-inv-base)",
        "inv-elevation-1": "var(--color-inv-elevation-1)",
        "inv-elevation-2": "var(--color-inv-elevation-2)",
        cranberry: "#e05188",
        "tulip-tree": "#e6b03c",
        "picton-blue": "#39a8e9",
        "vivid-violet": "#873c9e",
        turquoise: "#45d1d8",
      },
    },
  },
  plugins: [],
};
