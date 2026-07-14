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
    return `<h2>${escapeHtml(title)}</h2><p class="muted">Henüz veri yok.</p>`;
  }
  const body = rows
    .map(
      ([label, count]) =>
        `<tr><td>${escapeHtml(label)}</td><td class="num">${count}</td></tr>`
    )
    .join('');
  return `<h2>${escapeHtml(title)}</h2><table><thead><tr><th>Etiket</th><th>Adet</th></tr></thead><tbody>${body}</tbody></table>`;
}

/** Event adları koddan geldiği için İngilizce; panelde okunaklı Türkçe karşılık göster. */
const EVENT_LABELS_TR: Record<string, string> = {
  app_open: 'Uygulama açılışı',
  screen_view: 'Ekran görüntüleme',
  tab_view: 'Sekme görüntüleme',
  onboarding_step: 'Onboarding adımı',
  onboarding_completed: 'Onboarding tamamlandı',
  trial_offer_shown: 'Deneme teklifi gösterildi',
  trial_started: 'Deneme başladı',
  trial_skipped: 'Deneme atlandı',
  trial_expired: 'Deneme süresi bitti',
  paywall_view: 'Paywall görüntüleme',
  plan_selected: 'Plan seçildi',
  purchase_tapped: 'Satın al butonu',
  purchase_success: 'Satın alma başarılı',
  purchase_error: 'Satın alma hatası',
  restore_tapped: 'Geri yükleme',
  feature_locked: 'Kilitli özelliğe dokunma',
  upsell_shown: 'Upsell gösterildi',
  export_blocked: 'Export engellendi',
  analytics_consent_changed: 'Analytics izni değişti',
  first_action_logged: 'İlk eylem loglandı',
  soft_cap_hit: 'Ücretsiz limite takıldı',
  notification_permission_result: 'Bildirim izni sonucu',
  review_prompt_shown: 'Puanlama istendi',
  streak_freeze_used: 'Streak dondurma kullanıldı',
  daily_goal_reached: 'Günlük hedefe ulaşıldı',
  mood_checkin: 'Mood check-in',
};

const trEventLabel = (name: string): string =>
  EVENT_LABELS_TR[name] ? `${EVENT_LABELS_TR[name]} (${name})` : name;

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

  const daysParam = Number(req.query.days);
  const dayRange = Number.isFinite(daysParam) ? Math.min(60, Math.max(1, Math.round(daysParam))) : 14;

  try {
    const events = await readRecentEvents(5000);
    const stats = aggregateEvents(events, dayRange);
    const exportBase = `/api/stats-export?token=${encodeURIComponent(token)}`;
    const rangeBase = (d: number) => `?token=${encodeURIComponent(token)}&days=${d}`;

    const html = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex,nofollow" />
  <title>Unutma Analytics (özel)</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; color: #111; background: #fafafa; }
    h1 { margin-bottom: 4px; }
    .muted { color: #666; }
    .cards { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0; }
    .card { background: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 14px 18px; min-width: 140px; }
    .card strong { display: block; font-size: 22px; }
    table { width: 100%; max-width: 720px; border-collapse: collapse; background: #fff; margin-bottom: 24px; }
    table.wide { max-width: 100%; overflow-x: auto; display: block; }
    th, td { border-bottom: 1px solid #eee; padding: 8px 10px; text-align: left; }
    th { background: #f3f4f6; }
    td.num { text-align: right; font-variant-numeric: tabular-nums; }
    section { margin-top: 8px; }
    .toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin: 16px 0; }
    .btn { display: inline-block; padding: 8px 14px; border-radius: 8px; background: #111; color: #fff; text-decoration: none; font-size: 14px; }
    .btn:hover { background: #333; }
    .btn.secondary { background: #fff; color: #111; border: 1px solid #ccc; }
    .btn.secondary:hover { background: #f3f4f6; }
    .btn.active { background: #2563eb; }
  </style>
</head>
<body>
  <h1>Unutma — Özel Analytics</h1>
  <p class="muted">Herkese açık blogdan bağlantı yok. Yalnızca izin vermiş kullanıcıların anonim olayları.</p>
  <div class="cards">
    <div class="card"><span class="muted">Toplam olay</span><strong>${stats.totalEvents}</strong></div>
    <div class="card"><span class="muted">Tekil kurulum (aylık hash)</span><strong>${stats.uniqueInstalls}</strong></div>
  </div>
  <div class="toolbar">
    <a class="btn" href="${exportBase}&format=csv">⬇ CSV indir (tüm olaylar)</a>
    <a class="btn secondary" href="${exportBase}&format=json">⬇ JSON indir (tüm olaylar)</a>
  </div>
  <section>
    <h2>Premium hunisi</h2>
    <table><tbody>
      ${Object.entries(stats.funnel)
        .map(([k, v]) => `<tr><td>${escapeHtml(trEventLabel(k))}</td><td class="num">${v}</td></tr>`)
        .join('')}
    </tbody></table>
  </section>
  ${renderTable('Olaylar', stats.byName.map(([k, v]) => [trEventLabel(k), v] as [string, number]))}
  ${renderTable('En çok kullanılan ekranlar', stats.byScreen)}
  ${renderTable('Sekmeler / özellikler', stats.byTab)}
  ${renderTable('Platform', stats.byPlatform)}
  ${renderTable('Dil', stats.byLocale)}
  <section>
    <h2>Günlük dağılım — hangi gün ne kadar tıklandı</h2>
    <div class="toolbar">
      ${[7, 14, 30, 60]
        .map(
          (d) =>
            `<a class="btn ${d === dayRange ? 'active' : 'secondary'}" href="${rangeBase(d)}">${d} gün</a>`
        )
        .join('')}
    </div>
    ${
      stats.dailyBreakdown.length
        ? `<table class="wide"><thead><tr>
            <th>Tarih</th><th class="num">Toplam</th><th class="num">Tekil kurulum</th>
            ${stats.topEventNames.map((n) => `<th class="num">${escapeHtml(trEventLabel(n))}</th>`).join('')}
            <th class="num">Diğer</th>
          </tr></thead><tbody>
            ${stats.dailyBreakdown
              .map(
                (row) => `<tr>
                  <td>${row.day}</td>
                  <td class="num"><strong>${row.total}</strong></td>
                  <td class="num">${row.uniqueInstalls}</td>
                  ${row.perName.map((n) => `<td class="num">${n || ''}</td>`).join('')}
                  <td class="num">${row.other || ''}</td>
                </tr>`
              )
              .join('')}
          </tbody></table>`
        : '<p class="muted">Henüz veri yok.</p>'
    }
  </section>
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
