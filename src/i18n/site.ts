/**
 * Cok dilli site yardimcilari (EN varsayilan, adresler degismez; TR /tr/ altinda).
 * Arayuz metinleri src/i18n/arayuz.json'dan okunur (anahtar: "dosya#kimlik").
 */
import dict from './arayuz.json';
import slugRaw from './slug-haritasi.json';
import etiketRaw from './etiket-haritasi.json';

export type Lang = 'en' | 'tr';

export const SLUG_EN_TR = slugRaw as Record<string, string>;
export const SLUG_TR_EN: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_EN_TR).map(([en, tr]) => [tr, en]),
);

/** Etiket karsiliklari (kucuk harf EN etiket -> TR etiket); yazi ciftlerinin etiket sirasindan uretilir. */
export const TAG_EN_TR = etiketRaw as Record<string, string>;
export const TAG_TR_EN: Record<string, string> = Object.fromEntries(
  Object.entries(TAG_EN_TR).map(([en, tr]) => [tr, en]),
);
const decodeSeg = (x: string) => {
  try {
    return decodeURIComponent(x).toLowerCase();
  } catch {
    return x.toLowerCase();
  }
};
/** Etiket sayfasinin karsi dildeki adresi; haritada yoksa null. */
function tagCounterpart(p: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = p.match(/^\/blog\/tags\/([^/]+)\/$/))) {
    const tr = TAG_EN_TR[decodeSeg(m[1])];
    return tr ? `/tr/blog/etiket/${encodeURIComponent(tr)}/` : null;
  }
  if ((m = p.match(/^\/tr\/blog\/etiket\/([^/]+)\/$/))) {
    const en = TAG_TR_EN[decodeSeg(m[1])];
    return en ? `/blog/tags/${encodeURIComponent(en)}/` : null;
  }
  return null;
}

export const OG_LOCALES: Record<Lang, string> = { en: 'en_US', tr: 'tr_TR' };
export const DATE_LOCALES: Record<Lang, string> = { en: 'en-US', tr: 'tr-TR' };

// "dosya#kimlik aciklama" biciminde not iceren anahtarlar icin ilk sozcuk kimliktir.
const index = new Map<string, { en: string; tr: string }>();
for (const [k, v] of Object.entries(dict as Record<string, { en: string; tr: string }>)) {
  const [file, rest] = k.split('#');
  index.set(`${file}#${rest.split(/\s+/)[0]}`, v);
}

/** t('src/pages/about.astro')('h1') ya da vars ile: t(...)('title', { n: 2 }). */
export function makeT(file: string, lang: Lang) {
  return (id: string, vars: Record<string, string | number> = {}): string => {
    const e = index.get(`${file}#${id}`);
    if (!e) throw new Error(`i18n anahtari yok: ${file}#${id}`);
    return e[lang].replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  };
}

/** "<a>metin</a>" iceren dizgeyi [once, baglanti metni, sonra] olarak boler. */
export function splitLink(s: string): [string, string, string] {
  const m = s.match(/^([\s\S]*?)<a>([\s\S]*?)<\/a>([\s\S]*)$/);
  return m ? [m[1], m[2], m[3]] : [s, '', ''];
}

const norm = (p: string) => {
  let x = p.split('?')[0].split('#')[0];
  if (!x.startsWith('/')) x = '/' + x;
  if (!x.endsWith('/') && !/\.[a-z0-9]+$/i.test(x)) x += '/';
  return x;
};

/** Arayuz dili: /tr/ yolu ve hali hazirda TR olan /support/tr, /privacy/tr, /terms/tr. */
export function pageLang(pathname: string): Lang {
  const p = norm(pathname);
  if (p === '/tr/' || p.startsWith('/tr/')) return 'tr';
  if (/^\/(support|privacy|terms)\/tr\/$/.test(p)) return 'tr';
  return 'en';
}

const STATIC: [string, string][] = [
  ['/', '/tr/'],
  ['/blog/', '/tr/blog/'],
  ['/faq/', '/tr/sss/'],
  ['/about/', '/tr/hakkinda/'],
  ['/support/', '/support/tr/'],
  ['/privacy/', '/privacy/tr/'],
  ['/terms/', '/terms/tr/'],
];

