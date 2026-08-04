import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { getAllBlueprints } from '@/utils/blueprints';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/utils/cn';
import type { BlueprintPlan } from '@/types/content';

interface BlueprintsIndexPageProps {
  plans: BlueprintPlan[];
}

// Real `.cu_hero_wrap` icon + decorative background (same pattern as the
// contact-us / who-we-are heroes).
const HERO_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6433ff037b5ef2f0433c5966_blueprint-icon.svg';
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e779b0a17e8849daeebc_home-bg-01.svg';

type CategoryKey = 'station' | 'service-center';
type StreetGroupKey = 'four' | 'three' | 'two' | 'one';

interface StreetVariant {
  streetConfig: BlueprintPlan['streetConfig'];
  labelKey: string;
  icon: string;
}

interface StreetGroup {
  key: StreetGroupKey;
  labelKey: string;
  variants: StreetVariant[];
}

// Real `.bp-tabs-01/02/03` nested tabs — category, then street count, then
// (for 2 and 3 streets only) a neighbor/street-side variant.
const STREET_GROUPS: StreetGroup[] = [
  {
    key: 'four',
    labelKey: 'tabs.streets4',
    variants: [
      {
        streetConfig: 'four-streets',
        labelKey: 'tabs.streets4Icon',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6431592a5d665f00562ce769_4street.svg',
      },
    ],
  },
  {
    key: 'three',
    labelKey: 'tabs.streets3',
    variants: [
      {
        streetConfig: 'three-streets-before',
        labelKey: 'tabs.neighborBefore',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6450fea0a5b61a25c5b0bff1_3streets-before.svg',
      },
      {
        streetConfig: 'three-streets-after',
        labelKey: 'tabs.neighborAfter',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6450feac32ed078a463a17d9_3streets-after.svg',
      },
      {
        streetConfig: 'three-streets-behind',
        labelKey: 'tabs.neighborBehind',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6450fec59ad8ebba3e0f0575_3streets-behind.svg',
      },
    ],
  },
  {
    key: 'two',
    labelKey: 'tabs.streets2',
    variants: [
      {
        streetConfig: 'two-streets-after',
        labelKey: 'tabs.streetAfter',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64315abae9cbf029a521e4ae_2streets-after.svg',
      },
      {
        streetConfig: 'two-streets-behind',
        labelKey: 'tabs.streetBehind',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64315ac3e9cbf0833821e546_2streets-behind.svg',
      },
      {
        streetConfig: 'two-streets-before',
        labelKey: 'tabs.streetBefore',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64315acb92ccec473e15bd5f_2streets-before.svg',
      },
    ],
  },
  {
    key: 'one',
    labelKey: 'tabs.streets1',
    variants: [
      {
        streetConfig: 'one-street',
        labelKey: 'tabs.streets1Icon',
        icon: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/643182e801d447d13450c20c_one-street.svg',
      },
    ],
  },
];

