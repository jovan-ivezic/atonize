import CategoryForm from '../../components/CategoryForm';
import { prisma } from '../../../../../lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
    include: { translations: true }
  });

  if (!category) notFound();
  
  const mainName = category.translations.find(t => t.locale === 'en')?.name || category.translations[0]?.name || 'Bez imena';

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl truncate max-w-xl">
          Izmeni: {mainName}
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li><Link className="font-medium text-[#3C50E0]" href="/admin/categories">Kategorije /</Link></li>
            <li className="font-medium">Izmeni Kategoriju</li>
          </ol>
        </nav>
      </div>
      <CategoryForm category={category} />
    </>
  );
}
