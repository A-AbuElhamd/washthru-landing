import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next/pages';
import { ChevronDown, Menu, X } from 'lucide-react';
import { MORE_NAV, PRIMARY_NAV, type NavDropdownItem } from '@/config/nav';
import { Container } from '@/components/shared/Container';
import { LocaleSwitcher } from '@/components/shared/LocaleSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ContactButtons } from '@/components/shared/ContactButtons';
import { cn } from '@/utils/cn';

const MOBILE_NAV_ITEMS: NavDropdownItem[] = [...PRIMARY_NAV, ...MORE_NAV];

// The real production wordmark (intrinsic 135x39, confirmed from the SVG
// itself) — replaces the plain text logo that used to render here. Unlike
// the source markup (`alt=""` on the logo), the alt text here is the real
// site name: an empty alt on a logo that is the only textual/graphical
// identifier of the site in the header is an accessibility gap, not a
// detail worth reproducing.
const LOGO_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d1184232a91d31b218c630_WashThru_logo_01.svg';

export function Header() {
  const { t } = useTranslation('common');
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // The real source site's "More" dropdown only opens on mouse hover and is
  // unreachable by keyboard. Fixed here as a real toggle button that closes
  // on Escape and on outside-click, keeping every link Tab-reachable.
  useEffect(() => {
    if (!moreOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMoreOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={LOGO_SRC}
            alt={t('site.name', { defaultValue: 'WashThru' })}
            width={135}
            height={39}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav aria-label={t('nav.primaryLabel')} className="hidden items-center gap-6 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm font-medium text-fg transition-colors hover:text-brand"
            >
              {t(item.labelKey)}
            </Link>
          ))}

          <div ref={moreMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              aria-controls="more-menu"
              onClick={() => setMoreOpen((open) => !open)}
              className="flex items-center gap-1 text-sm font-medium text-fg transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {t('nav.more', { defaultValue: 'More' })}
              <ChevronDown
                aria-hidden="true"
                className={cn('h-4 w-4 transition-transform', moreOpen && 'rotate-180')}
              />
            </button>

            {moreOpen ? (
              <div
                id="more-menu"
                className="absolute end-0 top-full z-50 mt-2 min-w-48 rounded-md border border-border bg-surface py-2 shadow-lg"
              >
                {MORE_NAV.map((item) =>
                  item.external ? (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-fg hover:bg-surface-hover"
                    >
                      {t(item.labelKey)}
                    </a>
                  ) : (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="block px-4 py-2 text-sm text-fg hover:bg-surface-hover"
                      onClick={() => setMoreOpen(false)}
                    >
                      {t(item.labelKey)}
                    </Link>
                  )
                )}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ContactButtons />
          <LocaleSwitcher />
          {/* <ThemeToggle />  off theme until we have a better solution for the flash of unstyled content (FOUC) issue. See */ }
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          {/* <ThemeToggle />  off theme until we have a better solution for the flash of unstyled content (FOUC) issue. See */ }
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={t('nav.openMenu')}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-fg transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {mobileOpen ? (
        <div id="mobile-nav" className="border-t border-border bg-bg lg:hidden">
          <nav aria-label={t('nav.primaryLabel')}>
            <Container className="flex flex-col gap-1 py-4">
              <ContactButtons className="mb-2" />
              {MOBILE_NAV_ITEMS.map((item) =>
                item.external ? (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md px-3 py-3 text-sm font-medium text-fg hover:bg-surface-hover"
                  >
                    {t(item.labelKey)}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="rounded-md px-3 py-3 text-sm font-medium text-fg hover:bg-surface-hover"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                )
              )}
            </Container>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
