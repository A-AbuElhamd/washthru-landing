import Image from 'next/image';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Carousel } from '@/components/shared/Carousel';
import {
  partnerBadges,
  clientLogos,
  domesticDistributors,
  internationalAgents,
} from '@/data/partners';
import { useLocale } from '@/hooks/useLocale';

export function Partners({ showDistributors = true }: { showDistributors?: boolean }) {
  const { t } = useTranslation('home');
  const resolvedLocale = useLocale();

  return (
    // Real `.partners_section` padding is a modest 45px/45px, not the much
    // airier py-16/24 rhythm this used to run.
    <section aria-labelledby="partners-heading" className="bg-surface py-10 md:py-14">
      <Container>
        {/* Real "شركاء النجاح" heading is `.text-53px.mid` — 53px, weight 500. */}
        <h2
          id="partners-heading"
          className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]"
        >
          {t('partners.heading')}
        </h2>

     {/*    <Reveal className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
            {partnerBadges.map((badge) => (
              <li key={badge.id} className="flex h-20 w-32 items-center justify-center">
                <Image
                  src={badge.src}
                  alt={t('partners.badgeAlt')}
                  width={160}
                  height={90}
                  className="h-auto max-h-20 w-30 max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </Reveal> */}

        {/*
          Real production client-logo marquee (`.marquee-track`) auto-scrolls
          continuously via a CSS keyframe with NO stop control at all
          (`animation: marquee-horizontal 35s linear infinite`, pausing only
          on hover) — reproduced with the shared Carousel's autoplay mode,
          matching the real 35s pace and suppressing the pause/play control
          this project normally pairs with autoplay, since this is decorative
          and the real site itself never offers a way to stop it.
        */}
        <Reveal className="mt-10">
          <Carousel
            items={clientLogos}
            loop={true}
            slidesPerView={{ mobile: 2, tablet: 4, desktop: 6 }}
            autoplayDelay={1000}
            hideAutoplayControl
            renderItem={(logo) => (
              <div className="flex h-20 items-center justify-center grayscale transition hover:grayscale-0">
                <Image
                  src={logo.src}
                  alt=""
                  width={120}
                  height={64}
                  aria-hidden="true"
                  className="h-auto max-h-20 w-30 max-w-full object-contain"
                />
              </div>
            )}
          />
        </Reveal>

        {showDistributors ? (
        <div className="mt-16 grid gap-12 border-t border-border pt-12 lg:grid-cols-2">
            {/*
              Real "الموزعون داخل المملكة" / "الوكلاء خارج المملكة" headings
              are their own full `.text-53px.mid` sections in production, not
              a small text-lg caption — bumped up accordingly (scaled down
              from the top-level heading since these are still visually
              subordinate to "شركاء النجاح" in this single merged section).
            */}
          <Reveal>
            <h2 className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]">
              {t('partners.distributors.heading')}
            </h2>
            <ul className="mt-6 flex flex-wrap items-center gap-8">
              {domesticDistributors.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt[resolvedLocale]}
                      width={item.width}
                      height={item.height}
                      className=" object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
             <h2 className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]">
              {t('partners.agents.heading')}
           </h2>
            <ul className="mt-6 flex flex-wrap items-center gap-8">
              {internationalAgents.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt[resolvedLocale]}
                      width={item.width}
                      height={item.height}
                      className=" object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        ) : null}
      </Container>
    </section>
  );
}
