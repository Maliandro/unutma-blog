/*
 * Gercek ekran telefonlari (RealPhone.astro) icin GSAP motoru.
 * Adimlar data-steps icinde: ["show",id,n] ["type",id,metin,sure] ["band",id,i]
 * ["xfade",from,to,n] ["tap",id] ["mask",id] ["unmask",id,i] ["pulse",id,sure]
 * ["stagger",id] ["wait",s] ["out"]
 * Yalniz transform/opacity. Ekrandayken oynar, cikinca durur. Hareket azaltildiysa hic calismaz
 * (CSS son kareyi gosterir).
 */
(function () {
  function start() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (ST) gsap.registerPlugin(ST);
    document.documentElement.classList.add('js-rp');

    function qa(root, s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }

    function build(root) {
      var steps = JSON.parse(root.getAttribute('data-steps') || '[]');
      var tap = root.querySelector('[data-tap]');
      var layers = {};
      qa(root, '[data-ly]').forEach(function (el) {
        layers[el.getAttribute('data-ly')] = {
          el: el,
          kind: el.getAttribute('data-kind'),
          hb: +el.getAttribute('data-hb'),
          ib: +el.getAttribute('data-ib'),
          box: el.querySelector('.rp__box'),
          feed: el.querySelector('[data-feed]'),
          bands: qa(el, '[data-band]'),
          inp: el.querySelector('[data-in]'),
          masks: qa(el, '[data-mask]'),
          orb: el.querySelector('[data-orb]'),
          tapxy: (el.querySelector('[data-tapxy]') || { getAttribute: function () { return null; } }).getAttribute('data-tapxy'),
        };
      });
      var all = Object.keys(layers).map(function (k) { return layers[k].el; });

      // Sohbet akisi: i. bant kutunun altina gelecek kadar kaydir.
      function shift(L, i) {
        if (L.kind !== 'chat' || i < 0) return 0;
        // Son bant gercek ekrandaki yerindeyken kayma 0 olur (son kare = gercek ekran).
        var y1 = +L.bands[i].getAttribute('data-y1');
        var yLast = +L.bands[L.bands.length - 1].getAttribute('data-y1');
        return L.box.offsetHeight * (yLast - y1) / (L.ib - L.hb);
      }
      function setVisible(tl, L, n) {
        if (!L.bands.length) return;
        tl.set(L.bands, { autoAlpha: function (i) { return i < n ? 1 : 0; }, y: 0 });
        if (L.feed) tl.set(L.feed, { y: function () { return shift(L, n - 1); } });
      }
      function tapAt(tl, x, y) {
        tl.set(tap, { left: x * 100 + '%', top: y * 100 + '%' })
          .fromTo(tap, { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: false })
          .to(tap, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
          .to(tap, { autoAlpha: 0, scale: 1.8, duration: 0.35 });
      }

      var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.3, defaults: { ease: 'power2.out' } });
      steps.forEach(function (s) {
        var L = layers[s[1]];
        switch (s[0]) {
          case 'show':
            tl.set(all, { autoAlpha: 0 }).set(L.el, { autoAlpha: 1 });
            setVisible(tl, L, s[2] || 0);
            if (L.inp) tl.set(L.inp, { autoAlpha: 0 });
            if (L.masks.length) tl.set(L.masks, { autoAlpha: 0 });
            break;
          case 'type': {
            var out = L.inp.querySelector('[data-typed]'), text = s[2], st = { n: 0 };
            tl.call(function () { out.textContent = ''; L.inp.classList.remove('is-long'); })
              .set(L.inp, { autoAlpha: 1 })
              .to(st, {
                n: text.length, duration: s[3] || 1.4, ease: 'none',
                onStart: function () { st.n = 0; },
                onUpdate: function () {
                  out.textContent = text.slice(0, Math.round(st.n));
                  if (out.offsetWidth > L.inp.clientWidth) L.inp.classList.add('is-long');
                },
              }, '+=0.2')
              .set(L.inp, { autoAlpha: 0 }, '+=0.35');
            break;
          }
          case 'band': {
            var b = L.bands[s[2]];
            if (L.feed && L.kind === 'chat') tl.to(L.feed, { y: function () { return shift(L, s[2]); }, duration: 0.45 }, '+=0.15');
            tl.fromTo(b, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)', immediateRender: false }, L.kind === 'chat' ? '<' : '+=0.15');
            break;
          }
          case 'xfade': {
            var to = layers[s[2]];
            setVisible(tl, to, s[3] || 0);
            if (to.inp) tl.set(to.inp, { autoAlpha: 0 });
            tl.to(L.el, { autoAlpha: 0, duration: 0.35 }, '+=0.1').fromTo(to.el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, immediateRender: false }, '<');
            break;
          }
          case 'tap': {
            var xy = L.tapxy.split(',');
            tapAt(tl, +xy[0], +xy[1]);
            break;
          }
          case 'mask':
            tl.set(L.masks, { autoAlpha: 1 });
            break;
          case 'unmask': {
            var m = L.masks[s[2]];
            tapAt(tl, +m.getAttribute('data-tx'), +m.getAttribute('data-ty'));
            tl.to(m, { autoAlpha: 0, duration: 0.3 }, '-=0.45');
            break;
          }
          case 'pulse':
            tl.set(L.orb, { autoAlpha: 1, scale: 1 })
              .to(L.orb, { scale: 1.08, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: Math.max(1, Math.round((s[2] || 2.4) / 0.45)) | 1 })
              .set(L.orb, { autoAlpha: 0, scale: 1 });
            break;
          case 'stagger':
            tl.fromTo(L.bands, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16, immediateRender: false }, '+=0.2');
            break;
          case 'wait':
            tl.to({}, { duration: s[1] });
            break;
          case 'out':
            tl.to(all, { autoAlpha: 0, duration: 0.45, ease: 'power1.in' });
            break;
        }
      });
      return tl;
    }

    qa(document, '[data-rp]').forEach(function (root) {
      var tl = build(root);
      root.__tl = tl;
      if (ST) {
        ST.create({
          trigger: root, start: 'top 90%', end: 'bottom 5%',
          onToggle: function (self) { self.isActive ? tl.play() : tl.pause(); },
          onRefresh: function () { tl.invalidate(); },
        });
      } else tl.play();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
