import { Link } from '../../../i18n/routing';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getAllPostsMeta } from '../../../lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const metadata = {
  title: 'Insights - Jovan Ivezić',
  description: 'Articles about front-end development, React, Next.js, and clean code.',
};

export default async function Insights({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPostsMeta(locale);
  const t = await getTranslations('Insights');

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">{t('title')}</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          {t('description')}
        </p>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <div className="flex gap-6 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide text-sm font-medium">
            <Link href="/insights" className="text-gray-900 border-b-2 border-yellow-400 pb-4 -mb-[18px] whitespace-nowrap">{t('filters.latest')}</Link>
            <Link href="/insights/category/engineering" className="text-gray-400 hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap transition-colors">{t('filters.engineering')}</Link>
            <Link href="/insights/category/product" className="text-gray-400 hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap transition-colors">{t('filters.product')}</Link>
            <Link href="/insights/category/design" className="text-gray-400 hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap transition-colors">{t('filters.design')}</Link>
          </div>
          
          <div className="relative mt-4 md:mt-0 w-full md:w-auto">
            <input 
              type="text" 
              placeholder={t('search')}
              className="pl-4 pr-10 py-2 border border-gray-200 rounded-sm w-full md:w-64 focus:outline-none focus:border-gray-300 bg-[#fbfbfb]"
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-gray-100 border-l border-gray-200 text-gray-500 rounded-r-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid of Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? posts.map((post, index) => {
            // Ciklično menjamo boje pozadine za lepši dizajn
            const colors = ['bg-[#facc15]', 'bg-[#b4dcdc]', 'bg-[#f05a41]', 'bg-[#818cf8]'];
            const bgColor = colors[index % colors.length];
            
            return (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`${bgColor} h-48 flex items-center justify-center p-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  <span className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">{post.icon || '📝'}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-gray-400 text-sm mt-4">
                    <span>{post.category}</span>
                    <span>{new Date(post.date).toLocaleDateString(locale === 'sr' ? 'sr-RS' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            );
          }) : (
            <Link href={`/insights/coming-soon`} className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-[#facc15] h-48 flex items-center justify-center p-8">
                <span className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">⏳</span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                  {t('coming_soon')}
                </h3>
                <p className="text-gray-400 text-sm mt-4">{t('announcement')}</p>
              </div>
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
