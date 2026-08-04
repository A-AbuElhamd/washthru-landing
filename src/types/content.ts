import type { Locale } from '@/types/i18n';

/**
 * Mirrors the real site's `.collection-item-2` blueprint card fields
 * exactly — `measurementLabel`/`areaLabel` are pre-rendered display strings,
 * not numbers, because the real site itself shows literal "00000"
 * placeholders for several plans (unfilled CMS fields) rather than real
 * measurements. There's no description, 3D viewer, or PDF on the real
 * site's cards — only these four spec rows.
 */
export interface BlueprintPlan {
  slug: string;
  locale: Locale;
  title: string;
  imageUrl: string;
  planType: 'station';
  streetConfig:
    | 'one-street'
    | 'two-streets-before'
    | 'two-streets-after'
    | 'two-streets-behind'
    | 'three-streets-before'
    | 'three-streets-after'
    | 'three-streets-behind'
    | 'four-streets';
  planNumber: string;
  measurementLabel: string;
  areaLabel: string;
  ideaLabel: string;
}

export interface BlogPostAuthor {
  name: string;
}

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  coverImage: string;
  coverImageAlt: string;
  author: BlogPostAuthor;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingMinutes: number;
  /** true only when the post should be excluded from indexing (mirrors a source-site noindex meta tag) */
  noindex?: boolean;
  contentHtml: string;
}
