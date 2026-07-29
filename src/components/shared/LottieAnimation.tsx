import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface LottieAnimationProps {
  /** Remote Lottie JSON URL (the real site's own Webflow-hosted `.json` export). */
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  /**
   * Real production behavior (`data-autoplay="0"`, `data-is-ix2-target="1"`
   * on the source site's rollover/tunnel Lottie divs): these animations
   * don't autoplay — their current frame is scrubbed to scroll position.
   * Pass a 0–1 scroll-progress MotionValue to drive the animation this way
   * instead of `loop`/`autoplay`.
   */
  scrollProgress?: MotionValue<number>;
}

/**
 * Fetches and renders a remote Lottie animation JSON file client-side.
 *
 * `lottie-react` drives the DOM directly via `lottie-web` and has no
 * server-render path, so every call site must load this component through
 * `next/dynamic` with `ssr: false`. The animation data itself is just JSON,
 * so fetching it on mount (rather than bundling it) keeps the initial page
 * weight down and lets us point straight at the production CDN files.
 */
export function LottieAnimation({
  src,
  className,
  loop = true,
  autoplay = true,
  scrollProgress,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [failed, setFailed] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  // useMotionValueEvent needs a real MotionValue every render — this
  // no-op fallback keeps the hook call unconditional when scrollProgress
  // isn't passed (autoplay mode).
  const fallbackProgress = useMotionValue(0);

  useEffect(() => {
    let cancelled = false;
    setAnimationData(null);
    setFailed(false);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load animation: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  useMotionValueEvent(scrollProgress ?? fallbackProgress, 'change', (latest) => {
    if (!scrollProgress) return;
    const instance = lottieRef.current;
    const totalFrames = instance?.getDuration(true);
    if (!instance || !totalFrames) return;
    instance.goToAndStop(Math.max(0, Math.min(1, latest)) * totalFrames, true);
  });

  if (failed || !animationData) {
    return (
      <div
        aria-hidden="true"
        className={cn('aspect-square animate-pulse rounded-2xl bg-surface', className)}
      />
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={scrollProgress ? false : loop}
      autoplay={scrollProgress ? false : autoplay}
      className={className}
    />
  );
}

export default LottieAnimation;
