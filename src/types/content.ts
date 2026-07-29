import type { Locale } from '@/types/i18n';

export interface BlueprintPlanDimensions {
  widthM: number;
  depthM: number;
}

export interface BlueprintPlan {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  planType: 'service-center' | 'station';
  /** Already-localized display label — content JSON mirrors the blog pattern of shipping translated strings, not i18n keys, for per-item data. */
  planTypeLabel: string;
  streetConfig: 'one-street' | 'two-streets-before' | 'two-streets-behind';
  streetConfigLabel: string;
  planNumber: string;
  areaSqm: number;
  dimensions: BlueprintPlanDimensions;
  /** Sketchfab embed URL for this plan's 3D model, or null to render the placeholder viewer. */
  sketchfabEmbedUrl: string | null;
  /** Downloadable plan PDF, or null to render the placeholder download button. */
  pdfUrl: string | null;
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
