import type { Locale } from '@/types/i18n';

const numberFormatter = new Intl.NumberFormat('en-US');

/** Always renders Western digits, even in the Arabic UI — matches the source site's convention. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const dateFormatters: Record<Locale, Intl.DateTimeFormat> = {
  ar: new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
    calendar: 'gregory',
  }),
  en: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

/** Formats an ISO date string (e.g. blog `publishedAt`) using Western digits and the Gregorian calendar in both locales. */
export function formatDate(isoDate: string, locale: Locale): string {
  return dateFormatters[locale].format(new Date(isoDate));
}
