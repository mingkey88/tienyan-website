# Tien Yan — Wix Studio migration spec

**Status:** design approved 20 Aug 2026; **updated 21 Aug 2026** for the revised
Figma file. Supersedes `WIX-BUILD-SPEC.md`, which covered the homepage only and
predates the CMS decision.

> **Revision of 21 Aug 2026.** A new Figma file (`aUoVe8M7d2f92WZdUlhZLj`) closed
> seven content queries: all twelve product descriptions written, Royal Oval and
> Celestial photographed, all four value-chain stages written, and **every price
> removed from the design**. The `price`, `unit` and `photoPending` fields are
> gone from the Products collection as a result. Full detail in
> `CONTENT-QUERIES.md`.

**Source of truth:** the live coded site at
<https://mingkey88.github.io/tienyan-website/>, which is itself built from the
Figma file `aUoVe8M7d2f92WZdUlhZLj` (revision of 21 Aug 2026). Where this document and the coded site
disagree, the coded site wins — it has already been through an accuracy pass
against the design.

**Target:** Wix **Studio** site `b4d2df60-ff1a-41dc-aac9-a6b014276c40`
(`joseph66643.wixstudio.com`), currently Free plan, Velo disabled, empty.

---

## 1. Decisions taken

| Decision | Choice | Why |
|---|---|---|
| Wix product | **Studio**, not classic Editor | Breakpoint-based responsive layout; Content Editor role protects the design from the client; site already exists |
| Account owner | **Mingjie's**, for now | Nothing blocks starting. Transfer or hand over at sign-off |
| Content model | **Hybrid** — lists in CMS, prose on canvas | Lists change and vary in count; prose does not. See §3 |
| Custom code | **None** | Every behaviour maps to a native element, so everything stays client-editable |
| Velo | **Stays off** | Nothing in the build needs it. Turning it on adds fragility and a maintenance burden the client cannot carry |

### Why no custom HTML embeds

This is the load-bearing constraint on the whole build. Anything entering Wix as
a custom element or embed is a black box: it cannot be styled by the theme, does
not participate in breakpoints, and — critically — **cannot be edited by the
client**. Since the entire point of this migration is that the client maintains
their own content, an embed defeats it. If a section seems to need one, that is
a signal to redesign the section, not to reach for code.

---

## 2. Site settings to fix first

The site was created with US defaults and they are wrong.

| Setting | Current | Set to |
|---|---|---|
| Language | en | en |
| Country | US | **Singapore** |
| Timezone | America/New_York | **Asia/Singapore** |
| Currency | USD | **pending — CONTENT-QUERIES Q17** |
| Search visibility | — | **Hide from search until sign-off** |

Currency is unresolved. The design draws a bare `$` and the client has not said
whether that is SGD or USD. Do not guess. Until it is answered, leave prices as
plain text rather than a currency-typed CMS field, so nothing implies a currency
the client did not choose.

**Keep the site hidden from search engines until the client signs off**, matching
the `noindex, nofollow` and `robots.txt Disallow: /` on the coded site.

---

## 3. The division: CMS vs canvas

The test is not "will this change?" — everything changes. It is **"are there many
of these, and does the count vary?"** If yes, it is a row in a collection. If no,
it is words on the canvas.

### Goes in the CMS — the client edits these from the dashboard

| Collection | Items | Drives |
|---|---|---|
| `Products` | 12 | Products page grid **and homepage Collection** |
| `Certificates` | 10 | Partnership carousel + filter |
| `ValueChain` | 4 | Partnership tabbed panel |
| `ContactCategories` | 5 | Contact "what to speak to us about" cards |

### Stays on the canvas — rarely changes, better edited in place

Hero headline and sub, heritage band, the "Today, Tien Yan…" band, Our Story
prose and timeline, Partnership hero, the Partner CTA, header, footer, and the
three legal stubs.

The client can still edit all of this as a **Content Editor** — they click the
text and type. They just cannot move or restyle it.

---

## 4. CMS collection schemas

Create these in the CMS before building any page, so repeaters have something to
bind to. Field keys are given because they matter for bindings; the client only
ever sees the display names.

