import { useRef } from 'react';
import Image from 'next/image';
import { m, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { features, type Feature } from '@/data/features';
import { useLocale } from '@/hooks/useLocale';

const PANEL_COUNT = features.length;

interface FeaturePanelProps {
  feature: Feature;
  index: number;
  progress: MotionValue<number>;
  heading: string;
  subheading: string;
}

// Real production mechanic (`.main__parent`/`.sticky__wrapper`/`.feature_wrap_N`):
// 5 panels stacked with position:absolute + increasing z-index inside a
// position:sticky viewport-height wrapper, pinned for a 350vh scroll
// distance while Webflow's own scroll listener crossfades each panel's
// opacity in turn. Reproduced here with framer-motion's scroll-linked
// useTransform instead of a raw scroll-position listener.
function FeaturePanel({ feature, index, progress, heading, subheading }: FeaturePanelProps) {
  const resolvedLocale = useLocale();
  const sliceStart = index / PANEL_COUNT;
  const sliceEnd = (index + 1) / PANEL_COUNT;
  const fade = 0.5 / PANEL_COUNT;

  const opacity = useTransform(
    progress,
    [Math.max(0, sliceStart - fade), sliceStart, Math.max(sliceStart, sliceEnd - fade), sliceEnd],
    [index === 0 ? 1 : 0, 1, 1, index === PANEL_COUNT - 1 ? 1 : 0]
  );

  return (
    <m.div style={{ opacity, zIndex: index + 1 }} className="absolute inset-0 flex flex-col md:flex-row">
      <div className="relative h-40 w-full shrink-0 md:h-full md:flex-1">
        <Image
          src={feature.backgroundImageUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4 bg-brand p-6 text-white md:p-14">
        <h2 className="text-2xl font-medium leading-tight md:text-[33px]">{heading}</h2>
        {index === 0 ? <p className="text-base font-light md:text-[20px]">{subheading}</p> : null}
        <div className="mt-2 flex items-center gap-4">
          <Image src={feature.iconUrl} alt="" width={40} height={40} className="h-10 w-10 shrink-0" unoptimized />
          <p className="text-base font-light md:text-lg">{feature.description[resolvedLocale]}</p>
        </div>
      </div>
    </m.div>
  );
}

// Static, fully-accessible fallback for prefers-reduced-motion: no pin, no
// scroll-linked opacity — every panel just renders in normal document flow.
function FeaturesStatic({ heading, subheading }: { heading: string; subheading: string }) {
  const resolvedLocale = useLocale();
  return (
    <div className="flex flex-col gap-6">
      {features.map((feature, index) => (
        <div key={feature.id} className="flex flex-col overflow-hidden rounded-[30px] md:flex-row">
          <div className="relative h-48 w-full shrink-0 md:h-auto md:flex-1">
            <Image
              src={feature.backgroundImageUrl}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4 bg-brand p-6 text-white md:p-14">
            <h2 className="text-2xl font-medium leading-tight md:text-[33px]">{heading}</h2>
            {index === 0 ? <p className="text-base font-light md:text-[20px]">{subheading}</p> : null}
            <div className="mt-2 flex items-center gap-4">
              <Image src={feature.iconUrl} alt="" width={40} height={40} className="h-10 w-10 shrink-0" unoptimized />
              <p className="text-base font-light md:text-lg">{feature.description[resolvedLocale]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  const { t } = useTranslation('home');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heading = t('features.heading');
  const subheading = t('features.subheading');

  return (
    <section aria-labelledby="features-heading" className="py-10 md:py-14">
      <Container>
        <h2 id="features-heading" className="sr-only">
          {heading}
        </h2>
        {prefersReducedMotion ? (
          <FeaturesStatic heading={heading} subheading={subheading} />
        ) : (
          <div ref={containerRef} className="relative h-[350vh]">
            <div className="sticky top-0 h-screen min-h-[469px] overflow-hidden rounded-[30px]">
              {features.map((feature, index) => (
                <FeaturePanel
                  key={feature.id}
                  feature={feature}
                  index={index}
                  progress={scrollYProgress}
                  heading={heading}
                  subheading={subheading}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
