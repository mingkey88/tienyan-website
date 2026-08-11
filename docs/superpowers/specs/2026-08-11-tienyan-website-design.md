# Tien Yan — Marketing Website Design Spec

**Date:** 2026-08-11
**Status:** Approved, in implementation
**Owner:** Tan Ming Jie
**Pending sign-off:** Art Director + Managing Director ("lady boss")

---

## 1. Purpose

A five-page static marketing site for **Tien Yan Pte. Ltd. 天燕珍品有限公司**, a Singapore-based
B2B purveyor of premium Indonesian edible bird's nest. The audience is trade, not consumers:
retail chains, hospitality groups, wellness brands, TCM clinics, and corporate gifting buyers.

The site must read as *premium and trustworthy* rather than *promotional*. Its job is to make a
sourcing manager comfortable enough to fill in the enquiry form.

**Hosting:** GitHub Pages initially. Possible migration to Webflow later — this constraint shapes
several decisions below.

## 2. Source material

| Document | Role |
|---|---|
| `Tien Yen_BrandGuide_Final.pdf` (33pp) | Authoritative for colour, type, logo usage, clear space |
| `TienYan_SalesDeck_v2.pdf` (6pp) | Authoritative for product photography and certifications |
| `TienYan_WebsiteContent.pdf` (7pp) | Authoritative for copy and page structure |

## 3. Decisions

| # | Decision | Rationale |
|---|---|---|
| 1 | Five separate HTML pages | Matches the content doc 1:1; better SEO than a one-pager; maps onto Webflow pages |
| 2 | Extract imagery from the PDFs | Site must look finished for AD review; originals requested via `ASSETS-TODO.md` |
| 3 | Cormorant Garamond as Grenda stand-in | Grenda is commercially licensed and cannot be self-hosted; see `FONTS.md` |
| 4 | Restrained motion, zero JS dependencies | Luxury restraint; ~4 KB own JS; every effect has a native Webflow equivalent |
| 5 | Public repo + `noindex` | Pages needs public on the Free plan; brand is pre-launch so search must be blocked |
| 6 | Formspree free tier | No backend on static hosting; one-line swap to Webflow forms later |
| 7 | Spelling is **Tien Yan** | Stationery, domain, guide footer ×33, body copy, and 天燕 pinyin all agree |

## 4. Architecture

```
index.html      Home     — hero, heritage, featured products, certifications, CTA
about.html      About    — who we are, vision, story, founding team
why.html        Why      — PT ESTA partnership, 7-step QC process, 9 certifications
products.html   Products — 12 SKUs, filterable by category
contact.html    Contact  — details, enquiry form

css/tokens.css       Brand variables — single source of truth
css/base.css         Reset, typography, layout primitives
css/components.css   Nav, footer, cards, buttons, form
css/motion.css       Reveal keyframes + reduced-motion block

js/reveal.js         IntersectionObserver scroll reveals
js/nav.js            Sticky nav, mobile menu
js/form.js           Validation + Formspree submit
```

Four small CSS files rather than one large one so `tokens.css` remains the only place brand
values live. That is what makes the Webflow port mechanical rather than archaeological.

## 5. Design system

Taken verbatim from the brand guide. Nothing invented.

### Colour

| Token | Hex | Pantone | Role |
|---|---|---|---|
| `--fuchsia` | `#d41367` | 214 C | Headings, accents, primary CTA |
| `--gold` | `#88754b` | 871 C | Rules, labels, secondary graphic |
| `--mulberry` | `#72253d` | 209 C | Deep ground — hero, footer |
| `--amber` | `#e0a525` | 2007 C | Highlight, gradient terminus |
| `--blush` | `#f8dbe1` | 705 C | Soft section field |
| `--cream` | `#f1e4b2` | 7499 C | Section field, reverse type on mulberry |

Fuchsia is reserved for headings and accents; it is never a large field colour. Mulberry is the
deep ground, per the guide's own cover and back page.

### Typography

```css
--font-display: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-cn:      'Noto Serif SC', 'Microsoft YaHei', sans-serif;
```

