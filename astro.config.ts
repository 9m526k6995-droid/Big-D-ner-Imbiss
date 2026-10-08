import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/config/site";

export default defineConfig({
  site: site.siteUrl,
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap({ filter: (p) => !/\/(impressum|datenschutz|404)/.test(p) })],
  vite: { plugins: [tailwindcss()] },
});
