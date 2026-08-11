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
