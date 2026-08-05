import type { Locale } from '@/types/i18n';

export interface BlueprintPlanFeature {
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * Mirrors the real site's plan content exactly — `measurementLabel`/
 * `areaLabel` are pre-rendered display strings, not numbers, because the
 * real site itself shows literal "00000" placeholders for several plans
 * (unfilled CMS fields) rather than real measurements. One JSON file per
 * real `/plans-ar/<slug>` page serves both the `/blueprints` index card
 * and the `/blueprints/[slug]` detail page.
 */
export interface BlueprintPlan {
  slug: string;
  locale: Locale;
  title: string;
  intro: string;
  /** Real `.plan-main-img` — used as both the index card image and the detail page's hero image. */
  imageUrl: string;
  planType: 'station' | 'service-center';
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
  sketchfabEmbedUrl: string;
  /** Real `.div-block-2176` full-width technical drawing, below the 3D viewer. */
  drawingImageUrl: string;
  features: BlueprintPlanFeature[];
  pdfUrl: string;
  /** Real `.plan_booklet_cover` — the small cover thumbnail in the closing summary card. */
  footerCoverImageUrl: string;
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
