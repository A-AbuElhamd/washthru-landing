import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * W3C APG accordion/disclosure pattern: the trigger is a real <button> nested
 * inside the heading tag, and the panel carries role="region" labelled by
 * the trigger.
 */
export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const isOpen = prev.has(id);
      const next = new Set(allowMultiple ? prev : []);
      if (isOpen) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn('divide-y divide-border', className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `trigger-${item.id}`;
        const panelId = `panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-start font-medium text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('h-5 w-5 shrink-0 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-4 text-fg-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
