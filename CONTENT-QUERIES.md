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

## 4. Two products have no photography anywhere — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


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

## 11. Product card descriptions are placeholder text — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


All three cards read **"lorem ipsum"**. Rendered verbatim and marked `data-placeholder="true"`
so they are greppable; the expandable detail panels read "Grade detail to be supplied."

> **Needs copy** for Tien Yan Royal, Tien Yan Noble and Tien Yan Imperial.

## 12. Every grade is priced identically, and pricing is public — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


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

## 17. Is `$` Singapore dollars or US dollars? — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


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

## 20. Three of the four value-chain tabs have no content — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


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

## 22. Two Partnership photographs are placeholders — **RESOLVED 20 Aug 2026**

Both have been replaced with the designer's own exports, downscaled to 2x display size
(`assets/figma/partnership/hero.webp` and `quality.webp`). The asset URLs captured before the quota
ran out were still valid, so no further Figma calls were needed. Original note follows.

### Original

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

## 24. The Products redesign drops every product description — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


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

## 25. The enquiry form loses nine fields — **the most consequential change in the redesign**

The previous form carried thirteen fields, eight of them required. The Figma's Contact frame draws
four: Full Name, Phone Number, Email, Message.

| Field | In the redesign |
|---|---|
| Full Name | kept |
| Phone Number / WhatsApp / WeChat | kept, shortened to "Phone Number" |
| Business Email Address | kept, shortened to "Email" |
| Message / Additional Inquiry | kept, shortened to "Message" |
| Job Title / Position | **gone** |
| Company Name | **gone** |
| Country / Region of Operation | **gone** |
| Company Website or Social Media Page | **gone** |
| Business Registration / License Number | **gone** |
| Type of Business | **gone** |
| Years in Business | **gone** |
| Do you currently possess food/agricultural import licenses? | **gone** |
| Estimated Monthly Order Volume | **gone** |

This matters more than it looks. The client's own website content document specified those fields
and gave the reason, in a note written to the site owner rather than the visitor:

> *"This is vital since exporting bird's nest, especially to China, requires strict CNCA/GACC
> regulatory compliance"* — and *"Helps you prioritize high-value leads"*

As drawn, the form cannot tell a licensed importer placing monthly container orders from a
member of the public who liked the photographs. Every enquiry arrives identical.

Built as the frame draws it. Not changed unilaterally.

> **Strong recommendation to reinstate at least** Company Name, Country/Region, Business
> Registration, import licences and Estimated Monthly Order Volume. If the four-field form is a
> deliberate choice to reduce friction, that is a legitimate trade — but it should be a decision
> someone made, not one the layout made for them.

## 26. The five "Speak with our team about" cards have no icons

The Contact frame draws an icon above each of the five cards. Those assets could not be exported —
the Figma MCP quota ran out mid-build — so the cards ship with their labels only, vertically
centred.

No substitutes were used. A generic icon that means something adjacent is worse than none: it
implies a category the brand has not chosen.

> Same fix as Q22 — export the five icons and drop them in; the markup slot is ready.

---

## 27. The certificate "chips" are a filter in the frame, not a list — **RESOLVED 21 Aug 2026**

The Partnership certificates section draws five category labels, four in grey `#9c9a9a` and
**Batch Quality Verification** in Imperial Fuchsia — an active state. It is a filter, not a list of
tags, and the certificate shown below it is the one matching the active category.

Not built as a working filter. Doing so needs a mapping from the ten certificates to these five
categories, and no such mapping exists in any supplied document. Guessing which regulatory document
counts as "China Export Registration" versus "Certificate of Appointment" is not a guess worth
making — a misfiled certificate is worse than an unfiltered list. The five are rendered as the
factual list of certification types held, at the frame's 20px, above a carousel of all ten.

Note also that the inactive grey is the same `#9c9a9a` recorded in Q21, at 2.8:1.

> **To build the filter, supply the mapping** — which of the ten certificates belongs under each
> of the five headings. It is then a small change.

## 28. The featured certificate is captioned as the wrong document

The frame captions the certificate in its carousel **"Bird Nest Authority Certificate"**.

The document in the image is not that. It is a **PT ESTA Indonesia Certificate of Analysis,
Finished Product** — a batch quality report for invoice 002/INV/ESTA/2026 dated 30 January 2026,
recording sialic acid at 10.9%, moisture at 17.2%, sulphur dioxide not detected, conclusion
"Passed tested".

Two things follow. First, the frame's own active filter is **Batch Quality Verification**, which is
exactly what a certificate of analysis is — so the filter and the image agree and only the caption
is wrong. Second, this document is **not among the nine certificate scans in the repository**; it
came only from the design file, and has been added to the carousel as a tenth.

Built with the document's own title, "Certificate of Analysis — Finished Product".