Georgia and Microsoft YaHei are the guide's own documented fallbacks (p26–27), so the stack
degrades to a brand-compliant state. Swapping in licensed Grenda is a one-line change.

### Secondary graphic

The gold swirl (guide p18) is the recurring motif. The guide permits opacity 15–100% and cropping
to 70% visible, so it is used as a large, slow-rotating background element at low opacity.

## 6. Motion

| Where | Effect | Webflow equivalent |
|---|---|---|
| Hero | Slow scale on nest photo; gold graphic rotating ~60s | Scroll animation + loop |
| Headings | Rise + fade, staggered per line | Scroll into view |
| Product grid | Scale-in on entry; tilt on hover | Scroll into view + hover |
| QC timeline | Connector draws left→right on entry | Scroll into view |
| Stats | Count up — 1950, 12, 9 | Custom code |
| Section labels | Sticky, in Signature Gold | Position sticky |
| Nav | Condenses on scroll | Scroll animation |

All motion is wrapped in `prefers-reduced-motion: reduce`, which collapses every effect to its
final state instantly. No parallax, no scroll-jacking, no autoplay video.

## 7. Content decisions

The three source documents contradict each other. Resolutions used, all flagged in
`ASSETS-TODO.md` for AD/MD ruling:

| # | Conflict | Resolution | Basis |
|---|---|---|---|
| 1 | "Fu An" vs "Hoo Ann" Bird's Nest | **Fu An 阜安** | 3 sources to 1 |
| 2 | 8-step vs 7-step QC process | **7 steps** | "Ready to Distribute" is an outcome, not a step |
| 3 | 10 product photos vs 12 listed SKUs | **12 listed, 10 with photos** | Royal Oval and Celestial have no imagery |
| 4 | "Asia's" vs "world's" most trusted | **World's** | Website copy is the newer document |
| 5 | "Authenticity" vs "Authority" Certificate | **Authenticity** | Matches the certificate artwork |

### Open question requiring a ruling

The deck's own Certificate of Appointment names Tien Yan the **"Official International
Distribution Partner"** of PT ESTA Indonesia. The website copy claims **"complete control across
sourcing, processing, and manufacturing."** A distributor asserting manufacturing control is a
claim that invites challenge in B2B due diligence.

**Interim wording:** capability is described as accessed *through the PT ESTA partnership* rather
than owned. Flagged for the MD to confirm.

## 8. Privacy and indexing

Pre-launch, so:

- `robots.txt` → `Disallow: /`
- `<meta name="robots" content="noindex,nofollow">` on all five pages
- Lena Thean's direct mobile (+65 9800 7226) is **withheld** until sign-off; `info@tienyan.com` is
  shown instead
- No analytics, no third-party trackers, no cookies

Reversing this at launch is: delete two lines, restore one phone number.

## 9. Asset provenance

All imagery is extracted from client-supplied PDFs.

- **Logo** — extracted as true vector from the brand guide, exported to sized PNGs with alpha.
  SVG sources archived in `assets/logo/source/`.
- **Hero** — sales deck cover, 2260×1707.
- **Products** — 10 photos, 386×314 to 678×453, mapped to SKUs by placed-rect ordering and
  verified visually.
- **Process** — 8 photos, ~200×150. Small, displayed at small sizes only.
- **Certificates** — 9, rendered from the deck page at 700px wide.

**Excluded on licensing grounds:** the Presentation Kit contains 28 images, many at exactly 736px
wide — the signature of Pinterest-sourced mood-board references. These are not demonstrably
licensed to Tien Yan and are not used.

## 10. Verification

No build step, so verification is manual and explicit:

- Serve locally, walk all five pages
- Breakpoints 375 / 768 / 1440
- Keyboard-only navigation, visible focus rings throughout
- Contrast audit — fuchsia-on-cream is the pairing most likely to fail WCAG AA
- `prefers-reduced-motion` honoured
- Lighthouse run before handover

## 11. Out of scope

Chinese-language version of the site (bilingual slogan only), CMS, e-commerce, distributor login,
analytics, and the Webflow migration itself.
