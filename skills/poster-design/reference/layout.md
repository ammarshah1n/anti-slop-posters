# Layout

## 1. Pick the format first

| Use | Size | Ratio |
|---|---|---|
| Social feed | 1080 x 1350 | 4:5 |
| Story / reel cover | 1080 x 1920 | 9:16 |
| Small print | A3 (297 x 420 mm) or A4 | 1:1.414 |
| US print | 18 x 24 in | 3:4 |
| Wall / theatre | 24 x 36 in or A1 | 2:3 / 1:1.414 |

Design on a fixed pixel box (1200 x 1600 works for 3:4, 1200 x 1697 for A-sizes),
then scale at export. For print export at 300 dpi, scale 3 on 1200px wide gives 3600px, which is plenty for A3.

**Print bleed**: add 3 mm (about 0.125 in) beyond the trim if a colour or image reaches an edge. Keep all
important text 6 mm inside the trim.

## 2. Build on a grid

- **Outer margin 5-7% of the width.** Same on all four sides.
- **6 columns** for most posters, 12 if it is a data-heavy one. Gutter = about 2% of width.
- Everything snaps to a column edge or the margin. If something is off-grid, it is
  off-grid on purpose and you can say why.
- Pick **one left edge** and hang most of the text from it.
- Pick **two or three horizontal bands**: for example top 60% hero, bottom 40% info. Align info columns to the same columns as the hero.

## 3. Hierarchy: three levels

1. **Hero** (one thing). Title or image. At least 6x the info text.
2. **Key info.** When, where, price. Always readable at a glance.
3. **Fine print.** Address, URL, credits, QR.

If you have four levels, merge two. If everything is bold, nothing is.

## 3b. Composition recipes (pick one, then adapt)

- **A. Block anchor.** Hero fills the width in the top 55-60%. A full-bleed accent (or ink)
  block fills the bottom 25-30% and carries the date as a second large element plus the
  info in two columns. Examples: `riso.html`, `template/poster.html`. Flat and Brutalist too.
- **B. Grid and shape.** One header row over a heavy rule; hero in two lines at the top
  (at least 20% of the height each); one large flat shape cropped by two edges fills the
  lower-left; info hangs in the last two columns, bottom-aligned. Example: `swiss.html`.
- **C. Type column.** Hero in the top 45% (two lines, serif, one italic phrase); a short
  lede; a hairline rule; a footer with the date set large and a quiet info column.
  Example: `editorial.html`. Heritage too.
- **D. Photo bleed.** A treated photo bleeds off three edges across the top 60%; hero sits
  on a flat strip below; info in a row under it. For Photo-led.
- **E. Giant letterform.** One numeral or letter at 80-100% of the height, cropped by the
  edges; title and info small but precise on the grid. For Night and Brutalist.

Whichever you pick: the hero fills the measure, no horizontal band over 25% of the height
is empty, and no glyph touches another line.

## 4. Shapes that do real work

- **Asymmetry**: big heavy block on one side, quiet space on the other.
- **Scale shock**: one oversized letterform or numeral cropped by the edge.
- **A single rule or bar** to anchor the info block. One. Not a grid of boxes.
- **Bleed** an image or a colour field off one or two edges instead of floating it.
- **Rotate** nothing, unless the idea needs it. Rotated text is a crutch.

## 5. The info block

Build it as a small table, flush-left, two columns: label and value, in the same
face as the hero's quieter sibling.

```
When    Fri 14 Mar, doors 7pm
Where   The Anchor, 12 Quay Street
Entry   $15 at the door
```

Use real units, short dates ("Fri 14 Mar"), one time format. Include exactly one
call to action: a URL or a QR code, not both, not five social handles.

## 6. Order of work

1. Write the info block and headline as plain text.
2. Place the hero. Make it too big. Then pull back one notch.
3. Place the info block on the grid.
4. Add the one image or graphic, if any.
5. Add the accent, once.
6. Remove one thing. Then look again.
