import { type FormEvent, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

// Real `.text-field-35px` — a minimalist underline field (bottom border
// only, transparent background, right-aligned), not a bordered box.
const INPUT_CLASSES =
  'w-full border-0 border-b border-[#a5a5a5] bg-transparent px-0 py-3 text-start text-fg placeholder:text-[#a5a5a5] focus:border-brand focus:outline-none lg:text-[17px]';

const REQUEST_TYPE_KEYS = ['inquiry', 'complaint', 'consultation', 'purchase', 'maintenance'] as const;

// Real production sales contact details, distinct from the header's general
// customer-service line (920012804 / info@washthru.com).
const SALES_PHONE_INTERNAL = '0553573654';
const SALES_PHONE_INTERNATIONAL = '+966553573654';
const SALES_EMAIL = 'sales@washthru.com';

// Real `.cu_hero_wrap` decorative background — the same diagonal-line
// pattern as the homepage hero, visibly spanning the hero and the contact
// info section below it on the real site.
const PATTERN_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e779b0a17e8849daeebc_home-bg-01.svg';

// Real `.cu_left_wrap` hero illustration.
const HERO_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53bcd13f3a7575430a68d_contact-us-hero-icon.svg';

// Real per-info-card icons.
const PHONE_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b8555979cd8a1849adbf_phone-icon.svg';
const EMAIL_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b87675b216501e8adc9e_email-icon.svg';
const HOURS_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b86ded997fffe1b27a11_work-time-icon.svg';
const LOCATION_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b85f8c4fb47464d0f28e_location-icon.svg';

// Real `.cu_map_section` Google Maps embed (exact production coordinates).
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3710.4103449854897!2d39.16692507527177!3d21.569899980218302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDM0JzExLjYiTiAzOcKwMTAnMTAuMiJF!5e0!3m2!1sen!2sus!4v1761627008410!5m2!1sen!2sus';

const ContactUsPage: NextPage = () => {
  const { t } = useTranslation(['common', 'contact-us']);
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const title = t('contact-us:meta.title');
  const description = t('contact-us:meta.description');
  const pageTitle = `${t('contact-us:page.titleLine1')} ${t('contact-us:page.titleLine2')}`;

  // No backend wired up yet: this simply confirms receipt in the UI, same
  // pattern as the homepage contact section (Contact.tsx). No `noValidate`
  // either, since there's no server-side validation to defer to yet — the
  // browser's native required/type checks are what actually gate submission.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  interface InfoLine {
    text: string;
    href?: string;
  }

  const infoItems: Array<{ key: string; icon: string; label: string; lines: InfoLine[] }> = [
    {
      key: 'phone',
      icon: PHONE_ICON_URL,
      label: t('contact-us:info.phoneLabel'),
      lines: [
        { text: `${t('contact-us:info.phoneInternalLabel')}: ${SALES_PHONE_INTERNAL}`, href: `tel:${SALES_PHONE_INTERNAL}` },
        {
          text: `${t('contact-us:info.phoneInternationalLabel')}: ${SALES_PHONE_INTERNATIONAL}`,
          href: `tel:${SALES_PHONE_INTERNATIONAL.replace('+', '00')}`,
        },
      ],
    },
    {
      key: 'email',
      icon: EMAIL_ICON_URL,
      label: t('contact-us:info.emailLabel'),
      lines: [{ text: SALES_EMAIL, href: `mailto:${SALES_EMAIL}` }],
    },
    {
      key: 'hours',
      icon: HOURS_ICON_URL,
      label: t('contact-us:info.hoursLabel'),
      lines: [{ text: t('contact-us:info.hoursLine1') }, { text: t('contact-us:info.hoursLine2') }],
    },
    {
      key: 'location',
      icon: LOCATION_ICON_URL,
      label: t('contact-us:info.locationLabel'),
      lines: [{ text: t('contact-us:info.locationValue') }],
    },
  ];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/contact-us"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/contact-us', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: pageTitle, path: '/contact-us' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <h1 className="sr-only">{pageTitle}</h1>

        {/* Real `.cu_hero_section` — decorative illustration beside a big
            two-tone heading + intro paragraph. Real `.cu_hero_wrap`
            background is scoped to this section only. */}
        <section
          className="bg-repeat py-10 md:py-16"
          style={{ backgroundImage: `url(${PATTERN_BG_URL})` }}
        >
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div className="text-start">
                  <p className="text-3xl font-normal leading-tight sm:text-4xl lg:text-[48px]">
                    {t('contact-us:page.titleLine1')}{' '}
                    <span className="text-brand">{t('contact-us:page.titleLine2')}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                    {t('contact-us:page.intro')}
                  </p>
                </div>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={HERO_ICON_URL}
                    alt={t('contact-us:page.imageAlt')}
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Real `.cu_contact_section`: info list beside the form, split by a
            vertical rule at desktop. */}
        <section className="py-10 md:py-16">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="lg:border-e lg:border-border lg:pe-10">
                  <h2 className="text-xl font-medium text-fg lg:text-[28px]">
                    {t('contact-us:form.heading')}
                  </h2>
                  <form onSubmit={handleSubmit} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="cu-request-type" className="sr-only">
                        {t('contact-us:form.requestType')}
                      </label>
                      <select id="cu-request-type" name="requestType" required className={INPUT_CLASSES}>
                        {REQUEST_TYPE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {t(`contact-us:form.requestTypeOptions.${key}`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div >
                      <label htmlFor="cu-name" className="sr-only">
                        {t('contact-us:form.name')}
                      </label>
                      <input
                        id="cu-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t('contact-us:form.namePlaceholder')}
                        className={INPUT_CLASSES}
                      />
                    </div>

                    <div>
                      <label htmlFor="cu-city" className="sr-only">
                        {t('contact-us:form.city')}
                      </label>
                      <input
                        id="cu-city"
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder={t('contact-us:form.cityPlaceholder')}
                        className={INPUT_CLASSES}
                      />
                    </div>

                    <div>
                      <label htmlFor="cu-phone" className="sr-only">
                        {t('contact-us:form.phone')}
                      </label>
                      <input
                        id="cu-phone"
                        name="phone"
                        type="number"
                        required
                        autoComplete="tel"
                        placeholder={t('contact-us:form.phonePlaceholder')}
                        className={INPUT_CLASSES}
                      />
                    </div>

                    <div>
                      <label htmlFor="cu-email" className="sr-only">
                        {t('contact-us:form.email')}
                      </label>
                      <input
                        id="cu-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t('contact-us:form.emailPlaceholder')}
                        className={INPUT_CLASSES}
                      />
                    </div>

                    <fieldset>
                      <legend className="mb-1.5 text-sm font-medium text-fg">
                        {t('contact-us:form.hasCarWashLabel')}
                      </legend>
                      <div className="flex items-center gap-6">
                        <label htmlFor="cu-has-car-wash-yes" className="flex items-center gap-2 text-sm text-fg">
                          <input
                            id="cu-has-car-wash-yes"
                            type="radio"
                            name="hasCarWash"
                            value="yes"
                            required
                            className="h-4 w-4 accent-brand"
                          />
                          {t('contact-us:form.hasCarWashYes')}
                        </label>
                        <label htmlFor="cu-has-car-wash-no" className="flex items-center gap-2 text-sm text-fg">
                          <input
                            id="cu-has-car-wash-no"
                            type="radio"
                            name="hasCarWash"
                            value="no"
                            required
                            className="h-4 w-4 accent-brand"
                          />
                          {t('contact-us:form.hasCarWashNo')}
                        </label>
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="cu-message" className="sr-only">
                        {t('contact-us:form.message')} {t('contact-us:form.messageOptional')}
                      </label>
                      <textarea
                        id="cu-message"
                        name="message"
                        rows={4}
                        placeholder={t('contact-us:form.messagePlaceholder')}
                        className={INPUT_CLASSES}
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg">
                      {t('contact-us:form.submit')}
                    </Button>
                    <p role="status" className="text-sm font-medium text-brand">
                      {submitted ? t('contact-us:form.success') : ''}
                    </p>
                  </form>
                </div>

                <ul className="space-y-8">
                  {infoItems.map((item) => (
                    <li key={item.key} className="flex items-start gap-4">
                      <Image
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        width={40}
                        height={40}
                        unoptimized
                        className="h-20 w-20 shrink-0 object-contain"
                      />
                      <div className="text-start">
                        <p className="text-lg font-medium text-fg lg:text-[28px]">{item.label}</p>
                        {item.lines.map((line, index) =>
                          line.href ? (
                            <a
                              key={index}
                              href={line.href}
                              dir="ltr"
                              className="mt-1 block text-end text-sm text-fg-muted transition-colors hover:text-brand lg:text-[17px]"
                            >
                              {line.text}
                            </a>
                          ) : (
                            <p key={index} className="mt-1 text-sm text-fg-muted lg:text-[17px]">
                              {line.text}
                            </p>
                          )
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Real `.cu_map_section`. */}
        <section className="py-10 md:py-16">
          <Container>
            <Reveal>
              <h2 className="text-xl font-medium text-fg lg:text-[28px]">{t('contact-us:map.heading')}</h2>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
                <iframe
                  title={t('contact-us:map.iframeTitle')}
                  src={MAP_EMBED_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'contact-us'])),
    },
    revalidate: 3600,
  };
};

export default ContactUsPage;