### 4.1 `Products` — 12 items

| Display name | Key | Type | Notes |
|---|---|---|---|
| Name | `name` | Text | e.g. "Tien Yan Royal" |
| ~~Price~~ | — | **removed** | The 21 Aug revision deleted every price from the design. No price field. Q12/Q17 closed |
| Photo | `photo` | Image | 10 of 12 exist |
| Description | `description` | Rich text | **Supplied — Q24 closed.** All twelve written |
| Sort order | `sortOrder` | Number | Controls grid order; 10, 20, 30… so items can be inserted between |
| ~~Photo pending~~ | — | **removed** | All twelve grades now have photography. Q4/Q29 closed |

Seed data, in design order:

| # | Name | Price | Photo |
|---|---|---|---|
| 1 | Tien Yan Royal | $150 | ✓ |
| 2 | Tien Yan Noble | $130 | ✓ |
| 3 | Royal Oval | $120 | **missing — Q29** |
| 4 | Celestial | $110 | **missing — Q29** |
| 5 | Heritage Classic | $100 | ✓ |
| 6 | Heritage | $90 | ✓ |
| 7 | Imperial | $85 | ✓ |
| 8 | Sky Valley | $80 | ✓ |
| 9 | Sky River | $75 | ✓ |
| 10 | Sky Stream | $60 | ✓ |
| 11 | Sky Pearl | $55 | ✓ |
| 12 | Sky Crystal | $50 | ✓ |

Royal Oval and Celestial have no photography and must not reuse another grade's
photo. Three grades at three prices showing one nest misrepresents the product.
Leave `photoPending` true until the shoot happens.

#### The homepage Collection binds to this same collection

The homepage "Tradition Reimagined" section shows three cards — **Tien Yan
Royal, Tien Yan Noble and Tien Yan Imperial** — which are rows 1, 2 and 7 of
this collection, not separate content. Bind that section to `Products` with a
filter or a 3-item limit rather than hand-placing it.

This is worth doing deliberately, because the coded site demonstrates the
failure it prevents. There, the same three grades are written into two HTML
files and **they disagree**: `products.html` prices Royal at `$150`, while
`index.html` prices it at `$100/kg`. Both were placeholders, but nothing in the
markup could have caught the drift. One CMS row shown twice makes the two pages
structurally incapable of disagreeing.

The homepage cards carry two fields the Products grid does not — a short
description and an expandable detail panel — so the schema above needs:

| Display name | Key | Type | Notes |
|---|---|---|---|
| Short description | `shortDesc` | Text | Homepage card only. Currently "lorem ipsum" |
| Grade detail | `detail` | Rich text | The `+` disclosure panel. Currently "Grade detail to be supplied" |
| Unit | `unit` | Text | **Blank pending Q12** — see below |

**The price unit is unresolved and must not be guessed.** CONTENT-QUERIES Q12
records that the Products frame writes a bare `$150` while the homepage writes
`$100/kg`. Per-kilo and per-piece are not the same claim to a sourcing manager,
and the difference is commercially material. Keep `price` as free text and
`unit` blank until the client rules. Q12 also asks a prior question the client
has not answered: **should prices be public on a B2B supplier site at all?**

### 4.2 `Certificates` — 10 items

| Display name | Key | Type | Notes |
|---|---|---|---|
| Title | `title` | Text | Caption under the scan |
| Scan | `scan` | Image | |
| Category | `category` | **Reference or Tags** | **The client fills this in — Q27** |
| Issuer | `issuer` | Text | Optional |
| Sort order | `sortOrder` | Number | |

Seed data:

| # | Title |
|---|---|
| 1 | Certificate of Analysis — Finished Product |
| 2 | Halal Certificate |
| 3 | Certificate of Appointment from PT ESTA Indonesia TBK |
| 4 | Bird Nest Authenticity Certificate |
| 5 | Decree of Minister of Agriculture of the Republic of Indonesia |
| 6 | Certificate from the Agricultural Quarantine Agency |
| 7 | Veterinary Control Number Certificate |
| 8 | HACCP Certification, based upon SNI CXC 1:1969 |
| 9 | Bird's Nest Credit Alliance Registration and Certification |
| 10 | CNCA of the People's Republic of China, Registration No. 002 |

