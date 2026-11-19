// Blog kapaklari: 1200x630, Unutma yesili zemin + telefon cercevesi icinde GERCEK
// 3.30 uygulama ekran goruntusu (yazinin konusunu anlatan bolum) + kisa baslik.
// Yapay zeka gorseli / stok fotograf YOK.
//
// Cikti: public/blog/covers/v3/<slug>.jpg (og:image) + .webp (sayfa ici, <=120 KB).
// Kullanim:
//   KAPAK_KAYNAK="C:/.../marketing/unutma/magaza-3.30/ham/en" node scripts/kapak-uret.mjs [slug ...]
// Playwright (global kurulum) + sharp gerekir. Yeni yazi eklenince KAPAKLAR'a bir satir ekle.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Turkce kapaklar: KAPAK_DIL=tr node scripts/kapak-uret.mjs  (basliklar scripts/kapak-tr.json,
// ekranlar ham/tr, cikti public/blog/covers/v3-tr/)
const TR = process.env.KAPAK_DIL === 'tr';
const SRC =
  process.env.KAPAK_KAYNAK ||
  `C:/projelerim/PROJELERİM/marketing/unutma/magaza-3.30/ham/${TR ? 'tr' : 'en'}`;
const OUT = path.join(root, TR ? 'public/blog/covers/v3-tr' : 'public/blog/covers/v3');
const TRT = TR ? JSON.parse(fs.readFileSync(path.join(root, 'scripts/kapak-tr.json'), 'utf8')) : {};
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = createRequire(path.join(globalRoot, 'noop.js'))('playwright');

/** Zemin temalari (3.30 kimligi). */
const THEMES = {
  brand: { bg: '#087F5B', bg2: '#0A6E50', ink: '#FFFFFF', sub: 'rgba(255,255,255,.78)', chip: 'rgba(255,255,255,.14)', chipInk: '#FFFFFF', blob: 'rgba(47,191,113,.35)' },
  deep: { bg: '#05553D', bg2: '#06422F', ink: '#FFFFFF', sub: 'rgba(255,255,255,.75)', chip: 'rgba(47,191,113,.22)', chipInk: '#BFF0D3', blob: 'rgba(8,127,91,.55)' },
  ink: { bg: '#0F2A1F', bg2: '#123526', ink: '#FFFFFF', sub: 'rgba(255,255,255,.72)', chip: 'rgba(47,191,113,.2)', chipInk: '#8FE3B4', blob: 'rgba(8,127,91,.45)' },
  mint: { bg: '#EAF5EE', bg2: '#D5E6DB', ink: '#0F2A1F', sub: '#3d5a4b', chip: '#087F5B', chipInk: '#FFFFFF', blob: 'rgba(47,191,113,.22)' },
  leaf: { bg: '#0d6636', bg2: '#0a5230', ink: '#FFFFFF', sub: 'rgba(255,255,255,.78)', chip: 'rgba(255,255,255,.14)', chipInk: '#FFFFFF', blob: 'rgba(47,191,113,.4)' },
};

/**
 * slug -> { shot: ekran dosyasi, title: kapak basligi, chip: konu, theme,
 *           y: gorunen bolumun ust kenari (ekran yuksekliginin orani), zoom, tilt, alt }
 */
