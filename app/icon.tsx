import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Favicon generado con `next/og` (parte de Next.js, sin dependencias
 * nuevas) a partir del mismo escudo del componente `Logo`, para no
 * mantener un archivo .ico por separado que se desincronice del diseño.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#123A66',
          borderRadius: 7,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
          <path
            d="M10 14.6L13.2 17.8L20 10.4"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
