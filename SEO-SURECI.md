# SEO süreci: her yeni yazıdan önce oku

Blog İngilizce (ABD/İngiltere okuru). Bu dosya Türkçe, sana yol göstersin diye.

## Kurallar

1. **Önce en çok satın alma niyeti olan sayfalar.** Sıra: kategori düzeyinde alternatif sayfası
   (ör. "notes app with no account" = hesapsız, bulut not uygulamalarına alternatif), kategori
   karşılaştırması ("cloud to-do apps vs offline to-do apps"), sonra kısıt sayfaları ("no account",
   "offline"). Özellik turu en son.
2. **RAKİP MARKA ADI YASAK (sahibinin kararı, 16 Eki 2026; Mobies ile aynı kural).** Hiçbir yazının
   adresinde, başlığında, açıklamasında, etiketinde, gövdesinde ya da HTML'inde rakip uygulama adı
   geçmez (ör. not, yapılacaklar, günlük, şifre, bütçe uygulamaları). Yerine kategori yazılır:
   "hesap isteyen bulut not uygulamaları", "e-posta paketine bağlı yapılacaklar uygulamaları".
   Rakip fiyatı ve rakibe link de yazılmaz. Karşılaştırma yine dürüst olur: kategori olarak
   kaybettiğimiz satırlar (senkron, bilgisayar, canlı paylaşım) tabloda kalır. Doğrulanamayan
   iddia yazılmaz; "genellikle", "çoğu" gibi kategori ifadesi kullanılır. `seo-check` bu kuralı
   derlenmiş HTML'de HATA olarak denetler; marka listesi `scripts/seo-check.mjs` başındaki
   `COMPETITOR_BRANDS` dizisindedir.
3. **Kısıt sayfası sadece gerçekten uyuyorsak yazılır.** Uygulama o şartı karşılamıyorsa
   ("hesapsız", "çevrimdışı" gibi) o sayfa hiç açılmaz.
4. **Her yazıda bir özgün unsur olmalı.** Gerçek ekran görüntüsü, kaynaklı tablo, kontrol listesi
   ya da kendi rakamlarımız. Özgün unsur yoksa yazı yayınlanmaz.
5. **Bir anahtar kelime = bir sayfa.** Aynı kelimeye ikinci sayfa açılmaz; yan kelimeler başlığa girer.
   Hedef kelime frontmatter'da `keyword:` satırına yazılır; `seo-check` ilk 100 kelimede arar.
6. **Başlık en güçlü unsur.** Başlık kısmı en fazla 50 karakter civarı (sitenin " | Unutma Blog" eki
   de eklenince ~60). Açıklama 140–160 karakter ve tıklatacak şekilde yazılır.
7. **Her yeni yazıya en az 5 iç link.** İlgili eski yazılara cümle içinde eklenir (menüye değil);
   link metni hedef anahtar kelimeye benzer olur. Format: `/blog/yazi-adi/`.
8. **Haftada tek yeni yazı** (sahibinin kararı, 10 Eki 2026). Pazar robotu (generate.yml,
   generate-feature-blog.yml) bu yüzden kapalı. Çok sayıda kalıp sayfa Google'ın "toplu içerik"
   kuralına takılır. Sıradaki yazı `draft: true` ile ya da `publishAt: YYYY-AA-GG` ile hazır bekler.
   `publishAt` gelecekteyse sayfa derlenmez, site haritasına ve listelere girmez, ona verilen iç
   linkler düz metin olarak görünür; tarih gelince ilk derlemede yayına çıkar (günlük derleme
   önerisi: `seo/proposals/daily-rebuild.yml`). Haftada tek kuralı: iki yazının `publishAt`
   tarihi arasında en az 7 gün olur; `seo-check` aynı haftaya düşen iki yazıyı UYARI olarak gösterir.
9. **Eski yazılardan hiçbir şey silinmez.** Değişiklik sadece ekleme (bir cümle, bir link) olur ve
   o yazının başına `updatedDate:` bugünün tarihi yazılır.
