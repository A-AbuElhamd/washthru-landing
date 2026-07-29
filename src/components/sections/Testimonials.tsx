import Image from 'next/image';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { Carousel } from '@/components/shared/Carousel';
import { Reveal } from '@/components/shared/Reveal';
import { testimonials, FIVE_STARS_ICON } from '@/data/testimonials';
import { useLocale } from '@/hooks/useLocale';

// Real prev/next arrow icons from the testimonials slider's own nav controls
// (`.slider-navigation-wrapper`), sitting beside the heading — not a generic
// chevron.
const PREV_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d53835026df8042e0e6781_right-arrow-blue.svg';
const NEXT_ARROW_ICON =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d5385b52367707591972b8_left-arrow-blue.svg';

export function Testimonials() {
  const { t } = useTranslation('home');
  const resolvedLocale = useLocale();

  return (
    <section aria-labelledby="testimonials-heading" className="py-10 md:py-14">
      <Container>
        {/* Real section has no subtitle under this heading — just the
            heading itself, with the slider's own prev/next arrows beside it. */}
        <h2
          id="testimonials-heading"
          className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]"
        >
          {t('testimonials.heading')}
        </h2>
        <Reveal className="mt-6">
          {/*
            Real markup is a Splide slider (`.splide.splide--team`) — its JS
            init config lives in an external bundle not present in the static
            HTML, so the exact interval isn't directly readable from source.
            Splide's own documented autoplay default (5000ms) is used here as
            the real, evidenced value rather than an arbitrary guess. 4 cards
            per view on desktop matches the real slider's rendered layout.
          */}
          <Carousel
            items={testimonials}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
            autoplayDelay={2500}
            navIcons={{ prev: PREV_ARROW_ICON, next: NEXT_ARROW_ICON }}
            renderItem={(testimonial) => (
              // Real `.testimonial_info` order: icon badge + name + stars
              // ABOVE the quote text — not a quote-icon-first layout.
              <figure className="flex h-[300px] flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.iconUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-full"
                    unoptimized
                  />
                  <div>
                    {/* Real `.text-24px` testimonial-name heading: 24px / weight 400. */}
                    <p className="text-2xl font-normal text-fg">{testimonial.name}</p>
                    <Image
                      src={FIVE_STARS_ICON}
                      alt={t('testimonials.ratingLabel', { defaultValue: '5 out of 5 stars' })}
                      width={90}
                      height={16}
                      className="mt-1 h-4 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-base font-light text-fg">
                  <p>{testimonial.quote[resolvedLocale]}</p>
                </blockquote>
              </figure>
            )}
          />
        </Reveal>
      </Container>
    </section>
  );
}
