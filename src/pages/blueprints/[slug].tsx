import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Box, Download, MessageCircle, Send, Share2 } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { IconButton } from '@/components/shared/IconButton';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getAllBlueprintSlugs, getBlueprintBySlug } from '@/utils/blueprints';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { absoluteUrl } from '@/utils/seo';
import { formatNumber } from '@/utils/format';
import { LOCALES, resolveLocale } from '@/i18n/config';
import { useLocale } from '@/hooks/useLocale';
import type { BlueprintPlan } from '@/types/content';

interface BlueprintDetailPageProps {
  plan: BlueprintPlan;
}

const BlueprintDetailPage: NextPage<BlueprintDetailPageProps> = ({ plan }) => {
  const { t } = useTranslation(['common', 'blueprints']);
  const locale = useLocale();

  const shareUrl = absoluteUrl(`/blueprints/${plan.slug}`, locale);

  return (
    <>
      <Seo
        title={plan.title}
        description={plan.description}
        path={`/blueprints/${plan.slug}`}
        locale={locale}
        jsonLd={[
          webPageSchema({
            title: plan.title,
            description: plan.description,
            path: `/blueprints/${plan.slug}`,
            locale,
          }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('common:breadcrumbs.blueprints'), path: '/blueprints' },
              { name: plan.title, path: `/blueprints/${plan.slug}` },
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
              { label: t('common:breadcrumbs.blueprints'), path: '/blueprints' },
              { label: plan.title },
            ]}
          />

          {/* Hero cluster: badge, title, lead description, metadata and share
              all live together here — matching the real plan page, where the
              metadata list and share row sit alongside the title/description
              rather than being scattered into their own sections below the
              3D viewer. */}
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-fg">
            {plan.planTypeLabel}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-fg sm:text-4xl">{plan.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-fg-muted">{plan.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-6 rounded-lg border border-border bg-surface p-6 sm:grid-cols-4">
            <div>
              <dt className="text-sm text-fg-muted">{t('blueprints:detail.planNumberLabel')}</dt>
              <dd className="mt-1 font-medium text-fg">{plan.planNumber}</dd>
            </div>
            <div>
              <dt className="text-sm text-fg-muted">{t('blueprints:detail.planTypeLabel')}</dt>
              <dd className="mt-1 font-medium text-fg">{plan.planTypeLabel}</dd>
            </div>
            <div>
              <dt className="text-sm text-fg-muted">{t('blueprints:detail.streetConfigLabel')}</dt>
              <dd className="mt-1 font-medium text-fg">{plan.streetConfigLabel}</dd>
            </div>
            <div>
              <dt className="text-sm text-fg-muted">{t('blueprints:detail.areaLabel')}</dt>
              <dd className="mt-1 font-medium text-fg">
                {t('blueprints:detail.areaUnit', { value: formatNumber(plan.areaSqm) })}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-fg-muted">{t('blueprints:detail.dimensionsLabel')}</dt>
              <dd className="mt-1 font-medium text-fg">
                {t('blueprints:detail.dimensionsValue', {
                  width: formatNumber(plan.dimensions.widthM),
                  depth: formatNumber(plan.dimensions.depthM),
                })}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-fg-muted">
              {t('blueprints:detail.shareHeading')}
            </span>
            <div className="flex gap-2">
              <IconButton
                href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                label={t('blueprints:detail.shareWhatsapp')}
                icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
                className="border border-border"
              />
              <IconButton
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                label={t('blueprints:detail.shareX')}
                icon={<Send className="h-5 w-5" aria-hidden="true" />}
                className="border border-border"
              />
              <IconButton
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                label={t('blueprints:detail.shareFacebook')}
                icon={<Share2 className="h-5 w-5" aria-hidden="true" />}
                className="border border-border"
              />
            </div>
          </div>

          {/* 3D viewer: full-width and prominent, directly below the hero
              cluster — matches the real page's DOM order. */}
          <section aria-labelledby="model-heading" className="mt-12">
            <SectionHeading id="model-heading" title={t('blueprints:detail.modelHeading')} />
            <div className="mt-4">
              {plan.sketchfabEmbedUrl ? (
                <div className="overflow-hidden rounded-lg border border-border">
                  <iframe
                    title={`${plan.title} – ${t('blueprints:detail.modelHeading')}`}
                    src={plan.sketchfabEmbedUrl}
                    className="h-[460px] w-full sm:h-[550px]"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    loading="lazy"
                    frameBorder={0}
                  />
                </div>
              ) : (
                <div className="flex h-[280px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface p-6 text-center">
                  <Box className="h-10 w-10 text-fg-muted" aria-hidden="true" />
                  <p className="font-medium text-fg">{t('blueprints:detail.modelPlaceholderTitle')}</p>
                  <p className="max-w-md text-sm text-fg-muted">
                    {t('blueprints:detail.modelPlaceholderBody')}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section aria-labelledby="download-heading" className="mt-12">
            <SectionHeading id="download-heading" title={t('blueprints:detail.downloadHeading')} />
            <div className="mt-4">
              {plan.pdfUrl ? (
                <a
                  href={plan.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-base font-medium text-fg hover:bg-accent"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {t('blueprints:detail.downloadButton')}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  title={t('blueprints:detail.downloadUnavailable')}
                  className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-base font-medium text-fg-muted opacity-60"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  {t('blueprints:detail.downloadButtonPlaceholder')}
                </span>
              )}
            </div>
          </section>

          <p className="mt-12">
            <Link href="/blueprints" className="font-medium text-brand hover:underline">
              {t('blueprints:detail.backToBlueprints')}
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = LOCALES.flatMap((locale) =>
    getAllBlueprintSlugs(locale).map((slug) => ({ params: { slug }, locale }))
  );
  // Every slug is known at build time from local content JSON — no external
  // CMS, so 'blocking' would add no value here (same reasoning as blog/[slug]).
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlueprintDetailPageProps> = async ({
  params,
  locale,
}) => {
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
