import { LEGAL_LANGUAGES, type LegalBundle, type LegalLang } from '../data/legal';

const OG_LOCALE: Record<LegalLang, string> = {
  en: 'en_US', tr: 'tr_TR', de: 'de_DE', es: 'es_ES', fr: 'fr_FR', it: 'it_IT',
};

/** Yasal sayfa adresi: Ingilizce kokte, digerleri /<lang>/ altinda. */
export function legalPath(kind: 'privacy' | 'terms', lang: LegalLang): string {
  return lang === 'en' ? `/${kind}/` : `/${kind}/${lang}/`;
}

/** Tum dil surumleri + x-default (Ingilizce). Her dil surumu ayni listeyi basar. */
export function legalAlternates(kind: 'privacy' | 'terms') {
  return [
    ...LEGAL_LANGUAGES.map(({ code }) => ({ lang: code, href: legalPath(kind, code) })),
    { lang: 'x-default', href: legalPath(kind, 'en') },
  ];
}

/** Sayfanin kendi dilinde aciklama: giris paragrafi, kelime sinirinda <=158 karakter. */
export function legalDescription(kind: 'privacy' | 'terms', legal: LegalBundle): string {
  const content = (kind === 'privacy' ? legal.privacyContent : legal.termsContent) as Record<string, string>;
  const text = (content.intro || '').replace(/\s+/g, ' ').trim();
  if (text.length <= 158) return text;
  const cut = text.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

export function legalLocale(lang: LegalLang): string {
  return OG_LOCALE[lang];
}
