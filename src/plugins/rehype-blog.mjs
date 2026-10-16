// Markdown yazilari icin iki kucuk rehype eklentisi. Bagimlilik yok.
//
// 1) rehypeUnpublishedLinks: yayinda OLMAYAN (draft ya da publishAt/pubDate
//    gelecekte) bir yaziya verilen /blog/<slug>/ linkini duz metne cevirir.
//    Boylece "haftaya cikacak" yaziya baglanti cumlesi simdiden eklenebilir;
//    yazi cikana kadar kirik link (404) olusmaz, ciktigi ilk derlemede link olur.
//
// 2) rehypeImageAttrs: govdedeki <img> etiketlerine loading="lazy",
//    decoding="async" ve public/ altindaki dosyadan okunan width/height ekler
//    (CLS: sayfa yuklenirken kayma olmasin). Gorunum degismez.
import fs from 'node:fs';
import path from 'node:path';
import { blogPublishState } from '../utils/publish-state.mjs';

function walk(node, fn, parent = null, index = 0) {
  fn(node, parent, index);
  if (node.children) {
    // Kopya uzerinde don: fn cocuk listesini degistirebilir.
    [...node.children].forEach((c) => walk(c, fn, node, node.children.indexOf(c)));
  }
}

export function rehypeUnpublishedLinks({ blogDir }) {
  return () => {
    const hidden = new Set(blogPublishState(blogDir).filter((p) => !p.live).map((p) => p.slug));
    return (tree) => {
      if (!hidden.size) return;
      walk(tree, (node, parent) => {
        if (!parent || node.type !== 'element' || node.tagName !== 'a') return;
        const href = String(node.properties?.href ?? '');
        const m = href.match(/^\/blog\/([a-z0-9-]+)\/?(?:#.*)?$/);
        if (!m || !hidden.has(m[1])) return;
        const i = parent.children.indexOf(node);
        parent.children.splice(i, 1, ...(node.children || []));
      });
    };
  };
}

function pngSize(buf) {
  if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  return null;
}
function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}
function webpSize(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  return null;
}
function svgSize(text) {
  const w = text.match(/<svg[^>]*\swidth="([\d.]+)(px)?"/);
  const h = text.match(/<svg[^>]*\sheight="([\d.]+)(px)?"/);
  if (w && h) return { w: Math.round(+w[1]), h: Math.round(+h[1]) };
  const vb = text.match(/viewBox="[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/);
  if (vb) return { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
  return null;
}

export function rehypeImageAttrs({ publicDir }) {
  const cache = new Map();
  // .webp kopyasi varsa (scripts/make-webp.mjs) govdede onu kullan.
  const toWebp = (src) => {
    if (!src.startsWith('/') || !/\.(png|jpe?g)$/i.test(src)) return src;
    const w = src.replace(/\.(png|jpe?g)$/i, '.webp');
    return fs.existsSync(path.join(publicDir, decodeURIComponent(w))) ? w : src;
  };
  const sizeOf = (src) => {
    if (cache.has(src)) return cache.get(src);
    let size = null;
    try {
      const file = path.join(publicDir, decodeURIComponent(src.split(/[?#]/)[0]));
      if (fs.existsSync(file)) {
        if (file.endsWith('.svg')) size = svgSize(fs.readFileSync(file, 'utf8'));
        else {
          const buf = fs.readFileSync(file);
          size = pngSize(buf) || jpegSize(buf) || webpSize(buf);
        }
      }
    } catch {
      size = null;
    }
    cache.set(src, size);
    return size;
  };
  return () => (tree) => {
    walk(tree, (node) => {
      // Markdown icine elle yazilmis HTML blogu "raw" dugum olarak gelir.
      if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('poster="')) {
        node.value = node.value.replace(/(\sposter=")([^"]+)"/g, (m, pre, u) => `${pre}${toWebp(u)}"`);
      }
      if (node.type === 'raw' && typeof node.value === 'string' && node.value.includes('<img')) {
        node.value = node.value.replace(/<img\b([^>]*?)\s*\/?>/g, (tag, attrs) => {
          let a = attrs.replace(/(\ssrc=")([^"]+)"/, (m, pre, u) => `${pre}${toWebp(u)}"`).replace(/(\sposter=")([^"]+)"/, (m, pre, u) => `${pre}${toWebp(u)}"`);
          if (!/\sloading=/.test(a)) a += ' loading="lazy"';
          if (!/\sdecoding=/.test(a)) a += ' decoding="async"';
          const src = (a.match(/\ssrc="([^"]+)"/) || [])[1] || '';
          if (src.startsWith('/') && !/\swidth=/.test(a)) {
            const s = sizeOf(src);
            if (s && s.w && s.h) a += ` width="${s.w}" height="${s.h}"`;
          }
          return `<img${a} />`;
        });
        return;
      }
      if (node.type !== 'element' || node.tagName !== 'img') return;
      const p = (node.properties ||= {});
      if (typeof p.src === 'string') p.src = toWebp(p.src);
      const src = String(p.src ?? '');
      if (!p.loading) p.loading = 'lazy';
      if (!p.decoding) p.decoding = 'async';
      if (src.startsWith('/') && !p.width && !p.height) {
        const s = sizeOf(src);
        if (s && s.w && s.h) {
          p.width = s.w;
          p.height = s.h;
        }
      }
    });
  };
}
