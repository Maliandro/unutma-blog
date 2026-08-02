import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

/**
 * TEK DOGRULUK KAYNAGI. Sitenin gercekte yayinlandigi adres.
 *
 * 2026-08 DUZELTMESI: burasi 'https://unutma.app' yaziyordu ama o domain
 * BASKASINA ait (LangFreak'in dil ogrenme uygulamasi). Sonuc olarak her yazi
 * canonical/og:url/sitemap alanlarinda kendi kendine "beni indeksleme, asil
 * surum su adreste" diyordu — ve isaret ettigi adres 404'tu. Blogun neden hic
 * organik trafik almadiginin buyuk bolumu buydu.
 *
 * Kendi domain alininca YALNIZCA burasi degistirilir; robots.txt, llms.txt ve
 * uygulama semasi bu degerden turedigi icin kendiliginden guncellenir.
 */
const site = process.env.ASTRO_SITE_URL || 'https://unutma-blog.vercel.app';
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
