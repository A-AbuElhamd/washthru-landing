import { useRef } from 'react';
import dynamic from 'next/dynamic';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useScroll } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import {
  Cpu,
  GaugeCircle,
  Hand,
  PackageSearch,
  ScanEye,
  Settings2,
  ShieldAlert,
  Smartphone,
  Sparkles,
  SprayCan,
  CloudSun,
  Timer,
  Waves,
  Wifi,
  Wind,
  CheckCircle2,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Carousel } from '@/components/shared/Carousel';
import { Button } from '@/components/shared/Button';
import { SITE } from '@/config/site';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

// lottie-react drives the DOM directly via lottie-web and has no server-render
// path, so it's loaded client-only, same pattern as the homepage's
// ProductHighlights section.
const LottieAnimation = dynamic(
  () => import('@/components/shared/LottieAnimation').then((mod) => mod.LottieAnimation),
  { ssr: false }
);

// Real production Lottie animation JSON (Webflow asset CDN) — the same 3D
// rollover machine overview embedded on the live rollover.html product page
// and reused on the homepage's product-highlight section.
const ROLLOVER_ANIMATION_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d236566b16a501b2ca539c_rollover_machine_overview_90d_n1.json';

interface HeroBadge {
  id: string;
  label: string;
}

interface FeatureItem {
  id: string;
  icon: keyof typeof FEATURE_ICONS;
  title: string;
  description: string;
}

interface AdvancedItem {
  id: string;
  icon: keyof typeof ADVANCED_ICONS;
  title: string;
  description: string;
}

const FEATURE_ICONS = {
  Smartphone,
  ScanEye,
  SprayCan,
  Hand,
  Sparkles,
  Waves,
  Wind,
  CloudSun,
  Timer,
} satisfies Record<string, LucideIcon>;

const ADVANCED_ICONS = {
  ShieldAlert,
  Settings2,
  Wifi,
  Cpu,
  PackageSearch,
  GaugeCircle,
} satisfies Record<string, LucideIcon>;

const RolloverPage: NextPage = () => {
  const { t } = useTranslation(['common', 'rollover']);
  const locale = useLocale();
  const heroImageRef = useRef<HTMLDivElement>(null);
  // Real production behavior (`data-autoplay="0"`, `data-is-ix2-target="1"`
  // on the source site's Lottie div): scrubbed by scroll, not autoplayed.
  const { scrollYProgress: heroLottieProgress } = useScroll({
    target: heroImageRef,
    offset: ['start end', 'end start'],
  });

  const title = t('rollover:meta.title');
  const description = t('rollover:meta.description');
  const badges = t('rollover:hero.badges', { returnObjects: true }) as HeroBadge[];
  const features = t('rollover:features.items', { returnObjects: true }) as FeatureItem[];
  const advanced = t('rollover:advanced.items', { returnObjects: true }) as AdvancedItem[];

  const breadcrumbItems = [
    { label: t('common:breadcrumbs.home'), path: '/' },
    { label: t('common:nav.ourProducts'), path: '/our-products' },
    { label: t('rollover:breadcrumbLabel') },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/rollover"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/rollover', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:nav.ourProducts'), path: '/our-products' },
              { name: t('rollover:breadcrumbLabel'), path: '/rollover' },
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
                {t('rollover:hero.eyebrow')}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-fg md:text-5xl">
                {t('rollover:hero.title')}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-fg-muted">{t('rollover:hero.intro')}</p>

              <ul className="mt-6 flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <li
                    key={badge.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg"
                  >
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-brand" />
                    {badge.label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact-us" variant="primary" size="lg">
                  {t('common:actions.getQuote')}
                </Button>
                <a
                  href={`tel:${SITE.contact.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted hover:text-fg"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  <span>
                    {t('rollover:hero.customerService')} / {SITE.contact.phone}
                  </span>
                </a>
              </div>
            </Reveal>
            <Reveal>
              <div ref={heroImageRef} className="relative">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63da78cc9202f6e631b13429_Rollover-page-bg.png"
                  alt={t('rollover:hero.imageAlt')}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <LottieAnimation
                    src={ROLLOVER_ANIMATION_SRC}
                    scrollProgress={heroLottieProgress}
                    className="h-auto w-full max-w-lg"
                  />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Features */}
        <section aria-labelledby="rollover-features-heading" className="bg-surface py-12 md:py-20">
          <Container>
            <SectionHeading
              id="rollover-features-heading"
              title={t('rollover:features.heading')}
              subtitle={t('rollover:features.subheading')}
            />
            <Reveal className="mt-10">
              <Carousel
                items={features}
                slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
                renderItem={(feature) => {
                  const Icon = FEATURE_ICONS[feature.icon];
                  return (
                    <div className="h-full rounded-2xl border border-border bg-bg p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-fg">{feature.title}</h3>
                      <p className="mt-2 text-sm text-fg-muted">{feature.description}</p>
                    </div>
                  );
                }}
              />
            </Reveal>
          </Container>
        </section>

        {/* Advanced technology */}
        <section aria-labelledby="rollover-advanced-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="rollover-advanced-heading"
              title={t('rollover:advanced.heading')}
              subtitle={t('rollover:advanced.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {advanced.map((item) => {
                const Icon = ADVANCED_ICONS[item.icon];
                return (
                  <Reveal key={item.id}>
                    <div className="h-full rounded-2xl border border-border bg-surface p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-fg">{item.title}</h3>
                      <p className="mt-2 text-sm text-fg-muted">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Use case */}
        <section aria-labelledby="rollover-usecase-heading" className="bg-surface py-12 md:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <Image
                src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d791dad184c46103b35181_Feature_09.webp"
                alt={t('rollover:useCase.imageAlt')}
                width={1000}
                height={700}
                className="h-auto w-full rounded-2xl"
              />
            </Reveal>
            <Reveal>
              <h2 id="rollover-usecase-heading" className="text-2xl font-bold text-fg sm:text-3xl">
                {t('rollover:useCase.heading')}
              </h2>
              <p className="mt-4 text-fg-muted">{t('rollover:useCase.description')}</p>
            </Reveal>
          </Container>
        </section>

        {/* Related product */}
        <section className="py-12 md:py-20">
          <Container>
            <Reveal>
              <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-surface px-6 py-10 text-center sm:px-12 lg:flex-row lg:text-start">
                <div>
                  <h2 className="text-xl font-bold text-fg sm:text-2xl">
                    {t('rollover:relatedProduct.heading')}
                  </h2>
                  <p className="mt-2 max-w-xl text-fg-muted">
                    {t('rollover:relatedProduct.description')}
                  </p>
                </div>
                <Button href="/tunnel" variant="secondary" size="lg" className="shrink-0">
                  {t('rollover:relatedProduct.cta')}
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'rollover'])),
    },
    revalidate: 3600,
  };
};

export default RolloverPage;
