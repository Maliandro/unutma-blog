import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

export type LegalLang = 'en' | 'tr' | 'de' | 'es' | 'fr' | 'it';

export type LegalBundle = (typeof en);

export const LEGAL_LANGUAGES: {
  code: LegalLang;
  label: string;
  native: string;
}[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
];

const bundles: Record<LegalLang, LegalBundle> = {
  en,
  tr,
  de,
  es,
  fr,
  it,
};

export function getLegal(lang: LegalLang | undefined): LegalBundle {
  if (lang && lang in bundles) return bundles[lang];
  return bundles.en;
}

export function isLegalLang(value: string | undefined): value is LegalLang {
  return !!value && value in bundles;
}

export const PRIVACY_SECTIONS = [
  { title: 'noPersonalData', text: 'noPersonalDataText' },
  { title: 'dataOnDevice', text: 'dataOnDeviceText' },
  // Voice input goes through the phone's own dictation service (Apple/Google)
  // — the one exception to "nothing leaves your phone", so the policy says so.
  { title: 'voiceInput', text: 'voiceInputText' },
  { title: 'subscriptions', text: 'subscriptionsText' },
  { title: 'howWeUse', text: 'howWeUseText' },
  { title: 'optionalAnalytics', text: 'optionalAnalyticsText' },
  { title: 'security', text: 'securityText' },
  { title: 'gdprRights', text: 'gdprRightsText' },
  { title: 'children', text: 'childrenText' },
  { title: 'policyChanges', text: 'policyChangesText' },
  { title: 'contact', text: 'contactText' },
] as const;

export const TERMS_SECTIONS = [
  { title: 'acceptance', text: 'acceptanceText' },
  { title: 'usage', text: 'usageText' },
  { title: 'subscriptions', text: 'subscriptionsText' },
  { title: 'disclaimer', text: 'disclaimerText' },
  { title: 'liability', text: 'liabilityText' },
  { title: 'intellectualProperty', text: 'intellectualPropertyText' },
  { title: 'changes', text: 'changesText' },
  { title: 'governing', text: 'governingText' },
  { title: 'contact', text: 'contactText' },
] as const;

export function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export const CONTACT_EMAIL = 'unutma.app1.0@gmail.com';

export const BLOG_PRIVACY_NOTICE: Record<LegalLang, { title: string; text: string }> = {
  en: {
    title: 'This website (blog)',
    text: 'This site is a static marketing blog: your host (for example Vercel) may keep ordinary server or CDN logs. We do not run ads in the Unutma app, and this blog does not show third-party ad banners unless we explicitly enable that later and update this notice.',
  },
  tr: {
    title: 'Bu web sitesi (blog)',
    text: 'Bu site statik bir tanıtım blogudur; barındırma sağlayıcınız (ör. Vercel) olağan sunucu veya CDN günlükleri tutabilir. Unutma uygulamasında reklam göstermiyoruz; bu blogda da aksi belirtilmedikçe üçüncü taraf reklam banner’ları yoktur.',
  },
  de: {
    title: 'Diese Website (Blog)',
    text: 'Diese Seite ist ein statischer Marketing-Blog: Ihr Hoster (z. B. Vercel) kann übliche Server- oder CDN-Logs speichern. In der Unutma-App schalten wir keine Werbung; dieser Blog zeigt keine Drittanbieter-Werbebanner, sofern wir das nicht ausdrücklich später aktivieren und diesen Hinweis aktualisieren.',
  },
  es: {
    title: 'Este sitio web (blog)',
    text: 'Este sitio es un blog de marketing estático: su proveedor de alojamiento (p. ej. Vercel) puede conservar registros habituales del servidor o CDN. No mostramos anuncios en la app Unutma, y este blog no muestra banners de terceros salvo que lo activemos explícitamente más adelante y actualicemos este aviso.',
  },
  fr: {
    title: 'Ce site web (blog)',
    text: 'Ce site est un blog marketing statique : votre hébergeur (par ex. Vercel) peut conserver des journaux serveur ou CDN ordinaires. Nous n’affichons pas de publicité dans l’app Unutma, et ce blog n’affiche pas de bannières tierces sauf activation explicite ultérieure avec mise à jour de cet avis.',
  },
  it: {
    title: 'Questo sito web (blog)',
    text: 'Questo sito è un blog marketing statico: il provider di hosting (es. Vercel) può conservare log server o CDN ordinari. Non mostriamo annunci nell’app Unutma, e questo blog non mostra banner di terze parti salvo abilitazione esplicita in seguito con aggiornamento di questo avviso.',
  },
};
