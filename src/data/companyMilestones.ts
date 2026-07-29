import type { LocalizedText } from '@/data/features';

export interface CompanyMilestone {
  id: string;
  year: string;
  description: LocalizedText;
}

/** Company timeline paraphrased from the source site's "who we are" page. */
export const companyMilestones: CompanyMilestone[] = [
  {
    id: '2010',
    year: '2010',
    description: {
      ar: 'مرحلة البحث والتطوير.',
      en: 'Research and Development stage.',
    },
  },
  {
    id: '2016',
    year: '2016',
    description: {
      ar: 'تأسيس خط إنتاج أجهزة غسيل السيارات الأوتوماتيكية الأول في المملكة والوطن العربي.',
      en: 'Establishing the first production line for automatic car wash machines in the Kingdom of Saudi Arabia and the Arab world.',
    },
  },
  {
    id: '2019',
    year: '2019',
    description: {
      ar: 'تأسيس قسم الذكاء الاصطناعي وإنترنت الأشياء، وتأسيس قسم التدريب الشامل.',
      en: 'Establishing the AI and IoT division, and establishing the Comprehensive Training Department.',
    },
  },
  {
    id: '2020',
    year: '2020',
    description: {
      ar: 'تأسيس المنظومة الذكية للصيانة عن بعد، وتأسيس منظومة الربط الذكي.',
      en: 'Developing the Smart Remote Maintenance System, and developing the Smart Connection System.',
    },
  },
  {
    id: '2021',
    year: '2021',
    description: {
      ar: 'تطوير أول جهاز غسيل سيارات أوتوماتيكي يعمل بتقنيات إنترنت الأشياء والذكاء الاصطناعي، وربط منظومة المحاسبة ونقاط البيع المخصصة لخدمات السيارات (كسور).',
      en: 'Developing the first automatic car wash machine operated by AI and IoT technologies, and connecting the Accounting and POS System for Auto Services (Kosoor).',
    },
  },
  {
    id: '2022',
    year: '2022',
    description: {
      ar: 'تأسيس قسم تجديد وتطوير الأجهزة.',
      en: 'Establishing the Machine Overhaul and Development Department.',
    },
  },
  {
    id: '2023',
    year: '2023',
    description: {
      ar: 'تطوير تطبيق Wash Thru app.',
      en: 'Developing the Wash Thru app.',
    },
  },
];
