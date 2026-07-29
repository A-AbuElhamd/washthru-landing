import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next/pages';
import { Moon, Sun } from 'lucide-react';
import { IconButton } from '@/components/shared/IconButton';

/**
 * Icon-only theme toggle. The accessible label describes the action the click
 * will perform (switch to light/dark), not a static "toggle theme" string —
 * per the accessibility audit finding. Guards against SSR/client hydration
 * mismatch by rendering a disabled placeholder until mounted.
 */
export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        icon={<Sun className="h-5 w-5" aria-hidden="true" />}
        label={t('theme.switchToDark')}
        disabled
      />
    );
  }

  const isDark = (resolvedTheme ?? theme) === 'dark';

  return (
    <IconButton
      icon={
        isDark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )
      }
      label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  );
}
