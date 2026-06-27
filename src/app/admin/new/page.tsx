import PostForm from '../components/PostForm';
import Link from 'next/link';
import { prisma } from '../../../lib/prisma';

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    include: { translations: true }
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white text-2xl">
          New Post
        </h2>
        
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium text-[#3C50E0]" href="/admin">
                All Posts /
              </Link>
            </li>
            <li className="font-medium text-[#3C50E0]">New Post</li>
          </ol>
        </nav>
      </div>
      
      <PostForm categories={categories} />
    </>
  );
}
