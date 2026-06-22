'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function ContactForm() {
  const t = useTranslations('Contact.form');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Dynamic schema inside component to use translations
  const formSchema = z.object({
    name: z.string().min(2, t('name_error')),
    email: z.string().email(t('email_error')),
    message: z.string().min(10, t('message_error')),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-primary/30 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
      >
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <FaCheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-headline-md font-semibold text-on-surface mb-3">
          {t('success_title')}
        </h3>
        <p className="text-secondary font-body-lg">
          {t('success_message')}
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 px-6 py-2 border border-outline-variant rounded-lg text-secondary hover:text-primary transition-colors font-medium"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/30">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-on-surface-variant mb-2">
            {t('name_label')}
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder={t('name_placeholder')}
            className={`w-full bg-surface px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
              errors.name ? 'border-red-500 focus:ring-red-200' : 'border-outline-variant/50 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <FaExclamationCircle /> {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-on-surface-variant mb-2">
            {t('email_label')}
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={t('email_placeholder')}
            className={`w-full bg-surface px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-outline-variant/50 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <FaExclamationCircle /> {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-on-surface-variant mb-2">
            {t('message_label')}
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            placeholder={t('message_placeholder')}
            className={`w-full bg-surface px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors resize-none ${
              errors.message ? 'border-red-500 focus:ring-red-200' : 'border-outline-variant/50 focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <FaExclamationCircle /> {errors.message.message}
            </p>
          )}
        </div>

        {isError && (
          <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 text-sm flex items-start gap-3">
            <FaExclamationCircle className="mt-0.5 flex-shrink-0 text-red-500" />
            <div>
              <p className="font-semibold">{t('error_title')}</p>
              <p>{t('error_message')}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-primary text-on-primary rounded-DEFAULT font-label-caps text-label-caps flex items-center justify-center gap-3 transition-opacity disabled:opacity-70 ambient-hover hover:opacity-90"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('submitting').toUpperCase()}
            </>
          ) : (
            t('submit').toUpperCase()
          )}
        </button>
      </form>
    </div>
  );
}
