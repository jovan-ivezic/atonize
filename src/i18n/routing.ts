import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'sr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/insights': {
      en: '/insights',
      sr: '/clanci'
    },
    '/insights/[slug]': {
      en: '/insights/[slug]',
      sr: '/clanci/[slug]'
    },
    '/insights/category/[categorySlug]': {
      en: '/insights/category/[categorySlug]',
      sr: '/clanci/kategorija/[categorySlug]'
    },
    '/portfolio': {
      en: '/portfolio',
      sr: '/projekti'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