export const KAPAKLAR = {
  '50-30-20-budget-rule-explained': { shot: 'e-economy', title: 'The 50/30/20 rule, worked out', chip: 'Budgeting', theme: 'brand', y: 0.1, zoom: 1.25, tilt: -4, alt: 'Unutma Budget screen showing monthly income, expense and balance' },
  'a-phone-assistant-without-an-llm': { shot: 'a2', title: 'One sentence, three records. No LLM.', chip: 'Engineering', theme: 'ink', y: 0.12, zoom: 1.2, tilt: 0, alt: 'Unutma assistant splitting one sentence into a calendar entry, a shopping item and a budget expense' },
  'best-offline-todo-app': { shot: 'e-todo', title: 'What makes a great offline to-do app', chip: 'Offline', theme: 'deep', y: 0.06, zoom: 1.2, tilt: 4, alt: 'Unutma to-do list with upcoming tasks, running offline on the phone' },
  'beyond-the-todo-list-the-forgot-check-loop': { shot: 'e-actions', title: '“Did I lock the door?” Answered.', chip: 'Mental load', theme: 'brand', y: 0.4, zoom: 1.3, tilt: -3, alt: 'Unutma Quick Actions log: locked the door, turned off the stove, took medicine' },
  'free-academic-research-tools-for-students': { shot: 'e-calendar', title: 'Research tools before you pay for more apps', chip: 'Students', theme: 'mint', y: 0.08, zoom: 1.15, tilt: 3, alt: 'Unutma monthly calendar for planning a semester' },
  'how-to-build-a-morning-routine': { shot: 'e-reminders', title: 'A morning & evening routine template', chip: 'Routines', theme: 'leaf', y: 0.1, zoom: 1.25, tilt: -4, alt: 'Unutma reminders grouped into morning and evening routines' },
  'how-to-build-habits-that-stick': { shot: 'e-calendar', title: 'Habits that survive a missed day', chip: 'Habits', theme: 'deep', y: 0.53, zoom: 1.3, tilt: 3, alt: 'Unutma day summary with gentle goals and the note that missing a day is okay' },
  'how-to-organize-a-literature-review-without-getting-lost': { shot: 'e-todo', title: 'Organize a literature review, not 47 tabs', chip: 'Research', theme: 'mint', y: 0.55, zoom: 1.3, tilt: -3, alt: 'Unutma to-do list with upcoming tasks such as finishing project slides' },
  'how-to-organize-your-life': { shot: 'e-home', title: 'How to organize your life: the app inventory', chip: 'Organization', theme: 'brand', y: 0.0, zoom: 1.0, tilt: 4, alt: 'Unutma home screen: say something or ask, with My records' },
  'how-to-set-and-track-goals': { shot: 'e-todo', title: 'Goals that turn into days', chip: 'Goals', theme: 'leaf', y: 0.36, zoom: 1.3, tilt: -3, alt: 'Unutma to-do list with tasks done today and tasks to go' },
  'how-to-start-a-digital-journal': { shot: 'e-journal', title: 'Start a digital journal in 7 days', chip: 'Journal', theme: 'deep', y: 0.08, zoom: 1.25, tilt: 3, alt: 'Unutma journal screen with today’s entry and a mood picker' },
  'how-to-stop-forgetting-things': { shot: 'a1-bday', title: 'How to stop forgetting things', chip: 'Memory', theme: 'brand', y: 0.6, zoom: 1.3, tilt: -4, alt: 'Unutma assistant remembering Mom’s birthday and answering when it is' },
  'how-to-track-personal-expenses': { shot: 'a3', title: 'Track your expenses for 30 days', chip: 'Money', theme: 'ink', y: 0.05, zoom: 1.3, tilt: 3, alt: 'Unutma assistant answering how much was spent on groceries this month' },
  'journaling-prompts-for-self-improvement': { shot: 'e-journal', title: '30 journaling prompts for self-improvement', chip: 'Journal', theme: 'mint', y: 0.2, zoom: 1.35, tilt: -3, alt: 'Unutma journal mood history for the last seven days' },
  'keep-your-data-safe-on-your-phone': { shot: 'kontrol/11-kasa-c', title: 'Keep personal data on your phone, safely', chip: 'Privacy', theme: 'ink', y: 0.22, zoom: 1.2, tilt: 4, alt: 'Unutma notice: your data is stored encrypted on your device' },
  'move-unutma-to-a-new-phone': { shot: 'kontrol/03-koyu-home', title: 'Move your Unutma data to a new phone', chip: 'How-to', theme: 'leaf', y: 0, zoom: 1.1, tilt: -4, alt: 'Unutma home screen in dark mode' },
  'notes-app-no-account-offline': { shot: 'a1-park', title: 'A notes app with no account, offline', chip: 'Notes', theme: 'brand', y: 0.6, zoom: 1.15, tilt: 3, alt: 'Unutma saving a quick note and recalling it later' },
  'our-story-we-want-your-feedback': { shot: 'e-home', title: 'Our story, and your ideas', chip: 'Unutma', theme: 'deep', y: 0.22, zoom: 1.2, tilt: -3, alt: 'Unutma assistant home screen with its green icon' },
  'simple-budgeting-tips-for-beginners': { shot: 'e-economy', title: 'Budgeting tips: your first month', chip: 'Budgeting', theme: 'mint', y: 0.42, zoom: 1.3, tilt: 4, alt: 'Unutma six-month spending trend chart' },
  'todo-list-app-no-account-offline': { shot: 'e-todo', title: 'A to-do app with no sign-up, no email', chip: 'No account', theme: 'brand', y: 0.12, zoom: 1.3, tilt: -3, alt: 'Unutma to-do list working without an account' },
  'unutma-app-complete-feature-guide': { shot: 'e-actions', title: 'Inside Unutma: every feature, explained', chip: 'Guide', theme: 'ink', y: 0.0, zoom: 1.0, tilt: 4, alt: 'Unutma main screen with next plan, today’s items and quick actions' },
  'unutma-app-showcase-complete-guide': { shot: 'a2', title: 'The private life organizer, in one tour', chip: 'Showcase', theme: 'leaf', y: 0.26, zoom: 1.15, tilt: -4, alt: 'Unutma assistant saving a calendar entry, a shopping item and a budget expense' },
  'unutma-economy-expenses-budgets-assets': { shot: 'e-economy', title: 'Money clarity without bank linking', chip: 'Finance', theme: 'deep', y: 0.0, zoom: 1.0, tilt: 3, alt: 'Unutma Budget screen with income, expense, balance and trends' },
  'unutma-journal-mood-voice-reflection': { shot: 'e-journal', title: 'Journaling without performance', chip: 'Journal', theme: 'leaf', y: 0.0, zoom: 1.0, tilt: -4, alt: 'Unutma journal with today’s entry and mood history' },
  'unutma-lists-todo-shopping-wishlist-workflow': { shot: 'e-shopping', title: 'To-do, shopping, wishlist: one tab', chip: 'Lists', theme: 'brand', y: 0.08, zoom: 1.25, tilt: 3, alt: 'Unutma shopping list with quantities' },
  'unutma-quick-actions-streaks-heatmap-statistics': { shot: 'e-actions', title: 'Quick actions: one tap, logged', chip: 'Habits', theme: 'mint', y: 0.5, zoom: 1.35, tilt: -3, alt: 'Unutma quick actions with times logged' },
  'unutma-routines-calendar-widgets-time': { shot: 'e-reminders', title: 'Reminders that work offline', chip: 'Routines', theme: 'ink', y: 0.4, zoom: 1.3, tilt: 4, alt: 'Unutma evening routine with a phone alarm option' },
  'unutma-themes-games-languages-backup': { shot: 'kontrol/03-koyu-eco', title: 'Themes, languages, backup: the human layer', chip: 'Unutma', theme: 'brand', y: 0, zoom: 1.1, tilt: -3, alt: 'Unutma Budget screen in the dark theme' },
  'unutma-vault-passwords-face-id-privacy': { shot: 'kontrol/11-kasa-a', title: 'Your vault stays on your phone', chip: 'Security', theme: 'ink', y: 0.12, zoom: 1.25, tilt: 3, alt: 'Unutma Vault locked behind fingerprint or face recognition' },
  'unutma-voice-commands-hands-free-organizing': { shot: 'e-home', title: 'Talk to Unutma', chip: 'Voice', theme: 'brand', y: 0.12, zoom: 1.25, tilt: -4, alt: 'Unutma voice assistant: say something or ask' },
  'weekly-planning-tips': { shot: 'a3', title: 'A 20-minute weekly review', chip: 'Planning', theme: 'leaf', y: 0.4, zoom: 1.3, tilt: 3, alt: 'Unutma showing what is on the calendar tomorrow' },
  'why-you-should-use-offline-apps': { shot: 'kontrol/03-koyu-asistan', title: 'Apps that work offline: a 5-step test', chip: 'Offline', theme: 'mint', y: 0.6, zoom: 1.25, tilt: -3, alt: 'Unutma assistant in dark mode, running offline on the phone' },
  'welcome-to-unutma-blog': { shot: 'e-home', title: 'Welcome to the Unutma blog', chip: 'Unutma', theme: 'mint', y: 0.0, zoom: 1.0, tilt: 3, alt: 'Unutma home screen' },
  // Site geneli varsayilan paylasim gorseli (ana sayfa, SSS, hakkinda...)
  'site-default': { shot: 'a2', title: 'Write one sentence. Unutma files it.', chip: 'Offline · No account', theme: 'brand', y: 0.12, zoom: 1.15, tilt: -3, alt: 'Unutma' },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const fontUrl = pathToFileURL(path.join(root, 'public/fonts/plus-jakarta-sans-normal-latin.woff2')).href;
const iconUrl = pathToFileURL(path.join(root, 'public/unutma-icon.png')).href;

function html(k) {
  const t = THEMES[k.theme];
  // 'kontrol/11-kasa-a' gibi bolu iceren ad: magaza-3.30 klasorune gore (SRC'nin iki ustu)
  const shotFile = k.shot.includes('/') ? path.join(SRC, '..', '..', `${k.shot}.png`) : path.join(SRC, `${k.shot}.png`);
  const shot = pathToFileURL(shotFile).href;
  // zoom = telefonun buyuklugu (ekran yana kirpilmaz, yalniz dikeyde secilen bolum gorunur)
  const SW = Math.round(300 * k.zoom);
  const SH = Math.round((SW * 2796) / 1290);
  const ty = -Math.round(Math.min(k.y * SH, SH - 560));
  const phoneLeft = 1200 - 64 - (SW + 24);
  const titleW = Math.min(600, phoneLeft - 72 - 36);
  const long = k.title.length > 34 || titleW < 540;
  return `<!doctype html><html lang="${TR ? 'tr' : 'en'}"><head><meta charset="utf-8"><style>
@font-face{font-family:J;src:url(${fontUrl}) format('woff2');font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:J,sans-serif;
 background:radial-gradient(120% 140% at 0% 0%, ${t.bg} 0%, ${t.bg} 45%, ${t.bg2} 100%);position:relative}
.blob{position:absolute;border-radius:50%;background:${t.blob};filter:blur(2px)}
.l{position:absolute;left:72px;top:64px;width:${titleW}px;height:502px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:14px;color:${t.ink};font-weight:700;font-size:24px;letter-spacing:-.01em}
.brand img{width:46px;height:46px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,.15)}
.brand span{opacity:.92}
.chip{align-self:flex-start;margin-top:auto;background:${t.chip};color:${t.chipInk};font-weight:700;font-size:17px;
 letter-spacing:.08em;text-transform:uppercase;padding:8px 16px;border-radius:999px}
h1{margin-top:20px;color:${t.ink};font-weight:800;font-size:${long ? 54 : 62}px;line-height:1.06;letter-spacing:-.035em;max-width:${titleW}px}
.ph{position:absolute;left:${phoneLeft}px;top:58px;width:${SW + 24}px;height:${SH + 24}px;border-radius:54px;background:#0b1712;
 padding:12px;transform:rotate(${k.tilt}deg);transform-origin:50% 0;
 box-shadow:0 30px 60px -20px rgba(0,0,0,.45),0 0 0 2px rgba(255,255,255,.08) inset}
.sc{width:${SW}px;height:${SH}px;border-radius:43px;overflow:hidden;position:relative;background:#fff}
.sc img{position:absolute;left:0;top:${ty}px;width:${SW}px;height:${SH}px}
.notch{position:absolute;left:50%;top:22px;width:96px;height:28px;margin-left:-48px;border-radius:20px;background:#0b1712;z-index:2;${k.y > 0.02 ? 'display:none' : ''}}
</style></head><body>
<div class="blob" style="width:520px;height:520px;right:-60px;top:-140px"></div>
<div class="blob" style="width:300px;height:300px;left:${k.tilt < 0 ? 420 : 520}px;bottom:-200px;opacity:.6"></div>
<div class="l"><div class="brand"><img src="${iconUrl}" alt=""><span>Unutma Blog</span></div>
<div class="chip">${esc(k.chip)}</div><h1>${esc(k.title)}</h1></div>
<div class="ph"><div class="notch"></div><div class="sc"><img src="${shot}" alt=""></div></div>
</body></html>`;
}

async function encode(png, slug) {
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`));
  let q = 82;
  for (;;) {
    const buf = await sharp(png).webp({ quality: q, effort: 6 }).toBuffer();
    if (buf.length <= 120 * 1024 || q <= 40) {
      fs.writeFileSync(path.join(OUT, `${slug}.webp`), buf);
      return buf.length;
    }
    q -= 6;
  }
}

fs.mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
if (TR) for (const [slug, v] of Object.entries(TRT)) Object.assign(KAPAKLAR[slug], v);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [slug, k] of Object.entries(KAPAKLAR)) {
  if (only.length && !only.includes(slug)) continue;
  if (TR && !TRT[slug]) continue;
  const tmp = path.join(os.tmpdir(), `kapak-${slug}.html`);
  fs.writeFileSync(tmp, html(k));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  const size = await encode(png, slug);
  console.log(slug, Math.round(size / 1024) + ' KB');
}
await browser.close();
