# Motion (Remotion)

A motion poster is a poster that arrives. Design the final frame first as a normal poster
(same rules), then animate the arrival. The last frame must be a complete, correct
poster, because that is the thumbnail and the still.

## Rules

1. **One ease for everything.** A fast start with a long, calm settle:
   `Easing.bezier(0.16, 1, 0.3, 1)`. No bounce. No spring overshoot. No linear.
2. **Reveal by masking, not by fading and scaling.** Text rises out of an
   `overflow: hidden` box (translateY from 105% to 0). It reads as printed.
3. **One motion idea.** Blocks wipe, then words rise, then info settles. Not five effects.
4. **Stagger by 4-8 frames at 30fps.** Elements arrive in reading order: block,
   hero, key info, info lines.
5. **Total 4-6 seconds, hold the final frame for at least 2 seconds.** People screenshot
   it and platforms pick it as the cover.
6. **Nothing loops that does not need to.** No pulsing, floating, shimmering, particle
   or glow.
7. **Same tokens as the still.** Paper, ink, one accent. The grain overlay stays.
8. **30fps, H.264**, 1080x1350 for the feed, 1080x1920 for stories and reels. Keep text
   inside the safe area: 120px from the top and 250px from the bottom on 1080x1920.

## Use it

```bash
cd motion
npm i
npm run studio    # live preview and scrubbing
npm run still     # out/poster.png from frame 149
npm run render    # out/poster.mp4
```

Edit `src/MotionPoster.tsx`: tokens at the top, the layout in the return, the timing
in the `t(frame, start, length)` calls. To change fonts, change the `display` and `mono` names and the `FONTS` URL near the top of the file, and the three `document.fonts.load` calls in `useFonts()`.

If Remotion cannot download its browser (restricted network), point it at an installed
Chrome or Chromium: `npx remotion still ... --browser-executable "/path/to/chrome"`.

## Slop in motion

Zoom-in on everything, fade-up on every element, bouncing springs, parallax, a
spinning logo, text that types itself, lens flares, 3D flips, background gradients that
shift. If you can name the effect, it is probably a tell.
