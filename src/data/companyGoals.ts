import type { LocalizedText } from '@/data/features';

export interface CompanyGoal {
  id: string;
  description: LocalizedText;
}

/** Strategic goals paraphrased from the source site's "who we are" page. */
export const companyGoals: CompanyGoal[] = [
  {
    id: 'enable-automation',
    description: {
      ar: 'تمكين الأتمتة في قطاع غسيل السيارات، ورفع مستوى التحكم والمراقبة والجودة، وتقليل الأيدي العاملة.',
      en: 'Enabling car wash automation, improving control, monitoring and quality, and reducing manpower.',
    },
  },
  {
    id: 'boost-productivity',
    description: {
      ar: 'التشجيع على زيادة الإنتاجية ورفع الجودة، باستخدام تقنيات الذكاء الاصطناعي.',
      en: 'Encouraging increased productivity and quality using AI technologies.',
    },
  },
  {
    id: 'raise-awareness',
    description: {
      ar: 'رفع مستوى الوعي في مجال غسيل السيارات.',
      en: 'Raising awareness in the car wash industry.',
    },
  },
];
