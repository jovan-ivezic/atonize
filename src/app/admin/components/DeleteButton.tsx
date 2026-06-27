'use client';

import { useTransition } from 'react';

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<void>;
  itemType?: string;
}

export default function DeleteButton({ id, action, itemType = 'ovaj sadržaj' }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this item? This action cannot be undone.`)) {
      startTransition(async () => {
        try {
          await action(id);
        } catch (error) {
          console.error('Delete failed:', error);
          alert('An error occurred while deleting. Please try again.');
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-gray-500 hover:text-error-500 transition-colors text-theme-sm font-medium disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
