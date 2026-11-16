import {useEffect, useState} from 'react';
import {AbsoluteFill, Easing, continueRender, delayRender, interpolate, useCurrentFrame} from 'remotion';

// Fonts: a plain Google Fonts link, and the render waits until they are really loaded.
const display = '"Big Shoulders Display", Impact, sans-serif';
const mono = '"DM Mono", ui-monospace, monospace';
const FONTS = 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=DM+Mono:wght@400;500&display=swap';
const useFonts = () => {
  const [handle] = useState(() => delayRender('fonts', {timeoutInMilliseconds: 30000}));
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS;
    link.onload = () =>
      Promise.all([document.fonts.load('900 100px "Big Shoulders Display"'), document.fonts.load('400 20px "DM Mono"'), document.fonts.load('500 20px "DM Mono"')])
        .then(() => continueRender(handle));
    document.head.appendChild(link);
  }, [handle]);
};

// 1. Tokens. Paper + ink + one accent. Same rules as the still posters (reference/color.md).
const paper = '#EFE8D8';
const ink = '#16130E';
const accent = '#E2452B';
const m = 65; // outer margin, about 6% of width

// 2. Motion. One ease for everything: fast start, long calm settle. No bounce, no spring overshoot.
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const t = (frame: number, start: number, len: number) =>
  interpolate(frame, [start, start + len], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// A line of text that rises out of a mask. Reads as printed, not as "fade and scale".
const Rise = ({children, start, style}: {children: React.ReactNode; start: number; style: React.CSSProperties}) => {
  const frame = useCurrentFrame();
  const y = (1 - t(frame, start, 22)) * 105;
  return (
    <div style={{overflow: 'hidden', ...style}}>
      <div style={{transform: `translateY(${y}%)`}}>{children}</div>
    </div>
  );
};

// Halftone: dots grow in from the corner, no gradients.
const Dots = () => {
  const frame = useCurrentFrame();
  const P = 20, R = 680;
  const dots: React.ReactNode[] = [];
  for (let y = P / 2; y < R; y += P)
    for (let x = P / 2; x < R; x += P) {
      const d = Math.hypot(x - R, y) / R;
      if (d >= 1) continue;
      const r = (P / 2) * Math.pow(1 - d, 0.9) * 0.95 * t(frame, 14 + d * 26, 26);
      if (r > 0.8) dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={ink} />);
    }
  return <svg width={R} height={R} viewBox={`0 0 ${R} ${R}`} style={{position: 'absolute', top: 0, right: 0}}>{dots}</svg>;
};

export const MotionPoster = () => {
  useFonts();
  const frame = useCurrentFrame();
  const blockH = 350;
  const wipe = t(frame, 0, 20);
  const info = (i: number) => {
    const p = t(frame, 62 + i * 6, 20);
    return {opacity: p, transform: `translateY(${(1 - p) * 14}px)`};
  };
  return (
    <AbsoluteFill style={{background: paper, color: ink, fontFamily: mono}}>
      <Dots />

      <div style={{position: 'absolute', left: m, top: m, fontSize: 27, lineHeight: 1.4, width: 380, opacity: t(frame, 50, 24)}}>
        <b style={{fontWeight: 500, display: 'block'}}>New record tour</b>with Marlo Vance and Pale Tenants
      </div>

      {/* hero: two words, each rising out of its own mask */}
      <div style={{position: 'absolute', left: m, right: m, bottom: blockH, fontFamily: display, fontWeight: 900, textTransform: 'uppercase', fontSize: 440, lineHeight: 0.86, letterSpacing: '-0.015em'}}>
        <Rise start={10} style={{height: 440 * 0.86}}>Salt</Rise>
        <Rise start={18} style={{height: 440 * 0.86}}>Flats</Rise>
      </div>

      {/* the accent, used once: wipes up from the bottom edge */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: blockH, background: accent, transformOrigin: 'bottom', transform: `scaleY(${wipe})`}} />
      <div style={{position: 'absolute', left: m, right: m, bottom: m, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
        <Rise start={34} style={{fontFamily: display, fontWeight: 900, fontSize: 300, lineHeight: 0.74, letterSpacing: '-0.02em', height: 300 * 0.74}}>14.03</Rise>
        <div style={{fontSize: 24, lineHeight: 1.3, width: 270, paddingBottom: 2}}>
          <p style={{margin: 0, ...info(0)}}>Friday. Doors 7pm</p>
          <p style={{margin: '12px 0 0', ...info(1)}}>The Anchor,<br />12 Quay Street</p>
          <p style={{margin: '12px 0 0', ...info(2)}}>$15 at the door</p>
        </div>
      </div>

      <AbsoluteFill style={{backgroundImage: grain, mixBlendMode: 'multiply', opacity: 0.4, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
