# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML / CSS / vanilla JS, no build step. Chosen by the user for GitHub Pages hosting with a
possible Webflow migration later. That migration path is the reason for no framework, no
bundler, and no JS dependencies: every construct must have a native Webflow equivalent.

## Users

Primary: **B2B sourcing decision-makers** evaluating a bird's nest supplier — category buyers at
retail chains, procurement at hospitality groups, product leads at wellness and supplement
brands, TCM clinic owners, and corporate gifting managers. Mostly Singapore, Malaysia, Greater
China, and Indonesian domestic trade.

Their situation: they are comparing suppliers, and the category has a genuine authenticity and
adulteration problem. They arrive sceptical. Their job is to establish that this supplier is
real, certified, export-legal, and able to hold consistent quality at volume — quickly enough to
justify starting a conversation.

Secondary: existing partners returning for product specifications or contact details.

## Product Purpose

Tien Yan supplies premium Indonesian edible bird's nest to trade buyers worldwide. The site
exists to convert a sceptical sourcing manager into a direct conversation with Lena Thean.

Success is a qualified inbound enquiry. Not traffic, not time-on-page.

## Positioning

A Singapore trading heritage dating to 1950 (Fu An Bird's Nest, 19 North Canal Road) combined
with access to PT ESTA Indonesia's integrated production. Neither half is copyable: the heritage
is a matter of record, and PT ESTA holds CNCA Registration No. 002 as one of Indonesia's largest
legally-recognised exporters of bird's nest to China.

**Open decision — requires MD ruling.** The Certificate of Appointment names Tien Yan the
"Official International Distribution Partner" of PT ESTA. Website copy elsewhere claims "complete
control across sourcing, processing, and manufacturing". A distributor asserting manufacturing
control invites challenge in procurement due diligence. Interim wording describes that capability
as reached *through the partnership* rather than owned. Do not restate the stronger claim without
a ruling.

## Operating Context

Buyers evaluate in a comparison frame, often with several supplier sites open at once, frequently
on desktop during a working day. They look for: certification names they recognise, export
legality for their destination market, grade nomenclature they can map to their own SKUs, and a
named human to contact.

Certificates are the single most-scrutinised element. They are evidence, not decoration.

## Capabilities and Constraints

- Five pages: Home, About, Why Tien Yan, Products, Contact.
- 12 product grades. Only 10 have photography; **Royal Oval** and **Celestial** have none.
- 7-step quality control process (sorting → cleansing → feather removal → finishing → grading →
  heating → packing).
- 9 certifications, all with scanned artwork available.
- No backend. The enquiry form posts to Formspree; the endpoint is not yet provisioned.
- Pre-launch: the site must be `noindex` and must not appear in search until sign-off.
- Bilingual slogan only. A full Chinese version of the site is out of scope.

## Brand Commitments

Binding, from `Tien Yen_BrandGuide_Final.pdf`:

- Name is **Tien Yan Pte. Ltd. 天燕珍品有限公司**. Confirmed by the user against stationery, the
  tienyan.com domain, and the pinyin for 天燕. The guide's own "Tien Yen" instances are typos.
- Slogan: **Nature's Gift, Beyond Generations / 天赐珍燕，世代传承**. The guide requires English and
  Chinese to be set at the same size.
- Palette is fixed and named: Imperial Fuchsia `#d41367`, Signature Gold `#88754b`, Deep Mulberry
  `#72253d`, Golden Amber `#e0a525`, Blush Petal `#f8dbe1`, Champagne Cream `#f1e4b2`.
- Logo may not be recoloured, distorted, rotated, outlined, shadowed, rearranged, cropped, or
  reconstructed from fonts. Clear space and minimum sizes are specified (vertical 60px digital,
  horizontal 85px display).
- Primary typeface is Grenda Regular, now self-hosted from the existing webfont package.
  See FONTS.md for its source. The guide documents Georgia and Microsoft YaHei as fallbacks.
- The gold secondary graphic may be used in any brand colour, black, or white, at 15–100% opacity,
  and may be cropped provided 70% remains visible.

Voice: measured, precise, unhurried. Heritage without nostalgia. It never oversells — the
category is full of overselling, and restraint is itself a trust signal.

## Evidence on Hand

Real and usable:

- Logo, extracted as true vector from the brand guide → `assets/logo/` (SVG sources in `source/`).
- Hero photograph, 2260×1707 → `assets/hero/hero-nest.jpg`.
- 10 product photographs → `assets/products/`, mapped to SKUs and visually verified.
- 8 process photographs → `assets/process/` (small, ~200×150; display small only).
- 9 certificate scans → `assets/certs/`.
- Certificate of Analysis with real assay figures: sialic acid 10.9% against a ≥9% standard,
  moisture 17.2% against ≤18%, sulphur dioxide not detected, pH 7.3.
- Named founding team of six, and a named contact: Lena Thean, COO.
- UEN 202629510Z.

Absent — must not be fabricated:

- Photography for Royal Oval and Celestial.
- Any customer testimonial, logo, case study, review, or named client. The brand guide and deck
  contain none. Fu An's historical restaurant customers (Spring Court, Hillman, May Flowers,
  Hang Kang, Ban Seng) are *Fu An's* history, not Tien Yan's client list, and must not be
  presented as current customers.
- Pricing, MOQ, lead times, capacity figures.
- Any certification not in the list of nine.

## Product Principles

1. **Evidence outranks adjectives.** A sialic acid figure and a certificate number persuade a
   sourcing manager; "premium quality" does not. Lead with the provable.
2. **Restraint is the trust signal.** In a category crowded with overclaiming, a quiet site reads
   as the confident one. Never oversell.
3. **Never invent proof.** No testimonials, no client logos, no numbers that are not in the
   source documents. An empty space is better than a fabricated one.
4. **Route everything to a named human.** The conversion is a conversation with Lena, not a
   download. Contact affordances belong on every page.
5. **Every construct must survive the Webflow port.** No dependency, no clever build-time trick,
   no effect without a native equivalent.

## Accessibility & Inclusion

**WCAG 2.2 AA**, confirmed by the user as a procurement baseline.

Known conflict with the brand palette: Imperial Fuchsia `#d41367` on Champagne Cream `#f1e4b2`
measures roughly 3.9:1 and fails AA for body-size text. It is therefore restricted to large text
(24px+ / 19px bold) and non-text accents. Fuchsia on white measures ~4.9:1 and passes for body
text. This deviation is documented for the Art Director.

Also required: full keyboard operability with visible brand-coloured focus rings, semantic
landmarks, alt text on all evidential imagery (certificates especially), and
`prefers-reduced-motion` honoured across every animation.
