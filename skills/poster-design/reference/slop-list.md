# The slop list

Every item is a tell that a poster was machine-made. Each has a reason and a
replacement. `scripts/render.mjs` checks the ones a program can check.

## Layout

| Tell | Why it reads as slop | Do this instead |
|---|---|---|
| Everything centred and stacked: title, subtitle, date, button | No decision was made; the model defaulted to the safest layout | Flush-left on a real grid. Let one block break the grid on purpose. |
| Every element about the same size | No hierarchy, so the eye has nowhere to land | One hero at least 6x the size of the info text. Three levels only. |
| Edge-to-edge content, thin margins | Looks like a web page, not a printed object | Outer margin of 5-7% of the width. Margins are the frame. |
| Content spread evenly to fill the page | Fear of empty space | Group things. Leave one large area empty on purpose. |
| Boxes inside boxes, rounded cards, pill badges | UI furniture. A poster is not a dashboard | Separate with space and alignment. One hairline rule at most. |
| Decorative sprinkles: blobs, orbs, confetti, particles, floating 3D shapes | Filler that says nothing | Delete it. If the page feels empty, the type or image is too small, not missing decoration. |

## Colour

| Tell | Why | Do this instead |
|---|---|---|
| Purple to blue, pink to orange, mesh gradients | The default palette of every image model | Flat colour. Two inks and a paper. |
| Glow, neon, light-on-black | Hides weak contrast and weak ideas | Real contrast: dark ink on light paper, or the reverse, with a tinted neutral. |
| Pure `#000` and `#fff` | Dead and digital | Tint the neutrals: ink `#15130F`, paper `#F1ECE0`. |
| Five or more colours | No palette discipline | Paper, ink, one accent. A second accent only in a named direction. |
| Accent used on several things | If two things are the most important, neither is | The accent appears once: the one thing the poster is about. |
| Gradient text, one coloured word in a headline | Famous tell | One colour per text block. |

## Type

| Tell | Why | Do this instead |
|---|---|---|
| Inter, Roboto, Arial, Poppins, Montserrat, Open Sans, Lato, Space Grotesk, Playfair Display, system-ui | Defaults. Everyone's AI output uses them | A face with character, chosen from `type.md` |
| Three or more typefaces | Noise | One family, or one display plus one text face |
| Display text only 2-3x the body size | Timid contrast | 6-15x. Posters are read from across a room |
| Tracked-out all-caps "eyebrow" above a heading | The most recognisable AI tell | Delete it, or make it part of the real information |
| Numbered kickers: "01 / 02 / 03", "Step 1" | Pipeline-diagram habit | Only if the numbers are real information |
| Light grey small text on a mid-grey photo | Unreadable | 4.5:1 contrast minimum, 3:1 for very large text |
| Text-shadow or outer glow to rescue legibility | Blurry in print | Fix the contrast with a flat panel or a darker image |
| Text set inside an AI-generated image | Garbled letters, wrong spellings | All type is live text in HTML or vector. Always. |

## Copy

| Tell | Do this instead |
|---|---|
| "Elevate", "Unleash", "Unlock", "Reimagined", "Seamless", "Discover the future of", "Join us for an unforgettable" | Say what it is, who it is for, when and where. |
| "Where X meets Y" | Name the actual thing. |
| Three-adjective lists: "fast, simple, powerful" | One concrete fact. |
| Em dashes in the copy | Full stops or commas. |
| Invented stats, quotes, testimonials, sponsors, addresses, dates | Use only what the user gave you. Mark gaps `[TO CONFIRM]`. |
| Lorem ipsum, "Your text here" | Real copy or an honest placeholder. |
| Emoji and sparkle icons | No. A real symbol set in your type face if needed. |
| Headline longer than 7 words | Cut it. The headline is a label, not a sentence. |

## Imagery

| Tell | Do this instead |
|---|---|
| Glossy plastic 3D render, floating objects, bokeh | A real photograph, or an image treated into one family (duotone, halftone, grain). |
| Teal and orange "cinematic" grade, volumetric light | Flat daylight, flash, scanned print. See `prompts/04-image-generation.md`. |
| Generated faces and hands in sharp focus | Crop away from hands. Avoid close-up faces unless it is a real photo. |
| Stock-photo smiling group | One real, specific, slightly imperfect subject. |
| Tiny image floating in the middle of the page | Crop hard. Bleed it off an edge. Or no image, just type. |
| Image and type fighting for the focal point | One hero. The other supports. |

## Finish

| Tell | Do this instead |
|---|---|
| Soft drop shadows on everything | None. A poster is flat ink on paper. |
| Glassmorphism, frosted panels, `backdrop-filter` | Not for print. Flat panels only. |
| Perfect vector sterility | Paper grain and slight ink texture (`template/poster.html` has it). |
| Divider lines between every block | Space does that job. |
| A QR code or logo stuck in a corner at random | Align it to the grid and to the info block. |

## The two honest exceptions

A rule can be broken **on the record**: write one line saying which rule, why,
and what it buys. A gradient is fine if the whole concept is a sunset. A
centred layout is fine if it is a deliberate formal invitation. No reason means
no exception.
