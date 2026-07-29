import { useRouter } from 'next/router';
import { resolveLocale } from '@/i18n/config';
import type { Locale } from '@/types/i18n';

/** Resolves the router's current locale to a concrete `Locale`, collapsing the repeated `useRouter() + resolveLocale()` pair used across every section component. */
export function useLocale(): Locale {
  const { locale } = useRouter();
  return resolveLocale(locale);
}
