import { getCollection, type CollectionEntry } from 'astro:content';
// @ts-ignore - duz .mjs yardimcisi (seo-check ve astro.config ile ortak)
import { isLive } from './publish-state.mjs';
import type { Lang } from '../i18n/site';

export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogTr'>;

/** Yayindaki yazilar: draft degil ve yayin ani (publishAt ?? pubDate) gecmis. */
export async function getLivePosts(): Promise<CollectionEntry<'blog'>[]> {
  return getCollection('blog', ({ data }) => isLive(data));
}

export async function getLivePostsTr(): Promise<CollectionEntry<'blogTr'>[]> {
  return getCollection('blogTr', ({ data }) => isLive(data));
}

/** Dile gore yayindaki yazilar (yeniden eskiye). */
export async function getPostsFor(lang: Lang): Promise<Post[]> {
  const list: Post[] = lang === 'tr' ? await getLivePostsTr() : await getLivePosts();
  return list.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Etiket URL'i her zaman kucuk harf: "Unutma" ve "unutma" ayni sayfa. */
export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase();
}
