import CategoryForm from '../components/CategoryForm';
import Link from 'next/link';

export default function NewCategoryPage() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl">
          Nova Kategorija
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li><Link className="font-medium text-[#3C50E0]" href="/admin/categories">Kategorije /</Link></li>
            <li className="font-medium text-[#3C50E0]">Nova Kategorija</li>
          </ol>
        </nav>
      </div>
      <CategoryForm />
    </>
  );
}
