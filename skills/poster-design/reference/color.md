# Colour

## The formula

**Paper + ink + one accent.** Three colours. That is the whole palette.

- **Paper**: the background. A tinted off-white, a warm grey, or a deep tinted
  dark. Never `#fff`.
- **Ink**: the text colour. Tinted near-black, never `#000`.
- **Accent**: used **once**, on the single thing the poster is about. If two
  things are both accented, neither is.

A two-ink print job (riso, screenprint) is the model: you only have what the
inks can do. Constraint is what makes it look designed.

Derive everything else from those three with opacity or `color-mix`. Do not
invent a fourth hex.

```css
:root {
  --paper: #F1ECE0;
  --ink:   #15130F;
  --accent:#E4472B;
  --ink-soft: color-mix(in srgb, var(--ink) 62%, var(--paper));
  --hairline: color-mix(in srgb, var(--ink) 18%, var(--paper));
}
```

## Palettes that work (copy them)

| Name | Paper | Ink | Accent | Mood |
|---|---|---|---|---|
| Newsprint | `#EFE8D8` | `#16130E` | `#E2452B` | gigs, events, zines |
| Chalk | `#ECEAE4` | `#1B1D22` | `#2F4BFF` | exhibitions, Swiss, talks |
| Bone and ink | `#F3EEE4` | `#0F1B2D` | `#C8402A` | editorial, literary |
| Market | `#F2D64B` | `#1A1A17` | `#1F3FBF` | community, markets, sales |
| Night | `#14161A` | `#ECE7DA` | `#F2B441` | film, music, after dark |
| Moss | `#E7E4D3` | `#1E2A21` | `#D9552C` | outdoors, food, craft |
| Plum | `#E9DDE3` | `#2B1B28` | `#E0502E` | fashion, culture |
| Concrete | `#CFCBC2` | `#171717` | `#FF4A1C` | brutalist, raw |

Dark is allowed. Dark does **not** mean glow. A dark poster is a dark paper with
a warm ink, one accent, and no light effects.

## Contrast

- Body and info text against its background: **4.5:1** or better.
- Very large display text: **3:1** or better.
- Over a photo: put the text on a flat area of the photo, or a flat colour
  panel, or darken the photo evenly. Not a text-shadow.

Check with any WCAG contrast checker. Do not guess by eye.

## Photographs in the palette

Make the image belong to the palette instead of fighting it:

- **Duotone**: greyscale image multiplied over the paper, or ink to accent.
- **High-contrast B&W** with paper showing through the whites.
- **Halftone** via a CSS dot pattern or SVG filter.

`template/poster.html` has a ready duotone block.
