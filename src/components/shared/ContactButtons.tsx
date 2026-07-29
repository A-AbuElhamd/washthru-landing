import { useTranslation } from 'next-i18next/pages';
import { SITE } from '@/config/site';
import { cn } from '@/utils/cn';

// Real production graphic buttons — their entire shape/fill/icon is baked
// into these two SVGs (authorized real assets), not something to recreate
// with Tailwind. Plain <img>, not next/image: fixed-size decorative brand
// graphics, no responsive/optimization need.
const CALL_BUTTON_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e64a13f3a74a852a91b0_call%20us%20button.svg';
const WHATSAPP_BUTTON_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e6580411b6210baa33fd_whatsapp%20button.svg';

interface ContactButtonsProps {
  className?: string;
  imageClassName?: string;
}

export function ContactButtons({ className, imageClassName }: ContactButtonsProps) {
  const { t } = useTranslation('common');
  const whatsappHref = `https://api.whatsapp.com/send/?phone=${SITE.contact.whatsapp.replace('+', '')}&text&type=phone_number&app_absent=0`;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <a href={`tel:${SITE.contact.phone}`} aria-label={t('header.callUs', { defaultValue: 'Call us' })}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CALL_BUTTON_SRC}
          alt=""
          className={cn('h-9 w-auto', imageClassName)}
        />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('header.whatsapp', { defaultValue: 'Contact us on WhatsApp' })}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WHATSAPP_BUTTON_SRC}
          alt=""
          className={cn('h-9 w-auto', imageClassName)}
        />
      </a>
    </div>
  );
}