**This collection resolves Q27.** The coded site deliberately omits the
certificate filter the Figma draws, because there is no valid mapping from these
ten documents to the five categories and guessing which regulatory document
counts as "China Export Registration" is not a guess worth making. As a CMS
field, the mapping stops being anyone's guess — the client sets it, and the
filter starts working the moment they do.

Leave `category` **empty** on all ten rows. Do not pre-fill it.

### 4.3 `ValueChain` — 4 items

| Display name | Key | Type |
|---|---|---|
| Stage | `stage` | Text |
| Heading | `heading` | Text |
| Body | `body` | Rich text |
| Photo | `photo` | Image |
| Sort order | `sortOrder` | Number |

| # | Stage | Body |
|---|---|---|
| 1 | Regulatory & Export Readiness | written |
| 2 | Integrated Supply Chain | written |
| 3 | Quality Assurance | written |
| 4 | Custom Product Solutions | written |

All four now carry copy, supplied in the 21 Aug 2026 revision. Q20 is closed.

### 4.4 `ContactCategories` — 5 items

| Display name | Key | Type |
|---|---|---|
| Label | `label` | Text |
| Icon | `icon` | Image |
| Sort order | `sortOrder` | Number |

Product Catalogue · Trade Pricing and Bulk Orders · Customization for B2B
Partnership · Premium Wellness Gifting and Seasonal Partnerships ·
Collaboration Opportunities

---

## 5. Site theme

Set these **once** in Site Theme before touching any page. Every element then
inherits, and a later brand change is one edit rather than two hundred.

### 5.1 Colours

| Studio slot | Hex | Brand name |
|---|---|---|
| Main 1 | `#d41367` | Imperial Fuchsia · Pantone 214 C |
| Main 2 | `#72253d` | Deep Mulberry · Pantone 209 C |
| Main 3 | `#88754b` | Signature Gold · Pantone 871 C |
| Main 4 | `#e0a525` | Golden Amber · Pantone 2007 C |
| Main 5 | `#f8dbe1` | Blush Petal · Pantone 705 C |
| Accent 1 | `#f3dbb3` | warm cream — the design's cream, see below |
| Accent 2 | `#f1e4b2` | Champagne Cream · Pantone 7499 C |
| Accent 3 | `#75643e` | gold, text-safe variant |
| Text | `#1a1416` | ink |
| Text soft | `#5c4c52` | ink-soft |
| Page | `#ffffff` | paper |
| Page warm | `#fdfaf4` | paper-warm |

Two colours need care and are easy to get wrong:

- **`#f3dbb3` vs `#f1e4b2`.** The Figma uses `#f3dbb3` wherever the brand guide
  says Champagne Cream — the "Today, Tien Yan…" band and every footer column
  heading. Side by side they are not interchangeable: `#f1e4b2` reads yellow,
  `#f3dbb3` reads tan. The design file wins for those two uses. Logged as Q18.
- **Signature Gold `#88754b` fails WCAG AA as text** — 4.47:1 on white, 3.51:1
  on cream. Use it for hairlines, rules and the QC rail, where the 3:1 non-text
  threshold applies. **Gold text uses `#75643e`** — 5.76:1 on white, 4.52:1 on
  cream, same Pantone 871 C character.

### 5.2 Fonts

| Role | Font | Status |
|---|---|---|
| Display | **Grenda** | **BLOCKED — unlicensed.** See §9 |
| Display fallback | Cormorant Garamond | currently live |
| Body | Karla | available in Wix |
| Chinese | Noto Serif SC | available in Wix |

Studio accepts TTF, OTF, WOFF and WOFF2 uploads. The moment the Grenda licence
arrives it is one upload and one theme change.

### 5.3 Text styles — the hard translation

The coded site sizes type with CSS `clamp()`, which is continuous. **Studio has
no equivalent** — you set a discrete size per breakpoint. The arithmetic below
resolves each `clamp()` at a representative width inside each breakpoint band,
so the Studio site tracks the coded one closely.

