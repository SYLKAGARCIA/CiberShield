'use client';

import { useEffect } from 'react';

/**
 * Registra el Service Worker (public/sw.js) al montar la app. No
 * renderiza nada — es un efecto secundario puro. Se coloca en el
 * layout raíz para que se registre en cualquier página de entrada.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Se registra tras el evento `load` para no competir por ancho de
    // banda con los recursos de la primera carga de la página.
    const registrar = () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('No se pudo registrar el Service Worker:', error);
      });
    };

    if (document.readyState === 'complete') {
      registrar();
    } else {
      window.addEventListener('load', registrar);
      return () => window.removeEventListener('load', registrar);
    }
  }, []);

  return null;
}
