# Content queries — for the Art Director / Managing Director

**Nothing in this list has been changed on the site.** The copy is reproduced verbatim from
`TienYan_WebsiteContent.pdf` exactly as supplied. Every item below is a discrepancy found *between*
or *within* the source documents. Each needs a ruling from whoever owns the copy, and each is a
one-line fix once decided.

Ordered by how visible the problem is to a visitor.

---

## 1. The heritage brand is named two different ways — **most visible**

The website content document contradicts itself:

| Where | Says |
|---|---|
| Homepage | "Tien Yan traces its roots to **Hoo Ann Bird's Nest**…" |
| About Us — *Who is Tien Yan* | "Our story traces back to **Fu An Bird's Nest**…" |
| About Us — *Our Story* | "…roots to **Fu An Bird's Nest**", "**阜安 Fu An** was one of Singapore's respected…" |
| Sales deck p1 | "**Fu An Bird's Nest**" |
| Brand guide p5 | "**Fu An Bird's Nest**" |

As shipped, the homepage says *Hoo Ann* and the About page says *Fu An* — because that is what the
document says. A visitor reading both pages will notice.

**Also**, within the same About Us paragraph the spelling shifts from "Fu An" to "**Fu Ann**"
(double N): *"At its peak, Fu Ann exported to many countries…"*

> **Needed:** one spelling, used everywhere. Four of five sources say **Fu An**.

---

## 2. Typographical errors reproduced as supplied

These are in the source document and are live on the site. All are single-word fixes.

| Page | As supplied | Almost certainly should be |
|---|---|---|
| Why Tien Yan → Our Certifications | "Certificate from the **Agricultureal** Quarantine Agency" | Agricultural |
| Our Products → Royal Oval | "A natural beige **colo** with 3cm to 5cm in height." | color |

---

## 3. Certificate name differs between documents

| Source | Name used |
|---|---|
| Website content doc | "Bird Nest **Authority** Certificate" |
| Sales deck p5 | "Bird Nest **Authenticity** Certificate" |
| The certificate artwork itself | A *Certificate of Analysis* from PT ESTA's QC department |

The site uses **"Authority"** on the Why Tien Yan page, following the website content doc.

> **Needed:** confirm which is the correct legal name of this document.

---

## 4. Two products have no photography anywhere

**Royal Oval** and **Celestial** are listed in the website content doc but appear in no photograph
in any supplied file. The sales deck shows only 10 products; the website doc lists 12.

They currently show a marked "Photography to follow" placeholder in brand colours. No substitute
image has been used, because passing off another grade's photograph as these two would be
misleading to a trade buyer.

> **Needed:** photographs of Royal Oval and Celestial, shot on the same black background as the
> existing ten. Drop them into `assets/products/` as `royal-oval.jpg` and `celestial.jpg`.

---

## 5. Number of quality-control steps differs

| Source | Steps |
|---|---|
| Website content doc | **7** (Sorting → Packing) |
| Sales deck p2 | **8** — adds "08 Ready to Distribute" |

The site shows **7**, following the website content doc. "Ready to Distribute" reads as an outcome
rather than a process step, so the two documents may not actually disagree in substance.

---

## 6. Vision statement differs

| Source | Wording |
|---|---|
| Website content doc | "To be **one of the world's** most trusted names in premium edible bird's nest." |
| Brand guide p2 | "…our vision to become **Asia's** most trusted brand…" |

The site uses the website content doc wording.

---

## 7. A claim worth legal review — **raised as a concern, not a correction**

This one is not a typo, and it is the only item on this list with commercial risk.

- The **Certificate of Appointment** (sales deck p5) names Tien Yan the *"Official International
  Distribution Partner"* of PT ESTA Indonesia.
- The **website copy** says Tien Yan combines *"integrated sourcing, processing, and manufacturing"*
  and elsewhere claims *"complete control across sourcing, processing, and packaging."*

A distributor asserting ownership of manufacturing control is the kind of claim a procurement team
may challenge during due diligence, and which a competitor could contest.

The copy is live **exactly as supplied** — it has not been softened. Flagging it so the decision
sits with whoever owns the claim.

---

## 8. Brand guide misspells the company name

The brand guide PDF is titled *"Tien Yen_BrandGuide_Final"* and uses "Tien **Yen**" in its body copy
on p12 and p22 (and the sales deck does on p3).

