import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Factory, Gauge, ShieldCheck, type LucideIcon } from 'lucide-react';
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

interface ProductCard {
  id: 'rollover' | 'tunnel';
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  cta: string;
  imageAlt: string;
}

interface Highlight {
  id: string;
  icon: keyof typeof HIGHLIGHT_ICONS;
  title: string;
  description: string;
}

const HIGHLIGHT_ICONS = {
  Factory,
  Gauge,
  ShieldCheck,
} satisfies Record<string, LucideIcon>;

const OurProductsPage: NextPage = () => {
  const { t } = useTranslation(['common', 'our-products']);
  const locale = useLocale();

  const title = t('our-products:meta.title');
  const description = t('our-products:meta.description');
  const products = t('our-products:products.items', { returnObjects: true }) as ProductCard[];
  const highlights = t('our-products:highlights.items', { returnObjects: true }) as Highlight[];

  const breadcrumbItems = [
    { label: t('common:breadcrumbs.home'), path: '/' },
    { label: t('common:nav.ourProducts') },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/our-products"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/our-products', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:nav.ourProducts'), path: '/our-products' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="pt-6">
          <Breadcrumbs items={breadcrumbItems} />
        </Container>

        {/* Hero */}
        <section className="py-10 md:py-16">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                {t('our-products:hero.eyebrow')}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-fg md:text-5xl">
                {t('our-products:hero.title')}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fg-muted">{t('our-products:hero.intro')}</p>
            </Reveal>
            <Reveal>
              <Image
                src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63da78cc9202f6e631b13429_Rollover-page-bg.png"
                alt={t('our-products:hero.imageAlt')}
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl"
                priority
              />
            </Reveal>
          </Container>
        </section>

        {/* Product cards */}
        <section aria-labelledby="products-heading" className="bg-surface py-12 md:py-20">
          <Container>
            <SectionHeading
              id="products-heading"
              title={t('our-products:products.heading')}
              subtitle={t('our-products:products.subheading')}
            />
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {products.map((product) => (
                <Reveal key={product.id}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={
                          product.id === 'rollover'
                            ? 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63da78cc9202f6e631b13429_Rollover-page-bg.png'
                            : 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63da7a27f2669d4a187ee401_Tunnel-page-bg.png'
                        }
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold text-fg">{product.name}</h3>
                      <p className="mt-1 text-sm font-medium text-brand">{product.tagline}</p>
                      <p className="mt-3 flex-1 text-sm text-fg-muted">{product.description}</p>
                      <p className="mt-4 text-sm font-semibold text-fg">{product.capacity}</p>
                      <div className="mt-6">
                        <Button href={`/${product.id}`} variant="primary">
                          {product.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Highlights */}
        <section aria-labelledby="highlights-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="highlights-heading"
              title={t('our-products:highlights.heading')}
              subtitle={t('our-products:highlights.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {highlights.map((highlight) => {
                const Icon = HIGHLIGHT_ICONS[highlight.icon];
                return (
                  <Reveal key={highlight.id}>
                    <div className="h-full rounded-2xl border border-border bg-surface p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-fg">{highlight.title}</h3>
                      <p className="mt-2 text-sm text-fg-muted">{highlight.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20">
          <Container>
            <Reveal>
              <div className="rounded-2xl bg-brand-dark px-6 py-12 text-center sm:px-12">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {t('our-products:cta.heading')}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-white/80">
                  {t('our-products:cta.subheading')}
                </p>
                <div className="mt-6">
                  <Button href="/contact-us" variant="primary" size="lg">
                    {t('our-products:cta.button')}
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'our-products'])),
    },
    revalidate: 3600,
  };
};

export default OurProductsPage;
