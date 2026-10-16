# Birlestirme tablosu (CONSOLIDATION.md)

Tarih: 2026-10-16. Hazirlayan: SEO teknik ajan. Sahip onayi: "uyari ve onerileri uygula" (2026-10-16).
Bu tablo icerik ajaninin girdisidir. Bu ajan yazilari YENIDEN YAZMADI, SILMEDI, YONLENDIRMEDI.

Kurallar:
- 600 kelime ve uzeri hicbir yazi yonlendirilmez ya da kaldirilmaz (tablodaki tum `redirect_slugs` 600 kelimenin altinda; sayim: govde, kod ve link adresi haric).
- Bir anahtar kelime = bir sayfa. Ayni kumede tek sayfa kalir, digerleri 301/308 ile ona gider (`vercel.json` -> `redirects`, `permanent: true`).
- Yonlendirilen yazinin dosyasi kaldirilmadan once ona verilen ic linkler hedef slug'a cevrilir; sonra `npm run build && node scripts/seo-check.mjs`.
- `keep_slug` sablon yaziysa ("A Calm, Private Way to Stay Organized") tamamen yeniden yazilir: yeni baslik, `keyword:`, `updatedDate:`, SSS 4-8 soru, 2-3 resmi kaynak, rakip marka adi YOK, fiyat YOK, "best" YOK.
- `unutma-feature-*` yazilarinda uretici komut metni yayinda ("This is a Sunday FEATURE SPOTLIGHT... Tone: warm, expert"). Bunlar elle yazilmis ozellik yazilarina yonlendirilir; once bunlar yapilmali.
- `incoming_links_today` = keep_slug'a bugun baska yazilarin govdesinden gelen link sayisi (2026-10-16 olcumu). Hedef >= 5.
- Hacim verisi: bilinmiyor (bkz. `OZET.md`).

## Makine-okunur tablo

| keep_slug | redirect_slugs | target_keyword | unique_element_to_add | incoming_links_today |
|---|---|---|---|---|
| unutma-routines-calendar-widgets-time | unutma-feature-hatirlaticilar, unutma-feature-rutinler, unutma-feature-widgetlar | reminders app that works offline | Pil optimizasyonu altinda bildirim testi kontrol listesi + gercek ekran goruntusu (hatirlatici ve widget) | 2 |
| unutma-lists-todo-shopping-wishlist-workflow | unutma-feature-yapilacaklar, unutma-feature-istek-listesi | to-do, shopping and wishlist in one app | Ucretsiz plan sinir tablosu (25 acik yapilacak, 10 istek) + Listeler ekran goruntusu | 1 |
| unutma-journal-mood-voice-reflection | unutma-feature-gunluk | private journal app with mood tracking | Sifrelemenin neyi korudugu/korumadigi tablosu (AES-256, anahtar cihazda; acik telefonu korumaz) | 2 |
| unutma-economy-expenses-budgets-assets | unutma-feature-ekonomi-takibi | expense tracker without bank linking | "spent 40 on gas" cumlesinin onay ekrani goruntusu + elle girisin durust maliyeti listesi | 4 |
| unutma-vault-passwords-face-id-privacy | unutma-feature-sifre-kasasi, how-to-manage-passwords-without-cloud | offline password vault app | Kayip telefon senaryosu kontrol listesi + ayri kasa yedegi adimlari; PIN icin "key stretching (10,000 rounds of SHA-256)" ifadesi, PBKDF2 YAZILMAZ | 3 |
| unutma-quick-actions-streaks-heatmap-statistics | unutma-feature-hizli-eylemler | did I lock the door app | "Kapiyi kilitledim mi" tek dokunus kaydi ekran goruntusu + gunluk kontrol listesi | 2 |
| why-you-should-use-offline-apps | best-apps-that-work-without-internet, unutma-feature-offline-kullanim | apps that work offline | Ucak modu + yeniden baslatma testi (5 adim) ve hangi ozelligin cevrimdisi calistigi tablosu | 0 |
| keep-your-data-safe-on-your-phone | why-cloud-apps-are-risky-for-personal-data, privacy-first-productivity-apps | keep personal data on your phone | "Verin nerede?" ekran goruntusu + resmi kaynakli telefon guvenligi kontrol listesi (NCSC, NIST) | 0 |
| how-to-start-a-digital-journal | benefits-of-daily-journaling | how to start a digital journal | 7 gunluk baslangic plani (mood dokunusu da giris sayilir) + arastirma kaynagi notu | 0 |
| journaling-prompts-for-self-improvement | gratitude-journal-ideas | journaling prompts for self-improvement | Kendi yazdigimiz 30 soruluk liste (sukran bolumu dahil), indirilebilir degil, sayfada | 0 |
| simple-budgeting-tips-for-beginners | best-personal-finance-habits | budgeting tips for beginners | Ilk ay butce kontrol listesi + CFPB aylik butce formuna resmi atif | 0 |
| 50-30-20-budget-rule-explained | (yok) | 50/30/20 budget rule | Ornek gelirle hesaplanmis tablo (kur/para birimi simgesi olmadan, oranla) | 0 |
| how-to-track-personal-expenses | how-to-save-money-with-expense-tracking | how to track personal expenses | 30 gunluk harcama kaydi deneyi sablonu (tablo) | 0 |
| how-to-set-and-track-goals | how-to-prioritize-your-goals, vision-board-alternative-digital | how to set and track goals | Hedef-alt gorev-rutin donusum tablosu + haftalik gozden gecirme listesi | 0 |
| how-to-build-habits-that-stick | (yok) | how to build habits that stick | "Kacirilan gun seriyi silmez" mantigi ve aliskanlik kurulum kontrol listesi | 1 |
| how-to-build-a-morning-routine | evening-routine-for-productivity | morning and evening routine | Sabah + aksam rutini sablonu (iki sutunlu tablo) | 0 |
| weekly-planning-tips | daily-planner-tips-for-busy-people | weekly planning tips | 20 dakikalik haftalik planlama adimlari (kontrol listesi) | 2 |
| how-to-organize-your-life | personal-organization-tips-2026, digital-minimalism-tips, mindfulness-and-organization | how to organize your life | "Kac uygulamaya dagilmissin" envanter tablosu (not, liste, takvim, sifre, harcama) | 0 |
| how-to-stop-forgetting-things | (yok) | how to stop forgetting things | Unutma noktalari kontrol listesi (anahtar, ilac, kapi, randevu) + yakala-gozden gecir dongusu | 0 |
| todo-list-app-no-account-offline | best-offline-todo-app | to-do list app with no account | (var: 5 dakikalik test + tablolar). Yonlendirme ancak bu yazi YAYINA CIKTIKTAN sonra (taslak, 17 Ekim plani) | 0 |

