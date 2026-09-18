'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [valor, setValor] = useState(searchParams.get('q') ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (valor.trim()) {
      params.set('q', valor.trim());
    } else {
      params.delete('q');
    }
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-700/40 dark:text-slate-500"
          aria-hidden="true"
        />
        <input
          type="search"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Busca por palabra clave: phishing, contraseñas..."
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
      >
        Buscar
      </button>
    </form>
  );
}
