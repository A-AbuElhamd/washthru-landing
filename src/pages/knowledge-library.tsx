import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { knowledgeLibraryResources } from '@/data/knowledgeLibraryResources';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

// Real `.kl_hero_wrap` icon.
const HERO_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64de1445b83c59b66c3e16d0_Knowledge%20Library-icon.svg';

// Real `.kl_hero_wrap` background — scoped to the hero section only.
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63b17f24b337a6a1331e49d7_books_hero_bg.png';

// Real `.general_button-book` arrow-button background — grayscale/inverted
// by default, full color on hover (`filter: invert() grayscale()` →
// `filter: none` on `:hover`).
const CTA_BUTTON_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e9559eb1ee6ff45a9fc6_arrow-button-01.svg';

const KnowledgeLibraryPage: NextPage = () => {
  const { t } = useTranslation(['common', 'knowledge-library']);
  const locale = useLocale();

  const title = t('knowledge-library:meta.title');
  const description = t('knowledge-library:meta.description');
  const pageTitle = `${t('knowledge-library:page.titleLine1')} ${t('knowledge-library:page.titleLine2')}`;
  const resourcesHeading = t('knowledge-library:resources.heading');

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
      <main id="main-content" className="text-start">
        <h1 className="sr-only">{pageTitle}</h1>

        {/* Real `.kl_hero_section` — text block beside a decorative icon,
            no breadcrumb, no separate SectionHeading component. Real
            `.kl_hero_wrap` background is scoped to this section only. */}
        <section
          className="bg-no-repeat py-10 md:py-16"
          style={{ backgroundImage: `url(${HERO_BG_URL})`, backgroundPosition: '100%' }}
        >
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="text-start">
                  <p className="text-3xl font-normal leading-tight sm:text-4xl lg:text-[48px]">
                    {t('knowledge-library:page.titleLine1')}{' '}
                    <span className="text-brand">{t('knowledge-library:page.titleLine2')}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                    {t('knowledge-library:page.intro')}
                  </p>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={HERO_ICON_URL}
                    alt={t('knowledge-library:page.imageAlt')}
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Real `.kl_books_section` — an underlined tab label ("كتيبات واش
            ثرو", not a filled button) above a wrapping row of
            cover-on-top document cards (real `.div-block-1998`: flex,
            wrap, centered, 76px gap; each card real-capped at 302px). */}
        <section className="bg-[#f9f9f9] py-10 md:py-16">
          <Container>
            <div className="text-center">
              <span className="text-brand inline-block border-b border-fg-muted pb-1 text-sm ">
                {resourcesHeading}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-stretch justify-center gap-x-16 gap-y-16 ">
              {knowledgeLibraryResources.map((resource) => {
                const titleWords = resource.title[locale].split(' ');
                const highlightCount = resource.highlightWords ?? 1;
                const highlighted = titleWords.slice(0, highlightCount).join(' ');
                const rest = titleWords.slice(highlightCount).join(' ');

                return (
                  <Reveal key={resource.id} className="group  w-full max-w-[330px] ">
                    <div className="flex flex-col">
                      {/* Real `.div-block-2185` — bordered photo box, image
                          kept at its natural aspect ratio (not cropped). */}
                      <div className=" hover:[top:-10px] top-8 relative flex h-[350px] w-full items-center justify-start border border-[#acacac] p-2 transition-all duration-300 group-hover:border-brand">
                        <Image
                          src={resource.cover[locale]}
                          alt=""
                          fill
                          sizes="302px"
                          className="object-contain p-2"
                        />
                      </div>
                      {/* Real `.book_text_wrap-02` — light-gray bordered box
                          directly abutting the photo box above it. */}
                      <div className="h-[250px] py-3 relative flex flex-col justify-start gap-5 border  border-[#acacac] bg-[#f5f5f5] p-2.5 text-start transition-colors duration-300 group-hover:border-brand">
                        <div>
                          <h3 className="text-xl font-medium leading-snug text-fg lg:text-[20px]">
                            <span className="text-brand">{highlighted}</span>
                            {rest ? ` ${rest}` : ''}
                          </h3>
                          <p className="mt-2 text-sm text-fg-muted lg:text-[15px]">
                            {resource.description[locale]}
                          </p>
                        </div>
                        {/* Real `.general_button-book` — an arrow-shaped
                            button graphic, grayscale by default and full
                            color on hover. */}
                        <a
                          href={resource.pdfUrl[locale]}
                          target="_blank"
                          dir="auto"
                          rel="noopener noreferrer"
                          style={{ backgroundImage: `url(${CTA_BUTTON_BG_URL})` }}
                          className=" mt-auto flex h-11 pr-[4.7px] w-[155px] items-center self-start bg-cover bg-no-repeat ps-8 text-sm font-light text-white [filter:invert(1)_grayscale(1)] transition-all duration-300 hover:[filter:none]"
                        >
                          {t('knowledge-library:resources.viewDownloadCta')}
                        </a>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
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
