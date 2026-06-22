'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '../i18n/routing';
import { ChangeEvent, useTransition } from 'react';
import { useAlternateLocalesContext } from '../context/AlternateLocalesContext';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { alternates } = useAlternateLocalesContext();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const nextParams = alternates[nextLocale] || params;
      // @ts-ignore
      router.replace({ pathname, params: nextParams }, { locale: nextLocale });
    });
  };

  return (
    <label className="relative text-gray-400 focus-within:text-gray-600 border border-gray-200 rounded-md px-2 py-1 bg-white">
      <span className="sr-only">Odaberi jezik / Select language</span>
      <select
        className="appearance-none bg-transparent outline-none cursor-pointer pr-4 text-sm font-medium text-gray-700"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        <option value="en">EN</option>
        <option value="sr">SR</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </label>
  );
}
