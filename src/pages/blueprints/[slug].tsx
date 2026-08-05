import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { getAllBlueprintSlugs, getBlueprintBySlug } from '@/utils/blueprints';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { LOCALES, resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/utils/cn';
import type { BlueprintPlan } from '@/types/content';

interface BlueprintDetailPageProps {
  plan: BlueprintPlan;
}

// Real `.plan-text-wrap` decorative background, scoped to the hero's text
// column only (not the whole hero).
const HERO_TEXT_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e779b0a17e8849daeebc_home-bg-01.svg';

// Real `.div-block-2143` swipe hint icon, shown under the 3D viewer.
const SWIPE_HINT_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6450b2b151a4509647f352ec_swipe%20left%20right.svg';

// Real share icons.
const SHARE_WHATSAPP_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64316d7f3f44a7af4a4fa0ee_Vector.svg';
const SHARE_TWITTER_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64316d87cbc3b75fde4d4856_Twitter_icon.svg';
const SHARE_FACEBOOK_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64316d8ca50b9ccc3d4b24fc_facebook_icon.svg';

// Real `.general_button-00.hover` footer download-button background.
const FOOTER_BUTTON_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e9559eb1ee6ff45a9fc6_arrow-button-01.svg';
const FOOTER_BUTTON_ARROW_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac2ebed31a0eed381f25f5_button_arrow_icon.png';

const BlueprintDetailPage: NextPage<BlueprintDetailPageProps> = ({ plan }) => {
  const { t } = useTranslation(['common', 'blueprints']);
  const locale = useLocale();

  const shareUrl = `https://www.washthru.com/plans-ar/${plan.slug}`;
  const specs = [
    { label: t('blueprints:card.ideaLabel'), value: plan.ideaLabel },
    { label: t('blueprints:card.planNumberLabel'), value: plan.planNumber },
    { label: t('blueprints:card.areaLabel'), value: plan.areaLabel },
    { label: t('blueprints:card.measurementLabel'), value: plan.measurementLabel },
  ];

  return (
    <>
      <Seo
        title={plan.title}
        description={plan.intro}
        path={`/blueprints/${plan.slug}`}
        locale={locale}
        jsonLd={[
          webPageSchema({ title: plan.title, description: plan.intro, path: `/blueprints/${plan.slug}`, locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('blueprints:hero.titleLine1'), path: '/blueprints' },
              { name: plan.title, path: `/blueprints/${plan.slug}` },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        {/* Real `.plan_hero_section` — 60% image / 40% text (with its own
            decorative background), min-height 650px. */}
        <section className="min-h-[650px]">
          <div className="flex flex-col lg:flex-row">
              <div
              className="w-full bg-no-repeat px-6 py-10 lg:w-2/5 lg:px-10 lg:py-16"
              style={{ backgroundImage: `url(${HERO_TEXT_BG_URL})`, backgroundPosition: '0%', backgroundSize: 'cover' }}
            >
              <Reveal>
                <h1 className="text-3xl leading-relaxed font-semibold text-brand lg:text-[42px]">{plan.title}</h1>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">{plan.intro}</p>

                <dl className="mt-6 flex flex-col gap-2">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex gap-1.5 text-sm">
                      <dt className="text-brandtext-fg-muted">{spec.label}</dt>
                      <dd className="font-medium text-fg">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm text-fg-muted">{t('blueprints:detail.shareLabel')}</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('blueprints:detail.shareWhatsapp')}
                  >
                    <Image src={SHARE_WHATSAPP_ICON} alt="" width={21} height={21} unoptimized className="h-[21px] w-[21px]" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('blueprints:detail.shareX')}
                  >
                    <Image src={SHARE_TWITTER_ICON} alt="" width={21} height={21} unoptimized className="h-[21px] w-[21px]" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('blueprints:detail.shareFacebook')}
                  >
                    <Image src={SHARE_FACEBOOK_ICON} alt="" width={21} height={21} unoptimized className="h-[21px] w-[21px]" />
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="relative h-[360px] w-full bg-surface lg:h-[650px] lg:w-3/5">
              <Image src={plan.imageUrl} alt="" fill sizes="(min-width: 1024px) 60dvw, 100dvw" className="object-contain" priority />
            </div>
          
          </div>
        </section>

        {/* Real `.section-7` — Sketchfab 3D viewer + swipe hint. */}
        <section className="bg-[#f4f4f4] py-10">
          <Container>
            <div className="overflow-hidden">
              <iframe
                title={plan.title}
                src={plan.sketchfabEmbedUrl}
                className="h-[460px] w-full sm:h-[550px]"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Image src={SWIPE_HINT_URL} alt="" width={80} height={32} unoptimized className="h-8 w-20 object-contain" />
            </div>
          </Container>
        </section>

        {/* Real `.section-6` — full-width technical drawing. */}
        <section className="py-10">
          <Container>
            <div className="relative mx-auto w-full max-w-[1200px]" style={{ aspectRatio: '4 / 3' }}>
              <Image src={plan.drawingImageUrl} alt="" fill sizes="(min-width: 1024px) 1200px, 100dvw" className="object-contain" />
            </div>
          </Container>
        </section>

        {/* Real `.section-4` — "مميزات المخطط" heading + 4 alternating
            image/text feature rows. */}
        <section className="py-10 md:py-16">
          <Container>
            <h2 className="text-3xl font-medium text-fg lg:text-[42px]">
              <strong className="font-semibold text-brand leading-relaxed">{t('blueprints:detail.featuresHeadingLine1')}</strong>
              <br />
              {t('blueprints:detail.featuresHeadingLine2')}
            </h2>
            <br />
            <br />
            <hr />
            <div className="mt-10 flex flex-col gap-16">
              {plan.features.map((feature, index) => (
                <Reveal key={feature.title}>
                  <div
                    className={cn(
                      'flex flex-col items-center gap-8 lg:flex-row lg:gap-16',
                      index % 2 === 1 && 'lg:flex-row-reverse'
                    )}
                  >
                      <div className="w-full text-start lg:w-1/2">
                      <h3 className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                        {feature.description}
                      </p>
                    </div>
                    <div className="relative aspect-[4/3] w-full lg:w-1/2">
                      <Image
                        src={feature.imageUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 50dvw, 100dvw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Real `.section-8` — closing summary card: title/intro/download
            button beside a small cover thumbnail, on a light `#f5f5f7`
            background (real `--white-smoke`), not a filled brand-blue
            band. Real `.div-block-2114` also hardcodes `direction: rtl`. */}
        <section className="bg-[#f5f5f7] py-10 md:py-16">
          <Container>
            <div
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              className="flex flex-col items-center md:items-end justify-between gap-8 md:flex-row-reverse"
            >
                 <div className="shadow-lg transition-shadow duration-500 hover:shadow-2xl">
                <Image
                  src={plan.footerCoverImageUrl}
                  alt=""
                  width={320}
                  height={399}
                  unoptimized
                  className="h-auto max-h-[399px] w-full object-contain"
                />
              </div>
              <div className="max-w-[527px] text-start">
                <h3 className="text-2xl font-medium text-brand lg:text-[28px]">{plan.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[15px]">{plan.intro}</p>
                <a
                  href={plan.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundImage: `url(${FOOTER_BUTTON_BG_URL})` }}
                  className="mt-8  flex h-11 pr-[4.7px] w-[155px] items-center self-start bg-cover bg-no-repeat ps-8 text-sm font-light text-white [filter:invert(1)_grayscale(1)] transition-all duration-300 hover:[filter:none]"
                >
                  {t('blueprints:card.viewDownload')}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALES.flatMap((locale) =>
    getAllBlueprintSlugs(locale).map((slug) => ({ params: { slug }, locale }))
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlueprintDetailPageProps> = async ({ params, locale }) => {
  const resolvedLocale = resolveLocale(locale);
  const plan = getBlueprintBySlug(params!.slug as string, resolvedLocale);
  if (!plan) return { notFound: true };

  return {
    props: {
      plan,
      ...(await serverSideTranslations(locale!, ['common', 'blueprints'])),
    },
  };
};

export default BlueprintDetailPage;
