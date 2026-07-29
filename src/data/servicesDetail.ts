import type { LocalizedText } from '@/data/features';

export interface ServiceDetailItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Real service icon, sourced from the production site's CDN. */
  iconUrl: string;
}

/**
 * The full, end-to-end service catalog from the source site's services page —
 * richer and more granular than the homepage teaser carousel in
 * `data/servicesList.ts` (which groups several of these together). Kept as
 * its own list so the services page can present the complete project
 * journey, from first consultation to long-term device renewal.
 */
export const servicesDetail: ServiceDetailItem[] = [
  {
    id: 'consulting',
    title: {
      ar: 'استشارات قطاع غسيل السيارات',
      en: 'Car wash industry consulting',
    },
    description: {
      ar: 'تقديم الاستشارات في مجال غسيل السيارات.',
      en: 'Providing consultancy in the car wash industry.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b94722eb0584548ae1a0_service_icon_01.svg',
  },
  {
    id: 'site-blueprint-drafting',
    title: {
      ar: 'رسم المخططات التأسيسية للموقع',
      en: 'Site foundation blueprint drafting',
    },
    description: {
      ar: 'رسم المخططات التأسيسية للموقع.',
      en: 'Providing site drawing and design services.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b95958fb9e3c2e0e31a2_service_icon_03.svg',
  },
  {
    id: 'device-engineering-design',
    title: {
      ar: 'تصميم المواقع الهندسية للأجهزة',
      en: 'Engineering design for device siting',
    },
    description: {
      ar: 'تصميم المواقع الهندسية للأجهزة.',
      en: 'Designing the sites from an engineering perspective.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b9507aa163f55606f26e_service_icon_02.svg',
  },
  {
    id: 'foundation-supervision',
    title: {
      ar: 'الإشراف على تأسيسات الموقع',
      en: 'Foundation works supervision',
    },
    description: {
      ar: 'الإشراف على التأسيسات الخاصة بموقع الجهاز.',
      en: "Supervising the preparations for the machine's site.",
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b96099e7a181a59a18fc_service_icon_04.svg',
  },
  {
    id: 'installation',
    title: {
      ar: 'تركيب الأجهزة',
      en: 'Machine installation',
    },
    description: {
      ar: 'تركيب الأجهزة.',
      en: 'Installing the machines.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b96c834e8de75db1d579_service_icon_05.svg',
  },
  {
    id: 'staff-training',
    title: {
      ar: 'تدريب طاقم التشغيل',
      en: 'Operating staff training',
    },
    description: {
      ar: 'تدريب طاقم العمل الخاص بالشركاء على كيفية تشغيل الأجهزة وعمل الصيانات الدورية اللازمة.',
      en: 'Training the staff of our partners on how to operate and periodically maintain the machines.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b979566398ef37312a37_service_icon_06.svg',
  },
  {
    id: 'accounting-solutions',
    title: {
      ar: 'الحلول المحاسبية',
      en: 'Accounting solutions',
    },
    description: {
      ar: 'تقديم الحلول المحاسبية المتناسبة مع هذا النشاط.',
      en: 'Providing appropriate accounting solutions for this business field.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b98422eb0513a88ae467_service_icon_07.svg',
  },
  {
    id: 'multilingual-support',
    title: {
      ar: 'الدعم الفني متعدد اللغات',
      en: 'Multilingual technical support',
    },
    description: {
      ar: 'توفير خدمات الدعم الفني بعدة لغات مختلفة.',
      en: 'Providing technical support services in several languages.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b9909a9a3ac57aa313cb_service_icon_08.svg',
  },
  {
    id: 'maintenance',
    title: {
      ar: 'الصيانة الدورية والطارئة',
      en: 'Routine & emergency maintenance',
    },
    description: {
      ar: 'تقديم خدمات الصيانة الدورية والطارئة.',
      en: 'Providing periodic and emergency maintenance services.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b9995fa5ca58eb4b1a50_service_icon_09.svg',
  },
  {
    id: 'refurbishment',
    title: {
      ar: 'تجديد الأجهزة',
      en: 'Machine refurbishment',
    },
    description: {
      ar: 'تجديد الأجهزة.',
      en: 'Refurbishing and overhauling machines.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7b9a3253d781db172c712_service_icon_10.svg',
  },
];
