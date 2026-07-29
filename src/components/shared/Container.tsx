import type { ElementType, JSX, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ContainerProps {
  // React 19 moved the ambient global `JSX` namespace under `React.JSX` —
  // import the type directly from 'react' instead of relying on the global.
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: ReactNode;
}

export function Container({ as = 'div', className, children }: ContainerProps) {
  const Component = as as ElementType;

  return (
    <Component className={cn('mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  );
}
