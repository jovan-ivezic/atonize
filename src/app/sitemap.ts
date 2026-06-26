import { MetadataRoute } from 'next';
import { getAllPostsMeta, getAllCategorySlugs } from '../lib/mdx';

const BASE_URL = 'https://www.atonize.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [];
  
  const addRoute = (
    enPath: string, 
    srPath: string, 
    priority: number, 
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = 'weekly', 
    lastModified: string | Date = new Date()
  ) => {
    sitemapData.push({
      url: `${BASE_URL}${enPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}${enPath}`,
          sr: `${BASE_URL}${srPath}`,
        },
      },
    });
    sitemapData.push({
      url: `${BASE_URL}${srPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}${enPath}`,
          sr: `${BASE_URL}${srPath}`,
        },
      },
    });
  };

  // 1. Static Routes
  addRoute('/en', '/sr', 1.0, 'weekly');
  addRoute('/en/about', '/sr/o-nama', 0.8, 'monthly');
  addRoute('/en/insights', '/sr/uvidi', 0.9, 'daily');

  // 2. Categories (from DB)
  const [enCategorySlugs, srCategorySlugs] = await Promise.all([
    getAllCategorySlugs('en'),
    getAllCategorySlugs('sr'),
  ]);

  const maxCats = Math.max(enCategorySlugs.length, srCategorySlugs.length);
  for (let i = 0; i < maxCats; i++) {
    const enSlug = enCategorySlugs[i];
    const srSlug = srCategorySlugs[i] || enCategorySlugs[i];
    if (enSlug) {
      addRoute(
        `/en/insights/category/${enSlug}`,
        `/sr/uvidi/kategorija/${srSlug}`,
        0.8,
        'weekly'
      );
    }
  }

  // 3. Blog Posts — EN posts paired with SR counterparts by postId
  const [enPosts, srPosts] = await Promise.all([
    getAllPostsMeta('en'),
    getAllPostsMeta('sr'),
  ]);

  // Build a map of postId -> sr slug
  const srSlugByPostId = new Map(srPosts.map(p => [(p as any).postId || p.id, p.slug]));

  for (const post of enPosts) {
    const postId = (post as any).postId || post.id;
    const srSlug = srSlugByPostId.get(postId);
    
    if (srSlug) {
      addRoute(
        `/en/insights/${post.slug}`,
        `/sr/uvidi/${srSlug}`,
        0.7,
        'monthly',
        new Date(post.date)
      );
    } else {
      sitemapData.push({
        url: `${BASE_URL}/en/insights/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return sitemapData;
}
