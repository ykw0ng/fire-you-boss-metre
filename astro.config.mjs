// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Update `site` to your final domain once deployed — it drives the sitemap
// and canonical URLs. Also update the Sitemap line in public/robots.txt.
export default defineConfig({
  site: 'https://fireyourbossmetre.com',
  integrations: [sitemap()],
});
