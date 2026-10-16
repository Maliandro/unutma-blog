# Arastirma ozeti (OZET.md)

Tarih: 2026-10-16. Marka kurali: rakip uygulama adli sayfa ONERILMEZ; "X alternative / X vs Y" sorgulari keywords.csv'de "marka — YASAK" olarak duruyor, asagida kategori karsiliklari var.

## Yontem ve sinirlar
- Google otomatik tamamlama: en-US, en-GB, tr-TR, de-DE; "alternative" tohumlari ayrica en-US. 496 benzersiz sorgu (`keywords.csv`: 430 uygun, 66 alakasiz/baski urun; 228 satir "marka — YASAK").
- **Aylik hacim: bilinmiyor** (otomatik tamamlama hacim vermez; Search Console veya ucretli arac gerekir). Hicbir rakam uydurulmadi. Oncelik sirasi yargidir: otomatik tamamlamada gorunme + SERP bosluklari.
- Turkce tamamlama zayif cikti (33 sorgu); Almanca 77.
- WebSearch ABD merkezli ve gercek Google sirasi degil; "ilk 3 sonuc" = her sorgu icin donen ilk editoryal sayfalar (uygulama magazasi/katalog sayfalari ayri tutuldu). Kelime sayisi menu/altbilgi cikarilarak yaklasik sayildi.

## SERP analizi (15 sorgu, 22 sayfa)
| Sorgu | Sayfa (alan adi) | ~Kelime | H2 ozeti | Kimsenin kapsamadigi aci |
|---|---|---|---|---|
| best offline planner app | pocketinformant.com | 1.314 | offline planner nedir; neden onemli; planner'lar nerede cokuyor; kendi urunu | "Offline" ile "hesapsiz" farki; yeniden baslatma testi |
| | planyway.com | 4.829 | ozet; karsilastirma; secim yontemi; top 15; FAQ | offline neredeyse hic degerlendirilmiyor |
| | leadertask.com | 2.906 | 14+ uygulama sirali liste | veri nerede saklanir |
| not uygulamasi alternatifi (kategori) | guidingtech.com | 1.633 | 7 uygulama listesi | hesap gerekliligi ve saklama yeri satiri yok |
| | lealternative.net | 291 | liste, H2 yok | derinlik yok |
| best private journal app | zapier.com | 2.933 | en iyi 5-6; nasil secildi; gunluk tutmali miyim | sifrelemenin NE korudugu/korumadigi |
| | blog.mylifenote.ai | 3.073 | 9 uygulama; gizlilik bolumu; fiyat | hesapsiz + sifreli birlikte olcut degil |
| | audionotes.app | 1.459 | liste | gizlilik teknik detayi yok |
| reminders app without cloud | yougot.ai | 2.575 | "offline" ne demek; 6 uygulama; yorumlarin atladigi sey | yeniden baslama / pil optimizasyonu testi |
| | igeeksblog.com | 2.451 | nasil test ettik; iOS/Android listesi | bulut/hesap ekseni yok |
| daily planner diary app | setapp.com | 4.818 | takvim-odakli uygulamalar | planlayici + gunluk bir yerde, hesapsiz |
| | toolradar.com | 2.538 | karsilastirma tablosu; secim ipuclari | gunluk (diary) yarisi yok |
| | thebusinessdive.com | 10.247 | 24 baslik, cok uzun liste | |
| encrypted notes app | kaspersky.co.in | 1.542 | 3 uygulama + ekstra guvenlik | sifreleme turu + anahtarin yeri karsilastirmasi yok |
| | lock.pub | 1.468 | tablo; secim kriterleri; paylasim | |
| habit tracker offline | zapier.com | 4.156 | iPhone/Android/veri/oyun kategorileri | "offline" kategorisi yok |
| | clockify.me | 4.779 | 10 madde | "kacirinca ne olur" ve tek dokunus kaydi acisi yok |
| offline password manager | securden.com | 4.326 | 7 offline yonetici (is odakli) | kisisel/mobil, kaybolan telefon senaryosu |
| expense tracker no account / no bank linking | pocketclear.app (blog) | 631 | neden banka baglama yok; 5 uygulama; ipuclari | kendi urununu listeliyor; resmi kaynak yok |
| | getfinny.app | 2.149 | uc yaklasim; yanlis inanislar; rutin | resmi kaynak yok |
| | pocketclear.app (offline sayfa) | 550 | cozum; sik sorulan | |
| to-do app no account | (donen sonuclar katalog/uygulama sayfasi) | n/a | | editoryal sayfa bulunamadi; `todo-list-app-no-account-offline` zaten hazir |

