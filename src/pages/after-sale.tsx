import { useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Carousel } from '@/components/shared/Carousel';
import { cn } from '@/utils/cn';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

interface WarrantyItem {
  id: string;
  lead: string;
  rest: string;
}

interface PlanTierBonus {
  monthly: string;
  annual: string;
}

interface PlanFeature {
  text: string;
  detail?: string;
}

interface PlanTier {
  id: string;
  nameLine1: string;
  nameLine2: string;
  tagline: string | null;
  features: PlanFeature[];
  discounts: string[];
  bonus: PlanTierBonus | null;
  priceMonthly: string | null;
  priceAnnual: string | null;
  priceAnnualStrike: string | null;
  highlighted: boolean;
}

// Real `.tab-link-3` background-image tab shapes (gray/blue slanted tags).
const TAB_BG_INACTIVE_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63e8d62663db55a34f1cf6f9_as-tab-gray.svg';
const TAB_BG_ACTIVE_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63e8d6191eb4adc7fee8a05e_as-tab-blue.svg';

/**
 * Real `.package-info-icon-wrap` hover popover — shows the feature's full
 * explanation on hover/focus, matching the real dropdown-on-hover behavior.
 */
function FeatureRow({ feature }: { feature: PlanFeature }) {
  return (
    <li className="group relative flex min-w-0 items-start justify-between gap-2 text-sm text-fg-muted">
      <span className="flex min-w-0 items-start gap-2">
        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
        <span className="break-words">{feature.text}</span>
      </span>
      {feature.detail ? (
        <>
          <button
            type="button"
            className="shrink-0 rounded-full text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Info aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">{feature.text}</span>
          </button>
          <div
            role="tooltip"
            className="invisible absolute end-0 top-full z-20 mt-2 w-72 max-w-[85vw] rounded-md border border-brand bg-bg p-4 text-start text-sm text-fg opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          >
            {feature.detail}
          </div>
        </>
      ) : null}
    </li>
  );
}

