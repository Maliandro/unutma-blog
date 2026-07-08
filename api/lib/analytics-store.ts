import { Redis } from '@upstash/redis';

const EVENTS_KEY = 'unutma:analytics:events';
const MAX_EVENTS = 50_000;

export type StoredAnalyticsEvent = {
  name: string;
  ts: number;
  props?: Record<string, string | number | boolean | null>;
  install_hash?: string;
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isAnalyticsStorageConfigured(): boolean {
  return getRedis() !== null;
}

export async function appendEvents(
  installHash: string,
  events: StoredAnalyticsEvent[]
): Promise<number> {
  const redis = getRedis();
  if (!redis) throw new Error('redis_not_configured');

  const stamped = events.map((event) => ({
    ...event,
    install_hash: installHash,
  }));

  const pipeline = redis.pipeline();
  for (const event of stamped) {
    pipeline.lpush(EVENTS_KEY, JSON.stringify(event));
  }
  pipeline.ltrim(EVENTS_KEY, 0, MAX_EVENTS - 1);
  await pipeline.exec();
  return stamped.length;
}

export async function readRecentEvents(limit = 5000): Promise<StoredAnalyticsEvent[]> {
  const redis = getRedis();
  if (!redis) return [];

  const raw = await redis.lrange<string>(EVENTS_KEY, 0, limit - 1);
  return raw
    .map((line) => {
      try {
        return typeof line === 'string' ? JSON.parse(line) : line;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as StoredAnalyticsEvent[];
}

export function aggregateEvents(events: StoredAnalyticsEvent[]) {
  const byName: Record<string, number> = {};
  const byScreen: Record<string, number> = {};
  const byTab: Record<string, number> = {};
  const byPlatform: Record<string, number> = {};
  const byLocale: Record<string, number> = {};
  const uniqueInstalls = new Set<string>();
  const byDay: Record<string, number> = {};

  for (const event of events) {
    byName[event.name] = (byName[event.name] ?? 0) + 1;
    if (event.install_hash) uniqueInstalls.add(event.install_hash);

    const day = new Date(event.ts).toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;

    const props = event.props ?? {};
    if (event.name === 'screen_view' && typeof props.screen === 'string') {
      byScreen[props.screen] = (byScreen[props.screen] ?? 0) + 1;
    }
    if (event.name === 'tab_view' && typeof props.tab === 'string') {
      byTab[props.tab] = (byTab[props.tab] ?? 0) + 1;
    }
    if (typeof props.platform === 'string') {
      byPlatform[props.platform] = (byPlatform[props.platform] ?? 0) + 1;
    }
    if (typeof props.locale === 'string') {
      byLocale[props.locale] = (byLocale[props.locale] ?? 0) + 1;
    }
  }

  const sortDesc = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]);

  return {
    totalEvents: events.length,
    uniqueInstalls: uniqueInstalls.size,
    byName: sortDesc(byName),
    byScreen: sortDesc(byScreen),
    byTab: sortDesc(byTab),
    byPlatform: sortDesc(byPlatform),
    byLocale: sortDesc(byLocale),
    byDay: sortDesc(byDay).slice(0, 14),
    funnel: {
      trial_offer_shown: byName.trial_offer_shown ?? 0,
      trial_started: byName.trial_started ?? 0,
      trial_skipped: byName.trial_skipped ?? 0,
      paywall_view: byName.paywall_view ?? 0,
      purchase_tapped: byName.purchase_tapped ?? 0,
      purchase_success: byName.purchase_success ?? 0,
      feature_locked: byName.feature_locked ?? 0,
    },
  };
}
