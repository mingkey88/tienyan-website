# Design

<!-- Recorded from the built site, not from intention. -->

## Visual world

A supplier record rather than a brochure. The reference is trade documentation — a letterhead, a
certificate register, a specification schedule — not premium wellness e-commerce. Colour owns whole
regions rather than accenting a neutral ground, and the page alternates between deep Mulberry
grounds and light fields so each section arrives as a distinct sheet.

The palette, logo rules and bilingual slogan are fixed by `Tien Yen_BrandGuide_Final.pdf` and are
not open for reinterpretation. What this site decides is composition, rhythm and motion.

## Colour

All six brand colours are declared in `css/tokens.css` with their Pantone references.

| Token | Hex | Where it actually appears |
|---|---|---|
| `--c-fuchsia` | `#d41367` | Display headings on white and cream, primary button, nav active state, focus rings on light grounds |
| `--c-mulberry` | `#72253d` | Hero ground, CTA bands, footer, headings on cream, product and process names |
| `--c-gold` | `#88754b` | Hairline rules, quality-control rail — non-text only |
| `--c-cream` | `#f1e4b2` | Section field, and all type reversed out on mulberry |
| `--c-amber` | `#e0a525` | Present in the secondary graphic's gradient only |
| `--c-blush` | `#f8dbe1` | Form success state |

**Gold splits in two.** Signature Gold at its brand value measures 4.47:1 on white and 3.51:1 on
cream — both fail WCAG AA for text. `--c-gold` therefore keeps the exact brand hex and is used only
where the 3:1 non-text threshold applies: hairlines, the QC rail, hover borders. Every piece of gold
*text* — tracked uppercase labels, step numbers, contact-list terms, the certificate affordance —
uses `--c-gold-text #75643e`, which reads 5.76:1 on white, 5.52:1 on paper-warm and 4.52:1 on cream
while staying in the Pantone 871 C family. The brand colour is not altered; it is scoped.

Derived neutrals are few and deliberately warm: `--c-ink #1a1416` for body, `--c-ink-soft #5c4c52`
for secondary. On mulberry, secondary text is `--c-on-dark-soft #d3aeb8` — tinted from the ground,
never grey. Form control borders use `--c-rule-field #9e8a57` (3.37:1) rather than the lighter
`--c-rule-strong`: the white input interior sits at 1.04:1 against the warm band, so the border is
the entire affordance and has to clear SC 1.4.11 on its own.

**Band system.** `.band--paper`, `.band--warm`, `.band--cream`, `.band--blush`, `.band--deep`. The
band class carries its own type, rule and button colours, so a section changes ground by swapping
one class.

## Type

```css
--font-display: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
--font-body:    'Karla', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-cn:      'Noto Serif SC', 'Microsoft YaHei', '微软雅黑', serif;
```

Cormorant Garamond stands in for Grenda, which is commercially licensed — see `FONTS.md`. Georgia
and Microsoft YaHei sit in the stacks because the brand guide documents them as its own web-safe
fallbacks (p26–27), so the site degrades to a brand-compliant state.

Scale is fluid via `clamp()`, display capped at 6rem, tracking floor −0.025em, body measure 68ch.
Headings are `font-weight: 400` — the display face carries presence through size and contrast, not
weight.

Chinese is set at the same size as its English counterpart wherever they appear together, which the
brand guide (p16) requires of the slogan: *"The English and Chinese slogan must always be displayed
at the same font size to maintain visual balance and consistency."* In the hero, `.hero__cn` takes
`font-size: inherit` from `.t-display` rather than declaring a size of its own, so the two cannot
drift apart under any future edit. Its tracking is trimmed from the brand's 0.12em to 0.04em because
at display size the signature spacing pushes the line past the measure — the rule governs character
size, which is untouched.

## Composition

- `.wrap` — 78rem max, fluid gutter. `.wrap--narrow` at 48rem for form and CTA.
- `.split` — the editorial two-column: argument left, evidence right. Collapses at 60rem.
- More space above a heading than below it, enforced in `base.css`.
- `.section` padding is `clamp(4rem, 2rem + 8vw, 9rem)`.

**Components that carry the world:**

- `.process` — the 7 quality-control steps as a numbered schedule with a per-step photograph and a
  gold rail. Numbered because the sequence *is* the information.
- `.certs` — certificates in white frames at 3:4, `object-fit: contain`. Presented as documents to
  be read, not as trust badges.
- `.advantages` — a definition list with rules, deliberately not a three-card icon grid.
- `.product` — photograph on black at 4:3, name in mulberry, spec beneath.
- `.product__media--pending` — the honest placeholder for the two grades with no photography.

## Motion

One authored idea: elements settle into place the way a sheet settles onto a desk. Rise, fade, and
a 3px blur clearing — all easing out, nothing easing in on arrival.

```css
--d-fast: 140ms;  --d-ui: 220ms;  --d-reveal: 720ms;  --d-slow: 1100ms;
--e-out: cubic-bezier(0.16, 1, 0.3, 1);
```

