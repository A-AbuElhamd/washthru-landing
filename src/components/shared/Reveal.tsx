import { forwardRef, type ReactNode } from 'react';
import { m } from 'framer-motion';
import { fadeInUp } from '@/utils/motion';

export interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fade-in-up reveal on scroll. Assumes `LazyMotion` + `domAnimation` are
 * provided higher in the tree (hence `m`, not `motion`). Reduced-motion
 * handling is global via `<MotionConfig reducedMotion="user">` in _app.tsx —
 * intentionally not duplicated here.
 *
 * Forwards its ref to the underlying `m.div` so call sites can measure/scroll
 * against the revealed element directly (e.g. ProductHighlights' scroll-scrub).
 */
export const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { children, className },
  ref
) {
  return (
    <m.div
      ref={ref}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </m.div>
  );
});