Ortak konular: "en iyi X" listeleri (10-24 madde), fiyat, platform. Hicbirinde: (1) veri nerede, (2) "hesapsiz/cevrimdisi" iddiasini kendi telefonunda test yontemi, (3) kayip telefon senaryosu, (4) resmi kaynak (devlet/standart) atfi.

## 10 sayfa onerisi (oncelik sirasi)
Dil Ingilizce (9 numara ayrica). Slug'lar marka icermez. Gelen link listeleri MEVCUT yazilardan (her biri >=5).

### 1. Notes app without an account (bulut not uygulamalarina kategori-alternatifi)
- **KARAR (2026-10-16, sahip yetki verdi): MEVCUT SAYFA.** `notes-app-no-account-offline` bu oneriyi karsiliyor; yeni sayfa ACILMAZ.
- Hedef kelime: "notes app without an account"; yan: "encrypted notes app". Otomatik tamamlamada "encrypted notes app" ailesi cok; hacim bilinmiyor.
- Niyet: karsilastirma/karar. Slug: `notes-app-without-an-account`.
- Ozgun unsur: "hesapsiz mi gercekten" 5 dakikalik test notlara uyarlanmis + "Where is your data?" ekran goruntusu + ucretsiz 25 not tavani tablosu.
- Resmi kaynaklar: FTC "How Websites and Apps Collect and Use Your Information" (consumer.ftc.gov/articles/how-protect-your-privacy-apps; arama sonucunda cikti, dogrudan acilista 404 verdi, yayin oncesi dogru URL bulunmali); NIST Privacy Framework https://www.nist.gov/privacy-framework (200); Apple App Privacy Details https://developer.apple.com/app-store/app-privacy-details/ (200).
- Gelen link: `unutma-feature-offline-kullanim`, `privacy-first-productivity-apps`, `why-cloud-apps-are-risky-for-personal-data`, `best-apps-that-work-without-internet`, `keep-your-data-safe-on-your-phone`, `our-story-we-want-your-feedback`.

### 2. Private journal app, no account, encrypted
- Hedef: "private journal app"; yan: "encrypted journal app"; DE: "tagebuch app verschluesselt". Otomatik tamamlamada: "best private journal app", "private journal app free", "app for private journal".
- Niyet: liste/inceleme -> karar. Slug: `private-journal-app-no-account`.
- Ozgun: sifrelemenin ne yapip ne yapmadigi tablosu (AES-256-CBC, anahtar telefonun guvenli deposunda; acik telefonu korumaz) + "mood dokunusu da giris sayilir" 7 gunluk plan.
- Kaynaklar: Positive expressive writing sistematik derlemesi https://pmc.ncbi.nlm.nih.gov/articles/PMC12094736/ (arama sonucunda; bulgularin karisik oldugu notuyla); NCSC device security https://www.ncsc.gov.uk/collection/device-security-guidance (200); NIST SP 800-63B https://pages.nist.gov/800-63-3/sp800-63b.html (200).
- Gelen link: `benefits-of-daily-journaling`, `how-to-start-a-digital-journal`, `gratitude-journal-ideas`, `journaling-prompts-for-self-improvement`, `unutma-feature-gunluk`, `unutma-journal-mood-voice-reflection`.

### 3. Expense tracker with no bank linking, offline
- **KARAR (2026-10-16): yeni sayfa yok, MEVCUT YAZI GUCLENDIRILDI.** `unutma-economy-expenses-budgets-assets` hedef kelimesi "expense tracker without bank linking" oldu; "spent 40 on gas" calisilmis ornegi, elle girisin durust maliyeti tablosu, ekran haritasi, 5 SSS, CFPB kaynaklari eklendi.
- Hedef: "expense tracker without login"; yan: "offline budget planning app", "free offline budget planner". DE: "haushaltsbuch app offline kostenlos".
- Niyet: bilgi + karar. Slug: `expense-tracker-no-bank-linking`.
- Ozgun: "spent 40 on gas" cumlesinin kaydetmeden once onay istemesi ekran goruntusu; ucretsiz planda butce ve hizli eylemler sinirsiz (magaza metni); elle girisin durust maliyeti. Banka baglama olmadigini kodda dogrula.
- Kaynaklar: CFPB Your Money, Your Goals https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/ (arama sonucu); CFPB aylik butce formu https://files.consumerfinance.gov/f/documents/cfpb_well-being_monthly-budget.pdf; FTC https://www.ftc.gov/business-guidance/privacy-security/consumer-privacy (arama sonucu).
- Gelen link: `how-to-track-personal-expenses`, `how-to-save-money-with-expense-tracking`, `simple-budgeting-tips-for-beginners`, `50-30-20-budget-rule-explained`, `best-personal-finance-habits`, `unutma-economy-expenses-budgets-assets`, `unutma-feature-ekonomi-takibi`.

