// IndexNow bildirimi (Bing, Yandex, Seznam, Naver... Google IndexNow KULLANMAZ).
// VARSAYILAN KURU CALISMA: hicbir sey gondermez, sadece ne gonderecegini yazar.
//
//   node scripts/indexnow-submit.mjs                 # kuru: dist/sitemap-0.xml'deki tum adresler
//   node scripts/indexnow-submit.mjs --only /blog/x/  # kuru: tek adres
//   node scripts/indexnow-submit.mjs --live          # kuru: canli site haritasini okur
//   node scripts/indexnow-submit.mjs --submit        # GERCEK gonderim (sahibin onayi ile)
//
// Anahtar dosyasi public/<KEY>.txt olarak yayinda olmali (Vercel derlemesi bittikten sonra).
// Beklenen yanit 202 (kabul, dogrulama bekliyor) ya da 200 (kabul).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = '932277e70982d3f8a82a1812cf04a6fe';
const SITE = (process.env.ASTRO_SITE_URL || 'https://unutma-blog.vercel.app').replace(/\/$/, '');
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const submit = args.includes('--submit');
const live = args.includes('--live');
const onlyIdx = args.indexOf('--only');
const only = onlyIdx >= 0 ? args.slice(onlyIdx + 1).filter((a) => !a.startsWith('--')) : [];

async function sitemapUrls() {
  let xml;
  if (live) {
    const idx = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
    const maps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    xml = (await Promise.all(maps.map(async (u) => (await fetch(u)).text()))).join('\n');
  } else {
    const f = path.join(root, 'dist', 'sitemap-0.xml');
    if (!fs.existsSync(f)) throw new Error('dist/sitemap-0.xml yok: once npm run build');
    xml = fs.readFileSync(f, 'utf8');
  }
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const keyFile = path.join(root, 'public', `${KEY}.txt`);
if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, 'utf8').trim() !== KEY) {
  console.error(`Anahtar dosyasi eksik ya da yanlis: public/${KEY}.txt`);
  process.exit(1);
}

const urls = only.length ? only.map((u) => (u.startsWith('http') ? u : SITE + u)) : await sitemapUrls();
const body = {
  host: new URL(SITE).host,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList: urls.filter((u) => u.startsWith(SITE)).slice(0, 10000),
};

console.log(`${body.urlList.length} adres, uc nokta: ${ENDPOINT}`);
for (const u of body.urlList.slice(0, 10)) console.log('  ' + u);
if (body.urlList.length > 10) console.log(`  ... ve ${body.urlList.length - 10} adres daha`);

if (!submit) {
  console.log('\nKURU CALISMA: hicbir sey gonderilmedi. Gercek gonderim icin --submit (sahibin onayi ile).');
  process.exit(0);
}

const keyCheck = await fetch(body.keyLocation);
if (keyCheck.status !== 200) {
  console.error(`Anahtar dosyasi canlida yok (${keyCheck.status}): ${body.keyLocation}. Once deploy.`);
  process.exit(1);
}
const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow yaniti: ${res.status} ${res.statusText}`);
if (res.status !== 202 && res.status !== 200) {
  console.error(await res.text());
  process.exit(1);
}
