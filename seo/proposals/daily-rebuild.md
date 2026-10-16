# Gunluk yeniden derleme: neden Deploy Hook, neden bos commit degil

1. Site statik (Astro, `output` varsayilan), Vercel'e `master` push'u ile gidiyor; depoda Vercel Deploy Hook tanimi ya da derleme tetikleyen bir workflow yok (`vercel.json`'da yalnizca build/redirect/header ayari var).
2. `publishAt` ile bekleyen yazi ancak bir sonraki DERLEMEDE cikar. Yani "yayin gunu" icin bir derleme tetigi lazim.
3. Bos commit secenegi: git gecmisine her gun anlamsiz commit yazar, `contents: write` izni ister ve Vercel'in her push'ta derlemesine dayanir. Ayrica botun push'u ile sahibin elle push'u cakisabilir.
4. Deploy Hook secenegi: Vercel panelinde master icin bir adres uretilir; ona POST atmak commit olmadan master'i yeniden derler. Izin `contents: read` yeter, gecmis temiz kalir.
5. Onerilen workflow (`daily-rebuild.yml`) once "son 24 saatte zamani gelen yazi var mi" diye bakar; yoksa hook'a hic dokunmaz. Haftada tek yazi kuraliyla bu, haftada bir derleme demek.
6. Blog deposu herkese acik (public); GitHub Actions dakikasi bu depoda ucretsiz. Is ~20 saniye surer. (Unutma ana deposundaki private-repo kota sorunu buraya uygulanmaz.)
7. 06:00 UTC = 09:00 Turkiye, sabah 02:00 ABD Dogu. `publishAt: 2026-10-24` UTC gece yarisi demek; 06:00 derlemesi onu yakalar.
8. Kirik link riski yok: yayinda olmayan yaziya verilen link derlemede duz metne doner (`src/plugins/rehype-blog.mjs`), yazi cikinca ilk derlemede link olur.
9. Icerik onbellegi: `npm run build` once `scripts/clear-content-cache.mjs` calistirir; Vercel'in derleme onbellegi eski HTML'i tasimaz.
10. Kurulum sahibin isi: Vercel'de hook olustur -> GitHub secret `VERCEL_DEPLOY_HOOK_URL` -> dosyayi `.github/workflows/` altina kopyala -> "Run workflow" ile `force` deneme.

Haftada tek yazi kurali ile kullanim: taslak hazir olunca `draft: false` + `publishAt: <tarih>` yazilir ve push edilir. `node scripts/seo-check.mjs` iki yazinin yayin aninin 7 gunden yakin oldugunu UYARI olarak gosterir.

IndexNow ile birlesim (sahip onayindan sonra): hook adimindan sonra Vercel derlemesinin bitmesini bekleyip `node scripts/indexnow-submit.mjs --submit` calistirmak gerekir; derleme bitmeden gonderim yeni adresi 404 olarak bildirir. Bu nedenle ayri bir is olarak 06:30 UTC'de calistirmak daha guvenli.
