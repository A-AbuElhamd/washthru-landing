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
import { JsonLd } from '@/components/shared/JsonLd';
import { webPageSchema, breadcrumbSchema, servicesSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';
import { servicesDetail } from '@/data/servicesDetail';

const ServicesPage: NextPage = () => {
  const { t } = useTranslation(['common', 'services']);
  const locale = useLocale();

  const title = t('services:meta.title');
  const description = t('services:meta.description');
  const serviceNames = servicesDetail.map((service) => service.title[locale]);

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/services"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/services', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('services:breadcrumbLabel'), path: '/services' },
            ],
            locale
          ),
        ]}
      />
      <JsonLd data={servicesSchema(serviceNames, locale)} />
      <Header />
      <main id="main-content">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { label: t('common:breadcrumbs.home'), path: '/' },
              { label: t('services:breadcrumbLabel') },
            ]}
          />
        </Container>

        {/* Hero */}
        <section className="py-10 md:py-16">
          <Container>
            <Reveal>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-fg md:text-5xl">
                {t('services:hero.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-fg-muted">{t('services:hero.subtitle')}</p>
            </Reveal>
          </Container>
        </section>

        {/* Intro */}
        <section aria-labelledby="services-intro-heading" className="py-12 md:py-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading id="services-intro-heading" title={t('services:intro.heading')} />
              <p className="mt-4 text-fg-muted">{t('services:intro.body')}</p>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/services/intro-cover.svg"
                  alt={t('services:intro.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Catalog */}
        <section aria-labelledby="catalog-heading" className="bg-surface py-12 md:py-20">
          <Container>
            <SectionHeading
              id="catalog-heading"
              title={t('services:catalog.heading')}
              subtitle={t('services:catalog.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesDetail.map((service) => (
                <Reveal key={service.id}>
                  <div className="h-full rounded-2xl border border-border bg-bg p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                      <Image
                        src={service.iconUrl}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-fg">
                      {service.title[locale]}
                    </h3>
                    <p className="mt-2 text-base text-fg-muted">{service.description[locale]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Process */}
        <section aria-labelledby="process-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="process-heading"
              title={t('services:process.heading')}
              subtitle={t('services:process.subheading')}
            />
            <ol className="mt-10 space-y-6 border-s-2 border-border ps-6">
              {servicesDetail.map((service, index) => (
                <li key={service.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -start-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <p className="font-semibold text-fg">{service.title[locale]}</p>
                  <p className="mt-1 text-base text-fg-muted">{service.description[locale]}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* CTA */}
        <section aria-labelledby="services-cta-heading" className="py-12 md:py-20">
          <Container className="rounded-2xl bg-brand px-6 py-12 text-center md:px-12">
            <Reveal>
              <h2 id="services-cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
                {t('services:cta.heading')}
              </h2>
              <p className="mt-3 text-white/85">{t('services:cta.body')}</p>
              <div className="mt-6">
                <Button
                  href="/contact-us"
                  variant="secondary"
                  size="lg"
                  className="border-white bg-bg text-brand hover:bg-surface-hover"
                >
                  {t('services:cta.buttonLabel')}
                </Button>
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'services'])),
    },
    revalidate: 3600,
  };
};

export default ServicesPage;
