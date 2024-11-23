import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkGithubAlerts from "remark-github-alerts";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://melontini.me",
  prefetch: true,
  integrations: [mdx(), sitemap(), tailwind(), svelte()],
  vite: {
    build: {
      cssMinify: "lightningcss",
      minify: "esbuild"
    }
  },
  markdown: {
    gfm: true,
    remarkPlugins: [remarkGithubAlerts],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolink,
        {
          behavior: "prepend",
          content: {
            type: "text",
            value: "#",
          },
          properties: {
            className: ["anchor-link"],
          },
        },
      ],
    ],
  },
});
