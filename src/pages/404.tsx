import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/shared/Button';
import { useLocale } from '@/hooks/useLocale';

const NotFoundPage: NextPage = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();

  return (
    <>
      <Seo
        title={t('errors.notFoundTitle')}
        description={t('errors.notFoundDescription')}
        path="/404"
        locale={locale}
        robots={{ index: false, follow: true }}
      />
      <Header />
      <main id="main-content" className="flex flex-1 items-center justify-center py-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <p className="text-sm font-semibold text-brand">404</p>
          <h1 className="mt-2 text-3xl font-bold text-fg">{t('errors.notFoundTitle')}</h1>
          <p className="mt-3 text-fg-muted">{t('errors.notFoundDescription')}</p>
          <div className="mt-8">
            <Button href="/" variant="primary">
              {t('errors.backHome')}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

// Statically prerendered per locale, same as every other page — this is what
// fixes a real build-time warning: Next's own auto-generated fallback /404
// (with no custom page here) has no getStaticProps, so _app.tsx's
// unconditional useTranslation('common') call had nothing to hydrate from.
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common'])),
    },
  };
};

export default NotFoundPage;
