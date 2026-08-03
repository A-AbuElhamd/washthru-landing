import { useRef } from 'react';
import { m, useScroll } from 'framer-motion';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { companyMilestones } from '@/data/companyMilestones';
import { useLocale } from '@/hooks/useLocale';

// Real `.timeline_item`: a 3-column grid (`1fr 75px 17px`) — content
// (`.timeline_right`, max-width 560px) in the wide first column, a small
// secondary date label in the middle, and the marker circle in the narrow
// last column. In RTL that first column sits on the visual right — i.e.
// the logical "start" side — with the connecting line/circle toward the
// logical "end". The huge year number and circle are both `position:
// sticky` *within* their own item (no scroll-jack/pin needed).
function TimelineItem({
  year,
  description,
  isLast,
}: {
  year: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="relative flex min-h-[320px] items-stretch gap-6 py-8 md:min-h-[440px]">
      <div className="max-w-[560px] flex-1 text-start">
        <div className="sticky top-1/2 -translate-y-1/2">
          {/* Real `.text-382px` — 382px design intent, weight 500, line-height 0.8. */}
          <p className="text-6xl font-medium leading-[0.8] text-brand sm:text-7xl lg:text-[140px]">
            {year}
          </p>
          {/* Real `.text-35px.gray` description — clearly smaller than the year number. */}
          <p className="mt-3 max-w-sm text-sm font-medium leading-snug text-fg-muted lg:text-base">
            {description}
          </p>
        </div>
      </div>
      <div className="relative w-8 shrink-0">
        {!isLast ? (
          <div aria-hidden="true" className="absolute inset-y-0 start-1/2 w-px -translate-x-1/2 bg-border" />
        ) : null}
        <div className="sticky top-1/2 flex -translate-y-1/2 justify-center">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

export function WhoWeAreTimeline() {
  const { t } = useTranslation('who-we-are');
  const resolvedLocale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section aria-labelledby="timeline-heading" className="py-12 md:py-20">
      <Container>
        <h2
          id="timeline-heading"
          className="py-5 leading-relaxed text-xl font-medium text-brand lg:text-[28px]"
        >
          {t('timeline.heading', { defaultValue: 'نشأتنا' })}
        </h2>
        <div ref={containerRef} className="relative mt-8">
          {/* Static track + scroll-driven fill, standing in for the real
              fixed-position progress bar that grows as you scroll. */}
          <div
            aria-hidden="true"
            className="absolute end-3 top-0 bottom-0 w-px bg-border"
          />
          <m.div
            aria-hidden="true"
            className="absolute end-3 top-0 w-px origin-top bg-brand"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          />
          {companyMilestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.id}
              year={milestone.year}
              description={milestone.description[resolvedLocale]}
              isLast={index === companyMilestones.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
