import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { rehypeImageAttrs, rehypeUnpublishedLinks } from './src/plugins/rehype-blog.mjs';

const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
const publicDir = fileURLToPath(new URL('./public', import.meta.url));

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
  integrations: [
    // src/styles/global.css zaten @tailwind base/components/utilities iceriyor. Entegrasyonun
    // kendi taban stilini de basmasi her sayfaya ~50 KB'lik AYNI CSS'i ikinci kez ekliyordu
    // (render-blocking). Kurallar global.css'in alt kumesiydi, gorunum degismez.
    tailwind({ applyBaseStyles: false }),
    // /gorev noindex bir kopru sayfasi: sitemap'e girerse GSC "Submitted URL
    // marked noindex" hatasi uretir (bu proje bununla bir kez yandi).
    sitemap({ filter: (page) => !page.includes('/gorev') }),
  ],
  markdown: {
    // Yayinda olmayan (draft / ileri tarihli) yaziya verilen link duz metne doner;
    // govde gorsellerine lazy + gercek width/height eklenir. Bkz. src/plugins/rehype-blog.mjs
    rehypePlugins: [rehypeUnpublishedLinks({ blogDir }), rehypeImageAttrs({ publicDir })],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
