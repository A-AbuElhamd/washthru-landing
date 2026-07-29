import type { LocalizedText } from '@/data/features';

export interface PartnerBadge {
  id: string;
  src: string;
}

/**
 * "شركاء النجاح" (Success Partners) identity badge wall — the real
 * installer/partner badges from the production homepage. CDN asset folder
 * `63aad373fdf77ff7df65db58`, files `partner_1.png` through `partner_15.png`.
 */
export const partnerBadges: PartnerBadge[] = [
  {
    id: 'partner-1',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37403ca698693de08dd9_partner_1.png',
  },
  {
    id: 'partner-2',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3740b966f581199bedfc_partner_2.png',
  },
  {
    id: 'partner-3',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741dd43e2d8536b7f3a_partner_3.png',
  },
  {
    id: 'partner-4',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741461adb15f2d7b606_partner_4.png',
  },
  {
    id: 'partner-5',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741461adb1cfed7b607_partner_5.png',
  },
  {
    id: 'partner-6',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37413ca698d3b3e08dda_partner_6.png',
  },
  {
    id: 'partner-7',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741bd9ddf4de6356e72_partner_7.png',
  },
  {
    id: 'partner-8',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad374055e11a1e89541384_partner_8.png',
  },
  {
    id: 'partner-9',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37419a624b3c3db5dbc6_partner_9.png',
  },
  {
    id: 'partner-10',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37412b9e634394c684b0_partner_10.png',
  },
  {
    id: 'partner-11',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37407013f8564d6d71bf_partner_11.png',
  },
  {
    id: 'partner-12',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad374132bfdb199021137d_partner_12.png',
  },
  {
    id: 'partner-13',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad37412b9e63da14c684b1_partner_13.png',
  },
  {
    id: 'partner-14',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741382b946a6a69d3f8_partner_14.png',
  },
  {
    id: 'partner-15',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/63ad3741dd43e22b376b7f3b_partner_15.png',
  },
];

export interface ClientLogo {
  id: string;
  src: string;
}

/**
 * Real installation/client logo strip (`.marquee-track` in the production
 * homepage) — a second, separate row of real client logos distinct from the
 * static 15-badge "شركاء النجاح" wall above. On the real site it auto-scrolls
 * infinitely (CSS `marquee-horizontal` keyframe); here it reuses the shared
 * `Carousel` component's autoplay mode instead of hand-rolled keyframes.
 * CDN asset folder `63ad5763910c705357b1c574`.
 */
export const clientLogos: ClientLogo[] = [
  {
    id: 'client-1',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d9140666c49500c7951af5_7.png',
  },
  {
    id: 'client-2',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de37dc1693d1e898e83167_Client%2003.svg',
  },
  {
    id: 'client-3',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de37e347ab5805298e4570_Client%2004.svg',
  },
  {
    id: 'client-4',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de37e96af00b0d263969ed_Client%2005.svg',
  },
  {
    id: 'client-5',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d913fc3585577e90325a6f_6.png',
  },
  {
    id: 'client-6',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d913f3ba6e8704468d4658_5.png',
  },
  {
    id: 'client-7',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de37fa1ca2f52b11090661_Client%2008.svg',
  },
  {
    id: 'client-8',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d913d464c36ce4b5fa39f0_4.png',
  },
  {
    id: 'client-9',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de3803d2a0ebc16fd6da29_Client%2010.svg',
  },
  {
    id: 'client-10',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de380c2ae9b033e8be2fd7_Client%2011.svg',
  },
  {
    id: 'client-11',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de381147ab58060e8e4abc_Client%2012.svg',
  },
  {
    id: 'client-12',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/63de3817371ddd605905275f_Client%2013.svg',
  },
  {
    id: 'client-13',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d916856e25d06183553675_Untitled%20design%20(5).png',
  },
  {
    id: 'client-14',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d916ae15e660c75b45d982_Untitled%20design%20(6).png',
  },
  {
    id: 'client-15',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/68d9175eaf2899b252937159_Untitled%20design%20(7).png',
  },
  {
    id: 'client-16',
    src: 'https://cdn.prod.website-files.com/63ad5763910c705357b1c574/69d261a66be64ade3866938c_al%20raqm%20al%20mumayaz%20auto%20car%20wash.png',
  },
];

export interface PartnerContact {
  id: string;
  /** `tel:` deep link to the real partner's phone number. */
  href: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
}

/**
 * "الموزعون داخل المملكة" (Distributors within the Kingdom). The production
 * Arabic page links the first logo to `tel:+966564357506`; the second logo
 * (same company, "اوتو باث" / Auto Bath) has a dead `href="#"` on the Arabic
 * page, but the English (`en.html`) version of the same section links it to
 * `tel:+966573535207` — that real number is used here.
 */
export const domesticDistributors: PartnerContact[] = [
  {
    id: 'afaq-albunyah',
    href: 'tel:+966564357506',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/692591787165fc0cd6442fc9_%D8%A7%D9%81%D8%A7%D9%82%20%D8%A7%D9%84%D8%A8%D9%86%D9%8A%D8%A9%20(1).png',
    width: 179,
    height: 120,
    alt: {
      ar: 'شعار آفاق البنية، أحد موزعي واش ثرو داخل المملكة',
      en: 'Afaq Al-Bunyah logo, a WashThru distributor in Saudi Arabia',
    },
  },
  {
    id: 'auto-bath',
    href: 'tel:+966573535207',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/692591d9308aa8d38e364bdf_%D8%A7%D9%88%D8%AA%D9%88%20%D8%A8%D8%A7%D8%AB.png',
    width: 179,
    height: 120,
    alt: {
      ar: 'شعار أوتو باث، أحد موزعي واش ثرو داخل المملكة',
      en: 'Auto Bath logo, a WashThru distributor in Saudi Arabia',
    },
  },
];

/** "الوكلاء خارج المملكة" (Agents outside the Kingdom) — Alnajm, Libya. */
export const internationalAgents: PartnerContact[] = [
  {
    id: 'alnajm-libya',
    href: 'tel:+218924448001',
    src: 'https://cdn.prod.website-files.com/63aad373fdf77ff7df65db58/69259258f77340ecaa3086f4_%D8%A7%D9%84%D9%86%D8%AC%D9%85.png',
    width: 179,
    height: 120,
    alt: {
      ar: 'بطاقة تواصل مع النجم، وكيل واش ثرو في ليبيا، هاتف 4448001 92 218+',
      en: "Contact card for Alnajm, WashThru's agent in Libya — phone +218 92-4448001",
    },
  },
];