10. **600 kelimeden uzun bir sayfayı sahibi onaylamadan silme.** Yayından kaldırmak da silmek sayılır.
11. **Site haritası (sitemap) kendiliğinden oluşur** (@astrojs/sitemap). Yine de her derlemeden
    sonra yeni adresin `dist/sitemap-0.xml` içinde olduğunu kontrol et.
12. **Yayından önce özgün unsuru kontrol et.** Tablo, ekran görüntüsü veya liste yazıda duruyor mu?
    Düzenlemeler sırasında kaybolmuş olabilir.

## Yayından önce iki komut

```
npm run build
node scripts/seo-check.mjs
```

`seo-check` her yazının gelen iç link sayısını, başlık ve açıklama uzunluğunu, canonical etiketini
ve site haritasında olup olmadığını Türkçe raporlar. Ayrıca: tek H1 (HATA), rakip marka adı (HATA),
`keyword` ilk 100 kelimede mi, 4–8 SSS maddesi, 2–3 resmi dış kaynak, kalıp yapay zeka ifadeleri
("In conclusion", "delve" gibi) ve alt metni olmayan görsel (UYARI). "HATA" varsa yayınlama;
"UYARI" satırı varsa yeni yazıda yayından önce düzelt.

## Sıradaki yazı: 17 Ekim 2026

`todo-list-app-no-account-offline` taslak olarak hazır. Yayın günü:

1. `draft: true` satırını `draft: false` yap.
2. Ona en az 5 iç link ekle. Biri mutlaka `best-offline-todo-app` yazısından olsun: iki yazı
   "offline" aramasında çakışmasın diye yeni yazı "hesapsız" (no account) kelimesine odaklandı,
   eski yazı ona yönlendirir. Diğer adaylar: `move-unutma-to-a-new-phone`, `a-phone-assistant-without-an-llm`,
   `unutma-vault-passwords-face-id-privacy`, `unutma-lists-todo-shopping-wishlist-workflow`,
   `notes-app-no-account-offline` (eski adı `google-keep-alternative-no-account-offline`; marka
   yasağı nedeniyle 16 Eki 2026'da yeniden yazıldı, eski adres vercel.json'da kalıcı yönlendirmeli).
3. İki komutu çalıştır, sonra yayınla.

Hazır bağlantı cümleleri (yazının ilgili paragrafının sonuna eklenir, `updatedDate` güncellenir):

- `move-unutma-to-a-new-phone`: Still choosing an app? Our guide to finding a [to-do list app with no account](/blog/todo-list-app-no-account-offline/) includes a 5-minute test you can run on any app, this one included.
- `unutma-routines-calendar-widgets-time`: All of these reminders are scheduled on your phone, so they keep firing with no signal. That is the core of a [to-do list app with no account](/blog/todo-list-app-no-account-offline/).
- `unutma-themes-games-languages-backup`: The same foundation is why Unutma is a [to-do list app with no account](/blog/todo-list-app-no-account-offline/): no sign-up, no server, no sync.
- `unutma-vault-passwords-face-id-privacy`: Why no mandatory login at all? Our guide to a [to-do list app with no account](/blog/todo-list-app-no-account-offline/) explains the trade-off, including what you give up.
- `unutma-lists-todo-shopping-wishlist-workflow`: If you want lists that never ask you to log in, read our guide to a [to-do list app with no account](/blog/todo-list-app-no-account-offline/).
- `unutma-app-showcase-complete-guide` ve `our-story-we-want-your-feedback`: "notes app with no account" cümlesinin yanına "and our [to-do list app with no account](/blog/todo-list-app-no-account-offline/) guide" eklenir.

Not: yayında olmayan yazıya verilen link derlemede düz metne döndüğü için bu cümleler yayın gününden
önce de eklenebilir; kırık link oluşmaz.

## Sonra gözden geçirilecek yazılar (SİLME)

Bu iki yazı Unutma'nın konusu dışında, kısa (~400 kelime) ve büyük ihtimalle alakasız trafik getiriyor:

- `free-academic-research-tools-for-students`
- `how-to-organize-a-literature-review-without-getting-lost`

Search Console'da birkaç aylık veri birikince bak: tıklama ve uygulamaya yönlendirme getiriyorlarsa
kalsınlar. Karar sahibinindir; şimdilik dokunma.
