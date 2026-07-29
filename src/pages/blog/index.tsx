import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { getAllPosts } from '@/utils/content';
import { breadcrumbSchema } from '@/utils/schema';
import { formatDate } from '@/utils/format';
import { resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import type { BlogPost } from '@/types/content';

type BlogPostSummary = Omit<BlogPost, 'contentHtml'>;

interface BlogIndexPageProps {
  posts: BlogPostSummary[];
}

const BlogIndexPage: NextPage<BlogIndexPageProps> = ({ posts }) => {
  const { t } = useTranslation(['common', 'blog']);
  const locale = useLocale();

  return (
    <>
      <Seo
        title={t('blog:index.heading')}
        description={t('blog:index.subtitle')}
        path="/blog"
        locale={locale}
        jsonLd={[
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:breadcrumbs.blog'), path: '/blog' },
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
              { label: t('common:breadcrumbs.blog') },
            ]}
          />

          <h1 className="text-3xl font-bold text-fg sm:text-4xl">{t('blog:index.heading')}</h1>
          <p className="mt-4 max-w-3xl text-lg text-fg-muted">{t('blog:index.subtitle')}</p>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Reveal>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-hover">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-fg">{post.title}</h2>
                      <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{post.description}</p>
                      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-fg-muted">
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{t('blog:post.readingTime', { count: post.readingMinutes })}</span>
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-brand">
                        {t('common:actions.learnMore')}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async ({ locale }) => {
  const resolvedLocale = resolveLocale(locale);
  // Strip contentHtml — the index only renders summaries, and shipping all
  // 19 full article bodies through getStaticProps blew the page-data budget
  // (275kB, over Next's 128kB warning threshold) for no reason.
  const posts: BlogPostSummary[] = getAllPosts(resolvedLocale).map(
    ({ contentHtml, ...summary }) => summary
  );

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'blog'])),
    },
    revalidate: 3600,
  };
};

export default BlogIndexPage;
