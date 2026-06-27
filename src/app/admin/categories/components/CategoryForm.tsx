'use client';

import { createCategory, updateCategory } from '../../../../actions/category';
import { useState } from 'react';

export default function CategoryForm({ category }: { category?: any }) {
  const [activeTab, setActiveTab] = useState<'en' | 'sr'>('en');
  const action = category ? updateCategory.bind(null, category.id) : createCategory;

  const enTranslation = category?.translations?.find((t: any) => t.locale === 'en') || {};
  const srTranslation = category?.translations?.find((t: any) => t.locale === 'sr') || {};

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
      <div className="border-b border-gray-200 py-4 px-6 dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
          {category ? 'Edit Category' : 'New Category'}
        </h3>
        
        {/* Language Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'en' 
                ? 'bg-white dark:bg-gray-700 text-brand-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            English (EN)
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('sr')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'sr' 
                ? 'bg-white dark:bg-gray-700 text-brand-500 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Srpski (SR)
          </button>
        </div>
      </div>
      
      <form action={action} className="p-6 space-y-8">
        
        {/* SHARED FIELDS */}
        <div className="space-y-4">
          <h4 className="text-theme-sm font-semibold text-gray-400 uppercase tracking-wider">Common Data</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Icon (Emoji or SVG)
              </label>
              <input 
                type="text" 
                name="icon" 
                defaultValue={category?.icon || ''} 
                placeholder="e.g. 🚀"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* ENGLISH FIELDS */}
        <div className={activeTab === 'en' ? 'block space-y-6' : 'hidden'}>
          <h4 className="text-theme-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">English Version (EN)</h4>
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Category Name (EN)
              </label>
              <input 
                type="text" 
                name="name_en" 
                defaultValue={enTranslation.name || ''} 
                placeholder="e.g. Engineering"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Slug (EN) - leave empty for auto
              </label>
              <input 
                type="text" 
                name="slug_en" 
                defaultValue={enTranslation.slug || ''} 
                placeholder="e.g. engineering"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              SEO Category Description (EN)
            </label>
            <textarea 
              name="description_en" 
              rows={3} 
              defaultValue={enTranslation.description || ''} 
              placeholder="Detailed description for SEO meta tags..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>
        </div>

        {/* SERBIAN FIELDS */}
        <div className={activeTab === 'sr' ? 'block space-y-6' : 'hidden'}>
          <h4 className="text-theme-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">Serbian Version (SR)</h4>
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Category Name (SR)
              </label>
              <input 
                type="text" 
                name="name_sr" 
                defaultValue={srTranslation.name || ''} 
                placeholder="e.g. Inženjering"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Slug (SR) - leave empty for auto
              </label>
              <input 
                type="text" 
                name="slug_sr" 
                defaultValue={srTranslation.slug || ''} 
                placeholder="e.g. inzenjering"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              SEO Category Description (SR)
            </label>
            <textarea 
              name="description_sr" 
              rows={3} 
              defaultValue={srTranslation.description || ''} 
              placeholder="Detailed SEO description shown in search results..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium hover:bg-opacity-90 text-white transition-colors"
        >
          {category ? 'Save Changes' : 'Add Category'}
        </button>
      </form>
    </div>
  );
}
