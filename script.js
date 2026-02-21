/**
 * EDITAR AQUI: número do WhatsApp (apenas dígitos, com DDI: 5511999999999)
 */
var WHATSAPP_NUMBER = '5511999999999';

(function () {
  var whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER;

  function setWhatsAppLinks() {
    document.querySelectorAll('.js-whatsapp').forEach(function (el) {
      el.href = whatsappUrl;
      if (el.getAttribute('aria-label')) return;
      el.setAttribute('aria-label', 'Abrir WhatsApp para agendar consulta');
    });
  }

  function smoothScroll() {
    var header = document.getElementById('header');
    var headerHeight = header ? header.offsetHeight : 0;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      var id = anchor.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
        var nav = document.querySelector('.nav');
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function activeSection() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    var header = document.getElementById('header');
    var headerHeight = header ? header.offsetHeight : 0;

    function updateActive() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;
      navLinks.forEach(function (link) { link.classList.remove('active'); });
      for (var i = sections.length - 1; i >= 0; i--) {
        var section = sections[i];
        var top = section.offsetTop - headerHeight;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollY >= top - 80 && scrollY < top + height - 80) {
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) link.classList.add('active');
          });
          break;
        }
      }
    }

    window.addEventListener('scroll', function () { requestAnimationFrame(updateActive); });
    window.addEventListener('load', updateActive);
    updateActive();
  }

  function menuToggle() {
    var btn = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  setWhatsAppLinks();
  smoothScroll();
  activeSection();
  menuToggle();
})();