const BlueprintsIndexPage: NextPage<BlueprintsIndexPageProps> = ({ plans }) => {
  const { t } = useTranslation(['common', 'blueprints']);
  const locale = useLocale();

  const title = t('blueprints:meta.title');
  const description = t('blueprints:meta.description');

  // Real site defaults to the "محطات" (station) category and, within it,
  // the single-street tab — the only combination with real cards.
  const [category, setCategory] = useState<CategoryKey>('station');
  const [streetGroupKey, setStreetGroupKey] = useState<StreetGroupKey>('one');
  const streetGroup = STREET_GROUPS.find((group) => group.key === streetGroupKey)!;
  const [variant, setVariant] = useState<BlueprintPlan['streetConfig']>(streetGroup.variants[0].streetConfig);

  function selectStreetGroup(group: StreetGroup) {
    setStreetGroupKey(group.key);
    setVariant(group.variants[0].streetConfig);
  }

  // Real site never has any `مراكز الخدمة` (service-center) plans — every
  // combination under that category shows the empty state.
  const visiblePlans = category === 'station' ? plans.filter((plan) => plan.streetConfig === variant) : [];

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
              { name: t('blueprints:hero.titleLine1'), path: '/blueprints' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <h1 className="sr-only">
          {t('blueprints:hero.titleLine1')} {t('blueprints:hero.titleLine2')}
        </h1>

        {/* Real `.cu_hero_section` — decorative icon beside a two-tone
            heading + intro paragraph. Real `.cu_hero_wrap` background is
            scoped to this section only. */}
        <section
          className="bg-no-repeat py-10 md:py-16"
          style={{ backgroundImage: `url(${HERO_BG_URL})`, backgroundPosition: '100%' }}
        >
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="text-start">
                  <p className="text-3xl font-normal leading-tight sm:text-4xl lg:text-[48px]">
                    {t('blueprints:hero.titleLine1')}{' '}
                    <span className="text-brand">{t('blueprints:hero.titleLine2')}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                    {t('blueprints:hero.intro')}
                  </p>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={HERO_ICON_URL}
                    alt=""
                    aria-hidden="true"
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

        {/* Real `.bp_contact_section` — three levels of plain underline
            tabs (category → street count → neighbor/street-side variant)
            above the plan grid. */}
        <section className="py-10 md:py-16">
          <Container>
            <p className="text-sm font-medium text-brand">{t('blueprints:tabs.choosePlanType')}</p>

            {/* Level 1: category */}
            <div className="mt-4 flex min-h-20 flex-wrap items-stretch justify-center gap-x-1">
              {(['service-center', 'station'] as CategoryKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={cn(
                    'flex flex-col items-center justify-center border-b px-8 py-2.5 text-sm',
                    category === key
                      ? 'border-brand text-brand underline'
                      : 'border-border text-fg'
                  )}
                >
                  {t(key === 'station' ? 'blueprints:tabs.station' : 'blueprints:tabs.serviceCenter')}
                </button>
              ))}
            </div>

            {/* Level 2: street count */}
            <div className="mt-1 flex min-h-20 flex-wrap items-stretch justify-center gap-x-1">
              {STREET_GROUPS.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => selectStreetGroup(group)}
                  className={cn(
                    'flex flex-col items-center justify-center border-b px-8 py-2.5 text-sm',
                    streetGroupKey === group.key
                      ? 'border-brand text-brand underline'
                      : 'border-border text-fg'
                  )}
                >
                  {t(`blueprints:${group.labelKey}`)}
                </button>
              ))}
            </div>

            {/* Level 3: neighbor / street-side variant, icon tabs */}
            <div className="mt-1 flex min-h-20 flex-wrap items-stretch justify-center gap-x-1">
              {streetGroup.variants.map((v) => (
                <button
                  key={v.streetConfig}
                  type="button"
                  onClick={() => setVariant(v.streetConfig)}
                  className={cn(
                    'flex flex-col items-center justify-center border-b px-8 py-2.5 text-sm',
                    variant === v.streetConfig
                      ? 'border-brand text-brand underline'
                      : 'border-border text-fg'
                  )}
                >
                  {t(`blueprints:${v.labelKey}`)}
                  <Image
                    src={v.icon}
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    unoptimized
                    className="mt-2.5 h-10 w-10 object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Real `.div-block-2118` plan grid, with `.empty-state-2` when
                a combination has no plans — true for every service-center
                combination and most station combinations. */}
            <div className="mt-14">
              {visiblePlans.length === 0 ? (
                <p className="text-center text-xs text-fg-muted">{t('blueprints:emptyState')}</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-8">
                  {visiblePlans.map((plan) => (
                    <Reveal key={plan.slug} className="w-full max-w-[416px]">
                      {/* Real `.flex-block` — bordered card, border turns
                          black on hover (not blue). */}
                      <div className="flex h-full flex-col overflow-hidden rounded-md border border-[#bbb] transition-colors duration-300 hover:border-black">
                        <div className="relative h-[279px] w-full">
                          <Image
                            src={plan.imageUrl}
                            alt=""
                            fill
                            sizes="416px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-5 p-6 text-start">
                          <p className="text-2xl font-normal text-brand lg:text-[28px]">{plan.title}</p>
                          <dl className="flex flex-col gap-2.5">
                            <div className="flex justify-start gap-1.5 text-sm">
                              <dd className="text-fg-muted">{plan.measurementLabel}</dd>
                              <dt className="text-fg-muted">{t('blueprints:card.measurementLabel')}</dt>
                            </div>
                            <div className="flex justify-start gap-1.5 text-sm">
                              <dd className="text-fg-muted">{plan.areaLabel}</dd>
                              <dt className="text-fg-muted">{t('blueprints:card.areaLabel')}</dt>
                            </div>
                            <div className="flex justify-start gap-1.5 text-sm">
                              <dd className="text-fg-muted">{plan.planNumber}</dd>
                              <dt className="text-fg-muted">{t('blueprints:card.planNumberLabel')}</dt>
                            </div>
                            <div className="flex justify-start gap-1.5 text-sm">
                              <dd className="text-fg-muted">{plan.ideaLabel}</dd>
                              <dt className="text-fg-muted">{t('blueprints:card.ideaLabel')}</dt>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
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
