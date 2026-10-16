// public/blog ve public/launch altindaki PNG/JPG gorsellerin yanina en fazla 1200 px
// genislikte .webp kopyasini uretir (ayni ad, uzanti .webp). Orijinal dosyaya dokunmaz:
// og:image (sosyal paylasim) orijinali kullanmaya devam eder. Sayfa icinde ise
// src/utils/webp.ts ve src/plugins/rehype-blog.mjs .webp kopyasi varsa onu kullanir.
// Yeni ekran goruntusu eklenince bir kez calistir: node scripts/make-webp.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['public/blog', 'public/launch'].map((d) => path.join(root, d));
const files = [];
const walk = (d) => {
  if (!fs.existsSync(d)) return;
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(png|jpe?g)$/i.test(f.name)) files.push(p);
  }
};
dirs.forEach(walk);
// Sadece src/ icinde gercekten kullanilan gorseller (yetim dosyalara kopya uretme).
const used = new Set();
const scan = (d) => {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) scan(p);
    else if (/\.(md|mdx|astro|ts|mjs)$/.test(f.name)) {
      for (const m of fs.readFileSync(p, 'utf8').matchAll(/\/(?:blog|launch)\/[\w./-]+\.(?:png|jpe?g)/gi)) used.add(m[0]);
    }
  }
};
scan(path.join(root, 'src'));
files.splice(0, files.length, ...files.filter((f) => used.has('/' + path.relative(path.join(root, 'public'), f).split(path.sep).join('/'))));
let made = 0;
for (const f of files) {
  const out = f.replace(/\.(png|jpe?g)$/i, '.webp');
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(f).mtimeMs) continue;
  await sharp(f).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  const a = fs.statSync(f).size, b = fs.statSync(out).size;
  console.log(`${path.relative(root, out)}  ${Math.round(a / 1024)} KB -> ${Math.round(b / 1024)} KB`);
  made++;
}
console.log(`${made} webp uretildi, ${files.length - made} guncel.`);
