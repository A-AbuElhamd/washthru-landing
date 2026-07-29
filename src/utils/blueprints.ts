import fs from 'fs';
import path from 'path';
import type { BlueprintPlan } from '@/types/content';
import type { Locale } from '@/types/i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blueprints');

export function getAllBlueprintSlugs(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''));
}

export function getBlueprintBySlug(slug: string, locale: Locale): BlueprintPlan | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as BlueprintPlan;
}

export function getAllBlueprints(locale: Locale): BlueprintPlan[] {
  return getAllBlueprintSlugs(locale)
    .map((slug) => getBlueprintBySlug(slug, locale))
    .filter((plan): plan is BlueprintPlan => plan !== null)
    .sort((a, b) => a.planNumber.localeCompare(b.planNumber));
}
