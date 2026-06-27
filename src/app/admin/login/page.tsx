"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        // Redirect to admin dashboard on success
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Neuspešna prijava');
      }
    } catch (err) {
      setError('Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full bg-brand-50 p-3 dark:bg-brand-500/10"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Unesite vaše podatke za pristup kontrolnom panelu
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-error-50 p-4 text-sm text-error-500 dark:bg-error-500/10">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Korisničko ime
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent px-5 py-3 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              placeholder="Unesite korisničko ime"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Lozinka
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-transparent px-5 py-3 font-medium outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-500"
              placeholder="Unesite lozinku"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white hover:bg-opacity-90 transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? 'Prijavljivanje...' : 'Prijavi se'}
          </button>
        </form>
      </div>
    </div>
  );
}
