# SEO süreci: her yeni yazıdan önce oku

Blog İngilizce (ABD/İngiltere okuru). Bu dosya Türkçe, sana yol göstersin diye.

## Kurallar

1. **Önce en çok satın alma niyeti olan sayfalar.** Sıra: "X alternative" (ör. Google Keep alternative),
   "X vs Y" karşılaştırma, sonra kısıt sayfaları ("no account", "offline"). Özellik turu en son.
2. **Karşılaştırma dürüst olur.** Kaybettiğimiz satırlar da tabloda kalır. Rakip bilgisi resmi
   kaynaktan (yardım sayfası, fiyat sayfası) linkle verilir; doğrulanamayan iddia yazılmaz.
3. **Kısıt sayfası sadece gerçekten uyuyorsak yazılır.** Uygulama o şartı karşılamıyorsa
   ("hesapsız", "çevrimdışı" gibi) o sayfa hiç açılmaz.
4. **Her yazıda bir özgün unsur olmalı.** Gerçek ekran görüntüsü, kaynaklı tablo, kontrol listesi
   ya da kendi rakamlarımız. Özgün unsur yoksa yazı yayınlanmaz.
5. **Bir anahtar kelime = bir sayfa.** Aynı kelimeye ikinci sayfa açılmaz; yan kelimeler başlığa girer.
6. **Başlık en güçlü unsur.** Başlık kısmı en fazla 50 karakter civarı (sitenin " | Unutma Blog" eki
   de eklenince ~60). Açıklama 140–160 karakter ve tıklatacak şekilde yazılır.
7. **Her yeni yazıya en az 5 iç link.** İlgili eski yazılara cümle içinde eklenir (menüye değil);
   link metni hedef anahtar kelimeye benzer olur. Format: `/blog/yazi-adi/`.
8. **Haftada tek yeni yazı** (sahibinin kararı, 10 Eki 2026). Pazar robotu (generate.yml,
   generate-feature-blog.yml) bu yüzden kapalı. Çok sayıda kalıp sayfa Google'ın "toplu içerik"
   kuralına takılır. Sıradaki yazı `draft: true` ile hazır bekler; taslak sayfa üretilmez.
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
ve site haritasında olup olmadığını Türkçe raporlar. "UYARI" satırı varsa yayından önce düzelt.

## Sıradaki yazı: 17 Ekim 2026

`todo-list-app-no-account-offline` taslak olarak hazır. Yayın günü:

1. `draft: true` satırını `draft: false` yap.
2. Ona en az 5 iç link ekle. Biri mutlaka `best-offline-todo-app` yazısından olsun: iki yazı
   "offline" aramasında çakışmasın diye yeni yazı "hesapsız" (no account) kelimesine odaklandı,
   eski yazı ona yönlendirir. Diğer adaylar: `move-unutma-to-a-new-phone`, `a-phone-assistant-without-an-llm`,
   `unutma-vault-passwords-face-id-privacy`, `unutma-lists-todo-shopping-wishlist-workflow`,
   `google-keep-alternative-no-account-offline`.
3. İki komutu çalıştır, sonra yayınla.

## Sonra gözden geçirilecek yazılar (SİLME)

Bu iki yazı Unutma'nın konusu dışında, kısa (~400 kelime) ve büyük ihtimalle alakasız trafik getiriyor:

- `free-academic-research-tools-for-students`
- `how-to-organize-a-literature-review-without-getting-lost`

Search Console'da birkaç aylık veri birikince bak: tıklama ve uygulamaya yönlendirme getiriyorlarsa
kalsınlar. Karar sahibinindir; şimdilik dokunma.
