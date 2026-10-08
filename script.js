(function () {
  var nav = document.querySelector('.nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Scroll progress + compact nav
  var bar = document.getElementById('progress');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + '%';
    nav.classList.toggle('small', h.scrollTop > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal
  var targets = document.querySelectorAll('.card, .feature, .mvv-item, .ph, .section-head, .contact-list li, .step, .svc-row, .mosaic img, .chips li, .img-frame, .trust-card, .ba-card');
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Quote form -> WhatsApp (contact page only)
  var form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form), ok = true;
      ['name', 'phone'].forEach(function (n) {
        var bad = !String(d.get(n) || '').trim();
        form.elements[n].classList.toggle('err', bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      var text = 'Hello St. Louis Auto Centre,\n' +
        'Name: ' + d.get('name') + '\n' +
        'Phone: ' + d.get('phone') + '\n' +
        'Service: ' + d.get('service') + '\n' +
        'Details: ' + (d.get('message') || '-');
      window.open('https://wa.me/254725452734?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  // Before/after sliders
  document.querySelectorAll('.ba').forEach(function (ba) {
    var range = ba.querySelector('.ba-range');
    var touched = false;
    function set(v) { ba.style.setProperty('--pos', v); }
    range.addEventListener('input', function () { touched = true; set(range.value); });
    ['pointerdown', 'keydown'].forEach(function (ev) { range.addEventListener(ev, function () { touched = true; }); });
    // Gentle demo sweep the first time the slider scrolls into view
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var seen = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        seen.disconnect();
        var start = null, dur = 2600;
        function step(t) {
          if (touched) return;
          if (start === null) start = t;
          var p = Math.min((t - start) / dur, 1);
          var v = 50 + Math.sin(p * Math.PI * 2) * 32 * (1 - p * 0.3);
          set(v); range.value = v;
          if (p < 1) requestAnimationFrame(step); else { set(50); range.value = 50; }
        }
        requestAnimationFrame(step);
      }, { threshold: 0.5 });
      seen.observe(ba);
    }
  });
})();
