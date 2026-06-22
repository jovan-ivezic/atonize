import { Link } from '../i18n/routing';
import { PostMetadata } from '../lib/mdx';
import { useTranslations } from 'next-intl';

interface SeriesNavigationProps {
  seriesName: string;
  posts: PostMetadata[];
  currentSlug: string;
}

export default function SeriesNavigation({ seriesName, posts, currentSlug }: SeriesNavigationProps) {
  const t = useTranslations('Insights');
  
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">
        {t('series')} {seriesName}
      </h3>
      <ol className="space-y-3">
        {posts.map((post, index) => {
          const isActive = post.slug === currentSlug;
          
          return (
            <li key={post.slug} className="flex items-start">
              <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-3 mt-0.5 ${isActive ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {index + 1}
              </span>
              <div className="flex-1">
                {isActive ? (
                  <span className="text-gray-900 font-medium">
                    {post.title} <span className="text-primary-600 text-sm ml-2">(You are here)</span>
                  </span>
                ) : (
                  <Link href={{ pathname: '/insights/[slug]', params: { slug: post.slug } }} className="text-primary-600 hover:text-primary-800 transition-colors">
                    {post.title}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