### 4. Reminders app that works without the cloud
- **KARAR (2026-10-16): yeni sayfa yok, MEVCUT YAZI GUCLENDIRILDI.** `unutma-routines-calendar-widgets-time` hedef kelimesi "reminders app that works offline" oldu; ekran ekran rutin kurulumu, pil tasarrufu altinda bildirim testi kontrol listesi, 5 SSS, Android Doze + Apple bildirim belgeleri eklendi.
- Hedef: "reminders app without cloud"; yan: "offline reminder app". Hacim bilinmiyor.
- Niyet: bilgi/karar. Slug: `reminders-app-without-cloud`.
- Ozgun: ucak modu + yeniden baslatma + bekleme testi; bildirimlerin telefonda planlandigi gercegi; sinirlar (pil optimizasyonu) acik. Once kodda zamanlama yolunu dogrula.
- Kaynaklar: Android Doze/App Standby gelistirici belgesi (bu oturumda dogrulanmadi, bulunacak); NCSC device security (200); Apple/Google platform belgesi.
- Gelen link: `unutma-feature-hatirlaticilar`, `unutma-routines-calendar-widgets-time`, `how-to-stop-forgetting-things`, `daily-planner-tips-for-busy-people`, `weekly-planning-tips`, `todo-list-app-no-account-offline` (17 Ekim sonrasi).

### 5. Offline password vault on your phone
- **KARAR (2026-10-16): yeni sayfa yok, MEVCUT YAZI GUCLENDIRILDI.** `unutma-vault-passwords-face-id-privacy` hedef kelimesi "offline password vault app" oldu; "neyi korur / neyi korumaz" tablosu ("key stretching (10,000 rounds of SHA-256)", PBKDF2 yazilmadi), kayip telefon kontrol listesi + ayri kasa yedegi adimlari, 5 SSS, NIST/CISA/NCSC eklendi. `how-to-manage-passwords-without-cloud` bu sayfaya yonlendirildi.
- Hedef: "offline password manager" / "password vault app"; DE: "passwort tresor app offline".
- Niyet: karar. Slug: `offline-password-vault-app`. Dikkat: `how-to-manage-passwords-without-cloud` (kalip yazi) mevcut; ayri kelimeyle konumlan, kural 5.
- Ozgun: durust tehdit modeli tablosu + 10 dakikalik "kasa sagligi" listesi + ucretsiz 3 kayit tavani. PIN icin "PBKDF2" degil "tuzlu, 10.000 tur SHA-256" de (stats.md).
- Kaynaklar: NIST SP 800-63B (200); CISA https://www.cisa.gov/secure-our-world/use-strong-passwords (200); NCSC https://www.ncsc.gov.uk/collection/passwords/updating-your-approach (200); BSI sichere Passwoerter (DE, 200).
- Gelen link: `unutma-feature-sifre-kasasi`, `how-to-manage-passwords-without-cloud`, `keep-your-data-safe-on-your-phone`, `unutma-vault-passwords-face-id-privacy`, `why-cloud-apps-are-risky-for-personal-data`, `privacy-first-productivity-apps`.

