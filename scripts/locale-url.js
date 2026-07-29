/**
 * Shared locale/URL mapping — the single source of truth for this site's
 * unprefixed-ar / prefixed-en URL scheme. Plain CommonJS with zero framework
 * imports so it can be required both from next-sitemap.config.js (which runs
 * standalone, outside Next's module graph) and from src/utils/seo.ts.
 */

function stripLocalePrefix(pagePath) {
  if (pagePath === '/en') return '/';
  return pagePath.startsWith('/en/') ? pagePath.slice(3) : pagePath;
}

function toEnglishPath(basePath) {
  return basePath === '/' ? '/en' : `/en${basePath}`;
}

function toArabicPath(basePath) {
  return basePath;
}

function localizedPath(basePath, locale) {
  return locale === 'en' ? toEnglishPath(basePath) : toArabicPath(basePath);
}

module.exports = { stripLocalePrefix, toEnglishPath, toArabicPath, localizedPath };
