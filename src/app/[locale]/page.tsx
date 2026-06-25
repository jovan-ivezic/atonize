import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Portfolio from '../../components/Portfolio';
import Services from '../../components/Services';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO' });

  return {
    title: t('home_title'),
    description: t('home_description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'sr': '/sr',
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
