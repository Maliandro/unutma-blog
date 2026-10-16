// Yazı yayınlamadan önce hızlı SEO kontrolü. Sıfır bağımlılık, sadece okur; hiçbir dosyayı değiştirmez.
// Çalıştırma: npm run build && node scripts/seo-check.mjs
// Çıkış kodu: HATA varsa 1 (yayınlama), yalnız UYARI varsa 0.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isLive, readFrontmatter } from '../src/utils/publish-state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = path.join(root, 'src/content/blog');
const distDir = path.join(root, 'dist');
const SUFFIX = ' | Unutma Blog'; // SEOHead.astro başlığa bunu ekliyor
const MIN_INBOUND = 5;
const NEW_DAYS = 30;
// Haftada-tek kuralının başladığı gün (sahibinin kararı). Öncesindeki toplu üretim burada sayılmaz.
const WEEKLY_RULE_START = '2026-10-10';

// RAKİP MARKA LİSTESİ (sahibinin kararı 16 Eki 2026: blogda rakip uygulama adı geçmez).
// Derlenmiş HTML'in TAMAMINDA aranır, hiçbir sayfa hariç tutulmaz. Büyük/küçük harf duyarlı,
// kelime sınırıyla ("Notion" yakalanır, "notion" kelimesi yakalanmaz). Yeni rakip = buraya bir satır.
const COMPETITOR_BRANDS = [
  // not / yapılacaklar / planlayıcı
  'Google Keep', 'Google Tasks', 'Todoist', 'Microsoft To Do', 'Microsoft To-Do', 'Wunderlist',
  'Evernote', 'Notion', 'OneNote', 'Apple Notes', 'Apple Reminders', 'Any.do', 'TickTick', 'Trello',
  'Obsidian', 'Bear Notes', 'Simplenote', 'Standard Notes', 'Joplin', 'Things 3', 'Goodnotes',
  'GoodNotes', 'Notability', 'Tiimo', 'Fantastical', 'Habitica', 'Loop Habit Tracker',
  // günlük
  'Day One', 'Daylio', 'Reflectly', 'Diarium',
  // şifre kasası
  '1Password', 'LastPass', 'Bitwarden', 'Dashlane', 'KeePass', 'Keeper Security', 'NordPass',
  // bütçe
  'YNAB', 'You Need a Budget', 'Mint', 'Spendee', 'Wallet by BudgetBakers', 'Monefy',
  // asistan
  'ChatGPT', 'Siri', 'Google Assistant', 'Alexa', 'Gemini', 'Copilot',
];

// Kalıp yapay zeka ifadeleri (UYARI). Küçük harfle karşılaştırılır.
const AI_CLICHES = [
  "in today's fast-paced world", 'in today’s fast-paced world', 'in conclusion', 'delve', 'game-changer',
  'game changer', 'unlock the power', 'unleash', 'look no further', 'in the realm of', 'navigate the complexities',
  'a testament to', "it's important to note", 'it’s important to note', 'embark on a journey', 'elevate your',
  'seamlessly', 'supercharge', 'tapestry', 'ever-evolving', 'whether you are a', 'harness the power',
];

// Kendi alanlarımız: "resmi dış kaynak" sayılmaz.
const OWN_HOSTS = ['unutma-blog.vercel.app', 'apps.apple.com', 'play.google.com'];

const errors = [];
let warnings = 0;
const warn = (msg) => { warnings++; console.log(`  UYARI: ${msg}`); };
const error = (msg) => { errors.push(msg); console.log(`  HATA: ${msg}`); };
const now = Date.now();

const all = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
  const text = fs.readFileSync(path.join(blogDir, f), 'utf8');
  return { slug: f.replace(/\.md$/, ''), text, body: text.replace(/^---[\s\S]*?\n---/, ''), fm: readFrontmatter(text) };
});
const posts = all.filter((p) => isLive(p.fm));
const scheduled = all.filter((p) => !isLive(p.fm) && p.fm.draft !== 'true');

// Gelen iç link sayısı: başka (yayındaki) yazıların gövdesinde /blog/<slug>/ geçen yazı sayısı.
const inbound = Object.fromEntries(all.map((p) => [p.slug, 0]));
for (const p of all) {
  for (const q of posts) {
    if (p.slug !== q.slug && q.text.includes(`](/blog/${p.slug}/`)) inbound[p.slug]++;
  }
}

