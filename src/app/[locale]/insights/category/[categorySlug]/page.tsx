import { Link } from '../../../../../i18n/routing';
import { AlternateLocalesRegister } from '../../../../../components/AlternateLocalesRegister';
import Navbar from '../../../../../components/Navbar';
import Footer from '../../../../../components/Footer';
import PostCard from '../../../../../components/PostCard';
import { getPostsByCategorySlug, getAllCategorySlugs, getCategoryBySlug } from '../../../../../lib/mdx';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, categorySlug: string }> }): Promise<Metadata> {
  const { locale, categorySlug } = await params;

  const category = await getCategoryBySlug(categorySlug, locale);
  if (!category) return {};

  const catTranslation = category.translations.find(t => t.locale === locale);
  const enSlug = category.translations.find(t => t.locale === 'en')?.slug;
  const srSlug = category.translations.find(t => t.locale === 'sr')?.slug;

  return {
    title: catTranslation?.name,
    description: catTranslation?.description || undefined,
    alternates: {
      canonical: locale === 'sr' ? `/sr/uvidi/kategorija/${categorySlug}` : `/en/insights/category/${categorySlug}`,
      languages: {
        'en': enSlug ? `/en/insights/category/${enSlug}` : undefined,
        'sr': srSlug ? `/sr/uvidi/kategorija/${srSlug}` : undefined,
      },
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
  
  const [posts, category, t] = await Promise.all([
    getPostsByCategorySlug(categorySlug, locale),
    getCategoryBySlug(categorySlug, locale),
    getTranslations('Insights'),
  ]);

  const catTranslation = category?.translations.find(tr => tr.locale === locale);
  if (!catTranslation && posts.length === 0) notFound();

  const categoryName = catTranslation?.name || categorySlug;
  const enSlug = category?.translations.find(tr => tr.locale === 'en')?.slug;
  const srSlug = category?.translations.find(tr => tr.locale === 'sr')?.slug;

  const alternates: Record<string, Record<string, string>> = {};
  if (enSlug) alternates['en'] = { categorySlug: enSlug };
  if (srSlug) alternates['sr'] = { categorySlug: srSlug };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <AlternateLocalesRegister alternates={alternates} />
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
            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} locale={locale} />
            ))}
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
