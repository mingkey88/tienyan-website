# Tien Yan — Wix Studio build spec (homepage)

**Site:** `b4d2df60-ff1a-41dc-aac9-a6b014276c40` · Wix **Studio**, free plan, Velo disabled
**Editor:** <https://editor.wix.com/studio/dd8769d5-2786-4668-ae57-4d34fdc20456?metaSiteId=b4d2df60-ff1a-41dc-aac9-a6b014276c40>
**Reference build:** <https://mingkey88.github.io/tienyan-website/> — the coded page this spec describes
**Design source:** Figma `0K2glnwVTs6E7C6yAJlXrz`, frame `1:4 HomePage`

Wix Studio's canvas has no API, so this page is built by hand. This document exists so that
build is transcription rather than interpretation: every value below is measured, not estimated.

Work top to bottom. Do §1 and §2 **before** placing anything — the theme and breakpoints are what
stop you hand-setting colours and type on every element.

---

## 1. Site settings

| Setting | Change to | Why |
|---|---|---|
| Site name | **Tien Yan** | currently "My Site" |
| Country | **Singapore** | defaults to US |
| Timezone | **Asia/Singapore** | defaults to America/New_York |
| Language | English | already correct |
| Currency | **see queries** | prices show as `$` — SGD or USD is unresolved |

---

## 2. Theme — set these once, in Site Theme

### Colours

Taken verbatim from `Tien Yen_BrandGuide_Final.pdf` p20. The Figma's own hex values match these
exactly for the two that matter (`#72253d`, `#d41367`), so the brand guide is the source.

| Wix theme slot | Hex | Name | Used for |
|---|---|---|---|
| Main 1 | `#d41367` | Imperial Fuchsia | every button, active nav link |
| Main 2 | `#72253d` | Deep Mulberry | all section headings, footer ground, card "+" |
| Main 3 | `#88754b` | Signature Gold | hairlines only — never text |
| Main 4 | `#1a1416` | Ink | body copy |
| Main 5 | `#ffffff` | Paper | card and section grounds |
| Accent 1 | `#f1e4b2` | Champagne Cream | footer column headings |
| Accent 2 | `#f8dbe1` | Blush Petal | unused on this page |
| Accent 3 | `#e0a525` | Golden Amber | **at 10% opacity** = collection section ground |
| Accent 4 | `#fdfaf4` | Paper Warm | heritage section ground |
| Accent 5 | `#5c4c52` | Ink Soft | card descriptions |

Two more needed as custom colours: `#e8dccb` (hero fallback ground) and `#d3aeb8` (footer
secondary text — a mulberry tint, **never** grey).

### Fonts

The Figma specifies **Grenda Regular** on every single text layer. Grenda is commercially
licensed and this project does not hold the licence, so the reference build substitutes:

- **Display / headings** → Cormorant Garamond (300, 400, 500)
- **Body / UI** → Karla (400, 500, 600, 700)
- **Chinese** → Noto Serif SC (400, 500)

Both are free Google Fonts, available in Wix Studio's font picker. **If the Grenda licence is
bought, upload the webfont in Studio and swap the display font — nothing else changes.**

> The Figma sets Chinese in Microsoft YaHei, a sans. The build uses Noto Serif SC to pair with the
> serif display face. See CONTENT-QUERIES.md Q14.

### Text styles

Wix Studio scales type between breakpoints itself. Set the **desktop** value; these are the
Figma's own sizes at 1440px.

| Style | Font | Size | Line height | Colour |
|---|---|---|---|---|
| H1 — hero | Display | 55px | 60px | Deep Mulberry |
| H1 — Chinese | Noto Serif SC | 48px | 62px | Deep Mulberry |
| H2 — section | Display | 48px | 50px | Deep Mulberry |
| H3 — card name | Display | 30px | 35px | Ink |
| Lead — hero | Body | 28px | 35px | Ink |
| Sub — section | Body | 28px | 36px | Ink |
| Body — heritage | Body | 24px | 35px | Ink |
| Body — card desc | Body | 16px | 26px | Ink Soft |
| Price | Body | 20px | 26px | Ink |
| Nav / button | Body | 18px | 22px | — |
| Arrow link | Body | 20px | 26px | Deep Mulberry |
| Footer heading | Body | 16px | 24px | Champagne Cream |
| Footer body | Body | **13px** | 22px | on-dark |
| Footer legal | Body | 12px | 20px | `#d3aeb8` |

> Footer body is 13px, not the Figma's 12px. 12px reversed on mulberry is the least legible text
> on the page and the site holds a WCAG 2.2 AA commitment. Contrast is 5.14:1 either way.

