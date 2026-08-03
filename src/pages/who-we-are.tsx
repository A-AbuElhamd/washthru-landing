import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { useTranslation } from 'next-i18next/pages';
import { Seo } from '@/components/shared/Seo';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Container } from '@/components/shared/Container';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Reveal } from '@/components/shared/Reveal';
import { Carousel } from '@/components/shared/Carousel';
import { Partners } from '@/components/sections/Partners';
import { WhoWeAreTimeline } from '@/components/sections/WhoWeAreTimeline';
import { webPageSchema, breadcrumbSchema } from '@/utils/schema';
import { useLocale } from '@/hooks/useLocale';
import { companyGoals } from '@/data/companyGoals';
import { teamMembers } from '@/data/teamMembers';
import { SITE } from '@/config/site';

// Real `.wwr_hero_section` — solid blue background with a real photo
// (`who_we_are_heo_bg.webp`) laid under a 50%-opacity blue gradient overlay,
// not a plain color block.
const HERO_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63cbdff657b94e1293cb9007_who_we_are_heo_bg.webp';
// Real `.our_goals_bg` — full-bleed photo behind the goals section.
const GOALS_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63b003ea83088c494d5c596e_our_goals_bg.webp';
// Real `.our-methodology-icon.svg`.
const METHODOLOGY_ICON_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d538757cd3ad9e436f231a_our-methodology-icon.svg';
// Real `.section-3` background pattern (`bg_01.png`) — distinct from the
// homepage hero's own decorative pattern.
const METHODOLOGY_BG_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63b145e75808d32d6b483f94_bg_01.png';
  
const PREV_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53835026df8042e0e6781_right-arrow-blue.svg';
const NEXT_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d5385b52367707591972b8_left-arrow-blue.svg';