/** Sayfanin hedef dildeki karsiligi (yoksa null). Kendi dilindeyse kendisi. */
export function counterpart(pathname: string, target: Lang): string | null {
  const p = norm(pathname);
  // 404: asil adres bilinmez; dilin ana sayfasina gider.
  if (/^\/(tr\/)?404\/$/.test(p)) return target === 'tr' ? '/tr/' : '/';
  const cur = pageLang(p);
  if (cur === target) return p;
  for (const [en, tr] of STATIC) {
    if (cur === 'en' && p === en) return target === 'tr' ? tr : en;
    if (cur === 'tr' && p === tr) return en;
  }
  let m: RegExpMatchArray | null;
  if (cur === 'en') {
    if ((m = p.match(/^\/blog\/page\/(\d+)\/$/))) return `/tr/blog/sayfa/${m[1]}/`;
    if (/^\/blog\/tags\/[^/]+\/$/.test(p)) return tagCounterpart(p) ?? '/tr/blog/';
    if ((m = p.match(/^\/blog\/([^/]+)\/$/))) {
      const tr = SLUG_EN_TR[m[1]];
      return tr ? `/tr/blog/${tr}/` : null;
    }
    // Yasal sayfalarin diger dilleri (de, es, ...): TR karsiligi /privacy/tr/
    if ((m = p.match(/^\/(privacy|terms)\/[a-z]{2}\/$/))) return `/${m[1]}/tr/`;
    return null;
  }
  if ((m = p.match(/^\/tr\/blog\/sayfa\/(\d+)\/$/))) return `/blog/page/${m[1]}/`;
  if (/^\/tr\/blog\/etiket\/[^/]+\/$/.test(p)) return tagCounterpart(p) ?? '/blog/';
  if ((m = p.match(/^\/tr\/blog\/([^/]+)\/$/))) {
    const en = SLUG_TR_EN[m[1]];
    return en ? `/blog/${en}/` : null;
  }
  return null;
}

/** hreflang cifti: yalnizca iki dilde de karsiligi olan sayfalarda; etiket sayfalari yalniz haritada varsa. */
export function hreflangPair(pathname: string): { en: string; tr: string } | null {
  const p = norm(pathname);
  const isTag = /^\/(tr\/)?blog\/(tags|etiket)\//.test(p);
  const lang = pageLang(p);
  const other = isTag ? tagCounterpart(p) : counterpart(p, lang === 'en' ? 'tr' : 'en');
  if (!other) return null;
  return lang === 'en' ? { en: p, tr: other } : { en: other, tr: p };
}

/** /blog/<en>/ gibi bir ic baglantiyi TR karsiligina cevirir (yoksa degistirmez). */
export function toTrHref(href: string): string {
  const m = href.match(/^([^?#]*)([?#].*)?$/);
  if (!m) return href;
  const path = m[1];
  const rest = m[2] ?? '';
  if (/^\/(tr\/|privacy\/|terms\/|support\/tr)/.test(path) && !/^\/(privacy|terms)\/?$/.test(path)) return href;
  if (/^\/(privacy|terms)\/?$/.test(path)) return `${path.replace(/\/$/, '')}/tr/${rest}`;
  const cp = /\.[a-z0-9]+$/i.test(path) ? null : counterpart(path, 'tr');
  if (cp && cp !== norm(path)) return cp + rest;
  if (cp) return href;
  return href;
}

export function postPath(lang: Lang, post: { slug: string; data: { trSlug?: string } }): string {
  return lang === 'tr' ? `/tr/blog/${post.data.trSlug ?? SLUG_EN_TR[post.slug]}/` : `/blog/${post.slug}/`;
}
export function tagPath(lang: Lang, tag: string): string {
  return lang === 'tr' ? `/tr/blog/etiket/${encodeURIComponent(tag)}/` : `/blog/tags/${encodeURIComponent(tag)}/`;
}
export function blogIndexPath(lang: Lang): string {
  return lang === 'tr' ? '/tr/blog/' : '/blog/';
}
export function rssPath(lang: Lang): string {
  return lang === 'tr' ? '/tr/rss.xml' : '/rss.xml';
}
