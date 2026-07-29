import fs from 'fs';
import path from 'path';
import type { BlogPost } from '@/types/content';
import type { Locale } from '@/types/i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPostSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''));
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as BlogPost;
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return getAllPostSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Related-posts by shared tag — cheap internal-linking win flagged in the SEO audit. */
export function getRelatedPosts(current: BlogPost, locale: Locale, limit = 3): BlogPost[] {
  return getAllPosts(locale)
    .filter((post) => post.slug !== current.slug)
    .filter((post) => post.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit);
}
