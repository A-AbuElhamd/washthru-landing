const { stripLocalePrefix, toEnglishPath } = require('./scripts/locale-url');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500', '/en/404', '/en/500'],

  transform: async (config, path) => {
    const basePath = stripLocalePrefix(path);
    const isHome = basePath === '/';

    return {
      loc: path,
      changefreq: path.includes('/blog/') ? 'monthly' : config.changefreq,
      priority: isHome ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        // hrefIsAbsolute is required here — without it, next-sitemap treats
        // `href` as a locale-root and appends this entry's own `loc` on top,
        // producing doubled paths like ".../blog/x/blog/x".
        { href: `${SITE_URL}${basePath}`, hreflang: 'ar', hrefIsAbsolute: true },
        { href: `${SITE_URL}${toEnglishPath(basePath)}`, hreflang: 'en', hrefIsAbsolute: true },
        { href: `${SITE_URL}${basePath}`, hreflang: 'x-default', hrefIsAbsolute: true },
      ],
    };
  },

  robotsTxtOptions: {
    // Block crawling entirely on any non-production Vercel deployment so
    // preview URLs never get indexed. Hosts without VERCEL_ENV default to allow —
    // wire your own staging flag if deploying elsewhere.
    policies:
      process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
        ? [{ userAgent: '*', disallow: '/' }]
        : [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [],
  },
};
