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
  // `||` (not `??`): manually created-but-empty UPSTASH_* vars must fall back to
  // the integration-provided KV_* values.
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() || process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || process.env.KV_REST_API_TOKEN?.trim();
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

export function aggregateEvents(events: StoredAnalyticsEvent[], dayRange = 14) {
  const byName: Record<string, number> = {};
  const byScreen: Record<string, number> = {};
  const byTab: Record<string, number> = {};
  const byPlatform: Record<string, number> = {};
  const byLocale: Record<string, number> = {};
  const uniqueInstalls = new Set<string>();
  const byDay: Record<string, number> = {};
  const byDayName: Record<string, Record<string, number>> = {};
  const installsByDay: Record<string, Set<string>> = {};

  for (const event of events) {
    byName[event.name] = (byName[event.name] ?? 0) + 1;
    if (event.install_hash) uniqueInstalls.add(event.install_hash);

    const day = new Date(event.ts).toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
    (byDayName[day] ??= {})[event.name] = (byDayName[day]?.[event.name] ?? 0) + 1;
    if (event.install_hash) {
      (installsByDay[day] ??= new Set()).add(event.install_hash);
    }

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

  const topEventNames = sortDesc(byName)
    .slice(0, 8)
    .map(([name]) => name);

  const days = sortDesc(byDay)
    .map(([day]) => day)
    .sort((a, b) => (a < b ? 1 : -1)) // newest first
    .slice(0, dayRange);

  const dailyBreakdown = days.map((day) => {
    const counts = byDayName[day] ?? {};
    const perName = topEventNames.map((name) => counts[name] ?? 0);
    const otherTotal =
      byDay[day] - perName.reduce((sum, n) => sum + n, 0);
    return {
      day,
      total: byDay[day] ?? 0,
      uniqueInstalls: installsByDay[day]?.size ?? 0,
      perName,
      other: Math.max(0, otherTotal),
    };
  });

  return {
    totalEvents: events.length,
    uniqueInstalls: uniqueInstalls.size,
    byName: sortDesc(byName),
    byScreen: sortDesc(byScreen),
    byTab: sortDesc(byTab),
    byPlatform: sortDesc(byPlatform),
    byLocale: sortDesc(byLocale),
    byDay: sortDesc(byDay).slice(0, dayRange),
    topEventNames,
    dailyBreakdown,
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
