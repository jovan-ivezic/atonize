import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Portfolio from '../../../components/Portfolio';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('portfolio_title'),
    description: t('portfolio_description'),
    alternates: {
      canonical: locale === 'sr' ? '/sr/projekti' : '/en/portfolio',
      languages: {
        en: '/en/portfolio',
        sr: '/sr/projekti',
      },
    },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Portfolio variant="full" />
      </main>
      <Footer />
    </>
  );
}
