import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ProductHighlights } from '@/components/sections/ProductHighlights';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

// Real `/ar/our-products` (`rollover_machine_section_01` + `tunnel_machine_section`)
// is, content-wise, the exact same two blocks as the homepage's product
// highlights — same headings, same paragraphs, same Lottie animations, same
// "استعراض المنتج" buttons. (The real page also has a warranty/guarantees
// slider further down, but it's wrapped in `<div class="section hide">` —
// `display:none` in the real compiled CSS — so it's not part of the page's
// actual visible content and isn't reproduced here.) Reusing the shared
// `ProductHighlights` component directly keeps this page byte-for-byte in
// sync with the homepage instead of maintaining a second, drifting copy.
const OurProductsPage: NextPage = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();

  const title = t('meta.defaultTitle');
  const description = t('meta.defaultDescription');

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), path: '/' },
    { label: t('nav.ourProducts') },
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
              { name: t('breadcrumbs.home'), path: '/' },
              { name: t('nav.ourProducts'), path: '/our-products' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="pt-6">
          <Breadcrumbs items={breadcrumbItems} />
          {/* The real page's own headings (inside ProductHighlights below) are
              `<h1>`s in the source markup — a real SEO quirk (two h1s on one
              page) this project deliberately doesn't reproduce. A single
              sr-only h1 keeps the page's document outline correct without
              changing what's visibly rendered. */}
          <h1 className="sr-only">{t('nav.ourProducts')}</h1>
        </Container>
        <ProductHighlights />
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'home'])),
    },
    revalidate: 3600,
  };
};

export default OurProductsPage;
