import Document, { Html, Head, Main, NextScript, type DocumentContext, type DocumentInitialProps } from 'next/document';
import { LOCALE_DIR, resolveLocale } from '@/i18n/config';
import { SITE } from '@/config/site';
import type { Locale } from '@/types/i18n';

interface WashThruDocumentProps extends DocumentInitialProps {
  locale: Locale;
}

export default class WashThruDocument extends Document<WashThruDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<WashThruDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = resolveLocale(ctx.locale);
    return { ...initialProps, locale };
  }

  render() {
    const { locale } = this.props;

    return (
      <Html lang={locale} dir={LOCALE_DIR[locale]} suppressHydrationWarning>
        <Head>
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content={SITE.themeColor.light}
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content={SITE.themeColor.dark}
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          {SITE.verification.google && (
            <meta name="google-site-verification" content={SITE.verification.google} />
          )}
          {SITE.verification.bing && (
            <meta name="msvalidate.01" content={SITE.verification.bing} />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
