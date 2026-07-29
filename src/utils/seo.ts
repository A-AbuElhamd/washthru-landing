import { localizedPath, stripLocalePrefix, toEnglishPath } from '../../scripts/locale-url';
import { SITE } from '@/config/site';
import { DEFAULT_LOCALE } from '@/i18n/config';
import type { Locale } from '@/types/i18n';
import type { AlternateRef, RobotsDirective } from '@/types/seo';

/** Page URLs are locale-prefixed (ar unprefixed, en gets /en) — for links between pages. */
export function absoluteUrl(pagePath: string, locale: Locale = DEFAULT_LOCALE): string {
  const base = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  return `${SITE.url}${localizedPath(base, locale)}`;
}

/** Static assets (OG images, icons) are never locale-prefixed. */
export function assetUrl(assetPath: string): string {
  const base = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${SITE.url}${base}`;
}

export function canonicalUrl(pagePath: string, locale: Locale): string {
  return absoluteUrl(stripLocalePrefix(pagePath), locale);
}

export function getAlternateRefs(pagePath: string): AlternateRef[] {
  const basePath = stripLocalePrefix(pagePath);
  return [
    { href: `${SITE.url}${basePath}`, hreflang: 'ar' },
    { href: `${SITE.url}${toEnglishPath(basePath)}`, hreflang: 'en' },
    { href: `${SITE.url}${basePath}`, hreflang: 'x-default' },
  ];
}

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

/**
 * Safety clamp so a rendered <title>/<meta description> can never physically
 * exceed SERP display limits, even if content authors forget. Flagged in the
 * SEO audit after several generated blog titles ran 70-97 chars.
 */
export function clampTitle(title: string, suffix: string, max = TITLE_MAX): string {
  const full = suffix ? `${title} ${suffix}` : title;
  if (full.length <= max) return full;
  return title.length <= max ? title : `${title.slice(0, max - 1).trimEnd()}…`;
}

export function clampDescription(description: string, max = DESCRIPTION_MAX): string {
  if (description.length <= max) return description;
  return `${description.slice(0, max - 1).trimEnd()}…`;
}

interface BuildSeoInput {
  path: string;
  locale: Locale;
  title?: string;
  description?: string;
  fallbackTitle: string;
  fallbackDescription: string;
  siteNameSuffix: string;
  robots?: RobotsDirective;
  ogImage?: string;
}

export function buildSeo(input: BuildSeoInput) {
  const rawTitle = input.title ?? input.fallbackTitle;
  const rawDescription = input.description ?? input.fallbackDescription;

  return {
    title: clampTitle(rawTitle, input.siteNameSuffix),
    description: clampDescription(rawDescription),
    canonical: canonicalUrl(input.path, input.locale),
    alternates: getAlternateRefs(input.path),
    ogImage: input.ogImage ? assetUrl(input.ogImage) : assetUrl(SITE.defaultOgImage),
    robots: input.robots ?? { index: true, follow: true },
  };
}
