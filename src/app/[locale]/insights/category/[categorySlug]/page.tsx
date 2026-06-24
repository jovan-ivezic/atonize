import { Link } from '../../../../../i18n/routing';
import Navbar from '../../../../../components/Navbar';
import Footer from '../../../../../components/Footer';
import { getAllCategorySlugs, getPostsByCategorySlug } from '../../../../../lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Insights - Jovan Ivezić',
  description: 'Articles about front-end development, React, Next.js, and clean code.',
};

export async function generateStaticParams() {
  // Ovo omogućava SSG za kategorije (generiše rute za sve dostupne slugove)
  const locales = ['en', 'sr'];
  const params: { locale: string; categorySlug: string }[] = [];
  
  for (const locale of locales) {
    const slugs = getAllCategorySlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, categorySlug: slug });
    }
  }
  
  return params;
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string, categorySlug: string }> }) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);
  
  const posts = getPostsByCategorySlug(categorySlug, locale);
  const t = await getTranslations('Insights');

  const validEmptySlugs = [
    t('filters.engineering_slug'),
    t('filters.product_slug'),
    t('filters.design_slug')
  ];

  // Strictly validate that the categorySlug is either a known empty category for THIS locale,
  // or a category that actually has posts in THIS locale.
  // If a user types an English slug in a Serbian URL, it will 404 here.
  const isValidEmptySlug = validEmptySlugs.includes(categorySlug);
  const hasPosts = posts.length > 0;

  if (!isValidEmptySlug && !hasPosts) {
    notFound();
  }
  
  // Izvlačimo originalno ime kategorije iz prvog posta za prikaz naslova,
  // a ako nema postova, mapiramo je iz translation fajla
  let categoryName = '';
  if (hasPosts) {
    categoryName = posts[0].category;
  } else {
    if (categorySlug === t('filters.engineering_slug')) categoryName = t('filters.engineering');
    else if (categorySlug === t('filters.product_slug')) categoryName = t('filters.product');
    else if (categorySlug === t('filters.design_slug')) categoryName = t('filters.design');
    else categoryName = categorySlug;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Link za povratak */}
        <Link href="/insights" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-8 transition-colors">
           &larr; {t('title')}
        </Link>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">{t('title')}: {categoryName}</h1>
        <p className="text-gray-600 mb-12 max-w-2xl">
          {t('description')}
        </p>

        {/* Filter meni za brzu navigaciju između kategorija */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <div className="flex gap-6 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide text-sm font-medium">
            <Link href="/insights" className="text-gray-400 hover:text-gray-900 pb-4 -mb-[18px] whitespace-nowrap transition-colors">{t('filters.latest')}</Link>
            
            {/* Dinamički izlistavamo sve kategorije iz i18n */}
            <Link href={{ pathname: '/insights/category/[categorySlug]', params: { categorySlug: t('filters.engineering_slug') } }} className={`pb-4 -mb-[18px] whitespace-nowrap transition-colors ${categorySlug === t('filters.engineering_slug') ? 'text-gray-900 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-900'}`}>
              {t('filters.engineering')}
            </Link>
            <Link href={{ pathname: '/insights/category/[categorySlug]', params: { categorySlug: t('filters.product_slug') } }} className={`pb-4 -mb-[18px] whitespace-nowrap transition-colors ${categorySlug === t('filters.product_slug') ? 'text-gray-900 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-900'}`}>
              {t('filters.product')}
            </Link>
            <Link href={{ pathname: '/insights/category/[categorySlug]', params: { categorySlug: t('filters.design_slug') } }} className={`pb-4 -mb-[18px] whitespace-nowrap transition-colors ${categorySlug === t('filters.design_slug') ? 'text-gray-900 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-gray-900'}`}>
              {t('filters.design')}
            </Link>
          </div>
        </div>

        {/* Grid of Posts */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const colors = ['bg-[#facc15]', 'bg-[#b4dcdc]', 'bg-[#f05a41]', 'bg-[#818cf8]'];
              const bgColor = colors[index % colors.length];
              
              return (
                <Link key={post.slug} href={{ pathname: '/insights/[slug]', params: { slug: post.slug } }} className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
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
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-lg text-center">
            <span className="text-6xl mb-4">🚀</span>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">{t('coming_soon')}</h3>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
