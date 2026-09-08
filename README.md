# Tien Yan — Website

Static marketing site for **Tien Yan Pte. Ltd. 天燕珍品有限公司**, a Singapore-based B2B supplier of
premium Indonesian edible bird's nest.

Eight pages — five real, three legal stubs. No build step, no JavaScript dependencies,
no framework. Every page is rebuilt to the art director's Figma; every deviation from it is
recorded in CONTENT-QUERIES.md.

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
index.html        Home          hero · heritage · collection · certifications · CTA
our-story.html    Our Story     1950→2026 timeline · what makes it different · health benefits
partnership.html  Partnership   hero · value-chain tabs · certificate carousel
products.html     Products      12 grades with descriptions · catalogue request
contact.html      Contact       category cards · enquiry form · get in touch
privacy.html      Legal         stub — copy pending
terms.html        Legal         stub — copy pending
cookies.html      Legal         stub — copy pending

css/tokens.css       Brand variables — the single source of truth
css/base.css         Reset, typography, layout primitives
css/components.css   Nav, footer, cards, form, process, certificates
css/site.css         Shared chrome — header, footer, Partner CTA, buttons, container
css/home.css         Homepage sections only
css/pages.css        Interior page sections — Our Story, Partnership, Products, Contact
css/motion.css       Scroll reveals + reduced-motion

js/nav.js            Sticky header, mobile menu
js/reveal.js         IntersectionObserver reveals, count-up figures
js/form.js           Validation + Formspree submission
js/tabs.js           Partnership value-chain tablist (ARIA APG pattern)
js/carousel.js       Partnership certificate carousel

assets/logo/         Logo variations (SVG sources in source/)
assets/hero/         Hero photograph
assets/products/     10 product photographs
assets/process/      8 quality-control photographs
assets/certs/        9 certificate scans
```

Seven focused CSS files keep shared styling separate from page layouts, with brand values
and responsive type scales in `tokens.css`.

`home.css` is deliberately separate. The homepage has been rebuilt to the art director's Figma and
is the pilot for the **Wix Studio** migration; keeping it in one file means the port has a single
stylesheet to translate rather than a diff against `components.css`. The four interior pages use `pages.css`; every page uses the shared header and footer in `site.css`.

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

Typography: **Grenda Regular** (display, body and UI) · **Noto Serif SC** (Chinese).
Grenda is self-hosted from the existing webfont package; see **[FONTS.md](FONTS.md)** for its source and configuration.

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

1. Delete `<meta name="robots" content="noindex, nofollow">` from all eight HTML files.
2. Replace `Disallow: /` with `Allow: /` in `robots.txt`.
3. Supply the catalogue PDF and overview video. Until then, their links open a prefilled
   contact enquiry rather than a missing file. The phone number is already displayed.
4. Connect the Formspree endpoint (above).
5. Replace the three legal stubs (`privacy.html`, `terms.html`, `cookies.html`) with real policy
   copy. They currently say the document is in preparation — honest, but not a policy.
   See CONTENT-QUERIES.md Q15.
6. Review unresolved decisions in **[CONTENT-QUERIES.md](CONTENT-QUERIES.md)**. Earlier
   entries are historical; the latest revision records the current implementation. Font source details are recorded in FONTS.md.

---

## Latest design update — 7–8 Sep 2026

Reference: [Tien Yan (Copy)](https://www.figma.com/design/HcxmNyEHLi69CkMnAOmx9Q/Tien-Yan--Copy-?node-id=1-4).
The five main pages now use the latest serif styling, revised spacing and warm grounds,
50px primary buttons, wider shared header/footer, updated imagery and Contact form panel.
The address is retained on Contact. Existing value-chain tabs and the three-certificate
carousel behavior are preserved per the recorded client decisions.

Catalogue and video links currently open a contact enquiry with an editable message.
They do not download a file or send a message automatically. The form still requires its
Formspree endpoint. Local asset URLs include a revision query so returning visitors receive
updated styles instead of the previous cached version.

## Outstanding

- **[CONTENT-QUERIES.md](CONTENT-QUERIES.md)** — 8 copy discrepancies found between the source
  documents. Nothing was changed unilaterally; every one needs a ruling from whoever owns the copy.
- **[ASSETS-TODO.md](ASSETS-TODO.md)** — what to request from the Art Director, chiefly vector
  logo originals and photography for two products.
- **[FONTS.md](FONTS.md)** — installed Grenda Regular webfont and Chinese fallback.

---

## Design record

- `PRODUCT.md` — product truth: users, positioning, constraints, brand commitments, what must never
  be fabricated.
- `docs/superpowers/specs/2026-08-11-tienyan-website-design.md` — the approved design spec.
- Each page carries a direction contract as an HTML comment at the top of `<body>`.
