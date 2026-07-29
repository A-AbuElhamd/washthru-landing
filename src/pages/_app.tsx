import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { appWithTranslation, useTranslation } from 'next-i18next/pages';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { JsonLd } from '@/components/shared/JsonLd';
import { organizationSchema } from '@/utils/schema';
import { LOCALE_DIR, resolveLocale } from '@/i18n/config';
import { SITE } from '@/config/site';
import '@/styles/globals.css';

// Real production floating call/WhatsApp widget (GetButton.io) — a public,
// self-serve embeddable widget keyed only to the business's own real phone
// numbers (already used throughout this project), reproduced with the exact
// same config the source site uses.
const GETBUTTON_WIDGET_SCRIPT = `
(function () {
  var options = {
    call: ${JSON.stringify(SITE.contact.phone)},
    whatsapp: ${JSON.stringify(SITE.contact.whatsapp)},
    call_to_action: ${JSON.stringify('تواصل معنا')},
    button_color: ${JSON.stringify('#0c2ed8')},
    position: 'left',
    order: 'call,whatsapp',
  };
  var proto = 'https:', host = 'getbutton.io', url = proto + '//static.' + host;
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = url + '/widget-send-button/js/init.js';
  s.onload = function () { window.WhWidgetSendButton.init(host, proto, options); };
  var x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);
})();
`;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    const locale = resolveLocale(router.locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = LOCALE_DIR[locale];
  }, [router.locale]);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Organization schema is page-invariant — rendered once here rather
                than requiring every page type to remember to import it. */}
            <JsonLd data={organizationSchema()} />
            <a href="#main-content" className="sr-only-focusable">
              {t('a11y.skipToContent')}
            </a>
            <Component {...pageProps} />
            <Script
              id="getbutton-widget"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: GETBUTTON_WIDGET_SCRIPT }}
            />
          </SmoothScrollProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export default appWithTranslation(App);