> **Confirm the caption.** A certificate of analysis and an authenticity certificate are different
> documents with different evidential weight, and this page exists to be evidence.

---

## 29. The frame reuses one photograph for three different grades — **RESOLVED 21 Aug 2026**

> **RESOLVED — Figma revision `aUoVe8M7d2f92WZdUlhZLj`, 21 Aug 2026.** See the
> revision note at the end of this file.


Q4 records that Royal Oval and Celestial have no photography. The Products frame works around it by
using **Tien Yan Royal's photograph in all three slots** — Tien Yan Royal, Royal Oval and Celestial
share a single asset.

Not reproduced. On a page where a sourcing manager selects a grade partly by how the nest looks,
showing the same nest under three names and three prices — $150, $120 and $110 — tells the buyer
something untrue about the product. Both slots read "Photography to follow" instead.

> **One line each to change** if the intent was deliberate. But the fix is two photographs.

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

---

# Revision of 21 Aug 2026 — Figma `aUoVe8M7d2f92WZdUlhZLj`

A revised design file was supplied on 21 Aug 2026. It resolves **seven** logged
queries and opens **one** new one. Nothing below was inferred; every item is a
direct reading of the new frames.

## Closed by this revision

| # | Query | How the revision resolves it |
|---|---|---|
| Q4 | Royal Oval and Celestial have no photography | Both now have their own photograph on the Products frame. The honest "Photography to follow" placeholders are gone. |
| Q11 | Card copy reads "lorem ipsum" | All three homepage cards now carry real grade descriptions. |
| Q12 | Every grade priced identically; is pricing public? | **Every price has been removed from the design.** The question is answered by deletion — pricing is not public. |
| Q17 | Is `$` SGD or USD? | Moot. There are no prices anywhere in the revision, so no currency needs deciding. |
| Q20 | Three of four value-chain tabs have no copy | All four stages now have written copy. Reproduced verbatim. |
| Q24 | Every product description dropped | All twelve grades now carry a description. Reproduced verbatim. |
| Q29 | One photograph reused for three grades | The Products frame now has twelve distinct photographs. |

**On Q12 and Q17.** These closed by *removal*, which is worth stating plainly: the
build no longer displays a price, a currency, or a unit anywhere. If the client
expects prices on the site, the revision has removed them by mistake and this
needs raising before launch. Nothing in the build invents one back.

## 30. The homepage reuses Royal's photograph for Royal Oval — **new**

The revision's homepage Collection shows Tien Yan Royal, Tien Yan Noble and
**Royal Oval** (replacing Tien Yan Imperial). Royal Oval's card points at the
same image fill as Tien Yan Royal's — the same problem Q29 logged, in a new
place.

It is not reproduced, because this time there is a correct answer available: the
Products frame in the same file supplies a genuine, distinct Royal Oval
photograph. The homepage card uses that one. Both pages now read from
`assets/figma/products/royal-oval.webp`.

> **Needs confirmation:** was the homepage reuse deliberate — a crop the designer
> preferred — or a leftover from before Royal Oval had its own photograph? If
> deliberate, say so and it will be reproduced exactly.

## Still open after this revision

Q13 (Grenda licence), Q18 (cream divergence), Q19 (Our Story sections dropped),
Q25 (enquiry form loses nine fields), Q27 (certificate filter has no category
mapping), Q28 (featured certificate captioned as the wrong document).

Q25 and Q28 are the two that still carry real risk. The form still collects four
fields where the previous site collected thirteen, and the featured certificate
is still captioned "Bird Nest Authority Certificate" when the document is a
PT ESTA Certificate of Analysis for batch 002/INV/ESTA/2026.

---

## 31. Is the value chain a tab component or a stacked list? — **RESOLVED 21 Aug 2026**

The Partnership frame draws a row of four labels with the first in Deep
Mulberry and the other three in grey `#9c9a9a`, which reads like a tab
component with one tab selected. It then lays **all four panels out down the
page** at real coordinates.

Built as a stacked list with the labels as in-page anchor links, because the
panels sit inside the page flow **ahead of the Partner CTA (y=4356) and the
footer (y=4589)**. If they were state documentation for a tab component they
would not push the footer down by two thousand pixels.

> **RESOLVED — the client confirmed one card at a time.** Rebuilt as an ARIA
> tablist: arrows move between tabs, Home/End jump to the ends, only the
> selected tab is in the tab order. Without JavaScript the tab row is hidden
> and all four panels show under their own headings, so nothing is lost.
>
> The stacked layout in the frame is therefore the four states drawn out so
> each could be specified, not the page layout. Worth remembering for the Wix
> build: a frame that lays out every state of a component reads as a long page
> until you ask.

## 32. The Send button changed from Golden Amber to Imperial Fuchsia

