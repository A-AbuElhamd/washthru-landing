import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface IconButtonSharedProps {
  icon: ReactNode;
  /** Required accessible name — this button renders no visible text. */
  label: string;
  className?: string;
}

export interface IconButtonLinkProps extends IconButtonSharedProps {
  href: string;
  target?: string;
  rel?: string;
}

export interface IconButtonActionProps
  extends IconButtonSharedProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'disabled'> {
  // `never` (not `undefined`) is what makes the `if (props.href)` truthy-check
  // below narrow the union reliably in both branches.
  href?: never;
}

export type IconButtonProps = IconButtonLinkProps | IconButtonActionProps;

const BASE_CLASSES =
  'inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50';

export function IconButton(props: IconButtonProps) {
  const { icon, label, className } = props;
  const classes = cn(BASE_CLASSES, className);

  if (typeof props.href === 'string') {
    const { href, target, rel } = props;
    return (
      <Link href={href} target={target} rel={rel} aria-label={label} className={classes}>
        {icon}
      </Link>
    );
  }

  const { onClick, type = 'button', disabled } = props;
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={label} className={classes}>
      {icon}
    </button>
  );
}
