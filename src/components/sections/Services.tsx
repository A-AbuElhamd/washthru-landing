import { useTranslation } from 'next-i18next/pages';
import {
  Calculator,
  ClipboardList,
  GraduationCap,
  HardHat,
  Headphones,
  RefreshCcw,
  Ruler,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Carousel } from '@/components/shared/Carousel';
import { Reveal } from '@/components/shared/Reveal';
import { JsonLd } from '@/components/shared/JsonLd';
import { servicesList, type ServiceItem } from '@/data/servicesList';
import { servicesSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';

const ICONS: Record<ServiceItem['icon'], LucideIcon> = {
  ClipboardList,
  Ruler,
  HardHat,
  GraduationCap,
  Calculator,
  Headphones,
  Wrench,
  RefreshCcw,
};

export function Services() {
  const { t } = useTranslation('home');
  const resolvedLocale = useLocale();
  const serviceNames = servicesList.map((service) => service.title[resolvedLocale]);

  return (
    // Note: the real production homepage (index.html) has no services teaser
    // section at all — "خدماتنا" only exists as a nav link to /services.
    // Per the parity-pass brief this section is kept as-is (a services
    // slider isn't part of the real homepage to compare against), just
    // brought in line with the real type scale and section rhythm.
    <section aria-labelledby="services-heading" className="bg-surface py-10 md:py-14">
      <Container>
        <SectionHeading
          id="services-heading"
          title={t('services.heading')}
          subtitle={t('services.subheading')}
        />
        <Reveal className="mt-10">
          <Carousel
            items={servicesList}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            spaceBetween={16}
            autoplayDelay={2500}
            renderItem={(service) => {
              const Icon = ICONS[service.icon];
              return (
                <div className=" rounded-2xl h-[300px] border border-border bg-bg p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-2xl font-normal text-fg">
                    {service.title[resolvedLocale]}
                  </h3>
                  <p className="mt-2 text-base font-light text-fg-muted">
                    {service.description[resolvedLocale]}
                  </p>
                </div>
              );
            }}
          />
        </Reveal>
      </Container>
      <JsonLd data={servicesSchema(serviceNames, resolvedLocale)} />
    </section>
  );
}