| Style | Desktop 1201+ | Laptop 961–1200 | Tablet 641–960 | Mobile 320–640 |
|---|---|---|---|---|
| Display | **96** | 88 | 67 | 51 |
| H1 | **68** | 65 | 51 | 40 |
| H2 | **48** | 46 | 38 | 31 |
| H3 | **30** | 28 | 25 | 22 |
| Lead | **21** | 20 | 19 | 18 |
| Body | 16 | 16 | 16 | 16 |
| Small | 14 | 14 | 14 | 14 |
| Label | 12 | 12 | 12 | 12 |

All values px. Line heights: display 1.02, headings 1.14, body 1.65.
Letter-spacing: display −0.025em, label +0.18em with small caps in
`#75643e`.

### 5.4 Breakpoints

**Direction of travel flips here.** The coded CSS is mobile-first — 24
`min-width` queries against 4 `max-width` — so it builds upward from small.
Studio cascades downward: you design desktop, and edits trickle to smaller
breakpoints while edits on small ones do not travel back up.

The values still translate. These four capture where the coded layout actually
changes; `60rem` and `40rem` alone carry 9 of the 24 queries.

| Studio breakpoint | Range | Covers CSS at |
|---|---|---|
| Desktop | 1201+ | base / `68rem` (1088px) |
| Laptop | 961–1200 | `62rem` (992), `64rem` (1024) |
| Tablet | 641–960 | `48rem` (768), `52rem` (832), `56rem` (896), **`60rem` (960)** |
| Mobile | 320–640 | `30rem` (480), **`40rem` (640)** |

Studio allows up to six. Four is the recommendation — each extra one is another
full pass over eight pages, and the two that matter are covered.

**Build desktop first, then check downward.** Do not start on mobile.

---

## 6. Behaviour mapping

All 557 lines of JS become native elements. Nothing needs code.

| Coded file | Studio element | Client-editable after |
|---|---|---|
| `nav.js` (74) | Native header + menu | ✓ |
| `reveal.js` (77) | Scroll animations, entrance | ✓ |
| `carousel.js` (86) | **Slideshow Repeater** bound to `Certificates` | ✓ |
| `tabs.js` (64) | Radio-button filter + repeater on `ValueChain` | ✓ |
| `form.js` (127) | **Native Wix Forms** | ✓ |
| `product-card.js` (93) | Native accordion/toggle on the repeater item | ✓ |
| `whatsapp.js` (36) | Link button | ✓ |

Two notes:

- **Wix Forms replaces Formspree.** The coded site has a `FORMSPREE_ID`
  placeholder that was never filled. Native forms give the client a submission
  inbox in their own dashboard, which is strictly better and closes that item.
- **Tabs.** Studio's dedicated Tabs element could not be confirmed from the
  documentation. If it exists, use it. If not, the value chain becomes a
  radio-button filter over a repeater — the same mechanism as the certificate
  filter, so no extra concept to learn.

### Motion

Reveals are entrance animations, fade + rise, roughly **720ms** on an
exponential ease-out. Stagger repeater items rather than animating each by hand.
Nothing eases *in* on arrival. Keep it restrained — the coded site reveals once
per section, not per element.

---

## 7. Build order

Global chrome first. It is built once and every page inherits it, so eight pages
of work collapse into three sections plus content.

**Phase 0 — setup (Claude can automate most of this)**
1. Fix site settings — §2
2. Set the site theme — colours, fonts, text styles, breakpoints — §5
3. Create the four CMS collections — §4
4. Upload media to the Media Manager
5. Populate collection rows

**Phase 1 — global sections (build once)**
6. Header — logo, nav, mobile menu
7. Footer
8. Partner CTA band

**Phase 2 — homepage** (expect this to take a day while learning the tool)
9. Hero · 10. Heritage · 11. Collection — repeater on `Products`, limited to 3 · 12. Certificates strip

**Phase 3 — interior pages** (much faster once chrome exists)
13. Our Story · 14. Partnership + carousel + value chain
15. Products grid — first repeater bound to CMS
16. Contact — native form
17. Three legal stubs

**Phase 4 — responsive pass**
18. Desktop → Laptop → Tablet → Mobile, in that order, every page