### Breakpoints

The coded build uses these. Add custom breakpoints in Studio if its defaults don't line up —
only the first two actually change layout.

| Width | What changes |
|---|---|
| ≤ **736px** | Hero stops being a photo overlay and stacks (see §4) |
| ≤ **640px** | Certificates stop being three across and stack |
| ≤ 960px | Heritage goes single column |
| ≤ 768px | Footer 5 columns → 2 |

---

## 3. Page container

Every section's content sits in a **1200px max-width container, centred**, with side padding
that scales from 20px to 64px. At 1440px this gives 120px margins.

> The Figma insets its sections inconsistently — 102px, 125px, 142px, 178px — because the file has
> no auto-layout. Do **not** reproduce that. One container, or you inherit four different section
> paddings to maintain forever.

---

## 4. Sections

Media IDs below are already uploaded to this site's Media Manager.

### Header — global

White, **91px** tall, full width. Sticky.

- Logo left, **107px** wide · `1aae46_9c5938bdf11a4a75b2f8e71619c52da4~mv2.webp`
- Menu right: Home · Our Story · Partnership · Products — 18px, Ink
- CTA button far right: **Enquiry**, `#d41367`, white text, **134 × 35**, **square corners (0 radius)**
- Active page: fuchsia text + 1px underline

> Set this as a **global header** so the other four pages inherit it.

**Links:** Our Story → About page, Partnership → Why page. The Figma renames these pages, so name
the Wix pages "Our Story" and "Partnership" and the mismatch disappears.

### Hero

Full-bleed section, **768px** tall at 1440 (53.3vw), floor 480px.

- Background image `1aae46_1b0dd76bb3de495fa7b9285543734bc0~mv2.webp`, **fill/cover**, focal point **70% horizontal**
- Section background colour behind it: `#e8dccb`
- Content block left-aligned, max **736px** wide, vertically centred
- H1 "Nature's Gift,` ⏎ `Beyond Generations" — two lines, hard break
- Chinese line 天赐珍燕，世代传承 directly under
- Lead paragraph, max 34 characters per line
- Two buttons side by side, **32px** gap, each **238 × 43**, fuchsia, square:
  **Explore Products** → Products page · **WhatsApp Us** → `https://wa.me/6598007226`

**≤736px:** stack. Copy first on a flat `#efe6d8` ground, photograph **below** at 4:3.
Do not put a scrim over the photograph to keep the overlay — it would darken the product.

### Heritage

Ground `#fdfaf4`. Two columns, **1.45 : 1**, vertically centred, 96px gap.

- Left: shophouse illustration `1aae46_1639cf7b8126422da4d0934f7ec67d41~mv2.webp`, full column width
- Right: H2 on three hard-broken lines — "Premium Bird's Nest." / "Trusted Heritage." / "Global Supply."
- Body paragraph, max 42 characters per line
- Button **Learn Our Story**, 238 × 40, fuchsia, square → Our Story page

**≤960px:** single column, illustration first.

### Collection — "Tradition Reimagined"

Ground: Golden Amber `#e0a525` at **10% opacity**.

- H2 "Tradition Reimagined", centred
- Sub "Tien Yan's Signature Raw Nest Collection", centred, max 32 characters
- Three cards, equal columns, **32px** gap

Each card — a **repeater** is the right element here, since Products will reuse the same shape:

| Part | Spec |
|---|---|
| Card | White, **18px** corner radius, soft shadow, clipped |
| Image | Aspect **380 : 282**, fill/cover, dark ground `#131313` |
| Name | H3, 30px, Ink |
| Description | 16px, Ink Soft |
| Price row | Price left, "+" right, pushed to card bottom |
| "+" | Deep Mulberry, 36px, **44 × 44 tap target**, rotates 45° when open |

**Card data — the Figma homepage prices are placeholder.** Real prices from the Products frame:

| Card | Description | Price shown | Real price |
|---|---|---|---|
| Tien Yan Royal | *lorem ipsum* | `$100/kg` | **$150** |
| Tien Yan Noble | *lorem ipsum* | `$100/kg` | **$130** |
| Tien Yan Imperial | *lorem ipsum* | `$100/kg` | **$85** |

Below right: **View All Products** + arrow → Products page.

**Reflow:** 3 across → 2 → 1, on a 272px minimum card width.

### Certificates

Ground white. H2 "Built on Quality. Backed by Certification.", centred.

Three scans **in one row**, filling the container, at column ratio **341 : 364 : 324** with a
**26px** gap:

