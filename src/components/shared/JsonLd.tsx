import Head from 'next/head';
import type { JsonLdInput } from '@/types/seo';

export interface JsonLdProps {
  data: JsonLdInput;
}

/**
 * Renders one or more plain objects as `<script type="application/ld+json">`
 * tags via next/head.
 *
 * `next/head` deduplicates elements it collects across *every* `<Head>`
 * instance mounted on a page by matching each element's `key` prop — not
 * just within one `<Head>` call. A page commonly has several independent
 * `<JsonLd>` mounts (one from `Seo`, plus section components like `Faq`/
 * `Services` that render their own schema directly). If every instance
 * numbered its scripts `0, 1, 2...` from scratch, unrelated schemas sharing
 * the same array position would collide on the same key, and next/head would
 * silently keep only whichever one mounts last in the tree — the earlier
 * ones vanish from the page with no error. Keying by each schema's own
 * `@type` (falling back to array index only for duplicates/untyped objects)
 * keeps keys unique across every `<JsonLd>` mount on the same page.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  const seenTypes = new Map<string, number>();

  return (
    <Head>
      {items.map((item, index) => {
        const type = typeof item['@type'] === 'string' ? item['@type'] : `untyped-${index}`;
        const occurrence = seenTypes.get(type) ?? 0;
        seenTypes.set(type, occurrence + 1);
        const key = occurrence === 0 ? `jsonld-${type}` : `jsonld-${type}-${occurrence}`;

        return (
          // eslint-disable-next-line react/no-danger
          <script
            key={key}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          />
        );
      })}
    </Head>
  );
}
