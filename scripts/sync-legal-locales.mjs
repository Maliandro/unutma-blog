import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.resolve(__dirname, '..');
const appLocalesDir = path.resolve(blogRoot, '..', 'src', 'locales');
const outDir = path.resolve(blogRoot, 'src', 'data', 'legal', 'locales');

const langs = ['en', 'tr', 'de', 'es', 'fr', 'it', 'zh', 'ar'];

try {
  await access(appLocalesDir);
} catch {
  console.log('App locales not found — using committed legal/locales/*.json');
  process.exit(0);
}

await mkdir(outDir, { recursive: true });

for (const lang of langs) {
  const source = path.join(appLocalesDir, `${lang}.json`);
  const raw = await readFile(source, 'utf8');
  const parsed = JSON.parse(raw);
  const legal = parsed.legal;
  if (!legal) {
    throw new Error(`Missing legal block in ${source}`);
  }
  await writeFile(
    path.join(outDir, `${lang}.json`),
    `${JSON.stringify(legal, null, 2)}\n`,
    'utf8',
  );
}

console.log(`Synced legal locales → ${outDir}`);
