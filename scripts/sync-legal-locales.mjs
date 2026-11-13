import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Privacy policy text has ONE source: the app's src/locales/<lang>.json (legal.privacyContent),
// so the in-app policy and /privacy/<lang> never drift apart. Only the privacy part is synced
// (lastUpdatedDate + privacyContent); the site's terms text is maintained here.
// App checkout: ../../u40-b (blog lives in "UNUTTUM MU APP/.vscode/unutma-blog").
// Override with APP_LOCALES_DIR=/path/to/app/src/locales.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, '..');
const appLocalesDir = process.env.APP_LOCALES_DIR
  ? path.resolve(process.env.APP_LOCALES_DIR)
  : path.resolve(blogRoot, '..', '..', 'u40-b', 'src', 'locales');
const outDir = path.resolve(blogRoot, 'src', 'data', 'legal', 'locales');

const langs = ['en', 'tr', 'de', 'es', 'fr', 'it'];

try {
  await access(appLocalesDir);
} catch {
  console.log('App locales not found — using committed legal/locales/*.json');
  process.exit(0);
}

await mkdir(outDir, { recursive: true });

for (const lang of langs) {
  const source = path.join(appLocalesDir, `${lang}.json`);
  const legal = JSON.parse(await readFile(source, 'utf8')).legal;
  if (!legal?.privacyContent || !legal?.lastUpdatedDate) {
    throw new Error(`Missing legal.privacyContent / legal.lastUpdatedDate in ${source}`);
  }
  const target = path.join(outDir, `${lang}.json`);
  const site = JSON.parse(await readFile(target, 'utf8'));
  site.lastUpdatedDate = legal.lastUpdatedDate;
  site.privacyContent = legal.privacyContent;
  await writeFile(target, `${JSON.stringify(site, null, 2)}\n`, 'utf8');
}

console.log(`Synced privacy policy text → ${outDir}`);
