import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Award, HeartHandshake, Lightbulb, type LucideIcon } from 'lucide-react';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';
import { companyValues, type CompanyValue } from '@/data/companyValues';
import { companyGoals } from '@/data/companyGoals';
import { companyMilestones } from '@/data/companyMilestones';

const VALUE_ICONS: Record<CompanyValue['icon'], LucideIcon> = {
  Award,
  Lightbulb,
  HeartHandshake,
};

const WhoWeArePage: NextPage = () => {
  const { t } = useTranslation(['common', 'who-we-are']);
  const locale = useLocale();

  const title = t('who-we-are:meta.title');
  const description = t('who-we-are:meta.description');

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/who-we-are"
        locale={locale}
        jsonLd={[
          webPageSchema({ title, description, path: '/who-we-are', locale }),
          breadcrumbSchema(
            [
              { name: t('common:breadcrumbs.home'), path: '/' },
              { name: t('who-we-are:breadcrumbLabel'), path: '/who-we-are' },
            ],
            locale
          ),
        ]}
      />
      <Header />
      <main id="main-content">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { label: t('common:breadcrumbs.home'), path: '/' },
              { label: t('who-we-are:breadcrumbLabel') },
            ]}
          />
        </Container>

        {/* Hero */}
        <section className="py-10 md:py-16">
          <Container>
            <Reveal>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-fg md:text-5xl">
                {t('who-we-are:hero.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-fg-muted">
                {t('who-we-are:hero.subtitle')}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Intro */}
        <section aria-labelledby="intro-heading" className="py-12 md:py-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading id="intro-heading" title={t('who-we-are:intro.heading')} />
              <p className="mt-4 text-fg-muted">{t('who-we-are:intro.body')}</p>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c7f526bebfb2cfbde4f51e_%D8%A3.%20%D8%B3%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D8%B5%D9%8A%D8%B9%D8%B1%D9%8A.png"
                  alt={t('who-we-are:intro.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Vision & Mission */}
        <section aria-labelledby="vision-heading" className="bg-surface py-12 md:py-20">
          <Container className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-bg p-6 md:p-8">
                <SectionHeading id="vision-heading" as="h2" title={t('who-we-are:vision.heading')} />
                <p className="mt-3 text-fg-muted">{t('who-we-are:vision.body')}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-bg p-6 md:p-8">
                <SectionHeading as="h2" title={t('who-we-are:mission.heading')} />
                <p className="mt-3 text-fg-muted">{t('who-we-are:mission.body')}</p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading" className="py-12 md:py-20">
          <Container>
            <SectionHeading
              id="values-heading"
              title={t('who-we-are:values.heading')}
              subtitle={t('who-we-are:values.subheading')}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companyValues.map((value) => {
                const Icon = VALUE_ICONS[value.icon];
                return (
                  <Reveal key={value.id}>
                    <div className="h-full rounded-2xl border border-border bg-surface p-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-xl font-semibold text-fg">{value.title[locale]}</h3>
                      <p className="mt-2 text-base text-fg-muted">{value.description[locale]}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Goals */}
        <section aria-labelledby="goals-heading" className="bg-surface py-12 md:py-20">
          <Container>
            <SectionHeading
              id="goals-heading"
              title={t('who-we-are:goals.heading')}
              subtitle={t('who-we-are:goals.subheading')}
            />
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {companyGoals.map((goal, index) => (
                <Reveal key={goal.id}>
                  <li className="h-full rounded-2xl border border-border bg-bg p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-bold">
                      {index + 1}
                    </span>
                    <p className="mt-4 text-fg-muted">{goal.description[locale]}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* Timeline */}
        <section aria-labelledby="timeline-heading" className="py-12 md:py-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <SectionHeading
                id="timeline-heading"
                title={t('who-we-are:timeline.heading')}
                subtitle={t('who-we-are:timeline.subheading')}
              />
              <ol className="mt-8 space-y-6 border-s-2 border-border ps-6">
                {companyMilestones.map((milestone) => (
                  <li key={milestone.id} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 -start-[27px] h-3 w-3 rounded-full bg-brand"
                    />
                    <p className="text-sm font-bold text-brand">{milestone.year}</p>
                    <p className="mt-1 text-fg-muted">{milestone.description[locale]}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6720b1040119fcdbdd39f190_eng.%20Abdulsalam%20Alsaiary.avif"
                  alt={t('who-we-are:timeline.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Team */}
        <section aria-labelledby="team-heading" className="bg-surface py-12 md:py-20">
          <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border lg:order-2">
                <Image
                  src="https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64c0fb108519be7a7b374cad_1690364242023%201.png"
                  alt={t('who-we-are:team.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal>
              <SectionHeading id="team-heading" title={t('who-we-are:team.heading')} />
              <p className="mt-4 text-fg-muted">{t('who-we-are:team.body')}</p>
            </Reveal>
          </Container>
        </section>

        {/* Methodology */}
        <section aria-labelledby="methodology-heading" className="py-12 md:py-20">
          <Container className="max-w-3xl">
            <Reveal>
              <SectionHeading id="methodology-heading" title={t('who-we-are:methodology.heading')} align="center" />
              <p className="mt-4 text-center text-fg-muted">{t('who-we-are:methodology.body')}</p>
            </Reveal>
          </Container>
        </section>

        {/* Partners */}
        <section aria-labelledby="partners-heading" className="bg-surface py-12 md:py-20">
          <Container className="max-w-3xl">
            <Reveal>
              <SectionHeading id="partners-heading" title={t('who-we-are:partners.heading')} align="center" />
              <p className="mt-4 text-center text-fg-muted">{t('who-we-are:partners.body')}</p>
            </Reveal>
          </Container>
        </section>

        {/* CTA */}
        <section aria-labelledby="wwa-cta-heading" className="py-12 md:py-20">
          <Container className="rounded-2xl bg-brand px-6 py-12 text-center md:px-12">
            <Reveal>
              <h2 id="wwa-cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
                {t('who-we-are:cta.heading')}
              </h2>
              <p className="mt-3 text-white/85">{t('who-we-are:cta.body')}</p>
              <div className="mt-6">
                <Button href="/contact-us" variant="secondary" size="lg" className="border-white bg-bg text-brand hover:bg-surface-hover">
                  {t('who-we-are:cta.buttonLabel')}
                </Button>
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
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'who-we-are'])),
    },
    revalidate: 3600,
  };
};

export default WhoWeArePage;
