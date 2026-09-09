/* ==========================================================================
   Tien Yan — Motion
   GSAP + ScrollTrigger, with Lenis carrying the scroll.

   Replaces js/reveal.js. Same authored idea, driven properly: elements settle
   into place the way a sheet of paper settles onto a desk, and the two
   hairlines that mark a sequence fill as the visitor scrolls it rather than on
   a timer of their own.

   THE SAFETY INVERSION
   Content is visible by default. The `.js-reveal` class that hides revealable
   elements is added by an inline guard in each page's <head>, and only once
   GSAP and ScrollTrigger have both defined their globals. If cdnjs is blocked,
   slow, or serving something that fails its integrity hash, the class is never
   added and the page renders complete and static. That guard also arms a
   watchdog which removes the class if this file has not set
   `data-motion-ready` shortly after — so an exception in here cannot leave a
   page blank either. Every early return below therefore ends in reveal().

   VALUES
   Nothing is timed here. Durations, distances, easings and drifts are read out
   of the computed root style, which is tokens.css. Change a value there and
   the built animation changes with it.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* Un-hide everything and stand down. Called on every path that will not
     animate: no GSAP, reduced motion, or an unrecoverable state. */
  function standDown() {
    root.classList.remove('js-reveal');
    root.setAttribute('data-motion-ready', 'static');
  }

  if (!window.gsap || !window.ScrollTrigger) { standDown(); return; }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  /* ---- prefers-reduced-motion ------------------------------------------
     A full collapse: no smooth scroll, no scrub, no parallax, no reveal.
     Removing the class is the collapse — every element is already in its
     final state underneath it. motion.css repeats this with !important for
     the transitions declared elsewhere in the site. */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) { standDown(); return; }

  /* ======================================================================
     Tokens
     ====================================================================== */

  var cs = getComputedStyle(root);

  function token(name) { return cs.getPropertyValue(name).trim(); }

  /* ms or s in, seconds out — GSAP counts in seconds. */
  function seconds(name, fallback) {
    var v = token(name);
    if (!v) return fallback;
    var n = parseFloat(v);
    if (isNaN(n)) return fallback;
    return v.indexOf('ms') > -1 ? n / 1000 : n;
  }

  function number(name, fallback) {
    var n = parseFloat(token(name));
    return isNaN(n) ? fallback : n;
  }

  /* A cubic-bezier() token becomes a GSAP ease function. Four control-point
     numbers and a Newton solve — cheaper than loading CustomEase for it, and
     it keeps the brand curve in tokens.css rather than transcribed here. */
  function ease(name, fallback) {
    var m = /cubic-bezier\(([^)]+)\)/.exec(token(name));
    if (!m) return fallback;
    var p = m[1].split(',').map(parseFloat);
    if (p.length !== 4 || p.some(isNaN)) return fallback;
    return bezier(p[0], p[1], p[2], p[3]);
  }

  function bezier(x1, y1, x2, y2) {
    function curve(a, b, t) {
      return ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
    }
    function slope(a, b, t) {
      return 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
    }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 6; i++) {          // Newton-Raphson converges fast
        var d = slope(x1, x2, t);
        if (d === 0) break;
        t -= (curve(x1, x2, t) - x) / d;
      }
      return curve(y1, y2, t);
    };
  }

  var D = {
    reveal: seconds('--d-reveal', 0.72),
    media:  seconds('--d-slow', 1.1),
    hero:   seconds('--d-hero', 2.4)
  };
  var E = { out: ease('--e-out', 'expo.out') };
  var STAGGER   = seconds('--reveal-stagger', 0.07);
  var CAP       = number('--reveal-stagger-cap', 5);
  var SETTLE    = number('--hero-settle', 1.06);
  var DRIFT_BG  = number('--drift-hero', 8);
  var DRIFT_MED = number('--drift-media', 4);
  var SCRUB     = number('--draw-scrub', 0.4);
  var LERP      = number('--scroll-lerp', 0.1);

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: E.out });

  /* ======================================================================
     Lenis

     Momentum on the wheel only. On a touch screen the platform's own scroll
     physics are better than anything a library can impose, and fighting them
     is what makes a smooth-scroll site feel broken on a phone — so Lenis is
     not started there at all. ScrollTrigger then runs off native scroll and
     every effect below still works.
     ====================================================================== */

  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var lenis = null;

  if (window.Lenis && !coarse) {
    lenis = new window.Lenis({
      /* Restrained on purpose. A heavier lerp reads as a showreel; this is
         just enough weight that the page feels like a physical object. */
      lerp: LERP,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,          // belt and braces — touch stays native
      autoRaf: false             // gsap.ticker drives it, see below
    });

    /* The standard wiring: Lenis reports, ScrollTrigger updates, and one
       ticker runs both so there is a single rAF loop on the page. */
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* Nested scrollers — the certificate carousel and, below 40rem, the
       certificate row. Both scroll horizontally only.

       ROUTED BY AXIS, because Lenis competes for one axis and one only.

       data-lenis-prevent is total: it stands Lenis down for every wheel event
       over the element, whichever way it points. On a horizontal-only
       scroller that is the wrong trade — it buys the carousel its sideways
       wheel at the cost of killing vertical scrolling across a 1200x718
       region of the page, which reads as the page sticking. So:

         scrolls vertically   -> data-lenis-prevent. It owns the axis Lenis
                                 wants; Lenis must stand down entirely.
         scrolls horizontally -> no attribute. A sideways wheel is taken off
                                 Lenis by axisRouter below and left to the
                                 browser; a downward wheel reaches Lenis and
                                 scrolls the page, as it should.
         scrolls neither      -> nothing. Tagging it would strand the wheel.

       Measured, never assumed by selector: .home-certs__row is a scroller
       below 40rem and a plain grid above it, and while a reveal is in flight
       a grid's children carry a translateY that fakes ~20px of scrollHeight —
       so the overflow property is checked alongside the size. Re-run on
       refresh because crossing that breakpoint changes every answer. */
    var nested = document.querySelectorAll('.pt-carousel__viewport, .home-certs__row');

    function syncNestedScrollers() {
      for (var n = 0; n < nested.length; n++) {
        var el = nested[n];
        var st = getComputedStyle(el);
        var canX = (st.overflowX === 'auto' || st.overflowX === 'scroll') &&
                   el.scrollWidth > el.clientWidth;
        var canY = (st.overflowY === 'auto' || st.overflowY === 'scroll') &&
                   el.scrollHeight > el.clientHeight;

        if (canY) el.setAttribute('data-lenis-prevent', '');
        else el.removeAttribute('data-lenis-prevent');

        if (canX && !el.__axisRouted) {
          el.addEventListener('wheel', axisRouter, { passive: true });
          el.__axisRouted = true;
        }
      }
    }

    /* A sideways wheel is the element's business, not the page's. Taking it
       off Lenis is all that is needed — the browser still applies its own
       horizontal scroll, so this listener stays passive and never blocks.
       Anything more vertical than horizontal is left alone to reach Lenis. */
    function axisRouter(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation();
    }

    /* Re-measured whenever layout settles, because the answer changes: the
       certificate row is a scroller below 40rem and a plain grid above it,
       so crossing that breakpoint flips it. ScrollTrigger.refresh already
       fires on window load and on resize — it is this codebase's existing
       "layout is settled" signal, so the two stay in step by construction
       rather than by a second timer of our own. */
    syncNestedScrollers();
    ScrollTrigger.addEventListener('refresh', syncNestedScrollers);
    window.addEventListener('load', syncNestedScrollers);

    keyboardSafety(lenis);
  }

  /* ---- Keyboard and anchors must not be trapped -------------------------
     Two things a smooth-scroll layer breaks unless it is told not to. */
  function keyboardSafety(l) {

    /* 1. In-page links. Left to itself the browser jumps the real scroll
          position out from under Lenis. Hand the jump to Lenis, then move
          focus — without this the skip link scrolls but never focuses, which
          is the whole point of a skip link. */
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var hash = a.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.getElementById(hash.slice(1));
      if (!target) return;

      e.preventDefault();
      l.scrollTo(target, {
        offset: -headerHeight(),
        onComplete: function () {
          if (history.replaceState) history.replaceState(null, '', hash);
          focusWithoutScrolling(target);
        }
      });
    });

    /* 2. Tabbing to something below the fold. The browser scrolls natively to
          bring it into view; Lenis's own position has not moved, so the next
          wheel tick would snap the page back. Resync instead. */
    document.addEventListener('focusin', function (e) {
      var el = e.target;
      if (!el || !el.getBoundingClientRect) return;
      requestAnimationFrame(function () {
        var actual = window.scrollY;
        if (Math.abs(actual - l.animatedScroll) > 2) {
          l.scrollTo(actual, { immediate: true, force: true, lock: false });
        }
      });
    });
  }

  function focusWithoutScrolling(el) {
    if (!el.hasAttribute('tabindex') && !/^(a|button|input|select|textarea)$/i.test(el.tagName)) {
      el.setAttribute('tabindex', '-1');
    }
    el.focus({ preventScroll: true });
  }

  function headerHeight() {
    var h = document.querySelector('.site-header');
    return h ? h.offsetHeight : 0;
  }

  /* ======================================================================
     Header — tucks away on the way down, returns on the way up

     Transform only, so nothing below it reflows. It refuses to tuck while the
     mobile menu is open or while focus is inside it, either of which would
     move a control out from under the person using it.
     ====================================================================== */

  (function header() {
    var el = document.querySelector('.site-header');
    if (!el) return;
    var menu = document.getElementById('mobile-nav');
    var tucked = false;

    function set(next) {
      if (next === tucked) return;
      tucked = next;
      el.classList.toggle('is-tucked', tucked);
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function (self) {
        var y = self.scroll();
        var menuOpen = menu && menu.classList.contains('is-open');
        var holdsFocus = el.contains(document.activeElement);

        /* Never tuck over the first couple of header-heights: at the top of a
           page the header is part of the composition, not chrome. */
        if (y < headerHeight() * 2 || menuOpen || holdsFocus) { set(false); return; }
        set(self.direction === 1);
      }
    });
  })();

  /* ======================================================================
     Reveals

     One ScrollTrigger.batch per variant rather than one trigger per element:
     everything that crosses the line together animates together, which is
     what makes a row of product cards read as a row.

     The existing data-reveal-delay attributes are honoured as the step index,
     so the cascade is identical to the one the markup already described.
     ====================================================================== */

  function stepDelay(el, i) {
    var attr = parseInt(el.getAttribute('data-reveal-delay'), 10);
    var step = isNaN(attr) ? i : attr;
    return Math.min(step, CAP) * STAGGER;
  }

  /* Elements claimed by a bespoke effect below, or by the hero's load
     sequence, are kept out of the batch. */
  var claimed = [];
  function claim(nodes) {
    for (var i = 0; i < nodes.length; i++) claimed.push(nodes[i]);
  }

  var CLIP_SELECTOR = '.story-art, .benefits__photo';
  claim(document.querySelectorAll('.home-hero [data-reveal]'));
  claim(document.querySelectorAll(CLIP_SELECTOR));

  function unclaimed(selector) {
    var out = [];
    var nodes = document.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      if (claimed.indexOf(nodes[i]) === -1) out.push(nodes[i]);
    }
    return out;
  }

  function settle(el, delay, duration, withBlur) {
    var vars = {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: duration,
      delay: delay,
      ease: E.out,
      onComplete: function () { gsap.set(el, { filter: 'none', willChange: 'auto' }); }
    };
    if (withBlur) vars.filter = 'blur(0px)';
    gsap.to(el, vars);
  }

  var blocks = unclaimed('[data-reveal]:not([data-reveal="media"])');
  var media  = unclaimed('[data-reveal="media"]');

  if (blocks.length) {
    ScrollTrigger.batch(blocks, {
      start: 'top 88%',
      once: true,
      onEnter: function (batch) {
        batch.forEach(function (el, i) {
          /* Legal pages are near-silent: the same move, faster, so it reads as
             the page settling rather than as an entrance. */
          var quiet = !!(el.closest && el.closest('.legal'));
          settle(el, stepDelay(el, i), quiet ? D.reveal * 0.6 : D.reveal, !quiet);
        });
      }
    });
  }

  if (media.length) {
    ScrollTrigger.batch(media, {
      start: 'top 90%',
      once: true,
      onEnter: function (batch) {
        batch.forEach(function (el, i) {
          settle(el, stepDelay(el, i), D.media, false);
        });
      }
    });
  }

  /* ======================================================================
     index.html — hero

     The copy is above the fold, so it must not wait for a scroll event that
     may never come. It runs on load, as one sequence.
     ====================================================================== */

  (function hero() {
    var section = document.querySelector('.home-hero');
    if (!section) return;

    var copy = section.querySelectorAll('[data-reveal]');
    if (copy.length) {
      gsap.to(copy, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: D.reveal,
        delay: 0.12,               // one beat, so the photograph is there first
        stagger: STAGGER,
        ease: E.out,
        onComplete: function () { gsap.set(copy, { filter: 'none', willChange: 'auto' }); }
      });
    }

    var bg = section.querySelector('.home-hero__bg');
    if (!bg) return;

    /* The settle: one slow relaxation out of a 6% overscale, on load. */
    gsap.fromTo(bg, { scale: SETTLE }, { scale: 1, duration: D.hero, ease: E.out });
  })();

  /* ======================================================================
     Parallax — desktop pointers only

     Scrubbed drift is the one effect here that costs frames on a phone, and a
     phone is where those frames are least available. gsap.matchMedia builds it
     above 60rem on a fine pointer and reverts it, cleanly, below.

     60rem is also where the hero stops being an overlay and becomes a stack,
     so drifting its photograph below that width would be drifting a different
     composition.
     ====================================================================== */

  var mm = gsap.matchMedia();

  mm.add('(min-width: 60rem) and (pointer: fine)', function () {

    /* Hero: the photograph falls behind the page, slowly. Its wrapper clips
       and the image is already sized past the frame, so the drift never
       exposes an edge. */
    var bg = document.querySelector('.home-hero__bg');
    if (bg) {
      gsap.to(bg, {
        yPercent: DRIFT_BG,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    /* A framed photograph moving inside its own window as the section passes.
       Both of these are already oversized inside an overflow:hidden frame. */
    var framed = document.querySelectorAll('.home-heritage__art img, .pt-hero__photo img');
    framed.forEach(function (img) {
      gsap.fromTo(img,
        { yPercent: -DRIFT_MED },
        {
          yPercent: DRIFT_MED,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.home-heritage__art, .pt-hero__photo'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  });

  /* ======================================================================
     our-story.html — the two large photographs uncover as they arrive

     A scrubbed clip-path rather than a timed one: the photograph is revealed
     by the act of scrolling to it, which is the difference between an
     animation and a document being turned to.

     Not applied on a phone: the wipe is a paint on a large image every frame,
     and the batch reveal already covers these elements there.
     ====================================================================== */

  mm.add('(min-width: 40rem)', function () {
    var shots = document.querySelectorAll(CLIP_SELECTOR);
    shots.forEach(function (el) {
      /* y and scale appear on both sides of the tween on purpose: that
         neutralises the rise-and-settle the CSS put on these elements, so the
         uncovering is the whole of the effect rather than a second one on top
         of it. Opacity rides with the wipe, front-loaded, so the photograph is
         fully present well before the edge finishes travelling. */
      var from = { opacity: 0, y: 0, scale: 1, filter: 'none', clipPath: 'inset(0% 0% 26% 0%)' };
      var to = { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' };

      /* A photograph already on screen at load cannot be uncovered by a scroll
         that has not happened — the masthead on our-story is one. It gets the
         same wipe on a timer instead, which is the same effect arriving with
         the page rather than being scrolled to. */
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        to.duration = D.media;
        to.delay = STAGGER * 2;
        to.ease = E.out;
        gsap.fromTo(el, from, to);
        return;
      }

      to.ease = 'none';
      to.scrollTrigger = { trigger: el, start: 'top 92%', end: 'top 42%', scrub: SCRUB };
      gsap.fromTo(el, from, to);
    });

    return function () {
      /* Reverted at the breakpoint: hand the elements back visible. */
      gsap.set(shots, { clipPath: 'none', opacity: 1, y: 0, scale: 1, filter: 'none' });
    };
  });

  /* Below 40rem the clip targets are still hidden by CSS, and were kept out of
     the batch. Reveal them plainly. */
  mm.add('(max-width: 39.999rem)', function () {
    var shots = document.querySelectorAll(CLIP_SELECTOR);
    shots.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () { settle(el, 0, D.media, false); }
      });
    });
  });

  /* ======================================================================
     Scrubbed hairlines

     Two of them, both the same idea: a rule that marks a sequence should be
     drawn by the visitor's own progress through that sequence.

     .process__rail is the quality-control schedule's gold rail. It is styled
     in components.css but no page currently renders the .process component —
     the 7–8 Sep rebuild dropped that section. The code is here and correct so
     that the rail is scrubbed the day the section returns; it animates nothing
     today.

     .story-era's connector is the rule that survives, between 1950 and 2026 on
     our-story. It is a pseudo-element, so the tween drives a custom property
     the rule reads. Its default is 1 — fully drawn — so the line is complete
     with the script absent.
     ====================================================================== */

  document.querySelectorAll('.process__rail').forEach(function (rail) {
    var sequence = rail.closest('.process') || rail.parentNode;
    gsap.fromTo(rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sequence,
          start: 'top 78%',
          end: 'bottom 65%',
          scrub: SCRUB
        }
      }
    );
  });

  document.querySelectorAll('.story-era + .story-era').forEach(function (era) {
    gsap.fromTo(era,
      { '--rail-draw': 0 },
      {
        '--rail-draw': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: era,
          start: 'top 95%',
          end: 'top 62%',
          scrub: SCRUB
        }
      }
    );
  });

  /* ======================================================================
     Late layout changes

     Photographs are lazily decoded and the webfont swaps in after first
     paint; both move the triggers. One refresh on load settles it.
     ====================================================================== */

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  /* The watchdog in the page head is now stood down: motion owns the reveal. */
  root.setAttribute('data-motion-ready', 'gsap');
})();
