export const SITE = {
  name: 'WashThru',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  defaultOgImage: '/images/og/og-default.svg',
  twitterHandle: '@washthru',
  themeColor: {
    light: '#0C2ED8',
    dark: '#0B1220',
  },
  social: {
    instagram: 'https://www.instagram.com/washthru/',
    twitter: 'https://x.com/Wash_Thru',
    facebook: 'https://www.facebook.com/washthru/',
  },
  contact: {
    phone: '920012804',
    whatsapp: '+966553573654',
    email: 'info@washthru.com',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
} as const;
