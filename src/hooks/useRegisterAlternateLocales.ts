'use client';

import { useEffect } from 'react';
import { useAlternateLocalesContext } from '../context/AlternateLocalesContext';

type Alternates = Record<string, Record<string, string>>;

export function useRegisterAlternateLocales(alternates: Alternates) {
  const { setAlternates } = useAlternateLocalesContext();

  useEffect(() => {
    setAlternates(alternates);
    return () => {
      setAlternates({});
    };
  }, [alternates, setAlternates]);
}
