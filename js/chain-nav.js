/* ==========================================================================
   Tien Yan — Value chain in-page navigation
   The Partnership frame draws four labels with one highlighted. The panels
   are stacked down the page rather than tabbed, so the highlight tracks
   which panel you are actually looking at.

   Progressive enhancement, same contract as js/reveal.js: the links are plain
   anchors and work with JavaScript off. This file only adds the highlight.
   ========================================================================== */

(function () {
  'use strict';

  var nav = document.querySelector('.chain__nav');
  if (!nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll('.chain__nav-link'));
  if (!links.length) return;

  var panels = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if (panels.length !== links.length) return;

  if (!('IntersectionObserver' in window)) {
    // No observer: mark the first, which is how the frame draws it at rest.
    links[0].setAttribute('aria-current', 'true');
    return;
  }

  function setCurrent(index) {
    links.forEach(function (a, i) {
      if (i === index) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  setCurrent(0);

  /* Track the panel nearest the top of the viewport rather than the first one
     merely intersecting — with 480px panels on a tall screen two are visible
     at once, and "first intersecting" would flip to the next panel while most
     of the previous one is still on screen. */
  var visible = {};

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var i = panels.indexOf(entry.target);
      if (i < 0) return;
      if (entry.isIntersecting) visible[i] = entry.boundingClientRect.top;
      else delete visible[i];
    });

    var keys = Object.keys(visible);
    if (!keys.length) return;

    var best = keys.reduce(function (a, b) {
      return Math.abs(visible[a]) <= Math.abs(visible[b]) ? a : b;
    });
    setCurrent(Number(best));
  }, { rootMargin: '-20% 0px -40% 0px', threshold: 0 });

  panels.forEach(function (p) { observer.observe(p); });
})();
