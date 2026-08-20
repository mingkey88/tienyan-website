/* ==========================================================================
   Tien Yan — Product card disclosure
   The "+" on each card in the Figma frame (66:250) has no stated behaviour.
   Built as a disclosure: it expands grade detail in place rather than
   navigating away, so a buyer comparing three grades never loses the
   comparison. No dependencies.

   Progressive enhancement, same contract as js/reveal.js: the detail panel is
   visible and the toggle is hidden until this file proves it can operate them.
   With JS off, every card shows its full detail and no dead control ships.

   Wix Studio note: this maps to a native Wix "toggle/accordion" interaction on
   a repeater item. It does not need to be ported as custom code.
   ========================================================================== */

(function () {
  'use strict';

  var cards = document.querySelectorAll('.product-card');
  if (!cards.length) return;

  /* ---- Behaviour switch -------------------------------------------------
     false — cards open independently. A buyer can hold two grades open and
             compare them side by side.
     true  — accordion. Opening one closes the others, keeping the row a
             predictable height and the page from reflowing under the cursor.

     Independent is the default: the section exists to be compared, and the
     row is only three cards wide, so the reflow cost is small.
     ---------------------------------------------------------------------- */
  var EXCLUSIVE = false;

  // Only now that we know the script runs do we let CSS collapse the panels.
  document.documentElement.classList.add('js-cards');

  var toggles = [];

  function close(toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', 'false');
    if (panel) panel.removeAttribute('data-open');
  }

  function open(toggle) {
    var panel = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', 'true');
    if (panel) panel.setAttribute('data-open', '');
  }

  cards.forEach(function (card) {
    var toggle = card.querySelector('.product-card__toggle');
    var panel  = toggle && document.getElementById(toggle.getAttribute('aria-controls'));

    // A toggle with nothing to control is a dead control. Remove it.
    if (!toggle || !panel) {
      if (toggle) toggle.remove();
      return;
    }

    toggles.push(toggle);
    close(toggle);

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';

      if (EXCLUSIVE && !isOpen) {
        toggles.forEach(function (other) {
          if (other !== toggle) close(other);
        });
      }

      if (isOpen) { close(toggle); } else { open(toggle); }
    });
  });

  /* Escape closes the card the focus is inside — expected of any disclosure
     that changes the height of the thing you are reading. */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var active = document.activeElement;
    if (!active) return;

    var card = active.closest ? active.closest('.product-card') : null;
    if (!card) return;

    var toggle = card.querySelector('.product-card__toggle');
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      close(toggle);
      toggle.focus();
    }
  });
})();
