import type { VercelRequest, VercelResponse } from '@vercel/node';
import { appendEvents, isAnalyticsStorageConfigured } from './lib/analytics-store';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const secret = process.env.ANALYTICS_INGEST_SECRET;
  if (!secret) {
    return res.status(503).json({ ok: false, error: 'ingest_not_configured' });
  }

  const auth = req.headers.authorization ?? '';
  if (auth !== `Bearer ${secret}`) {
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  if (!isAnalyticsStorageConfigured()) {
    return res.status(503).json({ ok: false, error: 'redis_not_configured' });
  }

  const body = req.body ?? {};
  const installHash = typeof body.install_hash === 'string' ? body.install_hash : 'unknown';
  const events = Array.isArray(body.events) ? body.events : [];

  if (!events.length) {
    return res.status(400).json({ ok: false, error: 'no_events' });
  }

  const sanitized = events
    .slice(0, 100)
    .map((event: any) => ({
      name: String(event.name ?? 'unknown').slice(0, 64),
      ts: Number(event.ts) || Date.now(),
      props: sanitizeProps(event.props),
    }));

  try {
    const count = await appendEvents(installHash, sanitized);
    return res.status(200).json({ ok: true, accepted: count });
  } catch (error) {
    console.error('analytics ingest error', error);
    return res.status(500).json({ ok: false, error: 'storage_failed' });
  }
}

function sanitizeProps(props: unknown): Record<string, string | number | boolean | null> {
  if (!props || typeof props !== 'object') return {};
  const out: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (typeof value === 'string') out[key] = value.slice(0, 120);
    else if (typeof value === 'number' || typeof value === 'boolean') out[key] = value;
    else if (value === null) out[key] = null;
  }
  return out;
}
