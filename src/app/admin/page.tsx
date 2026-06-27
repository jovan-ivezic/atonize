import { prisma } from '../../lib/prisma';
import Link from 'next/link';
import { deletePost } from '../../actions/post';
import DeleteButton from './components/DeleteButton';

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    include: {
      translations: true,
      category: { include: { translations: true } }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl">
          All Posts
        </h2>
        
        <Link 
          href="/admin/new"
          className="inline-flex items-center justify-center bg-brand-500 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 rounded-lg shadow-theme-sm transition-all"
        >
          + New Post
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 text-left dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 rounded-lg">
                <th className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300 xl:pl-11 rounded-l-lg text-theme-sm">Title (Languages)</th>
                <th className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300 text-theme-sm">Category</th>
                <th className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300 text-theme-sm">Date</th>
                <th className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300 rounded-r-lg text-theme-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const mainTitle = post.translations.find(t => t.locale === 'en')?.title || post.translations[0]?.title || 'Bez naslova';
                const catName = post.category.translations.find(t => t.locale === 'en')?.name || post.category.translations[0]?.name || 'N/A';
                return (
                  <tr key={post.id} className="border-b border-gray-200 dark:border-gray-800 last:border-none">
                    <td className="py-5 px-4 pl-9 xl:pl-11">
                      <h5 className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[200px] xl:max-w-xs">{mainTitle}</h5>
                      <div className="flex gap-1 mt-1.5">
                        {post.translations.map(t => (
                          <span key={t.locale} className="inline-flex rounded bg-brand-50 dark:bg-brand-500/10 py-0.5 px-2 text-[10px] font-bold text-brand-500 dark:text-brand-400 uppercase">
                            {t.locale}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-gray-800 dark:text-gray-200 text-theme-sm">{catName}</p>
                    </td>
                    <td className="py-5 px-4">
                      <p className="text-gray-800 dark:text-gray-200 text-theme-sm">{new Date(post.date).toLocaleDateString()}</p>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-3.5">
                        <Link 
                          href={`/admin/${post.id}/edit`}
                          className="text-gray-500 hover:text-brand-500 transition-colors text-theme-sm font-medium"
                        >
                          Izmeni
                        </Link>
                        <DeleteButton id={post.id} action={deletePost} itemType="ovu objavu" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400 text-theme-sm">
              Nema objavljenih postova.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
