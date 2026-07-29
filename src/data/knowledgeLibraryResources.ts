import type { LocalizedText } from '@/data/features';

export interface KnowledgeResource {
  id: string;
  category: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  /** Cover thumbnail per locale, sourced from the live site's CDN. */
  cover: LocalizedText;
  /** Direct PDF download link per locale, sourced from the live site's CDN. */
  pdfUrl: LocalizedText;
}

const CDN = 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58';

/**
 * The document library published on the real site's knowledge-library page —
 * company profile/booklet, per-model technical brochures, a comparison
 * table, and the full catalogue. Covers and PDFs are the live site's own CDN
 * assets; descriptions are drawn directly from the live page's copy (light
 * cleanup only). Only resources that exist in BOTH locales on the live site
 * are listed here, so every card resolves to a real document in either
 * language — a few AR-only or EN-only extras (an RT-v1 brochure, an RCV
 * rental feasibility study, a QR brochure) aren't included since they don't
 * have a matching counterpart in the other language.
 */
export const knowledgeLibraryResources: KnowledgeResource[] = [
  {
    id: 'company-profile',
    category: { ar: 'بروفايل الشركة', en: 'Company profile' },
    title: { ar: 'بروفايل واش ثرو', en: 'WashThru Profile' },
    description: {
      ar: 'يُعد هذا البروفايل مرجعًا موثوقًا يمنح الجهات المهتمّة فهمًا واضحًا عن واش ثرو، ويبرز مكانتها كشركة متخصصة تتمتع بنهج مبتكر وحلول عالية الجودة في سوق خدمات غسيل السيارات.',
      en: 'This profile provides a clear and trusted overview of WashThru, highlighting its innovative approach and high quality car wash solutions.',
    },
    cover: {
      ar: `${CDN}/6936acadac5151c9c134322e_%D8%A8%D8%B1%D9%88%D9%81%D8%A7%D9%8A%D9%84%20%D9%88%D8%A7%D8%B4%20%D8%AB%D8%B1%D9%88.jpg`,
      en: `${CDN}/6950f9264f503be5a7c5673a_WhatsApp%20Image%202025-12-17%20at%2012.34.46%20PM%20(1).jpeg`,
    },
    pdfUrl: {
      ar: `${CDN}/6936ae12554d13b6913ccf9a_%D9%83%D8%AA%D9%8A%D8%A8%20%D9%88%D8%A7%D8%B4%20%D8%AB%D8%B1%D9%88%20copy%20(1).pdf`,
      en: `${CDN}/6950f86244cd7c02453aab4a_wash%20thru%20profile%20E%20copy%20(1).pdf`,
    },
  },
  {
    id: 'company-booklet',
    category: { ar: 'كتيب تعريفي', en: 'Booklet' },
    title: { ar: 'كتيب واش ثرو', en: 'WashThru Booklet' },
    description: {
      ar: 'كتيب يقدم معلومات شاملة عن تقنيات غسيل السيارات المتقدمة، بحيث إنه مرجع ممتاز لحلول تنظيف فعالة وحديثة.',
      en: 'The WashThru booklet highlights advanced car wash technologies, offering a valuable reference for modern cleaning solutions.',
    },
    cover: {
      ar: `${CDN}/6936ae85c5fd409741eadc72_WhatsApp%20Image%202025-12-08%20at%2012.54.21%20PM.jpeg`,
      en: `${CDN}/66e00e7b664e12e909782a20_WT-en.png`,
    },
    pdfUrl: {
      ar: `${CDN}/655f4053944114d1c40b6352_wash%20thru%20%20-%20AR.pdf`,
      en: `${CDN}/655f405393628d41f8c2547b_wash%20thru%20%20-%20EN.pdf`,
    },
  },
  {
    id: 'rs-v4-rollover',
    category: { ar: 'رول أوفر', en: 'Rollover' },
    title: { ar: 'RS-v4 رول أوفر', en: 'RS-v4 Rollover' },
    description: {
      ar: 'جهاز RS-v4 يقدم تنظيفاً عميقاً واحترافياً باستخدام أحدث التقنيات، بحيث إنه الخيار الأكثر تطوراً لتحقيق أفضل النتائج.',
      en: 'Offers deep and professional cleaning with the latest technologies, making it the advanced option for achieving the best results.',
    },
    cover: {
      ar: `${CDN}/6755892ce2de6639fc973d94_RS-ar.jpg`,
      en: `${CDN}/6755884060addd7842442fae_RS-en.jpg`,
    },
    pdfUrl: {
      ar: `${CDN}/69a697b186b32a3418d14224_RS%20final%202026.pdf`,
      en: `${CDN}/69ae71726f6d9c3978c0ab03_RS%20E_compressed.pdf`,
    },
  },
  {
    id: 'rh-v1-rollover',
    category: { ar: 'رول أوفر', en: 'Rollover' },
    title: { ar: 'RH-v1 رول أوفر', en: 'RH-v1 Rollover' },
    description: {
      ar: 'جهاز RH-v1 يقدم حلول تنظيف فعّالة بسعر اقتصادي، مع أداء موثوق يناسب الاستخدامات المتعددة.',
      en: 'The RH-v1 device offers efficient cleaning solutions at an economical price, with reliable performance suitable for various applications.',
    },
    cover: {
      ar: `${CDN}/6755896a2e4ac26bf61a2981_RH-ar.jpg`,
      en: `${CDN}/67603b47b8eaaeb4095127d5_RH-en.jpg`,
    },
    pdfUrl: {
      ar: `${CDN}/67878f54236a2fa561b16bc4_RH-v1-ar.pdf`,
      en: `${CDN}/67878f54fb823e07a78ad946_RH-v1-en.pdf`,
    },
  },
  {
    id: 'ra-v1-rollover',
    category: { ar: 'رول أوفر', en: 'Rollover' },
    title: { ar: 'RA-v1 رول أوفر', en: 'RA-v1 Rollover' },
    description: {
      ar: 'يقدّم RA-v1 حلول تنظيف مبتكرة وفعّالة مع دقة عالية وحماية مثالية لطلاء السيارة، مناسب لجميع أحجام السيارات وأماكن التركيب.',
      en: 'The RA-v1 delivers innovative and efficient cleaning solutions with high precision and optimal protection for vehicle paint, making it suitable for all vehicle sizes and installation locations.',
    },
    cover: {
      ar: `${CDN}/6939532790b7bfcf99cba66e_RA%20cover%201.jpg`,
      en: `${CDN}/694162bc8180f62202cb8e2c_WhatsApp%20Image%202025-12-16%20at%201.29.59%20PM.jpeg`,
    },
    pdfUrl: {
      ar: `${CDN}/693940ea7ffc7d8ab5e60bd2_RA-v1_compressed.pdf`,
      en: `${CDN}/6941655e6ed599c88cf9aec0_RA%20v1%20e_compressed.pdf`,
    },
  },
  {
    id: 'rf-v1-touchless',
    category: { ar: 'بدون لمس', en: 'Touchless' },
    title: { ar: 'RF-v1 بدون لمس', en: 'RF-v1 Touchless' },
    description: {
      ar: 'RF-v1 غسيل أوتوماتيكي بتقنية بدون لمس، يحافظ على طلاء السيارة، بتصميم مدمج بحجم أصغر وسعر منافس، ليكون حلاً اقتصاديًا لفتح مشروع مغسلة سيارات بأقل تكلفة ومناسبًا لمختلف السيارات وأماكن التركيب.',
      en: 'The RF-v1 is a touchless automatic car wash system that protects vehicle paint. Its compact design and competitive price make it an economical solution for starting a car wash business, suitable for various vehicles and installation locations.',
    },
    cover: {
      ar: `${CDN}/69a94654e469901342fc7524_RF%20cover%20(2).png`,
      en: `${CDN}/69ae6d60ce21ddaa9ec885a2_RF%20coverE.png`,
    },
    pdfUrl: {
      ar: `${CDN}/69ae69b8d6cf1cc6fa0475ff_RF%20final_compressed%20(1)_compressed.pdf`,
      en: `${CDN}/69ae6dbd79e2e7498cac9394_RF%20E%20V1%20copy.pdf`,
    },
  },
  {
    id: 'rcv-v1-touchless',
    category: { ar: 'بدون لمس', en: 'Touchless' },
    title: { ar: 'RCV-v1 بدون لمس', en: 'RCV-v1 Touchless' },
    description: {
      ar: 'RCV-v1 غسيل أوتوماتيكي بدقة عالية وبتقنية بدون لمس، يحمي طلاء السيارة، حل اقتصادي منخفض التكلفة ومناسب لجميع السيارات وأماكن التركيب.',
      en: 'The RCV-v1 is a high precision automatic touchless car wash designed to protect vehicle paint, offering a cost effective solution suitable for all vehicle types and installation locations.',
    },
    cover: {
      ar: `${CDN}/69395338a83e5ec2c3a0a21c_RCV%20cover1.jpg`,
      en: `${CDN}/6941612ad06fa9dcdebc7b3b_WhatsApp%20Image%202025-12-16%20at%201.26.53%20PM.jpeg`,
    },
    pdfUrl: {
      ar: `${CDN}/69a95cd47f516c03f36ba96f_RCV%20%201.pdf`,
      en: `${CDN}/69ae6f3d7674ad6ce041158b_RCV%20E%20V1%20copy.pdf`,
    },
  },
  {
    id: 'machines-comparison-table',
    category: { ar: 'مرجع', en: 'Reference' },
    title: { ar: 'جدول مقارنة الأجهزة', en: 'Machines Comparison Table' },
    description: {
      ar: 'كل ما تحتاج معرفته عن أجهزة واش ثرو، مرجعك لاختيار الجهاز المثالي بناءً على البيانات الفنية والمواصفات الدقيقة.',
      en: 'Everything you need to know about WashThru machines — your go-to reference for selecting the perfect system based on technical data and detailed specifications.',
    },
    cover: {
      ar: `${CDN}/6909e6ac1e3d4b26aeef139d__%D8%AC%D8%AF%D9%88%D9%84%20%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A7%D8%AA%20%D8%A7%D9%84%D8%A7%D8%AC%D9%87%D8%B2%D8%A9%20%D8%B9%D8%B1%D8%A8%D9%8A.jpg`,
      en: `${CDN}/68f0f06d8153883eb87127fc__%D9%83%D8%A7%D9%81%D8%B1%20%D9%85%D9%88%D9%82%D8%B9%20%D9%84%D9%84%D9%85%D9%82%D8%A7%D8%B1%D8%A7%D9%86%D8%A7%D8%AA%20%D8%A7%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%204.jpg`,
    },
    pdfUrl: {
      ar: `${CDN}/6a4263a973b228980545fe7f_%D8%AC%D8%AF%D9%88%D9%84%20%D8%A7%D9%84%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A7%D8%AA%20(4).pdf`,
      en: `${CDN}/69ae6e56367517162b87ac8a_%D8%AC%D8%AF%D9%88%D9%84%20%D8%A7%D9%84%D9%85%D9%82%D8%A7%D8%B1%D9%86%D8%A7%D8%AA%20%D8%A7%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A.pdf`,
    },
  },
  {
    id: 'machines-catalogue',
    category: { ar: 'كتالوج', en: 'Catalogue' },
    title: { ar: 'كتالوج أجهزة واش ثرو', en: 'WashThru Machines Catalogue' },
    description: {
      ar: 'كتالوج شامل يقدم التفاصيل التقنية، المواصفات التفصيلية، وخيارات التركيب المتنوعة، ليمنحك تجربة اختيار سهلة لأجهزة الغسيل.',
      en: 'A complete catalogue featuring technical data, detailed specifications, and flexible installation options, making it easier for you to choose the right machine for your business.',
    },
    cover: {
      ar: `${CDN}/6909e04ec0977b798fc2ba7a__%D9%83%D8%A7%D9%81%D8%B1%20%D9%83%D8%AA%D8%A7%D9%88%D8%AC%20%D8%B9%D8%B1%D8%A8%D9%8A.jpg`,
      en: `${CDN}/691311ffb29dd8fc8072b308_Catalogue%201%20(1).png`,
    },
    pdfUrl: {
      ar: `${CDN}/69cd1c0eb2718f98f99c83f9_%D9%83%D8%AA%D8%A7%D9%84%D9%88%D8%AC%20%D9%81%D8%A7%D9%8A%D9%86%D8%A7%D9%84%206%20%D8%A7%D8%AC%D9%87%D8%B2%D8%A9%20copy.pdf`,
      en: `${CDN}/69ae6dfff26fbb953ca0937a_%D9%83%D8%AA%D8%A7%D9%84%D9%88%D8%AC%20%D8%A7%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%20copy.pdf`,
    },
  },
];
