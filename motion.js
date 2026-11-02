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
