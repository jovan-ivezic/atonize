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
      sr: '/uvidi'
    },
    '/insights/[slug]': {
      en: '/insights/[slug]',
      sr: '/uvidi/[slug]'
    },
    '/insights/category/[categorySlug]': {
      en: '/insights/category/[categorySlug]',
      sr: '/uvidi/kategorija/[categorySlug]'
    },
    '/about': {
      en: '/about',
      sr: '/o-nama'
    }
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
