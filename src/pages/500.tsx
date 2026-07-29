import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Button } from '@/components/shared/Button';
import { useLocale } from '@/hooks/useLocale';

const ServerErrorPage: NextPage = () => {
  const { t } = useTranslation('common');
  const locale = useLocale();

  return (
    <>
      <Seo
        title={t('errors.serverErrorTitle')}
        description={t('errors.serverErrorDescription')}
        path="/500"
        locale={locale}
        robots={{ index: false, follow: true }}
      />
      <Header />
      <main id="main-content" className="flex flex-1 items-center justify-center py-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <p className="text-sm font-semibold text-brand">500</p>
          <h1 className="mt-2 text-3xl font-bold text-fg">{t('errors.serverErrorTitle')}</h1>
          <p className="mt-3 text-fg-muted">{t('errors.serverErrorDescription')}</p>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common'])),
    },
  };
};

export default ServerErrorPage;
