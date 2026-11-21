import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { isLive, readFrontmatter } from './src/utils/publish-state.mjs';
import { rehypeImageAttrs, rehypeUnpublishedLinks, rehypeTrLinks } from './src/plugins/rehype-blog.mjs';

const SLUGS = JSON.parse(fs.readFileSync(new URL('./src/i18n/slug-haritasi.json', import.meta.url), 'utf8'));
const TR_BY_EN = SLUGS;
const EN_BY_TR = Object.fromEntries(Object.entries(SLUGS).map(([en, tr]) => [tr, en]));
// Etiket sayfalari: EN etiket <-> TR etiket (src/i18n/etiket-haritasi.json).
const TAGS = JSON.parse(fs.readFileSync(new URL('./src/i18n/etiket-haritasi.json', import.meta.url), 'utf8'));
const TAG_EN_BY_TR = Object.fromEntries(Object.entries(TAGS).map(([en, tr]) => [tr, en]));
const dec = (x) => { try { return decodeURIComponent(x).toLowerCase(); } catch { return x.toLowerCase(); } };
const STATIC = [['/', '/tr/'], ['/blog/', '/tr/blog/'], ['/faq/', '/tr/sss/'], ['/about/', '/tr/hakkinda/'], ['/support/', '/support/tr/'], ['/privacy/', '/privacy/tr/'], ['/terms/', '/terms/tr/']];
function trAlternate(p) {
  for (const [en, tr] of STATIC) if (p === en || p === tr) return { en, tr };
  let m;
  if ((m = p.match(/^\/blog\/page\/(\d+)\/$/)) ) return { en: p, tr: `/tr/blog/sayfa/${m[1]}/` };
  if ((m = p.match(/^\/tr\/blog\/sayfa\/(\d+)\/$/))) return { en: `/blog/page/${m[1]}/`, tr: p };
  if ((m = p.match(/^\/blog\/([^/]+)\/$/)) && TR_BY_EN[m[1]] && m[1] !== 'page' && m[1] !== 'tags') return { en: p, tr: `/tr/blog/${TR_BY_EN[m[1]]}/` };
  if ((m = p.match(/^\/tr\/blog\/([^/]+)\/$/)) && EN_BY_TR[m[1]]) return { en: `/blog/${EN_BY_TR[m[1]]}/`, tr: p };
  if ((m = p.match(/^\/blog\/tags\/([^/]+)\/$/)) && TAGS[dec(m[1])]) return { en: p, tr: `/tr/blog/etiket/${encodeURIComponent(TAGS[dec(m[1])])}/` };
  if ((m = p.match(/^\/tr\/blog\/etiket\/([^/]+)\/$/)) && TAG_EN_BY_TR[dec(m[1])]) return { en: `/blog/tags/${encodeURIComponent(TAG_EN_BY_TR[dec(m[1])])}/`, tr: p };
  return null;
}
const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
// 1-2 yazili etiket sayfalari noindex (BlogTagPage.astro); sitemap'e de girmez.
const TAG_COUNT = {};
for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.md'))) {
  const t = fs.readFileSync(`${blogDir}/${f}`, 'utf8');
  if (!isLive(readFrontmatter(t))) continue;
  const m = t.match(/^tags:\s*\[([^\]]*)\]/m);
  for (const x of (m ? m[1] : '').split(',')) { const k = x.replace(/["']/g, '').trim().toLowerCase(); if (k) TAG_COUNT[k] = (TAG_COUNT[k] || 0) + 1; }
}
const isThinTag = (page) => {
  let m = page.match(/^\/blog\/tags\/([^/]+)\/$/);
  if (m) return (TAG_COUNT[dec(m[1])] ?? 0) < 3;
  m = page.match(/^\/tr\/blog\/etiket\/([^/]+)\/$/);
  if (m) return (TAG_COUNT[TAG_EN_BY_TR[dec(m[1])] ?? ''] ?? 0) < 3;
  return false;
};
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
 * 2026-11-20: asil adres artik https://unutma.meyadestudio.com (eski unutma-blog.vercel.app oraya
 * 301 ile yonlenecek; uygulamanin kullandigi .well-known, /gorev, /duyuru, /api yollari
 * eski adreste kalir — bkz. eski-adres-yonlendirme dali, vercel.json).
 * Domain degisirse YALNIZCA burasi degistirilir; robots.txt, llms.txt ve
 * uygulama semasi bu degerden turedigi icin kendiliginden guncellenir.
 */
const site = process.env.ASTRO_SITE_URL || 'https://unutma.meyadestudio.com';
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
    sitemap({
      filter: (page) => !page.includes('/gorev') && !/\/(tr\/)?404\/?$/.test(page) && !isThinTag(new URL(page).pathname),
      // EN <-> TR karsiliklari (slug haritasi) sitemap'te de bildirilir.
      serialize(item) {
        const u = new URL(item.url);
        const alt = trAlternate(u.pathname);
        if (alt) {
          item.links = [
            { url: new URL(alt.en, item.url).href, lang: 'en' },
            { url: new URL(alt.tr, item.url).href, lang: 'tr' },
          ];
        }
        return item;
      },
    }),
  ],
  markdown: {
    // Yayinda olmayan (draft / ileri tarihli) yaziya verilen link duz metne doner;
    // govde gorsellerine lazy + gercek width/height eklenir. Bkz. src/plugins/rehype-blog.mjs
    rehypePlugins: [rehypeUnpublishedLinks({ blogDir }), rehypeTrLinks(), rehypeImageAttrs({ publicDir })],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
