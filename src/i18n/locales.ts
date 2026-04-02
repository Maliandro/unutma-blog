export const LOCALES = ['en', 'de', 'es', 'it', 'fr', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  it: 'it_IT',
  fr: 'fr_FR',
  tr: 'tr_TR',
};

export const DATE_LOCALE: Record<Locale, string> = {
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
  fr: 'fr-FR',
  tr: 'tr-TR',
};
