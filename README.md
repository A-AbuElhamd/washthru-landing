# WashThru Clone

A bilingual (Arabic-default, English-secondary) Next.js clone of an automatic car wash machine manufacturer's marketing site, built as an engineering demonstration of production-grade i18n, theming, SEO, and accessibility patterns in the Next.js Pages Router.

> **Disclaimer.** This is an unofficial, educational clone built to demonstrate a specific tech stack and set of engineering practices. It is **not affiliated with, endorsed by, or produced by** the real business it takes visual/structural inspiration from. All product photography, logos, and imagery are placeholders — nothing here reuses the real company's actual copyrighted assets. Company details, blog content, and product specs referenced in `content/` and `src/data/` describe the real business for demonstration purposes only and should not be treated as official material from that company.

## Tech stack

- **Next.js 16** (Pages Router) · **React 19** · **TypeScript**
- **Tailwind CSS** (class-based dark mode, CSS-custom-property design tokens)
- **next-i18next** — Arabic (`ar`, unprefixed/default) + English (`en`, `/en`-prefixed)
- **next-themes** — light/dark theme, system-preference aware
- **framer-motion** — scroll-triggered reveals, globally reduced-motion-aware
- **lenis** — smooth scroll (disabled under `prefers-reduced-motion`)
- **swiper** — carousels (Services, Testimonials)
- **yet-another-react-lightbox** — gallery lightbox, lazy-loaded client-side only
- **next-sitemap** — sitemap.xml + robots.txt generated at build time

## Getting started

```bash
npm install
cp .env.example .env   # fill in NEXT_PUBLIC_SITE_URL before deploying
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the Arabic (default) site, or `/en` for English.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build, then generates `sitemap.xml`/`robots.txt` (`postbuild`) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next's ESLint config |
| `npm run check:i18n` | Fails if any `t('key')` call site references a translation key missing from any locale's JSON — see [`scripts/check-i18n-keys.js`](scripts/check-i18n-keys.js) |

Run `typecheck` and `check:i18n` before every commit that touches components or locale files — both are cheap and catch real, previously-shipped bugs in this exact codebase (see git history).

## Project structure

```
content/blog/{ar,en}/*.json   Blog post content (source of truth, not a CMS)
public/locales/{ar,en}/*.json Translation strings (common/home/blog namespaces)
src/components/shared/        Generic, prop-driven, page-agnostic components
src/components/sections/      Page-specific sections (own their copy/data)
src/config/                   Site constants (config/site.ts) and nav structure
src/data/                     Bilingual placeholder content for homepage sections
src/hooks/                    useDirection, useReducedMotion, useLocale, useCountUp, useMediaQuery
src/i18n/                     Locale resolution helpers
src/pages/                    Next.js Pages Router routes
src/theme/                    next-themes wrapper + CSS custom-property tokens
src/utils/                    seo.ts (title/description clamping, hreflang), schema.ts (JSON-LD), content.ts
scripts/                      locale-url.js (shared hreflang URL scheme), check-i18n-keys.js
```

## Environment variables

See [`.env.example`](.env.example) for the full list with explanations. In short:

- `NEXT_PUBLIC_SITE_URL` — required before deploying; every canonical URL, hreflang alternate, JSON-LD URL, and sitemap entry is built from this.
- `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` — optional, only render their respective verification meta tags when set.
- `VERCEL_ENV` — set automatically by Vercel, not something you configure; used to block crawling on preview deployments.

## What's genuinely done

- Full i18n routing (unprefixed `ar` default, `/en` prefixed), RTL/LTR correctness, no FOUC on locale switch
- Light/dark theme system, contrast-verified against the actual token values (WCAG AA, both themes)
- 19 real blog posts translated AR↔EN, served from local JSON via `getStaticProps`/`getStaticPaths` (`fallback: false` — every slug is known at build time)
- Full SEO layer: canonical URLs, reciprocal hreflang (page-level + sitemap-level), Organization/WebSite/WebPage/BlogPosting/BreadcrumbList/FAQPage/Service JSON-LD (verified present and non-colliding in actual build output), title/description length clamping
- Accessibility: single `<h1>` per page, keyboard-reachable nav (no hover-only menus), `MotionConfig reducedMotion="user"` applied globally, real form labels, focus-return on lightbox close, skip-to-content link
- Custom localized 404/500 pages
- A CI-style i18n key-coverage checker (`npm run check:i18n`) — written after this exact codebase shipped 18 raw untranslated key strings to production during initial scaffolding; this script would have caught it automatically

## Known gaps — not done yet

Being upfront about what a "v1" here does **not** include, so nothing is mistaken for finished:

- **Inner pages are not built**: `/who-we-are`, `/services`, `/wash-cloud`, `/after-sale`, `/contact-us`, `/our-products`, `/rollover`, `/tunnel`, `/blueprints`, `/knowledge-library` are all linked from the nav/footer/blog content but don't exist yet — they 404 today (to the real, localized 404 page, at least).
- **All imagery is a placeholder path** (`/images/hero/hero-cover.jpg`, `/images/gallery/*.jpg`, blog cover images, `/images/logo.svg`, favicons past the two low-res source PNGs) — none of these files exist on disk. Replace with real, licensed assets before shipping publicly.
- **The Contact form has no backend** — it's a client-only placeholder that confirms receipt in the UI via `preventDefault()`; no email/API integration exists.
- **A handful of lower-priority polish items** are tracked as recommendations, not blockers — see the code review conducted during development for the full list (organization schema per-page duplication was fixed; a couple of stylistic/consistency items were intentionally left as "nice to have").

## Deploying

1. Set `NEXT_PUBLIC_SITE_URL` to your real domain (and `GOOGLE_SITE_VERIFICATION`/`BING_SITE_VERIFICATION` if applicable).
2. `npm run build` — this also runs `next-sitemap` via `postbuild`, regenerating `public/sitemap.xml`/`public/robots.txt` (both gitignored on purpose; they're build artifacts, not source).
3. Submit `sitemap.xml` to Google Search Console / Bing Webmaster Tools after the first real deploy.

## License

MIT for the code in this repository — see [LICENSE](LICENSE). This does not extend to any third-party trademarks, brand names, or the real business's actual content/imagery referenced for demonstration purposes.
