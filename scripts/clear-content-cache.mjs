// Derlemeden once Astro icerik onbellegini siler.
// NEDEN: Astro, Markdown yazilarinin islenmis HTML'ini onbellege aliyor ve yazi
// dosyasi degismedikce yeniden islemiyor. Ama "yayinda olmayan yaziya link duz
// metin olsun" karari (src/plugins/rehype-blog.mjs) TARIHE bagli: dun duz metin
// olan link, hedef yazinin publishAt'i gelince bugun link olmali. Onbellek kalirsa
// eski hali yayinlanir. 58 yazida tam yeniden isleme birkac saniye surer.
import fs from 'node:fs';
for (const p of ['.astro/data-store.json', 'node_modules/.astro']) {
  fs.rmSync(p, { recursive: true, force: true });
}
