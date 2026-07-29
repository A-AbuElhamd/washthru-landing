import Link from 'next/link';
import { useTranslation } from 'next-i18next/pages';
import { cn } from '@/utils/cn';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const { t } = useTranslation('common');

  return (
    <nav aria-label={t('breadcrumbs.label')} className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.path ?? item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-fg-muted">
                  /
                </span>
              ) : null}
              {!isLast && item.path ? (
                <Link href={item.path} className="hover:text-fg hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast && 'font-medium text-fg')}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
