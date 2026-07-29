import { SITE } from '@/config/site';
import { absoluteUrl, assetUrl } from '@/utils/seo';
import type { Locale } from '@/types/i18n';
import type { BlogPost } from '@/types/content';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: assetUrl('/images/logo.svg'),
    sameAs: [SITE.social.instagram, SITE.social.twitter, SITE.social.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
    },
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: absoluteUrl('/', locale),
    inLanguage: locale,
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, locale),
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(post: BlogPost, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: assetUrl(post.coverImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: assetUrl('/images/logo.svg') },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`, locale),
  };
}

interface WebPageSchemaInput {
  title: string;
  description: string;
  path: string;
  locale: Locale;
}

export function webPageSchema({ title, description, path, locale }: WebPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path, locale),
    inLanguage: locale,
  };
}

export function servicesSchema(serviceNames: string[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'Organization', name: SITE.name },
    areaServed: locale === 'ar' ? 'السعودية' : 'Saudi Arabia',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'ar' ? 'خدماتنا' : 'Our Services',
      itemListElement: serviceNames.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}
