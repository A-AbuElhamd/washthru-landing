import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
  navIcons,
}: CarouselProps<T>) {
  const dir = useDirection();
  const { t } = useTranslation('common');
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(Boolean(autoplayDelay));

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
      {navIcons ? (
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={t('carousel.previous', { defaultValue: 'Previous slide' })}
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image src={navIcons.prev} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={t('carousel.next', { defaultValue: 'Next slide' })}
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image src={navIcons.next} alt="" width={32} height={32} className="h-8 w-8" unoptimized />
          </button>
        </div>
      ) : null}
      <Swiper
        key={dir}
        dir={dir}
        modules={autoplayDelay ? [Autoplay] : undefined}
        autoplay={autoplayDelay ? { delay: autoplayDelay || 2500, disableOnInteraction: false } : false}
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        slidesPerView={typeof slidesPerView === 'number' ? slidesPerView : slidesPerView.mobile}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
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

      {autoplayDelay ? (
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