The site uses **"Tien Yan"** throughout, confirmed against the business card, letterhead, envelope,
the `tienyan.com` domain, the guide's own footer on all 33 pages, and the pinyin for 天燕.

> **Worth telling the AD**, since the error is in the guide itself and may propagate to print.

---

# Homepage redesign — queries raised by the Figma frame

Raised 20 Aug 2026 against **Figma "Tien Yan"** `0K2glnwVTs6E7C6yAJlXrz`, frame `1:4 HomePage`,
supplied by the art director. Nothing below was changed unilaterally; the frame was built as drawn
and every disagreement is recorded here.

## 9. Navigation labels do not match the pages they open

The frame's primary nav reads **Home · Our Story · Partnership · Products · Enquiry**. The pages
that exist are `about.html` ("About Us"), `why.html` ("Why Tien Yan"), `products.html`
("Our Products") and `contact.html` ("Contact Us").

Built with the Figma's labels pointing at the existing pages — so a visitor clicks *Our Story* and
lands on a page headed *About Us*. Either the labels or the page headings need to move.

Note the frame's own footer disagrees with its own nav: the footer Company column says
**About Us** and **Why Tien Yan**, the nav says **Our Story** and **Partnership**.

**Resolved 20 Aug 2026.** The other Figma frames settle it: the designer renamed the *pages*, not
just the links — the frames are named `Our Story` and `Partnership`. So this is a page rename, and
the nav is already correct. `about.html` → Our Story, `why.html` → Partnership.

> **Action, not a question:** rename the pages and their headings to match.

## 10. The withheld phone number is published in this frame

The previous build withheld **+65 9800 7226** from the footer and disabled the WhatsApp action,
both marked *pending sign-off*. The supplied frame prints the number in the footer contact column.

Taken as sign-off and published, in the footer and on the hero's *WhatsApp Us* action
(`https://wa.me/6598007226`).

> **Confirm this was intended.** If the number is not meant to be public, or WhatsApp is a
> different line, both need reverting before launch.

## 11. Product card descriptions are placeholder text

All three cards read **"lorem ipsum"**. Rendered verbatim and marked `data-placeholder="true"`
so they are greppable; the expandable detail panels read "Grade detail to be supplied."

> **Needs copy** for Tien Yan Royal, Tien Yan Noble and Tien Yan Imperial.

## 12. Every grade is priced identically, and pricing is public

All three cards show **$100/kg**. Three different grades at one price is almost certainly
placeholder, but the larger question is prior to it: the rest of the site is built as a B2B
supplier record that routes buyers to an enquiry form, and published per-kilo pricing is a
commercial decision, not a design one.

**Partly resolved 20 Aug 2026.** The Figma's **Products** frame (`70:159`) carries real, distinct
prices for all twelve grades, so the homepage's identical `$100/kg` is definitely placeholder:

| Grade | Price | | Grade | Price |
|---|---|---|---|---|
| Tien Yan Royal | $150 | | Imperial | $85 |
| Tien Yan Noble | $130 | | Sky Valley | $80 |
| Royal Oval | $120 | | Sky River | $75 |
| Celestial | $110 | | Sky Stream | $60 |
| Heritage Classic | $100 | | Sky Pearl | $55 |
| Heritage | $90 | | Sky Crystal | $50 |

The three homepage cards should therefore read **$150 / $130 / $85**, not $100/kg each.

> **Still needs a ruling:** should prices be public on a B2B supplier site at all? And the unit is
> inconsistent — the Products frame writes bare `$150`, the homepage writes `$100/kg`.

## 13. The frame is set in Grenda throughout

Every text layer in the frame — headings, body, nav, buttons, footer — specifies
**Grenda Regular**. Grenda is commercially licensed and not available to this project; see
FONTS.md. The build uses Cormorant Garamond for display and Karla for body, as established.

This means **the page will not look like the Figma** at the type level until the licence is bought.
The substitution is a one-line change in `tokens.css`.

> **Decision needed:** buy the Grenda webfont licence, or accept the stand-in and have the AD
> re-approve the type.

## 14. Chinese is set in a different face than the brand build uses

The frame sets 天赐珍燕，世代传承 in **Microsoft YaHei** (a sans). The build uses **Noto Serif SC**,
chosen to sit with the serif display face. The frame's choice pairs with Grenda; the build's pairs
with Cormorant Garamond.

