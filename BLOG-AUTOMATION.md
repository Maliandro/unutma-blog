# Unutma Blog — yayın repo

Canlı site: **https://unutma-blog.vercel.app** (Vercel, `master` push ile deploy)

## Otomasyon

| Workflow | Ne zaman |
|----------|----------|
| `.github/workflows/generate.yml` | Günlük SEO yazıları |
| `.github/workflows/generate-feature-blog.yml` | Pazar özellik yazısı |

Secrets: `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` (isteğe bağlı yedek).

## unutma-app ile sync

Ana geliştirme `Maliandro/unutma-app` içindeki `unutma-blog/` klasöründe.  
Push sonrası `unutma-app` workflow'u (`publish-unutma-blog.yml`) bu repoya yazar → Vercel yayınlar.

Detay: `unutma-app/unutma-blog/BLOG-AUTOMATION.md`
