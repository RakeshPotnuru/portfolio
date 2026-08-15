// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://itsrakesh.com",

  // Gatsby served /blog/foo with no trailing slash, from public/blog/foo/index.html.
  // "never" + "directory" reproduces both the URL and the on-disk layout exactly.
  trailingSlash: "never",
  build: { format: "directory" },

  integrations: [react(), sitemap({ filter: (page) => !page.includes("/404") })],

  image: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  // Astro 7 renders markdown with Sätteri, whose defaults already match the old
  // react-markdown behaviour: GFM on, smart punctuation off (so quotes and dashes
  // in existing posts render exactly as authored). Only highlighting needs setting.
  markdown: {
    shikiConfig: { theme: "dark-plus", wrap: true },
  },

  // Recovers some of the instant-navigation feel of Gatsby's <Link>.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  vite: { plugins: [tailwindcss()] },
});
