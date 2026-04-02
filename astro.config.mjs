import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://unutma.blog',
  trailingSlash: 'always',
  redirects: {
    '/about/': '/en/about/',
    '/privacy/': '/en/privacy/',
    '/blog/': '/en/blog/',
  },
  integrations: [tailwind(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
