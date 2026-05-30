/** Prefix root-relative paths for Astro `base` (e.g. GitHub Pages project site). */
export function withBase(path: string): string {
  const b = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return b.endsWith('/') ? b + clean : `${b}/${clean}`;
}
