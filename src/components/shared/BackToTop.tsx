import Image from 'next/image';
import { useTranslation } from 'next-i18next/pages';

// Real `.back_to_top` — a plain `<a href="#Top">` anchor, not a JS scroll
// listener. Positioned `position: fixed; inset: auto 0% 0% auto` (always
// physically bottom-right, regardless of locale direction) and always
// visible — the real site has no scroll-threshold show/hide logic.
const BACK_TO_TOP_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d0d77a550a56fc5479f882_back_to_top_icon.png';

/**
 * Every page already has `<main id="main-content">` (used by the skip-link
 * in _app.tsx), so this reuses that same anchor target instead of adding a
 * redundant `id="Top"` to every page — zero JS, native browser anchor
 * scroll, so there's no scroll-listener or JS bundle cost at all.
 */
export function BackToTop() {
  const { t } = useTranslation('common');

  return (
    <a
      href="#main-content"
      aria-label={t('backToTop')}
      className="fixed bottom-0 right-0 z-10 m-2.5 mb-6"
    >
      <Image src={BACK_TO_TOP_ICON_URL} alt="" width={44} height={44} unoptimized className="h-11 w-11" />
    </a>
  );
}
