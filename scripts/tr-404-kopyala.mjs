// Cloudflare Pages en yakin 404.html dosyasini kullanir: /tr/ altindaki bilinmeyen adresler
// Turkce 404 sayfasini gorsun diye dist/tr/404/index.html -> dist/tr/404.html kopyalanir.
import fs from 'node:fs';
const src = 'dist/tr/404/index.html';
if (fs.existsSync(src)) fs.copyFileSync(src, 'dist/tr/404.html');
