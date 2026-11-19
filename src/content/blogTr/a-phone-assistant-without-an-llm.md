---
title: "Cümlelerinizi Yapay Zekâ Modeli Olmadan Dosyalayan Asistan"
description: "Tek cümle, kurallar ve 41 KB'lık bir sınıflandırıcıyla telefonda görev, harcama, rutin ya da Kasa kaydına dönüşür. Dürüst doğruluk rakamlarıyla."
seoTitle: "Yapay Zekâ Modeli Olmayan Telefon Asistanı: Nasıl Çalışır"
trSlug: yapay-zeka-modelsiz-telefon-asistani
keyword: "yapay zekâ modeli olmayan telefon asistanı"
pubDate: 2026-09-23
updatedDate: 2026-10-16
tags: ["Unutma", "mühendislik", "gizlilik", "cihaz içi", "show-hn"]
image: /blog/covers/v3/a-phone-assistant-without-an-llm.jpg
imageAlt: "Unutma asistanı tek cümleyi bir takvim kaydına, bir alışveriş maddesine ve bir bütçe harcamasına ayırıyor"
featured: true
draft: false
---

<video src="/launch/unutma-show-hn-16x9.mp4" poster="/launch/unutma-show-hn-poster.jpg" controls playsinline preload="metadata" style="width:100%;border-radius:12px"></video>

Ben tek başına çalışan bir geliştiriciyim. Unutma ("unutma" Türkçede "don't forget" demek), tek telefonda bir yapılacaklar listesi, takvim, bütçe, günlük, not uygulaması ve parola kasası. İlginç kısım ekranın altındaki kutu. Yapay zekâ modeli olmayan bir telefon asistanı. Bir cümle yazarsınız ya da söylersiniz ve o cümlenin nereye ait olduğuna karar verir:

| Siz ne dersiniz | O ne yapar |
|---|---|
| Perşembe saat 15'te diş hekimi | Perşembe günü bitişli bir yapılacak, hatırlatıcı 15:00'te |
| Benzine 40 harcadım | 40'lık bir harcama; kaydetmeden önce onaylamanızı ister |
| Bitkileri gün aşırı sula | Her 2 günde bir tekrarlanan bir rutin |
| Annemin doğum günü 3 Mayıs | Her yıl tekrarlanan hatırlanacak bir tarih |
| Wifi parolası hunter22 | Doğrudan şifreli Kasa'ya, sohbette maskelenmiş |
| Bu hafta neler var? / Bütçemi aç / Koyu temaya geç | Kendi kayıtlarınızdan bir yanıt, bir ekran, geri alınabilir bir ayar |

Bunlar motorun tam bu cümleler için ürettiği gerçek çıktılar, bir senaryo değil.

## Neden yapay zekâ modeli değil

Uyan bir tane bulmaya çalıştım. 0,5B–1B'lik bir model nicemlemeden sonra 200 MB ile 1 GB arasında, orta sınıf bir telefonda cümle başına saniyeler sürüyor, tam da Türkçede en zayıf ve ara sıra bir alan uyduruyor. İşi diş hekimi randevunuzu doğru yere koymak olan bir uygulama için "ara sıra uyduruyor" yanlış bir hata biçimi. Bulut modelleri hiçbir zaman seçenek değildi: uygulamanın sunucusu ve hesabı yok ve böyle kalmasını istedim.

## Nasıl çalışıyor

Aşağıdaki her şey telefonda çalışır. Yazdığınız hiçbir şey bir yere gönderilmez.

1. **Altı dilde kurallar** (Türkçe, İngilizce, Almanca, İspanyolca, Fransızca, İtalyanca). Bir sözcük ayırıcı, normalleştirme, Türkçe ek işleme ve tarihler, saatler, tutarlar ve tekrar için çıkarıcılar ("gün aşırı", "her ayın 15'inde"). Alan doldurmanın tamamını hâlâ kurallar yapar.
2. **Küçük bir gömme modeli.** Budanmış bir multilingual-e5-small, int8, yaklaşık 29 MB, ONNX Runtime üzerinden çalışıyor.
3. **41 KB'lık bir sınıflandırıcı.** Cümle gömmesi, dil ve kurallardan alınan 29 özellik (hangi katmanın tetiklendiği, ne kadar emin olduğu, ikinci adayın ne kadar yakın olduğu) üzerinde lojistik regresyon. 18 hedef üzerinde kalibre edilmiş bir olasılık verir.

Sınıflandırıcı asla içerik yazmaz. Yalnızca bir kutu seçer ve o kutunun kuralları somut bir kayıt oluşturabilmelidir, aksi halde seçim bırakılır. Sonra beş şeyden biri olur:

- **kabul / uygula**: kurallar ve model aynı fikirde ya da model emin. Kayıt, geri al ve "yanlış yer mi?" etiketiyle kaydedilir.
- **tut ya da al**: kurallar çok emindi ve model aynı fikirde değil. Sessizce üzerine yazmak yerine sorar.
- **öner / sor**: emin değil. Cümlenin gidebileceği en iyi yerleri ve "yapılacak olarak kaydet"i gösterir.

