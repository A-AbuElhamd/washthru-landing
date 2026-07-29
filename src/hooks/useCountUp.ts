import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

export function useCountUp<T extends HTMLElement = HTMLElement>({
  end,
  duration = 1500,
  startOnView = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  // Generic over the element type so call sites get a correctly-typed ref
  // with no cast — e.g. `useCountUp<HTMLDivElement>(...)` hands back a
  // `RefObject<HTMLDivElement>` that plugs directly into `m.div`'s `ref` prop.
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!startOnView || started) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnView, started]);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      setValue(end);
      return;
    }

    let frame: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(end * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration, reducedMotion]);

  return { value, ref };
}
