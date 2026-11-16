# Type

Type is 80% of a poster. Get this right and the rest is easy.

## Rules

1. **One idea per face.** One typeface family, or one display plus one text
   face (or mono). Never three.
2. **Contrast through size and weight, not through more fonts.** Hero text is
   6-15x the info text. Use at most three sizes in a poster: hero, info, fine
   print.
3. **Set it flush-left, ragged-right** unless the direction says otherwise.
   Centred text only for a formal invitation.
4. **Tight display, open text.** Display sizes: line-height 0.85-1.0 and letter-spacing
   -0.01 to -0.04em. Info text: line-height 1.3-1.45, letter-spacing 0.
5. **No tracked caps.** Letter-spaced all-caps small labels are the top AI tell.
   If you need caps, use a real small-caps or set them at body size with no
   tracking.
6. **Real minimum sizes.** Key info (date, place) no smaller than 2% of the
   poster's width. Fine print no smaller than 1.2%. On a 1200px-wide poster
   that is 24px and 14px.
7. **Live text only.** Never ask an image model to draw the words.

## Free pairings that do not look like defaults

All are free for commercial use. Google Fonts load with a `<link>`; Fontshare
loads with its own CSS URL.

| Direction | Display | Text / info | Source |
|---|---|---|---|
| Gig, riso, loud | **Big Shoulders Display** 800-900 | **DM Mono** 400-500 | Google |
| Swiss, exhibition, formal | **Archivo** (use the width axis, 62-125) | same family, regular | Google |
| Editorial, talk, literary | **Instrument Serif** (roman + italic) | **Instrument Sans** | Google |
| Community, event, friendly | **Bricolage Grotesque** 700-800 | same family, 400-500 | Google |
| Tech, product, calm | **Clash Display** 500-600 | **IBM Plex Sans** 400 + **IBM Plex Mono** | Fontshare + Google |
| Warm, heritage, food | **Fraunces** 600-900 (soft) | **Work Sans** 400-500 | Google |
| Brutalist, raw | **Archivo Black** or **Unbounded** 900 | **JetBrains Mono** | Google |
| Poster-sized neo-grotesk | **Switzer** or **General Sans** 600-700 | same, 400 | Fontshare |

Fontshare URL pattern:
`https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap`

Google Fonts pattern:
`https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@800;900&family=DM+Mono:wght@400;500&display=swap`

## Scale (poster 1200px wide)

| Role | Size | Notes |
|---|---|---|
| Hero | 260-520px (or one word filling the full width) | The thing you read from 5m |
| Secondary | 64-110px | Date, or the second line of the title |
| Info | 28-40px | Venue, time, price |
| Fine print | 16-22px | Address, URL, credits |

Do not use a "nice" ramp (1.25, 1.5). Posters want big jumps. Pick sizes by
asking "what does it look like from the other side of the room?".

## Fitting a hero to the width

Make the headline one word per line and size it so the longest word spans the
full measure. In CSS: set the font-size in `vw`-like units from the poster width
(`calc(var(--W) * 0.3)`), then check in the render. Do not let it wrap into
orphans. If it will not fit, change the word, not the font size.

## Checking

- Squint test: render at 200px wide. Can you still read the hero and tell
  where the date is? If not, the hierarchy is wrong.
- Convert to greyscale. If hierarchy disappears, it was relying on colour.
