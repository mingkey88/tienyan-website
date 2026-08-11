/* ==========================================================================
   Tien Yan — Enquiry form
   Client-side validation + Formspree submission.
   The form works without JS: it is a real POST to the action URL.
   JS upgrades it to inline validation and an in-page success state.
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submit = form.querySelector('[type="submit"]');
  var endpoint = form.getAttribute('action') || '';
  var configured = endpoint.indexOf('FORMSPREE_ID') === -1 && endpoint.indexOf('formspree.io') !== -1;

  /* ---- Validation -------------------------------------------------------- */

  function fieldOf(input) { return input.closest('.field'); }

  function messageFor(input) {
    if (input.validity.valueMissing) {
      return input.getAttribute('data-msg-required') || 'This field is required.';
    }
    if (input.validity.typeMismatch && input.type === 'email') {
      return 'Enter a valid email address, for example name@company.com';
    }
    if (input.validity.typeMismatch && input.type === 'url') {
      return 'Enter a full address, starting with https://';
    }
    return input.validationMessage || 'Check this field.';
  }

  function validate(input) {
    var field = fieldOf(input);
    if (!field) return true;

    var errorEl = field.querySelector('.field__error');
    var ok = input.checkValidity();

    field.setAttribute('data-invalid', String(!ok));
    input.setAttribute('aria-invalid', String(!ok));
    if (errorEl) errorEl.textContent = ok ? '' : messageFor(input);

    return ok;
  }

  var inputs = form.querySelectorAll('input[required], select[required], textarea[required], input[type="email"], input[type="url"]');

  Array.prototype.forEach.call(inputs, function (input) {
    // Validate on blur, then live-correct once the field has been marked bad.
    input.addEventListener('blur', function () { validate(input); });
    input.addEventListener('input', function () {
      var field = fieldOf(input);
      if (field && field.getAttribute('data-invalid') === 'true') validate(input);
    });
  });

  /* ---- Submission -------------------------------------------------------- */

  function show(kind, message) {
    if (!status) return;
    status.className = 'form__status is-visible form__status--' + kind;
    status.textContent = message;
    status.setAttribute('role', kind === 'err' ? 'alert' : 'status');
  }

  form.addEventListener('submit', function (e) {
    // Validate everything, focus the first problem.
    var firstBad = null;
    Array.prototype.forEach.call(inputs, function (input) {
      if (!validate(input) && !firstBad) firstBad = input;
    });

    if (firstBad) {
      e.preventDefault();
      show('err', 'Some details need checking before this can be sent.');
      firstBad.focus();
      return;
    }

    // Until a Formspree endpoint is provisioned, do not pretend to send.
    if (!configured) {
      e.preventDefault();
      show('err', 'This form is not connected yet. Please email info@tienyan.com and we will respond directly.');
      return;
    }

    e.preventDefault();
    submit.disabled = true;
    submit.textContent = 'Sending…';

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        show('ok', 'Thank you — your enquiry has been sent. Lena Thean will be in touch shortly.');
        submit.textContent = 'Sent';
      })
      .catch(function () {
        show('err', 'That did not send. Please email info@tienyan.com and we will respond directly.');
        submit.disabled = false;
        submit.textContent = 'Send enquiry';
      });
  });
})();