Bir yer seçtiğinizde telefon o cümlenin gömmesini (384 sayı, metin değil) seçiminizle birlikte saklar ve benzer cümleler sonraki sefer oraya gider. Kasa kayıtları hariçtir, yedek de öyle.

## Dürüst rakamlar

Kuralların ve modelin ayarlama sırasında hiç görmediği ayrı kümelerde ölçüyorum. Sonuncusu altı dilde 1.595 cümle içeriyor; çoğu bilerek dağınık ya da bir cümlede iki niyet içeriyor. Eşikler dondurulduktan sonra bir kez açıldı. Aşağıdaki rakamlar o ölçümün tarihi olan 18 Eylül 2026 itibarıyla.

| Ölçü | Yalnızca kurallar | Kurallar + model |
|---|---|---|
| İlk denemede doğru yer | %50,2 | %63,9 |
| Size gösterilen doğru yer (öneri dahil) | – | %67,4 |
| Sormadan yanlış yere kaydedilen | %49,8 | %19,9 |

%90'da değil ve mevcut yaklaşımın oraya ulaşacağını sanmıyorum. En çok önemsediğim sayı son satır. Size sorulan yanlış bir tahmin tek dokunuşa mal olur. Sessizce kaydedilen yanlış bir tahmin ise diş hekimini kaçırma yolu.

Bir uyarı: test cümleleri kurallardan bağımsız olarak test için yazıldı. Gerçek kullanıcı cümleleri değil, çünkü uygulamada telemetri yok ve kimsenin ne yazdığını göremiyorum. Deneyip bir şeyi yanlış yaparsa bana söylemeniz, öğrenmemin tek yolu.

## Gizlilik ayrıntıları

- Hesap yok, kayıt ekranı yok, verilerinizi alan sunucu yok.
- Kasa ve günlük bekleme halinde şifrelenir (AES-256, anahtar telefonun güvenli depolamasında tutulur).
- Sesli giriş telefonun kendi konuşma tanımasını kullanır. Telefon destekliyorsa cihazda çalışır; desteklemiyorsa işletim sistemi ağ hizmetini kullanabilir. Uygulama bu olduğunda bir kez söyler.

## Sıkça sorulan sorular

### Unutma büyük bir dil modeli kullanıyor mu?

Hayır. Altı dilde elle yazılmış kurallar, küçük bir çok dilli gömme modeli (yaklaşık 29 MB, int8) ve 41 KB'lık bir sınıflandırıcı kullanıyor. Sınıflandırıcı yalnızca bir hedef seçer; asla içerik yazmaz.

### Yazdığım herhangi bir şey bir sunucuya gönderiliyor mu?

Hayır. Kurallar, gömme modeli ve sınıflandırıcı telefonda çalışır; uygulamanın hesabı ve kayıtlarınızı alan bir sunucusu yok.

### Ne kadar doğru?

18 Eylül 2026 itibarıyla, 1.595 cümlelik mühürlü bir test kümesinde, ilk denemede %63,9'unu doğru yere koydu (yalnızca kurallar: %50,2). Size gösterdiği öneri dahil %67,4. %19,9'unu sormadan yanlış yere kaydetti. Test cümleleri gerçek kullanıcılardan değil, test için yazıldı.

### Asistan hangi dilleri anlıyor?

Altı: İngilizce, Türkçe, Almanca, İspanyolca, Fransızca ve İtalyanca.

### Sesli giriş telefonda mı kalıyor?

Telefonunuza bağlı. Unutma telefonun kendi konuşma tanımasını kullanır. iPhone'da Apple, bir uygulamanın [tanıyıcının ağ erişimi olmadan çalışıp çalışamayacağını](https://developer.apple.com/documentation/speech/sfspeechrecognizer/supportsondevicerecognition) kontrol etmesine izin verir. Android'de varsayılan [konuşma tanıyıcı sesi uzak sunuculara aktarabilir](https://developer.android.com/reference/android/speech/SpeechRecognizer); daha yeni sürümler ayrıca cihaz içi bir tanıyıcı da sunar.

### Kasa nasıl şifreleniyor?

[NIST tarafından yayımlanan Gelişmiş Şifreleme Standardı](https://csrc.nist.gov/pubs/fips/197/final) olan AES-256 ile ve telefonun güvenli depolamasında tutulan bir anahtarla. Günlük aynı düzeni kullanır.

## Deneyin

Unutma [App Store](https://apps.apple.com/app/id6758889495) ve [Google Play](https://play.google.com/store/apps/details?id=com.mehmet.unutma)'de. Cihaz içi model bugün iPhone sürümünde (3.16) geliyor; aynı motorlu Android güncellemesi kısa süre sonra gelecek. Her özellik 7 gün ücretsiz, sonra bir abonelik; kayıtlarınız her iki durumda da telefonunuzda kalır.

Bir şeyi yanlış yere dosyalarsa cümleyi gerçekten bilmek isterim. Bu yazının bütün amacı bu.
