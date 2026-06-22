'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Alternates = Record<string, Record<string, string>>;

interface AlternateLocalesContextType {
  alternates: Alternates;
  setAlternates: (alternates: Alternates) => void;
}

const AlternateLocalesContext = createContext<AlternateLocalesContextType | undefined>(undefined);

export function AlternateLocalesProvider({ children }: { children: ReactNode }) {
  const [alternates, setAlternates] = useState<Alternates>({});

  return (
    <AlternateLocalesContext.Provider value={{ alternates, setAlternates }}>
      {children}
    </AlternateLocalesContext.Provider>
  );
}

export function useAlternateLocalesContext() {
  const context = useContext(AlternateLocalesContext);
  if (!context) {
    throw new Error('useAlternateLocalesContext must be used within an AlternateLocalesProvider');
  }
  return context;
}