Stagger is capped at five steps of 70ms; a longer cascade reads as a loading bug.

**Rules the build holds to:**

- Content is visible by default. `js/reveal.js` adds `.js-reveal` only when it can also remove it,
  so a JS failure never hides the page.
- No layout properties are animated. The header condenses via `transform` on the logo plus
  background and rule changes; the mobile menu uses `grid-template-rows: 0fr → 1fr`.
- `prefers-reduced-motion: reduce` collapses every effect to its final state.

## Accessibility

WCAG 2.2 AA.

**Documented deviation:** Imperial Fuchsia on Champagne Cream is **4.0:1** — it passes AA for large
text (≥3:1) and fails for body text (≥4.5:1). Enforced in `base.css`: on `.band--cream`, `h2` and
`h3` drop to Deep Mulberry (8.1:1). Only the page-title `h1`, set at 4.25rem, stays fuchsia. On
white, fuchsia measures 4.9:1 and is used freely.

Focus rings are fuchsia on light grounds and cream on mulberry and in the hero, where fuchsia would
lose contrast.

## Constraints this system must keep

1. **Webflow-portable.** No dependency, no build step, no effect without a native Webflow
   Interactions equivalent.
2. **`tokens.css` is the only place brand values live.** A colour or font hard-coded elsewhere is a
   defect.
3. **Never fabricate evidence.** No testimonial, client logo, case study, figure or certification
   that is not in the source documents. Where an asset is missing, mark it missing.
4. **Copy is not the builder's to author.** Discrepancies go to `CONTENT-QUERIES.md`; they are not
   silently harmonised.

---

# Homepage redesign — derived responsive behaviour

**Added 20 Aug 2026.** Source: Figma `0K2glnwVTs6E7C6yAJlXrz`, frame `1:4 HomePage`.

The supplied frame is a fixed 1440px canvas with **no auto-layout and no variables**. It specifies
exactly one viewport. Everything below 1440px was decided here, not by the art director, and every
decision is listed so it can be approved or overruled. All of them live in `css/home.css`, marked
`DERIVED`.

| Section | ≥1440px (as drawn) | Derived behaviour below |
|---|---|---|
| Container | Insets vary 102–178px per section | Normalised to one 75rem container (120px margins at 1440px) |
| Hero | Copy overlaid on a full-bleed photograph | Below 46rem: stops being an overlay. Copy on a flat ground, photograph beneath at 4:3 |
| Hero photograph | Full-bleed cover | `object-position: 70%` so the nests stay in frame as the viewport narrows |
| Heritage | Illustration left, copy right | Single column below 60rem, illustration first |
| Collection | Three cards across | `auto-fit` from a 17rem floor — three, then two, then one |
| Certificates | Three scans at their own widths, 480px tall | Equal heights, natural widths, wrapping and centred |
| Footer | Brand block + four columns | Two columns below 68rem, one below 48rem |

## Decisions worth challenging

**The hero stops being an overlay below 46rem.** The alternative was keeping the overlay and
darkening the photograph behind the copy. Rejected: a scrim would sit over the product, and the
product is the reason the photograph is there. The cost is that the hero is taller on a phone.

**The container was normalised.** The frame insets its five sections at 102, 125, 142 and 178px —
the signature of a file without auto-layout. Reproducing all four would bake the inconsistency into
the Wix build, where it becomes four different section paddings to maintain. One container instead.

**Buttons are pinned to 238px.** Every primary action in the frame is drawn at that width whatever
the label, and the equal width is what makes the pairs read as a set. Below the point where 238px
no longer fits beside the gutters they go full width.

**Footer body type raised from 12px to 13px.** The frame's smallest text is 12px reversed on
Deep Mulberry. The site holds a WCAG 2.2 AA commitment and this is the least legible text on the
page; 13px costs nothing visually. Contrast measures 5.14:1 either way.

## Verified, not assumed

Measured in-browser on 20 Aug 2026 at 1440 / 768 / 390px:

- **Contrast** — 14 foreground/ground pairs, all pass AA. The hero sets type directly on a
  photograph, so the ground was sampled per-pixel behind each text block rather than assumed:
  worst case 6.62:1 for the headline, 6.48:1 for the Chinese slogan, 10.94:1 for the lead.
- **No horizontal overflow** at any of the three widths.
- **All 20 scroll reveals fire**, and content is visible with JavaScript disabled.
- **The card disclosure is keyboard-operable** — `aria-expanded` tracks state, Escape closes the
  focused card and returns focus to its button, and the control is removed entirely if its panel
  is missing.
- **Zero console errors or warnings.**

## Assets

Re-exported from the Figma frame into `assets/figma/`. The originals came out at 4096px
(18.5 MB total) and were downscaled to 2× display size and converted to WebP — **404 KB total**.
The hero photograph is horizontally flipped, reproducing the `rotate-180 + scale-y-100` transform
the frame applies to it; without the flip the nests land on the wrong side and the headline sits
on top of them.
