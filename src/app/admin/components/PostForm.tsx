'use client';

import { createPost, updatePost } from '../../../actions/post';
import { useState } from 'react';
import MarkdownEditor from './MarkdownEditor';

export default function PostForm({ post, categories = [] }: { post?: any, categories?: any[] }) {
  const [activeTab, setActiveTab] = useState<'en' | 'sr'>('en');
  const action = post ? updatePost.bind(null, post.id) : createPost;

  const enTranslation = post?.translations?.find((t: any) => t.locale === 'en') || {};
  const srTranslation = post?.translations?.find((t: any) => t.locale === 'sr') || {};

  const [contentEn, setContentEn] = useState(enTranslation.content || '');
  const [contentSr, setContentSr] = useState(srTranslation.content || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFeaturedImage(data.url);
    } catch (error) {
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const defaultDate = post?.date ? new Date(post.date).toISOString().split('T')[0] : '';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
      <div className="border-b border-gray-200 py-4 px-6 dark:border-gray-800 flex justify-between items-center">
        <h3 className="font-medium text-gray-800 dark:text-gray-200 text-lg">
          {post ? 'Edit Post' : 'New Post'}
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
          <h4 className="text-theme-sm font-semibold text-gray-400 uppercase tracking-wider">Common Data (Applies to all languages)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Category <span className="text-error-500">*</span>
              </label>
              <select 
                name="categoryId" 
                defaultValue={post?.categoryId || ''} 
                required 
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              >
                <option value="" disabled>Select Category</option>
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
                Date
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
                Icon (Filename)
              </label>
              <input 
                type="text" 
                name="icon" 
                defaultValue={post?.icon || ''} 
                placeholder="e.g. react.svg"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Author
              </label>
              <input 
                type="text" 
                name="author" 
                defaultValue={post?.author || ''} 
                placeholder="e.g. Jovan Ivezić"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Series
              </label>
              <input 
                type="text" 
                name="series" 
                defaultValue={post?.series || ''} 
                placeholder="e.g. React Masterclass"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Series Order
              </label>
              <input 
                type="number" 
                name="seriesOrder" 
                min={1}
                defaultValue={post?.seriesOrder ?? ''} 
                placeholder="e.g. 1"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-2.5 px-4 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Featured Image
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {featuredImage && (
                <img src={featuredImage} alt="Featured" className="w-32 h-32 object-cover rounded-lg border border-stroke" />
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900"
                />
                <input type="hidden" name="featuredImage" value={featuredImage} />
                {isUploading && <p className="text-sm text-brand-500 mt-2">Uploading...</p>}
              </div>
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
                Slug (EN) - leave empty for auto
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

          <div className="flex flex-col gap-6 xl:flex-row mt-6">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                SEO Title (EN) - optional
              </label>
              <input 
                type="text" 
                name="seoTitle_en" 
                defaultValue={enTranslation.seoTitle || ''} 
                placeholder="SEO title for search engines"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                SEO Description (EN) - meta
              </label>
              <input 
                type="text" 
                name="seoDescription_en" 
                defaultValue={enTranslation.seoDescription || ''} 
                placeholder="150-160 characters recommended"
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
            <input type="hidden" name="content_en" value={contentEn} />
            <MarkdownEditor value={contentEn} onChange={(val) => setContentEn(val || '')} />
          </div>
        </div>

        {/* SERBIAN FIELDS */}
        <div className={activeTab === 'sr' ? 'block space-y-6' : 'hidden'}>
          <h4 className="text-theme-sm font-semibold text-brand-500 uppercase tracking-wider mb-4">Serbian Version (SR)</h4>
          
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                Title (SR)
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
                Slug (SR) - leave empty for auto
              </label>
              <input 
                type="text" 
                name="slug_sr" 
                defaultValue={srTranslation.slug || ''} 
                placeholder="e.g. moj-odlican-post"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row mt-6">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                SEO Title (SR) - opciono
              </label>
              <input 
                type="text" 
                name="seoTitle_sr" 
                defaultValue={srTranslation.seoTitle || ''} 
                placeholder="Title za pretraživače"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
                SEO Description (SR) - meta description
              </label>
              <input 
                type="text" 
                name="seoDescription_sr" 
                defaultValue={srTranslation.seoDescription || ''} 
                placeholder="Preporučeno 150-160 karaktera"
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Excerpt (SR)
            </label>
            <textarea 
              name="excerpt_sr" 
              rows={2} 
              defaultValue={srTranslation.excerpt || ''} 
              placeholder="Write a short excerpt..."
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
            ></textarea>
          </div>

          <div>
            <label className="mb-2 block text-gray-800 dark:text-gray-200 font-medium text-sm">
              Content (Markdown - SR)
            </label>
            <input type="hidden" name="content_sr" value={contentSr} />
            <MarkdownEditor value={contentSr} onChange={(val) => setContentSr(val || '')} />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <input 
            type="checkbox" 
            name="published" 
            value="true"
            id="published"
            defaultChecked={post ? post.published : true}
            className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
          />
          <label htmlFor="published" className="text-gray-800 dark:text-gray-200 font-medium">
            Published (Visible on site) - Uncheck to save as Draft
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            type="submit" 
            className="flex-1 justify-center rounded-lg bg-brand-500 p-3 font-medium hover:bg-opacity-90 text-white transition-colors"
          >
            {post ? 'Save Changes (All Languages)' : 'Save Post'}
          </button>

          {post && (enTranslation?.slug || post.translations?.[0]?.slug) && (
            <a 
              href={`/en/insights/${enTranslation?.slug || post.translations?.[0]?.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 justify-center rounded-lg bg-gray-200 dark:bg-gray-700 p-3 font-medium hover:bg-opacity-90 text-gray-800 dark:text-gray-200 transition-colors text-center block"
            >
              Open Preview
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
