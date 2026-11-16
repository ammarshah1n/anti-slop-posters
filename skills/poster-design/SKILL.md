---
name: poster-design
description: Design posters, flyers, event graphics and social tiles that look art-directed, not AI-generated. Use whenever the user asks for a poster, flyer, gig/event/sale graphic, invitation, cover, or social post visual, or says a design "looks like AI", "looks generic" or "looks like slop". Builds in HTML/CSS, renders to PNG/PDF with a checker, and reviews with fresh eyes before handing over.
---

# Poster design (anti-slop)

Posters go wrong in two ways: slop (gradients, glow, centred stacks, tracked caps,
cliche copy) and timidity (small type, dead space, system fonts). The fix is the same:
make decisions, constrain the palette and type, then LOOK at the render.

Files in this skill: `reference/` (the rules), `template/` (the starter and four
finished examples), `scripts/render.mjs` (render and check). Read only what you need.

## 1. Brief

If missing, ask once, in one message: what it is and who for; exact copy (headline, date,
time, venue, price, URL); format and where it is used; mood in three words plus one
reference; any photo or logo supplied. "Just do it" means assume and state assumptions.
Never invent facts. Mark gaps `[TO CONFIRM]`.

## 2. Decide (write this before any code)

```
Direction:   one of 8 in reference/directions.md
Idea:        one sentence, the visual idea ("the title is so big it is the image")
Composition: recipe A-E in reference/layout.md
Palette:     paper / ink / accent (reference/color.md)
Fonts:       from reference/type.md, loaded by <link>
Format:      px size (reference/layout.md)
Accent on:   the single element that carries it
```

Open the nearest file in `template/examples/` and adapt its structure. Do not paste it
unchanged and do not edit files inside the skill: copy to the user's project first
(for example `posters/<name>/poster.html`).

## 3. Build

- Start from `template/poster.html`. Colour, type and spacing come from the `:root`
  tokens only: no raw hex or sizes elsewhere.
- Hero fills the measure and is at least 6x the info text. Key info (the date) is large.
  No horizontal band more than 25% of the height may be empty.
- One graphic device at most, structural not decorative. Images: treated into the
  palette (`reference/slop-list.md`, `prompts` folder in the repo for generation).
- Load fonts with the `<link>`. Never fall back to system fonts.
- Copy: `reference/slop-list.md` "Copy" section. Headline at most 7 words.

## 4. Render and check

First time only:

```bash
cd <this skill>/scripts && npm i && npx playwright install chromium
```

Each iteration:

```bash
node <this skill>/scripts/render.mjs posters/<name>/poster.html --scale 2 --pdf
```

It writes `<name>.png`, `<name>.pdf` and `<name>.thumb.png` (200px, greyscale), and prints
`WARN` lines for slop tells, clipped or off-poster text, tiny text, low contrast, a
dead band, or a font that did not load. Fix every warning. A waiver is one line, with a
reason, in a `slop-ok: reason` comment, and it goes in the report.

**Then actually look.** Read the PNG, and the thumbnail. The checker cannot judge taste.
If you cannot view images, say so, and say the check is limited.

## 5. Cold review (max two rounds)

Dispatch one fresh reviewer (a new agent or chat that did not build it) with the PNG,
the thumbnail, the brief and this checklist. It reports Must fix / Should fix / Keep, no
praise, each finding naming the element and the fix:

1. Squint test: hero and date readable at thumbnail size? One focal point?
2. Slop tells: gradient, glow, shadow, card, pill, badge, emoji, icon, arrow, blob.
3. Type: more than two faces, a default face, hero under 6x, tracked caps, eyebrow, kickers.
4. Grid: even margins, shared left edge, nothing floating off-grid. Collisions: does any
   descender or ascender touch the line above or below (the checker cannot see this)?
5. Colour: more than paper + ink + one accent, accent used twice, contrast under 4.5:1.
6. Copy: invented facts, cliches, em dashes, headline over 7 words, mixed date formats.
7. Imagery: plastic or odd hands and faces, baked-in text, outside the palette.
8. Space: any empty band over 25%, info stranded in a corner.
9. Completeness: what, when, where, how, in five seconds.
10. Cuts: one thing to delete.

Fix Must fix, re-render, re-review once. Stop after round two.

## 6. Deliver

Report: the decision block, the files (PNG, PDF, HTML), what you left out, what you
assumed, and anything unchecked (for example "fonts not verified offline", "not viewed").
Do not call it print-ready unless bleed (3mm) and 300 dpi export were handled.

## Motion

For animated posters or reels, use the Remotion template in `motion/` of the pack and
`reference/motion.md`.

## Rules that never bend

No invented facts. Live text only. No gradients, glow, shadows or emoji. One accent, used
once. Never open or screenshot the user's desktop: render headlessly.
