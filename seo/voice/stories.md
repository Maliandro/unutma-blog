# Gercek kullanici hikayeleri (stories.md)

**Durum: depoda, blogda ve notlarda dogrulanabilir gercek kullanici hikayesi BULUNAMADI.**

Taranan: `src/content/blog/*.md` (58 yazi), `docs/`. Blogdaki tek kisisel anlatim, gelistiricinin kendi sesi ("I'm a solo developer", `a-phone-assistant-without-an-llm`) ve "That idea I had on the train?" (`our-story-we-want-your-feedback`) ornegidir; ikincisi kullanici hikayesi degil, yazarin retorik ornegidir. Telemetri olmadigindan kullanicilarin ne yazdigi bilinmez (yazida da boyle yaziyor).

Kural: Hikaye, sahte alinti ve "bir okurumuz sunu dedi" kurgusu YAZILMAZ.

## Sablon (gercek bir hikaye gelirse)

```
Kaynak: (e-posta / magaza yorumu / destek mesaji; tarih; kullanicidan yazili izin var mi: evet/hayir)
Anonimlestirme: isim, sehir, is, yas cikarildi
Durum (1 cumle):
Ne denedi (1 cumle):
Uygulamada ne oldu (dogrulanabilir ozellik):
Sonuc, kendi sozleriyle (kisa, izinli alinti):
Yayin: Izin yoksa alinti yok, sadece genel ifade ("Bazi kullanicilar ... soruyor" ancak sayi/kanit varsa)
```

Izin olmadan yorum metni kopyalanmaz. Gercek hikaye toplamak icin `our-story-we-want-your-feedback` yazisinin sonundaki geri bildirim cagrisi kullanilabilir.
