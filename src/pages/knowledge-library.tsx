import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Download } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { knowledgeLibraryResources } from '@/data/knowledgeLibraryResources';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

const KnowledgeLibraryPage: NextPage = () => {
  const { t } = useTranslation(['common', 'knowledge-library']);
  const locale = useLocale();

  const title = t('knowledge-library:meta.title');
  const description = t('knowledge-library:meta.description');
  const pageTitle = t('knowledge-library:page.title');

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/knowledge-library"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/knowledge-library', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: pageTitle, path: '/knowledge-library' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="py-6">
          <Breadcrumbs
            items={[{ label: t('common:breadcrumbs.home'), path: '/' }, { label: pageTitle }]}
          />
        </Container>

        <Container className="pb-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-fg md:text-5xl">{pageTitle}</h1>
                <p className="mt-4 max-w-xl text-lg text-fg-muted">
                  {t('knowledge-library:page.intro')}
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64de1445b83c59b66c3e16d0_Knowledge%20Library-icon.svg"
                  alt={t('knowledge-library:page.imageAlt')}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="pb-20">
          <SectionHeading as="h2" title={t('knowledge-library:resources.heading')} />
          {/* Real site lays each booklet out as a cover image beside its
              text (book-wrap-02 / img_book_wrap-02 + book_text_wrap-02),
              not a small thumbnail above the copy — a wider two-up grid
              with a proper book-sized cover reads closer to that. */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {knowledgeLibraryResources.map((resource) => (
              <Reveal key={resource.id}>
                <div className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-5">
                  <div className="relative aspect-[3/4] w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-bg sm:w-32">
                    <Image
                      src={resource.cover[locale]}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 128px, 112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {resource.category[locale]}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-fg">{resource.title[locale]}</h3>
                    <p className="mt-2 flex-1 text-sm text-fg-muted">
                      {resource.description[locale]}
                    </p>
                    <a
                      href={resource.pdfUrl[locale]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                    >
                      <Download aria-hidden="true" className="h-4 w-4" />
                      {t('knowledge-library:resources.viewDownloadCta')}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'knowledge-library'])),
    },
    revalidate: 3600,
  };
};

export default KnowledgeLibraryPage;
