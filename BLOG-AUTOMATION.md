# Unutma Blog — yayin deposu

Canli site: **https://unutma-blog.vercel.app** (Vercel, `master` push ile deploy)

## Tek dogruluk kaynagi: BU depo

Kaynak kod ve yazilar yalnizca burada (`Maliandro/unutma-blog`). Eski duzende kaynak
`Maliandro/unutma-app` icindeki `unutma-blog/` klasorundeydi ve `publish-unutma-blog.yml`
workflow'u buraya kopyaliyordu. O klasor ve workflow **2026-10-10'da kaldirildi**; oradaki
duzenlemeler hic canliya ulasmiyordu. Artik yayin akisi:

1. Bu depoda duzenle (`src/content/blog/*.md`, `src/`).
2. `npm run build` ve `node scripts/seo-check.mjs` (HATA varsa yayinlama). Kurallar: `SEO-SURECI.md`.
3. `master`'a push -> Vercel derler ve yayinlar (`vercel.json`: `npm ci`, `npm run build`, `dist/`).

Zamanlanmis yazi: frontmatter'a `publishAt: YYYY-AA-GG` yazilir; tarih gelene kadar sayfa
uretilmez. Tarih geldiginde bir derleme gerekir: oneri `seo/proposals/daily-rebuild.yml`
(kurulu degil; Vercel Deploy Hook ister).

IndexNow (kurulu degil, sahibin onayi bekliyor): `node scripts/indexnow-submit.mjs` varsayilan
olarak kuru calisir. Gercek gonderim yalnizca deploy BITTIKTEN sonra `--submit` ile.

## Otomasyon

| Workflow | Durum |
|----------|-------|
| `.github/workflows/generate.yml` | Zamanlayici KAPALI (10 Eki 2026). Yalnizca elle calistirilabilir. |
| `.github/workflows/generate-feature-blog.yml` | Zamanlayici KAPALI. Yalnizca elle calistirilabilir. |

Not: bu iki robotun urettigi sablon yazilar ("A Calm, Private Way to Stay Organized") toplu
icerik riski tasiyor; birlestirme plani `seo/research/CONSOLIDATION.md`. Robotlari yeniden
acmayin.

Secrets (yalnizca elle calistirma icin): `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` (istege bagli yedek).
