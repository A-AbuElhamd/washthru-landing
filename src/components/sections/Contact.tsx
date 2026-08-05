import { type FormEvent, useState } from 'react';
import { useTranslation } from 'next-i18next/pages';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';
import { SITE } from '@/config/site';

const INPUT_CLASSES =
  'w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30';

export function Contact() {
  const { t } = useTranslation('home');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend wired up yet: this simply confirms receipt in the UI.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  const whatsappDigits = SITE.contact.whatsapp.replace(/[^\d]/g, '');

  return (
    <section aria-labelledby="contact-heading" className="py-10 md:py-14">
      <Container>
        <SectionHeading
          id="contact-heading"
          title={t('contact.heading')}
          subtitle={t('contact.subheading')}
        />
        <Reveal className="mt-10 grid gap-10 lg:grid-cols-2">
          <ul className="space-y-4">
            <li>
              <a
                href={`tel:${SITE.contact.phone}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-fg transition-colors hover:bg-surface-hover"
              >
                <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-sm text-fg-muted">
                    {t('contact.info.phoneLabel')}
                  </span>
                  <span className="font-medium" dir="ltr">
                    {SITE.contact.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-fg transition-colors hover:bg-surface-hover"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-sm text-fg-muted">
                    {t('contact.info.whatsappLabel')}
                  </span>
                  <span className="font-medium" dir="ltr">
                    {SITE.contact.whatsapp}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 text-fg transition-colors hover:bg-surface-hover"
              >
                <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-brand" />
                <span>
                  <span className="block text-sm text-fg-muted">
                    {t('contact.info.emailLabel')}
                  </span>
                  <span className="font-medium" dir="ltr">
                    {SITE.contact.email}
                  </span>
                </span>
              </a>
            </li>
          </ul>

          {/* No noValidate here: there's no backend yet to run custom validation
              against, so the browser's native required/type constraint checks
              are what actually stop an empty or malformed submission. */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-fg">
                {t('contact.form.name')}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder={t('contact.form.namePlaceholder')}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-fg">
                {t('contact.form.phone')}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="number"
                required
                autoComplete="tel"
                placeholder={t('contact.form.phonePlaceholder')}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-fg">
                {t('contact.form.email')}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t('contact.form.emailPlaceholder')}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-fg">
                {t('contact.form.message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder={t('contact.form.messagePlaceholder')}
                className={INPUT_CLASSES}
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="mt-6 h-11 sm:h-16 text-sm sm:text-base lg:text-[17px]">
              {t('contact.form.submit')}
            </Button>
            <p role="status" className="text-sm font-medium text-brand">
              {submitted ? t('contact.form.success') : ''}
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
