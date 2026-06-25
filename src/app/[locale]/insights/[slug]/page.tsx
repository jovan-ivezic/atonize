import { getPostBySlug, getAllPostsMeta, getPostsInSeries, getPostByTranslationKey } from '../../../../lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import SeriesNavigation from '../../../../components/SeriesNavigation';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import { Link } from '../../../../i18n/routing';
import { FaArrowLeft } from 'react-icons/fa';
import { setRequestLocale } from 'next-intl/server';
import { AlternateLocalesRegister } from '../../../../components/AlternateLocalesRegister';

export async function generateStaticParams() {
  const posts = getAllPostsMeta('en');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  try {
    const { meta } = getPostBySlug(slug, locale);
    
    let enSlug = slug;
    let srSlug = slug;
    
    if (meta.translationKey) {
      const otherLocale = locale === 'en' ? 'sr' : 'en';
      const otherPost = getPostByTranslationKey(meta.translationKey, otherLocale);
      if (otherPost) {
        if (locale === 'en') srSlug = otherPost.slug;
        else enSlug = otherPost.slug;
      }
    }

    return {
      title: `${meta.title} | Atonize`,
      description: meta.excerpt,
      openGraph: {
        type: 'article',
        publishedTime: meta.date,
        authors: ['Jovan Ivezić'],
      },
      alternates: {
        canonical: locale === 'sr' ? `/sr/uvidi/${slug}` : `/en/insights/${slug}`,
        languages: {
          'en': `/en/insights/${enSlug}`,
          'sr': `/sr/uvidi/${srSlug}`,
        },
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found | Atonize',
    };
  }
}

import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const mdxOptions: any = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: true,
        },
      ],
    ],
  },
};

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800" {...props} />,
  p: (props: any) => <p className="mb-6 text-gray-700 leading-relaxed text-lg" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 text-lg" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2 text-lg" {...props} />,
  li: (props: any) => <li {...props} />,
  strong: (props: any) => <strong className="font-semibold text-gray-900" {...props} />,
  a: (props: any) => {
    const href = props.href;
    if (href && href.startsWith('/')) {
      return <Link href={href} className="text-primary-600 hover:text-primary-700 underline" {...props} />;
    }
    return <a className="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer" {...props} />;
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 my-6 bg-gray-50 py-2 pr-4 rounded-r-lg" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-50" {...props} />,
  th: (props: any) => <th className="px-6 py-3 text-left font-semibold text-gray-900 border-b border-gray-200 bg-gray-50" {...props} />,
  tbody: (props: any) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  td: (props: any) => <td className="px-6 py-4 text-sm text-gray-600 align-top" {...props} />,
  tr: (props: any) => <tr className="hover:bg-gray-50 transition-colors" {...props} />,
  pre: (props: any) => (
    <pre className="p-4 rounded-lg overflow-x-auto my-6 text-sm font-mono border border-gray-800" {...props} />
  ),
  code: (props: any) => {
    // Ako kod nema data-language (od rehype-pretty-code) i nije unutar pre taga (odnosno inline je), onda primenjujemo inline stil
    if (!props['data-language'] && typeof props.children === 'string') {
      return <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />;
    }
    return <code {...props} />;
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  let post;
  
  try {
    post = getPostBySlug(slug, locale);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Article not found.</p>
          <Link href={`/insights`} className="text-primary-600 hover:underline">
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const alternates: Record<string, { slug: string }> = {
    [locale]: { slug: post.slug }
  };

  if (post.meta.translationKey) {
    const otherLocale = locale === 'en' ? 'sr' : 'en';
    const otherPost = getPostByTranslationKey(post.meta.translationKey, otherLocale);
    if (otherPost) {
      alternates[otherLocale] = { slug: otherPost.slug };
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AlternateLocalesRegister alternates={alternates} />
      <Navbar />
      
      <main className="flex-grow">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="mb-12">
                <Link href={`/insights`} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-8 transition-colors">
                  <FaArrowLeft className="mr-2" /> Back to Insights
                </Link>
                
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">{post.meta.category}</span>
                  <span>•</span>
                  <time>{new Date(post.meta.date).toLocaleDateString(locale === 'sr' ? 'sr-RS' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight mb-6">
                  {post.meta.title}
                </h1>
                
                {post.meta.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {post.meta.excerpt}
                  </p>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <MDXRemote source={post.content} components={components} options={mdxOptions} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {post.meta.series && (
                  <SeriesNavigation 
                    seriesName={post.meta.series} 
                    posts={getPostsInSeries(post.meta.series, locale)} 
                    currentSlug={post.slug} 
                  />
                )}
                {/* Additional sidebar widgets can go here */}
              </div>
            </div>

            {/* Mobile Sidebar (Bottom) */}
            <div className="lg:hidden mt-12 border-t border-gray-200 pt-12">
              {post.meta.series && (
                <SeriesNavigation 
                  seriesName={post.meta.series} 
                  posts={getPostsInSeries(post.meta.series, locale)} 
                  currentSlug={post.slug} 
                />
              )}
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
