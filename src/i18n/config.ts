import type { Direction, Locale } from '@/types/i18n';

export const LOCALES: Locale[] = ['ar', 'en'];
export const DEFAULT_LOCALE: Locale = 'ar';

export const LOCALE_DIR: Record<Locale, Direction> = {
  ar: 'rtl',
  en: 'ltr',
};

export const LOCALE_LABELS: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
};

export function resolveLocale(locale?: string): Locale {
  return locale === 'en' ? 'en' : DEFAULT_LOCALE;
}
