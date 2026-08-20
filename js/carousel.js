/* ==========================================================================
   Tien Yan — Certificate carousel
   The Figma draws bare "<" and ">" glyphs either side of one certificate
   (frame 48:96). Built over a natively scrollable row, so the whole set is
   reachable by touch, trackpad, keyboard and screen reader whether or not
   this file runs.

   Progressive enhancement, same contract as reveal.js and product-card.js:
   without JavaScript the viewport is an ordinary horizontal scroller with
   every certificate present, and the controls stay hidden rather than
   shipping as dead buttons.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.querySelector('.pt-carousel');
  if (!root) return;

  var viewport = root.querySelector('.pt-carousel__viewport');
  var slides   = Array.prototype.slice.call(root.querySelectorAll('.pt-slide'));
  var prev     = root.querySelector('[data-carousel="prev"]');
  var next     = root.querySelector('[data-carousel="next"]');
  var count    = root.querySelector('.pt-carousel__count');

  // Any missing part means the controls cannot be driven honestly. Leave the
  // plain scroller in place.
  if (!viewport || !prev || !next || slides.length < 2) return;

  document.documentElement.classList.add('js-carousel');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function current() {
    var max = viewport.scrollWidth - viewport.clientWidth;

    // Clamp at both ends first. "Nearest to the viewport centre" is the right
    // measure mid-scroll, but not at rest: when scrollLeft is 0 the viewport
    // holds two or three slides and its centre falls nearer the SECOND one,
    // so the carousel would open reporting "2 / 9" with Previous enabled.
    if (viewport.scrollLeft <= 1) return 0;
    if (viewport.scrollLeft >= max - 1) return slides.length - 1;

    var mid = viewport.scrollLeft + viewport.clientWidth / 2;
    var best = 0;
    var bestGap = Infinity;
    slides.forEach(function (slide, i) {
      var c = slide.offsetLeft + slide.offsetWidth / 2;
      var gap = Math.abs(c - mid);
      if (gap < bestGap) { bestGap = gap; best = i; }
    });
    return best;
  }

  function go(index) {
    var i = Math.max(0, Math.min(slides.length - 1, index));
    var slide = slides[i];
    var left = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    viewport.scrollTo({
      left: left,
      behavior: reduced.matches ? 'auto' : 'smooth'
    });
  }

  function sync() {
    var i = current();
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    if (count) count.textContent = (i + 1) + ' / ' + slides.length;
    // Deliberately no aria-hidden on the off-screen slides: the viewport stays
    // scrollable, so every certificate is still reachable. Hiding reachable
    // content from assistive tech would be a regression, not an enhancement.
  }

  prev.addEventListener('click', function () { go(current() - 1); });
  next.addEventListener('click', function () { go(current() + 1); });

  var frame = null;
  viewport.addEventListener('scroll', function () {
    if (frame) return;
    frame = requestAnimationFrame(function () { frame = null; sync(); });
  }, { passive: true });

  window.addEventListener('resize', sync);
  sync();
})();