> **Worth confirming with the AD**, and it resolves itself if Q13 is resolved.

## 15. Footer legal links point at three pages that do not exist

The frame's footer carries **Privacy Policy**, **Terms of Use** and **Cookie Policy**. There are no
such pages, and no copy for them in any supplied document. Built as links to `privacy.html`,
`terms.html` and `cookies.html`.

> **Blocks launch.** Three dead links. Either the pages get written or the links come out.
> A cookie policy in particular may be a legal requirement depending on the analytics used.

## 16. The three featured grades do not match the footer's series names

The collection section features **Tien Yan Royal**, **Tien Yan Noble** and **Tien Yan Imperial**
under the heading "Tien Yan's Signature Raw Nest Collection". The same frame's footer lists the
product range as **Royal Series**, **Heritage Series** and **Sky Series**.

It is not stated whether the three featured grades are the Royal Series, one from each series, or a
separate signature tier. `products.html` currently carries twelve grades.

> **Needs clarification** before the *View All Products* link can point anywhere more precise than
> the products index.

## 17. Is `$` Singapore dollars or US dollars?

Every price in the Figma is written with a bare `$` — `$150`, `$100/kg`. Tien Yan is a Singapore
company (`Tien Yan Pte. Ltd.`, 10 Jalan Kilang) selling into export markets, so `$` is genuinely
ambiguous between **SGD** and **USD**, and the difference is roughly 35%.

The new Wix site currently defaults to USD, and the previous build never displayed a price at all,
so nothing has been assumed either way.

> **Needs a ruling** before any price is published. If both currencies are needed for different
> markets, that is a CMS field, not a copy decision.

---

## 18. The frames use a different cream than the brand guide

Two places set what should be Champagne Cream: the "Today, Tien Yan…" band on Our Story, and every
footer column heading. The frames specify **`#f3dbb3`**; the brand guide's Champagne Cream is
**`#f1e4b2`** (Pantone 7499 C).

These are not interchangeable. `#f1e4b2` reads yellow, `#f3dbb3` reads tan, and side by side at the
size of a full-width band the difference is obvious. Built with the frame's value, as `--c-cream-warm`
in `tokens.css`, since the design file is the more recent client artifact and the instruction was to
follow it exactly.

> **Worth a ruling from the AD.** Either the brand guide's swatch is wrong, or the Figma drifted.
> One of the two documents should be corrected so the next build does not have to guess.

## 19. The Our Story redesign drops two sections that exist today — **content loss**

The previous About page carried five sections. The Figma's Our Story frame carries a different five,
and the overlap is partial:

| Previous About page | Figma "Our Story" |
|---|---|
| Our Vision | *(gone)* |
| Our Story | Our Story — rewritten as a 1950 / 2026 timeline |
| People Behind Tien Yan | *(gone)* |
| — | What makes Tien Yan's Bird Nest different? |
| — | Health Benefits |
| — | Characteristics of High Quality Bird's Nest |

So **the vision statement and the founding-team section are not in the redesign.** Both were built
from the supplied content documents and both are still in git history at `a14a8b4:about.html`.

Nothing was merged in unilaterally — the frame was built as drawn.

> **Needs a ruling.** Were these deliberately cut, or did the frame simply not get to them?
> The founding team in particular is unusual to drop from a heritage brand's story, and the
> vision statement came from the client's own content document.

---

## 20. Three of the four value-chain tabs have no content — **blocks the page**

The End-to-End Value Chain section (frame 48:93) is a four-tab interface:

| Tab | Content in the frame |
|---|---|
| Regulatory & Export Readiness | *none* |
| Integrated Supply Chain | *none* |
| Quality Assurance | heading, one paragraph, one photograph |
| Custom Product Solutions | *none* |

Only Quality Assurance is drawn. The other three tabs exist as labels with nothing behind them.

Built as a real tablist with all four tabs present and the three empty panels reading
"Copy for this panel is not in the supplied design and has not been written." Nothing was invented.

> **Needs copy for three panels.** These are four claimed advantages of working with Tien Yan and
> three of them currently say nothing — on the page whose whole job is to win partners.

## 21. Inactive tab colour fails contrast

The frame greys the three inactive tabs to **`#9c9a9a`**, which measures **2.8:1** on white. That
fails WCAG AA for text (4.5:1) and fails even the 3:1 non-text threshold.

