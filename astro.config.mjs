import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://melontini.me",
  prefetch: true,
  integrations: [mdx(), sitemap(), tailwind()],

  vite: {
    build: {
      cssMinify: "lightningcss",
      minify: "esbuild"
    }
  },

  output: "static",
  adapter: cloudflare(),
});