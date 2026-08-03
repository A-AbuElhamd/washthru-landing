import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';
import { SITE } from '@/config/site';

interface WashCloudFeature {
  id: string;
  title: string;
  description: string;
}

// Real `.wc_wrap_01` background photo, under a flat blue tint overlay.
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63fb1b3869b16e19b5e117c5_wash-cloud-bg.png';

/**
 * Real generic decorative line-pattern texture (`.wc-features-wrap`'s base
 * `background-image`, shared verbatim across the whole real site) — shown
 * behind each row on lg screens and up only, hidden below `lg`.
 */
const FEATURE_LINES_BG_URL = 'https://d3e54v103j8qbb.cloudfront.net/img/background-image.svg';

/** Real per-feature icons, sourced from the production site's Wash Cloud page CDN assets. */
const FEATURE_ICON_URLS: Record<string, string> = {
  'preventive-maintenance':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9da466e62e628458bf0_wc-features-01.svg',
  'auto-alerts':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9db63ea2295051dd4b4_wc-features-02.svg',
  'continuous-updates':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9da3937970f6f8001b1_wc-features-03.svg',
  'auto-assistant':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9dbb5f34ff78b16fd47_wc-features-04.svg',
  'guided-repairs':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9da731066f4ebc316d0_wc-features-05.svg',
  'api-integration':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9db69cfc0f0c330405b_wc-features-06.svg',
  'cloud-storage':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9da63ea220ab01dd4b3_wc-features-07.svg',
  'auto-reporting':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9dbb5f34f7db916fd46_wc-features-08.svg',
  'remote-control':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63f0b9dbb5f34f00ac16fd48_wc-features-09.svg',
};

const WashCloudPage: NextPage = () => {
  const { t } = useTranslation(['common', 'wash-cloud']);
  const locale = useLocale();

  const title = t('wash-cloud:meta.title');
  const description = t('wash-cloud:meta.description');
  const features = t('wash-cloud:features.items', { returnObjects: true }) as WashCloudFeature[];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/wash-cloud"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/wash-cloud', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('wash-cloud:breadcrumbLabel'), path: '/wash-cloud' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Real `.wc_hero_section` — solid blue background with a real bg
            photo under a flat blue tint (not a gradient-to-transparent).
            Real `min-height: 590px`. */}
        <section className="relative isolate flex min-h-[590px] flex-col justify-center overflow-hidden bg-brand">
          <div className="absolute inset-0 -z-10">
            <Image src={HERO_BG_URL} alt="" fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-brand/30" />
          </div>
          <Container className="py-10">
            <Reveal className="text-start">
              <h1 className="text-3xl font-medium leading-[1.5] text-white sm:text-4xl md:text-5xl lg:text-[48px]">
                {t('wash-cloud:hero.titleLine1')}
                <br />
                {t('wash-cloud:hero.titleLine2')}
              </h1>
              <div className="mt-6 h-px w-24 bg-white/40" />
              <p className="mt-16 text-base text-white/90 lg:text-[17px]">
                {t('common:header.costomerServices')} / {SITE.contact.phone}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Real `.wc_wrap_01._02` — a solid coral/orange banner holding only
            the intro paragraph. */}
        <section className="bg-live py-5 text-normal">
          <Container>
            <p className="text-normal max-w-4xl text-lg font-medium leading-relaxed text-white lg:text-[25px]">
              {t('wash-cloud:hero.intro')}
            </p>
          </Container>
        </section>

        {/* Real `.wc-features-section` — nine features stacked as an
            alternating zigzag (icon/text sides swap every row), each with
            one real large monoline icon. Not a card grid. */}
        <section aria-labelledby="wash-cloud-features-heading" className="bg-[#f8f8f8] py-16 md:py-24">
          <h2 id="wash-cloud-features-heading" className="sr-only">
            {t('wash-cloud:breadcrumbLabel')}
          </h2>
          <Container className="flex flex-col">
            {features.map((feature, index) => {
              const isEven = index % 2 === 1;
              const isLast = index === features.length - 1;
              return (
                <div key={feature.id}>
                  <Reveal
                    className={`flex flex-col items-center gap-10 py-14 sm:gap-12 sm:py-16 md:gap-20 md:py-16 lg:gap-24 lg:py-20 ${
                      isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    <div className="flex w-full shrink-0 items-center justify-center md:w-2/5">
                      <Image
                        src={FEATURE_ICON_URLS[feature.id]}
                        alt=""
                        aria-hidden="true"
                        width={220}
                        height={220}
                        unoptimized
                        className="h-32 w-32 object-contain sm:h-44 sm:w-44 md:h-80 md:w-80"
                      />
                    </div>
                    <div className="relative w-full text-center md:w-3/5 md:text-start">
                      <h3 className="text-xl font-medium leading-snug text-live sm:text-2xl lg:text-[28px]">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                  {/* Real site shows a divider between features on small
                      screens only — desktop rows have enough vertical
                      spacing on their own. */}
                  {!isLast ? (
                    <hr aria-hidden="true" className="border-t border-live/40 md:hidden" />
                  ) : null}
                </div>
              );
            })}
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'wash-cloud'])),
    },
    revalidate: 3600,
  };
};

export default WashCloudPage;
