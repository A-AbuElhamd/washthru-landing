import type { LocalizedText } from '@/data/features';

export interface TeamMember {
  id: string;
  name: string;
  title: LocalizedText;
  photoUrl: string;
}

/**
 * Real leadership/management roster from the production "who we are" page's
 * team slider (`.team_slider_wrap`). One real slide (م. خليل بانافع) carries
 * the Webflow `hide` class in the source markup and is excluded here to
 * match what's actually visible.
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'saeed-alsaiary',
    name: 'أ. سعيد الصيعري',
    title: { ar: 'رئيس مجلس الإدارة', en: 'Chairman of the Board' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c7f526bebfb2cfbde4f51e_%D8%A3.%20%D8%B3%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D8%B5%D9%8A%D8%B9%D8%B1%D9%8A.png',
  },
  {
    id: 'abdulsalam-alsaiary',
    name: 'م. عبدالسلام الصيعري',
    title: { ar: 'مستشار إداري - عضو مجلس إدارة', en: 'Administrative Advisor - Board Member' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/6720b1040119fcdbdd39f190_eng.%20Abdulsalam%20Alsaiary.avif',
  },
  {
    id: 'ahmed-alsaiary',
    name: 'أ. أحمد الصيعري',
    title: { ar: 'المدير التنفيذي - عضو مجلس إدارة', en: 'Executive Director - Board Member' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64c0fb108519be7a7b374cad_1690364242023%201.png',
  },
  {
    id: 'hammoud-alsuhaibi',
    name: 'م. حمود الصهيبي',
    title: { ar: 'مدير إدارة التطوير - عضو مجلس إدارة', en: 'Development Director - Board Member' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/64c0fb194f9a861231065825_1690364242038%201.png',
  },
  {
    id: 'manar-qasem',
    name: 'أ. منار قاسم',
    title: { ar: 'المدير المالي - عضو مجلس إدارة', en: 'Financial Director - Board Member' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c80eadf3898fbea1cf9ed9_%D8%A3%E2%80%8C.%D9%85%D9%86%D8%A7%D8%B1%20%D9%82%D8%A7%D8%B3%D9%85.png',
  },
  {
    id: 'mohammed-hanash',
    name: 'م. محمد حنش',
    title: { ar: 'مدير إدارة العمليات الفنية', en: 'Technical Operations Director' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ce6558736e688fb7c2068e_%D9%85.%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%AD%D9%86%D8%B4.png',
  },
  {
    id: 'abdullah-baflah',
    name: 'أ. عبدالله بفلح',
    title: { ar: 'مدير قسم الموارد البشرية', en: 'HR Department Manager' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c80f4288e5992d2baafbb3_%D8%A3.%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D9%87%20%D8%A8%D9%81%D9%84%D8%AD.png',
  },
  {
    id: 'rayan-alrimi',
    name: 'م. ريان الريمي',
    title: { ar: 'مدير قسم التدريب', en: 'Training Department Manager' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c80f62246ea279a75ea13d_%D9%85.%D8%B1%D9%8A%D8%A7%D9%86%20%D8%A7%D9%84%D8%B1%D9%8A%D9%85%D9%8A.png',
  },
  {
    id: 'abdulaziz-alabdullah',
    name: 'أ. عبدالعزيز العبدالله',
    title: { ar: 'مدير الشؤون الادارية', en: 'Administrative Affairs Manager' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c80f8e7dc56beff959b168_%D8%A3.%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2%20%D8%A2%D9%84%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D9%87.png',
  },
  {
    id: 'mohammed-azzan',
    name: 'أ. محمد عزان',
    title: { ar: 'مدير قسم المحاسبة', en: 'Accounting Department Manager' },
    photoUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63c80fab6d7838691bf84d39_%D8%A3.%D9%85%D8%AD%D9%85%D8%AF%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%84%D9%87.png',
  },
];