Built with Ink Soft `#5c4c52` instead — same recessive reading, 8:1, and still clearly behind the
active tab, which additionally carries a fuchsia underline and heavier weight so the state is not
signalled by colour alone.

> **Flagging, not asking.** The build will not ship text at 2.8:1. If the AD wants a lighter grey,
> anything at or above 4.5:1 on white is fine.

## 22. Two Partnership photographs are placeholders

The hero (664×562) and the Quality Assurance panel (608×410) need photographs that exist only in
the Figma. They could not be exported — the Figma MCP quota ran out mid-build — so the nearest
equivalents already in the repo stand in at roughly a quarter of the required resolution:

| Slot | Standing in | Needed |
|---|---|---|
| Partnership hero | `assets/process/03-feather-removal.jpg` (238×159) | 664×562 |
| Quality Assurance panel | `assets/process/05-grading.jpg` (232×155) | 608×410 |

Both are marked `PLACEHOLDER-IMAGE` in `partnership.html`. Swapping each is a one-line `src`
change. The nine certificate scans in the carousel are full resolution and need no replacement.

## 23. Two more copy inconsistencies inside the Figma itself

- **Certification heading.** The homepage frame reads "Built on Quality**.** Backed by
  Certification**.**" (two sentences). The Partnership frame reads "Built on Quality**,** Backed by
  Certification" (one clause, no full stop). Both built as drawn, so the site currently shows both.
- **Certificate name.** The Partnership frame captions the carousel "Bird Nest **Authority**
  Certificate". Every supplied content document, and the previous build, calls it the
  "Bird Nest **Authenticity** Certificate". The documents' name was used.

> Related to Q3, which already records a certificate name differing between source documents.

---

## 24. The Products redesign drops every product description — **content loss**

The Figma's Products frame shows a photograph, a name and a price per grade. Nothing else. The
previous build carried a one-line description for all twelve, taken from the client's own content
document, and the redesign has no room for them.

They are not reproduced on the rebuilt page. Preserved here in full so reinstating them is one
paragraph per card:

| Grade | Description |
|---|---|
| Tien Yan Royal | Tien Yan Royal Nest comes from Kalimantan. A natural beige color with >3.5 cm in height. |
| Tien Yan Noble | Tien Yan Noble Nest comes from Kalimantan. A natural beige color with 3 cm to 3.5 cm in height. |
| Royal Oval | Royal Oval comes from Kalimantan. A natural beige color with 3 cm to 5 cm in height. |
| Celestial | Celestial comes from Kalimantan caves. A natural beige color with 3 cm to 3.5 cm in height. |
| Heritage Classic | Heritage Classic comes from Kalimantan. A natural beige color with >5 cm in height. |
| Heritage | Heritage comes from Kalimantan. A natural beige color with 3 cm to 5 cm in height. |
| Imperial | Imperial comes from Kalimantan. A natural beige color cup shape with >5 cm in height. |
| Sky Valley | Sky Valley comes from Kalimantan. A natural beige color with size medium to large with >3 cm in height. |
| Sky River | Sky River comes from Kalimantan. A natural white color in shape of small to big stripes. |
| Sky Stream | Sky Stream comes from Kalimantan. A natural beige color in shape of small stripes. |
| Sky Pearl | Smaller pieces of Bird's Nest, these parts of nest are best choice for food & beverage in the market. |
| Sky Crystal | Sand-like pieces of Bird's Nest, these parts of nest are best choice for cosmetics and supplements in the market. |

> **Recommend reinstating them.** A sourcing manager comparing twelve grades needs the origin and
> the size range — that is precisely the information that distinguishes a $150 grade from an $85
> one. Without it the page is twelve photographs and twelve numbers.
>
> This is a recommendation, not a change: the page ships as the frame draws it.

---

---

## Internal notes that were deliberately *not* published

The contact form specification in the website content doc contains two parenthetical notes written
to the site owner, not to the visitor:

- *"This is vital since exporting bird's nest, especially to China, requires strict CNCA/GACC
  regulatory compliance"*
- *"Helps you prioritize high-value leads"*

These are instructions to whoever builds the form, so they are not shown on the page. The fields
they describe are both present. Flagging it in case they were meant as visitor-facing helper text.
