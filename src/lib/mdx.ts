import { prisma } from './prisma';

export type PostMetadata = {
  id?: string;
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  slug: string;
  icon?: string | null;
  featuredImage?: string | null;
  author?: string | null;
  published?: boolean;
  excerpt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  series?: string | null;
  seriesOrder?: number | null;
  locale?: string;
};

const mapPrismaPostToMeta = (post: any, translation: any): PostMetadata => {
  const catTranslation = post.category?.translations?.[0];
  return {
    id: post.id,
    title: translation.title,
    date: post.date.toISOString(),
    category: catTranslation?.name || 'Uncategorized',
    categorySlug: catTranslation?.slug || 'uncategorized',
    slug: translation.slug,
    icon: post.icon,
    featuredImage: post.featuredImage,
    author: post.author,
    published: post.published,
    excerpt: translation.excerpt,
    seoTitle: translation.seoTitle,
    seoDescription: translation.seoDescription,
    series: post.series,
    seriesOrder: post.seriesOrder,
    locale: translation.locale,
  };
};

export const getPostBySlug = async (slug: string, locale: string = 'en') => {
  let post = await prisma.post.findFirst({
    where: { translations: { some: { slug, locale } } },
    include: { 
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } }
    }
  });

  // Fallback to English if not found
  if (!post && locale !== 'en') {
    post = await prisma.post.findFirst({
      where: { translations: { some: { slug, locale: 'en' } } },
      include: { 
        translations: { where: { locale: 'en' } },
        category: { include: { translations: { where: { locale: 'en' } } } }
      }
    });
  }

  if (!post || post.translations.length === 0) throw new Error('Post not found');

  const t = post.translations[0];
  return {
    slug: t.slug,
    meta: mapPrismaPostToMeta(post, t),
    content: t.content
  };
};

export const getAllPostsMeta = async (locale: string = 'en'): Promise<PostMetadata[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true, translations: { some: { locale } } },
    include: { 
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } }
    },
    orderBy: { date: 'desc' }
  });
  
  return posts.map(p => mapPrismaPostToMeta(p, p.translations[0]));
};

export const getPostsInSeries = async (seriesName: string, locale: string = 'en'): Promise<PostMetadata[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true, series: seriesName, translations: { some: { locale } } },
    include: { 
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } }
    },
    orderBy: { seriesOrder: 'asc' }
  });
  
  return posts.map(p => mapPrismaPostToMeta(p, p.translations[0]));
};

export const slugify = (text: string) => {
  const map: Record<string, string> = {
    'š':'s', 'đ':'dj', 'ž':'z', 'č':'c', 'ć':'c',
    'Š':'s', 'Đ':'dj', 'Ž':'z', 'Č':'c', 'Ć':'c',
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'ђ':'dj', 'е':'e', 'ж':'z', 'з':'z', 'и':'i', 'ј':'j', 'к':'k', 'л':'l', 'љ':'lj', 'м':'m', 'н':'n', 'њ':'nj', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'ћ':'c', 'у':'u', 'ф':'f', 'х':'h', 'ц':'c', 'ч':'c', 'џ':'dz', 'ш':'s',
    'А':'a', 'Б':'b', 'В':'v', 'Г':'g', 'Д':'d', 'Ђ':'dj', 'Е':'e', 'Ж':'z', 'З':'z', 'И':'i', 'Ј':'j', 'К':'k', 'Л':'l', 'Љ':'lj', 'М':'m', 'Н':'n', 'Њ':'nj', 'О':'o', 'П':'p', 'Р':'r', 'С':'s', 'Т':'t', 'Ћ':'c', 'У':'u', 'Ф':'f', 'Х':'h', 'Ц':'c', 'Ч':'c', 'Џ':'dz', 'Ш':'s'
  };
  let str = text;
  for (const key in map) {
    str = str.replace(new RegExp(key, 'g'), map[key]);
  }
  return str
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const getPostsByCategorySlug = async (categorySlug: string, locale: string = 'en'): Promise<PostMetadata[]> => {
  const posts = await prisma.post.findMany({
    where: { 
      translations: { some: { locale } },
      category: { translations: { some: { slug: categorySlug, locale } } }
    },
    include: { 
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } }
    },
    orderBy: { date: 'desc' }
  });
  return posts.map(p => mapPrismaPostToMeta(p, p.translations[0]));
};

export const getAllCategorySlugs = async (locale: string = 'en'): Promise<string[]> => {
  const categories = await prisma.categoryTranslation.findMany({
    where: { locale },
    select: { slug: true }
  });
  return categories.map(c => c.slug);
};

export const getCategoryBySlug = async (categorySlug: string, locale: string = 'en') => {
  const category = await prisma.category.findFirst({
    where: { translations: { some: { slug: categorySlug, locale } } },
    include: { translations: true }
  });
  
  if (!category || category.translations.length === 0) return null;
  return category;
};

export const getPostByPostId = async (postId: string, locale: string = 'en'): Promise<PostMetadata | null> => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      translations: { where: { locale } },
      category: { include: { translations: { where: { locale } } } }
    }
  });

  if (!post || post.translations.length === 0) return null;
  return mapPrismaPostToMeta(post, post.translations[0]);
};
