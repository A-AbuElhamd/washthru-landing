import { useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Carousel } from '@/components/shared/Carousel';
import { JsonLd } from '@/components/shared/JsonLd';
import { webPageSchema, breadcrumbSchema, servicesSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';
import { servicesDetail } from '@/data/servicesDetail';

// Real `.right_arrow` / `.left_arrow` — the site's shared blue chevrons.
const PREV_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53835026df8042e0e6781_right-arrow-blue.svg';
const NEXT_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d5385b52367707591972b8_left-arrow-blue.svg';

const ServicesPage: NextPage = () => {
  const { t } = useTranslation(['common', 'services']);
  const locale = useLocale();

  const title = t('services:meta.title');
  const description = t('services:meta.description');
  const serviceNames = servicesDetail.map((service) => service.title[locale]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const activeService =
    servicesDetail[activeIndex] ??
    servicesDetail[((activeIndex % servicesDetail.length) + servicesDetail.length) % servicesDetail.length];

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
        <h1 className="sr-only">{t('services:breadcrumbLabel')}</h1>

        {/* Real `.services_section` — a single full-bleed slider, no hero,
            intro, catalog grid, or CTA. Each slide is a real photo (top 80%)
            with a white info bar (bottom 20%, min 130px) holding one icon +
            one line of text, and two chevron buttons pinned to the bar's
            near corner. `data-infinite="true"` / `data-autoplay="false"`. */}
        <section className="overflow-hidden">
          <div className="relative h-[528px] w-full">
            <Carousel
              items={servicesDetail}
              slidesPerView={1}
              loop
              className="h-full"
              hideNav
              onSwiperInstance={(instance) => {
                swiperRef.current = instance;
              }}
              onSlideChange={setActiveIndex}
              renderItem={(service) => (
                <div className="relative h-[528px] w-full">
                  <Image
                    src={service.bgUrl}
                    alt=""
                    fill
                    sizes="100vw"
                    priority={service.id === servicesDetail[0]?.id}
                    className="object-cover"
                  />
                </div>
              )}
            />
          </div>
          {/* Real `.service_down_wrap` — a normal-flow white bar below the
              photo (never absolutely overlaid on it), so it can never be
              hidden by the slider's own height/stacking. */}
          <div className="relative flex flex-col items-center gap-3 bg-white px-4 py-4 sm:min-h-[130px] sm:flex-row sm:justify-center sm:gap-6 sm:ps-8 sm:pe-[218px] sm:py-0">
            {/* Small screens: controls centered, above the info text. */}
            <div className="flex items-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={t('common:carousel.previous', { defaultValue: 'Previous slide' })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image src={PREV_ARROW_ICON} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={t('common:carousel.next', { defaultValue: 'Next slide' })}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image src={NEXT_ARROW_ICON} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
              </button>
            </div>

            <Image
              src={activeService.iconUrl}
              alt=""
              aria-hidden="true"
              width={80}
              height={72}
              unoptimized
              className="h-12 w-14 shrink-0 object-contain sm:h-[72px] sm:w-[80px]"
            />
            <p className="max-w-[720px] text-center text-sm font-medium leading-snug text-fg sm:text-end sm:text-base lg:text-[20px]">
              {activeService.description[locale]}
            </p>

            {/* Real `.right_arrow` / `.left_arrow` — two 109px-wide chevron
                buttons pinned to the bar's near corner, sm and up only. */}
            <div className="absolute bottom-0 start-0 hidden h-full sm:flex">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={t('common:carousel.previous', { defaultValue: 'Previous slide' })}
                className="flex w-[109px] items-center justify-center bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image src={PREV_ARROW_ICON} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={t('common:carousel.next', { defaultValue: 'Next slide' })}
                className="flex w-[109px] items-center justify-center bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Image src={NEXT_ARROW_ICON} alt="" width={20} height={20} unoptimized className="h-5 w-5" />
              </button>
            </div>
          </div>
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
