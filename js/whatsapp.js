/* ==========================================================================
   Tien Yan — WhatsApp floating action

   TO GO LIVE: replace WHATSAPP_NUMBER in the data-wa-number attribute on
   every page with the number in international format, digits only and no
   plus sign or spaces — e.g. data-wa-number="6598007226".

   Until then the button stays hidden. +65 9800 7226 is currently withheld
   sitewide pending sign-off (see the commented Contact No. block in
   contact.html), and shipping a dead wa.me link would be worse than
   shipping nothing.
   ========================================================================== */

(function () {
  'use strict';

  var fab = document.querySelector('.wa-fab');
  if (!fab) return;

  var raw = fab.getAttribute('data-wa-number') || '';
  var digits = raw.replace(/\D/g, '');

  // A real international number is 8–15 digits (ITU E.164). The placeholder
  // reduces to nothing, so this rejects it without special-casing the string.
  var configured = digits.length >= 8 && digits.length <= 15;

  if (!configured) {
    fab.remove();
    return;
  }

  var text = fab.getAttribute('data-wa-text') || '';
  fab.href = 'https://wa.me/' + digits +
             (text ? '?text=' + encodeURIComponent(text) : '');
  fab.hidden = false;
})();
