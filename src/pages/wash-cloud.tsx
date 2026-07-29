import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

interface WashCloudFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

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
  const heroTitle = t('wash-cloud:hero.title');
  const features = t('wash-cloud:features.items', { returnObjects: true }) as WashCloudFeature[];

  const breadcrumbItems = [
    { label: t('common:breadcrumbs.home'), path: '/' },
    { label: t('common:nav.washCloud') },
  ];

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
              { name: t('common:nav.washCloud'), path: '/wash-cloud' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>

        <section className="py-10 md:py-16">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                {t('wash-cloud:hero.eyebrow')}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-fg md:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fg-muted">{t('wash-cloud:hero.intro')}</p>
            </Reveal>
            <Reveal>
              <Image
                src="/images/wash-cloud/hero.svg"
                alt={t('wash-cloud:hero.imageAlt')}
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl"
              />
            </Reveal>
          </Container>
        </section>

        <section aria-labelledby="wash-cloud-features-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="wash-cloud-features-heading"
              as="h2"
              title={t('wash-cloud:features.heading')}
              subtitle={t('wash-cloud:features.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Reveal key={feature.id}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                      <Image
                        src={FEATURE_ICON_URLS[feature.id]}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-fg">{feature.title}</h3>
                    <p className="mt-2 text-base text-fg-muted">{feature.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-20">
          <Container>
            <Reveal>
              <div className="rounded-2xl bg-brand-dark px-6 py-12 text-center sm:px-12">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {t('wash-cloud:cta.heading')}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-white/80">
                  {t('wash-cloud:cta.subheading')}
                </p>
                <div className="mt-6">
                  <Button href="/contact-us" variant="primary" size="lg">
                    {t('wash-cloud:cta.button')}
                  </Button>
                </div>
              </div>
            </Reveal>
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
