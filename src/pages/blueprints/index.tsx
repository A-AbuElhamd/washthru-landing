import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getAllBlueprints } from '@/utils/blueprints';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { formatNumber } from '@/utils/format';
import { resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import type { BlueprintPlan } from '@/types/content';

interface BlueprintsIndexPageProps {
  plans: BlueprintPlan[];
}

const BlueprintsIndexPage: NextPage<BlueprintsIndexPageProps> = ({ plans }) => {
  const { t } = useTranslation(['common', 'blueprints']);
  const locale = useLocale();

  const title = t('blueprints:index.title');
  const description = t('blueprints:index.subtitle');

  // The real site's hub splits plans into two distinct top-level groups
  // (service centers vs. stations) rather than one flat grid — mirror that
  // grouping here instead of the mixed card list this page previously shipped.
  const serviceCenterPlans = plans.filter((plan) => plan.planType === 'service-center');
  const stationPlans = plans.filter((plan) => plan.planType === 'station');
  const groups: { id: string; heading: string; items: BlueprintPlan[] }[] = [
    {
      id: 'service-center',
      heading: t('blueprints:index.serviceCenterHeading'),
      items: serviceCenterPlans,
    },
    { id: 'station', heading: t('blueprints:index.stationHeading'), items: stationPlans },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/blueprints"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/blueprints', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:breadcrumbs.blueprints'), path: '/blueprints' },
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
              { label: t('common:breadcrumbs.blueprints') },
            ]}
          />

          <h1 className="text-3xl font-bold text-fg sm:text-4xl">{t('blueprints:index.heading')}</h1>
          <p className="mt-4 max-w-3xl text-lg text-fg-muted">{t('blueprints:index.subtitle')}</p>

          {groups.map((group, index) => (
            <section
              key={group.id}
              aria-labelledby={`${group.id}-heading`}
              className={index === 0 ? 'mt-10' : 'mt-16'}
            >
              <SectionHeading id={`${group.id}-heading`} title={group.heading} />
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((plan) => (
                  <li key={plan.slug}>
                    <Reveal>
                      <Link
                        href={`/blueprints/${plan.slug}`}
                        className="block h-full rounded-lg border border-border bg-surface p-6 transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <h3 className="text-lg font-semibold text-fg">{plan.title}</h3>
                        <p className="mt-2 text-sm text-fg-muted">{plan.description}</p>
                        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                          <div className="flex gap-1">
                            <dt className="text-fg-muted">{t('blueprints:index.cardTypeLabel')}:</dt>
                            <dd className="font-medium text-fg">{plan.streetConfigLabel}</dd>
                          </div>
                          <div className="flex gap-1">
                            <dt className="text-fg-muted">{t('blueprints:index.cardAreaLabel')}:</dt>
                            <dd className="font-medium text-fg">
                              {t('blueprints:detail.areaUnit', { value: formatNumber(plan.areaSqm) })}
                            </dd>
                          </div>
                          <div className="flex gap-1">
                            <dt className="text-fg-muted">{t('blueprints:detail.planNumberLabel')}:</dt>
                            <dd className="font-medium text-fg">{plan.planNumber}</dd>
                          </div>
                          <div className="flex gap-1">
                            <dt className="text-fg-muted">{t('blueprints:detail.dimensionsLabel')}:</dt>
                            <dd className="font-medium text-fg">
                              {t('blueprints:detail.dimensionsValue', {
                                width: formatNumber(plan.dimensions.widthM),
                                depth: formatNumber(plan.dimensions.depthM),
                              })}
                            </dd>
                          </div>
                        </dl>
                        <span className="mt-4 inline-block text-sm font-medium text-brand">
                          {t('blueprints:index.viewPlan')}
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlueprintsIndexPageProps> = async ({ locale }) => {
  const resolvedLocale = resolveLocale(locale);

  return {
    props: {
      plans: getAllBlueprints(resolvedLocale),
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'blueprints'])),
    },
    revalidate: 3600,
  };
};

export default BlueprintsIndexPage;
