'use client';

import { useRegisterAlternateLocales } from '../hooks/useRegisterAlternateLocales';

interface AlternateLocalesRegisterProps {
  alternates: Record<string, Record<string, string>>;
}

/**
 * A zero-markup client-side component to register dynamic path segment translations.
 * Allows the language switcher to know the exact URL of alternate language versions.
 */
export function AlternateLocalesRegister({ alternates }: AlternateLocalesRegisterProps) {
  useRegisterAlternateLocales(alternates);
  return null;
}
