import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  // @ts-ignore
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale; // fallback to default
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error);
    notFound();
  }
});
