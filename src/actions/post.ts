'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '../lib/mdx'; 

export async function createPost(formData: FormData) {
  const categoryId = formData.get('categoryId') as string;
  const icon = formData.get('icon') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const author = formData.get('author') as string;
  const published = formData.get('published') === 'true';
  const series = formData.get('series') as string;
  const seriesOrder = formData.get('seriesOrder') as string;
  const dateStr = formData.get('date') as string;
  const date = dateStr ? new Date(dateStr) : new Date();

  const titleEn = formData.get('title_en') as string;
  const seoTitleEn = formData.get('seoTitle_en') as string;
  const contentEn = formData.get('content_en') as string;
  const excerptEn = formData.get('excerpt_en') as string;
  const seoDescriptionEn = formData.get('seoDescription_en') as string;
  let slugEn = formData.get('slug_en') as string;
  if (!slugEn && titleEn) slugEn = slugify(titleEn);

  const titleSr = formData.get('title_sr') as string;
  const seoTitleSr = formData.get('seoTitle_sr') as string;
  const contentSr = formData.get('content_sr') as string;
  const excerptSr = formData.get('excerpt_sr') as string;
  const seoDescriptionSr = formData.get('seoDescription_sr') as string;
  let slugSr = formData.get('slug_sr') as string;
  if (!slugSr && titleSr) slugSr = slugify(titleSr);

  const translations = [];
  if (titleEn && contentEn) {
    translations.push({
      locale: 'en',
      title: titleEn,
      seoTitle: seoTitleEn || null,
      content: contentEn,
      excerpt: excerptEn || null,
      seoDescription: seoDescriptionEn || null,
      slug: slugEn
    });
  }
  
  if (titleSr && contentSr) {
    translations.push({
      locale: 'sr',
      title: titleSr,
      seoTitle: seoTitleSr || null,
      content: contentSr,
      excerpt: excerptSr || null,
      seoDescription: seoDescriptionSr || null,
      slug: slugSr
    });
  }

  await prisma.post.create({
    data: {
      categoryId,
      date,
      icon: icon || null,
      featuredImage: featuredImage || null,
      author: author || null,
      published,
      series: series || null,
      seriesOrder: seriesOrder ? parseInt(seriesOrder) : null,
      translations: {
        create: translations
      }
    },
  });

  revalidatePath('/en/insights');
  revalidatePath('/sr/uvidi');
  revalidatePath('/en');
  revalidatePath('/sr');
  
  redirect('/admin');
}

export async function updatePost(id: string, formData: FormData) {
  const categoryId = formData.get('categoryId') as string;
  const icon = formData.get('icon') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const author = formData.get('author') as string;
  const published = formData.get('published') === 'true';
  const series = formData.get('series') as string;
  const seriesOrder = formData.get('seriesOrder') as string;
  const dateStr = formData.get('date') as string;
  const date = dateStr ? new Date(dateStr) : new Date();

  const titleEn = formData.get('title_en') as string;
  const seoTitleEn = formData.get('seoTitle_en') as string;
  const contentEn = formData.get('content_en') as string;
  const excerptEn = formData.get('excerpt_en') as string;
  const seoDescriptionEn = formData.get('seoDescription_en') as string;
  let slugEn = formData.get('slug_en') as string;
  if (!slugEn && titleEn) slugEn = slugify(titleEn);

  const titleSr = formData.get('title_sr') as string;
  const seoTitleSr = formData.get('seoTitle_sr') as string;
  const contentSr = formData.get('content_sr') as string;
  const excerptSr = formData.get('excerpt_sr') as string;
  const seoDescriptionSr = formData.get('seoDescription_sr') as string;
  let slugSr = formData.get('slug_sr') as string;
  if (!slugSr && titleSr) slugSr = slugify(titleSr);

  const translations = [];
  if (titleEn && contentEn) {
    translations.push({
      where: { slug_locale: { slug: slugEn, locale: 'en' } },
      create: { locale: 'en', title: titleEn, seoTitle: seoTitleEn || null, content: contentEn, excerpt: excerptEn || null, seoDescription: seoDescriptionEn || null, slug: slugEn },
      update: { title: titleEn, seoTitle: seoTitleEn || null, content: contentEn, excerpt: excerptEn || null, seoDescription: seoDescriptionEn || null, slug: slugEn }
    });
  }
  
  if (titleSr && contentSr) {
    translations.push({
      where: { slug_locale: { slug: slugSr, locale: 'sr' } },
      create: { locale: 'sr', title: titleSr, seoTitle: seoTitleSr || null, content: contentSr, excerpt: excerptSr || null, seoDescription: seoDescriptionSr || null, slug: slugSr },
      update: { title: titleSr, seoTitle: seoTitleSr || null, content: contentSr, excerpt: excerptSr || null, seoDescription: seoDescriptionSr || null, slug: slugSr }
    });
  }

  await prisma.post.update({
    where: { id },
    data: {
      categoryId,
      date,
      icon: icon || null,
      featuredImage: featuredImage || null,
      author: author || null,
      published,
      series: series || null,
      seriesOrder: seriesOrder ? parseInt(seriesOrder) : null,
    },
  });

  for (const t of translations) {
    await prisma.postTranslation.upsert({
      where: {
        postId_locale: { postId: id, locale: t.create.locale }
      },
      create: { ...t.create, postId: id },
      update: t.update
    });
  }

  revalidatePath('/en/insights');
  revalidatePath('/sr/uvidi');
  if (slugEn) revalidatePath(`/en/insights/${slugEn}`);
  if (slugSr) revalidatePath(`/sr/uvidi/${slugSr}`);
  revalidatePath('/en');
  revalidatePath('/sr');

  redirect('/admin');
}

export async function deletePost(id: string) {
  // Cascades to translations automatically
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath('/en/insights');
  revalidatePath('/sr/uvidi');
  
  redirect('/admin');
}
