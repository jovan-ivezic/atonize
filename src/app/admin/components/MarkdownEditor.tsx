"use client";

import dynamic from 'next/dynamic';
import { useTheme } from '@/tailadmin/context/ThemeContext';
import { forwardRef } from 'react';

const Editor = dynamic(() => import('./InitializedMDXEditor'), { 
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-800">Učitavanje editora...</div>
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="rounded-lg border-[1.5px] border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
      <Editor value={value} onChange={onChange} theme={theme} />
    </div>
  );
}
