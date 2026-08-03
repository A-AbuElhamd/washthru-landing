import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pause, Play } from 'lucide-react';
import { useTranslation } from 'next-i18next/pages';
import { useDirection } from '@/hooks/useDirection';
import { IconButton } from '@/components/shared/IconButton';
import { cn } from '@/utils/cn';

export interface CarouselBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  slidesPerView?: number | CarouselBreakpoints;
  spaceBetween?: number;
  className?: string;
  /**
   * Autoplay delay in ms. Omitted by default (autoplay OFF), per the
   * accessibility audit (WCAG 2.2.2). Passing a value wires up Swiper's
   * autoplay module AND renders a visible pause/play control — the two are
   * intentionally coupled so autoplay can never ship without a control.
   */
  autoplayDelay?: number;
  /**
   * Real production prev/next arrow icons (e.g. the testimonials slider's
   * `right-arrow-blue.svg`/`left-arrow-blue.svg`) rendered as manual nav
   * buttons above the track. Omit for carousels with no real nav-arrow
   * equivalent.
   */
  navIcons?: { prev: string; next: string };
  /**
   * Suppresses the pause/play control that normally ships with autoplay.
   * Only for decorative, non-essential content (e.g. a logo marquee) where
   * the real production site itself runs the same motion with no stop
   * control at all — not a general-purpose escape hatch from WCAG 2.2.2.
   */
  hideAutoplayControl?: boolean;
  loop?: boolean;
  /**
   * Renders `navIcons` as absolutely-positioned overlay buttons centered on
   * the slide's vertical middle (real `.team_section` single left/right
   * chevrons sitting directly on the photo) instead of the default row of
   * buttons above the track.
   */
  navIconsOverlay?: boolean;
  onSlideChange?: (index: number) => void;
  /**
   * Hides the built-in `navIcons` rendering entirely while still wiring
   * autoplay/loop/slide-change — for pages with a bespoke nav-button layout
   * (e.g. the real `.services_section`'s two corner-pinned chevrons) that
   * drive the swiper instance via `onSwiperInstance` instead.
   */
  hideNav?: boolean;
  onSwiperInstance?: (instance: SwiperInstance) => void;
  /**
   * Real `.slide-nav` round pagination dots (e.g. the after-sale warranty
   * carousel). Omit for carousels where the real site hides its dots
   * (`.slide-nav-3 { display: none }`).
   */
  showDots?: boolean;
}

/**
 * Generic swiper/react wrapper. Two accessibility fixes from the audit:
 * 1. `key={dir}` forces a remount on direction change — Swiper only computes
 *    RTL layout at initialization.
 * 2. Each slide carries slide-role semantics (role="group",
 *    aria-roledescription="slide", aria-label="n / total").
 */
export function Carousel<T>({
  items,
  renderItem,
  slidesPerView = 1,
  spaceBetween = 16,
  className,
  autoplayDelay,
  loop,
  navIcons,
  hideAutoplayControl,
  navIconsOverlay,
  onSlideChange,
  hideNav,
  onSwiperInstance,
  showDots,
}: CarouselProps<T>) {
  const dir = useDirection();
  const { t } = useTranslation('common');
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(Boolean(autoplayDelay));
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(items.length <= 1);

  function syncEdges(instance: SwiperInstance) {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  }

  const breakpoints =
    typeof slidesPerView === 'number'
      ? undefined
      : {
          0: { slidesPerView: slidesPerView.mobile },
          768: { slidesPerView: slidesPerView.tablet },
          1024: { slidesPerView: slidesPerView.desktop },
        };

  function togglePlayback() {
    const instance = swiperRef.current;
    if (!instance?.autoplay) return;

    if (isPlaying) {
      instance.autoplay.stop();
      setIsPlaying(false);
    } else {
      instance.autoplay.start();
      setIsPlaying(true);
    }
  }

  return (
    <div className={cn('relative', className)}>
      {navIcons && !navIconsOverlay && !hideNav ? (
        <div className="mb-4 flex items-center gap-3">
          {!loop && isBeginning ? null : (
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t('carousel.previous', { defaultValue: 'Previous slide' })}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image src={navIcons.prev} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
            </button>
          )}
          {!loop && isEnd ? null : (
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t('carousel.next', { defaultValue: 'Next slide' })}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image src={navIcons.next} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
            </button>
          )}
        </div>
      ) : null}
      {navIcons && navIconsOverlay && !hideNav ? (
        <>
          {!loop && isBeginning ? null : (
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t('carousel.previous', { defaultValue: 'Previous slide' })}
              className="absolute start-2 top-1/2 z-10 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image src={navIcons.prev} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
            </button>
          )}
          {!loop && isEnd ? null : (
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={t('carousel.next', { defaultValue: 'Next slide' })}
              className="absolute end-2 top-1/2 z-10 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Image src={navIcons.next} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
            </button>
          )}
        </>
      ) : null}
      <Swiper
        key={dir}
        dir={dir}
        modules={[...(autoplayDelay ? [Autoplay] : []), ...(showDots ? [Pagination] : [])]}
        autoplay={autoplayDelay ? { delay: autoplayDelay || 2500, disableOnInteraction: false } : false}
        pagination={showDots ? { clickable: true } : false}
        onSwiper={(instance) => {
          swiperRef.current = instance;
          syncEdges(instance);
          onSwiperInstance?.(instance);
        }}
        onSlideChange={(instance) => {
          onSlideChange?.(instance.realIndex);
          syncEdges(instance);
        }}
        loop={loop}
        slidesPerView={typeof slidesPerView === 'number' ? slidesPerView : slidesPerView.mobile}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        className={showDots ? '!pb-10' : undefined}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${items.length}`}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {autoplayDelay && !hideAutoplayControl ? (
        <div className="absolute bottom-3 end-3 z-10">
          <IconButton
            icon={
              isPlaying ? (
                <Pause className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" aria-hidden="true" />
              )
            }
            label={
              isPlaying
                ? t('carousel.pause', { defaultValue: 'Pause carousel' })
                : t('carousel.play', { defaultValue: 'Play carousel' })
            }
            onClick={togglePlayback}
          />
        </div>
      ) : null}
    </div>
  );
}
