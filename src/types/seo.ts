import type { Locale } from '@/types/i18n';

export interface RobotsDirective {
  index?: boolean;
  follow?: boolean;
}

export interface AlternateRef {
  href: string;
  hreflang: string;
}

export interface ThemeColorOverride {
  light: string;
  dark: string;
}

export type JsonLdInput = Record<string, unknown> | Record<string, unknown>[];

export interface SeoArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
}

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  keywords?: string[];
  robots?: RobotsDirective;
  ogImage?: string;
  themeColor?: ThemeColorOverride;
  article?: SeoArticleMeta;
  jsonLd?: JsonLdInput;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  alternates: AlternateRef[];
  ogImage: string;
  robots: RobotsDirective;
}
