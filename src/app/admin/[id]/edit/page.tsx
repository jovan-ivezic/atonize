import PostForm from '../../components/PostForm';
import { prisma } from '../../../../lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: { translations: true }
    }),
    prisma.category.findMany({ include: { translations: true } })
  ]);

  if (!post) notFound();
  
  const mainTitle = post.translations.find(t => t.locale === 'en')?.title || post.translations[0]?.title || 'Bez naslova';

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl truncate max-w-xl">
          Izmeni: {mainTitle}
        </h2>
        
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium text-[#3C50E0]" href="/admin">
                Pregled Objava /
              </Link>
            </li>
            <li className="font-medium">Izmeni</li>
          </ol>
        </nav>
      </div>
      
      <PostForm post={post} categories={categories} />
    </>
  );
}
