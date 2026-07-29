#!/usr/bin/env node

/**
 * Fails if any `t('key')` call site in src/ references a translation key
 * missing from any locale's JSON. Written after a real production bug: three
 * components independently called `t('*.subheading')` while the locale JSON
 * defined `*.subtitle`, plus several other missing keys — all silently
 * rendering raw key strings in the shipped HTML with no build-time signal.
 *
 * This is a regex-based scan, not a full AST parse — it's a pragmatic
 * CI guard, not a general-purpose i18n linter. It understands:
 *   - useTranslation('namespace') / useTranslation(['ns1', 'ns2'])
 *     to know which namespace(s) are in scope for unprefixed keys in a file
 *   - t('key') and t('namespace:key') call forms
 * It does NOT understand dynamically constructed keys (e.g. t(variable)) —
 * those are skipped, since they can't be statically verified anyway.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const LOCALES = ['ar', 'en'];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function flattenKeys(obj, prefix = '', out = new Set()) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenKeys(value, path, out);
    } else {
      out.add(path);
    }
  }
  return out;
}

function loadNamespaceKeys(locale, namespace) {
  const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
  if (!fs.existsSync(filePath)) return null;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return flattenKeys(json);
}

function defaultNamespacesFor(source) {
  const single = source.match(/useTranslation\(\s*['"]([a-zA-Z0-9_-]+)['"]\s*\)/);
  if (single) return [single[1]];

  const multi = source.match(/useTranslation\(\s*\[([^\]]+)\]\s*\)/);
  if (multi) {
    return multi[1]
      .split(',')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return ['common']; // next-i18next's default namespace
}

function extractTCalls(source) {
  const calls = [];
  const pattern = /(?<![a-zA-Z0-9_])t\(\s*['"]([a-zA-Z0-9_.:-]+)['"]/g;
  let match;
  while ((match = pattern.exec(source))) {
    calls.push(match[1]);
  }
  return calls;
}

function main() {
  const files = walk(SRC_DIR);
  const missing = [];
  const namespaceCache = new Map(); // `${locale}:${namespace}` -> Set<string> | null

  function getKeys(locale, namespace) {
    const cacheKey = `${locale}:${namespace}`;
    if (!namespaceCache.has(cacheKey)) {
      namespaceCache.set(cacheKey, loadNamespaceKeys(locale, namespace));
    }
    return namespaceCache.get(cacheKey);
  }

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8');
    if (!source.includes('useTranslation') && !/\bt\(/.test(source)) continue;

    const defaultNamespaces = defaultNamespacesFor(source);
    const calls = extractTCalls(source);
    const relPath = path.relative(process.cwd(), file);

    for (const rawKey of calls) {
      const [maybeNs, ...rest] = rawKey.split(':');
      const hasExplicitNs = rest.length > 0;
      const key = hasExplicitNs ? rest.join(':') : rawKey;
      const namespaces = hasExplicitNs ? [maybeNs] : defaultNamespaces;

      for (const locale of LOCALES) {
        for (const namespace of namespaces) {
          const keys = getKeys(locale, namespace);
          if (keys === null) {
            missing.push(`${relPath}: namespace "${namespace}" has no ${locale}/${namespace}.json`);
            continue;
          }
          // i18next pluralization: a call site uses the bare key (e.g.
          // t('post.readingTime', { count })) while the JSON only defines
          // suffixed variants (_one/_other, or the fuller Arabic CLDR set
          // _zero/_one/_two/_few/_many/_other) — that's correct, not missing.
          const PLURAL_SUFFIXES = ['_zero', '_one', '_two', '_few', '_many', '_other'];
          const hasPluralVariant = PLURAL_SUFFIXES.some((suffix) => keys.has(`${key}${suffix}`));
          if (!keys.has(key) && !hasPluralVariant) {
            missing.push(`${relPath}: "${namespace}:${key}" missing from ${locale}/${namespace}.json`);
          }
        }
      }
    }
  }

  if (missing.length > 0) {
    console.error(`\n✗ ${missing.length} translation key issue(s) found:\n`);
    for (const line of [...new Set(missing)].sort()) {
      console.error(`  - ${line}`);
    }
    console.error('');
    process.exitCode = 1;
  } else {
    console.log('✓ All t() key references resolve in every locale.');
  }
}

main();
