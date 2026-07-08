# Analytics API (private — not linked from blog)

Blog is deployed via **Maliandro/unutma-blog** (synced from this folder). The `/api` routes only work after sync + Vercel redeploy.

## 1. Sync to publish repo

From `unutma-blog/scripts`:

```bash
# Requires UNUTMA_BLOG_SYNC_TOKEN in env (GitHub Actions secret)
python sync_publish_repo.py
```

Or push to `unutma-app` master — workflow `Publish Unutma Blog` runs when `unutma-blog/api/**` changes.

## 2. Vercel environment variables

In the **unutma-blog** Vercel project:

| Variable | Purpose |
|----------|---------|
| `ANALYTICS_INGEST_SECRET` | Bearer token for `POST /api/events` (same as app) |
| `ANALYTICS_ADMIN_SECRET` | Query token for private stats panel |
| `UPSTASH_REDIS_REST_URL` | Vercel → Marketplace → Upstash Redis → link project |
| `UPSTASH_REDIS_REST_TOKEN` | Same integration (auto-added when linked) |

Legacy `KV_REST_API_*` vars still work if you already had Vercel KV.

Create Redis: Vercel dashboard → **Marketplace** → search **Upstash Redis** → Add → link to `unutma-blog` project.

## 3. App (EAS secrets)

```bash
eas secret:create --name EXPO_PUBLIC_ANALYTICS_INGEST_KEY --value "<same as ANALYTICS_INGEST_SECRET>" --scope project
```

Optional override (default is already `https://unutma-blog.vercel.app/api/events`):

```bash
eas secret:create --name EXPO_PUBLIC_ANALYTICS_ENDPOINT --value "https://unutma-blog.vercel.app/api/events" --scope project
```

## 4. Verify deployment

| URL | Expected |
|-----|----------|
| `GET /api/health` | `{"ok":true,"service":"unutma-blog-api",...}` |
| `GET /api/stats` (no token) | Plain text `Not found` (404) — **not** Vercel branded 404 |
| `GET /api/stats?token=ADMIN_SECRET` | HTML dashboard |
| `POST /api/events` | 401 without Bearer, 503 if Redis missing, 200 when configured |

If you see Vercel's branded **404: NOT_FOUND** page (white box with `Code: NOT_FOUND`), `/api` was **not deployed** — run blog sync (see step 1).

## 5. Privacy

- Not linked from blog pages or sitemap
- App analytics are opt-in (Settings toggle, default off)
- Update privacy policy section 5 (already in legal locales)
