import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAnalyticsStorageConfigured, readRecentEvents, type StoredAnalyticsEvent } from './lib/analytics-store.js';

const MAX_EXPORT = 50_000;

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function toCsv(events: StoredAnalyticsEvent[]): string {
  const header = ['tarih_saat_utc', 'olay', 'ekran', 'sekme', 'platform', 'dil', 'kurulum_hash', 'ek_ozellikler'];
  const lines = [header.join(',')];

  for (const event of events) {
    const props = event.props ?? {};
    const { screen, tab, platform, locale, ...rest } = props as Record<string, unknown>;
    const row = [
      new Date(event.ts).toISOString(),
      event.name,
      typeof screen === 'string' ? screen : '',
      typeof tab === 'string' ? tab : '',
      typeof platform === 'string' ? platform : '',
      typeof locale === 'string' ? locale : '',
      event.install_hash ?? '',
      Object.keys(rest).length ? JSON.stringify(rest) : '',
    ];
    lines.push(row.map((v) => csvEscape(String(v))).join(','));
  }
  return lines.join('\n');
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
    return res.status(503).json({ ok: false, error: 'redis_not_configured' });
  }

  const format = req.query.format === 'json' ? 'json' : 'csv';
  const stamp = new Date().toISOString().slice(0, 10);

  try {
    const events = await readRecentEvents(MAX_EXPORT);
    // En eskiden en yeniye — tarihli analiz/pivot için doğal sıra.
    events.sort((a, b) => a.ts - b.ts);

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="unutma-analytics-${stamp}.json"`);
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      return res.status(200).send(JSON.stringify(events, null, 2));
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="unutma-analytics-${stamp}.csv"`);
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    return res.status(200).send(toCsv(events));
  } catch (error) {
    console.error('analytics export error', error);
    return res.status(500).send('Internal error');
  }
}
