/* Dil onceligi: adres yolu (/tr/) ya da ?lang=en|tr > kayitli secim (localStorage) > tarayici dili.
   Kok adreste tarayici dili Turkce olsa bile otomatik yonlendirme YOK; yalnizca kapatilabilir bant. */
(function () {
  var d = document.documentElement;
  var L = d.getAttribute('data-ui-lang') || 'en';
  var alt = { en: d.getAttribute('data-alt-en'), tr: d.getAttribute('data-alt-tr') };
  var KEY = 'u-lang';
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('[data-set-lang]') : null;
    if (a) set(KEY, a.getAttribute('data-set-lang'));
  });

  var m = location.search.match(/[?&]lang=(en|tr)(?:&|$)/);
  if (m) {
    var want = m[1];
    set(KEY, want);
    if (want !== L && alt[want]) { location.replace(alt[want] + location.hash); return; }
    try {
      var u = new URL(location.href);
      u.searchParams.delete('lang');
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    } catch (e) {}
    return;
  }

  var stored = get(KEY);
  if (L === 'en' && stored === 'tr' && d.getAttribute('data-pref') === '1' && alt.tr) {
    location.replace(alt.tr + location.hash);
    return;
  }

  // Bant: yalnizca Ingilizce sayfada, secim yokken ve tarayici dili Turkce ise.
  if (L === 'en' && !stored && alt.tr && /^tr\b/i.test(navigator.language || '') && get('u-lang-banner') !== 'off') {
    document.addEventListener('DOMContentLoaded', function () {
      var b = document.createElement('div');
      b.className = 'u-langbar';
      b.setAttribute('role', 'region');
      b.setAttribute('aria-label', 'Dil');
      b.style.cssText = 'position:fixed;z-index:70;left:12px;bottom:12px;max-width:min(340px,calc(100vw - 24px));display:flex;align-items:center;gap:6px;padding:6px 6px 6px 14px;border-radius:999px;background:#0f2a1f;color:#fff;font-weight:600;font-size:14px;line-height:1.2;box-shadow:0 10px 30px -10px rgba(0,0,0,.45)';
      var link = document.createElement('a');
      link.href = alt.tr;
      link.lang = 'tr';
      link.hreflang = 'tr';
      link.setAttribute('data-set-lang', 'tr');
      link.textContent = 'Türkçe sürüm →';
      link.style.cssText = 'color:#fff;padding:8px 4px;text-decoration:none';
      var x = document.createElement('button');
      x.type = 'button';
      x.setAttribute('aria-label', 'Kapat / Close');
      x.textContent = '×';
      x.style.cssText = 'width:36px;height:36px;border-radius:999px;color:#fff;font-size:20px;line-height:1;opacity:.8';
      x.addEventListener('click', function () { set('u-lang-banner', 'off'); b.remove(); });
      b.appendChild(link);
      b.appendChild(x);
      document.body.appendChild(b);
    });
  }
})();
