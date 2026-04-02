/** Deterministic default cover art per post slug (no DB). Six themed SVG banners. */
export function coverForSlug(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  const n = (Math.abs(h) % 6) + 1;
  return `/blog/covers/cover-${n}.svg`;
}
