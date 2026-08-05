import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// off the theme until we have a better solution for the flash of unstyled content (FOUC) issue. See
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      /* enableSystem */ 
      disableTransitionOnChange
      storageKey="washthru-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
