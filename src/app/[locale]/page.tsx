import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Portfolio from '../../components/Portfolio';
import Services from '../../components/Services';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { setRequestLocale } from 'next-intl/server';

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
