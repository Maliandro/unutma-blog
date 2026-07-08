import type { VercelRequest, VercelResponse } from '@vercel/node';
import { aggregateEvents, isAnalyticsStorageConfigured, readRecentEvents } from './lib/analytics-store.js';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTable(title: string, rows: [string, number][]) {
  if (!rows.length) {
    return `<h2>${escapeHtml(title)}</h2><p class="muted">No data yet.</p>`;
  }
  const body = rows
    .map(
      ([label, count]) =>
        `<tr><td>${escapeHtml(label)}</td><td class="num">${count}</td></tr>`
    )
    .join('');
  return `<h2>${escapeHtml(title)}</h2><table><thead><tr><th>Label</th><th>Count</th></tr></thead><tbody>${body}</tbody></table>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  const adminSecret = process.env.ANALYTICS_ADMIN_SECRET;
  const token = typeof req.query.token === 'string' ? req.query.token : '';

  if (!adminSecret || token !== adminSecret) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(404).send('Not found');
  }

  if (!isAnalyticsStorageConfigured()) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(503).send(`<!doctype html><html><body><h1>Analytics storage not configured</h1><p>Add Upstash Redis from Vercel Marketplace (Storage) and link UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN to this project.</p></body></html>`);
  }

  try {
    const events = await readRecentEvents(5000);
    const stats = aggregateEvents(events);

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Unutma Analytics (private)</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; color: #111; background: #fafafa; }
    h1 { margin-bottom: 4px; }
    .muted { color: #666; }
    .cards { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0; }
    .card { background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 14px 18px; min-width: 140px; }
    .card strong { display: block; font-size: 22px; }
    table { width: 100%; max-width: 720px; border-collapse: collapse; background: #fff; margin-bottom: 24px; }
    th, td { border-bottom: 1px solid #eee; padding: 8px 10px; text-align: left; }
    th { background: #f3f4f6; }
    td.num { text-align: right; font-variant-numeric: tabular-nums; }
    section { margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Unutma — Private Analytics</h1>
  <p class="muted">Not linked from the public blog. Anonymous, opt-in events only.</p>
  <div class="cards">
    <div class="card"><span class="muted">Total events</span><strong>${stats.totalEvents}</strong></div>
    <div class="card"><span class="muted">Unique installs (monthly hash)</span><strong>${stats.uniqueInstalls}</strong></div>
  </div>
  <section>
    <h2>Premium funnel</h2>
    <table><tbody>
      ${Object.entries(stats.funnel)
        .map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td class="num">${v}</td></tr>`)
        .join('')}
    </tbody></table>
  </section>
  ${renderTable('Events by name', stats.byName)}
  ${renderTable('Screens', stats.byScreen)}
  ${renderTable('Tabs / features', stats.byTab)}
  ${renderTable('Platform', stats.byPlatform)}
  ${renderTable('Locale', stats.byLocale)}
  ${renderTable('Last 14 days', stats.byDay)}
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(200).send(html);
  } catch (error) {
    console.error('analytics stats error', error);
    return res.status(500).send('Internal error');
  }
}
