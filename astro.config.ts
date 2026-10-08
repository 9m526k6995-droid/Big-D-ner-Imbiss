import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { site as siteConfig } from "./src/config/site";

// Warnung beim Build, solange der Inhabername im Impressum fehlt.
const inhaberWarnung = {
  name: "inhaber-warnung",
  hooks: {
    "astro:build:start": ({ logger }: { logger: { warn: (m: string) => void } }) => {
      if (siteConfig.inhaber.startsWith("[INHABER")) {
        logger.warn("ACHTUNG: Inhabername im Impressum fehlt (src/config/site.ts → inhaber)");
      }
    },
  },
};

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "always" },
  integrations: [sitemap(), inhaberWarnung],
  vite: { plugins: [tailwindcss()] },
  image: { layout: "constrained" },
});
