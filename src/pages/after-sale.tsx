import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { CircleCheckBig } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { cn } from '@/utils/cn';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

interface GuaranteeItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  languages?: string[];
}

interface PlanTier {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string | null;
  features: string[];
  perks: string[];
  bonus: string | null;
  badge: string | null;
  highlighted: boolean;
}

/** Real per-guarantee icons, sourced from the production site's After-Sale page CDN assets. */
const GUARANTEE_ICON_URLS: Record<string, string> = {
  warranty:
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d5391eb0a17eb44ee01c4d_Warranty-01.svg',
  'multilingual-support':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53948d03a89523aa325cf_Warranty-02.svg',
  training:
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53951c09c1b80aea3694d_Warranty-03.svg',
  'spare-parts':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d5395bb0a17e7202e02439_Warranty-04.svg',
  'cost-transparency':
    'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d539649eb1ee4a8a6003ad_Warranty-05.svg',
};

const AfterSalePage: NextPage = () => {
  const { t } = useTranslation(['common', 'after-sale']);
  const locale = useLocale();

  const title = t('after-sale:meta.title');
  const description = t('after-sale:meta.description');
  const heroTitle = t('after-sale:hero.title');
  const guarantees = t('after-sale:guarantees.items', { returnObjects: true }) as GuaranteeItem[];
  const tiers = t('after-sale:plans.tiers', { returnObjects: true }) as PlanTier[];
  const recommendedBadge = t('after-sale:plans.recommendedBadge');

  const breadcrumbItems = [
    { label: t('common:breadcrumbs.home'), path: '/' },
    { label: t('common:nav.afterSale') },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/after-sale"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/after-sale', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:nav.afterSale'), path: '/after-sale' },
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
                {t('after-sale:hero.eyebrow')}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-fg md:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fg-muted">{t('after-sale:hero.intro')}</p>
            </Reveal>
            <Reveal>
              <Image
                src="/images/after-sale/hero.svg"
                alt={t('after-sale:hero.imageAlt')}
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl"
              />
            </Reveal>
          </Container>
        </section>

        <section aria-labelledby="after-sale-guarantees-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="after-sale-guarantees-heading"
              as="h2"
              title={t('after-sale:guarantees.heading')}
              subtitle={t('after-sale:guarantees.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guarantees.map((item) => (
                <Reveal key={item.id}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                      <Image
                        src={GUARANTEE_ICON_URLS[item.id]}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-fg">{item.title}</h3>
                    <p className="mt-2 text-base text-fg-muted">{item.description}</p>
                    {item.languages ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.languages.map((lang) => (
                          <li
                            key={lang}
                            className="rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-fg"
                          >
                            {lang}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="after-sale-plans-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="after-sale-plans-heading"
              as="h2"
              title={t('after-sale:plans.heading')}
              subtitle={t('after-sale:plans.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <Reveal key={tier.id}>
                  <div
                    className={cn(
                      'flex h-full flex-col rounded-2xl border p-6',
                      tier.highlighted
                        ? 'border-brand bg-brand/5 ring-1 ring-brand'
                        : 'border-border bg-surface'
                    )}
                  >
                    {tier.highlighted ? (
                      <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                        {recommendedBadge}
                      </span>
                    ) : null}
                    <h3 className="text-2xl font-bold text-fg">{tier.name}</h3>
                    {tier.tagline ? (
                      <p className="mt-1 text-sm text-fg-muted">{tier.tagline}</p>
                    ) : null}
                    <p className="mt-4 text-2xl font-bold text-brand">{tier.price}</p>
                    <p className="mt-1 text-sm text-fg-muted">{tier.priceNote}</p>

                    <ul className="mt-5 flex flex-col gap-3 text-sm text-fg-muted">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CircleCheckBig
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.perks.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-sm text-fg-muted">
                        {tier.perks.map((perk) => (
                          <li key={perk}>{perk}</li>
                        ))}
                      </ul>
                    ) : null}

                    {tier.bonus ? (
                      <p className="mt-4 text-base font-medium text-fg">{tier.bonus}</p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-sm text-fg-muted">{t('after-sale:plans.note')}</p>
          </Container>
        </section>

        <section className="py-12 md:py-20">
          <Container>
            <Reveal>
              <div className="rounded-2xl bg-brand-dark px-6 py-12 text-center sm:px-12">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {t('after-sale:cta.heading')}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-white/80">
                  {t('after-sale:cta.subheading')}
                </p>
                <div className="mt-6">
                  <Button href="/contact-us" variant="primary" size="lg">
                    {t('after-sale:cta.button')}
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'after-sale'])),
    },
    revalidate: 3600,
  };
};

export default AfterSalePage;
