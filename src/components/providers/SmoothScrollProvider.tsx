import type { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app in Lenis smooth scrolling.
 *
 * Smooth scroll is a motion effect, so it must respect the OS-level
 * "prefers-reduced-motion" setting. When reduced motion is requested we
 * bail out entirely and render children with no Lenis wrapper at all,
 * restoring native (instant) scrolling rather than merely disabling
 * Lenis' animation duration.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