| Position | Media ID | Certificate |
|---|---|---|
| Left | `1aae46_f857410e18bd4f449073a99ed117fdd0~mv2.webp` | Halal, Republic of Indonesia |
| Centre | `1aae46_ca37b7e722b74070ad6666d36895a4b6~mv2.webp` | SGS HACCP |
| Right | `1aae46_08a4527abf6c4532b79b1a30d8e03881~mv2.webp` | PT ESTA certificate of analysis |

> **That ratio is not arbitrary.** It is each scan's natural width at a shared height. Set the
> columns to it and let each image be 100% width / auto height, and all three land at the same
> height at every screen size — no manual height-matching, ever. Height is 480px at 1440.

Each: 1px `#e6dcc8` border, white background, soft shadow.

Below right: **View All Certifications** + arrow → Partnership page.

**≤640px:** stack, each capped at 352px wide, centred.

### Partner CTA — global

White ground, everything centred. Reusable across all five pages — build it as a **section preset**.

- H2 "Partner with Tien Yan"
- 28px lead "For retail, hospitality, wellness, and corporate sourcing enquiries.", max 52 characters
- Button **Contact Us**, 238 × 40, fuchsia, square → Contact page

### Footer — global

Ground Deep Mulberry `#72253d`. Five columns at ≥1088px: **1.6 : 0.85 : 0.85 : 0.85 : 1.3**.

**Column 1 — brand**
- Logo `1aae46_05e680711cec4312982778b5f909e5ce~mv2.webp`, **66px** wide
- 14px: "Nature's Gift, Beyond Generations" / 天赐珍燕，世代传承 on its own line
- 13px `#d3aeb8`: "Premium Indonesian Edible Bird's Nest for Global Retail, Hospitality & Wellness Partners."

**Columns 2–4** — heading in Champagne Cream, links 13px white:

| Company | Products | Quality |
|---|---|---|
| About Us | Royal Series | Certifications |
| Why Tien Yan | Heritage Series | Quality Process |
| | Sky Series | |

**Column 5 — Contact Us** — icon + value rows, 16px icons:

| Icon media ID | Value |
|---|---|
| `1aae46_689c4a117ea548458b952260a9c91ee5~mv2.webp` | info@tienyan.com |
| `1aae46_76bf85008ccd4c2c8bc0e9199a4e7459~mv2.webp` | +65 9800 7226 |
| `1aae46_27fb78763a564c1f906f95a39639c99a~mv2.webp` | 10 Jalan Kilang / #04-06 Bukit Merah Enterprise Centre / Singapore 159410 |

Social below, right-aligned, 22px, **44px tap targets**:
LinkedIn `1aae46_83c755e63d0d48b7bca08de76a62ef47~mv2.webp` ·
Instagram `1aae46_e95ddd616a324eb183b85a82d077081a~mv2.webp`

**Legal bar** — 1px rule above, then © 2026 Tien Yan Pte. Ltd. All Rights Reserved. left;
Privacy Policy · Terms of Use · Cookie Policy right.

---

## 5. Motion

Keep it restrained. The audience is a sourcing manager comparing suppliers; restraint reads as
confidence in this category.

| Effect | Where | Wix Studio |
|---|---|---|
| Rise + fade on entry | every section heading, card, scan | Scroll-into-view, ~70ms stagger |
| Lift on hover | product cards | Hover transition, 4px up |
| Arrow slides right | both "View All" links | Hover transition, 6px |
| "+" rotates 45° | product cards | Toggle / accordion state |
| Header condenses | on scroll | Scroll trigger |

**Every one of these must be off under `prefers-reduced-motion`.** Confirm Studio honours it; if
not, that is a finding to report, not something to ignore.

---

## 6. Known gaps

1. **Arrow SVG would not upload** — Wix Media returns HTTP 400 for SVG through the API. Use
   Studio's built-in arrow icon in Deep Mulberry, 52px wide, or add the file through the Media
   Manager UI. Source: `assets/figma/icons/arrow.svg`.
2. **Grenda is not licensed.** The page will not match the Figma's type until it is.
3. **Card copy and homepage prices are placeholder.** See the table in §4.
4. **Privacy / Terms / Cookie pages do not exist.** Three dead links.
5. **Free plan** — no custom domain, and a Wix banner on the published site until upgraded.

---

## 7. When the build is done

Send it back for review. The reference build was verified at 1440 / 768 / 390 for:

- 14 contrast pairs against WCAG 2.2 AA — including sampling the photograph pixel-by-pixel behind
  the hero text, which is the one place contrast cannot be assumed
- no horizontal overflow at any width
- keyboard operation of the card disclosure, with focus returning correctly
- content still readable with JavaScript disabled

The Wix build should clear the same bar. Those checks can be re-run against the published Wix URL.
