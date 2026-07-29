import { type FormEvent, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { SITE } from '@/config/site';
import { breadcrumbSchema, webPageSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

const INPUT_CLASSES =
  'w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-fg placeholder:text-fg-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30';

const REQUEST_TYPE_KEYS = ['inquiry', 'complaint', 'consultation', 'purchase', 'maintenance'] as const;

const ContactUsPage: NextPage = () => {
  const { t } = useTranslation(['common', 'contact-us']);
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const title = t('contact-us:meta.title');
  const description = t('contact-us:meta.description');
  const pageTitle = t('contact-us:page.title');

  // No backend wired up yet: this simply confirms receipt in the UI, same
  // pattern as the homepage contact section (Contact.tsx). No `noValidate`
  // either, since there's no server-side validation to defer to yet — the
  // browser's native required/type checks are what actually gate submission.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  const infoItems: Array<{
    key: string;
    icon: typeof Phone;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }> = [
    {
      key: 'phone',
      icon: Phone,
      label: t('contact-us:info.phoneLabel'),
      value: SITE.contact.phone,
      href: `tel:${SITE.contact.phone}`,
    },
    {
      key: 'email',
      icon: Mail,
      label: t('contact-us:info.emailLabel'),
      value: SITE.contact.email,
      href: `mailto:${SITE.contact.email}`,
    },
    {
      key: 'hours',
      icon: Clock,
      label: t('contact-us:info.hoursLabel'),
      value: t('contact-us:info.hoursValue'),
    },
    {
      key: 'location',
      icon: MapPin,
      label: t('contact-us:info.locationLabel'),
      value: t('contact-us:info.locationValue'),
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
        <Container className="py-6">
          <Breadcrumbs
            items={[{ label: t('common:breadcrumbs.home'), path: '/' }, { label: pageTitle }]}
          />
        </Container>

        <Container className="pb-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-fg md:text-5xl">{pageTitle}</h1>
                <p className="mt-4 max-w-xl text-lg text-fg-muted">{t('contact-us:page.intro')}</p>
              </div>
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl bg-surface">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53bcd13f3a7575430a68d_contact-us-hero-icon.svg"
                  alt={t('contact-us:page.imageAlt')}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-12"
                />
              </div>
            </div>
          </Reveal>
        </Container>

        <Container className="pb-16">
          <Reveal>
            {/* Real site's cu_contact_section: a single two-column layout —
                contact info list beside the form, split by a vertical rule —
                rather than two stacked, unrelated blocks. */}
            <div className="grid gap-10 lg:grid-cols-2">
              <ul className="space-y-6">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="block text-lg font-bold text-fg">{item.label}</span>
                      <span className="block text-fg-muted" dir={item.href ? 'ltr' : undefined}>
                        {item.value}
                      </span>
                    </>
                  );

                  return (
                    <li key={item.key} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="transition-colors hover:text-brand"
                        >
                          {content}
                        </a>
                      ) : (
                        <div>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="lg:border-s lg:border-border lg:ps-10">
                <SectionHeading as="h2" title={t('contact-us:form.heading')} />
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cu-request-type" className="mb-1.5 block text-sm font-medium text-fg">
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

                <div>
                  <label htmlFor="cu-name" className="mb-1.5 block text-sm font-medium text-fg">
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
                  <label htmlFor="cu-city" className="mb-1.5 block text-sm font-medium text-fg">
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
                  <label htmlFor="cu-phone" className="mb-1.5 block text-sm font-medium text-fg">
                    {t('contact-us:form.phone')}
                  </label>
                  <input
                    id="cu-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder={t('contact-us:form.phonePlaceholder')}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div>
                  <label htmlFor="cu-email" className="mb-1.5 block text-sm font-medium text-fg">
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
                  <label htmlFor="cu-message" className="mb-1.5 block text-sm font-medium text-fg">
                    {t('contact-us:form.message')}{' '}
                    <span className="text-fg-muted">{t('contact-us:form.messageOptional')}</span>
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
            </div>
          </Reveal>
        </Container>

        <Container className="pb-16">
          <Reveal>
            <SectionHeading as="h2" title={t('contact-us:map.heading')} />
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-border">
              <iframe
                title={t('contact-us:map.iframeTitle')}
                src="https://www.google.com/maps?q=Jeddah,+Saudi+Arabia&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </Container>
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