const WhoWeArePage: NextPage = () => {
  const { t } = useTranslation(['common', 'who-we-are', 'home']);
  const locale = useLocale();
  const [activeTeamMemberIndex, setActiveTeamMemberIndex] = useState(0);
  const activeTeamMember = teamMembers[activeTeamMemberIndex];

  const title = t('who-we-are:meta.title');
  const description = t('who-we-are:meta.description');
  const valueItems = t('who-we-are:values.items', { returnObjects: true }) as string[];

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
        <Container className="pt-6">
          <Breadcrumbs
            items={[
              { label: t('common:breadcrumbs.home'), path: '/' },
              { label: t('who-we-are:breadcrumbLabel') },
            ]}
          />
        </Container>

        {/* Hero — real bg photo + blue overlay, same headline as the
            homepage hero, plus the real customer-service phone line. Real
            `.wwr_hero_section { height: 80%; min-height: 560px }`. */}
        <section className="relative isolate mt-6 flex min-h-[560px] items-center overflow-hidden py-16">
          <div className="absolute inset-0 -z-10">
            <Image src={HERO_BG_URL} alt="" fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-brand/60" />
          </div>
          <Container className="py-10">
            <Reveal>
              <h1 className="max-w-2xl text-2xl font-normal leading-relaxed tracking-[.2em] text-white md:text-4xl lg:text-[48px]">
                {t('home:hero.title.line1Plain')} {t('home:hero.title.line1Accent')}
              </h1>
              <br />
              <h1 className="max-w-2xl text-2xl font-normal leading-relaxed tracking-[.2em] text-white md:text-4xl lg:text-[48px]">
                {t('home:hero.title.line2Plain')} {t('home:hero.title.line2Accent')}
              </h1>
              <br />
              <h1 className="max-w-2xl text-2xl font-normal leading-relaxed tracking-[.2em] text-white md:text-4xl lg:text-[48px]">
                {t('home:hero.title.line3Plain')} {t('home:hero.title.line3Accent')}
              </h1>
              <div className="mt-6 h-px w-24 bg-white/40" />
              <p className="mt-12 text-lg text-white/90 lg:text-[17px]">
                {t('common:header.costomerServices')} / {SITE.contact.phone}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Real `.wwr_grid` — four plain text columns, no cards/icons.
            Headings are `.text-53px` (~53px design intent, scaled down here
            to read correctly at normal viewport widths rather than the
            fluid vw-based scaling the real CSS uses), body copy `.text-28px`
            (~17-18px rendered), line-height tightened to match. */}
        <section aria-labelledby="intro-heading" className="py-12 md:py-20">
          <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <h2 id="intro-heading" className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                {t('who-we-are:intro.heading')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                {t('who-we-are:intro.body')}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                {t('who-we-are:vision.heading')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                {t('who-we-are:vision.body')}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                {t('who-we-are:values.heading')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                {valueItems.map((item, index) => (
                  <span key={index} className="block">
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal>
              <h2 className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                {t('who-we-are:mission.heading')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                {t('who-we-are:mission.body')}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Real `.our_goals_section` — full-bleed photo, numbered goals
            overlaid directly on it. Real `.our_goals_wrap` has NO dark
            overlay at all (just `color: white` text on the raw photo) — an
            overlay here would make the photo dimmer/less visible than real,
            so none is applied. */}
        <section aria-labelledby="goals-heading" className="relative isolate overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10">
            <Image src={GOALS_BG_URL} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <Container>
            <Reveal>
              <h2
                id="goals-heading"
                className="text-2xl font-normal leading-tight text-white lg:text-[33px]"
              >
                {t('who-we-are:goals.headingLine1')}
                <br />
                {t('who-we-are:goals.headingLine2')}
              </h2>
              <ol className="mt-8 max-w-2xl space-y-3">
                {companyGoals.map((goal, index) => (
                  <li key={goal.id} className="text-sm leading-relaxed text-white/90 lg:text-[17px]">
                    {index + 1}- {goal.description[locale]}
                  </li>
                ))}
              </ol>
            </Reveal>
          </Container>
        </section>

        <WhoWeAreTimeline />

        {/* Real `.team_section` (`.slider-4`) — a single right-hand column
            (name/title, then the static "كوادرنا" heading + body) stacked
            beside one large bottom-anchored photo per slide, with a single
            prev/next chevron pair overlaid on the photo itself — not a
            multi-card grid with nav buttons above the track. */}
        <section aria-labelledby="team-heading" className="bg-surface py-12 md:py-20">
          <Container>
            <Reveal>
              <div
                className="grid gap-6 [grid-template-areas:'name'_'image'_'text'] md:grid-cols-[320px_1fr] md:items-end md:[grid-template-areas:'text_image'_'name_image']"
              >
                <div style={{ gridArea: 'name' }} className="md:hidden text-center md:text-end">
                  <p className="text-lg font-medium text-fg lg:text-[24px]">{activeTeamMember.name}</p>
                  <p className="mt-1 text-sm text-fg-muted lg:text-[16px]">
                    {activeTeamMember.title[locale]}
                  </p>
                </div>
                <div
                  style={{ gridArea: 'image' }}
                  className="relative h-[340px] w-full min-w-0 overflow-hidden md:h-[460px]"
                >
                  <Carousel
                    items={teamMembers}
                    slidesPerView={1}
                    autoplayDelay={3000}
                    navIcons={{ prev: PREV_ARROW_ICON, next: NEXT_ARROW_ICON }}
                    navIconsOverlay
                    onSlideChange={setActiveTeamMemberIndex}
                    renderItem={(member) => (
                      <div className="relative h-[340px] w-full md:h-[460px]">
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          fill
                          sizes="(min-width: 768px) 60vw, 100vw"
                          className="object-contain object-bottom"
                        />
                      </div>
                    )}
                  />
                </div>
                <div style={{ gridArea: 'text' }} className="text-start">
                  <p className="hidden md:block mb-5 text-lg font-medium text-fg lg:text-[24px]">{activeTeamMember.name}</p>
                  <p className="hidden md:block mb-10 text-sm text-fg-muted lg:text-[16px]">
                    {activeTeamMember.title[locale]}
                  </p>
                  <h2
                    id="team-heading"
                    className="text-xl font-medium leading-snug text-brand lg:text-[28px]"
                  >
                    {t('who-we-are:team.heading')}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                    {t('who-we-are:team.body')}
                  </p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Real `.section-3` — a distinct light-gray background with a
            real subtle pattern image (`bg_01.png`, NOT the homepage's
            pattern) behind the icon; icon takes the flexible remaining
            space (`.div-block-14 { flex: 1 }`), text is capped at a real
            300px column (`.div-block-10 { max-width: 300px }`) — not an
            equal 50/50 split. */}
        <section
          aria-labelledby="methodology-heading"
          className="bg-[#f8f8f8] bg-cover bg-center py-16 md:py-24"
          style={{ backgroundImage: `url(${METHODOLOGY_BG_URL})` }}
        >
          <Container className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
            <Reveal className="w-full md:max-w-[300px]">
              <h2 id="methodology-heading" className="text-xl font-medium leading-snug text-brand lg:text-[28px]">
                {t('who-we-are:methodology.heading')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:text-[17px]">
                {t('who-we-are:methodology.body')}
              </p>
            </Reveal>
            <Reveal className="flex flex-1 items-center justify-end">
              <Image
                src={METHODOLOGY_ICON_URL}
                alt="منهجيتنا سر كفاءتنا"
                width={220}
                height={220}
                className="h-40 w-40 md:h-80 md:w-80 ml-10"
                unoptimized
              />
            </Reveal>
        
          </Container>
        </section>
      </main>

      {/* Real page reuses the exact same "شركاء النجاح" partners section as
          the homepage. */}
      <Partners showDistributors={false} />

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ar', ['common', 'who-we-are', 'home'])),
    },
    revalidate: 3600,
  };
};

export default WhoWeArePage;
