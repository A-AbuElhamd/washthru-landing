export interface NavItem {
  labelKey: string;
  path: string;
}

export interface NavDropdownItem extends NavItem {
  external?: boolean;
}

export const PRIMARY_NAV: NavItem[] = [
  { labelKey: 'nav.whoWeAre', path: '/who-we-are' },
  { labelKey: 'nav.ourProducts', path: '/our-products' },
  { labelKey: 'nav.services', path: '/services' },
  { labelKey: 'nav.washCloud', path: '/wash-cloud' },
  { labelKey: 'nav.afterSale', path: '/after-sale' },
  { labelKey: 'nav.contactUs', path: '/contact-us' },
];

export const MORE_NAV: NavDropdownItem[] = [
  { labelKey: 'nav.knowledgeLibrary', path: '/knowledge-library' },
  { labelKey: 'nav.blueprints', path: '/blueprints' },
  { labelKey: 'nav.blog', path: '/blog' },
  { labelKey: 'nav.agentLogin', path: 'https://erp.washthru.com/#/login', external: true },
];

export const FOOTER_NAV: NavItem[] = [
  { labelKey: 'nav.whoWeAre', path: '/who-we-are' },
  { labelKey: 'nav.ourProducts', path: '/our-products' },
  { labelKey: 'nav.services', path: '/services' },
  { labelKey: 'nav.contactUs', path: '/contact-us' },
];
