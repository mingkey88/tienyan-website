/* ==========================================================================
   Tien Yan — Header behaviour
   Sticky condense on scroll + mobile disclosure menu.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Header condenses once the page has moved -------------------------- */

  var header = document.querySelector('.site-header');
  if (header) {
    var condensed = false;
    var ticking = false;

    function update() {
      var shouldCondense = window.scrollY > 24;
      if (shouldCondense !== condensed) {
        condensed = shouldCondense;
        header.classList.toggle('is-condensed', condensed);
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ---- Mobile menu ------------------------------------------------------- */

  var toggle = document.querySelector('.nav-toggle');
  var panel = document.getElementById('mobile-nav');
  if (!toggle || !panel) return;

  // Desktop hides the panel with display:none, so its links leave the tab
  // order on their own. Below that width the panel is only collapsed to a
  // zero-height track, and `inert` is what actually keeps the five hidden
  // links out of the tab order and off the accessibility tree.
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
    toggle.querySelector('.nav-toggle__text').textContent = open ? 'Close' : 'Menu';
  }

  setOpen(false);

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Escape closes and returns focus to the toggle.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    setOpen(false);
    toggle.focus();
  });

  // Following a link closes the panel.
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Returning to desktop width resets state.
  var desktop = window.matchMedia('(min-width: 62rem)');
  function onBreakpoint(e) { if (e.matches) setOpen(false); }
  if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
})();
