import { cn } from '@/utils/cn';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
  /** Never 'h1' — homepage/page sections must not duplicate the page's single H1. */
  as?: 'h2' | 'h3';
  align?: 'start' | 'center';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  id,
  as = 'h2',
  align = 'start',
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-start', className)}>
      {/*
        Real-site type scale (from the production compiled CSS): section
        titles are `.text-53px` (53.2px at desktop, weight 500 whenever the
        heading also carries a "bold"/"mid" modifier — which every real
        section heading does, so `font-medium` not `font-bold`). Subtitles
        are `.text-28px` (~26.7px, weight 300).
      */}
      <HeadingTag
        id={id}
        className="text-2xl font-medium text-fg sm:text-3xl md:text-4xl lg:text-[33px]"
      >
        {title}
      </HeadingTag>
      {subtitle ? (
        <p className="mt-3 text-base font-light text-fg-muted sm:text-lg lg:text-[20px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
