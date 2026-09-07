# Fonts

## Current state

The brand guide (p24) names **Grenda** as the primary typeface. Grenda is a commercial font by
**Yukita Creative** and **cannot legally be self-hosted on a public website without a webfont
licence**. The versions circulating on free font sites are licensed for *personal use only* —
using one on a company website would be a licence breach.

So the site currently ships a stand-in:

| Role | Shipping now | Brand guide specifies |
|---|---|---|
| Display / headings | Cormorant Garamond (SIL Open Font Licence) | Grenda |
| Body / UI | Cormorant Garamond (SIL Open Font Licence) | Grenda in the current Figma |
| Chinese | Noto Serif SC (SIL Open Font Licence) | 方正清刻本悦宋简体 |

Both shipping font families are served from Google Fonts. The 7 Sep 2026 update
uses the same serif for headings, body text and UI, matching the current Figma.
Karla is no longer requested.

The guide's own documented web-safe fallbacks (Georgia, Microsoft YaHei, p26–27) are already in the
CSS font stacks, so the site degrades to a brand-compliant state if webfonts fail to load.

---

## How to buy the Grenda webfont licence

1. **Ask the Art Director first.** They designed the brand guide, so they most likely already
   bought a desktop licence and will know which vendor and seat count. Buying twice is a waste.
2. If you need to buy it yourself, Grenda is sold by Yukita Creative through:
   - **MyFonts** — <https://www.myfonts.com/collections/grenda-font-yukita-creative/> — sells a
     specific *Webfont* licence tiered by monthly pageviews. This is the one you want.
   - **Creative Market** — <https://creativemarket.com/YUKITACREATIVE/10866859-Grenda-modern-serif-font>
     — its licences cover website headings and text.
3. **Buy the *webfont* licence, not the desktop licence.** A desktop licence lets you set type in
   Illustrator. It does **not** permit `@font-face` embedding. This is the single most common
   mistake here.
4. Check the pageview tier. A pre-launch B2B site is comfortably in the lowest tier.
5. Keep the licence PDF/receipt in the project folder. If anyone ever audits the site, that
   document is the defence.

## How to install it once you have the files

The swap is deliberately a one-line change.

**1.** Put the webfont files in `assets/fonts/`:

```
assets/fonts/grenda-regular.woff2
assets/fonts/grenda-regular.woff     ← only if the vendor supplies it
```

**2.** Add the `@font-face` block at the top of `css/tokens.css`:

```css
@font-face {
  font-family: 'Grenda';
  src: url('../assets/fonts/grenda-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;   /* text stays visible while the font loads */
}
```

**3.** Change the one variable in `css/tokens.css`:

```css
/* from */
--font-display: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;

/* to */
--font-display: 'Grenda', 'Cormorant Garamond', Georgia, serif;
```

**4.** Remove `Cormorant+Garamond` from the Google Fonts `<link>` in all eight HTML files, so the
browser is not downloading a font it no longer uses. Leave Noto Serif SC. The body font inherits `--font-display`, so it updates too.

**5.** Check every page. Grenda and Cormorant have different metrics, so headings will change
width. Look especially at the hero on `index.html` and the page titles, which are set largest.

---

## Chinese typeface

方正清刻本悦宋简体 (FZQingKeBenYueSong) is a Founder (方正) commercial font and has the same
licensing constraint, plus Founder licences for web use are typically negotiated directly and are
not cheap.

**Noto Serif SC** is shipping instead. It is a Song/Ming-style serif from the same typographic
family, free for commercial use, and pairs correctly with the English serif. The brand guide's own
documented Chinese fallback is Microsoft YaHei, which is in the stack after it.

Only the slogan and a few short phrases are set in Chinese, so the visual difference is small.
If the client insists on the exact Founder face, that is a procurement conversation, not a code
change — but the swap point is the same single `--font-cn` variable.
