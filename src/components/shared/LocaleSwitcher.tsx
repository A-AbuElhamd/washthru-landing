import Link from 'next/link';
import { useRouter } from 'next/router';
import { LOCALE_LABELS, resolveLocale } from '@/i18n/config';
import type { Locale } from '@/types/i18n';

const OTHER_LOCALE: Record<Locale, Locale> = {
  ar: 'en',
  en: 'ar',
};

/** Links to the other locale's version of the current path. A real <Link>, so it's keyboard-reachable. */
export function LocaleSwitcher() {
  const router = useRouter();
  const currentLocale = resolveLocale(router.locale);
  const otherLocale = OTHER_LOCALE[currentLocale];

  return (
    <Link
      href={router.asPath}
      locale={otherLocale}
      className="inline-flex min-h-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {LOCALE_LABELS[otherLocale]}
    </Link>
  );
}
