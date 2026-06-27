import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { deleteCategory } from '../../../actions/category';
import DeleteButton from '../components/DeleteButton';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { translations: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl">
          Categories
        </h2>
        
        <Link 
          href="/admin/categories/new"
          className="inline-flex items-center justify-center rounded-md bg-[#3C50E0] py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
        >
          Add Category
        </Link>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Category</th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Slug (EN)</th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Languages</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const srTrans = category.translations.find(t => t.locale === 'sr');
                const enTrans = category.translations.find(t => t.locale === 'en');
                
                return (
                  <tr key={category.id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <div className="flex items-center gap-3">
                        {category.icon && <span className="text-xl">{category.icon}</span>}
                        <div className="flex flex-col">
                          <p className="text-black dark:text-white font-medium">
                            {enTrans?.name || srTrans?.name || 'Unnamed'}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
                            {enTrans?.description || 'No SEO description'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{enTrans?.slug}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center gap-2">
                        {enTrans && <span className="inline-flex rounded-full bg-green-100 py-1 px-3 text-sm font-medium text-green-700">EN</span>}
                        {srTrans && <span className="inline-flex rounded-full bg-blue-100 py-1 px-3 text-sm font-medium text-blue-700">SR</span>}
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link href={`/admin/categories/${category.id}/edit`} className="hover:text-primary font-medium text-sm">
                          Izmeni
                        </Link>
                        <DeleteButton id={category.id} action={deleteCategory} itemType="ovu kategoriju" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