## Tabloda olmayanlar (dokunulmaz)

- 600+ kelime: unutma-app-complete-feature-guide, unutma-quick-actions-streaks-heatmap-statistics, unutma-lists-todo-shopping-wishlist-workflow, unutma-vault-passwords-face-id-privacy, unutma-economy-expenses-budgets-assets, unutma-journal-mood-voice-reflection, beyond-the-todo-list-the-forgot-check-loop, unutma-app-showcase-complete-guide, unutma-voice-commands-hands-free-organizing, move-unutma-to-a-new-phone, a-phone-assistant-without-an-llm, notes-app-no-account-offline.
- Elle yazilmis, kisa ama ozgun: unutma-routines-calendar-widgets-time (535), unutma-themes-games-languages-backup (590), our-story-we-want-your-feedback (371).
- welcome-to-unutma-blog (147 kelime, 40 gelen link: sablon yazilarin CTA'si buraya bagliyor). Sablonlar yonlendirilince gelen link sayisi duser; ileride /about/ ile birlestirme sahibine sorulacak.
- Akademik iki yazi (SEO-SURECI "sonra gozden gecirilecek"): free-academic-research-tools-for-students, how-to-organize-a-literature-review-without-getting-lost. Karar Search Console verisi birikince sahibinin.

## OZET.md ile cakisma notu

- OZET.md oneri 1 (`notes-app-without-an-account`) artik `notes-app-no-account-offline` tarafindan karsilaniyor (eski Google Keep yazisi marka kuralina gore 2026-10-16'da yeniden yazildi ve adresi degisti). Ikinci sayfa ACILMAMALI.
- OZET.md oneri 2 (`private-journal-app-no-account`) acilacaksa yukaridaki gunluk kumesi (`how-to-start-a-digital-journal`, `unutma-journal-mood-voice-reflection`) ile kelime ayrimi netlestirilmeli: "private journal app" (uygulama secimi) ayri, "how to start a digital journal" (nasil yapilir) ayri.
- OZET.md oneri 3 (`expense-tracker-no-bank-linking`) ile `unutma-economy-expenses-budgets-assets` ayni kelimeyi hedefliyor. Ya yeni sayfa acilmaz ya da ekonomi yazisinin hedefi "budget app features" olarak daraltilir. Karar icerik ajaninda/sahipte.
