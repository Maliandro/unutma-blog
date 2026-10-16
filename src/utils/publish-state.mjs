// Zamanlanmis yayin (publishAt) icin TEK kaynak. Hem Astro sayfalari, hem
// astro.config.mjs icindeki rehype eklentisi, hem de scripts/seo-check.mjs
// bu dosyayi kullanir; "yayinda mi?" karari uc yerde farkli verilmesin diye.
//
// Kural: draft: true ise yayinda degil. Degilse yayin anı = publishAt varsa o,
// yoksa pubDate. Bu an derleme anindan SONRAYSA sayfa uretilmez, sitemap'e,
// listelere ve llms.txt'ye girmez; ona verilen ic linkler duz metne doner.
// Statik site oldugu icin yazi, yayin anindan sonraki ILK derlemede cikar
// (gunluk yeniden derleme onerisi: seo/proposals/daily-rebuild.yml).
import fs from 'node:fs';
import path from 'node:path';

/** Derleme ani. Test icin PUBLISH_NOW=2026-10-20 gibi verilebilir. */
export function buildNow() {
  const v = process.env.PUBLISH_NOW;
  const d = v ? new Date(v) : new Date();
  return Number.isNaN(d.valueOf()) ? new Date() : d;
}

function toDate(v) {
  if (v === undefined || v === null || v === '') return undefined;
  const d = v instanceof Date ? v : new Date(String(v));
  return Number.isNaN(d.valueOf()) ? undefined : d;
}

/** data: { draft, pubDate, publishAt } (Astro koleksiyon verisi ya da duz frontmatter). */
export function isLive(data, now = buildNow()) {
  if (data.draft === true || data.draft === 'true') return false;
  const at = toDate(data.publishAt) ?? toDate(data.pubDate);
  if (!at) return true;
  return at.valueOf() <= now.valueOf();
}

/** Basit frontmatter okuyucu: duz "anahtar: deger" satirlari. */
export function readFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!m) return data;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return data;
}

/** src/content/blog altindaki yazilarin { slug, live } listesi. */
export function blogPublishState(blogDir, now = buildNow()) {
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => {
      const fm = readFrontmatter(fs.readFileSync(path.join(blogDir, f), 'utf8'));
      return { slug: f.replace(/\.mdx?$/, ''), live: isLive(fm, now), fm };
    });
}
