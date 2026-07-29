import Image from 'next/image';
import { m } from 'framer-motion';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { ContactButtons } from '@/components/shared/ContactButtons';
import { useCountUp } from '@/hooks/useCountUp';
import { formatNumber } from '@/utils/format';
import { fadeInUp, staggerContainer } from '@/utils/motion';

/**
 * Real production "cars washed" counter (`#counter` in the source site's
 * hero, fed live by `fetch('https://extocare.azurewebsites.net/api/statistics/washes')`
 * every 10s). The real markup's own static fallback value — baked into
 * `en.html` as `<div class="counter" id="counter">3,706,875</div>` before
 * the client-side fetch overwrites it — is used here as the real, evidenced
 * count-up target, rather than polling that third-party endpoint directly
 * from this codebase or inventing a number.
 */
const CARS_WASHED_COUNT = 3_706_875;

// Real hero photo (`.home-p-bg-wrap`) — a 3D-rendered SUV inside a car wash
// machine, not the abstract droplet placeholder this used to render.
const HERO_IMAGE_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/69b4d8567cd66091f591a47d_63ac15ead827c5b6294305aa_slider_1_bg%20(1).webp';

// Real `.home-p-bg-wrap` background-image — a decorative line-pattern SVG
// that sits BEHIND the photo above, not a second unrelated asset. Applied
// via inline style, not a Tailwind arbitrary background-image utility class:
// this project has twice broken the Turbopack build when a URL like this
// appeared inside an arbitrary-value class (even inside a comment describing
// one), because Tailwind's content scanner matches that bracketed shape
// wherever it appears in the file, not just inside real class strings.
const HERO_BG_PATTERN_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e779b0a17e8849daeebc_home-bg-01.svg';
const HERO_BG_PATTERN_STYLE = {
  backgroundImage: `url(${HERO_BG_PATTERN_URL})`,
  backgroundPosition: '0% 0%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'object-cover',
} as const;

/** Real per-machine-generation live/periodic-update note (`.text-16px` under the counter). */
function HeroLiveBadge() {
  const { t } = useTranslation('home');

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
      </span>
      <span className="text-sm font-medium text-fg">{t('hero.stats.liveBadge')}</span>
    </span>
  );
}

function HeroCounter() {
  const { t } = useTranslation('home');
  const { value, ref } = useCountUp<HTMLDivElement>({ end: CARS_WASHED_COUNT });

  return (
    <m.div variants={fadeInUp} ref={ref} className="max-w-lg">
      <HeroLiveBadge />
      <p className="mt-3 text-5xl font-bold text-brand sm:text-6xl lg:text-7xl" dir="ltr">
        {formatNumber(value)}
      </p>
      <p className="mt-2 text-base font-light text-fg-muted sm:text-lg lg:text-[26px]">
        {t('hero.stats.carsWashedLabel')}
      </p>
      <p className="mt-2 text-sm font-light text-fg-muted">{t('hero.stats.updateNote')}</p>
    </m.div>
  );
}

// Real headline: 3 lines, each a plain word followed by a bold brand-blue
// accent word (`.text-80px`, second word per line rendered bold/blue —
// confirmed against the live site's rendered screenshot).
function HeroHeadlineLine({ plain, accent }: { plain: string; accent: string }) {
  return (
    <span className="block leading-[1.3]">
      <span className="font-normal">{plain} </span>
      <span className="font-semibold text-brand">{accent}</span>
    </span>
  );
}

export function Hero() {
  const { t } = useTranslation('home');

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-bg"  style={HERO_BG_PATTERN_STYLE}>
      <div
        className="absolute inset-y-0 end-0 -z-10 hidden w-1/2 md:block"
       
      >
        <Image
          src={HERO_IMAGE_URL}
          alt={t('hero.imageAlt')}
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
      </div>

      <Container>
        <m.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="relative py-16 md:py-24"
        >
          <m.h1
            id="hero-heading"
            variants={fadeInUp}
            className="max-w-2xl text-4xl leading-tight my-2 text-fg md:text-6xl lg:text-[50px] tracking-[.02em]"
          >
            <HeroHeadlineLine plain={t('hero.title.line1Plain')} accent={t('hero.title.line1Accent')} />
            <HeroHeadlineLine plain={t('hero.title.line2Plain')} accent={t('hero.title.line2Accent')} />
            <HeroHeadlineLine plain={t('hero.title.line3Plain')} accent={t('hero.title.line3Accent')} />
          </m.h1>

          {/*
            Real hero has no generic 3-stat row (years/installations/cities)
            — those were placeholder content. It has one prominent live
            counter of total cars washed, with a pulsing "live" badge; see
            HeroCounter above.
          */}
          <div className="mt-10">
            <HeroCounter />
          </div>

          {/* Real hero's own call/WhatsApp buttons (`.buttons_contact_wrap`),
              duplicating the same pair already in the header. */}
          <m.div variants={fadeInUp} className="mt-8">
            <ContactButtons imageClassName="h-11 sm:h-12" />
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
