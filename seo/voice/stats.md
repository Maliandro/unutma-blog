# Dogrulanmis olgular (stats.md)

Yalniz kodda veya magaza metninde dogrulananlar. FIYAT YOK. Kaynak yolu uygulama deposuna gore: `C:\projelerim\PROJELERİM\UNUTTUM MU APP\unuttum-mu\`. Dogrulama tarihi: 2026-10-16.

| Olgu | Deger | Kaynak |
|---|---|---|
| Uygulama dili | 8 (TR, EN, DE, ES, FR, IT, AR, ZH) | `src/locales/` (ar, de, en, es, fr, it, tr, zh .json); `fastlane/metadata/en-US/description.txt:36` |
| Asistanin anladigi dil | 6 (EN, TR, DE, ES, FR, IT) | `fastlane/metadata/en-US/description.txt:48` |
| Tema sayisi | 12 | `src/constants/colors.ts:563-576` (ALL_THEMES); `description.txt:36`. (Repo kokundeki CLAUDE.md "11" diyor, eski.) |
| Hesap / kayit | Kayit ekrani yok: isim, e-posta, profil yok | `description.txt:39` |
| Ucak modu | Asistan dahil her sey calisir | `description.txt:40` |
| Veri yeri ekrani | Ayarlar > "Where is your data?" | `description.txt:41`; `src/locales/en.json:3105` |
| Reklam / istatistik | Reklam yok; kullanim istatistigi, acilmadikca kapali | `description.txt:42`; kod: `src/services/analyticsService.ts:141-142` (onay yoksa gonderim yapilmaz) |
| Sifreleme (kasa) | AES-256-CBC, rastgele 128-bit IV, anahtar telefonun guvenli deposunda (SecureStore) | `src/services/encryption.ts:2, 19-26, 66-72` |
| Sifreleme (gunluk) | Kasayla ayni sema: AES-256-CBC | `src/storage/journalStore.ts:11` |
| PIN saklama | Tuzlu, 10.000 tur SHA-256 zincirleme ("PBKDF2-lite"); gercek PBKDF2 DEMEYIN | `src/services/encryption.ts:109-114` |
| Kasada ekran goruntusu engeli | Var (kasa ekraninda ScreenCapture engelleniyor) | `src/screens/VaultScreen.tsx:226` |
| Ucretsiz plan tavanlari | 25 acik gorev ve not; 3 kasa kaydi; 10 istek listesi ogesi; 3 rutin/hatirlatici; ayda 10 gunluk yazisi; hizli eylemler sinirsiz | `src/services/premiumService.ts:460-475` |
| Tamamlanan gorev | Tavana sayilmaz | `src/services/premiumService.ts:448-458` |
| Veri silme | Mevcut veri asla silinmez/gizlenmez | `src/services/premiumService.ts:444-445` (yorum) ve `google-keep-alternative` yazisi |
| Deneme | 7 gun, her ozellik acik (fiyat yazilmaz) | `description.txt:46` |
| Yeni telefona gecis | Kullanicinin parolasiyla korunan tek yedek dosyasi | `description.txt:43` |
| Asistan motoru (olculen) | Kural + e5-small int8 (29,29 MB) + lojistik baslik (41 KB); 1.595 cumlelik mühürlü test: ilk seferde dogru yer %63,9 (yalniz kural %50,2); sessizce yanlis yere kayit %19,9 | `docs/ASISTAN-ANLAMA-PLANI.md:467, 914-926`; `docs/BEYIN-A-PLUS-PLANI.md:23`; blog: `a-phone-assistant-without-an-llm` |

## Dogrulanamadi / dikkat
- "Sesli girdi cihaz icinde" kosula bagli (telefon destegine); yazarken "yalnizca telefonun destegi varsa" denir (`description.txt:24`).
- Asistan dogruluk rakamlari test cumleleriyle olculdu, gercek kullanici verisiyle degil; bunu yazida belirt.
- Uygulama surumu, magaza puani, indirme sayisi: bu belgeye alinmadi.
- Yeni Beyin-A+ calismasi (git'te islenmemis degisiklikler) rakamlari degistirebilir; asistan rakamini yayindan once tekrar dogrula.
