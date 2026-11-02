// Presentation effects only. Page content remains usable without this file.
(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  var elements = document.querySelectorAll('main > *, main section > *, footer');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach(function (element) {
      element.classList.add('motion-reveal');
      observer.observe(element);
    });

    reducedMotion.addEventListener('change', function (event) {
      if (event.matches) {
        observer.disconnect();
        elements.forEach(function (element) {
          element.classList.add('is-visible');
        });
      }
    });
  }

  // A visible navigation transition, including browsers without View Transitions.
  document.body.classList.add('page-enter');
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.target || link.hasAttribute('download')) return;
    var destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname) return;
    event.preventDefault();
    if (document.body.classList.contains('page-leaving')) return;
    document.body.classList.add('page-leaving');
    window.setTimeout(function () {
      window.location.assign(destination.href);
    }, 300);
  });
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('page-leaving');
  });

  var cover = document.querySelector('body[data-page="home"] .main-menu');
  if (!cover || !window.matchMedia('(pointer: fine)').matches) return;
  var frame = null;
  cover.addEventListener('pointermove', function (event) {
    if (frame || reducedMotion.matches) return;
    frame = requestAnimationFrame(function () {
      var box = cover.getBoundingClientRect();
      cover.style.setProperty('--pointer-x', ((event.clientX - box.left) / box.width * 100) + '%');
      cover.style.setProperty('--pointer-y', ((event.clientY - box.top) / box.height * 100) + '%');
      frame = null;
    });
  });
})();
