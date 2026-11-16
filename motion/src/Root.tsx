import {Composition} from 'remotion';
import {MotionPoster} from './MotionPoster';

// 1080x1350 = Instagram 4:5. For stories use 1080x1920 and re-lay the poster.
export const Root = () => (
  <Composition id="MotionPoster" component={MotionPoster} durationInFrames={150} fps={30} width={1080} height={1350} />
);
