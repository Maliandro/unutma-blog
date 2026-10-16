import fs from 'node:fs';
import path from 'node:path';

/**
 * Sayfa ici gorsel: public/ altinda ayni adla .webp kopyasi varsa onu dondurur
 * (scripts/make-webp.mjs uretir; en fazla 1200 px, ~20 kat kucuk). Yoksa orijinali.
 * og:image icin KULLANILMAZ: sosyal aglar orijinal PNG/JPG ile daha guvenli.
 */
export function pageImage(src: string): string {
  if (!/\.(png|jpe?g)$/i.test(src) || !src.startsWith('/')) return src;
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', webp)) ? webp : src;
  } catch {
    return src;
  }
}
