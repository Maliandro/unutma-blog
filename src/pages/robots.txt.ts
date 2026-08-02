import type { APIRoute } from 'astro';

/**
 * robots.txt — public/ altinda SABIT dosya degil, uretilen sayfa.
 *
 * NEDEN: domain daha once birden fazla yere elle yazilmisti ve biri yanlis
 * kalinca (unutma.app — baskasinin sitesi) sitemap ve canonical yanlis yeri
 * gosterdi. Artik adres astro.config.mjs'teki tek kaynaktan (Astro.site)
 * turuyor; domain degisince burasi kendiliginden dogru olur.
 *
 * Yapay zeka tarayicilari BILEREK acik: amac cevap motorlarinin (ChatGPT,
 * Claude, Perplexity, AI Overviews) Unutma'yi DOGRU bilgiyle onerebilmesi.
 * Engellemek gorunurlugu yok eder; asil risk anilmamak ya da yanlis anilmak.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'cohere-ai',
  'meta-externalagent',
];

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? 'https://unutma-blog.vercel.app/').replace(/\/$/, '');
  const body = [
    `# Unutma — ${base}`,
    '# Machine-readable summary: ' + `${base}/llms.txt`,
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Answer engines / LLM crawlers — explicitly allowed',
    ...AI_AGENTS.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
    `Sitemap: ${base}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
