'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerCarouselItem {
  id: string;
  titulo: string | null;
  subtitulo: string | null;
  imagenUrl: string;
  enlaceUrl: string | null;
}

export function BannerCarousel({ banners }: { banners: BannerCarouselItem[] }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const intervalo = setInterval(() => {
      setIndice((i) => (i + 1) % banners.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[indice];

  const Contenido = (
    <div
      className="relative flex h-56 w-full items-end overflow-hidden rounded-2xl bg-ink-900 md:h-72"
      style={{
        backgroundImage: `url(${banner.imagenUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
      {(banner.titulo || banner.subtitulo) && (
        <div className="relative z-10 p-6 md:p-8">
          {banner.titulo && (
            <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
              {banner.titulo}
            </h2>
          )}
          {banner.subtitulo && (
            <p className="mt-1 max-w-md text-sm text-slate-200">{banner.subtitulo}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-10">
      {banner.enlaceUrl ? (
        <Link href={banner.enlaceUrl} className="block">
          {Contenido}
        </Link>
      ) : (
        Contenido
      )}

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndice((i) => (i - 1 + banners.length) % banners.length)}
            aria-label="Banner anterior"
            className="absolute left-8 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md hover:bg-white"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIndice((i) => (i + 1) % banners.length)}
            aria-label="Siguiente banner"
            className="absolute right-8 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md hover:bg-white"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className="mt-3 flex justify-center gap-1.5">
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setIndice(i)}
                aria-label={`Ir al banner ${i + 1}`}
                className={
                  i === indice
                    ? 'h-1.5 w-6 rounded-full bg-seguro-500'
                    : 'h-1.5 w-6 rounded-full bg-slate-300 dark:bg-slate-700'
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
