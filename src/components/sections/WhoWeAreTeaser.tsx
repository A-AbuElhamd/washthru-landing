import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';

// Real embed (`.wwr_video_wrap`) — the company's own intro video, hosted on
// Vimeo. The source site routes this through embed.ly's wrapper, but that
// wrapper doesn't render reliably in every browser; the direct Vimeo player
// embed is the same real video and renders consistently.
const VIDEO_EMBED_SRC =
  'https://player.vimeo.com/video/498883728?app_id=122963&h=996a4ae2c2';

// Real "من نحن" homepage teaser (`.who_we_are_section`) — distinct from the
// full /who-we-are page, sitting right after the hero on the real homepage.
export function WhoWeAreTeaser() {
  const { t } = useTranslation('home');

  return (
    <section aria-labelledby="who-we-are-teaser-heading" className="py-10 md:py-14">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            {/* Real embed uses a fluid `padding-top: 56.17%` box (its own aspect
                ratio quirk) instead of a plain 16:9 — matched exactly. */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingTop: '56.17%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={VIDEO_EMBED_SRC}
                title={t('whoWeAre.videoTitle')}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal className="lg:order-1">
            <h2
              id="who-we-are-teaser-heading"
              className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]"
            >
              {t('whoWeAre.heading')}
            </h2>
            <p className="mt-4 text-base font-light text-fg-muted sm:text-lg lg:text-[20px]">
              {t('whoWeAre.intro')}
            </p>
            <h3 className="mt-8 text-xl font-medium text-fg sm:text-2xl md:text-3xl lg:text-[33px]">
              {t('whoWeAre.missionHeading')}
            </h3>
            <p className="mt-4 text-base font-light text-fg-muted sm:text-lg lg:text-[20px]">
              {t('whoWeAre.missionText')}
            </p>
            <Button href="/who-we-are" variant="primary" size="lg" className="mt-6 h-11 sm:h-16 text-sm sm:text-base lg:text-[17px]">
              {t('whoWeAre.cta')}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