**Phase 5 — handover**
19. Invite client as **Content Editor**
20. Build the Client Kit
21. Training session — §8

---

## 8. Client training plan

This is a deliverable, not an afterthought. Design the session around one idea:
**the client should almost never open the editor.**

### What they get

| Surface | What they do there | Risk |
|---|---|---|
| **Dashboard → CMS** | Products, certificates, value chain, contact categories. Add, edit, reorder, delete | None — cannot affect layout |
| **Dashboard → Forms** | Read enquiry submissions | None |
| **Editor, Content Editor role** | Edit fixed prose and swap photos | Low — cannot move, resize, restyle or delete |

### Session shape — about 90 minutes

1. **The map (10 min).** Two places: dashboard for lists, editor for words.
   Not "how Wix works."
2. **CMS, hands-on (35 min).** Add a product. Change a price. Reorder. Upload
   a photo. Fill in a certificate category and watch the filter change on the
   live site — that one lands the concept.
3. **Editing prose (20 min).** Open the editor as Content Editor. Change the
   hero sub. Show them that dragging does nothing — this is reassurance, and it
   is the moment they relax.
4. **Publishing (10 min).** Save vs Publish. That published means public.
5. **What to call you for (15 min).** New page, layout change, new section.
   Leave a one-page written cheat sheet — they will not remember the session.

### Before the session

Set the client's role to **Content Editor**, not Admin. Verify by opening the
site in an incognito window under their invite and trying to drag something.
Confirm it fails before they see it.

---

## 9. Blockers and open items

Carried over unchanged. None are caused by the migration; none are fixed by it.

| Item | Effect | Owner |
|---|---|---|
| **Grenda licence** — Q13 | Display type is Cormorant Garamond, not the design's face. Whole site reads slightly wrong | Client |
| ~~Currency — Q17~~ | **Closed.** The revision removed every price from the design | — |
| ~~Royal Oval + Celestial photography — Q29, Q4~~ | **Closed.** Both now have their own photograph | — |
| ~~Product descriptions — Q24~~ | **Closed.** All twelve supplied in the revision | — |
| ~~Value chain copy — Q20~~ | **Closed.** All four stages supplied | — |
| **Certificate categories** — Q27 | Filter inert until mapped | Client — now self-serve in CMS |
| **Featured certificate name** — Q28 | Captioned "Bird Nest Authority Certificate"; the document is a PT ESTA Certificate of Analysis, batch 002/INV/ESTA/2026 | Client |
| **Enquiry form fields** — Q25 | Design dropped 9 of 13 fields including CNCA/GACC compliance questions | Client |
| **Legal copy** | Privacy, Terms, Cookies are honest "in preparation" stubs | Client |
| **Premium plan** | Free plan cannot connect a domain or remove Wix branding | Mingjie/client |

The 21 Aug 2026 Figma revision closed four of these outright — descriptions,
value-chain copy, the two missing photographs, and pricing (by deleting it). Of
what remains, only **Q27 certificate categories** becomes self-serve through the
CMS. Q13, Q25 and Q28 still need a human answer.

---

## 10. Definition of done

- [ ] Eight pages built, matching the coded site at all four breakpoints
- [ ] Four CMS collections populated and bound
- [ ] Zero custom embeds
- [ ] Native form submitting to the dashboard
- [ ] Contrast re-verified — the theme changes grounds, so the audit is not inherited
- [ ] Client invited as Content Editor and role verified by trying to break it
- [ ] Client Kit built
- [ ] Training delivered, cheat sheet handed over
- [ ] Still hidden from search until sign-off

---

## 11. What Claude can and cannot do here

Stated plainly so effort lands in the right place.

**Can:** create and populate CMS collections, upload media, set SEO and site
settings, compute every value in this document, review the built result in a
browser, and write the training material.

**Cannot:** build a single section. The Wix MCP and REST surface is business
data only — stores, bookings, CMS, SEO, media, contacts. **There is no API for
pages, sections, elements, styles or breakpoints.** Every layout decision in
§7 Phases 1–4 is Mingjie in the editor, with exact values supplied.