/** Real `.as-hero-section` warranty carousel icons, sourced from production CDN. */
const WARRANTY_ICON_URLS: Record<string, string> = {
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

// Real `.pricing-card` / `.pricing-card.recommended` background illustrations
// — the diagonal cut-corner + soft shadow look is baked into these SVGs,
// not a CSS clip-path.
const PACKAGE_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ea0052add401b895c82e41_package-white-bg.svg';
const PACKAGE_BG_RECOMMENDED_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63eb5887097e205f59099645_package-blue-line-bg.svg';

// Real `.as-hero-wrap` decorative background, right-aligned, no-repeat.
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63b17f24b337a6a1331e49d7_books_hero_bg.png';

// Real production support WhatsApp number used by every pricing card's CTA.
const SUPPORT_WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=966550954055&text&type=phone_number&app_absent=0';

const AfterSalePage: NextPage = () => {
  const { t } = useTranslation(['common', 'after-sale']);
  const locale = useLocale();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const warrantySwiperRef = useRef<SwiperInstance | null>(null);

  const title = t('after-sale:meta.title');
  const description = t('after-sale:meta.description');
  const warrantyItems = t('after-sale:warranty.items', { returnObjects: true }) as WarrantyItem[];
  const tiers = t('after-sale:plans.tiers', { returnObjects: true }) as PlanTier[];
  const recommendedBadge = t('after-sale:plans.recommendedBadge');
  const moreLabel = t('after-sale:plans.moreLabel');
  const contactLabel = t('after-sale:plans.contactLabel');

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
              { name: t('after-sale:breadcrumbLabel'), path: '/after-sale' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <h1 className="sr-only">{t('after-sale:breadcrumbLabel')}</h1>

        {/* Real `.as-hero-section` — a single autoplaying warranty carousel
            (icon + heading text per slide), not a static hero. */}
        <section
          className="py-20 md:py-40  md:min-h-[620px] bg-no-repeat bg-[position:100%_center] "
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        >
          <Container className="relative">
            {/* Real chevron nav — visible on small screens only; larger
                screens rely on swipe/autoplay and the dots below. */}
            <button
              type="button"
              onClick={() => warrantySwiperRef.current?.slidePrev()}
              aria-label={t('common:carousel.previous', { defaultValue: 'Previous slide' })}
              className="absolute start-2 top-20 z-10 -translate-y-1/2 text-brand sm:top-28 lg:hidden"
            >
              <ChevronRight aria-hidden="true" className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => warrantySwiperRef.current?.slideNext()}
              aria-label={t('common:carousel.next', { defaultValue: 'Next slide' })}
              className="absolute end-2 top-20 z-10 -translate-y-1/2 text-brand sm:top-28 lg:hidden"
            >
              <ChevronLeft aria-hidden="true" className="h-8 w-8" />
            </button>
            <Carousel
              items={warrantyItems}
              slidesPerView={1}
              loop
              autoplayDelay={4000}
              showDots
              onSwiperInstance={(instance) => {
                warrantySwiperRef.current = instance;
              }}
              renderItem={(item) => (
                <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-28 md:text-start">
                  <p className="max-w-xl text-xl font-light leading-[1.8] text-brand sm:text-2xl lg:text-[32px] order-2 md:order-1">
                    <strong className="font-bold leading-[1.8]">{item.lead}</strong> <span className="leading-[1.4]">{item.rest}</span>
                  </p>
                  <div className="flex w-full shrink-0 items-center justify-center md:w-2/5 order-1 md:order-2">
                    <Image
                      src={WARRANTY_ICON_URLS[item.id]}
                      alt=""
                      aria-hidden="true"
                      width={280}
                      height={280}
                      unoptimized
                      className="h-40 w-40 object-contain sm:h-56 sm:w-56 md:h-80 md:w-80"
                    />
                  </div>
                </div>
              )}
            />
          </Container>
        </section>

        {/* Real `.as-packages-section` — a big two-line heading, a
            monthly/annual tab toggle, and four pricing cards. */}
        <section aria-labelledby="after-sale-plans-heading" className="py-12 md:py-20">
          <Container>
            <h2
              id="after-sale-plans-heading"
              className="text-3xl font-normal leading-c text-fg sm:text-4xl lg:text-[48px]"
            >
              {t('after-sale:plans.headingLine1')}
              <br />
              <br />
              <span className="text-brand">{t('after-sale:plans.headingLine2')}</span>
            </h2>

            {/* Real `.tab-link-3` — slanted tag-shaped tabs rendered from a
                background-image (gray/blue), not a plain rounded pill. */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {(['monthly', 'annual'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBilling(option)}
                  aria-pressed={billing === option}
                  style={{
                    backgroundImage: `url(${billing === option ? TAB_BG_ACTIVE_URL : TAB_BG_INACTIVE_URL})`,
                  }}
                  className={cn(
                    'flex h-14 w-[150px] items-center justify-center bg-contain bg-no-repeat text-base font-semibold transition-colors',
                    billing === option ? 'text-white' : 'text-fg-muted'
                  )}
                >
                  {t(`after-sale:plans.tabs.${option}`)}
                </button>
              ))}
            </div>

            {/* Real site: a horizontally-scrolling row of fixed-width cards
                below `lg`, becoming a plain 4-column grid at `lg` and up. */}
            <div className="mt-10 flex items-stretch gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:items-stretch lg:overflow-visible lg:pb-0">
              {tiers.map((tier) => {
                const price = billing === 'monthly' ? tier.priceMonthly : tier.priceAnnual;
                const bonus = tier.bonus?.[billing] ?? null;

                return (
                  <div key={tier.id} className="relative w-[280px] shrink-0 snap-start lg:w-auto">
                    {tier.highlighted ? (
                      <span className="absolute -top-3 start-6 z-10 rounded-full bg-brand px-4 py-1 text-xs font-medium text-white">
                        {recommendedBadge}
                      </span>
                    ) : null}
                    <div
                      style={{
                        backgroundImage: `url(${tier.highlighted ? PACKAGE_BG_RECOMMENDED_URL : PACKAGE_BG_URL})`,
                      }}
                      className={cn(
                        'flex h-full min-w-0 flex-col bg-left-top bg-auto bg-no-repeat p-6 transition-shadow duration-300 hover:shadow-[28px_10px_30px_rgba(0,0,0,0.2)]',
                        tier.highlighted ? 'border-b-2 border-r-2 border-brand' : 'border-b-[3px] border-r-[3px] border-[#e9e9e9]'
                      )}
                    >
                    <h3 className="text-xl font-medium leading-snug text-fg sm:text-2xl">
                      <strong className="font-semibold">{tier.nameLine1}</strong>
                      <br />
                      {tier.nameLine2}
                    </h3>
                    {tier.tagline ? (
                      <p className="mt-2 text-sm font-light text-brand">{tier.tagline}</p>
                    ) : null}

                    <ul className="mt-6 flex flex-col gap-3">
                      {tier.features.map((feature) => (
                        <FeatureRow key={feature.text} feature={feature} />
                      ))}
                    </ul>

                    <div className="mt-6 flex-1">
                      {tier.discounts.length > 0 ? (
                        <ul className="flex flex-col gap-1">
                          {tier.discounts.map((discount) => (
                            <li key={discount} className="break-words text-sm text-live">
                              {discount}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {bonus ? <p className="mt-3 text-base font-semibold text-fg">{bonus}</p> : null}
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                      {price ? (
                        <div className="mb-4">
                          {billing === 'annual' && tier.priceAnnualStrike ? (
                            <p className="text-sm text-fg-muted line-through">{tier.priceAnnualStrike}</p>
                          ) : null}
                          <p className="text-lg font-medium text-brand">{price}</p>
                        </div>
                      ) : null}
                      <a
                        href={SUPPORT_WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="-mx-6 -mb-6 flex items-center justify-center px-6 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                      >
                        {price ? moreLabel : contactLabel}
                      </a>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-sm text-fg-muted">{t('after-sale:plans.note')}</p>
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
