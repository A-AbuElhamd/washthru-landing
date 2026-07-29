import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Hero } from '@/components/sections/Hero';
import { WhoWeAreTeaser } from '@/components/sections/WhoWeAreTeaser';
import { ProductHighlights } from '@/components/sections/ProductHighlights';
import { Features } from '@/components/sections/Features';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Partners } from '@/components/sections/Partners';
import { Contact } from '@/components/sections/Contact';
import { websiteSchema, webPageSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

const HomePage: NextPage = () => {
  const { t } = useTranslation(['common', 'home']);
  const locale = useLocale();
  const title = t('home:meta.title', { defaultValue: t('common:meta.defaultTitle') });
  const description = t('home:meta.description', {
    defaultValue: t('common:meta.defaultDescription'),
  });

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/"
        locale={locale}
        jsonLd={[websiteSchema(locale), webPageSchema({ title, description, path: '/', locale })]}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <WhoWeAreTeaser />
        <ProductHighlights />
        <Features />
        <Services />
        <Testimonials />
        <Partners />
        <Contact />
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

export default HomePage;
