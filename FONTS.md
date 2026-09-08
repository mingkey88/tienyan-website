# Fonts

## Current state — 8 Sep 2026

English headings, body text, navigation and buttons now use **Grenda Regular**,
self-hosted as `assets/fonts/grenda-regular.woff` at weight 400, normal style.
The file was copied unchanged from `Web-TT/Grenda.woff` in the user's existing
`Downloads/grenda-modern-serif-font.zip`; its supplied CSS identifies it as
Grenda Regular. No font was downloaded or purchased for this change.

`css/tokens.css` defines the font face and shared display/body font variables.
All eight pages preload the font. Cormorant Garamond has been removed from the
font stack and Google Fonts requests. Georgia and Times New Roman are the
fallbacks if Grenda cannot load.

Chinese text continues to use **Noto Serif SC**, served by Google Fonts, with
Microsoft YaHei as its fallback. The specified Chinese display face has not
been changed in this correction.

The font archive includes a webfont export but no licence document. This note
records the asset source; it does not establish or change its licence terms.
