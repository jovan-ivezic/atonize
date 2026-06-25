import './globals.css';
import { Providers } from '../../components/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    metadataBase: new URL('https://www.atonize.com'),
    title: {
      template: `%s | Atonize`,
      default: t('home_title'),
    },
    description: t('home_description'),
    openGraph: {
      type: 'website',
      locale: locale,
      siteName: 'Atonize',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'sr' }];
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  if (locale !== 'en' && locale !== 'sr') {
    notFound();
  }
  
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased text-gray-900 bg-white" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
