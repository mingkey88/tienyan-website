/* ==========================================================================
   Tien Yan — Certificate carousel and type filter
   Figma frame 48:96 draws five type chips with one active, and one large
   certificate between bare "<" and ">" glyphs. The client confirmed on
   21 Aug 2026 that clicking a type should show that type's certificates, and
   that the row should hold up to three at a time.

   Progressive enhancement, same contract as reveal.js and tabs.js:
     · Without JavaScript the viewport is an ordinary horizontal scroller with
       every certificate present, the arrows stay hidden, and the type chips
       stay a plain list of the certifications held — true and useful, but not
       pretending to be controls.
     · This file promotes the list items to buttons only once it can filter,
       and reveals the arrows only once it can drive the viewport.

   Not every certificate is assigned a type. Five of the ten name their own
   category; the rest need the client to say which they belong to (Q27), and
   guessing which regulatory document counts as "China Export Registration"
   would put a compliance claim on the page that nobody made. Unassigned
   documents appear under "All certifications" and nowhere else.
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
  var shown = slides.slice();          // the slides the arrows currently page over

  /* ---- Filtering ------------------------------------------------------- */

  var list   = document.querySelector('[data-cert-filters]');
  var status = document.querySelector('[data-cert-status]');

  function categoriesOf(slide) {
    return (slide.getAttribute('data-cert-cats') || '').split(/\s+/).filter(Boolean);
  }

  function applyFilter(key, label) {
    slides.forEach(function (slide) {
      slide.hidden = key !== 'all' && categoriesOf(slide).indexOf(key) < 0;
    });
    shown = slides.filter(function (s) { return !s.hidden; });

    viewport.scrollTo({ left: 0, behavior: 'auto' });

    if (status) {
      var n = shown.length;
      status.textContent = key === 'all'
        ? n + ' certification' + (n === 1 ? '' : 's')
        : n + ' certification' + (n === 1 ? '' : 's') + ' under ' + label;
    }
    sync();
  }

  if (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll('[data-cert-filter]'));

    if (items.length) {
      // "All" is only meaningful once filtering exists, so it is added here
      // rather than shipped in the markup.
      var allItem = document.createElement('li');
      allItem.setAttribute('data-cert-filter', 'all');
      allItem.textContent = 'All certifications';
      list.insertBefore(allItem, list.firstChild);
      items.unshift(allItem);

      var buttons = items.map(function (item) {
        var key = item.getAttribute('data-cert-filter');
        var label = item.textContent.trim();
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'pt-chip';
        button.textContent = label;
        button.setAttribute('data-cert-filter', key);
        button.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
        item.textContent = '';
        item.appendChild(button);
        return button;
      });

      list.setAttribute('role', 'group');
      list.setAttribute('aria-label', 'Filter certifications by type');
      document.documentElement.classList.add('js-cert-filter');

      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          buttons.forEach(function (b) {
            b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
          });
          applyFilter(button.getAttribute('data-cert-filter'), button.textContent.trim());
        });
      });

      // State the resting count too, not only what changes after a click.
      if (status) {
        status.textContent = slides.length + ' certifications';
      }
    }
  }

  /* ---- Carousel -------------------------------------------------------- */

  // Measure within the scroller, independent of the page/container inset.
  function leftOf(slide) {
    return slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
  }

  function current() {
    var best = 0;
    var bestGap = Infinity;
    shown.forEach(function (slide, i) {
      var gap = Math.abs(leftOf(slide) - viewport.scrollLeft);
      if (gap < bestGap) { bestGap = gap; best = i; }
    });
    return best;
  }

  function go(index) {
    if (!shown.length) return;
    var i = Math.max(0, Math.min(shown.length - 1, index));
    viewport.scrollTo({ left: leftOf(shown[i]), behavior: reduced.matches ? 'auto' : 'smooth' });
  }

  function sync() {
    // Several slides can be visible, so the end is the scroll boundary,
    // not the index of the last certificate. The count names the leading slide.
    var max = viewport.scrollWidth - viewport.clientWidth;
    var atStart = viewport.scrollLeft <= 1;
    var atEnd = viewport.scrollLeft >= max - 1 || max <= 1;

    prev.disabled = atStart;
    next.disabled = atEnd;

    if (count) {
      count.textContent = shown.length
        ? (current() + 1) + ' / ' + shown.length
        : '0';
    }
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
