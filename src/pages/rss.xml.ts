import type { APIRoute } from 'astro';
import { getLivePosts } from '../utils/posts';

/**
 * RSS 2.0 akisi (bagimliliksiz). Adresler astro.config.mjs'teki tek kaynaktan
 * (site) turer: asil adres https://unutma.meyadestudio.com.
 */
const x = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://unutma.meyadestudio.com/').replace(/\/$/, '');
  const posts = (await getLivePosts()).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}/`;
      const img = p.data.image && /\.(jpe?g|png)$/i.test(p.data.image) ? `${base}${p.data.image}` : '';
      return [
        '<item>',
        `<title>${x(p.data.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${p.data.pubDate.toUTCString()}</pubDate>`,
        `<description>${x(p.data.description)}</description>`,
        ...p.data.tags.map((t) => `<category>${x(t)}</category>`),
        img ? `<enclosure url="${x(img)}" type="image/jpeg" length="0" />` : '',
        '</item>',
      ].join('');
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Unutma Blog</title>
<link>${base}/blog/</link>
<atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
<description>Practical, privacy-first guides to organizing your life, from the makers of Unutma.</description>
<language>en</language>
${items}
</channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
