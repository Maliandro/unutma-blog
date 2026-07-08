import type { VercelRequest, VercelResponse } from '@vercel/node';

import { isAnalyticsStorageConfigured } from './lib/analytics-store.js';

/** Public liveness check — confirms /api routes are deployed (no secrets). */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.status(200).json({
    ok: true,
    service: 'unutma-blog-api',
    analytics_ingest: Boolean(process.env.ANALYTICS_INGEST_SECRET),
    analytics_redis: isAnalyticsStorageConfigured(),
  });
}
