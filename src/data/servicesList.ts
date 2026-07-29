import type { LocalizedText } from '@/data/features';

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  /** lucide-react icon name, mapped to a component where this is rendered */
  icon: 'ClipboardList' | 'Ruler' | 'HardHat' | 'GraduationCap' | 'Calculator' | 'Headphones' | 'Wrench' | 'RefreshCcw';
}

export const servicesList: ServiceItem[] = [
  {
    id: 'engineering-consultation',
    title: {
      ar: 'الاستشارات الهندسية',
      en: 'Engineering consultation',
    },
    description: {
      ar: 'جلسة استشارية متخصصة تُحدد حجم الماكينة الأنسب لموقعك ومتطلبات التأسيس الأرضي الملائمة قبل أي خطوة تنفيذية.',
      en: 'A dedicated consultation session to determine the right machine size for your site and the civil foundation requirements before any execution step.',
    },
    icon: 'ClipboardList',
  },
  {
    id: 'site-blueprint-design',
    title: {
      ar: 'تصميم المخططات الهندسية للموقع',
      en: 'Site blueprint design',
    },
    description: {
      ar: 'إعداد المخططات الهندسية الكاملة للموقع بما يتوافق مع المعايير التقنية لكل موديل ويضمن أفضل تدفق للمركبات.',
      en: 'Full engineering site plans prepared to match each model’s technical standards and ensure the smoothest possible vehicle flow.',
    },
    icon: 'Ruler',
  },
  {
    id: 'installation-supervision',
    title: {
      ar: 'الإشراف على التركيب',
      en: 'Installation supervision',
    },
    description: {
      ar: 'فريق متخصص يتولى الإشراف الكامل على أعمال التأسيس والتركيب حتى لحظة التشغيل الفعلي للماكينة.',
      en: 'A specialized team oversees the full foundation and installation work through to actual commissioning.',
    },
    icon: 'HardHat',
  },
  {
    id: 'staff-training',
    title: {
      ar: 'تدريب الكوادر التشغيلية',
      en: 'Staff training',
    },
    description: {
      ar: 'برنامج تدريبي ميداني شامل يغطي التشغيل اليومي والصيانة الأساسية والتعامل مع أي طارئ لطاقم موقعك.',
      en: 'A comprehensive field training program covering daily operation, basic maintenance, and emergency handling for your on-site team.',
    },
    icon: 'GraduationCap',
  },
  {
    id: 'accounting-solutions',
    title: {
      ar: 'حلول محاسبية ونقاط بيع',
      en: 'Accounting & POS solutions',
    },
    description: {
      ar: 'ربط ماكينتك بأنظمة نقاط البيع وبوابات الدفع الذكية وبرامج المحاسبة لمتابعة الإيرادات والفواتير أولاً بأول.',
      en: 'Connect your machine to POS devices, smart payment gateways, and accounting software to track revenue and invoices as they happen.',
    },
    icon: 'Calculator',
  },
  {
    id: 'multilingual-support',
    title: {
      ar: 'دعم فني متعدد اللغات',
      en: 'Multilingual technical support',
    },
    description: {
      ar: 'فريق دعم فني يتحدث العربية والإنجليزية والفلبينية والأردية، مع إمكانية الدعم المباشر عبر تقنية الواقع المعزز.',
      en: 'A technical support team covering Arabic, English, Filipino, and Urdu, with live augmented-reality assistance available.',
    },
    icon: 'Headphones',
  },
  {
    id: 'preventive-emergency-maintenance',
    title: {
      ar: 'الصيانة الوقائية والطارئة',
      en: 'Preventive & emergency maintenance',
    },
    description: {
      ar: 'زيارات صيانة وقائية مُجدوَلة مسبقاً إلى جانب استجابة طارئة سريعة، لإبقاء ماكينتك تعمل دون توقف غير متوقع.',
      en: 'Pre-scheduled preventive visits alongside rapid emergency response, keeping your machine running without unplanned downtime.',
    },
    icon: 'Wrench',
  },
  {
    id: 'refurbishment',
    title: {
      ar: 'تجديد وإعادة تأهيل الماكينات',
      en: 'Machine refurbishment',
    },
    description: {
      ar: 'إعادة تأهيل الماكينات القائمة بقطع غيار أصلية وتحديث الأنظمة الذكية لإطالة عمرها التشغيلي وتحسين أدائها.',
      en: 'Refurbishing existing machines with genuine parts and updated smart systems to extend service life and improve performance.',
    },
    icon: 'RefreshCcw',
  },
];
