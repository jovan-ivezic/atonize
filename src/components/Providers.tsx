'use client';

import { TaskProvider } from '../context/TaskContext';
import { AlternateLocalesProvider } from '../context/AlternateLocalesContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlternateLocalesProvider>
      <TaskProvider>{children}</TaskProvider>
    </AlternateLocalesProvider>
  );
}
