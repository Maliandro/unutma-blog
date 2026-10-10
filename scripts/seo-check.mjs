// Yazı yayınlamadan önce hızlı SEO kontrolü. Sıfır bağımlılık, sadece okur.
// Çalıştırma: node scripts/seo-check.mjs   (önce npm run build yapılırsa dist/ de kontrol edilir)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = path.join(root, 'src/content/blog');
const distDir = path.join(root, 'dist');
const SUFFIX = ' | Unutma Blog'; // SEOHead.astro başlığa bunu ekliyor
const MIN_INBOUND = 5;
const NEW_DAYS = 30;

// Basit frontmatter okuyucu: sadece düz "anahtar: değer" satırları lazım.
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!m) return data;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return data;
}

const posts = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
  const text = fs.readFileSync(path.join(blogDir, f), 'utf8');
  return { slug: f.replace(/\.md$/, ''), text, fm: frontmatter(text) };
}).filter((p) => p.fm.draft !== 'true');

// Gelen iç link sayısı: başka yazıların gövdesinde /blog/<slug>/ geçen yazı sayısı.
const inbound = Object.fromEntries(posts.map((p) => [p.slug, 0]));
for (const p of posts) {
  for (const q of posts) {
    if (p.slug !== q.slug && p.text.includes(`](/blog/${q.slug}/`)) inbound[q.slug]++;
  }
}

let warnings = 0;
const warn = (msg) => { warnings++; console.log(`  UYARI: ${msg}`); };
const now = Date.now();

console.log(`\n${posts.length} yazı kontrol ediliyor\n`);
for (const p of posts.sort((a, b) => new Date(b.fm.pubDate) - new Date(a.fm.pubDate))) {
  const ageDays = Math.max(0, Math.floor((now - new Date(p.fm.pubDate)) / 86400000));
  const title = p.fm.title || '';
  const desc = p.fm.description || '';
  const full = title.length + SUFFIX.length;
  console.log(`${p.slug}  (${ageDays} gün önce)`);
  console.log(`  gelen iç link: ${inbound[p.slug]} | başlık: ${title.length} (+ek ${full}) | açıklama: ${desc.length}`);
  if (inbound[p.slug] < MIN_INBOUND) {
    if (ageDays <= NEW_DAYS) warn(`yeni yazıya ${MIN_INBOUND} iç link gerekli, şu an ${inbound[p.slug]}. İlgili yazılara cümle içinde link ekle.`);
    else console.log(`  bilgi: ${inbound[p.slug]} iç link var (eski yazı, zorunlu değil)`);
  }
  // Eski yazılarda sadece bilgi ver: sıralanan bir başlığı körlemesine değiştirmek risklidir.
  const note = ageDays <= NEW_DAYS ? warn : (msg) => console.log(`  bilgi: ${msg}`);
  if (full > 65) note(`başlık Google'da kesilebilir (${full} karakter). 60 civarı hedefle.`);
  if (desc.length < 140 || desc.length > 160) note(`açıklama 140–160 karakter olmalı, şu an ${desc.length}.`);
}

// Derleme varsa: canonical etiketi ve sitemap kontrolü.
if (fs.existsSync(distDir)) {
  console.log('\ndist/ kontrolü');
  const sitemap = path.join(distDir, 'sitemap-0.xml');
  const xml = fs.existsSync(sitemap) ? fs.readFileSync(sitemap, 'utf8') : '';
  if (!xml) warn('dist/sitemap-0.xml yok. npm run build çalıştır.');
  for (const p of posts) {
    const page = path.join(distDir, 'blog', p.slug, 'index.html');
    if (!fs.existsSync(page)) { warn(`${p.slug}: sayfa derlenmemiş. npm run build çalıştır.`); continue; }
    const html = fs.readFileSync(page, 'utf8');
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canon) warn(`${p.slug}: canonical etiketi yok.`);
    else if (!canon[1].endsWith(`/blog/${p.slug}/`)) warn(`${p.slug}: canonical başka adresi gösteriyor (${canon[1]}).`);
    if (xml && !xml.includes(`/blog/${p.slug}/</loc>`)) warn(`${p.slug}: sitemap'te yok.`);
  }
  console.log(`  ${posts.length} yazı sayfası, canonical ve sitemap için tarandı.`);
} else {
  console.log('\ndist/ yok: canonical ve sitemap kontrolü için önce npm run build çalıştır.');
}

console.log(warnings ? `\n${warnings} uyarı var. Yayından önce düzelt.` : '\nSorun yok.');