The previous build set the enquiry form's submit in Golden Amber with black
text, recorded at the time as "the one action in the whole design that is not
Imperial Fuchsia". The 21 Aug revision draws it `#d41367` with white text at
24px, and the label is **"Send"**, not "Send a Message".

Reproduced as drawn. Noting it because a deliberate exception disappearing is
worth a second look — if the amber submit was intentional and its removal was
accidental, this is where to catch it.

## 33. The inactive value-chain labels fail contrast — carried over from Q21

The frame greys them to `#9c9a9a`, which measures 2.8:1 on the page ground and
fails even the 3:1 non-text threshold. Raised to Ink Soft: the same recessive
reading at 8:1, still clearly behind the current item. This is a deliberate
deviation from the frame, and the only one on the Partnership page.

---

# Certificate filter — built 21 Aug 2026, mapping still needed

The client asked for the type chips to filter the carousel, and for it to show
up to three certificates per view. Both are built. The filter is real: clicking
a type shows the certificates assigned to it, and the count is announced.

**Five of the ten are assigned**, and only where the document's own title names
its category. Nothing was inferred from context.

| Certificate | Assigned to | Why |
|---|---|---|
| Halal Certificate | Halal Certified | The document is a halal certificate |
| HACCP Certification, based upon SNI CXC 1:1969 | HACCP-Certified Production | Names HACCP |
| Certificate of Appointment from PT ESTA Indonesia TBK | Certificate of Appointment | Names it |
| Certificate of Analysis — Finished Product | Batch Quality Verification | A certificate of analysis for batch 002/INV/ESTA/2026 is batch verification, and the frame's own active chip when showing this document is Batch Quality Verification |
| CNCA of the PRC, Registration No. 002 | China Export Registration | CNCA is China's Certification and Accreditation Administration |

**Five are unassigned** and appear only under "All certifications":

- Bird Nest Authenticity Certificate
- Decree of Minister of Agriculture of the Republic of Indonesia
- Certificate from the Agricultural Quarantine Agency
- Veterinary Control Number Certificate
- Bird's Nest Credit Alliance Registration and Certification

Each of these is *plausibly* China-export or batch-quality related — a
veterinary control number and a quarantine certificate are both commonly part
of a China export dossier — but plausible is not the standard. Assigning a
regulatory document to a category it does not name puts a compliance claim on
the page that no document supports.

> **Needed:** which of these five belongs under which type. A certificate may
> sit under more than one. Adding them is one `data-cert-cats` attribute each
> in `partnership.html`, about a minute's work once the answer exists.

## A note on the expected counts

The client expected Halal to have around three certificates. **Only one of the
ten documents in the repository is a halal certificate** — MUI/BPJPH number
ID00410016946140324, issued to PT ESTA Indonesia. If there are two more, they
have not been supplied. Worth checking before launch: a filter that shows one
certificate where the client expects three reads as broken, when in fact it is
reporting the truth about what it has.

## 34. Three certificates per view is a departure from the frame

The frame draws **one** certificate at 432x639 between the arrows. The client
asked for up to three per view, so the row now shows three at 1088px and above,
two on tablet, one on a phone — below roughly 260px wide a certificate scan
stops being legible. Recorded because it is a deliberate difference from the
design, made on the client's instruction rather than the builder's judgement.

---

# Content document v2 — received 21 Aug 2026

The client supplied *Tien Yan - Website - Copy - v2 (with Louise comments)*.
It closes Q27 outright and raises seven fresh discrepancies against the Figma.

## Q27 closed — the full certificate mapping

| Type | Certificates | n |
|---|---|---|
| Halal Certified | Halal Certificate | 1 |
| HACCP-Certified Production | HACCP Certification, SNI CXC 1:1969 | 1 |
| China Export Registration | Bird's Nest Credit Alliance Registration · CNCA Registration No. 002 | 2 |
| Batch Quality Verification | Veterinary Control Number · Bird Nest Authority · Agricultural Quarantine · Decree of Minister of Agriculture · *(Certificate of Analysis — see below)* | 5 |
| Certificate of Appointment | Endorsement by PT ESTA Indonesia TBK | 1 |

All ten certificates are now assigned. Nothing is inferred.

**Halal holds one certificate, not three.** The expectation of three is not borne
out by the document — it lists exactly one, matching what is in the repository.

**The document lists nine certificates; the site has ten.** The extra is the
**Certificate of Analysis — Finished Product** (batch 002/INV/ESTA/2026). It is
kept under Batch Quality Verification: it is literally a batch analysis, and the
Figma's own active chip when displaying it is Batch Quality Verification. Flagged
because it is the one assignment the document does not explicitly make.

**This sharpens Q28 rather than settling it.** The document says *"Bird Nest
Authority Certificate"*; the repository holds a *"Bird Nest Authenticity
Certificate"*. Authority and authenticity are different claims. Whether these are
one document under two names, or two documents of which one is missing, still
needs answering.

