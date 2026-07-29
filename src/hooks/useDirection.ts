import { useRouter } from 'next/router';
import { LOCALE_DIR, resolveLocale } from '@/i18n/config';
import type { Direction } from '@/types/i18n';

export function useDirection(): Direction {
  const { locale } = useRouter();
  return LOCALE_DIR[resolveLocale(locale)];
}
