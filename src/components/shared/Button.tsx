import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonSharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

export interface ButtonLinkProps extends ButtonSharedProps {
  /** Presence of `href` renders the button as a `next/link` anchor. */
  href: string;
  target?: string;
  rel?: string;
}

export interface ButtonActionProps
  extends ButtonSharedProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled' | 'aria-label'> {
  // `never` (not `undefined`) is what makes the `if (props.href)` truthy-check
  // below narrow the union reliably in both branches.
  href?: never;
}

export type ButtonProps = ButtonLinkProps | ButtonActionProps;

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50';

// The real production CTA (`.general_button`, used for "استعراض المنتج" /
// "اطلب عرض سعر" / etc.) isn't a flat-color pill: its whole shape/fill is a
// single background SVG (an authorized real asset) with transparent
// background-color and white text on top — confirmed from the site's
// compiled CSS. Applied via inline `style` (not a Tailwind arbitrary
// background-image utility) because the filename's underscores would
// otherwise get mangled by Tailwind's arbitrary-value parser. (Earlier this
// comment illustrated that failure mode with a literal example of the
// bracketed arbitrary-value syntax it was warning about — Tailwind's
// content scanner matches that shape even inside a comment, so the example
// itself broke the Turbopack build. Describing it in prose instead, on
// purpose, this time.)
const PRIMARY_BG_IMAGE_URL =
  'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d4e9559eb1ee6ff45a9fc6_arrow-button-01.svg';
const PRIMARY_BG_STYLE = {
  backgroundImage: `url(${PRIMARY_BG_IMAGE_URL})`,
} as const;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-transparent bg-center bg-no-repeat [background-size:contain] font-light text-white hover:brightness-110',
  secondary: 'border border-border text-fg hover:bg-surface-hover',
  ghost: 'text-fg hover:bg-surface-hover',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-3 py-1.5 text-sm',
  md: 'min-h-[44px] px-4 py-2.5 text-base',
  lg: 'min-h-[48px] px-6 py-3 text-lg',
};

// Real `.general_button` is a single fixed-size box (~237x82px, padding-left
// 30px/right 5px, ~26px font at weight 300) everywhere it's used on the
// source site — it has no size variants of its own, so the primary variant
// here ignores `size` and always renders at this real fixed footprint
// instead of one of the generic sm/md/lg paddings above.
const PRIMARY_FIXED_SIZE_CLASSES =
  'h-[82px] w-[237px] max-w-full pl-[30px] pr-[5px] text-[26px] leading-[1.5]';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    variant === 'primary' ? PRIMARY_FIXED_SIZE_CLASSES : SIZE_CLASSES[size],
    className
  );
  const style = variant === 'primary' ? PRIMARY_BG_STYLE : undefined;

  // typeof (not a truthy check) — href is a plain `string` on the link
  // variant, so a falsy check couldn't rule out an empty-string href staying
  // in that branch, and TypeScript correctly refuses to narrow the `else`
  // path down to the button variant in that case.
  if (typeof props.href === 'string') {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={props['aria-label']}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}
