# Yayin oncesi kontrol listesi (CHECKLIST.md)

Kaynak: SEO-SURECI.md (kural numaralari parantezde) + seo/voice/ kurallari + sahip karari (marka yasagi). Hepsi isaretlenmeden yayinlanmaz.

## A. Karar ve kapsam
- [ ] Bir anahtar kelime = bir sayfa: ayni kelimeye acik baska yazi/taslak yok (5). `seo/research/keywords.csv` ve `OZET.md` ile cakisma kontrolu yapildi.
- [ ] Haftada tek yeni yazi; bu hafta baska yazi yayinlanmadi (8).
- [ ] Kisit sayfasiysa ("no account", "offline" gibi) uygulama o sarti gercekten karsiliyor; kodda/magaza metninde dogrulandi (3). Yoksa sayfa acilmaz.
- [ ] Sira: once satin alma niyeti (kategori-alternatif, karsilastirma), sonra kisit sayfasi, ozellik turu en son (1).

## B. MARKA KURALI (sahip karari, 2026-10-16)
- [ ] **Rakip uygulama adi yok: slug, baslik, govde, meta aciklama, alt metin (gorsel alt'i) icinde hicbiri.** "X alternative / X vs Y" biciminde sayfa yok; yerine kategori dili: "notes app without an account", "offline to-do app without sign-up".
- [ ] Gorsellerde (ekran goruntusu, kapak) rakip logosu/adi gorunmuyor; dosya adlarinda yok.
- [ ] Rakip bilgisi gerekiyorsa "cloud note apps that need an account" gibi genel ifade; resmi kaynak linki gerekiyorsa platform/kurum belgesi (devlet, standart kurumu, Apple/Google platform belgesi), uygulama yardim sayfasi degil.
- Kural KARARLASTI (sahip, 2026-10-16): rakip marka adi YASAK. Eski Google Keep yazisi `notes-app-no-account-offline` olarak kategori diliyle yeniden yazildi (eski adres vercel.json ile kalici yonlendirmeli); `seo-check` derlenmis HTML'de marka adini HATA sayar.

## C. Ozgun unsur ve dogruluk
- [ ] Yazida en az bir ozgun unsur var ve duruyor: gercek ekran goruntusu, kaynakli tablo, kontrol listesi veya kendi rakamimiz (4, 12). Duzenlemede kaybolmadi.
- [ ] Her ozellik cumlesi kodda veya magaza metninde dogrulandi; kaynak `seo/voice/stats.md` satirina baglandi.
- [ ] Fiyat yok. Puan yok. Odul yok. "En iyi" yok. Uydurma kullanici alintisi yok.
- [ ] Tabloda kaybettigimiz satirlar duruyor (2). Dogrulanamayan iddia yazilmadi.
- [ ] Sinirlar acik: bu yazida "ne yapmaz / kimler icin degil" bolumu var.
- [ ] Dis kaynak: 2-3 resmi kaynak (devlet, standart kurumu, akademik), her biri tarayicida acildi (200 dondu) ve cumle kaynakla uyusuyor. Olculmus rakamda yontem notu var.
- [ ] Asistan dogrulugu yaziliyorsa: rakam `docs/ASISTAN-ANLAMA-PLANI.md` guncel degeriyle ayni, test cumleleri gercek kullanici verisi degil notu var.

## D. Ses (voice.md)
- [ ] Kalip baslik ("A Calm, Private Way to Stay Organized") yok.
- [ ] Ilk paragraf okurun derdiyle basliyor, urunle degil.
- [ ] Tekil/cogul kisi tutarli; cumleler cogu 8-22 kelime; kalin yazi sparse; uzun tire ( — ) sinirli.
- [ ] Mizah en fazla 2-3 yerde, kuru, kimseyi kucultmuyor (humor.md).
- [ ] Yapay zeka vaadi yok; "kural tabanli + kucuk siniflandirici" dilinden sapilmadi.
- [ ] Yazi Ingilizce; bu klasordeki Turkce belgelerde sapkali a harfi yok (zeka, yine de).

## E. SEO teknik
- [ ] Baslik kismi <= ~50 karakter (site eki ile ~60) (6). Aciklama 140-160 karakter ve tiklatici.
- [ ] En az 5 gelen ic link: ilgili ESKI yazilardan, cumle icinde, hedef kelimeye benzer link metniyle, format `/blog/yazi-adi/` (7). Eski yazida degisiklik yalniz eklemedir ve `updatedDate:` bugunun tarihi (9).
- [ ] Yazidan en az 3 ic link cikiyor (ilgili rehberlere).
- [ ] Gorsel: `imageAlt` dolu, marka adi icermiyor; gorsel yolu `public/` altinda var.
- [ ] `draft: false` yapildi; ayni gun baska taslak acilmadi.
- [ ] `npm run build` temiz; `node scripts/seo-check.mjs` UYARI vermiyor (11).
- [ ] Yeni adres `dist/sitemap-0.xml` icinde.
- [ ] Silinen/kaldirilan yazi yok; 600 kelimeden uzun sayfa sahibi onayi olmadan kaldirilmadi (10).
- [ ] `seo/` klasoru yayinlanmaz (Astro yalniz `src/pages` ve `public/` yayinlar; `vercel.json` cikti dizini `dist`). `seo/` icine bir sey `public/` altina kopyalanmadi.

## F. Yayin sonrasi
- [ ] Search Console'da URL denetimi / indeks istegi.
- [ ] `seo/research/keywords.csv` icindeki hedef kelime satiri "yayinlandi: slug" olarak not dusuldu.
