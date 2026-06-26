import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const locales = ['en', 'sr'];
  
  // Category maps (categoryString from MDX -> Category ID)
  const categoryMap = new Map<string, string>();
  const postMap = new Map<string, string>();

  // Translation mappings for the default categories
  const defaultCategoryTranslations: Record<string, { en: string, sr: string }> = {
    'Engineering': { en: 'Engineering', sr: 'Inženjering' },
    'Product': { en: 'Product', sr: 'Proizvod' },
    'Design': { en: 'Design', sr: 'Dizajn' },
  };

  const getOrCreateCategory = async (catString: string) => {
    const defaultCatName = catString || 'Uncategorized';
    if (categoryMap.has(defaultCatName)) {
      return categoryMap.get(defaultCatName)!;
    }

    const translations = defaultCategoryTranslations[defaultCatName] || { en: defaultCatName, sr: defaultCatName };
    const enSlug = translations.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const srSlug = translations.sr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const cat = await prisma.category.create({
      data: {
        translations: {
          create: [
            { locale: 'en', name: translations.en, slug: enSlug },
            { locale: 'sr', name: translations.sr, slug: srSlug }
          ]
        }
      }
    });

    categoryMap.set(defaultCatName, cat.id);
    return cat.id;
  };

  const processLocale = async (locale: string) => {
    const dir = path.join(process.cwd(), `src/content/insights/${locale}`);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const realSlug = file.replace(/\.mdx$/, '');
      const translationKey = data.translationKey || realSlug;
      
      let postId = postMap.get(translationKey);
      
      if (!postId) {
        // Create the base Post first
        const categoryId = await getOrCreateCategory(data.category);

        const post = await prisma.post.create({
          data: {
            categoryId,
            date: new Date(data.date || new Date()),
            icon: data.icon || null,
            series: data.series || null,
            seriesOrder: data.seriesOrder ? parseInt(data.seriesOrder) : null,
          }
        });
        postId = post.id;
        postMap.set(translationKey, postId);
      }
      
      // Upsert the Translation
      await prisma.postTranslation.upsert({
        where: {
          slug_locale: {
            slug: realSlug,
            locale: locale,
          }
        },
        update: {
          title: data.title || realSlug,
          excerpt: data.excerpt || null,
          content: content
        },
        create: {
          postId: postId,
          locale: locale,
          title: data.title || realSlug,
          slug: realSlug,
          excerpt: data.excerpt || null,
          content: content
        }
      });
      
      console.log(`Migrated: [${locale}] ${realSlug}`);
    }
  };

  // Process English first to establish the base posts
  await processLocale('en');
  // Process Serbian next to link to the English base posts
  await processLocale('sr');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
