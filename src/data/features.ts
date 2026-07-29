export interface LocalizedText {
  ar: string;
  en: string;
}

export interface Feature {
  id: string;
  description: LocalizedText;
  iconUrl: string;
  /** Real per-panel background photo from the source site's sticky-scroll feature gallery. */
  backgroundImageUrl: string;
}

/**
 * Real "أهم ما يميزنا" (What sets us apart) sticky-scroll gallery — 5 panels,
 * each pinned in turn as the user scrolls through a tall container. Content
 * migrated verbatim (owner-authorized) from the production site's
 * `.features_section` (`feature_wrap_1`..`_5`).
 */
export const features: Feature[] = [
  {
    id: 'microfiber-brushes',
    description: {
      ar: 'استخدام فرش مايكروفوم فائقة النعومة، وشديدة الالتقاط للأوساخ، ولا يلتصق بها أي شوائب أو أتربة، ويتم غسلها بشكل آلي، لضمان أداء آمن على طلاء المركبة.',
      en: 'Using an ultra-soft layer of Micro Foam that effectively captures dirt without sticking to any impurities or dust. It is washed automatically for safe performance on the vehicle’s paint.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7ba8e8a41367fab425f33_Features-icon-01.svg',
    backgroundImageUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac46ccc73ddf4785143e51_Features-img-1.webp',
  },
  {
    id: 'weather-resistant',
    description: {
      ar: 'صُممت أجهزتنا لتقاوم العوامل الطبيعية في منطقتنا الجغرافية، وذلك لكي تلائم النسب العالية من الأتربة والرطوبة والملوحة، وبذلك نضمن أفضل جودة وأداء ممكن في الظروف البيئية المحلية.',
      en: 'Our machines are designed to resist natural factors in our region, including high levels of dust, salinity, and humidity, ensuring the best possible quality and performance under local environmental conditions.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7ba79253d78989c72ce9c_Features-icon-02.svg',
    backgroundImageUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac46d88a0fbd01bfa5efea_Features-img-2.webp',
  },
  {
    id: 'drying-rate',
    description: {
      ar: 'تصل نسبة تنشيف السيارة حتى 90% في أجهزتنا الحديثة',
      en: 'The drying rate of the car reaches 90% in our modern devices.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7ba6e5f8c8aba8e56db1e_Features-icon-03.svg',
    backgroundImageUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac46d941b0ca7056f385b9_Features-img-3.webp',
  },
  {
    id: 'spare-parts',
    description: {
      ar: 'توفير جميع قطع غيار أجهزتنا، سواءً كانت استهلاكية أو غير استهلاكية، بدون أي فترات انتظار لاستيرادها.',
      en: 'Providing all spare parts, wearable and non-wearable, without waiting periods for importing issues.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7ba5fa175013b4240fa28_Features-icon-04.svg',
    backgroundImageUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac46d8eb51b004bf248e46_Features-img-4.webp',
  },
  {
    id: 'after-sale-service',
    description: {
      ar: 'تقديم أفضل خدمات مابعد البيع لشركائنا، حيث أن كل الفنيين في قسم الصيانة لديهم خبرات في خطوط إنتاج الأجهزة، ولذلك نضمن أفضل خدمة ممكنة في خدمات الصيانة والدعم الفني.',
      en: 'Providing the best after-sale services to our partners. All technicians in the Maintenance Department have experience in the production lines of our machines, so we guarantee the best possible service for maintenance and technical support.',
    },
    iconUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63d7ba51e00e4c75b9816cf0_Features-icon-05.svg',
    backgroundImageUrl:
      'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ac46d89b0396267999b4d9_Features-img-5.webp',
  },
];
