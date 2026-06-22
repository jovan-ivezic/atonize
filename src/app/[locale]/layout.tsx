import './globals.css';
import { Providers } from '../../components/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Jovan Ivezić | Front-end Developer',
  description: 'Portfolio of Jovan Ivezić, a passionate front-end developer focused on React and modern web technologies.',
};

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
