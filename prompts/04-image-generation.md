# Images: using image models without the slop

Two rules before anything else:

1. **Never let an image model draw the words.** It will garble them. Ask for the
   picture only, with empty space for the type, and set all text live in HTML.
2. **Never use the raw output.** Raw output is what makes it look like AI. Crop it
   hard, then pull it into the poster's palette (see "Treatment" below).

Many posters are better with **no image**. If type and one colour block carry the
idea, stop. An image is not required.

## What makes the output look AI

Shiny plastic surfaces, glowing rim light, perfect symmetry, floating objects,
bokeh everywhere, teal-and-orange grade, over-smooth skin, and the words "stunning",
"ultra-detailed", "8k", "masterpiece", "cinematic", "hyperrealistic", "trending",
"volumetric lighting", "neon". Those words **cause** the look. Do not use them.

## What to write instead: be a photographer, not a hype man

Specify, in this order: **subject**, **where and when**, **the camera and light**,
**the medium or print process**, **one imperfection**, **the composition and the
empty space**.

Template:

```
[specific subject doing a specific plain thing], [real place, time of day, weather],
shot on [a named, ordinary camera and film or lens: "35mm film, flash, slightly
underexposed"], [light source: "overcast daylight", "bare bulb", "direct flash"],
[print process or look: "scanned risograph print, two inks", "photocopied zine
page", "high-contrast black and white newspaper halftone"], [one imperfection:
"film grain", "slight motion blur", "dust on the scan"],
[composition: "subject in the lower right third, large empty area top left"].
No text, no logos, no people looking at the camera.
```

## Worked examples

**Gig poster** (instead of "epic neon concert vibes, cinematic lighting"):
> A drummer's hands and one snare drum in a small low-ceiling bar, direct on-camera
> flash, 35mm film, harsh shadows on the wall behind, slight motion blur on the
> sticks. Black and white, high contrast, newspaper halftone. Subject in the lower
> right, large empty wall top left. No text.

**Food market** (instead of "vibrant colourful fresh produce, 8k"):
> A crate of plums on a pale wooden trestle table, flat overcast morning light,
> shot on 50mm, slightly off-centre, a hand-written price card out of focus at the
> edge. Muted colour, honest and ordinary, like a photo in a regional newspaper. Empty
> sky above.

**Exhibition** (instead of "abstract futuristic art"):
> A flat tidal estuary at low tide, long ripples in the mud, one wooden post, grey
> morning, shot from standing height on medium format film, desaturated. Calm,
> almost empty frame, horizon at the bottom third.

## Settings

- If the tool has a "raw", "natural" or low-stylisation setting, use it.
- Generate 6-8 and pick the **most boring and specific**, not the shiniest.
- Avoid close-up faces and hands in sharp focus. Crop them out, or use a real photograph.
- Ask for the aspect ratio of the area you actually need, not a full poster.

## Treatment (makes it look designed, and fixes the AI look)

In the HTML, take the picture into the palette in one of three ways. All three are
in `template/poster.html`.

```css
/* Duotone: greyscale image multiplied onto the paper colour */
.duo{background:var(--paper)}
.duo img{width:100%;height:100%;object-fit:cover;
  filter:grayscale(1) contrast(1.15);mix-blend-mode:multiply}

/* Ink on accent: same, but the accent shows through the whites */
.duo.accent{background:var(--accent)}
```

- **Crop hard**: let the subject bleed off an edge. A small picture in the middle of
  the page is the weakest layout there is.
- **Grain on top**: the paper-grain overlay in the template unifies image and type.
- **Halftone**: for a printed look, use a halftone filter in an image editor or make a dot field in SVG (see `riso.html`).

## If you have a real photo

Better than anything generated. Same treatment. Keep the subject honest, ask the
person for a better crop, and never retouch a face to look "perfect".
