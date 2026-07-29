import type { LocalizedText } from '@/data/features';

export interface CompanyValue {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** lucide-react icon name, mapped to a component where this is rendered */
  icon: 'Award' | 'Lightbulb' | 'HeartHandshake';
}

/** Core values as stated on the source site's "who we are" page, expanded with a short original description for each. */
export const companyValues: CompanyValue[] = [
  {
    id: 'quality-precision',
    title: {
      ar: 'الجودة والدقة',
      en: 'Quality & precision',
    },
    description: {
      ar: 'نلتزم بمعايير تصنيع دقيقة في كل جهاز نصنعه، من اختيار المواد إلى اختبار كل وحدة قبل تسليمها.',
      en: 'We hold every machine to exacting manufacturing standards, from material selection through to final testing before delivery.',
    },
    icon: 'Award',
  },
  {
    id: 'continuous-innovation',
    title: {
      ar: 'الابتكار المتجدد',
      en: 'Continuous innovation',
    },
    description: {
      ar: 'نطوّر منتجاتنا باستمرار بالاعتماد على تقنيات الذكاء الاصطناعي وإنترنت الأشياء لمواكبة احتياجات القطاع المتغيرة.',
      en: 'We keep evolving our products around AI and IoT technology to keep pace with the sector’s changing needs.',
    },
    icon: 'Lightbulb',
  },
  {
    id: 'honesty-transparency',
    title: {
      ar: 'الصدق والشفافية',
      en: 'Honesty & transparency',
    },
    description: {
      ar: 'نبني علاقتنا مع عملائنا وشركائنا على الوضوح في كل مرحلة، من الاستشارة الأولى إلى الدعم الفني بعد البيع.',
      en: 'We build every client and partner relationship on clarity at each stage, from the first consultation through after-sales support.',
    },
    icon: 'HeartHandshake',
  },
];
