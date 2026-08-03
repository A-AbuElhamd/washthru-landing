import type { LocalizedText } from '@/data/features';

export interface ServiceDetailItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** Real service icon, sourced from the production site's CDN. */
  iconUrl: string;
  /** Real per-slide background photo (`.service_top_wrap._N`), sourced from the production site's CDN. */
  bgUrl: string;
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b3b872f4f4e21cbee65c_Providing%20consultations%20in%20the%20field%20of%20car%20washing.webp',
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b3d6218b0381ae172047_Drawing%20foundational%20plans%20for%20the%20site.webp',
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b39e97b5e766191db53a_Sites%20Design.webp',
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
    bgUrl:
      "https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b3eed35071d3accc7993_Supervising%20the%20establishments%20of%20the%20agency's%20site.webp",
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b446e74bbafde97a679a_Equipment%20installation.webp',
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
    bgUrl:
      "https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b484d776b8b38676d906_Training%20the%20partners'%20staff%20on%20how%20to%20operate%20the%20equipment.webp",
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b40aedf99a40152012e7_Providing%20accounting%20solutions%20commensurate%20with%20this%20activity.webp',
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b4246ffae03c610cd714_Providing%20technical%20support%20services%20in%20several%20different%20languages.webp',
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b49b9e820c48c80e54b0_Providing%20periodic%20and%20emergency%20maintenance%20services.webp',
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
    bgUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c6b4af628abd62fec9e98b_Equipment%20renewal.webp',
  },
];
