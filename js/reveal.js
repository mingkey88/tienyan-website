/* ==========================================================================
   Tien Yan — Scroll reveals
   IntersectionObserver only. No dependencies.
   Every effect here has a native Webflow Interactions equivalent, so the
   migration is a rebuild in their panel rather than a port of this file.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // If the browser can't observe, reveal everything immediately and stop.
  if (!('IntersectionObserver' in window)) {
    root.classList.remove('js-reveal');
    return;
  }

  /* ---- Generic reveals -------------------------------------------------- */

  var revealables = document.querySelectorAll('[data-reveal], .process__rail');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, {
    // Fire slightly before the element reaches the fold so the motion reads
    // as the page settling, not as a delayed load.
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.08
  });

  revealables.forEach(function (el) { observer.observe(el); });

  /* ---- Count-up on real figures ----------------------------------------
     Only integers, and only values already present in the markup, so the
     page degrades to the correct number with JS off.
     ---------------------------------------------------------------------- */

  var counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10);
    if (isNaN(target)) return;

    if (reduced.matches) { el.textContent = String(target); return; }

    var duration = 1400;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      runCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(function (el) { countObserver.observe(el); });
})();
