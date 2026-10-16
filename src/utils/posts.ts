import { getCollection, type CollectionEntry } from 'astro:content';
// @ts-ignore - duz .mjs yardimcisi (seo-check ve astro.config ile ortak)
import { isLive } from './publish-state.mjs';

/** Yayindaki yazilar: draft degil ve yayin ani (publishAt ?? pubDate) gecmis. */
export async function getLivePosts(): Promise<CollectionEntry<'blog'>[]> {
  return getCollection('blog', ({ data }) => isLive(data));
}

/** Etiket URL'i her zaman kucuk harf: "Unutma" ve "unutma" ayni sayfa. */
export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase();
}
