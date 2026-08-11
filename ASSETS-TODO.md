# Assets — what to request from the Art Director

Every image on this site was extracted from the three client PDFs, because no Tien Yan asset
folder was supplied. Most of it is genuinely good; some of it needs the real original.

Ordered by priority.

---

## 1. The logo — request the vector originals

**Priority: high. Everything else is cosmetic; this is the brand mark.**

The logo currently used was extracted from the brand guide PDF as true vector art and exported to
sized PNGs with a transparent background. It is clean and correct at the sizes used, but:

- The gold swirl is a **gradient mesh**, which does not survive PDF→SVG cleanly — in the extracted
  SVG it becomes 48 embedded raster tiles. That is why PNGs ship rather than SVG.
- PNGs cannot scale beyond their exported size. Large-format print or signage will need the original.

**Ask for:** the `.ai` or `.svg` master for each variation — vertical lockup, horizontal lockup,
logo mark, and the brand signature (logo + tagline). Ideally the same folder structure the other
brands on this machine have (e.g. `NYB_Full Logo/`).

| Currently shipping | From | Used for |
|---|---|---|
| `logo-horizontal.png` / `-960.png` | Guide p8 | Header, all pages |
| `logo-vertical.png` / `-800.png` | Guide p7 | Footer |
| `logo-mark.png` / `-180` / `-64` / `-32` | Guide p7 | Favicon, apple-touch, product placeholders |
| `signature.png` | Guide p14 | Not yet placed — available |
| `secondary-graphic.png` | Guide p19 | Rotating background motif |

Extracted SVG sources are archived in `assets/logo/source/` for reference.

---

## 2. Photography for two products

**Royal Oval** and **Celestial** appear in the product list but in no photograph in any supplied
file. They currently render a marked "Photography to follow" placeholder.

**Ask for:** both grades shot on the same black seamless background as the existing ten, so the
grid stays consistent.

**Drop in as:** `assets/products/royal-oval.jpg` and `assets/products/celestial.jpg`, then swap the
two `.product__media--pending` blocks in `products.html` for normal `<img>` blocks.

---

## 3. Higher-resolution source photography

Everything below came out of a PDF, so resolution is capped at whatever was placed in the deck.

| Set | Source resolution | Verdict |
|---|---|---|
| Hero (`hero-nest.jpg`) | 2260×1707 | **Good.** Genuinely high quality. Resized to 1800px for web. |
| Products ×10 | 386×314 – 678×453 | **Adequate** at card size. Would not survive a full-bleed treatment. |
| Process ×8 | 202×152 – 278×185 | **Low.** Displayed at 88px square, which is honest to that resolution. Larger originals would allow a stronger treatment of the quality-control section. |
| Certificates ×9 | rendered at 700px wide | **Adequate** to show the document exists. Not readable at full size. |

**Worth asking for:** the original process photography, and any additional lifestyle or facility
photography. The quality-control section is the most evidence-heavy part of the site and is
currently the most visually constrained.

---

## 4. Deliberately excluded on licensing grounds

`TienYan Bird'sNest_PresentationKit.pdf` contains 28 images, and **many are exactly 736 pixels
wide** — which is Pinterest's standard image width. That strongly suggests they are mood-board
references collected during design, not photography licensed to Tien Yan.

**None of them are used on this site.** Publishing unlicensed stock on a public company website is
a copyright exposure. If any of those images *are* actually licensed, send the licence and they can
be added.

---

## 5. Not requested, but would strengthen the site

The following do not exist in any supplied document and have **not** been invented:

- Customer testimonials, client logos, or case studies. (Note: Fu An's historical restaurant
  customers — Spring Court, Hillman, May Flowers, Hang Kang, Ban Seng — are *Fu An's* history, not
  Tien Yan's client list, and must not be presented as current customers.)
- Photography of the Singapore office or the founding team.
- A photograph of the original 19 North Canal Road shophouse. The sales deck has a line drawing of
  it (p2) which is charming but is embedded as part of a larger composite and did not extract
  cleanly.
- Product catalogue PDF. The sales deck's back page has a QR code labelled "Product Catalog" —
  confirmed with the client as not needed for now.

---

## Housekeeping done during extraction

- All logo PNGs had the PDF page's white background baked in. Removed via white-to-alpha
  unpremultiply, preserving anti-aliased edges.
- The secondary graphic's first crop caught the opacity swatch strip printed beneath it on guide
  p19. Re-cropped square to the swirl alone.
- All photography re-encoded at quality 80 progressive JPEG and capped at 620px (1800px for the
  hero). Total asset weight fell from 3.6 MB to 2.4 MB with no visible loss at display size.
