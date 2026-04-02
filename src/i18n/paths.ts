import type { Locale } from './locales';

/** All localized routes use a locale prefix, including English (`/en/...`). */
export function href(locale: Locale, path: string): string {
  const raw = path === '/' || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const withSlash =
    raw === '/' ? '/' : raw.endsWith('/') ? raw : `${raw}/`;
  return `/${locale}${withSlash}`;
}

/** Same path, different locale (pathname starts with `/xx/`). */
export function switchLocale(pathname: string, newLocale: Locale): string {
  const m = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  if (m) {
    const rest = m[2] ?? '/';
    return `/${newLocale}${rest === '/' ? '/' : rest.endsWith('/') ? rest : `${rest}/`}`;
  }
  return href(newLocale, '/');
}

export function postsPerPage(): number {
  return 12;
}
