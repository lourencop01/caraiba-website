import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const i18n = {
  locales: ['en', 'pt'],
  defaultLocale: 'en'
};

export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  pathnames: {
    '/': '/',
    '/maintenance': '/maintenance',
    '/shop': '/shop',
    '/collections': '/collections',
    '/about': '/about',
    '/contact': {
      en: '/contact',
      pt: '/contacto'
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      pt: '/politica-privacidade'
    },
    '/cookie-policy': {
      en: '/cookie-policy',
      pt: '/politica-cookies'
    },
    '/terms-conditions': {
      en: '/terms-conditions',
      pt: '/termos-condicoes'
    },
    '/impressum': {
      en: '/impressum',
      pt: '/aviso-legal'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
