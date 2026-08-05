import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { getAllPosts } from '@/utils/content';
import { breadcrumbSchema } from '@/utils/schema';
import { resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/utils/cn';
import type { BlogPost } from '@/types/content';

type BlogPostSummary = Omit<BlogPost, 'contentHtml'>;

interface BlogIndexPageProps {
  posts: BlogPostSummary[];
}

// Real `.cu_left_wrap` hero icon + `.cu_hero_wrap` decorative background.
const HERO_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6433d21cab91bb629da4b73b_blog-icon.svg';
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e779b0a17e8849daeebc_home-bg-01.svg';

// Real `.div-block-2120` promotional banner, shown above the post grid on
// the "الكل" (all) tab only.
const BANNER_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6433e37aac66a45fa80307d7_panner-01.png';

// Real share icons used on each post card's overlay.
const SHARE_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6433f7508c056f28c672c571_share-icon.svg';

type TabKey = 'production' | 'marketing' | 'automation' | 'all';
const TAB_KEYS: TabKey[] = ['production', 'marketing', 'automation', 'all'];
// Real `.bp-tabs-02` second-tier tabs, nested under each of the three
// category tabs (never under "الكل"). Every combination here is a real
// tab with zero real posts (unfilled CMS categories) — same fidelity as
// the top-level category tabs.

const BlogIndexPage: NextPage<BlogIndexPageProps> = ({ posts }) => {
  const { t } = useTranslation(['common', 'blog']);
  const locale = useLocale();
  // Real site defaults to the "الكل" (all) tab — the only one with any
  // posts; "الأنتاج"/"التسويق"/"الأتمتة" are real tabs with zero real posts
  // under them (unfilled CMS categories), matching real fidelity.
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [activeSubTab, setActiveSubTab] = useState(0);

  function selectTab(key: TabKey) {
    setActiveTab(key);
    setActiveSubTab(0);
  }

  const subTabs: string[] =
    activeTab !== 'all'
      ? (t(`blog:index.subTabs.${activeTab}`, { returnObjects: true }) as string[])
      : [];

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
        <h1 className="sr-only">{t('blog:index.heading')}</h1>

        {/* Real `.cu_hero_section` — decorative icon beside the heading +
            intro paragraph. Real `.cu_hero_wrap` background scoped to this
            section only. */}
        <section
          className="bg-no-repeat py-10 md:py-16"
          style={{ backgroundImage: `url(${HERO_BG_URL})`, backgroundPosition: '100%' }}
        >
          <Container>
            <Reveal>
              <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:items-center">
                <div className="text-start order-last md:order-first">
                  <p className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[48px]">
                    {t('blog:index.heading')}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                    {t('blog:index.subtitle')}
                  </p>
                </div>
                <div className="relative aspect-[4/2]  sm:aspect-[4/2] lg:aspect-[4/3] order-first md:order-last">
                  <Image
                    src={HERO_ICON_URL}
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 50dvw, 100dvw"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Real `.blog_contact_section` — plain underline category tabs
            above the post grid. Only "الكل" has real posts. */}
        <section className="bg-[#f6f6f6] py-10 md:py-16">
          <Container>
            {/* Real site's flat underline tab bar renders physically
                left-to-right regardless of locale — reverse the render
                order in AR so it reads right-to-left ("الكل" first/right). */}
            <div className="flex min-h-20 flex-wrap items-stretch justify-center gap-x-1 border-t-2 border-[#d9d9d9]">
              {(locale === 'ar' ? [...TAB_KEYS].reverse() : TAB_KEYS).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectTab(key)}
                  className={cn(
                    'flex flex-col items-center justify-center px-8 py-2.5 text-sm',
                    activeTab === key ? 'bg-[#f6f6f6] text-brand underline' : 'text-fg'
                  )}
                >
                  {t(`blog:index.tabs.${key}`)}
                </button>
              ))}
            </div>

            {/* Real `.bp-tabs-02` — second-tier tabs nested under each
                category (never under "الكل"). Every one is a real, empty
                tab, matching real fidelity. */}
            {activeTab !== 'all' ? (
              <div className="flex min-h-20 flex-wrap items-stretch justify-center gap-x-1 border-t-2 border-[#d9d9d9]">
                {(locale === 'ar' ? [...subTabs].reverse() : subTabs).map((label, reversedIndex) => {
                  const index = locale === 'ar' ? subTabs.length - 1 - reversedIndex : reversedIndex;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveSubTab(index)}
                      className={cn(
                        'flex flex-col items-center justify-center px-8 py-2.5 text-sm',
                        activeSubTab === index ? 'bg-[#f6f6f6] text-brand underline' : 'text-fg'
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {activeTab === 'all' ? (
              <>
                {/* Real `.div-block-2120` promotional banner. */}
                <Reveal>
                  <div
                    className="relative mt-14 flex h-[280px] w-full items-center overflow-hidden rounded-[28px] bg-cover px-8 md:h-[400px] md:pr-[30%]"
                    style={{ backgroundImage: `url(${BANNER_BG_URL})`, backgroundPosition: '100%' }}
                  >
                    <div className="max-w-[512px] text-start text-white">
                      <p className="text-3xl font-semibold leading-tight lg:text-[48px]">
                        {t('blog:index.banner.titleLine1')}
                        <br />
                        {t('blog:index.banner.titleLine2')}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed lg:text-[17px]">
                        {t('blog:index.banner.body')}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <Reveal key={post.slug}>
                      <div className="flex h-full flex-col gap-4 rounded-[28px] p-2.5 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                        <div className="relative h-[300px] w-full overflow-hidden rounded-[28px] border border-brand">
                          <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 33dvw, (min-width: 640px) 50dvw, 100dvw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          <button
                            type="button"
                            aria-label={t('blog:post.shareHeading')}
                            className="absolute start-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/30"
                          >
                            <Image src={SHARE_ICON_URL} alt="" width={16} height={16} unoptimized className="h-4 w-4" />
                          </button>
                          <h2 className="absolute inset-x-4 bottom-4 text-end text-lg font-normal leading-snug text-white">
                            {post.title}
                          </h2>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col justify-between px-3 pb-2">
                          <p className="text-sm text-fg-muted">{post.description}</p>
                          <span className="mt-4 text-sm font-medium text-brand">{t('blog:index.readMore')}</span>
                        </Link>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}
          </Container>
        </section>
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
