# Motion poster (Remotion)

One 5-second poster that arrives and holds. 1080x1350, 30 fps, 150 frames. The last frame
is a complete poster, so it doubles as the thumbnail and the still.

```bash
npm i
npm run studio     # live preview, scrub the timeline
npm run still      # out/poster.png (frame 149)
npm run render     # out/poster.mp4 (H.264)
```

Edit `src/MotionPoster.tsx`: fonts and tokens at the top, layout in the return, timing in
the `t(frame, start, length)` calls. Rules and slop list: `../skills/poster-design/reference/motion.md`.

If Remotion cannot download its browser, pass an installed Chrome or Chromium:
`npx remotion still src/index.ts MotionPoster out/poster.png --frame=149 --browser-executable "/path/to/chrome"`.
