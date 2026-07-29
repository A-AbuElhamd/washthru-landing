import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next/pages';
import { FOOTER_NAV } from '@/config/nav';
import { SITE } from '@/config/site';
import { Container } from '@/components/shared/Container';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/shared/SocialIcons';

const SOCIAL_LINKS = [
  { key: 'instagram', href: SITE.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { key: 'twitter', href: SITE.social.twitter, label: 'Twitter/X', Icon: XIcon },
  { key: 'facebook', href: SITE.social.facebook, label: 'Facebook', Icon: FacebookIcon },
] as const;

// The real footer's two trust/certification badges (`.footer_icons` /
// `.f_icon_wrap` in the production markup) — the clone previously had no
// equivalent at all. Both are pure white-fill SVGs (confirmed by fetching
// the assets directly) designed to sit on the production footer's solid
// brand-blue background, which is why the footer below uses the dedicated
// `footer-bg`/`footer-fg` tokens instead of the page's theme-adaptive
// `bg-bg`/`text-fg`.
const CERTIFICATION_BADGES = [
  {
    id: 'certi-01',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4f3681c71e0043ee8dc97_certi-01.svg',
    width: 85,
    height: 29,
  },
  {
    id: 'certi-02',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4f35d0411b63702aacff0_certi-02.svg',
    width: 52,
    height: 50,
  },
] as const;

const MECHATRONICS_LOGO_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d147361f56b43906bacef6_Mechatronics_logo.svg';

export function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg">
      <Container className="py-12">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-lg font-bold text-footer-fg">{SITE.name}</p>
              <p className="mt-2 text-sm text-footer-fg/80">
                {t('footer.tagline', { defaultValue: '' })}
              </p>
            </div>

            <nav aria-label={t('footer.navLabel', { defaultValue: 'Footer' })}>
              <ul className="flex flex-col gap-2">
                {FOOTER_NAV.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="text-sm text-footer-fg/80 hover:text-footer-fg"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-sm font-medium text-footer-fg">
                {t('footer.contact', { defaultValue: 'Contact' })}
              </p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-footer-fg/80">
                <li>
                  <a href={`tel:${SITE.contact.phone}`} className="hover:text-footer-fg">
                    {SITE.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SITE.contact.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-footer-fg"
                  >
                    {SITE.contact.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.contact.email}`} className="hover:text-footer-fg">
                    {SITE.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 sm:items-end">
            <div>
              <p className="text-sm font-medium text-footer-fg">
                {t('footer.follow', { defaultValue: 'Follow us' })}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {SOCIAL_LINKS.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-footer-fg/80 transition-colors hover:bg-footer-fg/10 hover:text-footer-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-fg"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {CERTIFICATION_BADGES.map((badge) => (
                <Image
                  key={badge.id}
                  src={badge.src}
                  alt={t('footer.certificationBadgeAlt', { defaultValue: '' })}
                  width={badge.width}
                  height={badge.height}
                  className="h-9 w-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-footer-fg/20 pt-6 text-sm text-footer-fg/80 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.copyright', { year, siteName: SITE.name })}</p>
          <div className="flex items-center gap-2">
            <span>{t('footer.partOfMechatronics')}</span>
            <Image
              src={MECHATRONICS_LOGO_SRC}
              alt={t('footer.mechatronicsLogoAlt')}
              width={174}
              height={47}
              className="h-5 w-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
