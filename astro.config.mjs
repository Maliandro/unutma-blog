import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/** Production: https://unutma.app — override with ASTRO_SITE_URL / ASTRO_BASE_PATH in CI if needed. */
const site = process.env.ASTRO_SITE_URL || 'https://unutma.app';
const base = (process.env.ASTRO_BASE_PATH || '/').replace(/\/?$/, '') || '/';
const baseNorm = base === '/' ? undefined : base;

export default defineConfig({
  site,
  ...(baseNorm ? { base: baseNorm } : {}),
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
