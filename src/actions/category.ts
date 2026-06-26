'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '../lib/mdx'; 

export async function createCategory(formData: FormData) {
  const icon = formData.get('icon') as string;

  const nameEn = formData.get('name_en') as string;
  const descriptionEn = formData.get('description_en') as string;
  let slugEn = formData.get('slug_en') as string;
  if (!slugEn && nameEn) slugEn = slugify(nameEn);

  const nameSr = formData.get('name_sr') as string;
  const descriptionSr = formData.get('description_sr') as string;
  let slugSr = formData.get('slug_sr') as string;
  if (!slugSr && nameSr) slugSr = slugify(nameSr);

  const translations = [];
  if (nameEn) {
    translations.push({
      locale: 'en',
      name: nameEn,
      description: descriptionEn || null,
      slug: slugEn
    });
  }
  
  if (nameSr) {
    translations.push({
      locale: 'sr',
      name: nameSr,
      description: descriptionSr || null,
      slug: slugSr
    });
  }

  await prisma.category.create({
    data: {
      icon: icon || null,
      translations: {
        create: translations
      }
    },
  });

  revalidatePath('/en/admin/categories');
  revalidatePath('/sr/admin/categories');
  
  redirect('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
  const icon = formData.get('icon') as string;

  const nameEn = formData.get('name_en') as string;
  const descriptionEn = formData.get('description_en') as string;
  let slugEn = formData.get('slug_en') as string;
  if (!slugEn && nameEn) slugEn = slugify(nameEn);

  const nameSr = formData.get('name_sr') as string;
  const descriptionSr = formData.get('description_sr') as string;
  let slugSr = formData.get('slug_sr') as string;
  if (!slugSr && nameSr) slugSr = slugify(nameSr);

  const translations = [];
  if (nameEn) {
    translations.push({
      where: { slug_locale: { slug: slugEn, locale: 'en' } },
      create: { locale: 'en', name: nameEn, description: descriptionEn || null, slug: slugEn },
      update: { name: nameEn, description: descriptionEn || null, slug: slugEn }
    });
  }
  
  if (nameSr) {
    translations.push({
      where: { slug_locale: { slug: slugSr, locale: 'sr' } },
      create: { locale: 'sr', name: nameSr, description: descriptionSr || null, slug: slugSr },
      update: { name: nameSr, description: descriptionSr || null, slug: slugSr }
    });
  }

  await prisma.category.update({
    where: { id },
    data: {
      icon: icon || null,
    },
  });

  for (const t of translations) {
    await prisma.categoryTranslation.upsert({
      where: {
        categoryId_locale: { categoryId: id, locale: t.create.locale }
      },
      create: { ...t.create, categoryId: id },
      update: t.update
    });
  }

  revalidatePath('/en/admin/categories');
  revalidatePath('/sr/admin/categories');
  revalidatePath('/en/insights');
  revalidatePath('/sr/uvidi');

  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/en/admin/categories');
  revalidatePath('/sr/admin/categories');
  revalidatePath('/en/insights');
  revalidatePath('/sr/uvidi');
  
  redirect('/admin/categories');
}
