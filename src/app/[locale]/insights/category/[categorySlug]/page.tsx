import { Link } from '../../../../../i18n/routing';
import Navbar from '../../../../../components/Navbar';
import Footer from '../../../../../components/Footer';
import { getPostsByCategorySlug, getAllCategorySlugs, getCategoryBySlug } from '../../../../../lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, categorySlug: string }> }): Promise<Metadata> {
  const { locale, categorySlug } = await params;

  const catTranslation = await getCategoryBySlug(categorySlug, locale);
  if (!catTranslation) return {};

  return {
    title: catTranslation.name,
    description: catTranslation.description || undefined,
    alternates: {
      canonical: locale === 'sr' ? `/sr/uvidi/kategorija/${categorySlug}` : `/en/insights/category/${categorySlug}`,
    },
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'sr'];
  const paramsList: { locale: string; categorySlug: string }[] = [];
  
  for (const locale of locales) {
    const slugs = await getAllCategorySlugs(locale);
    for (const slug of slugs) {
      paramsList.push({ locale, categorySlug: slug });
    }
  }
  
  return paramsList;
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string, categorySlug: string }> }) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);
  
  const [posts, catTranslation, t] = await Promise.all([
    getPostsByCategorySlug(categorySlug, locale),
    getCategoryBySlug(categorySlug, locale),
    getTranslations('Insights'),
  ]);

  if (!catTranslation && posts.length === 0) notFound();

  const categoryName = catTranslation?.name || categorySlug;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link href="/insights" className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-8 transition-colors">
           &larr; {t('title')}
        </Link>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{categoryName}</h1>
        
        {catTranslation?.description && (
          <p className="text-gray-600 mb-12 max-w-2xl">{catTranslation.description}</p>
        )}

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
