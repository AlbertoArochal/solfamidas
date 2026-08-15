import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import decapCmsOauth from "astro-decap-cms-oauth";

export default defineConfig({
  site: "https://solfamidas.vercel.app",
  adapter: vercel(),
  integrations: [
    sitemap(),
    decapCmsOauth({
      // URL fija sin caret para evitar el redirect 302 de unpkg
      decapCMSSrcUrl: "https://unpkg.com/decap-cms@3.11.0/dist/decap-cms.js",
    }),
  ],
});
