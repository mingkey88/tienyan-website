# Tien Yan — Website

Static marketing site for **Tien Yan Pte. Ltd. 天燕珍品有限公司**, a Singapore-based B2B supplier of
premium Indonesian edible bird's nest.

Five pages, no build step, no JavaScript dependencies.

> **Pre-launch.** The site is set to `noindex, nofollow` and `robots.txt` disallows everything.
> See [Going live](#going-live) before sharing publicly.

---

## Run it locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. There is nothing to install and nothing to build.

---

## Structure

```
index.html      Home       hero · heritage · collection · certifications · CTA  (Figma redesign)
about.html      About Us   who we are · vision · story · founding team
why.html        Why        PT ESTA partnership · 7-step QC process · 9 certifications
products.html   Products   12 grades
contact.html    Contact    details · B2B enquiry form

css/tokens.css       Brand variables — the single source of truth
css/base.css         Reset, typography, layout primitives
css/components.css   Nav, footer, cards, form, process, certificates
css/home.css         Homepage only — the Figma redesign. Port target for Wix.
css/motion.css       Scroll reveals + reduced-motion

js/nav.js            Sticky header, mobile menu
js/reveal.js         IntersectionObserver reveals, count-up figures
js/form.js           Validation + Formspree submission
js/product-card.js   Homepage product card disclosure ("+")

assets/logo/         Logo variations (SVG sources in source/)
assets/hero/         Hero photograph
assets/products/     10 product photographs
assets/process/      8 quality-control photographs
assets/certs/        9 certificate scans
```

Five small CSS files rather than one large one, so `tokens.css` stays the only place brand values
live. That is what makes the platform migration mechanical rather than archaeological.

`home.css` is deliberately separate. The homepage has been rebuilt to the art director's Figma and
is the pilot for the **Wix Studio** migration; keeping it in one file means the port has a single
stylesheet to translate rather than a diff against `components.css`. The other four pages are
untouched and still render from `components.css`.

---

## Design system

Taken verbatim from `Tien Yen_BrandGuide_Final.pdf`. Nothing invented.

| Token | Hex | Pantone | Role |
|---|---|---|---|
| `--c-fuchsia` | `#d41367` | 214 C | Display type, primary action |
| `--c-gold` | `#88754b` | 871 C | Hairline rules, tracked labels |
| `--c-mulberry` | `#72253d` | 209 C | Deep grounds — hero, footer, CTA bands |
| `--c-amber` | `#e0a525` | 2007 C | Highlight |
| `--c-blush` | `#f8dbe1` | 705 C | Soft field |
| `--c-cream` | `#f1e4b2` | 7499 C | Section field, reverse type on mulberry |

Typography: **Cormorant Garamond** (display) · **Karla** (body) · **Noto Serif SC** (Chinese).
Grenda, the brand guide's primary face, is commercially licensed — see **[FONTS.md](FONTS.md)** for
how to buy and install it. It is a one-line swap.

---

## Accessibility

Built to **WCAG 2.2 AA**.

One documented deviation: Imperial Fuchsia on Champagne Cream measures **4.0:1**. That passes AA for
large text (≥3:1) but fails for body text (≥4.5:1), so on cream grounds fuchsia is restricted to
display sizes and `h2`/`h3` drop to Deep Mulberry (8.1:1). Fuchsia on white measures 4.9:1 and is
used freely.

Also: full keyboard operability with brand-coloured focus rings, semantic landmarks, a skip link,
alt text on all evidential imagery, and every animation collapsed under `prefers-reduced-motion`.

---

## Motion

Restrained by intent — the audience is a sourcing manager comparing suppliers, and restraint reads
as confidence in this category. Everything is `IntersectionObserver` + CSS transitions; there are no
libraries.

No effect depends on JavaScript for its meaning, which is what makes the set portable to a visual
builder. Each one is a standard primitive rather than something bespoke:

| Effect | What the target platform needs to provide |
|---|---|
| Staggered rise + fade on entry | Scroll-into-view trigger with a per-element delay |
| Hero photograph settling on load | Page-load animation |
| Quality-control rail drawing top→bottom | Scroll-into-view trigger on a scaled element |
| Product card "+" disclosure | Toggle / accordion interaction |
| Count-up on 1950 / 12 / 9 | Custom code — no builder does this natively |
| Header condensing on scroll | Scroll-position trigger |
| Secondary graphic rotating | Looping animation |

The exact Wix Studio equivalents are confirmed in Phase 2 of the migration, not assumed here.
Anything Wix cannot reproduce gets reported rather than silently dropped.

Content is visible by default. `js/reveal.js` only hides elements once it has confirmed it can also
show them again, so a JavaScript failure never leaves a blank page.

---

## The enquiry form

The form is a real `POST` and works without JavaScript. JavaScript upgrades it to inline validation
and an in-page success state.

**It is not connected yet.** To connect it:

1. Create a free account at <https://formspree.io> (50 submissions/month is plenty for B2B).
2. Create a form and copy its endpoint.
3. In `contact.html`, replace `FORMSPREE_ID` in the form's `action`:

```html
<form ... action="https://formspree.io/f/FORMSPREE_ID" ...>
```

Until that is done the form validates normally but refuses to pretend it sent anything — it tells
the visitor to email `info@tienyan.com` instead.

---

## Going live

Currently pre-launch. To publish:

1. Delete `<meta name="robots" content="noindex, nofollow">` from all five HTML files.
2. Replace `Disallow: /` with `Allow: /` in `robots.txt`.
3. Uncomment the phone number blocks in `contact.html` and the footer of the four pages that
   still hide it (search for `withheld pending sign-off`). The redesigned homepage already
   publishes it, because the supplied Figma frame does — see CONTENT-QUERIES.md Q10.
4. Connect the Formspree endpoint (above).
5. Write `privacy.html`, `terms.html` and `cookies.html`, or remove the three links to them from
   the homepage footer. They are dead links today — see CONTENT-QUERIES.md Q15.
6. Resolve the items in **[CONTENT-QUERIES.md](CONTENT-QUERIES.md)** — sixteen now. One is visible
   to any visitor who reads two pages; four block the homepage (placeholder card copy, the
   identical `$100/kg` on every grade, the nav labels, and the Grenda licence).

---

## Outstanding

- **[CONTENT-QUERIES.md](CONTENT-QUERIES.md)** — 8 copy discrepancies found between the source
  documents. Nothing was changed unilaterally; every one needs a ruling from whoever owns the copy.
- **[ASSETS-TODO.md](ASSETS-TODO.md)** — what to request from the Art Director, chiefly vector
  logo originals and photography for two products.
- **[FONTS.md](FONTS.md)** — how to buy and install the real Grenda webfont.

---

## Design record

- `PRODUCT.md` — product truth: users, positioning, constraints, brand commitments, what must never
  be fabricated.
- `docs/superpowers/specs/2026-08-11-tienyan-website-design.md` — the approved design spec.
- Each page carries a direction contract as an HTML comment at the top of `<body>`.
