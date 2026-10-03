import { Link } from '../i18n/routing';
import type { PostMetadata } from '../lib/mdx';

const COLORS = ['bg-[#facc15]', 'bg-[#b4dcdc]', 'bg-[#f05a41]', 'bg-[#818cf8]'];

export default function PostCard({ post, index, locale }: { post: PostMetadata; index: number; locale: string }) {
  return (
    <Link
      href={{ pathname: '/insights/[slug]', params: { slug: post.slug } }}
      className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className={`${COLORS[index % COLORS.length]} h-48 flex items-center justify-center relative overflow-hidden`}>
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-6xl opacity-90 group-hover:scale-110 transition-transform duration-300">{post.icon || '📝'}</span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
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
}
