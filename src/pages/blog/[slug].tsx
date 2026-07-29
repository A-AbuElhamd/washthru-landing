import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { MessageCircle, Send, Share2 } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { IconButton } from '@/components/shared/IconButton';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { BlogContent } from '@/components/shared/BlogContent';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/utils/content';
import { articleSchema, breadcrumbSchema } from '@/utils/schema';
import { formatDate } from '@/utils/format';
import { absoluteUrl } from '@/utils/seo';
import { LOCALES, resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import type { BlogPost } from '@/types/content';

type BlogPostSummary = Omit<BlogPost, 'contentHtml'>;

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const { t } = useTranslation(['common', 'blog']);
  const locale = useLocale();

  const shareUrl = absoluteUrl(`/blog/${post.slug}`, locale);

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        locale={locale}
        robots={post.noindex ? { index: false, follow: true } : undefined}
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          author: post.author.name,
          tags: post.tags,
        }}
        jsonLd={[
          articleSchema(post, locale),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:breadcrumbs.blog'), path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: t('common:breadcrumbs.home'), path: '/' },
              { label: t('common:breadcrumbs.blog'), path: '/blog' },
              { label: post.title },
            ]}
          />

          <article>
            {/* Cover image prominently above the title, matching the real
                article page's full-bleed hero image. */}
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border border-border bg-surface-hover sm:aspect-[3/1]">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-fg sm:text-4xl">{post.title}</h1>

            {/* Byline bar: publish date and author sit together right below
                the title, matching the real page's dedicated author bar. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fg-muted">
              <time dateTime={post.publishedAt}>
                {t('blog:post.publishedOn')} {formatDate(post.publishedAt, locale)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>
                {t('blog:post.author')} <span className="font-medium text-fg">{post.author.name}</span>
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>{t('blog:post.readingTime', { count: post.readingMinutes })}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-fg-muted">{t('blog:post.shareHeading')}</span>
              <div className="flex gap-2">
                <IconButton
                  href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={t('blog:post.shareWhatsapp')}
                  icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
                  className="border border-border"
                />
                <IconButton
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={t('blog:post.shareX')}
                  icon={<Send className="h-5 w-5" aria-hidden="true" />}
                  className="border border-border"
                />
                <IconButton
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  label={t('blog:post.shareFacebook')}
                  icon={<Share2 className="h-5 w-5" aria-hidden="true" />}
                  className="border border-border"
                />
              </div>
            </div>

            <div className="mt-10">
              <BlogContent html={post.contentHtml} />
            </div>

            {relatedPosts.length > 0 && (
              <section aria-labelledby="related-heading" className="mt-16">
                <SectionHeading id="related-heading" title={t('blog:post.relatedHeading')} />
                <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="block h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <h3 className="text-lg font-semibold text-fg">{related.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{related.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="mt-12">
              <Link href="/blog" className="font-medium text-brand hover:underline">
                {t('blog:post.backToBlog')}
              </Link>
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALES.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ params: { slug }, locale }))
  );
  // Every slug is known at build time from local content JSON — no external CMS,
  // so 'blocking' would add no value here (SEO-audit fix).
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, locale }) => {
  const resolvedLocale = resolveLocale(locale);
  const post = getPostBySlug(params!.slug as string, resolvedLocale);
  if (!post) return { notFound: true };

  // Strip contentHtml — the related-posts list only renders title/slug, and
  // shipping up to 3 full article bodies through getStaticProps for every
  // single blog post page was the same oversized-payload bug already fixed
  // on blog/index.tsx.
  const relatedPosts: BlogPostSummary[] = getRelatedPosts(post, resolvedLocale).map(
    ({ contentHtml, ...summary }) => summary
  );

  return {
    props: {
      post,
      relatedPosts,
      ...(await serverSideTranslations(locale!, ['common', 'blog'])),
    },
  };
};

export default BlogPostPage;
