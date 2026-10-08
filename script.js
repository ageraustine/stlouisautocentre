(function () {
  // Mobile menu
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  // Scroll progress bar
  var bar = document.getElementById('progress');
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal
  var targets = document.querySelectorAll('.card, .feature, .mvv-item, .ph, .section-head, .contact-list li');
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

  // Quote form -> WhatsApp
  var form = document.getElementById('quoteForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var ok = true;
    ['name', 'phone'].forEach(function (n) {
      var f = form.elements[n];
      var bad = !String(d.get(n) || '').trim();
      f.classList.toggle('err', bad);
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
})();