## New conflicts — document v2 against the Figma

Per the standing rule the Figma wins and the difference is logged. **None of the
copy below was changed.**

| # | Where | Document v2 | Figma / live site |
|---|---|---|---|
| 35 | Homepage featured products | Tien Yan Royal · **Royal Oval** · **Celestial** | Tien Yan Royal · **Tien Yan Noble** · Royal Oval |
| 36 | Homepage certifications button | `[See Our Certifications]` | "View All Certifications" |
| 37 | Homepage certifications | Carries a sub-line: *"Halal certified. HACCP-Certified Production. Batch quality certification."* | No sub-line |
| 38 | Partnership → Partner with Tien Yan | `[Whatsapp Us]` | "Contact Us" |
| 39 | Contact form | Name · Email Address · Message (**3 fields**) | Full Name · Phone Number · Email · Message (**4 fields**) |
| 40 | Our Story, 2026 paragraph | *"Dato Seri Elliot Lim partnered with PT ESTA Indonesia"* | *"Dato Seri Elliot Lim, **together with Tien Yan's co-founders**, partnered with"* |
| 41 | Products page | Opens with *"Explore our range of premium Indonesian edible bird's nests."* | No intro line |

**Q35 is the one to settle first.** Which three grades lead the homepage is a
commercial decision, and the two sources disagree on two of the three.

**Q39 interacts with Q25.** The previous site collected thirteen fields, the
Figma four, and this document three. The trend is downward, and the CNCA/GACC
compliance questions are gone from all three. If those were dropped by accident
rather than decision, this is the moment to catch it.

**Q38 is worth noting for the shared component.** Partner with Tien Yan is one
Figma component instanced on all five pages, so it cannot say "Contact Us" on the
homepage and "Whatsapp Us" on Partnership without being split into two.

---

# Figma revision v3 — `HNjJcPRP5tuzVxqPOtX2JR`, 25 Aug 2026

A third design file. Applied throughout; three items are logged rather than
built, and one correction is worth reading first.

## A pairing error in v2 that v3 fixes

The "what makes Tien Yan different" badges were **mismatched in v2 and therefore
on the live site**: Naturally Pure carried the EBF 10+ badge and EBF 10+ Quality
Standard carried GMO Free. v3 swaps them into the right order and the site now
matches. Worth knowing because the live site was making a wrong claim visually
for four days.

## 42. "BIrd's Nest" — a capitalisation typo in six product descriptions

Six of the twelve v3 product descriptions read **"BIrd's Nest"** with a capital
I. Reproduced as supplied, per the standing rule and the precedent set in Q2,
but this one is visible on a live page six times over and reads as broken rather
than as a style choice.

> **Needs a ruling.** One line to fix once confirmed. The affected grades are
> Tien Yan Royal, Tien Yan Noble, Heritage Classic, Heritage, Imperial and
> Sky Valley.

Also note the Products page uses "BIrd's Nest **comes from** Kalimantan" for two
grades and "**from** Kalimantan" for the rest, while the homepage uses "from"
throughout. Both reproduced as drawn.

## 43. The Download Catalogue button has no catalogue — **not built**

v3 adds a 280x50 fuchsia **Download Catalogue** button at the foot of the
Products page. No catalogue file exists in the repository or has been supplied,
so the button would 404 on click.

Not built. A download button that downloads nothing is a dead control, the same
reasoning that keeps the certificate chips a plain list without JavaScript.

> **Needed:** the catalogue PDF. The button is ten minutes once it exists.

## 44. The footer's Downloads column has nothing to link to — **not built**

v3 restructures the footer to **Our Story · Partnerships · Products · Downloads ·
Contact Us**, where Downloads lists "Product Catalogues" and "Videos". Neither
exists.

The column headings are a structural change worth making; the two items under
Downloads are not, for the same reason as Q43. The footer is unchanged pending
those files, so its columns still read Company · Products · Quality · Contact Us.

> **Needed:** the catalogue and video assets, or a decision to drop the column.

## Applied from v3

Phone corrected to **+65 8548 7226** across all pages · badges re-paired ·
15 product descriptions reworded · Partnership gains a "Partnerships" page title
with the hero heading recoloured gold at 48px and its body at 30px · Custom
Product Solutions reworded · EBF line drops "competitive" · Our Story timeline
restructured to a centred vertical stack with the archive photograph of
19 North Canal Road replacing the line drawing · Health Benefits replaces the
bowl photograph with Louise Thean and Lena Thean · Characteristics replaces line
icons with photographs on solid white cards · heritage, partnership hero and the
three homepage certificates all replaced · Partner with Tien Yan removed from
Our Story, Products and Contact · full stops added to six headings ·
"Speak with our team about:" raised to 48px.
