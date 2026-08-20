/* ==========================================================================
   Tien Yan — Value chain tabs
   Figma frame 48:93 draws four labels with one highlighted and a single panel
   beneath. Built as a real ARIA tablist.

   Progressive enhancement: without JavaScript every panel is visible, stacked,
   each under its own heading — the content is all there, just not switchable.
   This file collapses them only once it can also reveal them again.

   Keyboard follows the APG tabs pattern: arrows move between tabs, Home/End
   jump to the ends, and only the selected tab is in the tab order.
   ========================================================================== */

(function () {
  'use strict';

  var lists = document.querySelectorAll('[data-tabs]');
  if (!lists.length) return;

  Array.prototype.forEach.call(lists, function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    var panels = tabs
      .map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    // A tab pointing at nothing is a dead control — bail rather than ship one.
    if (!tabs.length || panels.some(function (p) { return !p; })) return;

    document.documentElement.classList.add('js-tabs');

    function select(index, moveFocus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });

      tab.addEventListener('keydown', function (event) {
        var last = tabs.length - 1;
        var to = null;
        switch (event.key) {
          case 'ArrowRight': to = i === last ? 0 : i + 1; break;
          case 'ArrowLeft':  to = i === 0 ? last : i - 1; break;
          case 'Home':       to = 0; break;
          case 'End':        to = last; break;
          default: return;
        }
        event.preventDefault();
        select(to, true);
      });
    });

    // Start on whichever tab the markup marks selected, defaulting to the
    // first. The Figma has "Quality Assurance" active, which is the only one
    // with content written for it.
    var start = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
    select(start < 0 ? 0 : start, false);
  });
})();
