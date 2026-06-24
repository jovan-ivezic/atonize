import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getContentDirectory = (locale: string) => path.join(process.cwd(), `src/content/insights/${locale}`);

export type PostMetadata = {
  title: string;
  date: string;
  category: string;
  slug: string;
  icon?: string;
  excerpt?: string;
  series?: string;
  seriesOrder?: number;
  translationKey?: string;
};

export const getPostBySlug = (slug: string, locale: string = 'en') => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const dir = getContentDirectory(locale);
  const fullPath = path.join(dir, `${realSlug}.mdx`);
  
  // Fallback to English if file doesn't exist in the target locale
  if (!fs.existsSync(fullPath) && locale !== 'en') {
    return getPostBySlug(slug, 'en');
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    meta: data as PostMetadata,
    content
  };
};

export const getAllPostsMeta = (locale: string = 'en'): PostMetadata[] => {
  const dir = getContentDirectory(locale);
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const { meta } = getPostBySlug(file, locale);
      return meta;
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
    
  return posts;
};

export const getPostsInSeries = (seriesName: string, locale: string = 'en'): PostMetadata[] => {
  const allPosts = getAllPostsMeta(locale);
  return allPosts
    .filter(post => post.series === seriesName)
    .sort((a, b) => {
      const orderA = a.seriesOrder ?? 999;
      const orderB = b.seriesOrder ?? 999;
      return orderA - orderB;
    });
};

export const getPostByTranslationKey = (translationKey: string, locale: string = 'en') => {
  const allPosts = getAllPostsMeta(locale);
  const postMeta = allPosts.find(post => post.translationKey === translationKey);
  
  if (!postMeta) return null;
  
  return getPostBySlug(postMeta.slug, locale);
};

export const slugify = (text: string) => {
  const map: Record<string, string> = {
    'š':'s', 'đ':'dj', 'ž':'z', 'č':'c', 'ć':'c',
    'Š':'s', 'Đ':'dj', 'Ž':'z', 'Č':'c', 'Ć':'c'
  };
  let str = text;
  for (const key in map) {
    str = str.replace(new RegExp(key, 'g'), map[key]);
  }
  return str
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // remove diacritics
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
};

export const getPostsByCategorySlug = (categorySlug: string, locale: string = 'en'): PostMetadata[] => {
  const allPosts = getAllPostsMeta(locale);
  return allPosts.filter(post => slugify(post.category) === categorySlug);
};

export const getAllCategorySlugs = (locale: string = 'en'): string[] => {
  const allPosts = getAllPostsMeta(locale);
  const categories = new Set(allPosts.map(post => slugify(post.category)));
  return Array.from(categories);
};
