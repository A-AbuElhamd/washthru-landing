import type { LocalizedText } from '@/data/features';

export interface Testimonial {
  id: string;
  name: string;
  quote: LocalizedText;
  /** Real reviewer badge — the Google-review "G" icon for every reviewer except WASHUP SA, which uses its own logo. */
  iconUrl: string;
}

const GOOGLE_REVIEW_ICON =
  'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63d54132d353ff4289a59508_google-review-icon.svg';
const WASHUP_SA_ICON =
  'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63d5411e684108b47ebf78df_washup-sa-icon.svg';

/** Real 5-star rating graphic, shared by every card. */
export const FIVE_STARS_ICON =
  'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63d53de90f220437f1886377_5-stars-icon.svg';

/**
 * Real client reviews, migrated verbatim from the production site's
 * homepage testimonial slider (owner-authorized — this project is the
 * planned replacement for that site).
 */
export const testimonials: Testimonial[] = [
  {
    id: 'nasser-alyafei',
    name: 'Nasser alyafei',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'استقبال ممتاز وراقي للعملاء وضمان لما بعد البيع ومقارنة بالمستورد أسعارهم أفضل بكثير',
      en: 'Excellent, high-quality customer reception with an after-sale guarantee, and their prices compare much better than imported alternatives.',
    },
  },
  {
    id: 'aymen-alnajar',
    name: 'Aymen Alnajar',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'بالنسبة لجهاز الغسيل سرعة وجودة وحماية لطلاء السيارات من الخدوش - بالنسبة لخدمات مابعد البيع شركة جداً متعاونين بالنسبة للصيانة وسرعة الخدمة وحتى أسعار القطع جداً مناسبة.',
      en: 'The wash machine itself is fast, high quality, and protects car paint from scratches. On after-sale service, the company is very cooperative — fast maintenance response, and even the spare-parts prices are very reasonable.',
    },
  },
  {
    id: 'saleh-alzahrani',
    name: 'صالح الزهراني',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'الشركة بصراحة من خلال تعاملي معاهم بصراحة شركة طيبة ودقيقة جدًا في عملها ونظامها وأهنيكم ع التيم الجميل رغم أن في البداية كان في شوية اختلافات بيننا الا الصدق والله انكم وافيين وشهادتي فيكم مجروحة وفي م. حمود بالذات 🤍',
      en: "Honestly, from my dealings with them, this is a good company, very precise in its work and systems — congratulations to the great team. Even though we had a few disagreements at the start, I can honestly say you were reliable, and I mean that especially about Eng. Hammoud. 🤍",
    },
  },
  {
    id: 'ahmad-omar',
    name: 'ahmad omar',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'شركة متمكنة في الإنتاج و التصنيع ولديها فريق عامل متكامل ممتاز و جودة عالية .',
      en: 'A capable company in production and manufacturing, with an excellent, well-rounded team and high quality.',
    },
  },
  {
    id: 'ali-m',
    name: 'Ali M',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'شكراً لكم لاختياركم الموفق لنوعية الأجهزة وجودتها وكذلك لخدماتكم مابعد البيع من صيانة وسرعة تجاوب معنا',
      en: 'Thank you for your well-chosen equipment and its quality, as well as your after-sale services — maintenance and fast responsiveness with us.',
    },
  },
  {
    id: 'abdullah-alqahtani',
    name: 'عبدالله القحطاني',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'تعاملهم أكثر من رائع، وأسعارهم معقولة مقارنة بالمكائن الأوروبية، وخدمات ما بعد البيع أكثر ما يميزهم، إن شاء الله لي تعامل معهم قادم',
      en: 'Their service is more than wonderful, and their prices are reasonable compared to European machines. After-sale service is what sets them apart most — I plan to work with them again.',
    },
  },
  {
    id: 'abdullah-alamoudi',
    name: 'Abdullah Al Amoudi',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'ما شاء الله ، خدمات ما قبل و بعد البيع ترفع الرأس / مستخدم جهازهم منذ أكثر من 5 سنوات لا خدوش و غسيل متقن و سريع بأعلى جودة',
      en: "Mashallah, both pre- and after-sale service are top-notch. I've used their machine for over 5 years — no scratches, precise and fast washing, top quality.",
    },
  },
  {
    id: 'solaiman-azzan',
    name: 'Solaiman Azzan',
    iconUrl: GOOGLE_REVIEW_ICON,
    quote: {
      ar: 'جودة في التصنيع و خدمة ممتازة 👍',
      en: 'Quality manufacturing and excellent service 👍',
    },
  },
  {
    id: 'washup-sa',
    name: 'WASHUP SA',
    iconUrl: WASHUP_SA_ICON,
    quote: {
      ar: 'ما شاء الله نتعلم منكم دقة وأداء وعمل احترافي وخدمة العملاء وخدمة مابعد البيع .. الله يوفقك',
      en: 'Mashallah, we learn from you precision, performance, and professional work, along with customer service and after-sale service. May God grant you success.',
    },
  },
];