const plainWords = (md) => md
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/[#>*_`|]/g, ' ')
  .split(/\s+/).filter(Boolean);

function faqCount(body) {
  const m = body.match(/^#{2,3} .*(FAQ|Frequently asked|Common questions|Questions)[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/im);
  if (!m) return 0;
  const sec = m[2];
  const h = (sec.match(/^#{3,4} .+/gm) || []).length;
  const q = (sec.match(/^\s*(\*\*|-\s*\*\*)?[^\n]{5,}\?\s*(\*\*)?\s*$/gm) || []).length;
  return Math.max(h, q);
}

function externalSources(body) {
  const urls = [...body.matchAll(/\]\((https?:\/\/[^)\s]+)\)|href="(https?:\/\/[^"]+)"/g)].map((m) => m[1] || m[2]);
  const hosts = new Set();
  for (const u of urls) {
    try {
      const h = new URL(u).hostname.replace(/^www\./, '');
      if (!OWN_HOSTS.some((o) => h === o || h.endsWith('.' + o))) hosts.add(h);
    } catch { /* bozuk adres */ }
  }
  return hosts;
}

console.log(`\n${posts.length} yayındaki yazı kontrol ediliyor (${scheduled.length} zamanlanmış, ${all.filter((p) => p.fm.draft === 'true').length} taslak)\n`);
for (const p of posts.sort((a, b) => new Date(b.fm.pubDate) - new Date(a.fm.pubDate))) {
  const ageDays = Math.max(0, Math.floor((now - new Date(p.fm.publishAt || p.fm.pubDate)) / 86400000));
  const isNew = ageDays <= NEW_DAYS;
  const title = p.fm.seoTitle || p.fm.title || '';
  const desc = p.fm.description || '';
  const full = title.length + SUFFIX.length;
  const words = plainWords(p.body);
  console.log(`${p.slug}  (${ageDays} gün önce, ${words.length} kelime)`);
  console.log(`  gelen iç link: ${inbound[p.slug]} | başlık: ${title.length} (+ek ${full}) | açıklama: ${desc.length}`);
  const note = isNew ? warn : (msg) => console.log(`  bilgi: ${msg}`);
  if (inbound[p.slug] < MIN_INBOUND) {
    if (isNew) warn(`yeni yazıya ${MIN_INBOUND} iç link gerekli, şu an ${inbound[p.slug]}. İlgili yazılara cümle içinde link ekle.`);
    else console.log(`  bilgi: ${inbound[p.slug]} iç link var (eski yazı, zorunlu değil)`);
  }
  // Eski yazılarda sadece bilgi ver: sıralanan bir başlığı körlemesine değiştirmek risklidir.
  if (full > 65) note(`başlık Google'da kesilebilir (${full} karakter). 60 civarı hedefle.`);
  if (desc.length < 140 || desc.length > 160) note(`açıklama 140–160 karakter olmalı, şu an ${desc.length}.`);

  // Hedef kelime ilk 100 kelimede mi
  if (!p.fm.keyword) note('frontmatter\'da keyword: yok (bir kelime = bir sayfa kuralı için yaz).');
  else {
    const first = words.slice(0, 100).join(' ').toLowerCase();
    if (!first.includes(p.fm.keyword.toLowerCase())) warn(`keyword "${p.fm.keyword}" ilk 100 kelimede geçmiyor.`);
  }
  // SSS
  const faq = faqCount(p.body);
  if (faq < 4 || faq > 8) note(`SSS bölümü 4–8 soru olmalı, şu an ${faq}.`);
  // Resmi dış kaynak
  const ext = externalSources(p.body);
  if (ext.size < 2) note(`2–3 resmi dış kaynak önerilir, şu an ${ext.size}${ext.size ? ` (${[...ext].join(', ')})` : ''}.`);
  else if (ext.size > 3) console.log(`  bilgi: ${ext.size} farklı dış kaynak (${[...ext].join(', ')})`);
  // Kalıp ifadeler
  const low = p.body.toLowerCase();
  const hits = AI_CLICHES.filter((c) => low.includes(c));
  if (hits.length) warn(`kalıp yapay zeka ifadesi: ${hits.map((h) => `"${h}"`).join(', ')}`);
  // Alt metni olmayan görsel (kaynakta)
  const emptyMdAlt = (p.body.match(/!\[\s*\]\([^)]*\)/g) || []).length;
  const noAltHtml = (p.body.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length;
  if (emptyMdAlt + noAltHtml) warn(`${emptyMdAlt + noAltHtml} görselde alt metni yok.`);
  if (p.fm.image && !p.fm.imageAlt && isNew) warn('kapak görseli için imageAlt yok.');
  // "best" başlıkta
  if (/\bbest\b/i.test(p.fm.title || '') || /\bbest\b/i.test(p.fm.seoTitle || '')) warn('başlıkta "best" var (üstünlük iddiası yazılmaz).');
}

// Haftada tek yazı: yakın tarihli (yayın ya da zamanlanmış) yazılardan aynı 7 güne düşenler.
{
  const recent = all
    .filter((p) => p.fm.draft !== 'true')
    .map((p) => ({ slug: p.slug, at: new Date(p.fm.publishAt || p.fm.pubDate).valueOf() }))
    .filter((p) => p.at >= new Date(WEEKLY_RULE_START).valueOf())
    .sort((a, b) => a.at - b.at);
  console.log(`\nHaftada tek yazı kontrolü (${WEEKLY_RULE_START} sonrası + zamanlanmış)`);
  for (let i = 1; i < recent.length; i++) {
    const gap = (recent[i].at - recent[i - 1].at) / 86400000;
    if (gap < 7) warn(`${recent[i - 1].slug} ve ${recent[i].slug} arasında ${gap.toFixed(1)} gün var (en az 7).`);
  }
  for (const s of scheduled) console.log(`  zamanlanmış: ${s.slug} → ${s.fm.publishAt || s.fm.pubDate}`);
}

// Derleme varsa: canonical, sitemap, H1, marka, fiyat, "best", alt.
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
  for (const s of [...scheduled, ...all.filter((p) => p.fm.draft === 'true')]) {
    if (fs.existsSync(path.join(distDir, 'blog', s.slug, 'index.html'))) error(`${s.slug}: yayında olmaması gerekirken derlenmiş.`);
    if (xml.includes(`/blog/${s.slug}/</loc>`)) error(`${s.slug}: yayında değil ama sitemap'te.`);
  }
  console.log(`  ${posts.length} yazı sayfası, canonical ve sitemap için tarandı.`);

  // Tüm HTML sayfaları
  const files = [];
  (function walk(d) {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const fp = path.join(d, f.name);
      if (f.isDirectory()) walk(fp);
      else if (f.name.endsWith('.html')) files.push(fp);
    }
  })(distDir);
  const brandRe = new RegExp(`(?<![A-Za-z0-9])(${COMPETITOR_BRANDS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![A-Za-z0-9])`, 'g');
  const priceRe = /(?:[$€₺£]\s?\d(?:[\d.,]*\d)?|\b\d(?:[\d.,]*\d)?\s?(?:USD|EUR|TL|TRY)\b)/g;
  for (const fp of files) {
    const rel = path.relative(distDir, fp).split(path.sep).join('/');
    const html = fs.readFileSync(fp, 'utf8');
    const isPage = /<title>/.test(html);
    const noindex = /name="robots" content="[^"]*noindex/.test(html);
    // Marka: script/stil dahil her şey taranır (JSON-LD de yayındır).
    const brands = [...new Set([...html.matchAll(brandRe)].map((m) => m[1]))];
    if (brands.length) error(`${rel}: rakip marka adı geçiyor: ${brands.join(', ')}`);
    if (!isPage) continue;
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (!noindex && h1 !== 1) error(`${rel}: ${h1} adet H1 var, tam 1 olmalı.`);
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
    const prices = [...new Set(text.match(priceRe) || [])];
    if (prices.length) warn(`${rel}: fiyat ifadesi: ${prices.slice(0, 5).join(', ')}`);
    const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const h1t = ((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '');
    if (/\bbest\b/i.test(t) || /\bbest\b/i.test(h1t)) warn(`${rel}: başlık/H1'de "best" var.`);
    const noAlt = (html.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length;
    if (noAlt) warn(`${rel}: ${noAlt} görselde alt özniteliği yok.`);
  }
  console.log(`  ${files.length} HTML dosyası H1, rakip marka, fiyat, "best" ve alt için tarandı.`);
} else {
  console.log('\ndist/ yok: canonical, sitemap, H1 ve marka kontrolü için önce npm run build çalıştır.');
}

if (errors.length) {
  console.log(`\n${errors.length} HATA, ${warnings} uyarı. HATA varken yayınlama.`);
  process.exit(1);
}
console.log(warnings ? `\n${warnings} uyarı var. Yeni yazıda yayından önce düzelt.` : '\nSorun yok.');
