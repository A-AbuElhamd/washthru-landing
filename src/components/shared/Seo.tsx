import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next/pages';
import { JsonLd } from '@/components/shared/JsonLd';
import { SITE } from '@/config/site';
import { resolveLocale } from '@/i18n/config';
import { buildSeo, canonicalUrl } from '@/utils/seo';
import type { SeoProps } from '@/types/seo';

const OG_LOCALE: Record<'ar' | 'en', string> = {
  ar: 'ar_SA',
  en: 'en_US',
};

/** Central SEO component: title, description, canonical, hreflang alternates, OG, Twitter Card, theme-color, article meta, and JSON-LD. */
export function Seo({
  title,
  description,
  path,
  locale,
  keywords,
  robots,
  ogImage,
  themeColor,
  article,
  jsonLd,
}: SeoProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  const resolvedLocale = locale ?? resolveLocale(router.locale);
  const resolvedPath = path ?? router.asPath.split('?')[0].split('#')[0];

  const seo = buildSeo({
    path: resolvedPath,
    locale: resolvedLocale,
    title,
    description,
    fallbackTitle: t('meta.defaultTitle'),
    fallbackDescription: t('meta.defaultDescription'),
    siteNameSuffix: `| ${SITE.name}`,
    robots,
    ogImage,
  });

  const canonical = canonicalUrl(resolvedPath, resolvedLocale);
  const ogType = article ? 'article' : 'website';
  const ogLocale = OG_LOCALE[resolvedLocale];
  const themeColorLight = themeColor?.light ?? SITE.themeColor.light;
  const themeColorDark = themeColor?.dark ?? SITE.themeColor.dark;
  const robotsContent = `${seo.robots.index === false ? 'noindex' : 'index'},${
    seo.robots.follow === false ? 'nofollow' : 'follow'
  }`;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        {seo.alternates.map((alt) => (
          <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
        ))}
        {keywords && keywords.length > 0 ? (
          <meta name="keywords" content={keywords.join(', ')} />
        ) : null}
        <meta name="robots" content={robotsContent} />

        {/* Open Graph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:type" content={ogType} />
        <meta property="og:locale" content={ogLocale} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE.twitterHandle} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        {/* Theme color */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={themeColorLight} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content={themeColorDark} />

        {article ? (
          <>
            <meta property="article:published_time" content={article.publishedTime} />
            {article.modifiedTime ? (
              <meta property="article:modified_time" content={article.modifiedTime} />
            ) : null}
            <meta property="article:author" content={article.author} />
            {article.tags?.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        ) : null}
      </Head>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
    </>
  );
}
