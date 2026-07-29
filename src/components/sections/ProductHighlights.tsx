import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useScroll } from 'framer-motion';
import { useTranslation } from 'next-i18next/pages';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';

// lottie-react drives the DOM directly via lottie-web and has no server-render
// path, so it's loaded client-only, same pattern as Gallery's lightbox.
const LottieAnimation = dynamic(
  () => import('@/components/shared/LottieAnimation').then((mod) => mod.LottieAnimation),
  { ssr: false }
);

// Real production Lottie animation JSON files (Webflow asset CDN), used
// as-is on the real homepage's rollover/tunnel highlight sections. Real
// markup marks these `data-autoplay="0"` + `data-is-ix2-target="1"` — their
// frame is scrubbed by scroll position, not autoplayed.
const ROLLOVER_ANIMATION_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d236566b16a501b2ca539c_rollover_machine_overview_90d_n1.json';
const TUNNEL_ANIMATION_SRC =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63cd4c8ffbf4f5043b272733_tunnel_machine_overview_90d.json';

interface TitleSegment {
  text: string;
  accent: boolean;
}

interface HighlightProps {
  headingId: string;
  imageRef: React.RefObject<HTMLDivElement | null>;
  animationSrc: string;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  titleKey: string;
  descriptionKey: string;
  ctaKey: string;
  href: string;
  reverse?: boolean;
}

// Real `.rom-wrap`/`.tm-wrap`: a single flex row, image side unconstrained
// up to 969x623px, text side a real FIXED 340px column (not a fluid half of
// a 50/50 grid) — no extra centering wrapper divs on either side, so the
// text sits flush against the image with no dead space between them.
function ProductHighlight({
  headingId,
  imageRef,
  animationSrc,
  scrollProgress,
  titleKey,
  descriptionKey,
  ctaKey,
  href,
  reverse,
}: HighlightProps) {
  const { t } = useTranslation('home');
  // Real `<h1>` is two lines, one plain, one bold/blue — which word gets the
  // accent, and in which order, differs between the two real locales (AR:
  // plain word then accent word; EN: accent word then plain word), so the
  // exact text + order + accent flag all come from the locale JSON rather
  // than being assumed structurally.
  const titleSegments = t(titleKey, { returnObjects: true }) as TitleSegment[];

  return (
    <section aria-labelledby={headingId} className="px-3 pb-1 pt-6">
      <Container
        className={`flex flex-col gap-8 rounded-[30px] bg-surface px-6 py-10 sm:px-10 lg:items-center lg:gap-12 ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <Reveal ref={imageRef} className="w-full lg:max-w-[969px] lg:flex-1">
          <LottieAnimation src={animationSrc} scrollProgress={scrollProgress} className="h-auto w-full max-h-[623px]" />
        </Reveal>
        <Reveal className="w-full text-start  lg:w-[340px] lg:shrink-0">
          <h2 id={headingId} className="text-2xl font-medium text-fg lg:text-[33px] leading-[1.3]">
            {titleSegments.map((segment, index) => (
              <span key={index} className={index > 0 ? 'block' : undefined}>
                {segment.accent ? <span className="text-brand">{segment.text}</span> : segment.text}
              </span>
            ))}
          </h2>
          {/* Real `.div-block-4`: a plain 1px divider directly under the heading. */}
          <div className="my-[10px] h-px w-full bg-[#bfbfbf] " />
          <p className="text-base font-light text-fg-muted lg:text-[17px] ">{t(descriptionKey)}</p>
          <Button href={href} variant="primary" size="lg" className="mt-6 h-11 sm:h-16 text-sm sm:text-base lg:text-[17px]">
            {t(ctaKey)}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

export function ProductHighlights() {
  const rolloverRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rolloverProgress } = useScroll({
    target: rolloverRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: tunnelProgress } = useScroll({
    target: tunnelRef,
    offset: ['start end', 'end start'],
  });

  return (
    <>
      <ProductHighlight
        headingId="rollover-highlight-heading"
        imageRef={rolloverRef}
        animationSrc={ROLLOVER_ANIMATION_SRC}
        scrollProgress={rolloverProgress}
        titleKey="productHighlights.rollover.title"
        descriptionKey="productHighlights.rollover.description"
        ctaKey="productHighlights.rollover.cta"
        href="/rollover"
      />
      <ProductHighlight
        headingId="tunnel-highlight-heading"
        imageRef={tunnelRef}
        animationSrc={TUNNEL_ANIMATION_SRC}
        scrollProgress={tunnelProgress}
        titleKey="productHighlights.tunnel.title"
        descriptionKey="productHighlights.tunnel.description"
        ctaKey="productHighlights.tunnel.cta"
        href="/tunnel"
        reverse
      />
    </>
  );
}
