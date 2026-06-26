'use client';

import { createPost, updatePost } from '../../../actions/post';
import { useState } from 'react';

export default function PostForm({ post, categories = [] }: { post?: any, categories?: any[] }) {
  const [activeTab, setActiveTab] = useState<'en' | 'sr'>('en');
  const action = post ? updatePost.bind(null, post.id) : createPost;

  const enTranslation = post?.translations?.find((t: any) => t.locale === 'en') || {};
  const srTranslation = post?.translations?.find((t: any) => t.locale === 'sr') || {};

  const defaultDate = post?.date ? new Date(post.date).toISOString().split('T')[0] : '';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
      <div className="border-b border-gray-200 py-4 px-6 dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
          {post ? 'Izmeni Objavu' : 'Nova Objava'}
        </h3>
        
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
        
        <div className="space-y-4">
          <h4 className="text-theme-sm font-semibold text-gray-400 uppercase tracking-wider">Zajednički Podaci (Važi za sve jezike)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Kategorija <span className="text-error-500">*</span>
              </label>
              <select 
                name="categoryId" 
                defaultValue={post?.categoryId || ''} 
                required 
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              >
                <option value="" disabled>Izaberi kategoriju</option>
                {categories.map((cat: any) => {
                  const catName = cat.translations?.find((t: any) => t.locale === 'sr')?.name || cat.translations?.[0]?.name || cat.id;
                  return (
                    <option key={cat.id} value={cat.id}>{catName}</option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Datum
              </label>
              <input 
                type="date" 
                name="date" 
                defaultValue={defaultDate} 
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Ikonica (Naziv fajla)
              </label>
              <input 
                type="text" 
                name="icon" 
                defaultValue={post?.icon || ''} 
                placeholder="npr. react.svg"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* ENGLISH FIELDS */}
        <div className={activeTab === 'en' ? 'block space-y-6' : 'hidden'}>
          <h4 className="text-theme-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">Engleska Verzija (EN)</h4>
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Title (EN)
              </label>
              <input 
                type="text" 
                name="title_en" 
                defaultValue={enTranslation.title || ''} 
                placeholder="Enter post title"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Slug (EN) - ostavi prazno za auto
              </label>
              <input 
                type="text" 
                name="slug_en" 
                defaultValue={enTranslation.slug || ''} 
                placeholder="e.g. my-awesome-post"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Excerpt (EN)
            </label>
            <textarea 
              name="excerpt_en" 
              rows={2} 
              defaultValue={enTranslation.excerpt || ''} 
              placeholder="Write a short summary..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Markdown Content (EN)
            </label>
            <textarea 
              name="content_en" 
              rows={15} 
              defaultValue={enTranslation.content || ''} 
              placeholder="Write your markdown content here..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-mono text-sm outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>
        </div>

        {/* SERBIAN FIELDS */}
        <div className={activeTab === 'sr' ? 'block space-y-6' : 'hidden'}>
          <h4 className="text-theme-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">Srpska Verzija (SR)</h4>
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Naslov (SR)
              </label>
              <input 
                type="text" 
                name="title_sr" 
                defaultValue={srTranslation.title || ''} 
                placeholder="Unesite naslov"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Slug (SR) - ostavi prazno za auto
              </label>
              <input 
                type="text" 
                name="slug_sr" 
                defaultValue={srTranslation.slug || ''} 
                placeholder="npr. moj-odlican-post"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Sažetak / Excerpt (SR)
            </label>
            <textarea 
              name="excerpt_sr" 
              rows={2} 
              defaultValue={srTranslation.excerpt || ''} 
              placeholder="Napišite kratak sažetak..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Sadržaj (Markdown - SR)
            </label>
            <textarea 
              name="content_sr" 
              rows={15} 
              defaultValue={srTranslation.content || ''} 
              placeholder="Ovde ide Markdown sadržaj na srpskom..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-mono text-sm outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium hover:bg-opacity-90 text-white transition-colors"
        >
          {post ? 'Sačuvaj Promene (Svi Jezici)' : 'Objavi Post'}
        </button>
      </form>
    </div>
  );
}