### 6. Habit tracker that works offline
- Hedef: "habit tracker offline"; yan: "free offline habit tracker", "habit tracker app offline" (hepsi otomatik tamamlamada).
- Niyet: liste/karar. Slug: `habit-tracker-offline`.
- Ozgun: "did I do it?" tek dokunus zaman damgasi (hizli eylemler) + durust sure notu: Lally ve ark. medyan 66 gun, n=39, ozbildirim sinirli.
- Kaynaklar: Lally ve ark. 2010, European Journal of Social Psychology 40:998-1009 (BPS ozeti https://bps.org.uk/research-digest/how-form-habit, arama sonucu); Gardner, Rebar, Lally 2022 Cogent Psychology (https://doaj.org/article/fca183e3f358456dad962dec0b5dbd5d).
- Gelen link: `how-to-build-habits-that-stick`, `how-to-build-a-morning-routine`, `evening-routine-for-productivity`, `unutma-feature-hizli-eylemler`, `unutma-feature-rutinler`, `unutma-quick-actions-streaks-heatmap-statistics`, `beyond-the-todo-list-the-forgot-check-loop`.

### 7. Daily planner and diary in one app
- Hedef: "daily planner diary app" (otomatik tamamlamada "...app", "...app free", "...digital").
- Niyet: bilgi/karar. Slug: `daily-planner-diary-app`.
- Ozgun: ayni gun hem rutin/takvim hem gunluk girdisi ekran goruntusu; SERP'te "diary" yarisi yok.
- Kaynaklar: Gollwitzer 1999, "Implementation intentions", American Psychologist 54(7):493-503 (bu oturumda acilmadi, yayin oncesi dogrula); PMC12094736; BPS habit ozeti.
- Gelen link: `daily-planner-tips-for-busy-people`, `weekly-planning-tips`, `how-to-organize-your-life`, `personal-organization-tips-2026`, `unutma-routines-calendar-widgets-time`, `unutma-app-complete-feature-guide`.

### 8. How to read an app's privacy label before installing
- Hedef: "app privacy label explained" / "is this app really offline" (hacim bilinmiyor; editoryal bosluk).
- Niyet: bilgi, guven. Slug: `how-to-read-app-privacy-labels`.
- Ozgun: adim adim kontrol listesi, Apple ve Google ekranlari; etiketlerin kendi beyanina dayandigi notu; kendi etiketimizi ornek goster.
- Kaynaklar: Apple App Privacy Details (200); Google Play Data safety https://support.google.com/googleplay/android-developer/answer/10787469 (200); FTC consumer privacy.
- Gelen link: `privacy-first-productivity-apps`, `why-cloud-apps-are-risky-for-personal-data`, `keep-your-data-safe-on-your-phone`, `our-story-we-want-your-feedback`, `todo-list-app-no-account-offline`, `best-apps-that-work-without-internet`.

### 9. Haushaltsbuch-App offline / Notiz-App ohne Konto (DE) — DIL KARARI BEKLIYOR
- Hedef: "haushaltsbuch app offline kostenlos", "notiz app ohne cloud" (DE otomatik tamamlamada). Blog Ingilizce; Almanca sayfa yeni dil demek, sahibi karar verir. Uygulamada 8 dil ve Almanca magaza metni var.
- Ozgun: Almanca ekran goruntusu + BSI / Verbraucherzentrale atfi.
- Kaynaklar: https://www.verbraucherzentrale.de/wissen/digitale-welt/datenschutz (200); BSI (200); EUR-Lex GDPR https://eur-lex.europa.eu/eli/reg/2016/679/oj (202).
- Gelen link: dil farkli, ic link hedefi zayif; en az 5 icin once dil karari gerekir.

### 10. One life organizer instead of nine apps
- Hedef: "personal organizer app" / "life organizer app". Bu kume icin otomatik tamamlama verisi TOPLANMADI; ek calisma gerek.
- Niyet: bilgi/karar. Slug: `life-organizer-app-one-place`.
- Ozgun: "bir cumle, birkac kayit" demosu; "9 uygulama -> 1" haritasi; ne yapmadigi (ortak liste yok, bilgisayar yok).
- Kaynaklar: NIST Privacy Framework; FTC consumer privacy; NCSC device security.
- Gelen link: `how-to-organize-your-life`, `personal-organization-tips-2026`, `digital-minimalism-tips`, `mindfulness-and-organization`, `unutma-app-complete-feature-guide`, `unutma-app-showcase-complete-guide`.

## Eklenmeyen sayfalar
- "offline to-do app without sign-up": `todo-list-app-no-account-offline` (taslak, 17 Ekim) zaten hedefliyor; ikinci sayfa acilmaz (kural 5).
- Tum "X alternative / X vs Y" sayfalari: marka yasagi.
- Sesli girdi: `unutma-voice-commands-hands-free-organizing` mevcut.

## Dogrulanamayanlar
- Tum hacimler bilinmiyor.
- FTC consumer.ftc.gov linki 404 verdi; Android Doze ve Gollwitzer kaynagi acilmadi.
- Dogrulanan (HTTP 200): CISA use-strong-passwords, NIST 800-63B, NIST Privacy Framework, NCSC passwords + device security, BSI, Verbraucherzentrale, Apple privacy details, Google Play data safety.
