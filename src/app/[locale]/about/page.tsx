import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import FounderBio from '../../../components/FounderBio';
import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="pt-24 bg-white min-h-screen">
        <FounderBio />
      </main>
      <Footer />
    </>
  );
}
